const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
  pixelsPerInch: 72,
};

const sketch = () => {
  const colorCount = random.rangeFloor(3, 6);
  const palette = random.shuffle(random.pick(palettes).slice(0, 3)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 30;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push(
          {
            color: 'white',
            radius: random.value() * .01,
            position: [u, v]
          }
        )
      }
    }
    return points;
  }
  const points = createGrid();
  const margin = 300;
  return ({ context, width, height }) => {
    context.fillStyle = random.pick(palette);
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.lineStyle = color;
      context.arc(x, y, radius * width, 0, Math.PI * 2, true);
      context.fillStyle = random.pick(palette)
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);