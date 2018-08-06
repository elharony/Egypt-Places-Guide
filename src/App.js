import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'
import Header from './Components/Header/Header'

import places from './data/places.json'
import axios from 'axios'



class App extends Component {

    state = {
        places: [],
        markers: [],
        latLong: ''
    }

    componentDidMount() {
        this.getLocation()
    }

    loadMap = () => {
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap')
        window.initMap = this.initMap
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(response => {
            this.setState({
                latLong: response.coords.latitude + "," + response.coords.longitude
            })
            this.getPlaces("sights")
        })
    }

    getPlaces = (query) => {
        const endPoint = "https://api.foursquare.com/v2/venues/explore?"
        const params = {
            client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
            client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
            ll: this.state.latLong,
            query: query,
            v: "20182507"
        }

        // Fetch
        axios.get(endPoint + new URLSearchParams(params)).then(response => {
            this.setState({places: response.data.response.groups[0].items}, this.loadMap)
        })
    }



    /* Map */
    initMap = () => {

        // Show Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 26.803434, lng: 32.906478},
            zoom: 6
        })

        let infowindow = new window.google.maps.InfoWindow

        this.state.places.map((place) => {

            // Create Markers
            let marker = new window.google.maps.Marker({
                position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
                map: map,
                draggable: true,
                animation: window.google.maps.Animation.DROP,
                title: place.title
            })

            // Add each created marker to the 'markers' array
            this.state.markers.push(marker)

            // Create InfoWindow
            let content = `<h1>${place.venue.name}</h1>`

            // Display the InfoWindow after clicking on the Marker
            marker.addListener('click', function() {
                
                // Update 'InfoWindow' content
                infowindow.setContent(content)

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


    updatePlaces = (newPlaces) => {
        this.setState({places: newPlaces})
    }
    
    render() {
        return (
            <div>
                <Header/>
                <main>
                    <Menu 
                        places={this.state.places} 
                        markers={this.state.markers} 
                        updatePlaces={this.updatePlaces}
                    />
                    <div id="map"></div>
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