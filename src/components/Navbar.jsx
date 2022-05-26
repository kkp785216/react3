import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    let navigator = useNavigate();
    let location = useLocation();
    useEffect(() => {
        // ga.send(["pageview", location.pathname]);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigator('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="mx-lg-2 mt-2 mt-lg-0">
                        {!localStorage.getItem('token')?<>
                        <Link to='/login' className="btn btn-success me-2">Login</Link>
                        <Link to='/signup' className="btn btn-primary">Signup</Link>
                        </>:<>
                        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                        </>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar