export type Player = {
  id: number;
  name: string;
  score: number;
  gameCount: number;
};

export type GameData = {
  playerData: Player[];
  matchData: Round[];
};

export type Round = {
  tables: Table[];
};

export type Table = {
  players: MatchPlayer[];
};

export type MatchPlayer = {
  id: number;
  matchScore: number;
};
