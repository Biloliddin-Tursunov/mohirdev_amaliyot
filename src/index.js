import loader from "./modules/loader";
import tab from "./modules/tab";
import modal from "./modules/modal";
import planMenu from "./modules/planMenu";
import form from "./modules/form";
import timer from "./modules/timer";
import slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {
  //loader
  loader(".loader");

  //tab
  tab(".tabheader__items", ".tabheader__item", ".tabcontent");

  //modal
  modal(".modal", "[data-modal]");

  //planMenu
  planMenu(".menu .container");

  //form
  form("form");

  //timer
  timer(".timer", "2023-01-01");

  //slider
  slider(
    ".offer__slider-wrapper",
    ".offer__slider-next",
    ".offer__slider-prev",
    "#current",
    "#total"
  );
});
