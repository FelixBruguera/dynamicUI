import credits from "/public/images/credits.json" assert {type: 'json'}

export default class ImageHandler {
    constructor(theme) {
        this.theme = theme.toLowerCase()
        this.credits = credits[this.theme]
        this.collection = this.loadTheme()
    }
    loadTheme() {
        let collection = [];
        for (let i = 1; i <= 5; i++) {
            let image = new Image()
            image.src = `./images/${this.theme}/${this.theme + i}.jpg`
            collection.push(image);
        }
        return collection;
      }
}