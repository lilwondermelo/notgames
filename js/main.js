import Game from './Model/Game.js';
let game = null;

$('body').on('mousedown', ".block", function(e){
    e.stopPropagation();
    game.select(this, e);
});

$('body').on('mouseup', "*", function(){
    e.stopPropagation();
    game.cancel();
});

$('body').on('mousemove', "*", function(e){
    e.stopPropagation();
    game.move(e);
});
$('body').on('mousedown', ".block", function(e){
    e.stopPropagation();
    game.select(this, e);
});

$('body').on('mouseup', "*", function(){
    e.stopPropagation();
    game.cancel();
});

$('body').on('mousemove', "*", function(e){
    e.stopPropagation();
    game.move(e);
});

$('body').on("touchend", "*", function(){
    e.stopPropagation();
    game.cancel();
});

$('body').on("touchcancel", "*", function(){
    e.stopPropagation();
    game.cancel();
});
$('body').on("touchmove", "*", function(e){
    e.stopPropagation();
    game.move(e.originalEvent.touches[0]);
});

$('body').on('touchstart', ".block", function(e){
    e.stopPropagation();
    game.select(this, e.originalEvent.touches[0]);
});

$('body').on('click', ".start", function(e){
    e.stopPropagation();
    if (game != null) {
        game.stop_timer();
    }
    game = new Game(6, 6);
    game.start_timer();
});
window.Telegram.WebApp.disableVerticalSwipes();


// Prevent windwo.scrollY from becoming zero
function preventCollapse(event) {
    if (window.scrollY === 0) {
      window.scrollTo(0, 1);
    }
  } 
  
  // Attach the above function to the touchstart event handler of the scrollable element
  const scrollableElement = document.querySelector('body');
  scrollableElement.addEventListener("touchstart", preventCollapse);


