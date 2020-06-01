import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { Popup } from './components';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2luZ2tlbXN0eSIsImEiOiJja2E0ZWU3OHEwZDYyM2ZtdmVvcW9uc3oyIn0.7Epdd-Vt2qyCKqu0mWNhbw';

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [9.741752, 4.041193],
      },
      properties: { name: 'test' },
    },
  ],
} as any;

const styles = {
  root: {
    flexGrow: 1,
  },
  mapContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '88vh',
  },
} as any;

type Props = {
  classes?: any;
};

class MainMap extends Component<Props, any> {
  mapContainer: HTMLElement | null | undefined;
  map: mapboxgl.Map | undefined;
  popUpRef: any | null | undefined;

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
    });

    this.popUpRef = React.createRef();
    this.popUpRef.current = new mapboxgl.Popup({ offset: 15 });

    map.on('load', () => this.mapDidLoad(map));

    map.on('click', 'device-icon', (e: any) => {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var properties = e.features[0].properties;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const popupNode = document.createElement('div');
      ReactDOM.render(<Popup properties={properties} />, popupNode);
      // set popup on map
      this.popUpRef.current.setLngLat(coordinates).setDOMContent(popupNode).addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the positions layer.
    map.on('mouseenter', 'device-icon', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.

    map.on('mouseleave', 'device-icon', () => {
      map.getCanvas().style.cursor = '';
    });
  }

  componentWillUnmount() {
    this.map!.remove();
  }

  loadImage(key: any, url: any) {
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
        this.map!.addImage(key, context!.getImageData(0, 0, canvas.width, canvas.height), {
          pixelRatio: window.devicePixelRatio,
        });
        resolutionFunc();
      };
      image.src = url;
    });
  }

  mapDidLoad(map: mapboxgl.Map) {
    this.map = map;

    Promise.all([this.loadImage('icon-marker', 'images/icon/truckMarker.svg')]).then(() => {
      this.imagesDidLoad();
    });
  }

  imagesDidLoad() {
    this.map!.addSource('positions', {
      type: 'geojson',
      data: data,
    });

    this.map!.addLayer({
      id: 'device-icon',
      type: 'symbol',
      source: 'positions',
      layout: {
        'icon-image': 'icon-marker',
        'icon-allow-overlap': true,
      },
    });

    this.map!.addControl(new mapboxgl.NavigationControl(), 'top-left');
    this.map!.addControl(new mapboxgl.FullscreenControl({}), 'top-right');
    this.map!.addControl(new mapboxgl.ScaleControl({ maxWidth: 25 }), 'bottom-left');

    const bounds: any = this.calculateBounds();
    if (bounds) {
      this.map!.fitBounds(bounds, {
        padding: 100,
        maxZoom: 9,
      });
    }
  }

  calculateBounds() {
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
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} variant="outlined">
        <div className={classes.mapContainer} ref={(el) => (this.mapContainer = el)} />
      </Paper>
    );
  }
}

export default withStyles(styles)(MainMap);
