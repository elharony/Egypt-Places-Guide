import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import MapContainer from './Components/Map/Map'



class App extends Component {

    render() {
        return (
            <main>
                <Menu/>
                {/* <MapContainer
                    places={this.state.places}
                    activeMarker={this.state.activeMarker} 
                    showingInfoWindow={this.state.showingInfoWindow}
                    selectedPlace={this.state.selectedPlace}
                    onMapClicked={this.onMapClicked}
                    onMarkerClick={this.onMarkerClick}
                /> */}
                <MapContainer/>
            </main>
        )
    }
}

export default App
