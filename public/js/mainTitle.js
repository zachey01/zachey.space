filterId = document.querySelector("svg filter").id;
feGauss = document.querySelector(`#${filterId}>feGaussianBlur`);
feDisp = document.querySelector(`#${filterId}>feDisplacementMap`);

function zoom(event) {
  event.preventDefault();

  scale += event.deltaY * -0.005;
  scale2 += event.deltaY * -1;

  // Restrict scale
  scale = Math.min(Math.max(0.05, scale), 50);

  // Apply scale transform
  feGauss.setAttribute("stdDeviation", scale);
  feDisp.setAttribute("scale", scale2);
}

let scale = 0;
let scale2 = 0;

const el = document.querySelector(".main-title");

el.onwheel = zoom;
