export default function slider() {
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
