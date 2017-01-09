const multiples = [1, 2.68, 5.11, 8.11];
const chimes = [];

const reverb = new Tone.Freeverb().toMaster();
reverb.dampening.value = 1000;

class Chime {
  constructor(fundamental) {
    // this.env = new Tone.AmplitudeEnvelope({
    //   "attack": 0.1,
    //   "decay": 0.3,
    //   "sustain": 0.5,
    //   "release": 5
    // }).connect(reverb);
    this.env = new Tone.AmplitudeEnvelope({
      "attack": 0.2,
      "decay": 2.0,
      "sustain": 0.5,
      "release": 5
    }).connect(reverb);

    this.oscillators = [];
    this.modulators = [];

    multiples.forEach(x => this.setupOsc(x * fundamental));

    this.env.triggerAttackRelease(0.5);
    // this.env.triggerAttack();
    // this.env.triggerRelease();
  }

  setupOsc(freq) {
    const osc = new Tone.Oscillator(freq, "sine").connect(this.env).start();

    // const reverb = new p5.Reverb();
    // reverb.process(osc, 3, 2);

    // osc.start();
    this.oscillators.push(osc);

    // const modulator = new p5.Oscillator('triangle');
    // modulator.disconnect();
    // modulator.freq(3);
    // modulator.amp(0.5);

    // modulator.start();
    // osc.amp(modulator);
    // this.modulators.push(modulator)
  }

  update() {
    let amp = this.oscillators[0].amp().value;
    if (amp > 0) {
      amp -= 0.005;
      this.setAmps(amp);
    }
  }

  setAmps(amp) {
    if (amp < 0) amp = 0;
    this.oscillators.forEach(osc => osc.amp(amp)); // this needs to vary again
    this.modulators.forEach(mod => mod.amp(amp));
  }
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  // chimes.forEach((chime) => chime.update());
  // let amp = modulator1.amp().value;
  // modulator1.amp(amp > 0 ? amp - .001 : 0);
  // modulator2.amp(amp > 0 ? amp - .001 : 0);
  // modulator3.amp(amp > 0 ? amp - .001 : 0);
  // modulator4.amp(amp > 0 ? amp - .001 : 0);
  // modulator1.amp(0);
  // modulator2.amp(0);
  // modulator3.amp(0);
  // modulator4.amp(0);
  // let amp = osc1.amp().value;
  // if (amp > 0) {
  //   amp -= 0.005;
  //   setAmps(amp);
  //   console.log(modulator1.amp().value)
  // }
}

function mousePressed() {
  chimes.push(new Chime(1000 - mouseY));
  // setAmps(0.5);
}

function mouseMoved() {
  // fundamental = 1000 - mouseY;
  // osc1.freq(fundamental);
  // osc2.freq(2.68 * fundamental);
  // osc3.freq(5.11 * fundamental);
  // osc4.freq(8.11 * fundamental);
}

// function setAmps(amp) {
//   if (amp < 0) amp = 0;
//   osc1.amp(amp);
//   osc2.amp(amp);
//   osc3.amp(amp / 2);
//   osc4.amp(amp / 2);
//   modulator1.amp(amp);
//   modulator2.amp(amp);
//   modulator3.amp(amp);
//   modulator4.amp(amp);
// }
