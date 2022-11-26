import loader from "./modules/loader";
import tab from "./modules/tab";
import modal from "./modules/modal";
import planMenu from "./modules/planMenu";
import form from "./modules/form";
import timer from "./modules/timer";
import slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {
  //loader
  loader();
});
//tab
tab();

//modal
modal();

//planMenu
planMenu();

//form
form();

//timer
timer();

//slider
slider();
