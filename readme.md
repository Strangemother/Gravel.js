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
	<script type="text/javascript" src='jquery.gReveal.js'></script>

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

## Using the plugin.

To get started you can do the simplest:

HTML:

	<div id='simple'>This is some basic text information.</div>

JS:

	$('#simple').gReveal()

You can add options to your simple popup such as a title

	$('#simple').gReveal('My Title')

If you have a h2.title element within your content, you can use that as the title

HTML:

	<div class="optionsPopup">
		<h2 class="title">Options</h2>
		This is some information Gravel will use to present a popup.
	</div>

JS:

	$('#simple').gReveal()
	// or
	// $('#simple').gReveal('My title')

You'll notice the h2.title is stripped and used as a title. You can still pass a custom title;
# Readme!