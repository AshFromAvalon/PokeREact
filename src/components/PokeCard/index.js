import "./style.pokecard.scss";
import colors from "../../utils/typesColors";

const PokeCard = ({ infos }) => {
  const colorMap = colors;

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

  return (
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
                key={`${type.type.name}-${index}`}
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
  );
};

export default PokeCard;
