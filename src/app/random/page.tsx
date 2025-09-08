"use client";

import { knuthShuffle as shuffle } from "knuth-shuffle";
import Link from "next/link";
import { type ChangeEventHandler, type FormEventHandler, useState } from "react";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { randomInt } from "@/utilities/functions";

export default function RandomPage() {
  const [state, setState] = useState({
    randomFrom: 1,
    randomTo: 4,
    drawAmount: 3,
    drawBank: 8,
    randomNumResult: 0,
    drawResult: "",
  });

  const onFieldChanged: ChangeEventHandler<HTMLInputElement> = (event) =>
    setState({
      ...state,
      [event.target.name]: parseInt(event.target.value, 10) || 0,
    });

  const randomNum: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setState({
      ...state,
      randomNumResult: randomInt(state.randomFrom, state.randomTo + 1),
    });
  };

  const randomDraw: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setState({
      ...state,
      drawResult: shuffle(Array.from({ length: state.drawBank }).map((_, index) => index + 1))
        .slice(0, state.drawAmount)
        .join(", "),
    });
  };

  return (
    <Container fluid="md">
      <h1>Most Bestest Life Decisions Maker</h1>
      <Link href="/">Home</Link>

      <Row className="mt-5">
        <Col md="8 m-auto">
          <Form onSubmit={randomNum}>
            <Row>
              <Label for="randomFrom" className="col-form-label pl-3">
                Random from
              </Label>
              <Col sm="2">
                <Input type="number" name="randomFrom" defaultValue={state.randomFrom} onChange={onFieldChanged} />
              </Col>
              <Col sm="2">
                <Label for="randomTo" className="col-form-label text-center">
                  to
                </Label>
              </Col>
              <Col sm="2">
                <Input type="number" name="randomTo" defaultValue={state.randomTo} onChange={onFieldChanged} />
              </Col>
              <Col sm="2">
                <Button className="btn-block" type="submit" color="primary">
                  Go!
                </Button>
              </Col>
              <Label className="pl-3 col-form-label">
                <strong>{state.randomNumResult > 0 ? state.randomNumResult : ""}</strong>
              </Label>
            </Row>
          </Form>

          <hr />

          <Form onSubmit={randomDraw}>
            <Row>
              <Label for="drawAmount" className="col-form-label pl-3">
                Draw
              </Label>
              <Col sm="2">
                <Input type="number" name="drawAmount" defaultValue={state.drawAmount} onChange={onFieldChanged} />
              </Col>
              <Col sm="2">
                <Label for="drawBank" className="col-form-label text-center">
                  cards from
                </Label>
              </Col>
              <Col sm="2">
                <Input type="number" name="drawBank" defaultValue={state.drawBank} onChange={onFieldChanged} />
              </Col>
              <Col sm="2">
                <Button className="btn-block" type="submit" color="primary">
                  Go!
                </Button>
              </Col>
              <Label className="pl-3 col-form-label">
                <strong>{state.drawResult}</strong>
              </Label>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
