export default class Block {
    constructor(data, game) {
      this.x = data[0];
      this.y = data[1];
      this.w = data[2];
      this.h = data[3];
      this.is_key = data[4];
      this.class = (this.w > this.h)?"hor":"vert";
      this.cell = $('<div class="block ' + this.class + ' ' + ((this.is_key == 1)?"key":"") + ' ' + (((this.w == 3) || (this.h == 3))?"long":"") + '"></div>');
      this.cell.css("top", (this.y * 10 + 0.25) + "vw");
      this.cell.css("left", (this.x * 10 + 0.25) + "vw");
      this.cell.css("width", this.w * 9.5 + "vw");
      this.cell.css("height", this.h * 9.5 + "vw");
    }
    render() {
      return this.cell;
    }
  }