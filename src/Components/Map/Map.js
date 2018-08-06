// API KEY: AIzaSyCxw6moMaDjW09LfHXKdeA3AkHkZSpyhLM

import React, { Component } from 'react'
import './Map.css'

class Map extends Component {


    componentDidMount() {
        window.initMap = this.initMap
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCxw6moMaDjW09LfHXKdeA3AkHkZSpyhLM&callback=initMap')
    }

    componentWillUpdate() {
        this.initMap()
    }

    initMap = () => {


        // Show Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: this.props.mapCenter,
            zoom: 6
        })

        let infowindow = new window.google.maps.InfoWindow

        this.props.places.map((place) => {

            // Create Markers
            let marker = new window.google.maps.Marker({
                position: {lat: place.lat, lng: place.lng},
                map: map,
                draggable: true,
                animation: window.google.maps.Animation.DROP,
                title: place.title
            })
            // Add each created marker to the 'markers' array
            this.props.markers.push(marker)

            // Create InfoWindow
            let content = `<h1>${place.title}</h1><img src='${place.img}' style='width: 300px; height: 250px'>`

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

    render() {

        return (
            <div id="map"></div>
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

export default Map