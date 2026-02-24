import { Input } from "vat-ui";
import "./foursome.css";
import type { Player, Round, Table } from "./types";

export interface FoursomeTournamentViewProps {
  playerData: Player[];
  matchData: Round[];
  onScoreChanged: (roundIndex: number, tableIndex: number, playerIndex: number, number: number) => void;
}

export default function FoursomeTournamentView({ playerData, matchData, onScoreChanged }: FoursomeTournamentViewProps) {
  const composeInputHandler =
    (roundIndex: number, tableIndex: number, playerIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const number = Number(e.target.value);
      onScoreChanged(roundIndex, tableIndex, playerIndex, number);
    };

  const renderRound = (roundData: Round, index: number) => (
    <div key={index} className="mb-5 round_container">
      <h3>Round {index + 1}</h3>
      {roundData.tables.map((tableData, tableIndex) => renderTable(tableData, tableIndex, index))}
    </div>
  );

  const renderTable = (tableData: Table, tableIndex: number, roundIndex: number) => {
    const freeGame = tableData.players.some((player) => !playerData[player.id].name);
    return (
      <div key={tableIndex}>
        <div className="table_view" {...(freeGame && { style: { opacity: 0.5 } })}>
          <h4 className="table_view_header bg-primary text-white">
            Round {roundIndex + 1} - Table {tableIndex + 1}
          </h4>
          <div className="table_view_body my-2">
            {tableData.players.map(({ id, matchScore }, playerIndex) => {
              return (
                <div key={id} className="flex justify-start gap-2 items-baseline">
                  <Input
                    type="number"
                    className="form-control d-inline-block mr-2"
                    name={`player_${playerIndex}`}
                    defaultValue={matchScore || 0}
                    placeholder="Score"
                    style={{ width: 70 }}
                    onChange={composeInputHandler(roundIndex, tableIndex, playerIndex)}
                  />
                  <label htmlFor={`player_${playerIndex}`} className="text-ellipsis">
                    {playerData[id].name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const sortedPlayers = [...playerData].sort(
    (a, b) => (b.gameCount === 0 ? 0 : b.score / b.gameCount) - (a.gameCount === 0 ? 0 : a.score / a.gameCount),
  );

  return (
    <div className="tournament_view_container mt-6">
      <div id="player_ranking">
        <h3>Player Ranking</h3>
        <table className="w-full">
          <thead className="text-left">
            <tr>
              <th className="w-[3rem]">#</th>
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
        </table>
      </div>
      <div id="tournament_games" className="mt-6">
        {matchData.map(renderRound)}
      </div>
    </div>
  );
}
