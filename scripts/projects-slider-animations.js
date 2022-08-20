function handleClickLeft(button, element, list, pointer) {
  button.disabled = true;
  removeProjectFromList(element, "beforeend");
  const children = Array.from(element.children);
  for (let i = 0; i < children.length; i++) {
    children[i].classList.remove("projects-list-item--transition--short");
    children[i].classList.add("projects-list-item--transition");
    children[i].classList.add("projects-list-item--move-right");
  }

  setTimeout(() => {
    insertProjectToList(element, "afterbegin", list, 0, pointer);

    const newProject = element.firstElementChild;
    newProject.classList.add("projects-list-item--move-left");
    newProject.classList.add("projects-list-item--transparent");
    newProject.classList.remove("projects-list-item--transition--short");
    newProject.classList.add("projects-list-item--transition");

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("projects-list-item--transition");
      children[i].classList.remove("projects-list-item--move-right");
    }
    setTimeout(() => {
      newProject.classList.remove("projects-list-item--move-left");
      newProject.classList.remove("projects-list-item--transparent");
      button.disabled = false;
    }, 125);
  }, 250);
}
function handleClickLeftSingleChild(button, element, list, pointer) {
  _singelChildBeforeLeave("right", button, element);

  setTimeout(() => {
    _singelChildLeave(button, "left", "afterbegin", element, list, 0, pointer);
  }, 250);
}

function handleClickRight(button, element, list, index, pointer) {
  button.disabled = true;
  const children = Array.from(element.children);
  for (let i = children.length - 1; i >= 0; i--) {
    if (i === 0) {
      children[i].classList.add("projects-list-item--transparent");
    } else {
      children[i].classList.remove("projects-list-item--transition--short");
      children[i].classList.add("projects-list-item--transition");
      children[i].classList.add("projects-list-item--move-left");
    }
  }

  setTimeout(() => {
    insertProjectToList(element, "beforeend", list, index, pointer);
    removeProjectFromList(element, "afterbegin");
    const newProject = element.lastElementChild;

    newProject.classList.add("projects-list-item--move-right");
    newProject.classList.add("projects-list-item--transparent");
    newProject.classList.remove("projects-list-item--transition--short");
    newProject.classList.add("projects-list-item--transition");

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("projects-list-item--transition");
      children[i].classList.remove("projects-list-item--move-left");
    }
    setTimeout(() => {
      newProject.classList.remove("projects-list-item--move-right");
      newProject.classList.remove("projects-list-item--transparent");
      setTimeout(() => {
        button.disabled = false;
      }, 250);
    }, 125);
  }, 250);
}
function handleClickRightSingleChild(button, element, list, pointer) {
  _singelChildBeforeLeave("left", button, element);

  setTimeout(() => {
    _singelChildLeave(button, "right", "beforeend", element, list, 0, pointer);
  }, 250);
}

function _singelChildBeforeLeave(exitLocation, button, element) {
  button.disabled = true;
  const child = element.firstElementChild;

  child.classList.remove("projects-list-item--transition");
  child.classList.add("projects-list-item--transition--short");
  child.classList.add(`projects-list-item--move-${exitLocation}`);
  child.classList.add("projects-list-item--transparent");
}
function _singelChildLeave(
  button,
  enterLocation,
  insertTo,
  element,
  list,
  index,
  pointer
) {
  insertProjectToList(element, insertTo, list, index, pointer);

  const newProject =
    insertTo === "afterbegin"
      ? element.firstElementChild
      : element.lastElementChild;
  newProject.classList.add(`projects-list-item--move-${enterLocation}`);
  newProject.classList.add("projects-list-item--transparent");
  newProject.classList.remove("projects-list-item--transition");
  newProject.classList.add("projects-list-item--transition--short");

  removeProjectFromList(
    element,
    insertTo === "afterbegin" ? "beforeend" : "afterbegin"
  );

  setTimeout(() => {
    newProject.classList.remove(`projects-list-item--move-${enterLocation}`);
    newProject.classList.remove("projects-list-item--transparent");
    setTimeout(() => {
      button.disabled = false;
    }, 250);
  }, 125);
}
