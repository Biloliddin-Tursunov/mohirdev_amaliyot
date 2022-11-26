export default function loader(loaderSelector) {
  //loader
  setTimeout(() => {
    loader = document.querySelector(loaderSelector);
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    });
  }, 2000);
}
