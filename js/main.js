import Game from './Model/Game.js';
let game = null;

$('body').on('mousedown', ".block", function(e){
    game.select(this, e);
});

$('body').on('mouseup', "*", function(){
    game.cancel();
});

$('body').on('mousemove', "*", function(e){
    game.move(e);
});
$('body').on('mousedown', ".block", function(e){
    game.select(this, e);
});

$('body').on('mouseup', "*", function(){
    game.cancel();
});

$('body').on('mousemove', "*", function(e){
    game.move(e);
});

$('body').on("touchend", "*", function(){
    game.cancel();
});

$('body').on("touchcancel", "*", function(){
    game.cancel();
});
$('body').on("touchmove", "*", function(e){
    game.move(e.originalEvent.touches[0]);
});

$('body').on('touchstart', ".block", function(e){
    game.select(this, e.originalEvent.touches[0]);
});

$('body').on('click', ".start", function(e){
    if (game != null) {
        game.stop_timer();
    }
    game = new Game(6, 6);
    game.start_timer();
});
console.log(window);
console.log(window.Telegram);
console.log(window.Telegram.WebApp);
window.Telegram.WebApp.disableVerticalSwipes();


