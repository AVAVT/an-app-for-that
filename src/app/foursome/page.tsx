"use client";

import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "vat-ui";
import { schedule, updatePlayerDataWithMatchData } from "@/components/foursome/foursome";
import FoursomePlayerInput from "@/components/foursome/foursome-player-input";
import FoursomeTournamentView from "@/components/foursome/foursome-tournament-view";
import type { GameData } from "@/components/foursome/types";

export default function FoursomeSchedulerPage() {
  const [gameData, setGameData] = useState<GameData | null>(null);

  const loadSavedData = useCallback(() => {
    const savedData =
      typeof window !== "undefined" ? JSON.parse(localStorage.getItem("foursome-tournament") || "null") : null;
    if (savedData) return savedData;
    return null;
  }, []);

  const save = useCallback((gameData: GameData | null) => {
    localStorage.setItem("foursome-tournament", JSON.stringify(gameData));
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fire only once after first render
  useEffect(() => {
    setGameData(loadSavedData());
  }, []);

  useEffect(() => {
    if (gameData) save(gameData);
  }, [save, gameData]);

  const startGame = (players: string[]) => {
    setGameData(schedule(players));
  };

  const resetGame = () => {
    localStorage.removeItem("foursome-tournament");
    setGameData(null);
  };

  const setPlayerTableScore = (roundIndex: number, tableIndex: number, playerIndex: number, score: number) => {
    const matchData = gameData?.matchData.map((round, roundIndex2) =>
      roundIndex !== roundIndex2
        ? round
        : {
            tables: round.tables.map((table, tableIndex2) =>
              tableIndex !== tableIndex2
                ? table
                : {
                    players: table.players.map((player, playerIndex2) =>
                      playerIndex !== playerIndex2
                        ? player
                        : {
                            ...player,
                            matchScore: score,
                          },
                    ),
                  },
            ),
          },
    );

    const playerData = updatePlayerDataWithMatchData(gameData?.playerData || [], matchData || []);
    setGameData({
      playerData,
      matchData: matchData || [],
    });
  };

  return (
    <article className="container-space">
      <h1>Foursome Scheduler</h1>
      <p className="text-muted d-print-none">
        <FontAwesomeIcon icon={faPrint} /> Printer-friendly on Chrome
      </p>
      <div className="d-flex justify-content-between d-print-none">
        <Link href="/">Home</Link>
      </div>

      {gameData && (
        <Button variant="outline" color="tertiary" className="mt-4" onClick={resetGame}>
          New Tournament
        </Button>
      )}
      {gameData ? (
        <FoursomeTournamentView
          matchData={gameData.matchData}
          playerData={gameData.playerData}
          onScoreChanged={setPlayerTableScore}
        />
      ) : (
        <FoursomePlayerInput onStart={startGame} />
      )}
    </article>
  );
}
