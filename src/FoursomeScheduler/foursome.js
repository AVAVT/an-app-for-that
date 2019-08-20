const matchupPresets = require('./foursome-schedule-presets.json');
const shuffle = require('knuth-shuffle').knuthShuffle;

export const schedule = (players) => {
  const playerData = players.map((player, index) => ({
    id: index,
    name: player
  }));
  const shuffledPlayerIds = shuffle([...playerData.map(data => data.id)]);
  const preset = matchupPresets[players.length];

  const matchData = preset.map((round) => ({
    tables: round.map((table) => ({
      players: table.map(presetIndex => ({
        id: shuffledPlayerIds[presetIndex],
        matchScore: 0
      }))
    }))
  }));

  return {
    playerData: updatePlayerDataWithMatchData(playerData, matchData),
    matchData
  }
}

export const updatePlayerDataWithMatchData = (playerData, matchData) => {
  const result = playerData.map(player => ({
    ...player,
    score: 0,
    gameCount: 0
  }));

  for (let round of matchData) {
    for (let table of round.tables) {
      const freeGame = table.players.some(player => !playerData[player.id].name)
      if (freeGame) continue;
      for (let player of table.players) {
        result[player.id].score += player.matchScore
        result[player.id].gameCount++;
      }
    }
  }

  return result;
}