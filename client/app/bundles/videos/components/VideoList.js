import React, {Component, PropTypes} from 'react';

import VideoListItem from './VideoListItem';
import {getVideos} from '../services/ZypeVideosApi'

export default class VideoList extends Component {
  constructor() {
    super();
    this.state = {videos: []}
  }

  getVideos() {
    let { app_key } = this.props;

    this.props.getVideos(app_key).then(
        videos => {
          this.setState({
            videos: videos.response
          });
        });
  }

  componentWillMount() {
    this.getVideos();
  }

  render() {
    const {videos} = this.state;
    const {filter} = this.props;

    return (
        <div>
          <ul className="list-unstyled">
            {
              renderVideos(videos, filter.toLowerCase())
            }
          </ul>
        </div>
    );
  }
}

VideoList.propTypes = {
  filter: PropTypes.string.isRequired,
  getVideos: PropTypes.func.isRequired,
  app_key: PropTypes.string.isRequired
};

VideoList.defaultProps = {getVideos};

/**
 * A functional approach to transform raw API JSON response into view data, applying our filter as necessary.
 * Result is sorted by the date the video is published.
 *
 * @param videos raw videos response from API
 * @param filter query string with which to filter videos
 */
function renderVideos(videos, filter) {
  return videos
      .filter(video => {
        // Filter videos based on title and description content
        return !filter ||
            (video.title && video.title.toLowerCase().includes(filter)) ||
            (video.description && video.description.toLowerCase().includes(filter));
      })
      .sort(
          (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)
      )
      .map(
          video => <VideoListItem key={video.created_at} video={video}/>
      );
}
