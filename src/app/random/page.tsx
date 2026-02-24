"use client";

import { knuthShuffle as shuffle } from "knuth-shuffle";
import Link from "next/link";
import { SubmitEventHandler, useState } from "react";
import { Button, Input } from "vat-ui";
import { randomInt } from "@/utilities/functions";

export default function RandomPage() {
  const [randomFrom, setRandomFrom] = useState(1);
  const [randomTo, setRandomTo] = useState(6);
  const [drawAmount, setDrawAmount] = useState(3);
  const [drawBank, setDrawBank] = useState(8);
  const [randomResult, setRandomResult] = useState<null | number>(null);
  const [drawResult, setDrawResult] = useState<null | string>(null);

  const randomNum: SubmitEventHandler = (e) => {
    e.preventDefault();
    if (randomTo < randomFrom) return;

    setRandomResult(randomInt(randomFrom, randomTo + 1));
  };

  const randomDraw: SubmitEventHandler = (e) => {
    e.preventDefault();

    if (drawBank < drawAmount) return;

    setDrawResult(
      shuffle(Array.from({ length: drawBank }).map((_, index) => index + 1))
        .slice(0, drawAmount)
        .join(", "),
    );
  };

  return (
    <article className="container-space">
      <h1>Most Bestest Life Decisions Maker</h1>
      <Link href="/">Home</Link>

      <div className="mt-5">
        <form onSubmit={randomNum}>
          <div className="flex gap-4 items-baseline">
            <label htmlFor="randomFrom" className="col-form-label pl-3">
              Random from
            </label>
            <Input
              type="number"
              name="randomFrom"
              defaultValue={randomFrom}
              onChange={(e) => setRandomFrom(Number(e.target.value || 0))}
              className="w-auto"
            />
            <label htmlFor="randomTo" className="col-form-label text-center">
              to
            </label>
            <Input
              type="number"
              name="randomTo"
              defaultValue={randomTo}
              onChange={(e) => setRandomTo(Number(e.target.value || 0))}
              className="w-auto"
            />
            <Button className="btn-block" type="submit" variant="outline">
              Go!
            </Button>
            <strong>{randomResult}</strong>
          </div>
        </form>

        <hr className="my-4" />

        <form onSubmit={randomDraw}>
          <div className="flex gap-4 items-baseline">
            <label htmlFor="drawAmount" className="col-form-label pl-3">
              Draw
            </label>
            <Input
              type="number"
              name="drawAmount"
              className="w-auto"
              defaultValue={drawAmount}
              onChange={(e) => setDrawAmount(Number(e.target.value || 0))}
            />
            <label htmlFor="drawBank" className="col-form-label text-center">
              cards from
            </label>
            <Input
              type="number"
              name="drawBank"
              className="w-auto"
              defaultValue={drawBank}
              onChange={(e) => setDrawBank(Number(e.target.value || 0))}
            />
            <Button className="btn-block" type="submit" color="primary" variant="outline">
              Go!
            </Button>
            <strong>{drawResult}</strong>
          </div>
        </form>
      </div>
    </article>
  );
}
