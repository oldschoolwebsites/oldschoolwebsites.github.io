function playSound(el,soundfile) {
    if (el.mp3) {
        if(el.mp3.paused) {
        	el.mp3.play();
        } else { 
         el.mp3.pause();
     	}
    } else {
        el.mp3 = new Audio(soundfile);
        el.mp3.play();
    }
}

var el = $('#play');

el.click(function() {
  el.toggleClass('pause');
  playSound(this, 'https://n-4-14.dcs.redcdn.pl/sc/o2/Eurozet/live/audio.livx?_=1439805850;stream.mp3');
});
