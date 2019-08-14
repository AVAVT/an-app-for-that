import React from 'react';
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Input,
  FormGroup
} from 'reactstrap';

const playerCounts = [16/*, 20, 24, 28, 32*/];

class FoursomePlayerInput extends React.PureComponent {
  state = {
    playerCount: 16,
    playerNames: Array.from({ length: 16 }).map(() => '')
  }

  composePlayerCountSetter = number => () => this.setState({
    playerCount: number,
    playerNames: Array.from({ length: number }).map((i, index) => this.state.playerNames[index] || '')
  });

  startGame = () => this.props.onStart(this.state.playerNames);

  renderPlayerInput = (value, index) => (
    <Col sm="6" md="4" lg="3" key={index}>
      <FormGroup>
        <Input
          className="form-control"
          value={value}
          placeholder={`Name for player ${index + 1}...`}
          onChange={(e) => this.setState({
            playerNames: this.state.playerNames.map((name, index2) => index === index2 ? e.target.value : name)
          })}
        />
      </FormGroup>
    </Col>
  )

  render() {
    return (
      <>
        <Row className="mt-5 mb-3">
          <Col xs="12">
            <div>Number of players:</div>
            <ButtonGroup className="mb-3">
              {playerCounts.map(count => (
                <Button
                  key={count}
                  color={this.state.playerCount === count ? 'primary' : 'secondary'}
                  onClick={this.composePlayerCountSetter(count)}
                >
                  {count}
                </Button>
              ))}
            </ButtonGroup>
            {(this.state.playerCount === 16 || this.state.playerCount === 28) && (
              <div className="text-muted">Note: Perfect solution available (meaning each player can play against all opponents).</div>
            )}
          </Col>
        </Row>
        <hr />
        <Row className="pb-5">
          <Col xs="12">
            <p>Enter player names. Leave field empty if there're not enough players.</p>
          </Col>

          {this.state.playerNames.map(this.renderPlayerInput)}

          <Col xs="12" className="mt-2">
            <Button color="primary" onClick={this.startGame}>Start</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default FoursomePlayerInput;