////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
//
// Got extra time?
//
// - Now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure <GeoAddress> supports the user moving positions
// - Fix soon-to-be deprecated method (16.3) ;)
////////////////////////////////////////////////////////////////////////////////

import React from "react";
import ReactDOM from "react-dom";
import GeoPosition from "./components/GeoPosition";
import GeoAddress from "./components/GeoAddress";


/*
Latitude
52.5232296
Longitude
13.4854092
*/

class App extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  }


  // this will execute before render()
  componentDidMount() {
    const geoPos = JSON.parse(localStorage.getItem('geoPos'))
    if(geoPos && geoPos.latitude !== null){
      this.setState({
        coords: {
        latitude: geoPos.latitude,
        longitude: geoPos.longitude,
        }
      })
    } else {
      this.geoId = navigator.geolocation.watchPosition(
        position => {
          this.setState({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        error => {
          this.setState({ error });
        }
      );
    }
  }

  // triger when render() finished
  componentDidUpdate = () => localStorage.setItem('geoPos', JSON.stringify(this.state.coords))

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return (
      <React.Fragment>
        <GeoPosition
          error={this.state.error}
          coords={{...this.state.coords}} />
        {/*<GeoAddress latitude={52.5232296} longitude={13.4854092}/>*/}
        <GeoAddress coords={{...this.state.coords}}/>    
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
