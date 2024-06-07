import { useState } from "react";
import "./index.css";

export const WelcomePage: React.FC = () => {
  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setApplyFilter(true);
  };
  const handleMouseLeave = () => {
    setApplyFilter(false);
  };

  return (
    <>
      <div>
        <div className={applyFilter ? "welcomebody blur" : "welcomebody"}>
          <div className="welcome">
            <h1 className="rotacao">Welcome to our repository</h1>
          </div>
        </div>
        <div className="btn-bg">
          <button className="welcomebtn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a href="content">Start navigation</a>
          </button>
        </div>
      </div>
    </>
  );
};
