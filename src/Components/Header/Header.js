import React, { Component } from 'react'
import './Header.css'

class Menu extends Component {

    toggleMenu = () => {
        const menu = document.querySelector('aside')
        menu.classList.toggle("toggle")
    }

    render() {

        return (
            <header>
                <span className="toggle-menu fas fa-bars" onClick={this.toggleMenu}></span>
                <h1 className="page-title">Egypt Places Guide</h1>
            </header>
        )
    }
}

export default Menu