import ReactOnRails from 'react-on-rails';

import Login from '../containers/Login';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  Login
});
