// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
//
var setup = function(event){
  $('welcome').hide();
  
  Event.observe($$('#welcome a')[1], 'click', function(event) {
      event.preventDefault();     
    $('welcome').toggle();
  });

  Event.observe($$('#navigation li.info')[0], 'click', function(event) {
    event.preventDefault();     
    $('welcome').toggle();
  });

}

document.observe('dom:loaded', setup);
