import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'

import places from './data/places.json'

class App extends Component {
    
    
    render() {
        return (
            <main>
                <Menu places={places}/>
                <Map places={places}/>
            </main>
        )
    }
}


export default App