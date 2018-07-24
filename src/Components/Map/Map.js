// API KEY: AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E

import React, { Component } from 'react'
import './Map.css'

import places from '../../data/places.json'

class Map extends Component {

    componentDidMount() {
        window.initMap = this.initMap
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC2d4rgkL4a-9qZpQSpj1jhiPRhstXiD_E&callback=initMap')
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          })
    }
    
    render() {

        return (
            <div id="map" style={{width: '500px', height: '500px'}}></div>
        )
    }
}

export default Map

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}