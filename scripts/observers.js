const navElement = document.querySelector(".nav");
const navWelcomeElement = document.querySelector(".nav-item--welcome");
const navProjectsElement = document.querySelector(".nav-item--projects");
const navAboutElement = document.querySelector(".nav-item--about");

const heroSectionElement = document.querySelector(".section-hero");
const projectsSectionElement = document.querySelector(".section-projects");
const aboutSectionElement = document.querySelector(".section-about");
const projectImages = document.querySelectorAll("img[data-src]");

let imagesLoaded = false;

const heroSectionObserving = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navElement.classList.add("nav--sticky");
  } else {
    manageClickedClass(navWelcomeElement);
    navElement.classList.remove("nav--sticky");
  }
};

const projectsSectionObserving = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  manageClickedClass(navProjectsElement);
  if (imagesLoaded) return;
  projectImages.forEach((img) => (img.src = img.dataset.src));
  imagesLoaded = true;
};

const aboutSectionObserving = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    manageClickedClass(navAboutElement);
  }
};

const heroSectionObserver = new IntersectionObserver(heroSectionObserving, {
  root: null,
  threshold: 0.2,
});

heroSectionObserver.observe(heroSectionElement);

const projectsObserver = new IntersectionObserver(projectsSectionObserving, {
  root: null,
  threshold: 0.5,
});

projectsObserver.observe(projectsSectionElement);

const aboutObserver = new IntersectionObserver(aboutSectionObserving, {
  root: null,
  threshold: 0.75,
});

aboutObserver.observe(aboutSectionElement);

navWelcomeElement.addEventListener("click", navItemClick);
navProjectsElement.addEventListener("click", navItemClick);
navAboutElement.addEventListener("click", navItemClick);

function navItemClick(e) {
  manageClickedClass(e.target.closest(".nav-item"));
}

function manageClickedClass(element) {
  element === navWelcomeElement
    ? element.classList.add("nav-item--clicked")
    : navWelcomeElement.classList.remove("nav-item--clicked");
  element === navProjectsElement
    ? element.classList.add("nav-item--clicked")
    : navProjectsElement.classList.remove("nav-item--clicked");
  element === navAboutElement
    ? element.classList.add("nav-item--clicked")
    : navAboutElement.classList.remove("nav-item--clicked");
}
