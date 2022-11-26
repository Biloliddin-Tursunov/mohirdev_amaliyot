export default function form() {
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
