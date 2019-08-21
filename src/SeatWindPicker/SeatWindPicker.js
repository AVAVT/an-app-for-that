import React from 'react';
import { knuthShuffle as shuffle } from 'knuth-shuffle';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import './seat-wind-picker.css';

const tiles = ['east', 'west', 'north', 'south'].map(name => ({
  turn: null,
  open: false,
  name
}));

const sitout = {
  turn: null,
  open: false,
  name: 'none'
}

class SeatWindPicker extends React.PureComponent {
  state = {
    nextTurn: 1,
    sitoutCount: 0,
    tiles
  }

  componentDidMount() {
    this.shuffleTiles();
  }

  shuffleTiles = (e) => {
    e && e.preventDefault();

    const empties = Array.from({ length: this.state.sitoutCount }).map(() => sitout);

    this.setState({
      nextTurn: 1,
      tiles: shuffle([...tiles, ...empties])
    })
  }

  composeTileHandler = id => () => this.setState({
    tiles: this.state.tiles.map(
      (tile, index) => id === index
        ? {
          ...tile,
          open: true,
          turn: this.state.nextTurn
        }
        : tile
    ),
    nextTurn: this.state.nextTurn + 1
  });

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Seat Wind Picker - An App for that</title>
        </Helmet>

        <h1>Seat Wind Picker</h1>
        <Link to="/">Home</Link>

        <div className="text-center mt-5">
          <h3>Pick your tile</h3>
          <p>
            {
              this.state.tiles.map((tile, index) => {
                return (
                  <div className="d-inline-block">
                    <p>{tile.turn || '?'}</p>
                    {tile.open
                      ? (
                        <img
                          key={tile.name}
                          alt={`tile-${tile.name}`}
                          src={require(`../Images/wind-${tile.name}.png`)}
                        />
                      )
                      : (
                        <img
                          key={tile.name}
                          alt="Tile face down"
                          onClick={this.composeTileHandler(index)}
                          src={require(`../Images/face-down.png`)}
                        />
                      )}
                  </div>
                )
              })
            }
          </p>
          <form onSubmit={this.shuffleTiles}>
            <div className="d-flex justify-content-stretch m-auto" style={{ maxWidth: 500 }}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Sit out</InputGroupAddon>
                <Input
                  type="number"
                  defaultValue={this.state.sitoutCount}
                  className="mr-2"
                  onChange={(e) => this.setState({ sitoutCount: parseInt(e.target.value) || 0 })}
                />
              </InputGroup>
              <Button color="primary" type="submit" style={{ whiteSpace: 'nowrap' }}>Shuffle Tiles</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SeatWindPicker;