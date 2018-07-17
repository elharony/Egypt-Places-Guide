import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'

class App extends Component {

    render() {
        return (
            <main>
                <Menu/>
                <Map/>
            </main>
        )
    }
}

export default App
