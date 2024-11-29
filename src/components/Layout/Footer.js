import React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGroup,
    faLink,
    faLocationDot,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookF,
    faYoutube,
    faTwitter,
    faLinkedinIn,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Logo from '../../assets/images/mainlogo.png';

class Footer extends React.Component {
    render() {
        return (
            <footer id="site-footer">
                <div className="bg-success bg-opacity-25 py-5">
                    <div className="container py-3">
                        <div className="row">
                            {/* About Us Section */}
                            <div className="col-xl-3 col-md-6 col-sm-12">
                                <h5 className="pb-3">
                                    <FontAwesomeIcon icon={faUserGroup} className="pe-1" /> About Us
                                </h5>
                                <p className="text-secondary">
                                   Something Crazy,
                                </p>
                            </div>
                            {/* Important Links Section */}
                            <div className="col-xl-3 col-md-6 col-sm-12">
                                <h5 className="pb-3">
                                    <FontAwesomeIcon icon={faLink} className="pe-1" /> Important Links
                                </h5>
                                {/* <ul className="list-unstyled">
                                    <li>
                                        <a href="#" className="text-decoration-none link-secondary">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-decoration-none link-secondary">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-decoration-none link-secondary">
                                            Terms of Service
                                        </a>
                                    </li>
                                </ul> */}
                            </div>
                            {/* Location Section */}
                            <div className="col-xl-3 col-md-6 col-sm-12">
                                <h5 className="pb-3">
                                    <FontAwesomeIcon icon={faLocationDot} className="pe-1" /> Our Location
                                </h5>
                                <address className="text-secondary">
                                    Sukhi Siwaia,<br />
                                    Banglae ke pichae wala Bangla.
                                    Bank Line Pulia.
                                    Thailand.
                                </address>
                            </div>
                            {/* Stay Updated Section */}
                            <div className="col-xl-3 col-md-6 col-sm-12">
                                <h5 className="pb-3">
                                    <FontAwesomeIcon icon={faPaperPlane} className="pe-1" /> Stay Updated
                                </h5>
                                <form>
                                    <label htmlFor="email" className="visually-hidden">Email ID</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-100 mb-2 form-control"
                                        placeholder="Email ID"
                                    />
                                    <button className="w-100 btn btn-dark">
                                        Subscribe Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="bg-dark py-3">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Social Icons */}
                            <div className="col-md-4 col-sm-12 text-center text-md-start">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <a className="btn btn-outline-secondary" href="#" aria-label="Facebook">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="btn btn-outline-secondary" href="#" aria-label="YouTube">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="btn btn-outline-secondary" href="#" aria-label="Twitter">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="btn btn-outline-secondary" href="#" aria-label="LinkedIn">
                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="btn btn-outline-secondary" href="#" aria-label="GitHub">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* Logo */}
                            <div className="col-md-4 col-sm-12 text-center">
                                <Link className="navbar-brand d-flex align-items-center justify-content-center" to="/">
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        style={{ height: "50px", width: "50px", marginRight: "10px" }}
                                    />
                                </Link>
                            </div>
                            {/* Copyright */}
                            <div className="col-md-4 col-sm-12 text-center text-md-end">
                                <span className="text-secondary">
                                    Copyright &copy; 2024
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
