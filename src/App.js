import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'

import places from './data/places.json'


class App extends Component {
    
    componentDidMount() {
        window.initMap = this.initMap
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E&callback=initMap')
    }

    state = {
        places: places,
        mapCenter: {lat: 26.803434, lng: 32.906478}
    }

    initMap = () => {

        // Show Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: this.state.mapCenter,
            zoom: 6
        })

        this.state.places.map((place) => {

            // Create Markers
            let marker = new window.google.maps.Marker({
                position: {lat: place.lat, lng: place.lng},
                map: map,
                title: place.title
            })

            // Create InfoWindow
            let content = `<h1>${place.title}</h1>
            <img src='${place.img}'>`

            let infowindow = new window.google.maps.InfoWindow({
                content: content
            })

            // Display the InfoWindow after clicking on the Marker
            marker.addListener('click', function() {
                infowindow.open(map, marker)
            })
        })
    }
    
    render() {
        return (
            <main>
                <Menu places={places}/>
                <Map places={places}/>
            </main>
        )
    }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default App