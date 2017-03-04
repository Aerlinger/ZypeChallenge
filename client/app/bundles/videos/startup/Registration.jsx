import ReactOnRails from 'react-on-rails';

import Videos from '../containers/Videos.js';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  Videos
});
