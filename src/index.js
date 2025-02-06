import Carousel from "./carousel.js"
import Dropdown from "./dropdown.js"
import ImageHandler from "./imageHandler.js"
import "./styles.css"

const drop = new Dropdown();
let images = new ImageHandler(drop.currentSelection)
let carousel = new Carousel(images);

document.querySelector("ul").addEventListener("click", (e) => {
    setTimeout(() => {
        let images = new ImageHandler(drop.currentSelection)
        carousel.changeTheme(images);
    }, 50)
})
