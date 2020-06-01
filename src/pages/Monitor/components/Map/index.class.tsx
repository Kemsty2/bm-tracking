import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

const PopupComponent = (props: any) => {
  return <h1>{props.name}</h1>;
};

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

class MainMap extends Component {
  mapContainer: HTMLElement | null | undefined;
  map: mapboxgl.Map | undefined;

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer!,
      style: 'https://cdn.traccar.com/map/basic.json',
      center: [0, 0],
      zoom: 1,
    });

    map.on('load', () => this.mapDidLoad(map));
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

    Promise.all([
      this.loadImage('background', 'images/background.svg'),
      this.loadImage('icon-marker', 'images/icon/truckMarker.svg'),
    ]).then(() => {
      this.imagesDidLoad();
    });

    //  Gestion des evenements
    map.on('click', 'positions', (e: any) => {
      alert('click');
      var coordinates = e.features[0].geometry.coordinates.slice();
      var properties = e.features[0].properties;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      this.addPopup(<PopupComponent name={properties} />, coordinates);

      //new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(this.map!);
    });

    // Change the cursor to a pointer when the mouse is over the positions layer.
    map.on('mouseenter', 'positions', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'positions', () => {
      map.getCanvas().style.cursor = '';
    });
  }

  addPopup(el: JSX.Element, coordinates: any) {
    const placeholder = document.createElement('div');
    ReactDOM.render(el, placeholder);

    new mapboxgl.Popup().setDOMContent(placeholder).setLngLat(coordinates).addTo(this.map!);
  }

  imagesDidLoad() {
    this.map!.addSource('positions', {
      type: 'geojson',
      data: data,
    });

    this.map!.addLayer({
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
    this.map!.addControl(new mapboxgl.ScaleControl({ maxWidth: 25 }), 'top-left');

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
    return (
      <div
        style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100vh' }}
        ref={(el) => (this.mapContainer = el)}
      />
    );
  }
}

export default MainMap;
