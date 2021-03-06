import React from 'react';
import './App.css';

import { HashRouter as Router, Route } from "react-router-dom";
import Main from './Main';
import QRCode from './QRCode/QRCode';
import FoursomeScheduler from './FoursomeScheduler/FoursomeScheduler';
import SeatWindPicker from './SeatWindPicker/SeatWindPicker';
import MostBestestLifeDecisionMaker from './MostBestestLifeDecisionMaker/MostBestestLifeDecisionMaker';

class App extends React.PureComponent {

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Main} />
          <Route path="/qrcode" component={QRCode} />
          <Route path="/foursome" component={FoursomeScheduler} />
          <Route path="/seatwind" component={SeatWindPicker} />
          <Route path="/random" component={MostBestestLifeDecisionMaker} />
        </div>
      </Router>
    );
  }
}

export default App;
