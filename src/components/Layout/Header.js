import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGlobe,
    faHomeAlt,
    faUserGroup,
    faGamepad,
    faRobot,
} 
from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Logo from '../../assets/images/mainlogo.png';

class Header extends React.Component {
    render() {
        return (
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
                        <div className="container-fluid">
                            <Link className="navbar-brand d-flex align-items-center" to="/">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    style={{ height: "40px", marginRight: "10px" }}
                                />
                                <span>Crazy React</span>
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <FontAwesomeIcon icon={faHomeAlt} />  <span>Home</span>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to="/about">
                                            <FontAwesomeIcon icon={faUserGroup} /> <span>About Us</span>
                                        </Link>
                                    </li> */}
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to="/contact">
                                            <FontAwesomeIcon icon={faGlobe} /> <span>Contact Us</span>
                                        </Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/games">
                                            <FontAwesomeIcon icon={faGamepad} /> <span>Games</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/tetris">
                                            <FontAwesomeIcon icon={faRobot} /> <span>Tetris</span>
                                        </Link>
                                    </li>

                                    {/* <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  Movies
                </Link>
              </li> */}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
        );
    }
}

export default Header;
