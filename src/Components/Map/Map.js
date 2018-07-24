// API KEY: AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E

import React, { Component } from 'react'
import './Map.css'

// import { compose, withProps, withStateHandlers, withHandlers } from 'recompose'
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'


import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import places from '../../data/places.json'

export class MapContainer extends Component {

    state = {
        places: places,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        initialCenter: {
            lat: 26.803434,
            lng: 32.906478
        },
        zoom: 6
      }
    
      onMarkerClick = (props, marker, e) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })
    }
    
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      }
    
    render() {

        return (
            <Map google={this.props.google}
                onClick={this.onMapClicked}
                initialCenter={this.state.initialCenter}
                zoom={this.state.zoom}
            >
                {this.state.places.map( (place, index) =>
                <Marker
                    key={index}
                    onClick={this.onMarkerClick}
                    name={place.place_title}
                    position={{lat: place.latitude, lng: place.longitude}}
                >
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Marker>
                )}
            </Map>
        )
    }
  }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E')
})(MapContainer)















// const MapWithAMarkerClusterer = compose(
//     withProps({
//         googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=&libraries=geometry,drawing,places",
//         loadingElement: <div style={{height: `100%`}} />,
//         containerElement: <div style={{height: `100vh`, width: `100%`}} />,
//         mapElement: <div style={{height: `100%`}} />,
//         center: {lat: 26.803434, lng: 32.906478}
//     }),
//     withHandlers({
//         onMarkerClustererClick: () => (markerClusterer) => {
//             const clickedMarkers = markerClusterer.getMarkers()
//             console.log(`Current clicked markers length: ${clickedMarkers.length}`)
//             console.log(clickedMarkers)
//         },
//     }),
//     withStateHandlers(() => ({
//         isOpen: false,
//         showInfo: '0'
//     }), {
//         onToggleOpen: ({ isOpen }) => () => ({
//             isOpen: !isOpen,
//         }),
//         showInfo: ({ showInfo, isOpen }) => (a) => ({
//             isOpen: !isOpen,
//             showInfoIndex: a
//         })
//     }),
//     withScriptjs,
//     withGoogleMap
// )((props) => (
//     <GoogleMap
//         defaultZoom={6}
//         defaultCenter={props.center}
//     >
//         <MarkerClusterer
//             onClick={props.onMarkerClustererClick}
//             averageCenter
//             enableRetinaIcons
//             gridSize={60}
//         >
//             {props.markers.map( (marker, index) => (

//                 <Marker
//                     key={marker.place_id}
//                     position={{ lat: marker.latitude, lng: marker.longitude }}
//                     onClick={()=>{ props.showInfo(index)} }
//                 >
//                     { (props.showInfoIndex === index ) &&
//                     <InfoWindow onCloseClick={props.onToggleOpen}>
//                         <div>
//                             <h2>{marker.place_title}</h2>
//                             <img src={marker.place_url} style={{width: `100%`}} alt={marker.place_title}/>
//                         </div>
//                     </InfoWindow>}
//                 </Marker>
//             ))}
//         </MarkerClusterer>
//     </GoogleMap>
// ))

// class Map extends Component {

//     state = {
//         markers: [],
//         showInfoIndex: ''
//     }

//     componentDidMount() {
//         this.setState({ markers: places})
//         console.log(this.state.markers)
//     }

//     render() {
//         return (
//             <MapWithAMarkerClusterer markers={this.state.markers}/>
//         )
//     }
// }

// export default Map