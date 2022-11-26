export default function modal() {
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
