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

        if(this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            newPlaces = this.state.places.filter((place) => match.test(place.title))
            this.props.updatePlaces(newPlaces)
        } else {
            this.props.updatePlaces(allPlaces)
        }
    }

    triggerMarkerClick = (index) => {
        window.google.maps.event.trigger(this.props.markers[index], 'click');
        // console.log(this.state.markers[index])
    }

    render() {

        return (
            <aside>
                <div className="search-form">
                    <label for="searchQuery">Find A Place!</label>
                    <input id="searchQuery" type="text" placeholder="Search Here" onChange={(e) => this.updateQuery(e.target.value)} value={this.state.query}/>
                </div>
                <ul className="search-result">
                    {this.props.places.map((place, index) => (
                        <li 
                            key={index}
                            className="item" 
                            onClick={() => this.triggerMarkerClick(index)}
                        >
                            {place.title}
                        </li>
                    ))}
                </ul>
            </aside>

        )
    }
}

export default Menu