import axios from "axios";

export default function planMenu(parentSelector) {
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
    const res = await axios.get(url);

    return await res;
  }

  getRecource("http://localhost:3000/planMenu").then(({ data }) => {
    data.forEach(({ imgUrl, imgAlt, title, decription, price }) => {
      new PlanMenu(
        imgUrl,
        imgAlt,
        title,
        decription,
        price,
        parentSelector
      ).render();
    });
  });
}
