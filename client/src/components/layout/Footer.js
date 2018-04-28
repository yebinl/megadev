import React from 'react'
import {Link} from 'react-router-dom';

export default () => {
  return (
    <footer className="container py-5 mt-5 bg-white">
      <div className="row">
        <div className="col-12 col-md">
          <span className="d-block mb-2">Mega<strong>Dev</strong></span>
          <small className="d-block mb-3 text-muted">&copy; 2018-2020</small>
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li><Link className="text-muted" to="#">Cool stuff</Link></li>
            <li><Link className="text-muted" to="#">Random Feature</Link></li>
            <li><Link className="text-muted" to="#">Team Feature</Link></li>
            <li><Link className="text-muted" to="#">Stuff For Developers</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
            <li><Link className="text-muted" to="#">Resource</Link></li>
            <li><Link className="text-muted" to="#">Resource Name</Link></li>
            <li><Link className="text-muted" to="#">Another Resource</Link></li>
            <li><Link className="text-muted" to="#">Final Resource</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Career</h5>
          <ul className="list-unstyled text-small">
            <li><Link className="text-muted" to="#">Work For Us</Link></li>
            <li><Link className="text-muted" to="#">Job Categories</Link></li>
            <li><Link className="text-muted" to="#">Culture & Benefits</Link></li>
            <li><Link className="text-muted" to="#">FAQ</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li><Link className="text-muted" to="#">Team</Link></li>
            <li><Link className="text-muted" to="#">Locations</Link></li>
            <li><Link className="text-muted" to="#">Privacy</Link></li>
            <li><Link className="text-muted" to="#">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
