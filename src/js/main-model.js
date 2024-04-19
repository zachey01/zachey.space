const skullModelViewer = document.querySelector("model-viewer.skull-model");
let skullModelRotation = 0;
function rotateModel(event) {
  skullModelRotation += event.deltaY * 0.1;
  skullModelViewer.cameraOrbit = `${skullModelRotation}deg 75deg 100%`;
}
window.addEventListener("wheel", rotateModel);

let skillBarWrapper = document.getElementById("skill-bar-wrapper");
let skillBars = document.querySelectorAll(".skillbar-container");

let hT = skillBarWrapper.offsetTop,
  hH = skillBarWrapper.offsetHeight,
  wH = window.innerHeight,
  wS = window.scrollY;

if (wS > hT + hH - 1.4 * wH) {
  skillBars.forEach(function (skillbar) {
    let skills = skillbar.querySelector(".skillbar-container__skills");
    let dataPercent = skillbar.getAttribute("data-percent");
    animateSkill(skills, dataPercent);
  });
}

function animateSkill(element, targetWidth) {
  let currentWidth = 0;
  let duration = 5000; // 5 seconds
  let startTime;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    currentWidth = Math.min(
      (progress / duration) * parseFloat(targetWidth),
      parseFloat(targetWidth)
    );
    element.style.width = currentWidth + "%";
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
