import "./style.pokecard-loader.scss";
import placeholder from "../../assets/poke-placeholder.png";

const PokeCardLoader = () => {
  return (
    <div className="card-container-loader">
      <div className="card-loader">
        <img className="card-image-loader" src={placeholder} alt="" />
        <h2 className="card-name-loader"></h2>
        <p className="card-description-loader"></p>
        <ul className="card-type-list-loader">
          <li className="card-type-loader"></li>
          <li className="card-type-loader"></li>
        </ul>
        <div className="card-specs-loader">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default PokeCardLoader;
