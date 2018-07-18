import React, { Component } from 'react'
import './Map.css'

import { compose, withProps, withStateHandlers, withHandlers } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

import places from '../../data/places.json'

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}} />,
        containerElement: <div style={{height: `100vh`, width: `100%`}} />,
        mapElement: <div style={{height: `100%`}} />,
        center: {lat: 26.803434, lng: 32.906478}
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        },
    }),
    withStateHandlers(() => ({
        isOpen: false,
        showInfo: '0'
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
        }),
        showInfo: ({ showInfo, isOpen }) => (a) => ({
            isOpen: !isOpen,
            showInfoIndex: a
        })
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap
        defaultZoom={6}
        defaultCenter={props.center}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map( (marker, index) => (

                <Marker
                    key={marker.place_id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    onClick={()=>{ props.showInfo(index)} }
                >
                    { (props.showInfoIndex === index ) &&
                    <InfoWindow onCloseClick={props.onToggleOpen}>
                        <div>
                            <h2>{marker.place_title}</h2>
                            <img src={marker.place_url} style={{width: `100%`}}/>
                        </div>
                    </InfoWindow>}
                </Marker>
            ))}
        </MarkerClusterer>
    </GoogleMap>
))

class Map extends Component {

    state = {
        markers: [],
        showInfoIndex: ''
    }

    componentDidMount() {
        this.setState({ markers: places})
        console.log(this.state.markers)
    }

    render() {
        return (
            <MapWithAMarkerClusterer markers={this.state.markers}/>
        )
    }
}

export default Map