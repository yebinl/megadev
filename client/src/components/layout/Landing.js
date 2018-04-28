import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Landing extends Component {
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center mt-4">
                <h1 className="display-3 mb-4">MegaDeveloper</h1>
                <p className="lead mb-4"> Create a your profile today, share stories and get help from other developers</p>
                <br />
                <br />
                <Link to="register" className="btn btn-lg btn-primary mr-5 pl-5 pr-5">Sign Up</Link>
                <Link to="login" className="btn btn-lg btn-light pl-5 pr-5">&nbsp;Login&nbsp;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
