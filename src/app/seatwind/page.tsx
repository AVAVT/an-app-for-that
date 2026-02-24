"use client";

import "./seat-wind-picker.css";

import { knuthShuffle as shuffle } from "knuth-shuffle";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { SubmitEventHandler, useEffect, useState } from "react";
import { Button, Input } from "vat-ui";
import faceDown from "./images/face-down.png";
import east from "./images/wind-east.png";
import none from "./images/wind-none.png";
import north from "./images/wind-north.png";
import south from "./images/wind-south.png";
import west from "./images/wind-west.png";

const defaultTiles: {
  turn: number | null;
  open: boolean;
  name: string;
  img: StaticImageData;
}[] = [
  { name: "east", img: east },
  { name: "west", img: west },
  { name: "north", img: north },
  { name: "south", img: south },
].map((name) => ({
  turn: null,
  open: false,
  name: name.name,
  img: name.img,
}));

const sitout = {
  turn: null,
  open: false,
  name: "none",
  img: none,
};

export default function SeatWindPickerPage() {
  const [nextTurn, setNextTurn] = useState(1);
  const [sitoutCount, setSitoutCount] = useState(0);
  const [tiles, setTiles] = useState(defaultTiles);

  const shuffleTiles = () => {
    const empties = Array.from({ length: sitoutCount }).map(() => sitout);

    setNextTurn(1);
    setTiles(shuffle([...defaultTiles, ...empties]));
  };

  const formHandler: SubmitEventHandler = (e) => {
    e.preventDefault();
    shuffleTiles();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fire only once
  useEffect(() => {
    shuffleTiles();
  }, []);

  const composeTileHandler = (id: number) => () => {
    setTiles(
      tiles.map((tile, index) =>
        id === index
          ? {
              ...tile,
              open: true,
              turn: nextTurn,
            }
          : tile,
      ),
    );
    setNextTurn(nextTurn + 1);
  };

  return (
    <article className="container-space">
      <h1>Seat Wind Picker</h1>
      <Link href="/">Home</Link>

      <div className="text-center mt-5">
        <h3>Pick your tile</h3>
        <div>
          {tiles.map((tile, index) => {
            return (
              <div key={`${tile.name}-${index}`} className="inline-block mt-3">
                <p className="font-bold">{tile.turn || "?"}</p>
                {tile.open ? (
                  <Image width={128} height={128} key={tile.name} alt={`tile-${tile.name}`} src={tile.img} />
                ) : (
                  <Image
                    width={128}
                    height={128}
                    key={tile.name}
                    alt="Tile face down"
                    onClick={composeTileHandler(index)}
                    src={faceDown}
                  />
                )}
              </div>
            );
          })}
        </div>
        <form onSubmit={formHandler} className="mt-5">
          <div className="flex gap-4 justify-stretch items-baseline m-auto max-w-[500px]">
            <span className="flex-none">Sit out</span>
            <Input
              type="number"
              color="foreground"
              defaultValue={sitoutCount}
              className="mr-2 flex-1"
              onChange={(e) => setSitoutCount(parseInt(e.target.value, 10) || 0)}
            />
            <Button color="primary" variant="outline" type="submit">
              Shuffle Tiles
            </Button>
          </div>
        </form>
      </div>
      <div className="w-0 h-0 overflow-hidden">
        {defaultTiles.map((tile) => (
          <Image
            width={128}
            height={128}
            key={tile.name}
            alt={`tile-${tile.name}`}
            className="opacity-0"
            priority
            src={tile.img}
          />
        ))}
      </div>
    </article>
  );
}
