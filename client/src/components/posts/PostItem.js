import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deletePost, addLike, removeLike} from '../../actions/postActions';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  findUserLike(likes) {
    const {auth} = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const {post, auth, showActions} = this.props;
    let myselfMark = null;
    if(auth.user.id === post.user){
      myselfMark = (
        <span className="text-center mt-1 badge badge-success">
          Me
        </span>);
    }
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/id/${post.user}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="Avatar" />
            </Link>
            <div className="text-center container">
              <p className="text-center text-muted mt-3 mb-1">{post.name}</p>
              {myselfMark}
            </div>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1">
                  <i className={classnames('fas fa-thumbs-up text-secondary', {'text-success': this.findUserLike(post.likes)})}/>
                  <span className="badge badge-light text-secondary">{post.likes.length}</span>
                </button>
                <button onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-3">
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-success ml-3 mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button" className="btn btn-danger ml-3 mr-1">
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);
