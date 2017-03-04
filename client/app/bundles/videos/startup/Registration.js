import ReactOnRails from 'react-on-rails';

import VideoPlayer from '../containers/VideoPlayer.js';
import Videos from '../containers/Videos.js';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  VideoPlayer,
  Videos
});
