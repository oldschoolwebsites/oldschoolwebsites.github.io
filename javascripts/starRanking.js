// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var StarRanking = Class.create({
	initialize: function(){
	    this.a_list = $$('div.ranking a');
	    this.a_img_list = $$('div.ranking a img');
	    this.attach_behaviour();
	},
  
	attach_behaviour: function(){
	    this.a_img_list.invoke('observe', 'mouseover', this.respondToMouseOver.bind(this));
	    this.a_img_list.invoke('observe', 'mouseout', this.respondToMouseOut.bind(this));
	},
  
	respondToMouseOver: function(event){
	    event.stop();
	    var element = event.element();
	    var parent = element.ancestors()[0];
	    var prv_sibl =  parent.previousSiblings();
	    var next_sibl =  parent.nextSiblings();
	    var with_prv_sibl =  prv_sibl.concat(parent);

	    	with_prv_sibl.each( function(el){
	      		el.childElements()[0].toggleClassName('active');
	    });
    
    	    	next_sibl.each( function(el){
      			el.childElements()[0].removeClassName('active');
    		});
  	},

  	respondToMouseOut: function(event){
     		event.stop();
      		this.a_list.concat(this.a_img_list).each(function(item){ item.removeClassName('active')});
  	}
})

var slidingBehaviour =  function(event){
  	event.stop();
  	console.log('hi');
  	var element = event.element();
  
	if (element.text == 'show'){
  		console.log(Effect.BlindDown(element.ancestors()[0].nextSiblings()[0]));
  		element.update('hide');
	}
	else if (element.text == 'hide'){
  		console.log(Effect.BlindUp(element.ancestors()[0].nextSiblings()[0]));
    		element.update('show');
	}

	if (element.text == 'write comment'){
  		console.log(Effect.BlindDown(element.ancestors()[0].nextSiblings()[0]));
  		element.update('hide it');
	}
	else if (element.text == 'hide it'){
  		console.log(Effect.BlindUp(element.ancestors()[0].nextSiblings()[0]));
    		element.update('write comment');
	}
  
}

document.observe("dom:loaded", function() { 
	var ranking = new StarRanking
	
	if($('new_comment')){$('new_comment').hide();}

	$$('h3 a').invoke('observe','click', slidingBehaviour);


});


