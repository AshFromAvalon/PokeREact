import "./style.pokerow.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import colors from "../../utils/typesColors";

const PokeRow = ({ pokemon, index, selectedType }) => {
  const [infos, setInfos] = useState();
  const [types, setTypes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const colorMap = colors;

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

  const getHeight = () => {
    if (!infos) return;
    let heightValue = "";
    if (infos.height < 10) {
      heightValue = `0.${infos.height}`;
    }
    if (infos.height > 10) {
      const height = infos.height.toString().split("");
      heightValue = `${height[0]}.${height.unshift()}`;
    }
    if (infos.height === 10) {
      heightValue = 1;
    }
    return heightValue + " m";
  };

  const getWeight = () => {
    if (!infos) return;
    let weightValue = "";

    if (infos.weight < 10) {
      weightValue = `0.${infos.weight}`;
    }
    if (infos.weight > 10 && infos.weight < 100) {
      const weight = infos.weight.toString().split("");
      weightValue = `${weight[0]}.${weight.unshift()}`;
    }

    if (infos.weight >= 100 && infos.weight < 1000) {
      const weight = infos.weight.toString().split("");
      weightValue = `${weight[0]}${weight[1]}.${weight[2]}`;
    }

    if (infos.weight === 10) {
      weightValue = 1;
    }

    if (infos.weight === 1000) {
      weightValue = 100;
    }

    return weightValue + " kg";
  };

  const getGaugeColor = (value) => {
    const prct = value;
    if (prct <= 35) return "#C24B4A";
    if (prct > 35 && prct <= 50) return "#F2A232";
    if (prct > 50 && prct < 85) return "#F4CB33";
    if (prct >= 80) return "#73AC59";
  };

  const getStatPourcentage = (value) => {
    return (value / 150) * 100;
  };

  index === 1 && !isLoading && console.log(infos);

  return (
    showLine && (
      <div
        className="row split"
        style={{ backgroundColor: rowBackgroundColorStyle }}
      >
        <div className="card-container">
          <div className="card">
            <img
              className="card-image"
              src={infos.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <h2 className="card-name">{infos.name}</h2>
            <p className="card-description">{infos.details.genera[7].genus}</p>
            <ul className="card-type-list">
              {infos.types.map((type, index) => {
                return (
                  <li
                    className="card-type"
                    key={`${pokemon.name}-${index}`}
                    style={{
                      color: colorMap[type.type.name] || colorMap.default,
                    }}
                  >
                    {type.type.name}
                  </li>
                );
              })}
            </ul>
            <div className="card-specs">
              <p>{getHeight()}</p>
              <p>{getWeight()}</p>
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stat-split">
            <ul className="stat-names">
              {infos.stats.map((stat, index) => {
                return (
                  <li key={`${pokemon.name}-${stat.stat.name}-${index}`}>
                    {stat.stat.name}
                  </li>
                );
              })}
            </ul>
            <ul className="stat-values">
              {infos.stats.map((stat, index) => {
                return (
                  <li key={`${pokemon.name}-${stat.base_stat}-${index}`}>
                    {stat.base_stat}
                  </li>
                );
              })}
            </ul>
            <ul className="stat-gauges">
              {infos.stats.map((stat, index) => {
                return (
                  <li key={`${pokemon.name}-${stat.base_stat}-${index * 5}`}>
                    <div className="gauge-container">
                      <div className="bg-gauge">
                        <div
                          className="gauge"
                          style={{
                            width:
                              stat.base_stat >= 250
                                ? "100%"
                                : `${getStatPourcentage(stat.base_stat)}%`,
                            backgroundColor: getGaugeColor(stat.base_stat),
                          }}
                        ></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default PokeRow;
