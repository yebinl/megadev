import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import {Link} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(){
    super();
    //initialize the state
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    //bind this to the method
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if(nextProps) {
      this.setState({errors: nextProps.errors});
    }
  }
  onChange(e) {
    //set the state value
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e) {
    //submit to the server
    e.preventDefault();  //get rid of default behavior since it's a form
    let userData = {
      email : this.state.email,
      password : this.state.password
    };
    this.props.loginUser(userData);
  }
  render () {
    const errors = this.state.errors;
    return (
      <div className="register">
        <div className="container">
        <br />
          <div className="row col-md-8 m-auto rounded registerbg">
            <div className="col-md-8 m-auto mb-5 mt-4">
              <div className="mb-5 mt-4">
                <br />
                <h2 className="text-center">Mega<strong>Developer</strong></h2>
                <p className="lead text-center">Welcome back</p>
                <br />
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email} />
                  <TextFieldGroup
                    placeholder="Your Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password} />
                  <div>
                    &nbsp;&nbsp;<input type="checkbox" id="exampleCheck1" />
                    <label>&nbsp;&nbsp;Remember this account?</label>
                  </div>
                  <br />
                  <div>
                    <small>&nbsp;Forget your password? <Link to="#">Click Here</Link>.</small>
                  </div>
                  <div>
                    <small>&nbsp;Forget your account? <Link to="#">Account Recovery</Link>.</small>
                  </div>
                  <input type="submit"
                        className="btn btn-lg btn-primary btn-block mt-3" />
                </form>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {loginUser})(Login);
