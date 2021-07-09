import "./style.pokestats.scss";

const PokeStats = ({ stats }) => {
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

  return (
    <div className="stats">
      <div className="stat-split">
        <ul className="stat-names">
          {stats.map((stat, index) => {
            return (
              <li key={`Idk-${stat.stat.name}-${index * 2}`}>
                {stat.stat.name}
              </li>
            );
          })}
        </ul>
        <ul className="stat-values">
          {stats.map((stat, index) => {
            return (
              <li key={`Idk-${stat.base_stat}-${index * 3}`}>
                {stat.base_stat}
              </li>
            );
          })}
        </ul>
        <ul className="stat-gauges">
          {stats.map((stat, index) => {
            return (
              <li key={`Idk-${stat.base_stat}-${index * 5}`}>
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
  );
};

export default PokeStats;
