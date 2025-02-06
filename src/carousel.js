
export default class Carousel{
  constructor(imageHandler) {
    this.theme = imageHandler.theme;
    this.images = imageHandler.collection;
    this.credits = imageHandler.credits;
    this.currentImage = 0;
    this.selectedImage = document.querySelector("#selected-img > img");
    this.miniatures = document.querySelectorAll(".carousel-miniature");
    this.playButton = document.querySelector("#play-button");
    this.pauseButton = document.querySelector("#pause-button");
    this.author = document.querySelector("#author")
    this.creditsLink = document.querySelector("#pic-link")
    this.setButtonsListeners()
    this.setKeysListeners();
    this.startIntervalCallback = () => this.startInterval()
    this.stopIntervalCallback = () => this.stopInterval()
    this.changeTheme(imageHandler)
  }
  stopInterval() {
    if (this.interval != undefined) {
        window.clearInterval(this.interval);
        this.pauseButton.classList.add("hidden");
        this.playButton.classList.remove("hidden");
        this.playButton.addEventListener("click", this.startIntervalCallback, { once: true });
        this.pauseButton.removeEventListener("click", this.stopIntervalCallback)
    }
  }
  startInterval() {
    this.playButton.classList.add("hidden");
    this.pauseButton.classList.remove("hidden");
    this.interval = setInterval(() => this.nextImage(), 5000);
    this.pauseButton.addEventListener("click", this.stopIntervalCallback, { once: true });
    this.playButton.removeEventListener("click", this.startIntervalCallback)
  }
  checkNextIndex() {
    if (this.currentImage == this.images.length - 1) {
      this.currentImage = -1;
    }
  }
  checkPreviousIndex() {
    if (this.currentImage == 0) {
      this.currentImage = this.images.length;
    }
  }
  nextImage() {
    this.checkNextIndex();
    this.currentImage++;
    this.changeImage(this.currentImage);
  }
  previousImage() {
    this.checkPreviousIndex();
    this.currentImage--;
    this.changeImage(this.currentImage);
  }
  setButtonsListeners() {
    document.querySelector("#next-button").addEventListener("click", () => this.nextImage());
    document.querySelector("#previous-button").addEventListener("click", () => this.previousImage());
  }
  setKeysListeners() {
    document.querySelector("body").addEventListener("keydown", (e) => {
      if (e.key == "ArrowRight") {
        this.nextImage();
      }
      if (e.key == "ArrowLeft") {
        this.previousImage();
      }
    });
  }
  changeImage(index) {
    this.currentImage = index
    this.setCredits(index)
    this.selectedImage.classList.add("change-image");
    setTimeout(() => {
      this.selectedImage.classList.remove("change-image");
      this.selectedImage.src = this.images[index].src;
      this.changeMiniature(index)
    }, 250);
  }
  changeMiniature(index) {
    let currentMiniature = document.querySelector(".selected-miniature")
    if (currentMiniature != null) { currentMiniature.classList.remove("selected-miniature") }
    document.querySelector(`img[data-miniature-id="${index}"`).classList.add("selected-miniature")
  }
  setCredits(index) {
    let credits = this.credits[index];
    this.author.textContent = credits["author"];
    this.creditsLink.href = credits["link"]
  }
  changeMiniatures() {
    this.miniatures.forEach((miniature, i) => {
        miniature.src = this.images[i].src
        miniature.addEventListener("click", () => this.changeImage(i))
        }
    )
  }
  changeTheme(imageHandler) {
    this.theme = imageHandler.theme;
    this.images = imageHandler.collection;
    this.credits = imageHandler.credits;
    this.currentImage = 0;
    this.changeImage(0)
    this.changeMiniatures()
    this.stopInterval()
    this.startIntervalCallback()
  }
}
