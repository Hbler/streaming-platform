//// Global Variables
const navBtn = document.querySelector(".nav__btn");
const navList = document.querySelector(".nav__list");

const ntfBtn = document.querySelector(".ntf__btn");
const ntfList = document.querySelector(".notification__list");

const userImg = document.querySelector(".header__user img");
const actions = document.querySelector(".user__actions");

const seachBtn = document.querySelector(".search__btn");
const searchBar = document.querySelector(".header__search");

const main = document.querySelector("main");
let n = 1;

//// Listeners
document.addEventListener("scroll", debounce(storeScroll));

navBtn.addEventListener("click", () => {
  showList(navList);
});

ntfBtn.addEventListener("click", () => {
  showList(ntfList);
});

userImg.addEventListener("click", () => {
  showList(actions);
});

seachBtn.addEventListener("click", showSearch);
searchBar.addEventListener("keydown", (e) => {
  if (e.code === "Escape") showSearch();
  //   else if (e.code === 'Enter') search();
});

//// Funcitons
/// source https://developpaper.com/css-application-based-on-user-scrolling/
// The debounce function receives our function as a parameter
function debounce(fn) {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
}

function storeScroll() {
  document.documentElement.dataset.scroll = window.scrollY;
}

function showList(node) {
  node.classList.toggle("hidden");
  node.classList.toggle("list__visible");
}

function showSearch() {
  searchBar.classList.toggle("hidden");
  searchBar.classList.toggle("search__visible");

  seachBtn.classList.toggle("trasnparent");
}

function alternateHighlight() {
  const section = document.querySelector(".highlight");
  const currentBG = document.querySelector(".highlight__bg");
  const bg = document.createElement("div");
  const logo = document.querySelector(".highlight__logo");
  const title = document.querySelector(".highlight__title");
  const btnOneTxt = document.querySelector(".btn--one__txt");
  const btnTwoTxt = document.querySelector(".btn--two__txt");
  const btnTwoIcon = document.querySelector(".btn--two__icon");
  const options = [
    {
      bg: "./assets/img/movies/love_death_robots.png",
      logo: "./assets/img/movies/LDR_logo.png",
      title: '"The Episode Title"',
      btnOne: "Play Episode",
      btnTwoI: ["fa-solid", "fa-layer-group"],
      btnTwo: "&nbsp;Episodes",
    },
    {
      bg: "./assets/img/movies/ted.webp",
      logo: "./assets/img/movies/tedlogo.webp",
      title: '"The Movie Title"',
      btnOne: "Watch",
      btnTwoI: ["fa-solid", "fa-circle-info"],
      btnTwo: "&nbsp;More Info",
    },
  ];

  const opt = options[n % 2];

  section.removeChild(currentBG);
  bg.style.backgroundImage = `url(${opt.bg})`;
  bg.style.zIndex = "1";
  logo.src = opt.logo;
  title.innerText = opt.title;
  btnOneTxt.innerHTML = opt.btnOne;
  btnTwoTxt.innerHTML = opt.btnTwo;
  btnTwoIcon.classList.remove(...btnTwoIcon.classList);
  btnTwoIcon.classList.add(...opt.btnTwoI, "btn--two__icon");
  bg.classList.add("highlight__bg", "smooth__bg");
  section.appendChild(bg);

  n++;
}

function createLists() {
  const titles = [
    "Continue Watching for User",
    "My List",
    "Netflix Originals",
    "Shows for the Family",
  ];
  const path = "./assets/img/movies/";
  const options = [
    "amigas.jpg",
    "carbon.png",
    "demon.png",
    "gg.jpg",
    "papel.jpg",
    "b99.png",
    "ricky_morty.png",
    "food_wars.png",
    "qforce.png",
    "midnight.png",
    "inside.png",
  ];

  titles.forEach((t) => {
    const section = document.createElement("section");
    const title = document.createElement("h2");
    const div = document.createElement("div");

    section.classList.add("list");
    title.classList.add("list__title");
    div.classList.add("list__options");

    title.innerText = t;
    options.forEach((o, i, arr) => {
      const img = document.createElement("img");
      img.src = path + arr[Math.floor(Math.random() * arr.length)];

      div.appendChild(img);
    });

    section.append(title, div);

    main.appendChild(section);
  });
}

//// Flow
storeScroll();
createLists();
setInterval(alternateHighlight, 10000);
