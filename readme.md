# Gravel - jQuery popup.

Gravel is a jQuery plugin to give you a popup. It's super lightweight and
requires very little to get it working.

##Requirements.

- jQuery 1.6.3 +

	main framework
	http://jquery.com/

- sprintf.js

	Used for templating of built in HTML
	http://www.diveintojavascript.com/projects/javascript-sprintf

- reveal.js v1.0

	! A required fork of the deprecated plugin can be found here.
	https://github.com/StrangeMother/reveal

Do the usual HTML inclusions.

	<script type="text/javascript" src='jquery.js'></script>
	<link rel="stylesheet" type="text/css" href="reveal.css">
	<script type="text/javascript" src='jquery.reveal.js'></script>
	<script type="text/javascript" src='sprintf.js'></script>
	<script type="text/javascript" src='jquery.gravel.js'></script>

##Goal of the project

I've always found making popups is boring, and I've never enjoyed using full stacks such as jQuery UI.
This lightweight modal plugin is designed to handle modal popups with defaulted options to make it automagically popup-able.

- fade background out
- be modal
- auto closable
- easily implement actions (buttons)

A lot this is handled by the wonderful plugin reveal.js thus we apply

- A close button native to the popup
- popup titles
- popup content
- a very simple clean skin (Google-esque inspired)
- a button framework for easy action mapping
- Super simple API (jQuery plugin or directly accessible)

###Using the plugin.


####Getting Started - http://jsfiddle.net/Glycerine/bjpdm/
To get started you can do the simplest:


	<div id='simple'>This is some basic text information.</div>
<div></div>
	$('#simple').gravel()

####Using a Title - http://jsfiddle.net/Glycerine/bjpdm/1/

You can add options to your simple popup such as a title.

	$('#simple').gravel('My Title')


####Auto titles - http://jsfiddle.net/Glycerine/bjpdm/2/

If you have a h2.title element within your content gravel will use this and remove it from the main content block.

	<div id="simpleTitle">
	    <h2 class="title">Another Title</h2>
	    This popup is on Gravel. Isn't it easy!
	</div>
<div></div>
	$('#simpleTitle').gravel();

####Overriding Auto Titles - http://jsfiddle.net/Glycerine/bjpdm/3/
You can override the auto title by giving another like before!:

	$('#simpleTitle').gravel('My title');


####Popup without $elector wrapping - http://jsfiddle.net/Glycerine/bjpdm/4/

You can use gravel outside the context of jquery. This eliminates the need to
wrap an existing object and allows you to push custom popups.

	gravel('My Title', 'I have something to say about this Sir!');