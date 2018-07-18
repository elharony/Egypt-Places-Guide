import React, { Component } from 'react'
import './Map.css'

import { compose, withProps, withStateHandlers, withHandlers } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

import places from '../../data/places.json'

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}} />,
        containerElement: <div style={{height: `100vh`, width: `100%`}} />,
        mapElement: <div style={{height: `100%`}} />,
        center: {lat: 26.4307618, lng: 39.1998633}
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
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
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
            {props.markers.map(marker => (

                <Marker
                    key={marker.place_id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    onClick={props.onToggleOpen}
                >
                    {props.isOpen && <InfoBox
                        onCloseClick={props.onToggleOpen}
                        options={{ closeBoxURL: ``, enableEventPropagation: true }}
                    >
                        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                                Hello, Kaohsiung!
                            </div>
                        </div>
                    </InfoBox>}
                </Marker>
            ))}
        </MarkerClusterer>
    </GoogleMap>
))

class Map extends Component {

    componentWillMount() {
        this.setState({ markers: [] })
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