"use client";

import { knuthShuffle as shuffle } from "knuth-shuffle";
import Link from "next/link";
import { useState } from "react";
import { Button, Input } from "vat-ui";

const shuffleServer = (players: string[]) => {
  return shuffle([[...shuffle([players[0], players[1]])], [...shuffle([players[2], players[3]])]]).flat();
};

// All 3 possible pairings of 4 players
const matchTemplates = [
  [0, 1, 2, 3],
  [0, 2, 3, 1],
  [0, 3, 2, 1],
];

export default function FoursomeSchedulerPage() {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", "", ""]);
  const [pairedPlayers, setPairedPlayers] = useState<string[][] | null>(null);

  const templatePingPong = () => {
    setPlayerNames(["Vat", "Xeko", "Sakura", "Willy", ""]);
  };

  const templatePingPong2 = () => {
    setPlayerNames(["Vat", "Xeko", "Sakura", "Willy", "Sáng"]);
  };

  const pairPlayers = () => {
    if (!playerNames[4]) {
      const players = shuffle([...playerNames.slice(0, 4)]);

      setPairedPlayers(matchTemplates.map((template) => shuffleServer(template.map((i) => players[i]))));
    } else {
      const players = shuffle([...playerNames]);

      // For each pairing template, rotate who sits out => 5 * 3 = 15 matches
      setPairedPlayers(
        shuffle(
          matchTemplates.flatMap((template) =>
            players.map((sitOut, sitOutIndex) => {
              const playing = players.filter((_, i) => i !== sitOutIndex);
              return [...shuffleServer(template.map((i) => playing[i])), sitOut];
            }),
          ),
        ),
      );
    }
  };

  return (
    <article className="container-space">
      <h1>Team Pair Matching</h1>
      <Link href="/">Home</Link>
      <section className="mt-5 flex flex-col gap-4">
        {playerNames.map((value, index) => (
          <Input
            key={index}
            className="form-control"
            value={value}
            placeholder={`Name for player ${index + 1}...`}
            onChange={(e) =>
              setPlayerNames(playerNames.map((name, index2) => (index === index2 ? e.target.value : name)))
            }
          />
        ))}
        <div className="flex gap-2">
          <Button color="primary" variant="outline" onClick={templatePingPong}>
            Template Ping Pong 4
          </Button>
          <Button color="primary" variant="outline" onClick={templatePingPong2}>
            Template Ping Pong 5
          </Button>
        </div>
        <div className="flex gap-2">
          <Button color="primary" onClick={pairPlayers}>
            Pair Players
          </Button>
        </div>
      </section>

      {pairedPlayers?.map((match, index) => (
        <div key={index} className="mt-5">
          <h3>Match {index + 1}</h3>
          <div className="px-4">
            <span className="font-bold px-1">
              {match[0]}
              <span className="text-red-500">*</span>
            </span>
            +<span className="font-bold px-1">{match[1]}</span>
          </div>
          <div className="px-4">vs</div>
          <div className="px-4">
            <span className="font-bold px-1">{match[2]}</span>+<span className="font-bold px-1">{match[3]}</span>
          </div>
          {match[4] && (
            <div className="px-4 text-gray-500">
              sits out: <span className="font-bold">{match[4]}</span>
            </div>
          )}
        </div>
      ))}
      {pairedPlayers && (
        <div className="mt-2">
          (<span className="text-red-500">*</span>) is server
        </div>
      )}
    </article>
  );
}
