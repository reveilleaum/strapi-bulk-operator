import React, { useMemo } from "react";
import "./style.css";

const Button = ({ click, loading, text, darkMode }) => {
  const btnClassName = useMemo(() => {
    return `btn-submit ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  const hideText = useMemo(() => {
    return `text ${loading && "hide"}`;
  }, [loading]);

  return (
    <button className={btnClassName} onClick={click} disabled={loading}>
      <span className={hideText}>{text}</span>
      {loading && <span className="loader" />}
    </button>
  );
};

export default Button;
