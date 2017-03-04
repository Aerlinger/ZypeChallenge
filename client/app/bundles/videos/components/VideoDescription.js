import React, {PropTypes, Component} from 'react';
import moment from 'moment';

export default class VideoDescription extends Component {
  subscriptionBadge() {
    let {video} = this.props;

    if (video.subscription_required) {
      return <span className="small label label-primary">Subscription</span>
    } else {
      return <span className="small label label-success">Free</span>
    }
  }

  render() {
    let { video } = this.props;

    const duration = moment.duration(video.duration, 's').format("h:m:ss");
    const timeUpdated = moment(video.published_at).fromNow();

    return <div>
      <div className="pull-right">
        <strong>&#9734; {video.rating}</strong>
        <strong>
          <span className="glyphicon glyphicon-time" aria-hidden="true"> </span>
          {duration}s
        </strong>
      </div>

      < h5 >
        <a href={`/videos/${video._id}`}>
          {
            video.title
          }
        </a>
      </h5>


      <p>{video.short_description}</p>

      <div>
        <time>
          Published {timeUpdated}
        </time>
      </div>
      {this.subscriptionBadge()}
    </div>
  }
}
