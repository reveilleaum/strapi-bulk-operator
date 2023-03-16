import React, { useMemo } from "react";
import "./style.css";

const RadioBtn = ({ title, items, selected, select, darkMode }) => {
  const radioClassName = useMemo(() => {
    return `radio ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  return (
    <div>
      <h3>{title}</h3>
      <div className={radioClassName}>
        {items.map((item) => (
          <span
            key={item.value}
            className={selected === item.value ? "active" : ""}
            onClick={() => select(item.value)}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RadioBtn;
