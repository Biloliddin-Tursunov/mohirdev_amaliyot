import axios from "axios";

export default function form(formSelector) {
  //form
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    bindPostForm(form);
  });

  const msg = {
    loading: "LOADING",
    succsess: "SUCCESS",
    error: "ERROR",
  };

  async function postData(url, json) {
    const res = await axios.post(url, json);
    return await res;
  }

  function bindPostForm(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // showThanksModal(msg.loading);

      const formData = new FormData(form);

      let obj = {};

      formData.forEach((val, key) => {
        obj[key] = val;
      });

      postData("http://localhost:3000/formData", obj)
        .then(({ data }) => {
          showThanksModal(msg.succsess);
        })
        .catch((err) => {
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
