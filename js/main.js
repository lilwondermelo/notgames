import Game from './Model/Game.js';
let game = null;


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


const overflow = 100
document.body.style.overflowY = 'hidden'
document.body.style.marginTop = `${overflow}px`
document.body.style.height = window.innerHeight + overflow + "px"
document.body.style.paddingBottom = `${overflow}px`
window.scrollTo(0, overflow)

const app = window.Telegram.WebApp;
app.ready()
app.isClosingConfirmationEnabled = true;


