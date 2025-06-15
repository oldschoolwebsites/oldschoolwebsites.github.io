'use strict';

(function(){
    document.querySelector('#forecast').className+='loading';
    
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; 
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var forecast_req = function(url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
               // Success!
               var data = JSON.parse(request.responseText);
               for (var i = 0; i < data.list.length; i++) { 
                   document.querySelectorAll('.description')[i].innerHTML=data.list[i].weather[0].description;
                   var forecast_date = new Date(parseInt(data.list[i].dt)*1000);
                   var day = days[forecast_date.getDay()];
                   var date = forecast_date.getDate();
                   var month = months[forecast_date.getMonth()];
                   var year = forecast_date.getFullYear();
                   document.querySelectorAll('.date')[i].innerHTML= day+', '+date+' '+month+' '+year;

                   var icon = "http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png";
                   document.querySelectorAll('.description')[i].insertAdjacentHTML('afterbegin', '<img src="'+icon+'" />');

                   document.querySelector('#forecast').removeAttribute("class");
               }
            } else {
                    // We reached our target server, but it returned an error
               }
            };

            request.onerror = function() {
            // There was a connection error of some sort
            };
            request.send();
    }
    if ("geolocation" in navigator) {
    /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(position) {
            var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&cnt=4&appid=6816dec999847262afb0732cfbbe708f';
            forecast_req(url);

        });
    } else {
  /* geolocation IS NOT available */
            var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=34.9&lon=14.5&cnt=4&appid=6816dec999847262afb0732cfbbe708f';
            forecast_req(url);
    }

}());
