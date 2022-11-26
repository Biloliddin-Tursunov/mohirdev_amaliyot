export default function tab() {
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
