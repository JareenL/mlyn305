// Apartman
const section = document.getElementsByTagName('section')[0];
const imageUrl = "img/apartman.jpg";

const img = new Image();
img.src = imageUrl;

img.onload = function () {
    const imageHeight = img.height;
    section.style.height = `${imageHeight}px`;
};

img.onerror = function () {
    section.style.height = `100vh`;
};