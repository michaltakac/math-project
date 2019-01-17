// Bootstrap MathBox and Three.js
var element = document.querySelector("#visualization");
var mathbox = mathBox({
  element,
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: THREE.OrbitControls // NOTE: using keyboard arrows for slides moves camera too
    // klass: THREE.TrackballControls // keyboard arrows doesn't move camera, but harder to navigate
  },
  size: {
    height: 800,
    width: 800
  },
  camera: {
    fov: 60 // Field-of-view (degrees)
  }
});

if (mathbox.fallback) {
  throw Error("No WebGL support.");
}

var three = mathbox.three;
three.camera.position.set(2, 1.7, 2.7);
three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);

// Make MathBox primitives
var view = mathbox
  .cartesian({
    range: [[-2, 2], [-1, 1], [-1, 1]],
    scale: [2, 1, 1]
  })
  .axis({
    axis: 1
  })
  .axis({
    axis: 2
  });

// we can set some settings afterwards
mathbox.select("cartesian").set("position", [0, 0, 0]);

// print the stuff I'm interested in anytime
mathbox.select("cartesian").print();

view.grid({
  axes: [1, 3],
  width: 1,
  color: 0xb0b0b0,
  depth: 0.25
});

// let's use some random function
view
  .interval({
    id: "some-interval", // we can grab this id like with jquery!
    width: 48,
    channels: 3,
    live: true
  })
  .line({
    color: 0x30c0ff,
    width: 16
  })
  .resample({
    width: 8
  })
  .point({
    color: 0x30c0ff,
    size: 60
  });

// magic
mathbox.select("#some-interval").set("expr", function(emit, x, i, t) {
  // Emit sine wave
  y = Math.sin(x + t / 4) * 0.5 + 0.75;
  emit(x, y, 1); // this one is normal...
  emit(x, -Math.sin(x + t), 0); // ...let's make this look funny
  // and let's try animating whole coordinate system
  mathbox
    .select("cartesian")
    .set("position", [y, -Math.sin(x + t), Math.sin(x - t)]);
});
