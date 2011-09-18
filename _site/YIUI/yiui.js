/*
click: Link Click Handling
iUI captures all clicks on `a` elements and goes through a series of checks to
determine what to do:

1. If the link has a `href="#..."`, iUI will navigate to the panel ID specified
   after the # (no underscore).
2. If the link's ID is `backButton`, iUI will navigate to the previous screen
   (see `iui.goBack()`).
3. If the link has a `type="submit"`, iUI will find the parent `form` element,
   gather up all the input values and submit the form via AJAX (see
   `iui.showPageByHref()`).
4. If the link has a `type="cancel"`, iUI will cancel the parent `form` element
   dialog.
5. If the link has a `target="_replace"`, iUI will do an AJAX call based on the
   href of the link and replace the panel that the link is in with the contents
   of the AJAX response.
6. If the link is a native URL (see `iui.isNativeURL()`), iUI will do nothing.
7. If the link has a `target="_webapp"`, iUI will perform a normal link,
   navigating completely away from the iUI app and pointing the browser to the
   linked-to webapp instead.
8. If there is no `target` attribute, iUI will perform a normal (non-replace)
   AJAX slide (see `iui.showPageByHref()`).
*/


/* This is a port of the iui framework to use YUI */

YUI().add('yiui',
function(Y) {

    var slideSpeed = 20;
    var slideInterval = 0;
    var ajaxTimeoutVal = 30000;

    var currentPage = null;
    var currentDialog = null;
    var currentWidth = 0;
    var currentHeight = 0;
    var currentHash = location.hash;
    var hashPrefix = "#_";
    var pageHistory = [];
    var newPageCount = 0;
    var checkTimer;
    var hasOrientationEvent = false;
    var portraitVal = "portrait";
    var landscapeVal = "landscape";
    
    
    var YiUI = Y.Base.create('YiUI', Y.Base, [], {
        initializer: function() {
            Y.log('in the initializer', 'info', 'yiui');
            //
            Y.all('a').each(function(node, index){
            	Y.log(node.get('href'));
            	if(node.get('href').indexOf('#') > 0){
            		node.on('click', this._followAnchor, this)
            	}
            	
            },this);
            
            
        },
		_followAnchor: function(e){
			Y.log(e);
			e.preventDefault();
			Y.log('follow that anchor');
			var link = e.currentTarget;
			this.set('busy', true);
			link.setAttribute("selected", "true");
			// We need to check for backlinks here like in showPageID()
			// That backlink functionality needs to be in here somewhere
			this.showPage( Y.one(link.getAttribute('href')));
			//setTimeout(unselect, 500);
		},
        /*
         method: iui.showPage(page[, backwards=false])
         `showPage()` should probably be an internal function, outside callers should
         call `showPageById()` instead. `showPage()` doesn't set the busy flag because
         it is already set by the public-facing functions.

         `page` is the html element to show. If `backwards` is set to `true`, it will
         display a right-to-left animation instead of the default left-to-right.
         
         If the currently-displayed page is passed, iui will do nothing. `showPage()`
         is used for both panel-type pages and dialog-type pages (dialogs float on top
         of the panels, have a cancel button and do not participate in sliding
         animations). Panel-type pages receive blur/focus events and load/unload events,
         but dialog-type pages only receive blur/focus events.
         */
        showPage: function(page, backwards) {
			Y.log(page.getAttribute('title'));
			Y.log(Y.one('#backButton'));
			
			Y.one('#backButton').set('innerHTML', page.getAttribute('title')).setStyle('display', 'inline');
			page.setAttribute('selected', true);
			
        },
        /*
         method: iui.showPageById(pageId)
         Looks up the page element by the id and checks the internal history to
         determine if the page is on the stack -- if so, it will call `showPage()` with
         `backwards` set to `true`, reversing the direction of the animation. 
         */
        showPageById: function(pageId) {

            },
        /*
         method: iui.goBack()
         Navigates to the previous page in the history stack.
         */
        goBack: function() {

            },
        /*
         method: iui.replacePage(pageId)
         Loads a new page at the same level in the history stack. 
         Currently it will do a slide-in animation, but replaces
         the current page in the navStack.
         It should probably use a different animation (slide-up/slide-down).
         */
        replacePage: function(pageId) {

            },
        /*
         method: iui.showPageByHrefExt(href, args, method, replace, cb)
         Outside callers should use this version to do an ajax load programmatically
         from your webapp. In a future version, this will be renamed to
         `showPageByHref()` (once the old method and  all its calls are renamed).
         
         `href` is a URL string, `method` is the HTTP method (defaults to `GET`),
         `args` is an Object of key-value pairs that are used to generate the querystring,
         `replace` is an existing element that either is the panel or is a child of the
         panel that the incoming HTML will replace (if not supplied, iUI will append
         the incoming HTML to the `body`), and `cb` is a user-supplied callback function.
         */
        showPageByHrefExt: function(href, args, method, replace, cb) {

            },
        /*
         method: iui.showPageByHref(href, args, method, replace, cb)
         This one should only be used by iUI internally.  It should be renamed and
         possibly moved into the closure.
         */
        showPageByHref: function(href, args, method, replace, cb) {

            },
        /*
         method: iui.ajax(url, args, method, cb)
         Handles ajax requests and also fires a `setTimeout()` call
         to abort the request if it takes longer than 30 seconds. See `showPageByHrefExt()`
         above for a description of the various arguments (`url` is the same as `href`).
         */
        ajax: function(url, args, method, cb) {

            },
        /*
         method: iui.param(o)
         Stripped-down, simplified object-only version of a jQuery function that
         converts an object of keys/values into a URL-encoded querystring.

         really don't think I'll need this
         */
        param: function(o) {

            },
        /*
         method: iui.insertPages(frag)
         If an AJAX call (`showPageByHref()`) is made without supplying a `replace`
         element, `insertPages()` is called to insert the newly-created element
         fragment into the page DOM. Each child-node of the HTML fragment is a panel
         and if any of them are already in the DOM, they will be replaced by the
         incoming elements.
         */
        insertPages: function(frag) {

            },
        /*
         method: iui.getSelectedPage()
         Returns the panel element that is currently being viewed. Each panel must be a
         direct child of the `body` element. A panel is set as the selected panel by
         setting the `selected` attribute to `true`.
         */
        getSelectedPage: function() {

            },
        /*
         method: iui.getAllViews()
         Returns all panels -- currently requires querySelectorAll() will be fixed
         */
        getAllViews: function() {

            },
        /*
         method: iui.isNativeUrl(href)
         Determines whether the supplied URL string launches a native iPhone app (maps,
         YouTube, phone, email, etc). If so, iUI does nothing (doesn't attempt to load
         a page or slide to it) and allows the phone to handle it the click natively.
         */
        isNativeUrl: function(href)
        {
            for (var i = 0; i < iui.nativeUrlPatterns.length; i++)
            {
                if (href.match(iui.nativeUrlPatterns[i])) return true;
            }
            return false;
        },
        nativeUrlPatterns: [
        new RegExp("^http:\/\/maps.google.com\/maps\?"),
        new RegExp("^mailto:"),
        new RegExp("^tel:"),
        new RegExp("^http:\/\/www.youtube.com\/watch\\?v="),
        new RegExp("^http:\/\/www.youtube.com\/v\/"),
        new RegExp("^javascript:"),

        ]
        //skipped the hasClass, addClass, and removeClass as no node with YUI

    },
    {
        ATTRS: {
            /**
             property: busy
             This is set to `true` if a slide animation is in progress.
             */
            busy: {
                value: false
            },
            /**
             property: animOn
             Determines whether to do horizontal slide animations with CSS transitions
             (http://www.w3.org/TR/css3-2d-transforms/) where supported (defaults to
             `true`). Otherwise, manual `setInterval()` style animations are performed
             (vertical slide animations are always done manually).
             */
            animOm: {
                value: true
            },
            /*
            property: iui.ajaxErrHandler
            If defined, this user-set function will be called when an AJAX call returns
            with an HTTP status other than `200` (currently all HTTP statuses other than
            `200`, even including 200-level statuses like `201 Created`, are seen as
            errors).
            */
            ajaxErrHandler: {
                value: null
            },
            /*
            property: iui.httpHeaders
            An object defining headers to be sent with Ajax requests. This defaults to:
            
            example:
              { 'X-Requested-With': 'XMLHttpRequest' }
            */
            httpHeaders: {
                value: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            },
        }
    }
    );
    Y.iUI = YiUI;




},
'0.0.1', {
    requires: ['base', 'event', 'node','transition', 'history']
});