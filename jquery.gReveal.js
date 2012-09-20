function arg(_a, ia, def, returnArray) {
	var v = null

	// if ia is an array, find the
	// first correct definition
	if (ia.constructor  == Array) {
		/*
		 * Each item is checked. if the
		 * item in the array is
		 * a definition within the oaet
		 * arguments or object - pass it
		 */
		for(var i=0; i<ia.length; i++) {
			if(_a[ia[i]]){

				 v = _a[ia[i]];
				break;
			}
		}
	}
	else {
		// if ia is just a value
		if(_a[ia]) v = _a[ia];
	}

	if( (v == null) && (def != undefined) ) {
		v = def
	}

	if(returnArray){
		return [v, ia[i]]
	}
	else
	{
		return v
	}

}


/*
gReveal is a google style popup designed to 
look a lot like a Google style popup.
 */

(function($){

	var opts = null
	//Defaults:
	var defaults = {
		onComplete: function(){ console.log('complete') },

		/*
		The name used for the data object.
		 */
		dataName: 'gReveal',
		/*
		The default title for the popup. This can be overridden

		 */
		title: 'Title',
		/*
		Default data for the popup
		 */
		text: 'Textual information',
		/*
		ID of the popup. This will be applied only when required. It's best
		not to rely on this for asset use.
		 */
		id: 'gStyle_popup',

		// reveal() show animation method.
		animation: 'fade',

		/*
		default classes for to the HTML object. You should use these
		for asset use.
		 */
		classes: 'reveal-modal greveal-popup',

		/*
		Class applied to the title when created.
		 */
		
		titleClasses: 'title',
		/*
		Classes applied to the main text data when the popup is created.
		 */
		textClasses: 'information',

		/*
		Classes used for the tools bar at the bottom of the popup.
		 */
		
		toolsClasses: 'buttons',

		/* The selector for jQuery wrapped objects; gReveal will
		pull this entity to use as a title (and remove the original)
		 */
		titleObject: 'h2.title',
		
		/*
		Selector for the text object.
		 */
		textObject: 'div.information',

		/*
		The method of removal for the title method within 
		jQuery wrapped elements. (Standard jQuery classes)
		 */
		titleRemovalMethod: 'hide', // remove
		
		/*
		The HTML to use as a popup template if no jQuery wrapped objects exist.
		 */
		html: '<div class="%(classes)s" id="%(id)s" data-animation="%(animation)s">' +
			  '<h2 class="%(titleClasses)s">%(title)s</h2>' +
			  '<div class="%(textClasses)s">%(text)s</div>' +
			  '<div class="%(toolsClasses)s">' +
			    '<input type="button" class="close-reveal-modal" name="cancel" value="X">' +
			  '</div>' +
			'</div>',
		/*
		Default buttons to apply.
		 */
		buttons: ['okay']
	};

	function getDefs() {
		if(opts) {
			return opts
		}
		return defaults
	}

	//no desc
	function GReveal(el, options) {
		this.defaults = defaults
		//Extending options:
		opts = this.opts = $.extend({}, this.defaults, options);

		this.element = el;

	}

	// Separate functionality from object creation
	GReveal.prototype = {

		init: function() {
			var _this = this;
			_this.opts = arg(arguments, 0, {})
			// this.buttons = []
			_this._buttons = []
			return _this
		},

		getDefs: getDefs,

		//pass a message, an optional title and options buttons and reveal a popup
		popup: function(title, text) {
			var buttons = arg(arguments, 2, [])
			var _this = this;
			return this
		},

		popupSimpleTemplate: function(){
			//$('.backup-popup-template')
			var title 	= sprintf( $(template).children('h2').text(), data);
			var text 	= sprintf( $(template).children('.data')[0].outerHTML, data);
			popup(title, text, buttonArray);

		},

		// Get and set the buttons for this popup.
		buttons: function(){
			return this._buttons = arg(arguments, 0, this._buttons)
			// render Buttons
		},


		// Append a button to the collection and ready for render by normalizing 
		// string inputs.
		addButtons: function(){
			var button = arg(arguments, 0, null)

			if( $(button).isArray() ) {
				for (var i = 0; i < button.length; i++) {
					var _button = button[i];
					this.addButton(_button)
				};
			}else {
				this.addButton(button)
			}
		},

		addButton: function(){
			var button = arg(arguments, 0, null)
			if(button){
				var to = typeof(button)
				if(to == 'string') {
					// create buttons
					_button = popButton(button, function(){
						console.log(button + ' has no function mapping.');
						debugger;
						this.close();
					});
					this._buttons.push(_button)
				}else if(to == 'object') {

					if(button == PopupButton) {
						// add it
						this._buttons.push(button);
					} else {
						// Just some sort of object. Map it anyway
						var text = button.text || button.value || button.name || button.id || null
						var func = button.func || button.click || button.press || button.onClick || button.onTouch || button.action || null
						var color = button.color || button.background || button.type || button.action || null
						var action = button.action || button.value || button.name || button.type || null
						var id = null;
						_button = popButton(text, func, color, id, action)
						this._buttons.push(_button)
					}

				}
			}
		},

		// Use the provided buttons and render the tools section.
		// If this.buttons.length <= 0, tools bar will hide
		renderButtons: function(){
			this._buttons = arg(arguments, 0, this._buttons)
			console.log('render buttons')
		},

		// apply and or return the HTML used as a template.
		html: function(){
			return arg(arguments, 0, opts.html)
		},

		id: function(){
			debugger;
			var _id = arg(arguments, 0, opts.id);
			if(_id != opts.id) {
				$('#' + opts.id).attr('id', _id)
				opts.id= _id;
			}
			return opts.id;
		},
		// Get return the title. This will also actively set the
		// current popup's title.
		title: function(){
			var _title = arg(arguments, 0, null);
			if(_title) {
				this._title = _title
			}else {
				_title = this._title;
				if(_title == undefined) {
					_title = this[0].find(opts.titleObject).html()
				}
			}

			return this[0].find(opts.titleObject).html(_title).html()
			
		},

		// Set return the main information from the popup.
		text: function(){
			debugger;
			var _text = arg(arguments, 0, null);
			if(_text) {
				this._text = _text;
			} else {
				_text = this._text;
				if(_text == undefined) {
					_text = this[0].find(opts.textObject).html()
				}
			}

			return this[0].find(opts.textObject).html(_text).html()
		},

		renderedHtml: function(){
			return sprintf(this.html(), opts);
		}
	};

	// The actual plugin
	$.fn.gReveal = function(options) {
		
		var title = 'default title';
		var text = 'default text';
		var _buttons = arg(arguments, 2, defaults.buttons);
		var html = arg(arguments, 3, defaults.html);

		var perform = true;
		if(this.length <= 0) {
			perform = false;
		}

		if(!options) {
			// The popup has been applied using defaults.
			// (probably wrapping an element to use
			// as popup data.
			options = []
		}

		if(options.length == 2 && this.length == 0) {
			if(options[0] == 'greveal') {
				//use custom HTML
				//console.log("Custom button")
				perform = true
				// map the passed arguments to the options
				options = options[1]

			}
		}else if(this.length == 1 && typeof(options) == 'string') {
			options = [options]
		}
		
		var els = []
		if(perform == true && this.length == 0) {
			els = $(defaults.html)
		}else {
			for (var i = this.length - 1; i >= 0; i--) {
				var el = this[i]; 
				els.push(el)
			};
		}

		if(perform) {
			revs = []
			$(els).each(function(i, e) {

				
				var rev = new GReveal(this, opts);

				// Do smart things with the arguments.
				switch(options.length) {
					case 0:
						// no options given
						
						// get the title (if exists)
						// from the wrapped object.
						var _title = $(this).find(opts.titleObject).html() || title
						
						if(_title != title) {
							
							title = _title;
						}

						text = $(this)[0].outerHTML;
						
						break;

					case 1:
						if(typeof(options) == 'string') {
							// just the title
							title = options
						} else {
							title = options[0]
						}
						break;

					case 2:
						title = options[0]
						text = options [1]
						break;
				}

				
				// perform the reveal
				rev.init();

				opts.title = title;
				opts.text = text;
				var html = rev.renderedHtml();

				if($('#' + opts.id).length > 0) {
					// remove old html
					// add new HTML
					$('#' + opts.id).remove()
				}

				// Append this popup to the html
				$('body').append(html)
				if(_buttons.length <= 0) {
					$('#' + opts.id + ' .' + opts.toolsClasses).hide()
				} else {
					rev.buttons(_buttons)


				}

				//$('#' + defaults.id).hide()
				rev[0] = $('#' + opts.id)
				rev[0].reveal()
				rev[0].data(opts.dataName, rev);

				$('#' + opts.id + ' .' + opts.textClasses + ' ' + opts.titleObject).hide();

				revs.push(rev)
			});

		
		return revs
		}
	};

	$.fn.gReveal.prototype.defaults = defaults;
	$.fn.gReveal.prototype.getDefs = getDefs;
})(jQuery);






// hotwire for an easy popup wrapper
greveal = function(){
	jQuery.fn.gReveal([
						'greveal', 
						arguments
					])
	var d = jQuery('#' + jQuery.fn.gReveal.prototype.getDefs().id)
			.data(jQuery.fn.gReveal.prototype.getDefs().dataName)
	return d;
}









// --------------------------------------------- 


PopupButton = function(){

	var __id = '<zz><'
	var DEFAULT_COLOR = '#CCC'
	var FUNCTION = (function(){ return __id; }); // No reason!
	var self = this;

	this.init = function(){
	    var a = arguments
		this._text = arg(a, 0, 'Press');
	    this._func = arg(a, 1, FUNCTION); //Do nothing

	    this._color = arg(a, 2, null) // Sorta grey

		if(this._color == null) {
			// Some color sensative words?
			var colorMap = {
				'cancel': 	'#800000', //	['no', 'cancel', 'false'],
				'close': 	'#800000',
				'okay': 	'blue'  //	['okay', 'yes', 'ok', 'true'],
			}
			
			for(var name in colorMap) {
				if(this._text) {
					if(name == this._text.toLowerCase()) {
						console.log('color', colorMap[name])
						this._color = colorMap[name]
					}
				}
				
				if(this._color == null) {
					this._color = '#CCC'
				}
			}
		
		    this._id 		= arg(a, 3, "button_" + this.text());
		    this._action 	= arg(a, 4, 'button')
			this._position 	= arg(a, 5, 'left') //default left
			this.handlers 	= {}
			this.hooks 		= {}
			debugger;
		   	return this;
	   }
	}

	this.getContrastYIQ = function(){
		var a = arguments;
		var color = arg(a, 0, this.color());
		var hexcolor = this.convertColor(color, 'rgb')

		var r = hexcolor[0];
		var g = hexcolor[1];
		var b = hexcolor[2];


		var yiq = ((r*299)+(g*587)+(b*114))/1000;

		return (yiq >= 128) ? 'dark' : 'light';
	}

	this.active = function(func){
		/* When the popup is called at requested for the view */
		this.registerHandler('active', func)
	}

	this.registerHandler = function() {
	    var a = arguments
		var name = arg(a, 0, '*');
		var func = arg(a, 1, null)

		if(func){
			if( !this.handlers[name]) {
				this.handlers[name] = []
			}
			this.handlers[name].append(func)
		}
	}

	this.activateHandler = function(){
	    var a = arguments

		var name = arg(a, 0, '*');

		console.log("activating handler", name)

		for(var hook in this.hooks) {
			if(hook == name) {
				for(var i=0; i<this.hooks[hook].length; i++) {
					 var func = this.hooks[hook][i].apply(self, name)
				}
			}
		}

		if(this.hooks['*']) {
    		for(var i=0; i<this.hooks['*'].length; i++){
    			var func = this.hooks[hook][i].apply(self, name)
    		}
		}
	}

	this.lightContrast = function(){
		var color = arg(a, 0, DEFAULT_COLOR);
		var contrast = this.getContrastYIQ(this.convertColor(color))

		if(contrast == 'light') {
			return true;
		}
		return false;
	}

	this.darkContrast = function(){
		return !self.lightContrast.apply(self, arguments)
	}

	this.action = function(){
	    // Map an action to this button.
	    // Currently a button as standard or:
	    // pass action('cancel') for an automated close button
	    return this._action = arg(arguments, 0, this._action)
	}

	this.convertColor = function() {
		var a = arguments;
		// Convert a color to another representation of the same color

		// Which color to use. By default it's the button color
		var color = arg(a, 0, this.color())

		// What type to return.
		// RGB,
		var returnType = arg(a, 1, 'rgb')

		if(color[0] == '#') {
			var rt = String(returnType).toLowerCase()
			if(rt == 'rgb') {
				return this.hexToRGB(color)
			}
		}
	}

	this.hexToRGB = function(hex){
		// pass a hex value a receive an array of 3 values [R, G, B]
		if (hex[0]=="#") hex=hex.substr(1);
		if (hex.length==3) {
			var temp=hex; hex='';
			temp = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(temp).slice(1);
		    for (var i=0;i<3;i++) hex+=temp[i]+temp[i];
		 }
		 var triplets = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex).slice(1);
		 return [ parseInt(triplets[0],16),
			 	parseInt(triplets[1],16),
			 	parseInt(triplets[2],16)
		 	]
	}

	this.id = function(){
	   return this._id  = arg(arguments, 0, this._id)
	}

	this.text = function(){
	    return this._text = arg(arguments, 0, this._text)
	}

	this.color= function(){
		return this._color = arg(arguments, 0, this._color)
	}

	this.func = function(){
	    return this._func = arg(arguments, 0, this._func)
	}

	this.closePopup = function() {
	    return $('.close-reveal-modal').click();
	}

	this.close = function(){
		// This is some nice sugar giving the method
		// this.close() within a button function to close
		// the popup
		this.activateHandler('close')
		this.closePopup.apply(self, arguments)
	}

	this.click = function(ev){
		/*
		 * button click handler. you can pass this directly to a
		 * click handler
		 */
        if(self.action() == 'close' || self.text() == 'close') {
            return self.closePopup()
        } else {
            return self._func(ev)
        }
	}

	this.isButton = function(){
		return true;
	}

	this.position = function() {
		// pass and/or return the positional value.
		// left / right. default == left.
		var a = arguments
		return self._position = arg(a, 0, self._position)
	}

	this.htmlTemplate = function(parent){
		console.log("htmlTemplate")
		var buttonTemplate = "<input type='button' name='%(name)s' class='mini-button %(color)s' style='background-color: %(color)s;' value='%(text)s'>"
        return buttonTemplate;
	}

	this.renderObject = function() {
		var color = this.color();
		color = color
		cssStyles = self.getContrastYIQ() + '_text'
		pos = self.position() + '_pos'
		return {'name': self.text(),
			'cssStyles': cssStyles,
           'id': self.id(),
           'text': self.text(),
           'color': color,
           'position': "position_" + self.position()
           }
	}

	this.render = function(parent){
		// return the html of the button templated with associated
		// data.
       var html = sprintf(this.htmlTemplate(parent), this.renderObject())
       return html

       sel
	}

	this.renderTo = function(){
		// Append this button into the passed container
		var a = arguments;
		var parent = arg(a, 0, '')
		if(parent != '') {
			var render = self.render(parent)
			$(parent).append(render)
		}

		//activate click handlers

	}

    return this.init.apply(this, arguments)
}

/** Help util for the class **/
/*
 * popButton(name, func, color, action)
 */
popButton = function() {
	var a = arguments;
	// Button text. E.g. 'okay'
	var name = arg(a, 0, '');
	// Method to call
	var func = arg(a, 1, function(){});
	// Button color
	var color = arg(a, 2, '#CCC');
	// 'button' as default - 'close' as a close popup button.
	var action = arg(a, 3, 'button');
	// Create id (allow class to do it)
	var id = null;

	var b = new PopupButton(name, func, color, id, action);
	return b;
}


/*
	Examples.
	$(['message']).greveal()
	$(['title', 'message']).greveal()
	$(['title', 'message', buttonsArray ]).greveal()
	$(['title', 'message', button, button, button ]).greveal()
	$('.popupTemplate').greveal()
	$('.popupTemplate').greveal('title')
	$('.popupTemplate').greveal(['title'])
	$('.popupTemplate').greveal(['message', 'title'])
	$('.popupTemplate').greveal(['message', 'title', buttonsArray])
	# $('.popupTemplate').greveal(['message', 'title', button, button, button])
 */