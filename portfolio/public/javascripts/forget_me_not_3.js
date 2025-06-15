// WHATS HERE ?
// 1 NAV EVENTS
// 2 2 SUBPAGES  EVENTS
// 3 ARTICLES SLIDERS
// 4 ARTICLES BACKGROUND SWITCHER
var Page = {
	initialize: function() {

		$('articles_wrapper').setStyle('height', '170px');
		$('subpages_wrapper').setStyle('height', '338px');
//		$$('div#' + 'q-and-a' +' div.content')[0].setStyle('width', '175');
		
	$$('div.content').setStyle('width', '0');
	$$('div.content p').setStyle('display', 'none');
	
	var myNav =	new Navigation ({
			container: $("navigation"),
			targetImageClass: ".nav_img",
			targetCaptionClass: ".nav_txt",
			useAxis: 'x',
			dimThumb: {width:52, height:52},
			dimFocus: {width:74, height:74},
			eyeRadius: 74,
			pupilRadius: 42,
			norm: "L2" 	
	});
	var menu_items =['nav_academic', 'nav_skills', 'nav_tools', 'nav_hobbies', 'nav_q-and-a'];
	var overview_items = menu_items.map(function(item){ return 'div#' + item.replace(/nav_/, '') +' ul'; });

   // 1 NAV EVENTS
	menu_items.each(function(value){ 
		var id_name = value.replace(/nav_/, '');
		var target = 'div#' + id_name +' ul'; 

		$(value).addEvents({
			'mouseenter': function(){
				$$(target).setStyle('background-image', 'url(./Images/overview/background_hover.jpg)');
				$$(target.replace(/ul/, 'h2')).setStyle('color', '#fff');
				$$(target.replace(/ul/, 'h2')).setStyle('background-color', '#333');
			},

			'mouseleave': function(){
				$$(target).setStyle('background-image', 'url(./Images/overview/background.jpg)');
				$$(target.replace(/ul/, 'h2')).setStyle('color', '#333');
				$$(target.replace(/ul/, 'h2')).setStyle('background-color', '#fff');
			}	
			
		});
	});
   // END OF NAV EVENTS

	// 2 SUBPAGES  EVENTS
	overview_items.each(function(value){
		var id_name = value.replace(/div#/, '').replace(/ ul/, '');
        
		$$('div#' + id_name +' div.content')[0].setStyles({width: '0',display: 'block'});
		$$('div#' + id_name +' div.content p')[0].setStyles({display: 'none'});
		
		$$(value).addEvents({
			'mouseenter': function(){
			$$(this).setStyle('background-image', 'url(./Images/overview/background_hover.jpg)');
					$$(value.replace(/ul/, 'h2')).setStyle('color', '#fff');
					$$(value.replace(/ul/, 'h2')).setStyle('background-color', '#333');
			},

			'mouseleave': function(){
					$$(this).setStyle('background-image', 'url(./Images/overview/background.jpg)');
					$$(value.replace(/ul/, 'h2')).setStyle('color', '#333');
					$$(value.replace(/ul/, 'h2')).setStyle('background-color', '#fff');
			},
			
			'click': function(){
			
					//alert($$('div#' + id_name +' div.content')[0].getStyle('width'));
					
		//rozwin
					if($$('div#' + id_name +' div.content')[0].getStyle('width') == '0pt') {
						$(id_name).getAllPrevious().setStyles({display: 'none'});
						$$('div#' + id_name +' div.content')[0].setStyles({marginLeft: '178px'});
							if(id_name == 'q-and-a'){
								$$('div#' + 'q-and-a')[0].setStyle('width', '898px');
							}
						
						
						$$('div#' + id_name +' div.content')[0].tween('width', 0, 718);}
		
		//zwin		
					else if($$('div#' + id_name +' div.content')[0].getStyle('width') == '718px') {
						$$('div#' + id_name +' div.content')[0].tween('width', 718, 0);
						$(id_name).getAllPrevious().setStyles({display: 'block'});
						$$('div#' + 'q-and-a')[0].setStyle('width', '179px');
					}
		//rozwin cd
					else if($$('div#' + id_name +' div.content')[0].getStyle('width') == '0px'){
						$(id_name).getAllPrevious().setStyles({display: 'none'});
						$$('div#' + id_name +' div.content')[0].setStyles({marginLeft: '177px'});
							if(id_name == 'q-and-a'){
								$$('div#' + 'q-and-a')[0].setStyle('width', '898px');
							}
						
						
						$$('div#' + id_name +' div.content')[0].tween('width', 0, 718);}
			

				}
		});
	});
	//END OF SUBPAGES  EVENTS

	// 3 ARTICLES SLIDERS
	$('articles_wrapper').addEvents({
		'mouseenter': function(){
			// Always sets the duration of the tween to 1000 ms and a bouncing transition
			// And then tweens the height of the element
			this.set('tween', {
				duration: 1000,
				transition: Fx.Transitions.Bounce.easeOut // This could have been also 'bounce:out'
			}).tween('height', '340px');
		},
    	'mouseleave': function(){
			// Resets the tween and changes the element back to its original size
			this.set('tween', {}).tween('height', '170px');
		}
	 });
	 // END OF ARTICLES SLIDERS

  	// 4 ARTICLES BACKGROUND SWITCHER
   	var article_background_switcher = function(item){
  		item.addEvents({
  			'mouseenter': function(){
  				this.morph({
  					'opacity': 1,
  					'background-image': 'url(./Images/articles/article_hover.jpg)'
  				});
  			},
            'mouseleave': function(){
				this.morph({
					'opacity': 0.5,
					'background-image': 'none'
				});
			}
		});
	};

	article_background_switcher($('article_1').set('opacity', 1));
	article_background_switcher($('article_2').set('opacity', 0.5));
	// END OF ARTICLES BACKGROUND SWITCHER


	}
};

window.addEvent("domready", Page.initialize);

