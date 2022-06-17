/*global google*/
import ReactDOM from 'react-dom'
import React from 'react'
import TextField from '@/components/input'

import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api'

let markerArray = []
class Map extends React.Component {
  state = {
    currentLocation: { lat: 0, lng: 0 },
    markers: [],
    bounds: null,
  }

  onMapLoad = map => {
    navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
      const pos = { lat, lng }
      this.setState({ currentLocation: pos })
    })
    google.maps.event.addListener(map, 'bounds_changed', () => {
      // console.log(map.getBounds());
      this.setState({ bounds: map.getBounds() })
    })
  }

  onSBLoad = ref => {
    this.searchBox = ref
  }

  onPlacesChanged = () => {
    markerArray = []
    let results = this.searchBox.getPlaces()
    for (let i = 0; i < results.length; i++) {
      let place = results[i].geometry.location
      markerArray.push(place)
    }
    this.setState({ markers: markerArray })
    // console.log(markerArray);
  }

  render() {
    return (
      <div>
        <div id="searchbox" style={{ position: 'relative' }}>
          <StandaloneSearchBox onLoad={this.onSBLoad} onPlacesChanged={this.onPlacesChanged} bounds={this.state.bounds}>
            <input
              type="text"
              placeholder="Search for an Address"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `30vw`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                top: '2vw',
                left: '1vw',
                textAlign: 'center',
                zIndex: 50,
              }}
            />
          </StandaloneSearchBox>
        </div>
        <br />
        <div style={{ borderRadius: 'var(--chakra-radii-md)', overflow: 'hidden', width: '95%', marginBottom: '2vw' }}>
          <GoogleMap
            center={this.state.currentLocation}
            zoom={10}
            onLoad={map => this.onMapLoad(map)}
            mapContainerStyle={{ height: '45vh', width: '100%' }}
          >
            {this.state.markers.map((mark, index) => (
              <Marker key={index} position={mark} />
            ))}
          </GoogleMap>
        </div>
      </div>
    )
  }
}

export default Map
