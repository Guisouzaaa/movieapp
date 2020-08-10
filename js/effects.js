// const navElements = document.querySelectorAll("form");
// const searchBtn = document.getElementById('search')

//Responsive Nav
const navShow = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("form");

  burger.addEventListener("click", () => {
    //toggle nav
    nav.classList.toggle("nav-active");
    //Burger animation
    burger.classList.toggle("burgerToggle");
  });
};

// // Close Nav
const closeNav = () => {
  const closeBtn = document.querySelector(".close-nav");
  const nav = document.querySelector("form");

  closeBtn.addEventListener('click', () => {
      nav.classList.remove("nav-active");
  })
}

navShow();
closeNav();
