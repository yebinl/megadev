import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor(){
    super();
    //initialize the state
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
  componentWillReceiveProps(nextProps){
    if(nextProps.errors) {
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
    let newUser = {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      password2 : this.state.password2
    };
    this.props.registeruser(newUser, this.props.history);
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
                <p className="lead text-center">Create your account...</p>
                <br />
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Your Name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name} />
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.emal}
                    onChange={this.onChange}
                    error={errors.email} />
                  <TextFieldGroup
                    placeholder="Your Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password} />
                  <TextFieldGroup
                    placeholder="Comfire Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2} />
                  <small>&nbsp;By creating an account, you agree to our <Link to="#">Terms</Link> & <Link to="#">Privacy</Link>.</small>
                  <br />
                  <input type="submit"
                        className="btn btn-lg btn-primary btn-block mt-4" />
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

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registeruser})(withRouter(Register));
