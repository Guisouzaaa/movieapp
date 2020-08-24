//Responsive Nav
const navShow = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("form");

  burger.addEventListener("click", () => {
    //toggle nav
    nav.classList.toggle("nav-active");
  });
};

// Close Nav
const closeNav = () => {
  const closeBtn = document.querySelector(".close-nav");
  const nav = document.querySelector("form");

  closeBtn.addEventListener("click", () => {
    nav.classList.remove("nav-active");
  });
};
navShow();
closeNav();

//sticky header
window.addEventListener("scroll", () => {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//smooth scroll
const scroll = new SmoothScroll('[href*="#"]', {
  speed: 600,
  offset: 40,
  header: '[data-scroll-header]'
});

$("#search, .filter-btn").click(function () {
  $("html,body").animate(
    {
      scrollTop: $("#filtered-movies").offset().top - 150,
    },
    "slow"
  );
});
