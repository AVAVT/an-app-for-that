import React from 'react';
import { Form, Row, Col, Input, Button, Label } from 'reactstrap';
import { randomInt } from '../Utilities/functions';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { knuthShuffle as shuffle } from 'knuth-shuffle';

class MostBestestLifeDecisionMaker extends React.PureComponent {
  state = {
    randomFrom: 1,
    randomTo: 4,
    drawAmount: 3,
    drawBank: 8
  }

  onFieldChanged = event => this.setState({
    [event.target.name]: parseInt(event.target.value) || 0
  })

  randomNum = (e) => {
    e.preventDefault();
    this.setState({
      randomNumResult: randomInt(this.state.randomFrom, this.state.randomTo + 1)
    });
  }

  randomDraw = (e) => {
    e.preventDefault();
    this.setState({
      drawResult: shuffle(Array.from({ length: this.state.drawBank }).map((i, index) => index + 1)).slice(0, this.state.drawAmount).join(', ')
    })
  }

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Most Bestest Life Decisions Maker - An App for that</title>
        </Helmet>

        <h1>Most Bestest Life Decisions Maker</h1>
        <Link to="/">Home</Link>

        <Row className="mt-5">
          <Col md="8 m-auto">
            <Form onSubmit={this.randomNum}>
              <Row>
                <Label for="randomFrom" className="col-form-label pl-3">Random from</Label>
                <Col md="2">
                  <Input
                    type="number"
                    name="randomFrom"
                    defaultValue={this.state.randomFrom}
                    onChange={this.onFieldChanged}
                  />
                </Col>
                <Label for="randomTo" className="col-form-label text-center">to</Label>
                <Col md="2">
                  <Input
                    type="number"
                    name="randomTo"
                    defaultValue={this.state.randomTo}
                    onChange={this.onFieldChanged}
                  />
                </Col>
                <Col md="2">
                  <Button className="btn-block" type="submit" color="primary">Go!</Button>
                </Col>
                <Label className="pl-3 col-form-label"><strong>{this.state.randomNumResult}</strong></Label>
              </Row>
            </Form>

            <hr />

            <Form onSubmit={this.randomDraw}>
              <Row>
                <Label for="drawAmount" className="col-form-label pl-3">Draw</Label>
                <Col md="2">
                  <Input
                    type="number"
                    name="drawAmount"
                    defaultValue={this.state.drawAmount}
                    onChange={this.onFieldChanged}
                  />
                </Col>
                <Label for="drawBank" className="col-form-label text-center">cards from</Label>
                <Col md="2">
                  <Input
                    type="number"
                    name="drawBank"
                    defaultValue={this.state.drawBank}
                    onChange={this.onFieldChanged}
                  />
                </Col>
                <Col md="2">
                  <Button className="btn-block" type="submit" color="primary">Go!</Button>
                </Col>
                <Label className="pl-3 col-form-label"><strong>{this.state.drawResult}</strong></Label>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MostBestestLifeDecisionMaker;