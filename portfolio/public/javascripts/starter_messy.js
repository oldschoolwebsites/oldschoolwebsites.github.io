var PageLayout = new Class({
	initialize: function(){
			$('articles_wrapper').setStyle('height', '170px');
			$('subpages_wrapper').setStyle('height', '338px');
			$$('.content').setStyle('display', 'none');
	}
})

var iFishEye = new Class({
	Implements: [Events, Options],
	options: {
			container: document,
			targetImageClass: ".nav_img",
			targetCaptionClass: ".nav_txt",
			dimThumb: {width:52, height:52},
			dimFocus: {width:74, height:74},
			eyeRadius: 74,
			pupilRadius: 42,
			useAxis: 'x',
			norm: "L1",
			blankPath: "../images/home.jpg",
			onEyeOver: Class.empty,
			onEyeOut: Class.empty,
			onPupilOver: Class.empty,
			onPupilOut: Class.empty
	},

	initialize: function(options) {
		this.setOptions(options);
		this.imgs = $$(this.options.targetImageClass);
		this.captions = $A($$(this.options.targetCaptionClass));

		this.imgs.each(function(obj, i) {
			obj.setStyles({
				width: this.options.dimThumb.width +"px",
				height: this.options.dimThumb.height +"px"
			});

			var src = obj.getProperty("src");
			var ext = src.substr(src.length - 3);
			if(ext == "png" && window.ie) {
				obj.setStyle("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ src +"',sizingMethod='scale')");
				obj.setProperty("src", this.options.blankPath);
			}
			this.captions[i].setOpacity(0);
		}.bind(this));

		this.options.container.addEvents({
			"mousemove": function(event) {
				event = new Event(event);
				this._nextState(event);
			}.bind(this),
    		"mouseleave": function() {
				this._initialState();
			}.bind(this)
		});
	},

	_initialState: function() {
		this.imgs.each(function(obj, i) {
			this.captions[i].setOpacity(0);
			obj.effects({duration: 300, transition: Fx.Transitions.Sine.easeInOut}).start({
				"width": [obj.getStyle("width").toInt(), this.options.dimThumb.width],
				"height": [obj.getStyle("height").toInt(), this.options.dimThumb.height]
			})
		}.bind(this))
	},
	_nextState: function(event) {
		this.imgs.each(function(obj, i) {
			var h = this._getDistance(event, obj);
			var objProperties = this._getDimensions(h);
			obj.setStyles({
				width: objProperties.width +"px",
				height: objProperties.height +"px"
			});

			if(h < this.options.eyeRadius) this.fireEvent("onEyeOver", obj, 20);
			else this.fireEvent("onEyeOut", obj, 20);
    
			if(h < this.options.pupilRadius) {
				this.captions[i].setOpacity(1);
				this.fireEvent("onPupilOver", obj, 20);
				} else {
				this.captions[i].setOpacity(0);
				this.fireEvent("onPupilOut", obj, 20);
			}
		}.bind(this));
	},
	_getDistance: function(event, obj) { 
		var objProperties = obj.getCoordinates();
		var curProperties = {
			x: event.page.x,
			y: event.page.y
		};
		objProperties.center = {
			x: (objProperties.left + (objProperties.width / 2)),
			y: (objProperties.top + (objProperties.height / 2))
		};
	
		if(this.options.useAxis.length > 1) {
			switch(this.options.norm.toUpperCase()) {
				case "L1":
					return Math.abs(curProperties.x - objProperties.center.x) + Math.abs(curProperties.y - objProperties.center.y);
					break;
				case "L2":
					return Math.round(Math.sqrt(Math.pow((curProperties.x - objProperties.center.x), 2) + Math.pow((curProperties.y - objProperties.center.y),2)));
					break;
			};
		} else {
		 	return Math.abs(curProperties[this.options.useAxis] - objProperties.center[this.options.useAxis]);
		}
	},
	_getDimensions: function(h) {
		if(h < this.options.eyeRadius) {
			var width = (((this.options.dimThumb.width - this.options.dimFocus.width) / this.options.eyeRadius) * h) + this.options.dimFocus.width;
			var height = (((this.options.dimThumb.height - this.options.dimFocus.height) / this.options.eyeRadius) * h) + this.options.dimFocus.height;
		} else {
			var width = this.options.dimThumb.width;
			var height = this.options.dimThumb.height;
		}
		return {width:width, height:height};
	}                   

});
var Navigation = new Class({ 
	Extends: iFishEye,
	initialize: function(options){
		this.parent(options);
		this.attach();
	},
	items: function(){return $(this.options.container).getElements('li');},
	attach: function(){
		this.items().each(function(item){
			item.addEvents({
				'mouseenter': function(){
					$$('div#' + item.get('id') .replace(/nav_/, '') +' .overview ul').setStyle('background-image', 'none')
						.setStyle('background-image', 'url(./Images/overview/background_hover.jpg)');
				//	alert( 'div#' + item.replace(/nav_/, '') +' ul');
				},

				'mouseleave': function(){
					$$('div#' + item.get('id') .replace(/nav_/, '') +' .overview ul').setStyle('background-image', 'url(./Images/overview/background_hover.jpg)')
						.setStyle('background-image', 'url(./Images/overview/background.jpg)');
				}
			});
		});
	}
});
var Content = new Class({
	container: $('articles_wrapper'),
	items: function(){return this.container.getChildren();},
	initialize:function(){
		this.attach();
	},
	
	attach: function(){
		this.items().addEvents({
			'mouseenter': function(){
				this.morph({
					'opacity': 1,
					'background-image': 'url(./Images/articles/article_hover.jpg)'
				});
				
				this.getParent().set('tween', {
					duration: 1000,
					transition: Fx.Transitions.Bounce.easeOut 
				}).tween('height', '345px');
			},
			'mouseleave': function(){
				this.morph({
					'opacity': 0.5,
					'background-image': 'none'
				});
				
				this.getParent().set('tween', {}).tween('height', '170px');
			}
		});
	}
})

var Tabs = new Class({
	Implements: Chain,
	container: $('subpages_wrapper'),
	tabs: function(){return this.container.getChildren();},
	initialize:function(){
		this.attach();
	},
	attach: function(){
		this.tabs().addEvents({
			'mouseenter': function(){
				this.getElement('ul').setStyle('background-image', 'none')
					.setStyle('background-image', 'url(./Images/overview/background_hover.jpg)');
						
				this.getElement('h2').setStyles({
					'background-color': '#333',
					'color': '#fff'
					});
						
			},
			
			'mouseleave': function(){
				this.getElement('ul').setStyle('background-image', 'none')
					.setStyle('background-image', 'url(./Images/overview/background.jpg)');
					
				this.getElement('h2').setStyles({
					'background-color': '#fff',
					'color': '#333'
					});
			},
		
		'click': function(){
		// very dirty needs to be changed
		var click_tween = new Fx.Morph($$(this.getAllPrevious())[0], {duration: '180'});
				
		var click_tween_1 = new Fx.Morph($$(this.getAllPrevious())[1], {duration: '180'});
		var click_tween_2 = new Fx.Morph($$(this.getAllPrevious())[2], {duration: '180'});
		var click_tween_3 = new Fx.Morph($$(this.getAllPrevious())[3], {duration: '180'});
		
				if (!status) {status = 'closed';}
				if(this.getAllPrevious().length == '4'){
					
					if(status == 'closed'){
						click_tween.start({'width': '0', 'opacity': '0'}).chain(
							function(){click_tween_1.start({'width': '0', 'opacity': '0'}).chain(
								function(){click_tween_2.start({'width': '0', 'opacity': '0'}).chain(
									function(){click_tween_3.start({'width': '0', 'opacity': '0'});} // all Previous to be display:none
								);}
							);}
						);
				
						status = 'open';
					}
					else if(status == 'open'){
						click_tween_3.start('width', '178').chain(
							function(){click_tween_2.start('width', '178').chain(
								function(){click_tween_1.start('width', '178').chain(
									function(){click_tween.start('width', '178');}
								);}
							);}
						);
						status = 'closed';
						
					}
				
				}
				
				else if(this.getAllPrevious().length == '3'){
					
					if(status == 'closed'){
						click_tween.start('width', '0').chain(
							function(){click_tween_1.start('width', '0').chain(
								function(){click_tween_2.start('width', '0');}
							);}
						);
				
						status = 'open';
					}
					else if(status == 'open'){
						click_tween_2.start('width', '178').chain(
							function(){click_tween_1.start('width', '178').chain(
								function(){click_tween.start('width', '178');}
							);}
						);
						status = 'closed';
						
					}
					
				}
				
				else if(this.getAllPrevious().length == '2'){
					
					if(status == 'closed'){
						click_tween.start('width', '0').chain(
							function(){click_tween_1.start('width', '0');}
						);
				
						status = 'open';
					}
					else if(status == 'open'){
						click_tween_1.start('width', '178').chain(
							function(){click_tween.start('width', '178');}
						);
						status = 'closed';
						
					}
					
				}
				
				else if(this.getAllPrevious().length == '1'){
					
					if(status == 'closed'){
						click_tween.start('width', '0');
				
						status = 'open';
					}
					else if(status == 'open'){
						click_tween.start('width', '178');
						
						status = 'closed';
					}
					
				}
				
				
				
				
			
					
				
			}
		// end of very dirty needs to be changed
		});
	}
	
});




// Initiaition
var layout = new PageLayout();
var nav = new Navigation({container: $('navigation')});
var content = new Content();
var tabs = new Tabs();
