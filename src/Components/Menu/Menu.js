import React, { Component } from 'react'
import './Menu.css'

class Menu extends Component {
    render() {
        return (
            <aside>
                <h2>Find A Place!</h2>
                <div className="search-form">
                    <input type="text" placeholder="Search Here"/>
                </div>
                <ul className="search-result">
                    <li className="item">Place #1</li>
                    <li className="item">Place #2</li>
                    <li className="item">Place #3</li>
                </ul>
            </aside>

        )
    }
}

export default Menu