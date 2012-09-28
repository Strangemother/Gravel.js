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
	} else {
		// if ia is just a value
		if(_a[ia]) v = _a[ia];
	}

	if( (v == null) && (def != undefined) ) {
		v = def
	}

	if(returnArray){
		return [v, ia[i]]
	}
	else {
		return v
	}

}
/*
Gravel is a google style popup designed to
look a lot like a Google style popup.
 */
GRAVEL_DEFAULTS = {
		onComplete: function(){ console.log('complete') },

		/*
		The name used for the data object.
		 */
		dataName: 'gravel',
		/*
		The default title for the popup. This can be overridden

		 */
		title: 'ooh HAI!',
		/*
		Default data for the popup
		 */
		text: 'This popup is on Gravel',
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
		classes: 'reveal-modal gravel-popup',

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

		/* The selector for jQuery wrapped objects; gravel will
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
   			    '<span class="user-defined-buttons">%(buttons)s</span>' +
			  '</div>' +
			'</div>',
		/*
		Default buttons to apply.
		 */
		buttons: []
	};

(function($){

	var opts = null
	//Defaults:


	function _getDefs() {
		var parent = arg(arguments, 0, GRAVEL_DEFAULTS);
		var el = arg(arguments, 1, null)
		if(!parent) return null;

		if(parent.opts) {
			return parent.opts[el] || parent.opts
		}

		return parent[el] || parent
	}

	//no desc
	function Gravel(el, options) {
		this.defaults = GRAVEL_DEFAULTS
		//Extending options:
		this.opts = $.extend({}, this.defaults, options);
		this.element = el;

	}

	// Separate functionality from object creation
	Gravel.prototype = {

		init: function() {
			var _this = this;
			var o = _this.opts = arg(arguments, 0, {})

			// this.buttons = []
			//console.log('Gravel init', arguments)
			_this._buttons = this.opts.buttons || []

			this._title = o.title || _this._title;
			this.onClose = o.onClose || this.onClose;
			this.onOpen = o.onOpen || this.onOpen;

			return _this
		},

		getDefs: function(){
			var el = arg(arguments, 0, null)
			return _getDefs(this, el)
		},

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
		// pass a name or id to receive a single button
		buttons: function(){
			which = arg(arguments, 0, null)

			if(which) {
				for (var i = 0; i < this._buttons.length; i++) {
					var _but = this._buttons[i];
					if(_but.id() == which || _but.text() == which || _but.value == which || _but == which) {
						return _but
					}
				};

				return null;
			}

			return this._buttons
			// render Buttons
		},


		// Append a button to the collection and ready for render by normalizing
		// string inputs.
		addButtons: function(){
			var button = arg(arguments, 0, null)

			if( button instanceof Array ) {
				for (var i = 0; i < button.length; i++) {
					var _button = button[i];
					this.addButton(_button)
				};
			}else {
				this.addButton(button)
			}
		},

		_getValue: function() {
			for (var i = 0; i < arguments.length; i++) {
				var item = arguments[i];

				if(item != undefined && (item != null) ) {
					if(item instanceof Function){
						var val = item();
						if(typeof(val) == 'string'){
							return val;
						};
					}else if(typeof(item) == 'string') {
						return item;
					}
				}
			};
			return item
		},

		//returns a PopupButton
		addButton: function(){
			var button = arg(arguments, 0, null)
			var action = arg(arguments, 1, null)
			var _color = arg(arguments, 2, null)
			var _button = button;

			debugger;

			if(button){

				var to = typeof(button)

				var func = action || button.func || button.click || button.press || button.onClick || button.onTouch || button.action || function(){
							console.log(button + ' has no function mapping.');
							this.close();
						}

				if(to == 'string') {
					// create buttons
					_button = popButton(button, func);
					this._buttons.push(_button)

				}else if(to == 'object') {
					if(button == PopupButton) {
						// add it
						this._buttons.push(button);
						_button = button
					} else {
						// Just some sort of object. Map it anyway

						var text = this._getValue( button.text, button.value, button.name, button.id, null);
						_color = this._getValue(_color, button.color, button.background, button.type, null);
						var action = button.func || button.action || button.value || button.name || button.type || func
						var id = button.id || 'gravel_' + button.name || 'gravel_' + button.value || 'noid';
						_button = popButton(text, func, _color, id, action)
						this._buttons.push(_button)
					}
				}
			}

			_button.parent = this

			if( $(this[0]).data('visible') ) {
				// display button
				var el = $(this[0]).find('.' + this.getDefs().toolsClasses)
				// Here error Popup cannot activate :633
				el.append(_button.render());
			};

			if($(this[0]).data('visible')){
				_button.active($(this[0]).find('.buttons').find('#' + button._id)[0])
			};
			// return _button;
			return this
		},

		// Use the provided buttons and render the tools section.
		// If this.buttons.length <= 0, tools bar will hide
		renderButtons: function(){
			this._buttons = arg(arguments, 0, this._buttons)

			return this;
		},


		activateHandlers: function(){
			for (var i = 0; i < this._buttons.length; i++) {
				var button = this._buttons[i];
				// pass the element to the button.
				button.parent = this

				button.active($(this[0]).find('.buttons').find('#' + button._id)[0])
			};
		},

		// function to apply when the popup has finished its open
		// animation
		openHandler: function(){
			this.onOpen()
		},

		//public closeHandler:
		onClose: function() {
			console.log("popup has closed")
		},

		onOpen: function(){
			console.log("Popup has opened")
		},

		_closeHandler: function(){
			// remove buttons

			// remove handlers
			$(this[0]).unbind()
			// remove html
			$(this[0]).remove()
			delete this[0]
			delete this.element;

			for (var i = 0; i < this.buttons.length; i++) {
				var button = this.buttons[i];
				button[0].unbind()
				delete button[0];
				delete button._handlers;

			};

			this.onClose()
		},

		// apply and or return the HTML used as a template.
		html: function(){

			this.getDefs().buttons = '';
			for (var i = 0; i < this._buttons.length; i++) {
				var button = this._buttons[i];
				var render = button.render()
				this.getDefs().buttons += render;
				// give an id to use so this element can be
				// used later.
				//
				console.log(button, render)
			};

			var _html = arg(arguments, 0, this.getDefs().html)
			return _html;
		},

		id: function(){
			//debugger;
			var _id = arg(arguments, 0, this.getDefs().id);
			if(_id != this.getDefs().id) {
				$('#' + this.getDefs().id).attr('id', _id)
				this.getDefs().id= _id;
			}
			return this.getDefs().id;
		},
		// Get return the title. This will also actively set the
		// current popup's title.
		title: function(){
			var _title = arg(arguments, 0, null);

			if(_title) {
				// save title if passed.
				this._title = _title

				// set the data
				this[0].find(this.getDefs().titleObject).html(_title)

				// return the parent object
				return this
			}else {
				_title = this._title;
				// title has never been set.
				if(_title == undefined) {
					_title = this[0].find(this.getDefs().titleObject).html()

				}
			}

			// apply and return the title
			var seto = this[0].find(this.getDefs().titleObject).html(_title)
			return seto.html()

		},

		// Set return the main information from the popup.
		text: function(){
			var _text = arg(arguments, 0, null);
			if(_text) {
				this._text = _text;
			} else {
				_text = this._text;
				if(_text == undefined) {
					_text = this[0].find(this.getDefs().textObject).html()
				}
			}

			return this[0].find(this.getDefs().textObject).html(_text).html()
		},

		renderedHtml: function(){
			return sprintf(this.html(), this.getDefs());
		}
	};


	// --------------------------------------------------------------------------------------------------------------------------------------The actual plugin
	$.fn.gravel = function(options) {

		// set default values.
		var title, text;

		var defaults = GRAVEL_DEFAULTS;

		var _buts = arg(arguments, 2, defaults.buttons);
		var html = arg(arguments, 3, defaults.html);

		debugger;

		// Flag to determine if a jquery object exists.
		var _wrapped = true
		var perform = true;

		if(this.length <= 0) {	perform = false; }

		if(!options) {
			// The popup has been applied using defaults.
			// (probably wrapping an element to use
			// as popup data.
			options = []
		}

		if(this.length == 0) {
			if(options[0] == 'gravel') {

				//use custom HTML
				//console.log("Custom button")
				perform = true
				_wrapped = false
				// map the passed arguments to the options
				options = options[1]
			}
		}else if(this.length == 1 && typeof(options) == 'string') {
			// options need to be an array
			options = [options]
		}else if(typeof(options) == 'object') {
			// jquery wrapped element with a title in the options.
			perform = true;
			// Passed title, plucked title, default title
			title = options.title || $(this).find(options.titleObject).html() || defaults.title;
			text = options.text || text;
		}


		var els = []
		if(perform == true && this.length == 0) {
			// give HTML if this is not jQuery wrapped.
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



				var rev = new Gravel(this, options);


				// if wrapped - attempt a title from the entity
				if(_wrapped) {
					// if the title is still defaulted.
					if(title == rev.getDefs().title) {
						_title = $(this).find(rev.getDefs().titleObject).html() || title;
						if(_title != title) { title = _title; };
					}

					text = $(this)[0].outerHTML;
				}

				// perform the reveal
				rev.init(options);

				rev.getDefs().title = title;
				rev.getDefs().text = text;


				if($('#' + rev.getDefs().id).length > 0) {
					// remove old html
					// add new HTML
					$('#' + rev.getDefs().id).remove()
				}

				// Append this popup to the html


				if(_buts.length <= 0) {
					$('#' + rev.getDefs().id + ' .' + rev.getDefs().toolsClasses).hide()
				} else {
					for (var i = 0; i < _buts.length; i++) {
						var button = _buts[i]
						rev.addButton(button)
					};
				}

				var html = rev.renderedHtml();
				$('body').append(html)
				//$('#' + defaults.id).hide()
				rev[0] = $('#' + rev.getDefs().id)

				$(rev[0]).bind('reveal:lock', function(e){
					//rev.openHandler(e)
				})

				// open  action shim.
				$(rev[0]).bind('reveal:unlock', function(e){
					// activate the open handler
					rev.openHandler(e)
					// Remove this redundant handler to clear memory
					$(rev[0]).unbind('reveal:unlock');
					// activate the handlers
					rev.activateHandlers()
				})

				rev[0].reveal({
					animation: 'fadeAndPop', // fade, fadeAndPop, none
					animationSpeed: 300,
					closeonbackgroundclick: true
				});

				// Close action. Re-apply the unlock feature.
				$(rev[0]).bind('reveal:unlock', function(e){
					rev._closeHandler(e);
				})

				rev[0].data('visible', true)
				rev[0].data(rev.getDefs().dataName, rev);

				//
				$('#' + rev.getDefs().id + ' .' + rev.getDefs().textClasses + ' ' + rev.getDefs().titleObject).hide();

				revs.push(rev)
			});

		return revs
		}
	};

	$.fn.gravel.prototype.defaults = GRAVEL_DEFAULTS;

	$.fn.gravel.prototype.getDefs = function(){
		return _getDefs();
	}

	// hotwire for an easy popup wrapper
	gravel = function(){

		jQuery.fn.gravel([
							'gravel',
							arguments
						])

		var d = jQuery('#' + jQuery.fn.gravel.prototype.getDefs().id)
				.data(jQuery.fn.gravel.prototype.getDefs().dataName)
		return d;
	}

})(jQuery);


// --------------------------------------------




/*
	Examples.
	$(['message']).gravel()
	$(['title', 'message']).gravel()
	$(['title', 'message', buttonsArray ]).gravel()
	$(['title', 'message', button, button, button ]).gravel()
	$('.popupTemplate').gravel()
	$('.popupTemplate').gravel('title')
	$('.popupTemplate').gravel(['title'])
	$('.popupTemplate').gravel(['message', 'title'])
	$('.popupTemplate').gravel(['message', 'title', buttonsArray])
	# $('.popupTemplate').gravel(['message', 'title', button, button, button])
 */
