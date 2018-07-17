import React, { Component } from 'react'
import './Map.css'

import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}} />,
        containerElement: <div style={{height: `100vh`, width: `100%`}} />,
        mapElement: <div style={{height: `100%`}} />
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
))

class Map extends Component {

    state = {
        isMarkerShown: false,
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({isMarkerShown: true})
        }, 3000)
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        )
    }
}

export default Map