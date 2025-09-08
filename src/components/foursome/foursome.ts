import { knuthShuffle } from "knuth-shuffle";

import matchupPresets from "./foursome-schedule-presets.json";
import type { GameData, Player, Round } from "./types";

export const schedule = (players: string[]): GameData | null => {
  const playerData = players.map((player, index) => ({
    id: index,
    name: player,
  }));
  const shuffledPlayerIds = knuthShuffle([...playerData.map((data) => data.id)]);

  const preset = matchupPresets[players.length as 16 | 20 | 24 | 28 | 32];

  const matchData = preset.map((round: number[][]) => ({
    tables: round.map((table) => ({
      players: table.map((presetIndex) => ({
        id: shuffledPlayerIds[presetIndex],
        matchScore: 0,
      })),
    })),
  }));

  return {
    playerData: updatePlayerDataWithMatchData(playerData, matchData),
    matchData,
  };
};

export const updatePlayerDataWithMatchData = (
  playerData: { id: number; name: string }[],
  matchData: Round[],
): Player[] => {
  const result = playerData.map((player) => ({
    ...player,
    score: 0,
    gameCount: 0,
  }));

  for (const round of matchData) {
    for (const table of round.tables) {
      const freeGame = table.players.some((player) => !playerData[player.id].name);
      if (freeGame) continue;
      for (const player of table.players) {
        result[player.id].score += player.matchScore || 0;
        result[player.id].gameCount++;
      }
    }
  }

  return result;
};
