import React, {PropTypes, Component} from 'react';
import moment from 'moment';

import VideoDescription from './VideoDescription';

export default class VideoListItem extends Component {

  render() {
    let {video} = this.props;

    let thumbnail = video.thumbnails[2];

    return (
        <li className="border-bottom">
          <div className="row">
            <div className="col-xs-6 col-md-3">
              <a href={`/videos/${video._id}?is_subscription=${video.subscription_required}`} className="thumbnail">
                <img src={thumbnail.url}/>
              </a>
            </div>

            <div className="col-xs-6 col-md-9">
              <VideoDescription
                  video={this.props.video}
              />
            </div>
          </div>
        </li>
    );
  }
}

VideoListItem.propTypes = {
  video: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    thumbnails: PropTypes.array,
    _id: PropTypes.string
  }),
};

VideoListItem.defaultProps = {
  video: {},
};
