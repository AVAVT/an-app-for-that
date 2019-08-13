import React from 'react';
import './App.css';

import { HashRouter as Router, Route } from "react-router-dom";
import Main from './Main';
import QRCode from './QRCode/QRCode';

class App extends React.PureComponent {

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Main} />
          <Route path="/qrcode" component={QRCode} />
        </div>
      </Router>
    );
  }
}

export default App;
