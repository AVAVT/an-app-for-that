"use client";

import { knuthShuffle as shuffle } from "knuth-shuffle";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, FormGroup, Input, Row } from "reactstrap";

export default function FoursomeSchedulerPage() {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", ""]);
  const [pairedPlayers, setPairedPlayers] = useState<string[][] | null>(null);

  const templatePingPong = () => {
    setPlayerNames(["Vat", "Xeko", "Sakura", "Willy"]);
  };

  const pairPlayers = () => {
    const shuffledPlayerNames = shuffle([...playerNames]);
    setPairedPlayers([
      [
        shuffledPlayerNames[0],
        shuffledPlayerNames[1],
        shuffledPlayerNames[2],
        shuffledPlayerNames[3],
      ],
      [
        shuffledPlayerNames[0],
        shuffledPlayerNames[2],
        shuffledPlayerNames[3],
        shuffledPlayerNames[1],
      ],
      [
        shuffledPlayerNames[3],
        shuffledPlayerNames[0],
        shuffledPlayerNames[1],
        shuffledPlayerNames[2],
      ],
    ]);
  };

  return (
    <Container fluid="md">
      <h1>Team Pair Matching</h1>
      <Link href="/">Home</Link>
      <section className="mt-5">
        {playerNames.map((value, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <FormGroup key={index}>
            <Input
              className="form-control"
              value={value}
              placeholder={`Name for player ${index + 1}...`}
              onChange={(e) =>
                setPlayerNames(
                  playerNames.map((name, index2) =>
                    index === index2 ? e.target.value : name,
                  ),
                )
              }
            />
          </FormGroup>
        ))}
        <div className="tw:flex tw:gap-2">
          <Button color="primary" onClick={pairPlayers}>
            Pair Players
          </Button>
          <Button color="secondary" onClick={templatePingPong}>
            Template Ping Pong
          </Button>
        </div>
      </section>
      {pairedPlayers?.map((match, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index} className="mt-5">
          <h3>Match {index + 1}</h3>
          <div className="px-4">
            <span className="tw:font-bold px-1">{match[0]}</span>+
            <span className="tw:font-bold px-1">{match[1]}</span>
          </div>
          <div className="px-4">vs</div>
          <div className="px-4">
            <span className="tw:font-bold px-1">{match[2]}</span>+
            <span className="tw:font-bold px-1">{match[3]}</span>
          </div>
        </div>
      ))}
    </Container>
  );
}
