PopupButton = function(){

	var __id = '<zz><'
	var DEFAULT_COLOR = '#CCC'
	var FUNCTION = (function(){ return __id; }); // No reason!
	var self = this;

	this.init = function(){
	    var a = arguments
		this._text = arg(a, 0, 'Press');
	    this._id = 'button_' + this._text;
	    this._func = arg(a, 1, FUNCTION); //Do nothing
	    //debugger;
		this._color = arg(a, 2, null) // Sorta grey

		// The parent object (probably gravel)
		this.parent = arg(a, 3, null)

		// hooks for clicks and what not onHandlers.
		this.hooks  = {
						'click': [function(e){
							self._func(e, 'click')
						}]
					}

		if(this._color == null) {
			// Some color sensative words?
			var colorMap = {
				'cancel': 	'#800000', //	['no', 'cancel', 'false'],
				'close': 	'#800000',
				'okay': 	'#4F8335'  //	['okay', 'yes', 'ok', 'true'],
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

	   }
	   return self
	}

	this.active = function(){
		/* When the popup is called at requested for the view */
		if(this.parent) {
			var container = this.parent.opts.toolsClasses || this.parent.defaults.toolsClasses
			var _but = $(this.parent[0]).find('.' + container).find('#' + this._id)[0]
		}
		var elem = arg(arguments, 0, _but);

		if(elem && this[0] == undefined) {
			this[0] = elem;
		}

		if(this[0]){
			var _el = this
			// handler can active
			// console.log("Activate!!!", elem)

			$(elem).click(function(e){
				$(_el[0]).trigger('reveal:' + this._id)
				// activate the button click.
				console.log('click handler')
				_el.activateHandler('click')

				if(_el.func()) {
					_el.func().apply(_el)
				}
			})

		}else {
			console.error("PopupButton(" + this.text() + ").active() cannot be called until the html has been rendered by the parent")
		}

		this.colorText()
	}

	this.registerHandler = function() {
	    var a = arguments
		var name = arg(a, 0, 'click');
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

		for(var hook in this.hooks) {

			if(hook == name) {
				for(var i=0; i < this.hooks[hook].length; i++) {
					 var func = this.hooks[hook][i];

					 func.call(self, name)
				}
			}
		}

		if(this.hooks['*']) {
    		for(var i=0; i< this.hooks['*'].length; i++){
    			var func = this.hooks[hook][i].apply(self, name)
    		}
		}
	}

	this.id = function(){
	   return this._id  = arg(arguments, 0, this._id)
	}

	this.text = function(){
		this._text = arg(arguments, 0, this._text)

		$(this[0]).val(this._text)

	    if(arguments[0]) {
	    	return this
	    }

	    return this._text

	}

	this.action = function(){
	    // Map an action to this button.
	    // Currently a button as standard or:
	    // pass action('cancel') for an automated close button
	    this._action = arg(arguments, 0, this._action)

	    if(arguments[0]) {
	    	return this
	    }

	    return this._action
	}

	this.func = function(){
	    this._func = arg(arguments, 0, this._func)

	    if(arguments[0]) {
	    	return this
	    }
	    return this._func
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

	this.htmlTemplate = function(){
		var parent = arg(arguments, 0, null)
		var buttonTemplate = "<input type='button' id='%(id)s' name='%(name)s' class='mini-button %(color)s' style='background-color: %(color)s;' value='%(text)s'>"
        return buttonTemplate;
	}

	this.renderObject = function() {
		var _color = this.color();
		// color = color
		cssStyles = self.getContrastYIQ() + '_text'
		pos = self.position() + '_pos'
		return {'name': self.text(),
			'cssStyles': cssStyles,
           'id': self.id(),
           'text': self.text(),
           'color': _color,
           'position': "position_" + self.position()
           }
	}

	this.render = function(){
		// return the html of the button templated with associated
		// data.
		var parent = arg(arguments, 0, null)
		var html = arg(arguments, 1,
						sprintf(this.htmlTemplate(parent), this.renderObject())
					)
       	return html;
	}

	this.renderTo = function(){
		var parent = arg(arguments, 0, this.parent)

		// Append this button into the passed container
		var a = arguments;
		var parent = arg(a, 0, '')

		if(parent != '' && parent != null && parent != undefined) {
			var render = self.render(parent)
			$(parent).append(render)
		}

		//activate click handlers

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


	// Correct color button text.
	this.colorText = function(){
		var _color = arg(arguments, 0, this.color())
		var c = this.getContrastYIQ(_color)
		if(c == 'dark') {
			$(this[0]).addClass('dark').removeClass('light')
		}else{
			$(this[0]).addClass('light').removeClass('dark')
		}
		return this;
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
			temp = /^([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/i.exec(temp).slice(1);
		    for (var i=0;i<3;i++) hex+=temp[i]+temp[i];
		 }
		 var triplets = /^([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/i.exec(hex).slice(1);
		 return [ parseInt(triplets[0],16),
			 	parseInt(triplets[1],16),
			 	parseInt(triplets[2],16)
		 	]
	}


	this.color = function(){
		var _color = arg(arguments, 0, this._color);
		this._color = _color;

		if(arguments[0]) {
			$(this[0]).css('background-color', _color)
			this.colorText(_color)
		}

		if(arguments[0]) {
			return this
		}

		return this._color;
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
	var color = arg(a, 2, null);
	// 'button' as default - 'close' as a close popup button.
	var action = arg(a, 3, 'button');
	// Create id (allow class to do it)
	var id = null;

	var b = new PopupButton(name, func, color, id, action);
	return b;
}
