import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render () {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;
    let dashboardContent;
    if(profile === null || loading) {
      dashboardContent = (
        <div className="container mt-5 mb-5">
          <br /><br /><br /><br />
          <Spinner />
          <br /><br /><br /><br />
        </div>
      );
    } else {
      //check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h4 className="text-muted mt-5 mb-3">Welcome <Link to={`/profile/handle/${profile.handle}`}>
                <strong>{user.name}</strong>
              </Link>!</h4>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <br />
            <Education education={profile.education} />
            <div style={{marginBottom:'40px'}} />
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
            </div>
        );
      } else {
        dashboardContent=(
          <div className="mb-3">
            <h1 className="text-muted mt-5 mb-3">Welcome <strong>{user.name}</strong>!</h1>
            <p>We notice you have not yet setup your profile page, please create your profile.</p>
            <p>It will help other developers find and follow you easier.</p>
            <p>Click the link to create profile page.</p>
            <br />
            <br />
            <br />
            <Link to="/create-profile" className="btn btn-lg btn-primary">Create Profile</Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  };
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
