import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profileActions';


class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  
  render() {
    const {profiles, loading} = this.props.profile;
    let profileItems;
    if(profiles == null || loading) {
      profileItems = (
        <div className="container mt-5 mb-5">
          <br /><br /><br /><br />
          <Spinner />
          <br /><br /><br /><br />
        </div>);
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = (
          <div class="mt-5 pt-5 m5-5 pb-5">
            <h4>Ops.. No profiles found right now...</h4>
          </div>);
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
