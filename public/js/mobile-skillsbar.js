var skillPers = document.querySelectorAll(".skill-per");

skillPers.forEach(function (skillPer) {
  var per = parseFloat(skillPer.getAttribute("per"));
  skillPer.style.width = per + "%";

  var animatedValue = 0;
  var startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = timestamp - startTime;
    var stepPercentage = progress / 1000;

    if (stepPercentage < 1) {
      animatedValue = per * stepPercentage;
      skillPer.setAttribute("per", Math.floor(animatedValue) + "%");
      requestAnimationFrame(animate);
    } else {
      animatedValue = per;
      skillPer.setAttribute("per", Math.floor(animatedValue) + "%");
    }
  }

  requestAnimationFrame(animate);
});
