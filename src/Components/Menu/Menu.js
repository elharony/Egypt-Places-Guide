import React, { Component } from 'react'
import './Menu.css'

import places from '../../data/places.json'

class Menu extends Component {
    render() {
        return (
            <aside>
                <h2>Find A Place!</h2>
                <div className="search-form">
                    <input type="text" placeholder="Search Here"/>
                </div>
                <ul className="search-result">
                    {places.map((place) => (
                        <li className="item">{place.place_title}</li>
                    ))}
                </ul>
            </aside>

        )
    }
}

export default Menu