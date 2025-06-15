'use strict';
(function(){
  var defaultDuration = 2000;
  var edgeOffset = 30;
  var forecast = document.getElementById("forecast");
  var Scroller = zenscroll.createScroller(forecast, defaultDuration, edgeOffset);

  var Carousel = {
        mq: window.matchMedia( "(min-width: 1200px)" ),
        counter: 0,
        anchor_list: ['#day_1','#day_2','#day_3','#day_4'],
        start: function () {
            var self = this;
            this.interval = setInterval(function(){
            if(self.mq.matches) {
                Scroller.center(document.querySelector(self.anchor_list[self.counter]), defaultDuration);
                self.counter++;
               if(self.counter ===4) {
                   self.counter=0;
               }
            }
        }, 5000);
      },

      pause: function () {
        clearInterval(this.interval);
        delete this.interval;
      },

      resume: function () {
        if (!this.interval) this.start();
      }
};

Carousel.start();
    document.querySelector('#forecast').addEventListener("mouseover", function(){Carousel.pause();});
    document.querySelector('#forecast').addEventListener("mouseleave", function(){ Carousel.resume()});

}());

