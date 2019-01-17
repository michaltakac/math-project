// Bootstrap MathBox and Three.js
const element = document.querySelector("#visualization");
const mathbox = mathBox({
  element,
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: THREE.OrbitControls // NOTE: using keyboard arrows for slides moves camera too
    // klass: THREE.TrackballControls // keyboard arrows doesn't move camera, but harder to navigate
  },
  size: {
    height: 600
  },
  camera: {
    fov: 90 // Field-of-view (degrees)
  }
});

if (mathbox.fallback) {
  throw Error("No WebGL support.");
}

var three = mathbox.three;
three.camera.position.set(2, 1.7, 2.7);
three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);

// Axis colors
colors = {
  x: new THREE.Color(0xff4136),
  y: new THREE.Color(0x2ecc40),
  z: new THREE.Color(0x0074d9)
};

// Initial time
time = 0;

var view = mathbox.cartesian({
  range: [[-4, 4], [-12, 12], [-4, 4]],
  scale: [1.5, 1.5, 1.5],
  position: [0, 0, 0]
});

view.axis({
  axis: 1,
  color: colors.x
});
view.axis({
  axis: 2, // "y" also works
  color: colors.z
});
view.axis({
  axis: 3,
  color: colors.y
});

mathbox
  .select("axis")
  .set("end", true)
  .set("width", 5);

view.array({
  id: "colors",
  live: false,
  data: [colors.x, colors.z, colors.y].map(function(color) {
    return [color.r, color.g, color.b, 1];
  })
});

view.grid({
  axes: [1, 3],
  width: 1,
  color: 0xb0b0b0,
  depth: 0.25
});

view
  .array({
    data: [[4.3, 0, 0], [0, 13.2, 0], [0, 0, 4.3]],
    channels: 3, // necessary
    live: true
  })
  .text({
    data: ["x", "z", "y"]
  })
  .label({
    color: 0xffffff,
    colors: "#colors"
  });

// ----------- Visualization

view
  .area({
    id: "main-function",
    width: 50,
    height: 50,
    axes: [1, 3],
    live: true,
    rangeX: [-4, 4],
    rangeY: [-4, 4],
    expr: function(emit, x, y, i, j) {
      const func = Math.pow(x, 2) - Math.pow(y, 2);
      emit(x, func, y);
    },
    channels: 3
  })
  .surface({
    lineX: true,
    lineY: true,
    shaded: true,
    color: 0x5090ff,
    width: 2,
    shaded: true
  });

// --------- SLIDERS

// FOV

const fovSlider = document.getElementById("fov-slider");
const fovValue = document.getElementById("fov-value");
fovValue.innerHTML = fovSlider.value;

fovSlider.oninput = function() {
  fovValue.innerHTML = this.value;
  (mathbox._context.camera.fov = this.value), 10;
};

const gridVisible = document.getElementById("grid-visible");

gridVisible.oninput = function() {
  if (gridVisible.checked) {
    mathbox.select("grid").set("opacity", 1);
  } else {
    mathbox.select("grid").set("opacity", 0);
  }
};

const gridDepthSlider = document.getElementById("grid-depth-slider");
const gridDepthValue = document.getElementById("grid-depth-value");
gridDepthValue.innerHTML = gridDepthSlider.value / 100;

gridDepthSlider.oninput = function() {
  const val = this.value / 100;
  gridDepthValue.innerHTML = val;
  mathbox.select("grid").set("depth", val);
};

// Cartesian settings
let state = {
  xMin: -4,
  xMax: 4,
  yMin: -12,
  yMax: 12,
  zMin: -4,
  zMax: 4
};

// X -----

const cartesianXMinSlider = document.getElementById("cartesian-x-min-slider");
const cartesianXMinValue = document.getElementById("cartesian-x-min-value");
cartesianXMinValue.innerHTML = -cartesianXMinSlider.value / 100;

cartesianXMinSlider.oninput = function() {
  state.xMin = -this.value / 100;
  cartesianXMinValue.innerHTML = state.xMin;
  mathbox
    .select("cartesian")
    .set("range", [
      [state.xMin, state.xMax],
      [state.yMin, state.yMax],
      [state.zMin, state.zMax]
    ]);
};

const cartesianXMaxSlider = document.getElementById("cartesian-x-max-slider");
const cartesianXMaxValue = document.getElementById("cartesian-x-max-value");
cartesianXMaxValue.innerHTML = cartesianXMaxSlider.value / 100;

cartesianXMaxSlider.oninput = function() {
  state.xMax = this.value / 100;
  cartesianXMaxValue.innerHTML = state.xMax;
  mathbox
    .select("cartesian")
    .set("range", [
      [state.xMin, state.xMax],
      [state.yMin, state.yMax],
      [state.zMin, state.zMax]
    ]);
};

// Y ----

const cartesianYMinSlider = document.getElementById("cartesian-y-min-slider");
const cartesianYMinValue = document.getElementById("cartesian-y-min-value");
cartesianYMinValue.innerHTML = -cartesianYMinSlider.value / 100;

cartesianYMinSlider.oninput = function() {
  state.yMin = -this.value / 100;
  cartesianYMinValue.innerHTML = state.yMin;
  mathbox
    .select("cartesian")
    .set("range", [
      [state.xMin, state.xMax],
      [state.yMin, state.yMax],
      [state.zMin, state.zMax]
    ]);
};

const cartesianYMaxSlider = document.getElementById("cartesian-y-max-slider");
const cartesianYMaxValue = document.getElementById("cartesian-y-max-value");
cartesianYMaxValue.innerHTML = cartesianYMaxSlider.value / 100;

cartesianYMaxSlider.oninput = function() {
  state.yMax = this.value / 100;
  cartesianYMaxValue.innerHTML = state.yMax;
  mathbox
    .select("cartesian")
    .set("range", [
      [state.xMin, state.xMax],
      [state.yMin, state.yMax],
      [state.zMin, state.zMax]
    ]);
};

// Z -----

const cartesianZMinSlider = document.getElementById("cartesian-z-min-slider");
const cartesianZMinValue = document.getElementById("cartesian-z-min-value");
cartesianZMinValue.innerHTML = -cartesianZMinSlider.value / 100;

cartesianZMinSlider.oninput = function() {
  state.zMin = -this.value / 100;
  cartesianZMinValue.innerHTML = state.zMin;
  mathbox
    .select("cartesian")
    .set("range", [
      [state.xMin, state.xMax],
      [state.yMin, state.yMax],
      [state.zMin, state.zMax]
    ]);
};

const cartesianZMaxSlider = document.getElementById("cartesian-z-max-slider");
const cartesianZMaxValue = document.getElementById("cartesian-z-max-value");
cartesianZMaxValue.innerHTML = cartesianZMaxSlider.value / 100;

cartesianZMaxSlider.oninput = function() {
  state.zMax = this.value / 100;
  cartesianZMaxValue.innerHTML = state.zMax;
  mathbox
    .select("cartesian")
    .set("range", [
      [state.xMin, state.xMax],
      [state.yMin, state.yMax],
      [state.zMin, state.zMax]
    ]);
};
