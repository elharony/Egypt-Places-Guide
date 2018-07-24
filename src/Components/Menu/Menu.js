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
    }

    render() {

        const { query, places } = this.state
        let filteredPlaces

        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            filteredPlaces = places.filter((place) => match.test(place.place_title))
        } else {
            filteredPlaces = places
        }

        return (
            <aside>
                <h2>Find A Place!</h2>
                <div className="search-form">
                    <input type="text" placeholder="Search Here" onChange={(e) => this.updateQuery(e.target.value)} value={this.state.query}/>
                </div>
                <ul className="search-result">
                    {filteredPlaces.map((place) => (
                        <li className="item">{place.place_title}</li>
                    ))}
                </ul>
            </aside>

        )
    }
}

export default Menu