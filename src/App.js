import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'

class App extends Component {
    
    
    render() {
        return (
            <Map/>
        )
    }
}


export default App




// class App extends Component {

//     state = {
//         places: places,
//         showingInfoWindow: false,
//         activeMarker: {},
//         initialCenter: {
//             lat: 26.803434,
//             lng: 32.906478
//         },
//         zoom: 6
//     }
    
//     onMarkerClick = (marker) => {
//         this.setState({
//             activeMarker: marker,
//             showingInfoWindow: true
//         })
//         console.log(marker)
//     }
    
//     onMapClicked = (props) => {
//         if (this.state.showingInfoWindow) {
//             this.setState({
//                 showingInfoWindow: false,
//                 activeMarker: null
//             })
//         }
//     }

//     render() {
//         return (
//             <main>
//                 <Menu places={this.state.places}/>
//                 <MapContainer
//                     places={this.state.places}
//                     activeMarker={this.state.activeMarker} 
//                     showingInfoWindow={this.state.showingInfoWindow}
//                     selectedPlace={this.state.selectedPlace}
//                     initialCenter={this.state.initialCenter}
//                     zoom={this.state.zoom}
//                     onMapClicked={this.onMapClicked}
//                     onMarkerClick={this.onMarkerClick}
//                 />
//             </main>
//         )
//     }
// }
