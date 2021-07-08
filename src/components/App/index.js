import "./style.app.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import PokeRow from "../PokeRow/index";

const TYPES = [
  "grass",
  "poison",
  "fire",
  "flying",
  "water",
  "bug",
  "normal",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "steel",
  "ice",
  "ghost",
  "dragon",
];

function App() {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      // Retreive list of pokemon
      let pokemonList = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      setPokemons(pokemonList.data);
      setIsLoading(false);
    };
    fecthData();
  }, []);

  if (isLoading) {
    return (
      <main className="main">
        <h1>POKEMON</h1>
        <p>LOADING...</p>
      </main>
    );
  }

  // !isLoading && console.log(pokemons.results[0]);
  //poke.details.sprites.other["official-artwork"].front_default

  return (
    <main className="main">
      <header>POKEMON</header>
      <div className="main-container">
        <NavBar types={TYPES} />
        <ul className="list">
          {pokemons.results.map((poke, index) => {
            return (
              <li key={poke.url}>
                <PokeRow pokemon={poke} index={index} />
              </li>
            );
          })}
        </ul>
      </div>
      <footer>POKEMON</footer>
    </main>
  );
}

export default App;
