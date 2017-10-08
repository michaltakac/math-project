var mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor'],
  controls: {
    klass: THREE.OrbitControls
  },
  camera: {
    fov: 45,
  }
});
var three = mathbox.three;
three.camera.position.set(-.15, .15, 3.6);
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);


var view = mathbox.cartesian({
  range: [[-1, 1], [-1, 1], [-1, 1]],
  scale: [1, 1, 1],
})

var present =
view.present({
  index: 1
})


present
  .slide()
    .reveal({
      duration: 2
    })
      .transform({
        position: [0, 1, 0],
        scale: [1.1, 1.1, 1.1]
      })
        .step({
          script: [
            [{position: [0,1,0]}],
            [{position: [0,.75,0]}],
            [{position: [0,.5,0]}],
            [{position: [0,.25,0]}],
            [{position: [0,0,0]}],
            [{position: [0,-.25,0]}],
            [{position: [0,-.5,0]}],
            [{position: [0,-.75,0]}],
            [{position: [0,-1,0]}],
          ]
        })
        .grid({
          axes: [1, 3],
          width: 2,
          color: 0xb0b0b0,
          depth: .5
        })
      .end()
    .end()
      .slide().reveal({
        stagger: [1, 1, 0, 0]
      })
        .transform({
          position: [0, .75, 0]
        })
          .grid({
            axes: [1, 3],
            width: 2,
            color: 0x2fff90,
            depth: .5
          })
        .end()
      .end().end()
      .slide().reveal().move({
        from: [1, 0, 0, 0]
      })
        .transform({
          position: [0, .5, 0]
        })
          .grid({
            axes: [1, 3],
            width: 2,
            color: 0x2f9ff0,
            depth: .5
          })
      .end().end()
      .slide().reveal({
        stagger: 1,
      }).move({
        stagger: 1,
        to: [0, -1, 0, 0]
      })
        .transform({
          position: [0, .25, 0]
        })
          .grid({
            detailX: 20,
            detailY: 20,
            axes: [1, 3],
            width: 2,
            color: 0x2f9ff0,
            depth: .5
          })

present
  .slide()
    .grid({
      axes: [1, 3],
      width: 2,
      color: 0xff4f90,
      depth: .5
    })
    .reveal({
      stagger: [1],
      duration: 1,
    })
      .interval({
        length: 128,
        expr: function (emit, x, i, t) {
          if (i == 0) console.log('emitting')
          emit(x, .5 + .5 * Math.sin((x + t) * 3));
        },
        channels: 2,
      })
      .line({
        color: 0x3090FF,
        width: 20,
      });
    

present
  .slide()
    .reveal()
      .transform({
        position: [0, -.25, 0]
      })
        .grid({
          axes: [1, 3],
          width: 2,
          color: 0xff2f90,
          depth: .5
        })
      .end()
    .end()
    .slide().reveal().move({
      stagger: 2,
      from: [0, -2, 0, 0],
      to:   [0, -2, 0, 0]
    })
      .transform({
        position: [0, -.5, 0]
      })
        .grid({
          detailX: 20,
          detailY: 20,
          axes: [1, 3],
          width: 2,
          color: 0x9f2ff0,
          depth: .5,
          crossed: true
        })
      .end()
    .end().end().end()
    .slide({
      early: 1,
      late:  1,
    }).reveal()
      .transform({
        position: [0, -.75, 0]
      })
        .grid({
          axes: [1, 3],
          width: 2,
          color: 0x9f2ff0,
          depth: .5
        })
      .end()
    .end().end()
    .slide().reveal()
      .transform({
        position: [0, -1, 0]
      })
        .grid({
          axes: [1, 3],
          width: 2,
          color: 0x9f2ff0,
          depth: .5
        })
      .end()
    .end().end()