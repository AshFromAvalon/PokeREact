import "./style.pokerow.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const PokeRow = ({ pokemon, index, selectedType }) => {
  const [infos, setInfos] = useState();
  const [types, setTypes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      let response = await axios.get(pokemon.url);
      const details = await axios.get(response.data.species.url);

      response.data.details = details.data;
      const types = response.data.types.map((poke) => poke.type.name);
      setTypes(types);
      setInfos(response.data);
      setIsLoading(false);
    };
    fecthData();
  }, []);

  if (isLoading) {
    return (
      <div className="main">
        <p>LOADING...</p>
      </div>
    );
  }

  const rowBackgroundColorStyle = index % 2 === 0 ? "#F8F6F7" : "#FDFDFD";
  const showLine = selectedType ? types.includes(selectedType) : true;

  return (
    showLine && (
      <div
        className="row split"
        style={{ backgroundColor: rowBackgroundColorStyle }}
      >
        <div className="card">
          <img
            className="card-image"
            src={infos.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <div className="card">
          <img
            className="card-image"
            src={infos.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </div>
    )
  );
};

export default PokeRow;
