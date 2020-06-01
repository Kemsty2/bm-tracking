import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import mapboxgl from 'mapbox-gl';
import { Popup } from './components';
import { fetchFakeData } from '../../../../helpers';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    map: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: '100hv',
    },
  }),
);

type Props = {};

const Map: React.FC<Props> = () => {
  const classes = useStyles();

  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'https://cdn.traccar.com/map/basic.json',
      center: [0, 0],
      zoom: 1,
      minZoom: 1,
      maxZoom: 25,
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    map.addControl(new mapboxgl.FullscreenControl({}), 'top-right');
    map.addControl(new mapboxgl.ScaleControl({ maxWidth: 25 }), 'bottom-left');

    map.on('load', () => {
      Promise.all([
        loadImage('background', 'images/background.svg', map),
        loadImage('icon-marker', 'images/icon/truckMarker.svg', map),
      ]).then(() => {
        // add the data source for new a feature collection with no features
        map.addSource('positions', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });

        map.addLayer({
          id: 'device-background',
          type: 'symbol',
          source: 'positions',
          layout: {
            'icon-image': 'background',
            'icon-allow-overlap': true,
            'text-field': '{name}',
            'text-allow-overlap': true,
            'text-anchor': 'bottom',
            'text-offset': [0, -2],
            'text-font': ['Roboto Regular'],
            'text-size': 12,
          },
          paint: {
            'text-halo-color': 'transparent',
            'text-halo-width': 1,
          },
        });

        // now add the layer, and reference the data source above by name
        map.addLayer({
          id: 'device-icon',
          source: 'positions',
          type: 'symbol',
          layout: {
            // full list of icons here: https://labs.mapbox.com/maki-icons
            'icon-image': 'icon-marker',
            'icon-allow-overlap': true,
            'icon-padding': 0,
          },
        });
      });
    });

    map.on('moveend', async () => {
      // get new center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      const results: any = await fetchFakeData({ longitude: lng, latitude: lat });
      // update "positions" source with new data
      // all layers that consume the "positions" data source will be updated automatically
      const source: mapboxgl.GeoJSONSource = map.getSource('positions') as mapboxgl.GeoJSONSource;
      source.setData(results);

      const bounds: any = calculateBounds(results.data);

      map.fitBounds(bounds, {
        padding: 100,
        maxZoom: 9,
      });
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.on('mouseenter', 'positions', (e: any) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on('mouseleave', 'positions', () => {
      map.getCanvas().style.cursor = '';
    });

    // add popup when user clicks a point
    map.on('click', 'positions', (e: any) => {
      if (e.features.length) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let properties = e.features[0].properties;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // create popup node
        const popupNode = document.createElement('div');
        ReactDOM.render(<Popup properties={properties} />, popupNode);
        // set popup on map
        popUpRef.current.setLngLat(coordinates).setDOMContent(popupNode).addTo(map);
      }
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateBounds = (data: any) => {
    if (data.features && data.features.length) {
      const first = data.features[0].geometry.coordinates;
      const bounds = [[...first], [...first]];
      for (let feature of data.features) {
        const longitude = feature.geometry.coordinates[0];
        const latitude = feature.geometry.coordinates[1];
        if (longitude < bounds[0][0]) {
          bounds[0][0] = longitude;
        } else if (longitude > bounds[1][0]) {
          bounds[1][0] = longitude;
        }
        if (latitude < bounds[0][1]) {
          bounds[0][1] = latitude;
        } else if (latitude > bounds[1][1]) {
          bounds[1][1] = latitude;
        }
      }
      return bounds;
    } else {
      return null;
    }
  };

  const loadImage = (key: any, url: any, map: mapboxgl.Map) => {
    return new Promise((resolutionFunc) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width * window.devicePixelRatio;
        canvas.height = image.height * window.devicePixelRatio;
        canvas.style.width = `${image.width}px`;
        canvas.style.height = `${image.height}px`;
        const context = canvas.getContext('2d');
        context!.drawImage(image, 0, 0, canvas.width, canvas.height);
        map.addImage(key, context!.getImageData(0, 0, canvas.width, canvas.height), {
          pixelRatio: window.devicePixelRatio,
        });
        resolutionFunc();
      };
      image.src = url;
    });
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.map} ref={mapContainerRef} />
    </Paper>
  );
};

export default Map;
