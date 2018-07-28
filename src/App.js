import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'
import Header from './Components/Header/Header'

import places from './data/places.json'


class App extends Component {

    state = {
        places: places,
        markers: [],
        mapCenter: {lat: 26.803434, lng: 32.906478}
    }

    updatePlaces = (newPlaces) => {
        this.setState({places: newPlaces})
        console.log('State Places:', this.state.places)
        console.log('New Places:', newPlaces)
    }
    
    render() {
        return (
            <div>
                <Header/>
                <main>
                    <Menu 
                        places={this.state.places} 
                        markers={this.state.markers} 
                        triggerMarkerClick={this.triggerMarkerClick}
                        updatePlaces={this.updatePlaces}
                    />
                    <Map 
                        places={this.state.places}
                        mapCenter={this.state.mapCenter} 
                        markers={this.state.markers}
                    />
                </main>
            </div>
        )
    }
}

export default App