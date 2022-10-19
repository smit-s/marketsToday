import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark px-3"
        style={{ backgroundColor: "#374f6e" }}
      >
        <Link className="navbar-brand fw-bold" to="/overview">
          markets today
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link fw-normal" to="/overview">
                {" "}
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-normal" to="/analysis">
                Stock Analysis
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-normal" to="/news">
                {" "}
                News
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link fw-normal" to="/about">
                {" "}
                About
              </Link>
            </li> */}
          </ul>
        </div>
        {/* <form className="d-flex form-inline my-2 my-lg-0">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form> */}
      </nav>
    );
  }
}

export default Navbar;
