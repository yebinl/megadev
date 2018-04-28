import React from 'react';
import {Link} from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-sm btn-light pl-4 pr-4">
        <i className="fas fa-user-circle text-success mr-2" />Edit Profile
      </Link>
      <a href="https://en.gravatar.com/" className="btn btn-sm btn-light pl-4 pr-4">
        <i className="far fa-image text-success mr-2" />Profile Picture
      </a>
      <Link to="/add-experience" className="btn btn-sm btn-light pl-4 pr-4">
        <i className="fab fa-black-tie text-success mr-2" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-sm btn-light pl-4 pr-4">
        <i className="fas fa-graduation-cap text-success mr-2" />
        Add Education
      </Link>
    </div>

  );
};

export default ProfileActions;
