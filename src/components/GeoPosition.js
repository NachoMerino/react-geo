import React from 'react';
import LoadingDots from "../utils/LoadingDots";

export default class GeoPosition extends React.Component {

  render() {
    return (
      <React.Fragment>
      <div>
        <h1>Geolocation</h1>
        {this.props.error ? (
          <div>Error: {this.props.message}</div>
        ) : (
          <dl>
            <dt>Latitude</dt>
            <dd>{this.props.coords.latitude || <LoadingDots />}</dd>
            <dt>Longitude</dt>
            <dd>{this.props.coords.longitude || <LoadingDots />}</dd>
          </dl>
        )}
      </div>
      <div className="adress">
      </div>
      </React.Fragment>
      );
  }
}