"use client";

import { knuthShuffle as shuffle } from "knuth-shuffle";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, FormGroup, Input } from "reactstrap";

export default function FoursomeSchedulerPage() {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", ""]);
  const [pairedPlayers, setPairedPlayers] = useState<string[][] | null>(null);

  const templatePingPong = () => {
    setPlayerNames(["Vat", "Xeko", "Sakura", "Willy"]);
  };

  const pairPlayers = () => {
    const shuffledPlayerNames = shuffle([...playerNames]);

    setPairedPlayers([
      shuffle([
        [...shuffle([shuffledPlayerNames[0], shuffledPlayerNames[1]])],
        [...shuffle([shuffledPlayerNames[2], shuffledPlayerNames[3]])],
      ]).flat(),
      shuffle([
        [...shuffle([shuffledPlayerNames[0], shuffledPlayerNames[2]])],
        [...shuffle([shuffledPlayerNames[3], shuffledPlayerNames[1]])],
      ]).flat(),
      shuffle([
        [...shuffle([shuffledPlayerNames[0], shuffledPlayerNames[3]])],
        [...shuffle([shuffledPlayerNames[2], shuffledPlayerNames[1]])],
      ]).flat(),
    ]);
  };

  return (
    <Container fluid="md">
      <h1>Team Pair Matching</h1>
      <Link href="/">Home</Link>
      <section className="mt-5">
        {playerNames.map((value, index) => (
          <FormGroup key={index}>
            <Input
              className="form-control"
              value={value}
              placeholder={`Name for player ${index + 1}...`}
              onChange={(e) =>
                setPlayerNames(playerNames.map((name, index2) => (index === index2 ? e.target.value : name)))
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
        <div key={index} className="mt-5">
          <h3>Match {index + 1}</h3>
          <div className="px-4">
            <span className="tw:font-bold px-1">
              {match[0]}
              <span className="tw:text-red-500">*</span>
            </span>
            +<span className="tw:font-bold px-1">{match[1]}</span>
          </div>
          <div className="px-4">vs</div>
          <div className="px-4">
            <span className="tw:font-bold px-1">{match[2]}</span>+<span className="tw:font-bold px-1">{match[3]}</span>
          </div>
        </div>
      ))}
      {pairedPlayers && (
        <div className="mt-2">
          (<span className="tw:text-red-500">*</span>) is server
        </div>
      )}
    </Container>
  );
}
