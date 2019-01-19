import Link from "next/link";
import { Checkbox } from "../components/Checkbox";
import { Slider } from "../components/Slider";

export function SettingsPanel({ setFov, toggleGrid, setXMin, setXMax }) {
  return (
    <div>
      <p>
        Zorné pole (field of view): <span id="fov-value">90</span> <br />
        <input
          type="range"
          min="60"
          max="100"
          value="90"
          className="slider"
          id="fov-slider"
        />
      </p>
      <hr />
      <p>
        Zapnúť mriežku? <input type="checkbox" id="grid-visible" checked />
      </p>
      <p>
        Hrúbka mriežky: <span id="grid-depth-value">25</span> <br />
        <input
          type="range"
          min="0"
          max="100"
          value="25"
          className="slider"
          id="grid-depth-slider"
        />
      </p>
      <hr />
      <h3>Súradnicová sústava</h3>
      <p>
        X min: <span id="cartesian-x-min-value">-4</span> <br />
        <input
          type="range"
          min="100"
          max="800"
          value="400"
          className="slider"
          id="cartesian-x-min-slider"
        />
      </p>
      <p>
        X max: <span id="cartesian-x-max-value">4</span> <br />
        <input
          type="range"
          min="100"
          max="800"
          value="400"
          className="slider"
          id="cartesian-x-max-slider"
        />
      </p>
      <hr />
      <p>
        Y min: <span id="cartesian-y-min-value">-4</span> <br />
        <input
          type="range"
          min="100"
          max="3000"
          value="1200"
          className="slider"
          id="cartesian-y-min-slider"
        />
      </p>
      <p>
        Y max: <span id="cartesian-y-max-value">4</span> <br />
        <input
          type="range"
          min="100"
          max="3000"
          value="1200"
          className="slider"
          id="cartesian-y-max-slider"
        />
      </p>
      <hr />
      <p>
        Z min: <span id="cartesian-z-min-value">-4</span> <br />
        <input
          type="range"
          min="100"
          max="800"
          value="400"
          className="slider"
          id="cartesian-z-min-slider"
        />
      </p>
      <p>
        Z max: <span id="cartesian-z-max-value">4</span> <br />
        <input
          type="range"
          min="100"
          max="800"
          value="400"
          className="slider"
          id="cartesian-z-max-slider"
        />
      </p>
      <h3>Ohraničená množina vstupných premenných</h3>
      <p>
        X min: <span id="function-x-min-value">-4</span> <br />
        <input
          type="range"
          min="0"
          max="800"
          value="400"
          className="slider"
          id="function-x-min-slider"
        />
      </p>
      <p>
        X max: <span id="function-x-max-value">4</span> <br />
        <input
          type="range"
          min="0"
          max="800"
          value="400"
          className="slider"
          id="function-x-max-slider"
        />
      </p>
      <hr />
      <p>
        Y min: <span id="function-y-min-value">-4</span> <br />
        <input
          type="range"
          min="0"
          max="800"
          value="400"
          className="slider"
          id="function-y-min-slider"
        />
      </p>
      <p>
        Y max: <span id="function-y-max-value">4</span> <br />
        <input
          type="range"
          min="0"
          max="800"
          value="400"
          className="slider"
          id="function-y-max-slider"
        />
      </p>
    </div>
  );
}
