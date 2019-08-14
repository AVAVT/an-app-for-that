import React from 'react';
import { Table, Input, Label, Row, Col } from 'reactstrap';
import './foursome.css';

class FoursomeTournamentView extends React.PureComponent {

  composeInputHandler = (roundIndex, tableIndex, playerIndex) => e => {
    const number = Number(e.target.value);
    this.props.onScoreChanged(roundIndex, tableIndex, playerIndex, number);
  }
  renderRound = (roundData, index) => (
    <Row key={index} className="mb-5">
      <Col xs="12">
        <h3>Round {index + 1}</h3>
      </Col>
      {roundData.tables.map((tableData, tableIndex) => this.renderTable(tableData, tableIndex, index))}
    </Row>
  )

  renderTable = (tableData, tableIndex, roundIndex) => (
    <Col sm="6" xl="3" key={tableIndex}>
      <div key={tableIndex} className="table_view">
        <h4 className="table_view_header bg-primary text-white">Round {roundIndex + 1} - Table {tableIndex + 1}</h4>
        <div className="table_view_body mt-2">
          {tableData.players.map(({ id, matchScore }, playerIndex) => {
            console.log(matchScore);
            return (
              <div>
                <Label key={id} style={{ maxWidth: '100%', flex: '1 1 auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Input
                    type="number"
                    className="form-control d-inline-block"
                    defaultValue={matchScore || 0}
                    placeholder="Score"
                    style={{ width: 70 }}
                    onChange={this.composeInputHandler(roundIndex, tableIndex, playerIndex)}
                  />
                  {` ${this.props.playerData[id].name}`}
                </Label>
              </div>
            )
          })}
        </div>
      </div>
    </Col>
  )

  render() {
    const sortedPlayers = [...this.props.playerData].sort((a, b) => b.score - a.score);
    return (
      <Row style={{ position: 'relative' }}>
        <Col md="4" lg="3" style={{ borderRight: '1px solid #dedede' }}>
          <h3>Player Ranking</h3>
          <Table striped borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md="8" lg="9">
          {this.props.matchData.map(this.renderRound)}
        </Col>
      </Row>
    )
  }
}

export default FoursomeTournamentView;