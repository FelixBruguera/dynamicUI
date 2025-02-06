export default class Dropdown {
    constructor() {
      this.dropdownItems = document.querySelector("ul");
      this.dropdownButton = document.querySelector("#dropdown-button");
      this.dropdownButtonTitle = document.querySelector("#dropdown-button-title");
      this.dropdownDiv = document.querySelector("#dropdown");
      this.currentSelection = "Nature"
      this.setListeners();
    }
    show() {
      this.dropdownItems.className = "visible";
      this.dropdownDiv.addEventListener("mouseleave", () => this.hide(), {
        once: true,
      });
      this.dropdownItems.addEventListener("click", (e) => this.select(e), {
        once: true,
      });
    }
  
    hide() {
      this.dropdownItems.className = "fade-out";
      this.dropdownItems.classList.add("no-opacity");
      setTimeout(() => this.dropdownItems.classList.add("hidden"), 300);
    }
    select(event) {
      if (event.target.nodeName == "BUTTON") {
        this.dropdownButtonTitle.textContent = event.target.textContent;
        this.hide();
        this.currentSelection = event.target.textContent
      }
    }
    setListeners() {
      this.dropdownButton.addEventListener("mouseover", () => this.show());
    }
  }