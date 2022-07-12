const paralaxImage = document.getElementById("paralaxImage");

window.addEventListener("scroll", () => {

    let transformY = window.scrollY / 2;
    let dynamikScale = 1.2 + transformY / 3000 >= 2 ? 2 : 1.2 + transformY / 3000;
  
    paralaxImage.style.transform = `translate3d(0, ${transformY}px, 0) scale(${dynamikScale})`;
  });