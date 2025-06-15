    'use strict';

(function(){
    $('#forecast').addClass('loading');

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; 
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var forecast_req_jquery = function(url) {
    $.getJSON(url, function(data){
      for (var i = 0; i < data.list.length; i++) {
        $('.description')[i].innerHTML=data.list[i].weather[0].description;
        var forecast_date = new Date(parseInt(data.list[i].dt)*1000);
        var day = days[forecast_date.getDay()];
        var date = forecast_date.getDate();
        var month = months[forecast_date.getMonth()];
        var year = forecast_date.getFullYear();
        $('.date')[i].innerHTML= day+', '+date+' '+month+' '+year;

        var icon = "https://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png";
        $('.description')[i].insertAdjacentHTML('afterbegin', '<img src="'+icon+'" />');

        $('#forecast').removeClass('loading');
      }
     });
  };
    if ("geolocation" in navigator) {
    /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(position) {
            var url = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&cnt=4&appid=6816dec999847262afb0732cfbbe708f';
            forecast_req_jquery(url);

        });
    } else {
  /* geolocation IS NOT available */
            var url = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=34.9&lon=14.5&cnt=4&appid=6816dec999847262afb0732cfbbe708f';
            forecast_req_jquery(url);
    }
}());
