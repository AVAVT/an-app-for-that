const matchupPresets = require('./foursome-schedule-presets.json');
const shuffle = require('knuth-shuffle').knuthShuffle;

export const schedule = (players) => {
  const playerData = players.map((player, index) => ({
    id: index,
    name: player,
    score: 0
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
    playerData,
    matchData
  }
}