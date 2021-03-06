import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from 'reactstrap';

import { schedule, updatePlayerDataWithMatchData } from './foursome';
import FoursomePlayerInput from './FoursomePlayerInput';
import FoursomeTournamentView from './FoursomeTournamentView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

class FoursomeScheduler extends React.PureComponent {
  state = {
    gameData: null
  }

  componentDidMount() {
    const savedData = JSON.parse(localStorage.getItem('foursome-tournament'));
    if (savedData) this.setState({ gameData: savedData })
  }

  startGame = players => this.setState({
    gameData: schedule(players)
  }, this.save)

  resetGame = () => {
    localStorage.removeItem('foursome-tournament');
    this.setState({ gameData: null });
  }

  save = () => {
    localStorage.setItem('foursome-tournament', JSON.stringify(this.state.gameData));
  }

  setPlayerTableScore = (roundIndex, tableIndex, playerIndex, score) => {
    const matchData = this.state.gameData.matchData.map(
      (round, roundIndex2) => roundIndex !== roundIndex2
        ? round
        : {
          tables: round.tables.map(
            (table, tableIndex2) => tableIndex !== tableIndex2
              ? table
              : {
                players: table.players.map(
                  (player, playerIndex2) => playerIndex !== playerIndex2
                    ? player
                    : {
                      ...player,
                      matchScore: score
                    }
                )
              }
          )
        }
    );

    const playerData = updatePlayerDataWithMatchData(this.state.gameData.playerData, matchData);
    this.setState({
      gameData: {
        playerData,
        matchData
      }
    }, this.save);
  }



  render() {
    return (
      <div className="container-fluid">
        <Helmet>
          <title>Foursome Scheduler - An App for that</title>
        </Helmet>

        <h1>Foursome Scheduler</h1>
        <p className="text-muted d-print-none"><FontAwesomeIcon icon={faPrint} /> Printer-friendly on Chrome</p>
        <div className="d-flex justify-content-between d-print-none">
          <Link to="/">Home</Link>
          {
            this.state.gameData &&
            <Button color="outline-danger" onClick={this.resetGame}>New Tournament</Button>
          }
        </div>
        {
          this.state.gameData
            ? <FoursomeTournamentView
              matchData={this.state.gameData.matchData}
              playerData={this.state.gameData.playerData}
              onScoreChanged={this.setPlayerTableScore}
            />
            : <FoursomePlayerInput onStart={this.startGame} />
        }
      </div>
    )
  }
}

export default FoursomeScheduler;