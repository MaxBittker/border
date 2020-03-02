import {
  renderMap,
  setBorder,
  renderHover,
  drawGuide,
  cleanMap
} from "./render";
import { tileSize, editorRatio, pixelRatio } from "./state";
import { newGrid, getLoc, setLoc, rotatePair, rotationSet } from "./utils";

let frame = <HTMLElement>document.getElementById("editor-frame");
let canvas = <HTMLCanvasElement>document.getElementById("editor");
let guideCanvas = <HTMLCanvasElement>document.getElementById("guide");
let renderCanvas = <HTMLCanvasElement>document.getElementById("render");
canvas.width = tileSize * editorRatio * 3;
canvas.height = tileSize * editorRatio * 3;
guideCanvas.width = tileSize * editorRatio * 3;
guideCanvas.height = tileSize * editorRatio * 3;
renderCanvas.width = tileSize * pixelRatio * 3;
renderCanvas.height = tileSize * pixelRatio * 3;

window.setTimeout(() => {
  frame.style.height = canvas.getBoundingClientRect().width + "px";
}, 500);

var isDown = false;
var isErasing = false;
var rotationalSymmetry = true;
let map = newGrid();

drawGuide();
renderMap(map);
setBorder();

function draw(loc, v) {
  if (isDown) {
    setLoc(map, loc, 1 - v);
  }
}
let handleEvent = (e, isClick = false, isTouchStart = false) => {
  let { left, top, width, height } = canvas.getBoundingClientRect();
  let x = e.clientX - left;
  let y = e.clientY - top;
  let canvasX = (x / width) * canvas.width;
  let canvasY = (y / height) * canvas.height;
  let gridX = Math.floor(canvasX / editorRatio);
  let gridY = Math.floor(canvasY / editorRatio);

  let rotatePairs = rotationSet([gridX, gridY]);
  cleanMap();

  rotatePairs.forEach(([gridX, gridY]) => {
    let sx = Math.floor(gridX / tileSize);
    let sy = Math.floor(gridY / tileSize);
    let cx = gridX % tileSize;
    let cy = gridY % tileSize;
    if (sx < 0 || sx > 2 || sy < 0 || sy > 2) {
      return;
    }
    let loc = [sx, sy, cx, cy];
    if (!loc) {
      return;
    }
    let v = getLoc(map, loc);

    if (isClick && v == 1) {
      isErasing = true;
    }

    if (!isClick) {
      v = 0;
    }

    if (isErasing) {
      v = 1;
    }
    draw(loc, v);
    renderHover(map, loc);
  });
  renderMap(map);

  window.setTimeout(setBorder, 0);
};

canvas.addEventListener("mousedown", e => {
  isDown = true;
  handleEvent(e, true);
});
canvas.addEventListener("mousemove", handleEvent);

window.addEventListener("mousedown", () => {
  isDown = true;
});
window.addEventListener("mouseup", () => {
  isDown = false;
  isErasing = false;
});
canvas.addEventListener("touchend", e => {
  isDown = false;
  isErasing = false;
});
canvas.addEventListener("touchstart", e => {
  isDown = true;

  e.preventDefault();

  const touches = e.targetTouches;
  for (let i = 0; i < touches.length; i++) {
    e["clientX"] = touches[i].clientX;
    e["clientY"] = touches[i].clientY;
    handleEvent(e, true);
  }
});
canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  isDown = true;
  if (isErasing) {
    return;
  }
  const touches = e.targetTouches;
  for (let i = 0; i < touches.length; i++) {
    e["clientX"] = touches[i].clientX;
    e["clientY"] = touches[i].clientY;
    handleEvent(e);
  }
  // isErasing = false;
});

canvas.addEventListener("touchend", e => {
  e.preventDefault();
  isDown = false;
  isErasing = false;
});
