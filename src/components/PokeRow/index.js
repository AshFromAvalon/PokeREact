import "./style.pokerow.scss";
import { useState, useEffect } from "react";
import axios from "axios";

import PokeCard from "../PokeCard/index";
import PokeStats from "../PokeStats/index";
import PokeCardLoader from "../PokeCardLoader/index";
import PokeStatsLoader from "../PokeStatsLoader/index";

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

  const rowBackgroundColorStyle = index % 2 === 0 ? "#F8F6F7" : "#FDFDFD";
  const showLine = selectedType ? types.includes(selectedType) : true;

  if (isLoading) {
    return (
      <div
        className="row split"
        style={{ backgroundColor: rowBackgroundColorStyle }}
      >
        <PokeCardLoader />
        <PokeStatsLoader />
      </div>
    );
  }

  return (
    showLine && (
      <div
        className="row split"
        style={{ backgroundColor: rowBackgroundColorStyle }}
      >
        <PokeCard infos={infos} />
        <PokeStats stats={infos.stats} />
      </div>
    )
  );
};

export default PokeRow;
