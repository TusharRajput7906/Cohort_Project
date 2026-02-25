let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturate: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

let filter = document.querySelector(".filters");

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#file");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset");
const downloadBtn = document.querySelector("#download");
let file = null;
let image = null;
function createFilterElement(name, unit, value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.value = value;
  input.min = min;
  input.max = max;
  input.id = name;

  const p = document.createElement("p");
  p.innerHTML = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (e) => {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

function createFilter() {
  Object.keys(filters).forEach((element) => {
    const div = createFilterElement(
      element,
      filters[element].unit,
      filters[element].value,
      filters[element].min,
      filters[element].max
    );

    filter.appendChild(div);
  });
}
createFilter();

imgInput.addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  console.log(file);

  const imageplaceholder = document.querySelector(".img");
  imageCanvas.style.display = "block";
  imageplaceholder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  if (!image) return;
  const f = filters;
  const parts = [
    `brightness(${f.brightness.value}${f.brightness.unit})`,
    `contrast(${f.contrast.value}${f.contrast.unit})`,
    `saturate(${f.saturate.value}${f.saturate.unit})`,
    `hue-rotate(${f.hueRotation.value}${f.hueRotation.unit})`,
    `blur(${f.blur.value}${f.blur.unit})`,
    `grayscale(${f.grayscale.value}${f.grayscale.unit})`,
    `sepia(${f.sepia.value}${f.sepia.unit})`,
    `opacity(${f.opacity.value}${f.opacity.unit})`,
    `invert(${f.invert.value}${f.invert.unit})`,
  ];

  const filterStr = parts.join(" ");
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.save();
  canvasCtx.filter = filterStr;
  canvasCtx.drawImage(image, 0, 0);
  canvasCtx.restore();
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturate: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFilters();
  filter.innerHTML = "";
  createFilter();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});
