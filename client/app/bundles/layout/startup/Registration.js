import ReactOnRails from 'react-on-rails';

import TopHeader from '../containers/TopHeader';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  TopHeader
});
