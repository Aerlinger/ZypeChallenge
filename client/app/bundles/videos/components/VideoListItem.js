import React, {PropTypes, Component} from 'react';
import moment from 'moment';

export default class VideoListItem extends Component {
  subscriptionBadge() {
    let { video } = this.props;

    if (video.subscription_required) {
      return <span className="label label-primary pull-right">Subscription</span>
    } else {
      return <span className="label label-success pull-right">Free</span>
    }
  }

  /**
   * Generate link to video
   *
   * Three possibilities:
   *  - free video: -> go to video page
   *  - subscription video, user not logged in -> go to login page, remember video location
   *  - subscription video, user logged in -> go to video page
   */
  videoLink(video) {
    const userAuthenticated = UserAuthStore.isUserAuthenticated();

    if (userAuthenticated()) {

    } else if (video.isSubscription) {
      {`/videos/${video._id}?is_subscription=${video.subscription_required}`}
    }
  }

  render() {
    let { video } = this.props;

    const timeUpdated = moment(video.published_at).fromNow();

    let duration = moment.duration(video.duration, 's').format("h:m:s");
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
              <div className="pull-right">
                <strong>&#9734; {video.rating}</strong>
                <strong>&#4292; {duration}</strong>
              </div>

              <h5>
                <a href={`/videos/${video._id}`}>{video.title}</a>
              </h5>

              <p>{video.short_description}</p>

              <time>
                Published {timeUpdated}
              </time>

              {this.subscriptionBadge()}
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
