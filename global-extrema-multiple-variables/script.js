/*
 * There are more options for how we can deal with working with
 * equations. Equation1 is explicitly written, then evaluated by Math.js,
 * function from equation is parsed to var "f1" (parser then clears itself) and
 * then you can work with equation f1 as a function in your code.
 *
 * Second equation is loaded from HTML DOM element with jQuery, then evaluated, 
 * parsed and rerendered back to corresponding DOM element in form of TeX equation
 * (with help of KaTeX library by Khan Academy).
 *
 */
var parser = math.parser();

var equation = 'f(x, y) = x^3 + 3x*y^2 - 51x - 24y';
parser.eval(equation);
var f1 = parser.get('f');
parser.clear();


// Define global DOM handler to format 'latex' into an HTML span
MathBox.DOM.Types.latex = MathBox.DOM.createClass({
  render: function (el) {
    this.props.innerHTML = katex.renderToString(this.children);
    return el('span', this.props);
  }
});
// Set smaller height if device width is smaller than 960px
function mathboxHeight() {
  var height = 600;
  var width = window.innerWidth;
  if (width <= 960) height = 500;
  return height;
}

// MathBox settings 
// (visualization is injected into DOM element, we don't use context API here.)
var mathbox = mathBox({
  element: document.getElementById('visualization'),
  plugins: ['core', 'controls', 'cursor'],
  controls: {
    klass: THREE.OrbitControls, // NOTE: using keyboard arrows for slides moves camera too
    //klass: THREE.TrackballControls, // keyboard arrows doesn't move camera, but harder to navigate
  },
  size: {
    height: mathboxHeight()
  },
  camera: {
    fov: 60, // Field-of-view (degrees)
  }
});

var three = mathbox.three;
three.camera.position.set(2, 1.7, 2.7);
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

// Axis colors
colors = {
  x: new THREE.Color(0xFF4136),
  y: new THREE.Color(0x2ECC40),
  z: new THREE.Color(0x0074D9)
};

// Initial time
time = 0

var view = mathbox.cartesian({
  range: [[-4, 4], [-12, 12], [-4, 4]],
  scale: [1.8, 1.8, 1.8],
  position: [0, 0, 0]
})

view.axis({
  axis: 1,
  color: colors.x,
});
view.axis({
  axis: 2, // "y" also works
  color: colors.z,
});
view.axis({
  axis: 3,
  color: colors.y,
});

mathbox.select('axis')
  .set('end', true)
  .set('width', 5)

view.array({
  id: "colors",
  live: false,
  data: [colors.x, colors.z, colors.y].map(function (color){
    return [color.r, color.g, color.b, 1];
  }),
});

view.grid({
  axes: [1, 3],
  width: 1,
  color: 0xb0b0b0,
  depth: .25,
})

view.array({
  data: [[4.3,0,0], [0,13.2,0], [0,0,4.3]],
  channels: 3, // necessary
  live: false,
}).text({
  data: ["x", "z", "y"],
}).label({
  color: 0xFFFFFF,
  colors: "#colors",
});
      
surface = mathbox.select('surface')
vector = mathbox.select('vector')

// Set first presentation slide to 1
var present = view.present({ index: 1 });

// Nest the whole presentation in a slide
// This means any .step() directly inside will follow present.index directly
var scene = present.slide();

// Slide counter element
var slideNumber = document.getElementById('slide-number');
// Inject initial value into slide counter element
slideNumber.innerHTML = present.get('index') + '/9';

// Navigate through slides with left and right arrow on keyboard
if (window == top) {
  window.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
      case 38:
        present.set('index', present.get('index') - 1);
        slideNumber.innerHTML = present.get('index') + '/9';
        break;
      case 39:
      case 40:
        present.set('index', present.get('index') + 1);
        slideNumber.innerHTML = present.get('index') + '/9';
        break;
    }
  }
}

// Also navigate through slides with blue arrows in our webpage
$('#next').on('click', function() {
  var slide = present.get('index');
  $('.step-'+slide).removeClass('active');
  $('.step-'+slide).children('.extra').removeClass('active');
  $('#disqus_thread').removeClass('active');
  if (slide < 9) {
    slide += 1;
    $('.step-'+slide).addClass('active');
    $('.step-'+slide).children('.extra').addClass('active');
    present.set('index', slide);
    slideNumber.innerHTML = slide + '/9';
  }
  if (slide === 9) {
    $('#disqus_thread').addClass('active');
  }
});
$('#previous').on('click', function() {
  var slide = present.get('index');
  $('.step-'+slide).removeClass('active');
  $('.step-'+slide).children('.extra').removeClass('active');
  $('#disqus_thread').removeClass('active');
  if (slide > 0) {
    slide -= 1;
    $('.step-'+slide).addClass('active');
    $('.step-'+slide).children('.extra').addClass('active');
    present.set('index', slide);
    slideNumber.innerHTML = slide + '/9';
  }
  if (slide === 9) {
    $('#disqus_thread').addClass('active');
  }
});

// Presentation slides begins here
// Camera has a global script of steps
scene
  .camera({
    lookAt: [0, 0, 0],
    proxy: true,
  })
  .step({
    pace: 1,
    script: {
      0: {position: [2, 1.7, 3.2]}, // kamera pre krok 0 (základný)
      1: {position: [2, 1.7, 2.6]}, // kamera pre krok 1
      //3: {position: [2, 1.7, 2.1]}, // kamera pre krok 2
      // ...         // kamera pre krok n
    }
  })
// ---------------------
// Potrebujeme aby sa hodnoty funkcie na rovine xy vytiahli hore
// na funkciu v priestore
scene // Zaciatok prvej sceny
  .slide({ // pocet krokov, ktore scena obsahuje (potom zmizne)
    steps: 13
  })
  .reveal({
    duration: 1
  })
  // Hlavna funkcia
  .area({
    id: 'hlavna-funkcia',
    width: 50,
    height: 50,
    axes: [1, 3],
    live: false,
    rangeX: [-4, 4],
    rangeY: [-4, 4],
    expr: function (emit, x, y, i, j) {
      var func = Math.pow(x, 2) - Math.pow(y, 2);
      emit(x, func, y);
    },
    channels: 3,
  })
  .surface({
    lineX: true,
    lineY: true,
    shaded: true,
    color: 0x5090FF,
    width: 2,
    shaded: true,
  })
    .step({
      pace: 1,
      script: {
        0: {props: {opacity: 1}},
        1: {props: {opacity: 1}},
        2: {props: {opacity: 0}},
        3: {props: {opacity: 1}},
        4: {props: {opacity: 0.1}},
        5: {props: {opacity: 0}},
      }
    })
  .point({
    size: 10,
    color: 0xFF0000
  })
    .step({
      pace: 1,
      script: [
        {props: {opacity: 0}},
        {props: {opacity: 1}},
        {props: {opacity: 0}},
      ]
    })
  // Set axis x, y, z input numbers
  // .array({
  //   data: [[2,0,0], [0,8,0], [0,0,2], [-2,0,0], [0,0,-2]],
  //   channels: 3, // necessary
  //   live: false,
  // }).text({
  //   data: ["2", "8", "2", "-2", "-2"],
  // })
  // .label({
  //   color: 0xFFFFFF,
  //   colors: "#colors",
  // })
  //   .step({
  //     pace: 1,
  //     script: [
  //       {props: {opacity: 0}},
  //       {props: {opacity: 1}},
  //       {props: {opacity: 0}},
  //     ]
  //   })
  // .point({
  //   size: 10,
  //   color: 0xFF0000,
  //   opacity: 0
  // })
  //   .step({
  //     pace: 1,
  //     script: [
  //       {props: {opacity: 0}}, // 0-ty krok!
  //       {props: {opacity: 1}},
  //     ]
  //   })
  // Ukazka prvej derivacie podla x v 2D, priamka
  // .interval({
  //   length: 5000,
  //   channels: 3,
  //   live: false,
  //   expr: function(emit, x, y, i, j){
  //     y = 2*x;
  //     emit(x, 0, y);
  //   },
  // }).line({
  //   size: 8,
  //   color: 0x0074D9,
  // })
  //   .step({
  //     pace: 1,
  //     script: {
  //       0: {props: {opacity: 0}},
  //       1: {props: {opacity: 0}},
  //       2: {props: {opacity: 1}},
  //       3: {props: {opacity: 0}},
  //       4: {props: {opacity: 0}},
  //       5: {props: {opacity: 0}},
  //       6: {props: {opacity: 1}},
  //     }
  //   })
  // .point({
  //   size: 8,
  //   color: 0x0074D9,
  // })
  //   .step({
  //     pace: 1,
  //     script: {
  //       0: {props: {opacity: 0}},
  //       1: {props: {opacity: 0}},
  //       2: {props: {opacity: 1}},
  //       3: {props: {opacity: 0}},
  //       4: {props: {opacity: 0}},
  //       5: {props: {opacity: 0}},
  //       6: {props: {opacity: 1}},
  //     }
  //   })
    // Ukazka prvej derivacie podla y v 2D, horny polkruh
  .interval({
    length: 5000,
    channels: 3,
    live: false,
    expr: function(emit, x, y, i, j){
      y = -Math.sqrt(4-Math.pow(x, 2));
      emit(x, 0, y);
    },
  })
  .point({
    size: 8,
    color: '#000',
  })
    .step({
      pace: 1,
      script: {
        0: {props: {opacity: 0}},
        1: {props: {opacity: 0}},
        2: {props: {opacity: 1}},
        3: {props: {opacity: 1}},
        4: {props: {opacity: 0.1}},
      }
    })
  .interval({
    length: 5000,
    channels: 3,
    live: false,
    expr: function(emit, x, y, i, j){
      y = -Math.sqrt(4-Math.pow(x, 2));
      var func = Math.pow(x, 2) - Math.pow(y, 2);
      emit(x, func, y);
    },
  })
  .point({
    size: 8,
    color: '#b177e2',
  })
    .step({
      pace: 1,
      script: {
        0: {props: {opacity: 0}},
        1: {props: {opacity: 0}},
        2: {props: {opacity: 0}},
        3: {props: {opacity: 1}},
      }
    })
  // Ukazka prvej derivacie podla y v 2D, dolny polkruh
  .interval({
    length: 5000,
    channels: 3,
    live: false,
    expr: function(emit, x, y, i, j){
      y = Math.sqrt(4-Math.pow(x, 2));
      emit(x, 0, y);
    },
  })
  .point({
    size: 8,
    color: '#FF9a00',
  })
    .step({
      pace: 1,
      script: {
        0: {props: {opacity: 0}},
        1: {props: {opacity: 0}},
        2: {props: {opacity: 1}},
        3: {props: {opacity: 1}},
        4: {props: {opacity: 0.1}},
      }
    })
  .interval({
    length: 5000,
    channels: 3,
    live: false,
    expr: function(emit, x, y, i, j){
      y = Math.sqrt(4-Math.pow(x, 2));
      var func = Math.pow(x, 2) - Math.pow(y, 2);
      emit(x, func, y);
    },
  })
  .point({
    size: 8,
    color: '#DFB100',
  })
    .step({
      pace: 1,
      script: {
        0: {props: {opacity: 0}},
        1: {props: {opacity: 0}},
        2: {props: {opacity: 0}},
        3: {props: {opacity: 1}},
      }
    })
  // Draw ticks and labels
  .scale({
    axis: 1,
    divide: 5,
  }).ticks({
    width: 5,
    size: 25,
    color: 'black',
  }).format({
    digits: 1,
  }).label({
    color: 'red',
    zIndex: 1,
  })
  .scale({
    axis: 3,
    divide: 5,
  }).ticks({
    width: 5,
    size: 25,
    color: 'black',
  }).format({
    digits: 1,
  }).label({
    color: 'red',
    zIndex: 1,
  })
  .scale({
    axis: 2,
    divide: 5,
  }).ticks({
    width: 5,
    size: 25,
    color: 'black',
  }).format({
    digits: 1,
  }).label({
    color: 'red',
    zIndex: 1,
  })
  // Stacionarne body
  .array({
    data: [[0,0,0]],
    channels: 3, // necessary
    live: false
  })
  .point({
    size: 45,
    color: 0xFAE900
  })
    .step({
      pace: 1,
      script: {
        0: {props: {opacity: 0}},
        1: {props: {opacity: 0}},
        2: {props: {opacity: 0}},
        3: {props: {opacity: 1}},
        4: {props: {opacity: 0}},
      }
    })
  .array({
    data: [[0,-1.3,0]],
    channels: 3, // necessary
    live: false,
  }).text({
    data: ["Lokálny extrém v bode [0,0]"],
    weight: 'bold',
    detail: 45
  }).label({
    color: 0xDB00BA,
  })
    .step({
      pace: 1,
      script: {
        0: {props: {opacity: 0}},
        1: {props: {opacity: 0}},
        2: {props: {opacity: 0}},
        3: {props: {opacity: 1}},
        4: {props: {opacity: 0}},
      }
    })

scene
  .slide({
    steps: 10,
    from: 4
  })
  .reveal({
    duration: 1
  })
  // Stacionarne body
  // .array({
  //   //data: [[0,-4,2], [0,-4,-2], [-2,-12,4], [2,-12,4], [2,4,0], [-2,4,0]],
  //   data: [[0,0,2], [0,0,-2], [-2,0,4], [2,0,4], [2,0,0], [-2,0,0]],
  //   channels: 3, // necessary
  //   live: false
  // })
  // .point({
  //   size: 45,
  //   color: 0xFAE900
  // })
  // .array({
  //   //data: [[0,-5,2], [0,-5,-2], [-2,-14,4], [2,-14,4], [2,5,0], [-2,6,0]],
  //   data: [[0,1,2], [0,1,-2], [-2,1,4], [2,1,4], [2,1,0], [-2,1,0]],
  //   channels: 3, // necessary
  //   live: false,
  // }).text({
  //   data: ["A=[0,2]", "B=[0,-2]", "C=[-2,4]", "D=[2,4]", "E=[2,0]", "F=[-2,0]"],
  //   weight: 'bold',
  //   detail: 45
  // }).label({
  //   color: 0xDB00BA,
  // })
  // Funkčné hodnoty
  .array({ // Bod A = [0, 2]
    items: 2,
    expr: function (emit) {
      var x1 = 0;
      var y1 = 2;
      var func1= Math.pow(x1, 2) - Math.pow(y1, 2);
      emit(x1, 0, y1);
      emit(x1, func1, y1);
    },
    channels: 3,
  })
  .grow({
    items: 'first',
    scale: 1
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {scale: 0}},
      {props: {scale: 0}},
      {props: {scale: 1}},
    ]
  })
  // Connect footprint and point with line
  .vector({
    width: 3
  })
  // Draw second point only
  .slice({
    items: [1, 2]
  })
  .point({
    size: 20,
    color: "#803906",
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {opacity: 0}},
      {props: {opacity: 0}},
      {props: {opacity: 1}},
    ]
  })
  .array({ // Bod B = [0, -2]
    items: 2,
    expr: function (emit) {
      var x = 0;
      var y = -2;
      var func = Math.pow(x, 2) - Math.pow(y, 2);
      emit(x, 0, y);
      emit(x, func, y);
    },
    channels: 3,
  })
  .grow({
    items: 'first',
    scale: 1
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {scale: 0}},
      {props: {scale: 0}},
      {props: {scale: 1}},
    ]
  })
  // Connect footprint and point with line
  .vector({
    width: 3
  })
  // Draw second point only
  .slice({
    items: [1, 2]
  })
  .point({
    size: 20,
    color: "#803906",
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {opacity: 0}},
      {props: {opacity: 0}},
      {props: {opacity: 1}},
    ]
  })
  .text({
    data: ["f(B)=-4"],
  }).label({
    color: "#803906",
    colors: "#colors",
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {opacity: 0}},
      {props: {opacity: 0}},
      {props: {opacity: 1}},
    ]
  })
  // .array({ // Bod C = [-2, 4]
  //   items: 2,
  //   expr: function (emit) {
  //     var x = -2;
  //     var y = 4;
  //     var func = Math.pow(x, 2) - Math.pow(y, 2);
  //     emit(x, 0, y);
  //     emit(x, func, y);
  //   },
  //   channels: 3,
  // })
  // .grow({
  //   items: 'first',
  //   scale: 1
  // })
  // .step({
  //   pace: 1,
  //   trigger: 1,
  //   script: [
  //     {props: {scale: 0}},
  //     {props: {scale: 1}},
  //   ]
  // })
  // // Connect footprint and point with line
  // .vector({
  //   width: 3
  // })
  // // Draw second point only
  // .slice({
  //   items: [1, 2]
  // })
  // .point({
  //   size: 20,
  //   color: "#803906",
  // })
  // .step({
  //   pace: 1,
  //   trigger: 1,
  //   script: [
  //     {props: {opacity: 0}},
  //     {props: {opacity: 1}},
  //   ]
  // })
  // .text({
  //   data: ["f(C)=-12"],
  // }).label({
  //   color: "#803906",
  //   colors: "#colors",
  // })
  // .step({
  //   pace: 1,
  //   trigger: 1,
  //   script: [
  //     {props: {opacity: 0}},
  //     {props: {opacity: 1}},
  //   ]
  // })
  // .array({ // Bod D = [2, 4]
  //   items: 2,
  //   expr: function (emit) {
  //     var x = 2;
  //     var y = 4;
  //     var func = Math.pow(x, 2) - Math.pow(y, 2);
  //     emit(x, 0, y);
  //     emit(x, func, y);
  //   },
  //   channels: 3,
  // })
  // .grow({
  //   items: 'first',
  //   scale: 1
  // })
  // .step({
  //   pace: 1,
  //   trigger: 1,
  //   script: [
  //     {props: {scale: 0}},
  //     {props: {scale: 1}},
  //   ]
  // })
  // // Connect footprint and point with line
  // .vector({
  //   width: 3
  // })
  // // Draw second point only
  // .slice({
  //   items: [1, 2]
  // })
  // .point({
  //   size: 20,
  //   color: "#803906",
  // })
  // .step({
  //   pace: 1,
  //   trigger: 1,
  //   script: [
  //     {props: {opacity: 0}},
  //     {props: {opacity: 1}},
  //   ]
  // })
  // .text({
  //   data: ["f(D)=-12"],
  // }).label({
  //   color: "#803906",
  //   colors: "#colors",
  // })
  // .step({
  //   pace: 1,
  //   trigger: 1,
  //   script: [
  //     {props: {opacity: 0}},
  //     {props: {opacity: 1}},
  //   ]
  // })
  .array({ // Bod E = [2, 0]
    items: 2,
    expr: function (emit) {
      var x = 2;
      var y = 0;
      var func = Math.pow(x, 2) - Math.pow(y, 2);
      emit(x, 0, y);
      emit(x, func, y);
    },
    channels: 3,
  })
  .grow({
    items: 'first',
    scale: 1
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {scale: 0}},
      {props: {scale: 0}},
      {props: {scale: 1}},
    ]
  })
  // Connect footprint and point with line
  .vector({
    width: 3
  })
  // Draw second point only
  .slice({
    items: [1, 2]
  })
  .point({
    size: 20,
    color: "#803906",
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {opacity: 0}},
      {props: {opacity: 0}},
      {props: {opacity: 1}},
    ]
  })
  .text({
    data: ["f(E)=4"],
  }).label({
    color: "#803906",
    colors: "#colors",
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {opacity: 0}},
      {props: {opacity: 0}},
      {props: {opacity: 1}},
    ]
  })
  .array({ // Bod F = [-2, 0]
    items: 2,
    expr: function (emit) {
      var x = -2;
      var y = 0;
      var func = Math.pow(x, 2) - Math.pow(y, 2);
      emit(x, 0, y);
      emit(x, func, y);
    },
    channels: 3,
  })
  .grow({
    items: 'first',
    scale: 1
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {scale: 0}},
      {props: {scale: 0}},
      {props: {scale: 1}},
    ]
  })
  // Connect footprint and point with line
  .vector({
    width: 3
  })
  // Draw second point only
  .slice({
    items: [1, 2]
  })
  .point({
    size: 20,
    color: "#803906",
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {opacity: 0}},
      {props: {opacity: 0}},
      {props: {opacity: 1}},
    ]
  })
  .text({
    data: ["f(F)=4"],
  }).label({
    color: "#803906",
    colors: "#colors",
  })
  .step({
    pace: 1,
    trigger: 1,
    script: [
      {props: {opacity: 0}},
      {props: {opacity: 0}},
      {props: {opacity: 1}},
    ]
  })
