import React from 'react';
import getAddressFromCoords from "../utils/getAddressFromCoords";


export default class GeoAddress extends React.Component {

  state = {
    address: null,
  }

  getAddress = async () => {
    try {
       const address = await getAddressFromCoords(this.props.coords.latitude, this.props.coords.longitude);
       this.setState({ address })
    }
    catch (error) {
        console.log('Error', error);
      }
  }


  componentDidUpdate = () => {
    if(!this.state.address){
      this.getAddress();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>GeoAddress</h1>
        <p>{this.state.address}</p>
      </React.Fragment>
      );
  }
}
