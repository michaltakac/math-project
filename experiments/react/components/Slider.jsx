import React from "react";

export function Slider({ min, max, step, value, text, onChange }) {
  return (
    <div>
      <div>
        {text}: <span>{value}</span>
        <br />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="slider"
        />
      </div>
    </div>
  );
}
