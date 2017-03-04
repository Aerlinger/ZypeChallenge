import React, {PropTypes, Component} from 'react';
import moment from 'moment';

import {getVideo} from '../services/ZypeVideosApi'

export default class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      video: {}
    }
  }

  componentWillMount() {
    const {app_key, _id} = this.props;

    getVideo(app_key, _id)
        .then(({video}) => {
          console.log("VIDEO", video);

          this.setState({video});
        })
        .catch((error) => {
          console.warn(error)
        });
  }

  componentDidMount() {
    const {video} = this.state;
    const {app_key} = this.props;

    var script = document.createElement("script");

    script.src = `https://player.zype.com/embed/${this.props._id}.js?autoplay=true&app_key=${app_key}`;
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    const {video} = this.state;
    const {_id} = this.props;

    const timeUpdated = moment(video.published_at).fromNow();

    let duration = moment.duration(video.duration, 's').format("h:m:s");

    return <div className="container">
      <h4>
        <a href={`/videos/${video._id}`}>{video.title}</a>
      </h4>

      <div id={`zype_${_id}`}></div>

      <div className="row">
        <div className="col-sm-12">
          <div className="pull-right">
            <strong>&#9734; {video.rating}</strong>
            <strong>&#4292; {duration}</strong>
          </div>

          <p>{video.short_description}</p>

          <time>Created {timeUpdated}</time>
        </div>
      </div>
    </div>
  }
}

VideoPlayer.propTypes = {
  _id: PropTypes.string.required
};

VideoPlayer.defaultProps = {
  video: {},
};

