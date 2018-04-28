import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearProfile} from '../../actions/profileActions';

class Navbar extends React.Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();
  }
  render () {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const authLinks = (
      <Link className="btn btn-outline-primary pl-4 pr-4 mr-4" to="#" onClick={this.onLogoutClick.bind(this)} >Logout</Link>
    );
    const guestLinks = (
      <Link className="btn btn-outline-primary pl-4 pr-4 mr-4" to="/login">Login</Link>
    );
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-4 bg-light border-bottom box-shadow">
          <h5 className="my-0 ml-4 mr-md-auto font-weight-normal">
            <Link className="navlogo" to="/">Mega<strong>Developer</strong></Link>
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 mr-3 text-dark" to="/">Home</Link>
            <Link className="p-2 mr-3 text-dark" to="/feed">Articles</Link>
            <Link className="p-2 mr-3 text-dark" to="/profiles">Developers</Link>
            {isAuthenticated && (<Link className="p-2 text-dark" to={`/profile/id/${this.props.auth.user.id}`}>
              <img src={this.props.auth.user.avatar}
                  alt={this.props.auth.user.name}
                  className="rounded-circle"
                  style={{width:'40px'}}
                  title="Go to https://en.gravatar.com/ and upload your profile picture" />
            </Link>)}
          </nav>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser, clearProfile})(Navbar);
