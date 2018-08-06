import React, { Component } from 'react'
import './Menu.css'
import escapeRegExp from 'escape-string-regexp'

// Places Data
class Menu extends Component {

    state = {
        query: '',
        places: this.props.places
    }

    updateQuery = (query) => {
        this.setState({ query })
        
        let allPlaces = this.state.places
        let newPlaces

        if(this.state.query && (this.state.query !== '')) {
            const match = new RegExp(escapeRegExp(query), 'i');
            newPlaces = allPlaces.filter((place) => match.test(place.venue.name))
            this.props.updatePlaces(newPlaces)
        } else {
            this.props.updatePlaces(allPlaces)
        }
    }

    triggerMarkerClick = (placeTitle) => {
        this.props.markers.map((marker) => {
            if(marker.title == placeTitle) {
                window.google.maps.event.trigger(marker, 'click');
            }
        })
    }

    render() {

        return (
            <aside>
                <div className="search-form">
                    <label htmlFor="searchQuery">Find A Place!</label>
                    <input 
                        id="searchQuery" 
                        type="text" 
                        placeholder="Search Here" 
                        onChange={(e) => this.updateQuery(e.target.value)} 
                        value={this.state.query}
                    />
                </div>
                <ul className="search-result">
                    {this.props.places.map((place, index) => (
                        <li 
                            key={index}
                            className="item" 
                            onClick={() => this.triggerMarkerClick(place.venue.name)}
                        >
                            {place.venue.name}
                        </li>
                    ))}
                </ul>
            </aside>

        )
    }
}

export default Menu