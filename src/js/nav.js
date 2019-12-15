(function() {
  let button = document.querySelector(".toggle-menu");
  let menu = document.querySelector(".nav-collapse");
  let overlay = document.querySelector(".sidenav-overlay");

  button.addEventListener("click", event => {
    event.preventDefault();
    menu.style.transform = "translateX(0)";
    overlay.style.display = "block";
    overlay.style.opacity = "1";
  });

  overlay.addEventListener("click", event => {
    event.preventDefault();
    menu.style.transform = "translateX(105%)";
    overlay.style.display = "none";
    overlay.style.opacity = "0";
  });

  menu.addEventListener("click", event => {
    event.preventDefault();
    menu.style.transform = "translateX(105%)";
    overlay.style.display = "none";
    overlay.style.opacity = "0";
  });
})();
