import "./style.app.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import PokeRow from "../PokeRow/index";
import colors from "../../utils/typesColors";

const TYPES = [
  { name: "grass", isSelected: false },
  { name: "poison", isSelected: false },
  { name: "fire", isSelected: false },
  { name: "flying", isSelected: false },
  { name: "water", isSelected: false },
  { name: "bug", isSelected: false },
  { name: "normal", isSelected: false },
  { name: "electric", isSelected: false },
  { name: "ground", isSelected: false },
  { name: "fairy", isSelected: false },
  { name: "fighting", isSelected: false },
  { name: "psychic", isSelected: false },
  { name: "rock", isSelected: false },
  { name: "steel", isSelected: false },
  { name: "ice", isSelected: false },
  { name: "ghost", isSelected: false },
  { name: "dragon", isSelected: false },
];

function App() {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState(TYPES);
  const [selectedType, setSelectedType] = useState(null);

  const colorMap = colors;

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

  const handleSelect = (selection) => {
    const typesCopy = [...types];
    const selectedType = typesCopy.find((type) => type.name === selection);
    const currentSelectedType = typesCopy.find(
      (type) => type.isSelected === true
    );

    let typeSelection = null;

    if (currentSelectedType && currentSelectedType === selectedType) {
      selectedType.isSelected = false;
    }

    if (currentSelectedType && currentSelectedType != selectedType) {
      currentSelectedType.isSelected = false;
      selectedType.isSelected = true;
      typeSelection = selection;
    }

    if (!currentSelectedType) {
      typeSelection = selection;
      selectedType.isSelected = true;
    }

    setSelectedType(typeSelection);
    setTypes(typesCopy);
  };

  if (isLoading) {
    return (
      <main className="main">
        <h1>POKEMON</h1>
        <p>LOADING...</p>
      </main>
    );
  }

  return (
    <main className="main">
      <header>POKEMON</header>
      <div className="main-container">
        <NavBar>
          {types.map((type) => {
            return (
              <button
                onClick={() => handleSelect(type.name)}
                className={type.isSelected ? "btn btn-active" : "btn"}
                key={type.name}
                style={
                  type.isSelected
                    ? { color: "white" }
                    : { color: colorMap[type.name] || colorMap.default }
                }
              >
                {type.name}
              </button>
            );
          })}
        </NavBar>
        <ul className="list">
          {pokemons.results.map((poke, index) => {
            return (
              <li key={poke.url}>
                <PokeRow
                  pokemon={poke}
                  index={index}
                  selectedType={selectedType}
                />
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
