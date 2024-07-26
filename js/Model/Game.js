import Block from './Block.js';

export default class Game {
  container = $('.container');
  right = this.container.width(); // container width
  bot = this.container.height();
  top = 0;
  left = 0;
  timer;
  active_block = null;
  blocks = [];
  constructor(gridWidth, gridHeight) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.grid = new Array(gridWidth * gridHeight).fill(null);
    this.renderMain();
  }
  renderMain() {
    this.container.html('');
    let blocks_data = [
      [1,2,2,1,1],
      [0,0,2,1,0],
      [1,1,3,1,0],
      [0,2,1,2,0],
      [5,0,1,2,0],
      [4,1,1,3,0],
      [5,3,1,2,0],
      [1,3,1,3,0],
      [2,3,1,2,0],
      [3,4,2,1,0],
      [3,5,3,1,0],
    ];
    for (let i in blocks_data) {
      const data = blocks_data[i];
      const block = new Block(data, this);
      this.container.append(block.render());
      this.blocks.push(block);
    }
    this.container.append($('<div class="arrow"></div>'));
  } 
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  select(block, e) {
    this.moving = true;
    this.active_block = $(block);
    this.direction = (this.active_block.hasClass("hor"))?"hor":"vert";
    this.position = (this.direction == "hor")?e.pageX:e.pageY;
    
  }
  cancel() {
    this.moving = false;
  }
  move(e) {
    if (this.moving == true) {
      this.intersection();
      let position_new = (this.direction == "hor")?e.pageX:e.pageY;
      if (this.position != null) {
        let delta = position_new - this.position;
        //console.log([this.left, this.right, delta]);
        if (this.direction == "hor") {
          let left = parseInt(this.active_block.css("left"));
          if ((delta < this.right) && (delta > 0)) {
            this.active_block.css("left", (left + delta) + 'px');
            this.left += delta; 
          }
          else if ((delta < 0) && (-delta < this.left)) {
            this.active_block.css("left", (left + delta) + 'px');
            this.right -= delta;
          }
        }
        else {
          let top = parseInt(this.active_block.css("top"));
          if ((delta < this.bot) && (delta > 0)) {
            this.active_block.css("top", (top + delta) + 'px');
            this.top += delta;
          }
          else if ((delta < 0) && (-delta < this.top)) {
            this.active_block.css("top", (top + delta) + 'px');
            this.bot -= delta;
          }
          
        }
        this.position = position_new;
      }
      if (parseInt(this.container.width()) - parseInt($('.key').width()) - parseInt($('.key').css('left')) == 1) {
        this.win();
      }
    }
  }

  intersection() {
    
    let mov = this.active_block;
    this.left = parseInt(this.active_block.css('left'));
    this.right = this.container.width() - this.active_block.width() - parseInt(this.active_block.css('left'));
    this.top = parseInt(this.active_block.css('top'));
    this.bot = this.container.height() - this.active_block.height() - parseInt(this.active_block.css('top'));
    
    for (let i in this.blocks) {
      const stat = this.blocks[i].cell;
      if (!stat.is(this.active_block)) {
        let x0m = parseInt(mov.css('left'));
        let x1m = parseInt(mov.css('left')) + parseInt(mov.css('width'));
        let y0m = parseInt(mov.css('top'));
        let y1m = parseInt(mov.css('top')) + parseInt(mov.css('height'));

        let x0s = parseInt(stat.css('left'));
        let x1s = parseInt(stat.css('left')) + parseInt(stat.css('width'));
        let y0s = parseInt(stat.css('top'));
        let y1s = parseInt(stat.css('top')) + parseInt(stat.css('height'));

        if (mov.hasClass("hor")) {
            if ((x1s < x0m) && (y1m > y0s) && (y0m < y1s)) {
              this.left = Math.min(x0m - x1s, this.left);
            }
            else if ((x1m < x0s) && (y1m > y0s) && (y0m < y1s)) {
              this.right = Math.min(this.right, x0s - x1m);
            }
        }
        else if (mov.hasClass("vert")) {
          if ((y1s < y0m) && (x1m > x0s) && (x0m < x1s)) {
            this.top = Math.min(y0m - y1s, this.top);
          }
          else if ((y1m < y0s) && (x1m > x0s) && (x0m < x1s)) {
            this.bot = Math.min(this.bot, y0s - y1m);
          }
        }
      }
    }
  }
  start_timer() {
    var start = Date.now();
    this.timer = setInterval(function(self) {
        var delta = parseInt(31 - (Date.now() - start)/1000);
        $('.timer').html(delta);
        if (delta < 1) {
            self.stop_timer();
        }
    }, 1000); 
    $('.timer').addClass('active');
  }
  stop_timer() {
      $('.timer').removeClass('active');
      $('.timer').removeClass('win');
      clearInterval(this.timer);
  }
  win() {
    this.stop_timer();
    $('.timer').addClass('win');
  }
}