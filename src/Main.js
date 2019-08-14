import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Row, Col } from 'reactstrap';

class Main extends React.PureComponent {

  render() {
    return (
      <div className="container" >
        <Helmet>
          <title>Home - An App for that</title>
        </Helmet>

        <h1>An App for that</h1>

        <Row>
          <Col>
            <ul>
              <li>
                <Link to="/qrcode">QRCode Scanner/Creator</Link>
              </li>
              <li>
                <Link to="/foursome">Foursome Round-robin Tournament Scheduler</Link>
              </li>
              <li>
                <Link to="/seatwind">Mahjong Seat Wind Picker</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </div >
    );
  }
}

export default Main;
