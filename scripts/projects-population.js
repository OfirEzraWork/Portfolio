const projects = [
  {
    title: "Band of Goblins",
    description: "A single page site describing my homebrew D&D world.",
    tech: "Made with HTML and CSS",
    imgLazy: '"../img/projects-img/band-of-goblins-lazy.webp"',
    img: '"../img/projects-img/band-of-goblins.png"',
    link: "https://bandofgoblins.netlify.app/",
    mobile: true,
  },
  {
    title: "Dice Goblin",
    description: "An SPA with tools for table top games.",
    tech: "Made with VueJS",
    imgLazy: '"../img/projects-img/dice-goblin-lazy.webp"',
    img: '"../img/projects-img/dice-goblin.png"',
    link: "https://dicegoblin.netlify.app/dice",
    mobile: false,
  },
];

const fmChallenges = [
  {
    title: "Order summary component",
    tech: "Made with HTML and CSS",
    imgLazy: '"../img/projects-img/order-summary-card.png"',
    img: '"../img/projects-img/order-summary-card.png"',
    link: "https://oeordersummarycomponent.netlify.app/",
    mobile: true,
  },
  {
    title: "Easybank landing page",
    tech: "Made with HTML and CSS",
    imgLazy: '"../img/projects-img/easybank.png"',
    img: '"../img/projects-img/easybank.png"',
    link: "https://oeeasybank.netlify.app/",
    mobile: false,
  },
];

const projectTemplate = `<li class=\"projects-list-item\">
  <article class=\"project column\">
    <img src=%%IMG-LAZY%% data-src=%%IMG%% alt=\"image of the site\" class=\"project-image\">
    <div class=\"project-content column\">
      <header>
        <h3 class=\"project-title h3\">%%TITLE%%</h3>
      </header>
      <p class=\"project-description\">%%DESCRIPTION%%</p>
      <p class=\"project-tech\">%%TECH%%</p>
      <div class="goto-container">
        <div></div>
        <a href=\"%%LINK%%\" class=\"goto\" target="_blank">
          <p>Visit</p>
          <ion-icon name=\"chevron-forward-outline\"></ion-icon>
        </a>
        <div class="goto-no-mobile %%MOBILE%%">
          <ion-icon class="icon-overlap" name="ban-outline"></ion-icon>
          <ion-icon class="icon-overlapped" name="phone-portrait-outline"></ion-icon>
        </div>
      </div>
    </div>
  </article>
</li>
`;

const fmcTemplate = `<li class=\"projects-list-item\">
  <article class=\"project column\">
    <img src=%%IMG-LAZY%% data-src=%%IMG%% alt=\"image of the site\" class=\"project-image\">
    <div class=\"project-content column\">
      <header>
        <h3 class=\"project-title h3\">%%TITLE%%</h3>
      </header>
      <p class=\"project-tech\">%%TECH%%</p>
      <div class="goto-container">
        <div></div>
          <a href=\"%%LINK%%\" class=\"goto\" target="_blank">
            <p>Visit</p>
            <ion-icon name=\"chevron-forward-outline\"></ion-icon>
          </a>
        <div class="goto-no-mobile %%MOBILE%%">
          <ion-icon class="icon-overlap" name="ban-outline"></ion-icon>
          <ion-icon class="icon-overlapped" name="phone-portrait-outline"></ion-icon>
        </div>
      </div>
    </div>
  </article>
</li>
`;

const emptyTemplate = `<li class="projects-list-item">
  <article class="project project--empty"></article>
</li>`;

const projectsListElement = document.querySelector(".projects-list--prj");
const projectsList = [];
projects.forEach((prj) => {
  let html = projectTemplate.replace("%%TITLE%%", prj.title);
  html = html.replace("%%DESCRIPTION%%", prj.description);
  html = html.replace("%%TECH%%", prj.tech);
  html = html.replace("%%IMG-LAZY%%", prj.imgLazy);
  html = html.replace("%%IMG%%", prj.img);
  html = html.replace("%%LINK%%", prj.link);
  html = html.replace("%%MOBILE%%", prj.mobile && "hidden");
  projectsList.unshift(html);
});

const fmListElement = document.querySelector(".projects-list--fm");
const fmList = [];
fmChallenges.forEach((challenge) => {
  let html = fmcTemplate.replace("%%TITLE%%", challenge.title);
  html = html.replace("%%TECH%%", challenge.tech);
  html = html.replace("%%IMG-LAZY%%", challenge.imgLazy);
  html = html.replace("%%IMG%%", challenge.img);
  html = html.replace("%%LINK%%", challenge.link);
  html = html.replace("%%MOBILE%%", challenge.mobile && "hidden");
  fmList.unshift(html);
});

const listLength = [
  { widthMax: 1440, widthMin: 1409, length: 4 },
  { widthMax: 1408, widthMin: 1073, length: 3 },
  { widthMax: 1072, widthMin: 717, length: 2 },
  { widthMax: 716, widthMin: 320, length: 1 },
];

let oldLength = 4;
let length = 4;

function checkListLength() {
  if (window.innerWidth <= listLength[listLength.length - 1].widthMin) {
    length = listLength[listLength.length - 1].length;
  } else if (window.innerWidth >= listLength[0].widthMax) {
    length = listLength[0].length;
  } else {
    for (let i = 0; i < listLength.length; i++) {
      if (
        window.innerWidth <= listLength[i].widthMax &&
        window.innerWidth >= listLength[i].widthMin
      ) {
        length = listLength[i].length;
        break;
      }
    }
  }
  if (oldLength !== length) {
    oldLength = length;
    createProjectsLists();
  }
}

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction() {
    const later = () => {
      clearTimeout(timeout);
      func();
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
window.onresize = debounce(() => {
  checkListLength();
  projectsListPointer = 0;
  fmListPointer = 0;
}, 100);

let projectsListPointer = 0;
let fmListPointer = 0;

const prjButtonLeft = document.querySelector("#prj-btn-left");
const prjButtonRight = document.querySelector("#prj-btn-right");
const fmButtonLeft = document.querySelector("#fm-btn-left");
const fmButtonRight = document.querySelector("#fm-btn-right");

function clickRightHandler(listName) {
  if (listName === "prj") {
    if (projectsListPointer + length > projectsList.length - 1) return;
    projectsListPointer++;

    length === 1
      ? handleClickRightSingleChild(
          prjButtonRight,
          projectsListElement,
          projectsList,
          projectsListPointer
        )
      : handleClickRight(
          prjButtonRight,
          projectsListElement,
          projectsList,
          length - 1,
          projectsListPointer
        );
  } else {
    if (fmListPointer + length > fmList.length - 1) return;
    fmListPointer++;

    length === 1
      ? handleClickRightSingleChild(
          fmButtonRight,
          fmListElement,
          fmList,
          fmListPointer
        )
      : handleClickRight(
          fmButtonRight,
          fmListElement,
          fmList,
          length - 1,
          fmListPointer
        );
  }
}
function clickLeftHandler(listName) {
  if (listName === "prj") {
    if (projectsListPointer - 1 < 0) return;
    projectsListPointer--;

    length === 1
      ? handleClickLeftSingleChild(
          prjButtonLeft,
          projectsListElement,
          projectsList,
          projectsListPointer
        )
      : handleClickLeft(
          prjButtonLeft,
          projectsListElement,
          projectsList,
          projectsListPointer
        );
  } else {
    if (fmListPointer - 1 < 0) return;
    fmListPointer--;

    length === 1
      ? handleClickLeftSingleChild(
          fmButtonLeft,
          fmListElement,
          fmList,
          fmListPointer
        )
      : handleClickLeft(fmButtonLeft, fmListElement, fmList, fmListPointer);
  }
}

function clearProjectList(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function insertProjectToList(element, insertTo, list, index, pointer) {
  if (list.length >= index + 1) {
    element.insertAdjacentHTML(insertTo, list[index + pointer]);
  } else {
    element.insertAdjacentHTML(insertTo, emptyTemplate);
  }
}
function removeProjectFromList(element, removeFrom) {
  if (removeFrom === "beforeend") {
    element.removeChild(element.lastElementChild);
  } else {
    element.removeChild(element.firstElementChild);
  }
}
function createProjList() {
  clearProjectList(projectsListElement);
  for (let i = 0; i < length; i++) {
    insertProjectToList(
      projectsListElement,
      "beforeend",
      projectsList,
      i,
      projectsListPointer
    );
  }
}
function createFMList() {
  clearProjectList(fmListElement);
  for (let i = 0; i < length; i++) {
    insertProjectToList(fmListElement, "beforeend", fmList, i, fmListPointer);
  }
}
function createProjectsLists() {
  createProjList();
  createFMList();
}
checkListLength();
createProjectsLists();
