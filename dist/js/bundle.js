/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ form)
/* harmony export */ });
function form() {
  //form
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    bindPostForm(form);
  });

  const msg = {
    loading: "LOADING",
    succsess: "SUCCESS",
    error: "ERROR",
  };

  async function postForm(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  }

  function bindPostForm(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postForm("http://localhost:3000/formData", json)
        .then((res) => {
          console.log(res);
          showThanksModal(msg.succsess);
        })
        .catch(() => {
          showThanksModal(msg.error);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    open();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove("hide");
    }, 2000);

    document.querySelector(".modal").append(thanksModal);
  }
}


/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loader)
/* harmony export */ });
function loader() {
  //loader
  setTimeout(() => {
    loader = document.querySelector(".loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    });
  }, 1000);
}


/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modal)
/* harmony export */ });
function modal() {
  //modal
  const modal = document.querySelector(".modal"),
    modalTrigger = document.querySelectorAll("[data-modal]");

  modalTrigger.forEach((item) => {
    item.addEventListener("click", () => {
      open();
    });
  });

  function open() {
    modal.classList.add("show");
    modal.classList.remove("hide");
  }

  function close() {
    modal.classList.add("hide");
    modal.classList.remove("show");
  }

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.getAttribute("data-close") === ""
    ) {
      close();
    }
  });

  document.body.addEventListener("keyup", (e) => {
    if (e.code == "Escape" && !modal.classList.contains("hide")) {
      close();
    }
  });
}


/***/ }),

/***/ "./src/modules/planMenu.js":
/*!*********************************!*\
  !*** ./src/modules/planMenu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ planMenu)
/* harmony export */ });
function planMenu() {
  //planMenu
  class PlanMenu {
    constructor(src, alt, title, description, price, parentSelector) {
      this.scr = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.parentSelector = document.querySelector(parentSelector);
      this.price = price;
      this.transfer = 10500;
      this.changeToUSZ();
    }

    changeToUSZ() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      element.innerHTML = `
        <div class="menu__item">
            <img src=${this.scr} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> USZ / month</div>
            </div>
        </div>
        `;
      this.parentSelector.append(element);
    }
  }

  async function getRecource(url) {
    const res = await fetch(url);

    return await res.json();
  }

  getRecource("http://localhost:3000/planMenu").then((data) => {
    data.forEach(
      ({ imgUrl, imgAlt, title, decription, price, parentSelector }) => {
        new PlanMenu(
          imgUrl,
          imgAlt,
          title,
          decription,
          price,
          parentSelector
        ).render();
      }
    );
  });
}


/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider() {
  //slider

  const slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    width = window.getComputedStyle(slidesWrapper).width;

  class slides {
    constructor(url, parentSelector, next, prev, width, current, total) {
      this.url = url;
      this.parentSelector = parentSelector;
      this.next = next;
      this.prev = prev;
      this.width = width;
      this.current = current;
      this.total = total;
      this.getData();
    }
    async getData() {
      const res = await fetch(this.url);
      return await res.json();
    }
    render() {
      const elem = document.createElement("div");
      let offset = 0;
      let slideIndex = 1;

      this.getData().then((data) => {
        data.forEach((item) => {
          elem.innerHTML += ` 
            <div class="offer__slide">
              <img src=${item.bgImg} alt="slider1" />
              <div class="tabcontent__descr">${item.slideDesc}</div>
            </div>
    `;
        });

        const dotWrapper = document.createElement("ul");
        const dots = [];

        dotWrapper.classList.add("dot-wrapper");

        for (let i = 0; i < data.length; i++) {
          const dot = document.createElement("li");
          dot.setAttribute("data-dot", i + 1);
          dot.classList.add("dot-wrapper__dots");
          dotWrapper.append(dot);
          if (i == 0) {
            dot.style.opacity = "1";
          }
          dots.push(dot);
        }

        dots.forEach((dot) => {
          dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-dot");
            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            elem.style.transform = `translateX(-${offset}px)`;
            current.textContent =
              slideIndex < 10 ? `0${slideIndex}` : slideIndex;

            dots.forEach((item) => (item.style.opacity = ".5"));
            dots[slideIndex - 1].style.opacity = "1";
          });
        });

        this.parentSelector.append(dotWrapper);

        this.next.addEventListener("click", () => {
          if (offset == +width.slice(0, width.length - 2) * (data.length - 1)) {
            offset = 0;
          } else {
            offset += +width.slice(0, width.length - 2);
          }
          if (slideIndex == data.length) {
            slideIndex = 1;
          } else {
            slideIndex++;
          }
          elem.style.transform = `translateX(-${offset}px)`;
          current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
          dots.forEach((item) => (item.style.opacity = ".5"));
          dots[slideIndex - 1].style.opacity = "1";
        });
        this.prev.addEventListener("click", () => {
          if (offset < +width.slice(0, width.length - 2)) {
            offset = 0;
          }
          if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (data.length - 1);
          } else {
            offset -= +width.slice(0, width.length - 2);
          }
          if (slideIndex == 1) {
            slideIndex = data.length;
          } else {
            slideIndex--;
          }
          elem.style.transform = `translateX(-${offset}px)`;
          current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
          dots.forEach((item) => (item.style.opacity = ".5"));
          dots[slideIndex - 1].style.opacity = "1";
        });

        total.textContent = data.length < 10 ? `0${data.length}` : data.length;
        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
      });

      this.parentSelector.style.overflow = "hidden";
      elem.style.width = "500%";
      elem.style.display = "flex";
      elem.style.transition = ".5s";
      this.parentSelector.append(elem);
    }
  }

  return new slides(
    "http://localhost:3000/slides",
    slidesWrapper,
    next,
    prev,
    width,
    current,
    total
  ).render();
}


/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tab)
/* harmony export */ });
function tab() {
  // tab
  const tabParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent");

  const hideTabContent = () => {
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
  };
  const showTabContent = (idx = 0) => {
    tabContent[idx].classList.remove("hide");
    tabContent[idx].classList.add("show", "fade");
    tabs[idx].classList.add("tabheader__item_active");
  };
  hideTabContent();
  showTabContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });
}


/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
function timer() {
  //timer
  const deadLine = "2022-12-12";

  const getTimeRemaining = (endTime) => {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endTime) - Date.parse(new Date());
    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / (1000 * 60)) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  };

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setClock = (selector, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock(".timer", deadLine);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/loader */ "./src/modules/loader.js");
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tab */ "./src/modules/tab.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_planMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/planMenu */ "./src/modules/planMenu.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./src/modules/form.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./src/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/modules/slider.js");








window.addEventListener("DOMContentLoaded", () => {
  //loader
  (0,_modules_loader__WEBPACK_IMPORTED_MODULE_0__["default"])();

  //tab
  (0,_modules_tab__WEBPACK_IMPORTED_MODULE_1__["default"])();

  //modal
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();

  //planMenu
  (0,_modules_planMenu__WEBPACK_IMPORTED_MODULE_3__["default"])();

  //form
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])();

  //timer
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])();

  //slider
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map