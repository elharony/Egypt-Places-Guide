import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Map from './Components/Map/Map'
import Header from './Components/Header/Header'

import axios from 'axios'


class App extends Component {

    state = {
        allPlaces: [],
        places: [],
        markers: [],
        latLong: "30.044232, 31.235693"
    }

    componentDidMount() {
        this.getPlaces("sights", "egypt")
    }

    loadMap = () => {
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap')
        window.initMap = this.initMap
    }

    getPlaces = (query, location) => {
        const endPoint = "https://api.foursquare.com/v2/venues/explore?"
        const params = {
            client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
            client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
            query: query,
            near: location,
            v: "20182507"
        }

        // Fetch
        axios.get(endPoint + new URLSearchParams(params)).then(response => {
            this.setState({
                allPlaces: response.data.response.groups[0].items,
                places: response.data.response.groups[0].items
            }, this.loadMap)
        })
    }

    /* Map */
    initMap = () => {

        // Show Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 26.810883, lng: 31.384734},
            zoom: 6
        })

        let infowindow = new window.google.maps.InfoWindow()

        this.state.places.map((place) => {

            // Create Markers
            let marker = new window.google.maps.Marker({
                position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
                map: map,
                animation: window.google.maps.Animation.DROP,
                title: place.venue.name
            })

            // Add each created marker to the 'markers' array
            this.state.markers.push(marker)

            // Create InfoWindow
            let content = `
                            <h1>${place.venue.name}</h1>
                            <p>Address: ${place.venue.location.formattedAddress[0]} ${place.venue.location.formattedAddress[1]} ${place.venue.location.formattedAddress[2]}</p>
                            <p>lat: ${place.venue.location.lat}, long: ${place.venue.location.lng}</p>
                            `

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
                        places={this.state.allPlaces} 
                        markers={this.state.markers} 
                        updatePlaces={this.updatePlaces}
                    />
                    <Map/>
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