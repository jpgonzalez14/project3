import React from 'react';
import { Link } from 'react-router-dom';

import Channels from './Channels';

export default class Groups extends React.Component {
  render() {
    return (
      <div>
        <h1>Groups</h1>
        <Channels/>
      </div>
    );
  }
}
