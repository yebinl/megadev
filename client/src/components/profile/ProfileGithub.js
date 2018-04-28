import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '01c010ae9f51ed9d5d02',
      clientSecret: '3d7a840574906315c94e71a7fa4687ece0fce4f3',
      count: 3,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const {repos} = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-lg-9 col-md-6">
            <h5>
              <Link to={repo.html_url} className="text-success" target="_blank">
                {repo.name}
              </Link>
            </h5>
            <p>{repo.description}</p>
          </div>
          <div className="col-lg-3 col-md-6">
            <span className="badge badge-warning mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-danger mr-1">
              Watchs: {repo.watchers_count}
            </span>
            <span className="badge badge-info">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4 text-success text-center">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
