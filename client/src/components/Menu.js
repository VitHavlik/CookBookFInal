
import React from 'react'
import {Link} from "react-router-dom";
const Menu = () => {
  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" className="navbar-collapse collapse">
                <div className="navbar-nav ml-auto">
                   
                    <Link to='/' className="nav-item nav-link active">Hlavní stránka</Link>
                    <Link to='/search' className="nav-item nav-link">Vyhledávání receptů</Link>
                 
                    <Link to='/add-recipe' className="nav-item nav-link">Přidat recept</Link>
                </div>
            </div>
        </nav>        
    )
}

export default Menu
