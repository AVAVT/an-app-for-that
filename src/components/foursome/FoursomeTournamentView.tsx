import { Col, Input, Label, Table as ReactTable, Row } from "reactstrap";
import "./foursome.css";
import type { Player, Round, Table } from "./types";

export interface FoursomeTournamentViewProps {
  playerData: Player[];
  matchData: Round[];
  onScoreChanged: (
    roundIndex: number,
    tableIndex: number,
    playerIndex: number,
    number: number,
  ) => void;
}

export default function FoursomeTournamentView({
  playerData,
  matchData,
  onScoreChanged,
}: FoursomeTournamentViewProps) {
  const composeInputHandler =
    (roundIndex: number, tableIndex: number, playerIndex: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const number = Number(e.target.value);
      onScoreChanged(roundIndex, tableIndex, playerIndex, number);
    };

  const renderRound = (roundData: Round, index: number) => (
    <Row key={index} className="mb-5 round_container">
      <Col xs="12">
        <h3>Round {index + 1}</h3>
      </Col>
      {roundData.tables.map((tableData, tableIndex) =>
        renderTable(tableData, tableIndex, index),
      )}
    </Row>
  );

  const renderTable = (
    tableData: Table,
    tableIndex: number,
    roundIndex: number,
  ) => {
    const freeGame = tableData.players.some(
      (player) => !playerData[player.id].name,
    );
    return (
      <Col sm="6" xl="3" key={tableIndex}>
        <div
          className="table_view"
          {...(freeGame && { style: { opacity: 0.5 } })}
        >
          <h4 className="table_view_header bg-primary text-white">
            Round {roundIndex + 1} - Table {tableIndex + 1}
          </h4>
          <div className="table_view_body mt-2">
            {tableData.players.map(({ id, matchScore }, playerIndex) => {
              return (
                <div key={id}>
                  <Label
                    style={{
                      maxWidth: "100%",
                      flex: "1 1 auto",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Input
                      type="number"
                      className="form-control d-inline-block mr-2"
                      defaultValue={matchScore || 0}
                      placeholder="Score"
                      style={{ width: 70 }}
                      onChange={composeInputHandler(
                        roundIndex,
                        tableIndex,
                        playerIndex,
                      )}
                    />
                    {playerData[id].name}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </Col>
    );
  };

  const sortedPlayers = [...playerData].sort(
    (a, b) =>
      (b.gameCount === 0 ? 0 : b.score / b.gameCount) -
      (a.gameCount === 0 ? 0 : a.score / a.gameCount),
  );

  return (
    <Row className="tournament_view_container">
      <Col id="player_ranking" md="4" lg="3">
        <h3>Player Ranking</h3>
        <ReactTable striped borderless responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Games</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) =>
              player.gameCount > 0 ? (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                  <td>{player.gameCount}</td>
                </tr>
              ) : null,
            )}
          </tbody>
        </ReactTable>
      </Col>
      <Col id="tournament_games" md="8" lg="9">
        {matchData.map(renderRound)}
      </Col>
    </Row>
  );
}
