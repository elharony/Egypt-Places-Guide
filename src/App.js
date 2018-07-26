import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'
import Header from './Components/Header/Header'

import places from './data/places.json'


class App extends Component {
    
    componentDidMount() {
        window.initMap = this.initMap
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E&callback=initMap')
    }

    state = {
        places: places,
        markers: [],
        infowindows: [],
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
                draggable: true,
                animation: window.google.maps.Animation.DROP,
                title: place.title
            })
            // Add each created marker to the 'markers' array
            this.state.markers.push(marker)

            // Create InfoWindow
            let content = `<h1>${place.title}</h1><img src='${place.img}'>`
            let infowindow = new window.google.maps.InfoWindow({
                content: content
            })

            // Display the InfoWindow after clicking on the Marker
            marker.addListener('click', function() {
                
                // Open An 'InfoWindow'
                infowindow.open(map, marker)

                // Animate The Marker
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                }
            })
        })
    
    }

    

    triggerMarkerClick = (index) => {
        window.google.maps.event.trigger(this.state.markers[index], 'click');
        console.log(this.state.markers[index])
    }
    
    render() {
        return (
            <div>
                <Header/>
                <main>
                    <Menu places={places} markers={this.state.markers} triggerMarkerClick={this.triggerMarkerClick}/>
                    <Map places={places}/>
                </main>
            </div>
            
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