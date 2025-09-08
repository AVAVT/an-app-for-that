import { useState } from "react";
import { Button, ButtonGroup, Col, FormGroup, Input, Row } from "reactstrap";

const playerCounts = [16, 20, 24, 28, 32];

export interface FoursomePlayerInputProps {
  onStart: (playerNames: string[]) => void;
}

export default function FoursomePlayerInput({
  onStart,
}: FoursomePlayerInputProps) {
  const [playerCount, setPlayerCount] = useState(16);
  const [playerNames, setPlayerNames] = useState(
    Array.from({ length: 16 }).map(() => ""),
  );

  const composePlayerCountSetter = (number: number) => () => {
    setPlayerCount(number);
    setPlayerNames(
      Array.from({ length: number }).map(
        (_, index) => playerNames[index] || "",
      ),
    );
  };

  const startGame = () => {
    onStart(playerNames);
  };

  const renderPlayerInput = (value: string, index: number) => (
    <Col sm="6" md="4" lg="3" key={index}>
      <FormGroup>
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
    </Col>
  );

  return (
    <>
      <Row className="mt-5 mb-3">
        <Col xs="12">
          <div>Number of players:</div>
          <ButtonGroup className="mb-3">
            {playerCounts.map((count) => (
              <Button
                key={count}
                color={playerCount === count ? "primary" : "secondary"}
                onClick={composePlayerCountSetter(count)}
              >
                {count}
              </Button>
            ))}
          </ButtonGroup>
          {(playerCount === 16 || playerCount === 28) && (
            <div className="text-muted">
              Note: Perfect solution available (meaning each player can play
              against all opponents).
            </div>
          )}
        </Col>
      </Row>
      <hr />
      <Row className="pb-5">
        <Col xs="12">
          <p>
            Enter player names. Leave field empty if there're not enough
            players.
          </p>
        </Col>

        {playerNames.map(renderPlayerInput)}

        <Col xs="12" className="mt-2">
          <Button color="primary" onClick={startGame}>
            Start
          </Button>
        </Col>
      </Row>
    </>
  );
}
