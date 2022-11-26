export default function loader() {
  //loader
  setTimeout(() => {
    loader = document.querySelector(".loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    });
  }, 1000);
}
