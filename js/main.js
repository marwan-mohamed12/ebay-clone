var ImgSide = document.getElementsByClassName("img-side");
var main = document.querySelector('.img-main');

for (let i = 0; i < ImgSide.length; i++) {
  ImgSide[i].addEventListener("click", function (e) {
    var ImgTarget = e.target.src; // Corrected line
    main.src = ImgTarget;
  });
}
