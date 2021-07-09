import "./style.pokestats-loader.scss";

const PokeStatsLoader = () => {
  return (
    <div className="stats-loader">
      <div className="stat-split-loader">
        <ul className="stat-names-loader"></ul>
        <ul className="stat-values-loader"></ul>
        <ul className="stat-gauges-loader">
          <li>
            <div className="gauge-container-loader">
              <div className="bg-gauge-loader"></div>
            </div>
          </li>
          <li>
            <div className="gauge-container-loader">
              <div className="bg-gauge-loader"></div>
            </div>
          </li>
          <li>
            <div className="gauge-container-loader">
              <div className="bg-gauge-loader"></div>
            </div>
          </li>
          <li>
            <div className="gauge-container-loader">
              <div className="bg-gauge-loader"></div>
            </div>
          </li>
          <li>
            <div className="gauge-container-loader">
              <div className="bg-gauge-loader"></div>
            </div>
          </li>
          <li>
            <div className="gauge-container-loader">
              <div className="bg-gauge-loader"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PokeStatsLoader;
