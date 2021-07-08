import "./style.navbar.scss";
import colors from "../../utils/typesColors";

const NavBar = ({ types }) => {
  const colorMap = colors;
  return (
    <nav className="nav">
      {types.map((type) => {
        return (
          <button
            className="btn"
            key={type}
            style={{ color: colorMap[type] || colorMap.default }}
          >
            {type}
          </button>
        );
      })}
    </nav>
  );
};

export default NavBar;
