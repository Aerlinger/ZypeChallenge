import React, {PropTypes, Component} from 'react';
import moment from 'moment';

import VideoDescription from '../components/VideoDescription';
import UserAuthStore from '../../../../libs/UserAuthStore';
import {getVideo} from '../services/ZypeVideosApi'

export default class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      video: {}
    }
  }

  needsAuthRedirect() {
    const {video} = this.state;
    const isUserAuthenticated = UserAuthStore.isUserAuthenticated();

    return !isUserAuthenticated && video.subscription_required
  }

  componentWillMount() {
    const {app_key, _id} = this.props;

    getVideo(app_key, _id)
        .then(({video}) => {
          this.setState({video});

          if (this.needsAuthRedirect()) {
            // TODO: react-router would be a good alternative here
            window.location.replace(`/sessions/new?target_video_id=${_id}`);
          }
        })
        .catch((error) => {
          console.warn(error)
        });
  }

  getFreeEmbedScript() {
    const {app_key} = this.props;

    return `https://player.zype.com/embed/${this.props._id}.js?autoplay=true&app_key=${app_key}`;
  }

  getSubscriptionEmbedScript() {
    const access_token = UserAuthStore.getToken();

    return `https://player.zype.com/embed/${this.props._id}.js?autoplay=true&access_token=${access_token}`;
  }

  componentDidMount() {
    let embed_src = UserAuthStore.isUserAuthenticated() ? this.getSubscriptionEmbedScript() : this.getFreeEmbedScript();
    let script = document.createElement("script");

    script.src = embed_src;
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    const {video} = this.state;
    const {_id} = this.props;

    return <div className="container">
      <h4>
        <a href={`/videos/${video._id}`}>{video.title}</a>
      </h4>

      <div id={`zype_${_id}`}></div>

      <div className="row">
        <div className="col-sm-12">
          <hr />
          <VideoDescription
              video={video}
          />
        </div>
      </div>
    </div>
  }
}

VideoPlayer.propTypes = {
  _id: PropTypes.string.isRequired
};

VideoPlayer.defaultProps = {
  video: {},
};

