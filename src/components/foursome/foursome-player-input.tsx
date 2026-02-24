import { useState } from "react";
import { Button, cn, Input } from "vat-ui";

const playerCounts = [16, 20, 24, 28, 32];

export interface FoursomePlayerInputProps {
  onStart: (playerNames: string[]) => void;
}

export default function FoursomePlayerInput({ onStart }: FoursomePlayerInputProps) {
  const [playerCount, setPlayerCount] = useState(16);
  const [playerNames, setPlayerNames] = useState(Array.from({ length: 16 }).map(() => ""));

  const composePlayerCountSetter = (number: number) => () => {
    setPlayerCount(number);
    setPlayerNames(Array.from({ length: number }).map((_, index) => playerNames[index] || ""));
  };

  const startGame = () => {
    onStart(playerNames);
  };

  const renderPlayerInput = (value: string, index: number) => (
    <div key={index}>
      <Input
        className="form-control"
        value={value}
        placeholder={`Name for player ${index + 1}...`}
        onChange={(e) => setPlayerNames(playerNames.map((name, index2) => (index === index2 ? e.target.value : name)))}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-5 mb-3">
        <div>Number of players:</div>
        {playerCounts.map((count, index) => (
          <Button
            key={count}
            color={playerCount === count ? "primary" : "secondary"}
            variant="outline"
            className={cn(index > 0 ? "rounded-l-none" : "", index < playerCounts.length - 1 ? "rounded-r-none" : "")}
            onClick={composePlayerCountSetter(count)}
          >
            {count}
          </Button>
        ))}
        {(playerCount === 16 || playerCount === 28) && (
          <div className="text-muted">
            Note: Perfect solution available (meaning each player can play against all opponents).
          </div>
        )}
      </div>
      <hr />
      <div className="pb-5 flex flex-col gap-2">
        <p>Enter player names. Leave field empty if there're not enough players.</p>

        {playerNames.map(renderPlayerInput)}

        <div className="mt-2">
          <Button color="primary" onClick={startGame}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
