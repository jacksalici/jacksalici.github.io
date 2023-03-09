/*
 *
 *   DOTS PATTERN
 *
 */

var svg = document.getElementById("svg");
var dotMatrix = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
var dots = [];
var dotStepX = 30;
var dotStepY = 30;
var screenW = window.innerWidth;
var screenH = window.outerHeight;
var dotColumns = Math.round(screenW / dotStepX);
var dotRows = Math.round(screenH / dotStepY);
var dotRandomMax = 0;

var mouseMoving = false;
var mouse = {};

var returningSpeed = 1;
mouse.distances = [];
mouse.power = 80;

function init() {
  screenW = window.innerWidth;
  screenH = window.innerHeight;
  dotColumns = Math.round(screenW / dotStepX);
  dotRows = Math.round(screenH / dotStepY);

  for (i = 0, j = 0, k = 0; i < dotColumns * dotRows; i++) {
    //j iterates rows
    //k iterates cols
    //i = j*dotColumns + k
    j = Math.floor(i / dotColumns);
    k = i % dotColumns;

    dots[i] = {};
    dots[i].distances = [];
    dots[i].el = dotMatrix.cloneNode(false);
    dots[i].X =
      k * dotStepX -
      dotRandomMax / 2 +
      Math.random() * dotRandomMax +
      dotStepX / 2;
    dots[i].Y =
      j * dotStepY -
      dotRandomMax / 2 +
      Math.random() * dotRandomMax +
      dotStepX / 2;

    dots[i].r = 1;
    dots[i].X0 = dots[i].X;
    dots[i].Y0 = dots[i].Y;
    dots[i].opacity = 0.3;

    dots[i].el.setAttribute("cx", dots[i].X);
    dots[i].el.setAttribute("cy", dots[i].Y);
    dots[i].el.setAttribute("r", dots[i].r);
    dots[i].el.setAttribute("opacity", dots[i].opacity);
    svg.appendChild(dots[i].el);
  }
}

function getDistance(obj1, obj2) {
  return Math.round(
    Math.sqrt(Math.pow(obj1.X - obj2.X, 2) + Math.pow(obj1.Y - obj2.Y, 2))
  );
}

function update() {
  for (i = 0; i < dotColumns * dotRows; i++) {
    if (getDistance(dots[i], mouse) < mouse.power / 2) {
      dots[i].el.setAttribute("opacity", 0.7);
      dots[i].el.setAttribute("r", 1.5);
    } else if (getDistance(dots[i], mouse) < mouse.power) {
      dots[i].el.setAttribute("opacity", 0.5);
      dots[i].el.setAttribute("r", 1.25);
    } else {
      dots[i].el.setAttribute("opacity", 0.3);
      dots[i].el.setAttribute("r", 1);
    }
  }
}

function destroy() {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  dots.length = 0;
}

init();

window.addEventListener("resize", function () {
  destroy();
  init();
});

window.addEventListener("mousemove", function (e) {
  mouseMoving = true;
  mouse.X = e.clientX;
  mouse.Y = e.clientY;
  update();
});

window.addEventListener("touchmove", function (e) {
  mouseMoving = true;
  mouse.X = e.changedTouches.item(0).clientX;
  mouse.Y = e.changedTouches.item(0).clientY;
  update();
});

/*
 *
 *   HEADER BAR AND NAV MENU
 *
 */

function menuOnClick() {
  document.getElementById("hamburger").classList.toggle("change");
  document.getElementById("menu-closer").classList.toggle("change");
  document.getElementById("nav").classList.toggle("hide-nav");
}

function menuCloseOnClick() {
  document.getElementById("hamburger").classList.toggle("change");
  document.getElementById("nav").classList.toggle("hide-nav");
  document.getElementById("menu-closer").classList.toggle("change");
}

if (document.getElementById("hero-text") !== null) {
  const circleType = new CircleType(
    document.getElementById("hero-text"),
    (string) => (string + " ").split("")
  );

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  document.addEventListener("scroll", function () {
    var offset = window.scrollY;

    document.getElementById("hero-text").style.transform =
      "rotate(" + offset * 0.3 + "deg)";
    document.getElementById("hero-text").style.top =
      offset * 0.3 + 0.15 * vh + "px";
  });
}
/*
 *
 *   TOC
 *
 */
var collapsibleToc = document.getElementsByClassName("single__toc-button");
var i;

for (i = 0; i < collapsibleToc.length; i++) {
  collapsibleToc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = document.getElementsByClassName("single__toc-content")[0];
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/*
 *
 *   OBSERVER
 *
 */

const observer = new IntersectionObserver((entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated_visible");
    } else {
      entry.target.classList.remove("animated_visible");
    }

    if (entry.boundingClientRect.top < 0) {
      entry.target.classList.add("animated_hidden-top");
    } else {
      entry.target.classList.remove("animated_hidden-top");
    }

    if (entry.boundingClientRect.top > 0) {
      entry.target.classList.add("animated_hidden-bottom");
    } else {
      entry.target.classList.remove("animated_hidden-bottom");
    }
  });
});

const observerList = document.querySelectorAll(".animated");
observerList.forEach((el) => {
  observer.observe(el);
});
