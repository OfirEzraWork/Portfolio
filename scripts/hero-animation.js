"use strict";

const heroTextHeaderElement = document.querySelector(".hero-text-header");
const heroTextParagraphElement = document.querySelector(".hero-text-paragraph");
const coloredLineElement = document.querySelector(".colored-line");
const heroImageElement = document.querySelector(".hero-figure");

gsap.to(heroTextHeaderElement, { duration: 1.5, x: 0, opacity: 1 });
gsap.to(heroImageElement, { duration: 1.5, delay: 1.4, x: 0, opacity: 1 });
gsap.to(coloredLineElement, {
  duration: 1.5,
  delay: 2,
  opacity: 1,
});
gsap.to(heroTextParagraphElement, {
  duration: 1.5,
  delay: 2.6,
  y: 0,
  opacity: 1,
});
