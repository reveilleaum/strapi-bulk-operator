import React, { useState, useMemo } from "react";
import "./style.css";

const SelectBtn = ({
  title,
  items,
  selected,
  select,
  defaultValue,
  darkMode,
}) => {
  const [displayOptions, setDisplayOptions] = useState(false);

  const selectClassName = useMemo(() => {
    return `select-btn ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  const optionsClassName = useMemo(() => {
    return `select-options ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  const selectOption = (item) => {
    select(item);
    setDisplayOptions(false);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <button
          className={selectClassName}
          onClick={() => setDisplayOptions(!displayOptions)}
        >
          <span>{selected?.text || defaultValue}</span>
        </button>
        {displayOptions && (
          <>
            <div className="closer" onClick={() => setDisplayOptions(false)} />
            <div className={optionsClassName}>
              {items.map((item) => (
                <span
                  key={item.value}
                  className={selected === item.value ? "active" : ""}
                  onClick={() => selectOption(item)}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectBtn;
