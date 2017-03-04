import React, {Component, PropTypes} from 'react';
import VideoFilter from '../components/VideoFilter'
import VideoList from '../components/VideoList'

export default class Videos extends Component {
  constructor() {
    super();
    this.state = {
      filter: ''
    }
  }

  handleFilterUpdate = (filter) => {
    this.setState({filter})
  };

  render() {
    const {filter} = this.state;

    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h3>All Videos</h3>
              <VideoFilter onUpdate={this.handleFilterUpdate} />

              <VideoList
                  filter={filter}
                  app_key={this.props.app_key}
              />
            </div>
          </div>
        </div>
    );
  }
}

Videos.propTypes = {
  app_key: PropTypes.string
};

