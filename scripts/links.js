document.querySelector(".nav-list").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-item-link")) {
    const id = e.target.getAttribute("href");
    if (id === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (id !== "#" && id.startsWith("#")) {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  }
});
