// SITE js
var SITE = {
	isMobile : function(){	
		//var uagent = navigator.userAgent.toLowerCase();
		//if (uagent.search("iphone") > -1 || uagent.search("ipod") > -1){
		if( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			return true;
		}else{
			return false;
		}
	},
	//Tablet Condition
	isTablet : function(){	
		var uagent = navigator.userAgent.toLowerCase();
		//if (uagent.search("iphone") > -1 || uagent.search("ipod") > -1){
		if( /Android|iPad/i.test(navigator.userAgent) ) {
			return true;
		}else{
			return false;
		}
	},
	
	initMobileMenu: function(){
		//	The menu on the left
		jQuery('nav#mobile_menu').mmenu({
			searchfield: false,
			counters: false,
			slidingSubmenus: false
		});
	
	},
	
	//Show Form Error
	showErrorBox: function(error){
		var errorbox = '<div id="error-messages" class="error-popup mfp-hide"> <h2>Oops!</h2><ul id="error-list"></ul></div>';
		if(jQuery("#error-messages").size() == 0){
			jQuery(errorbox).appendTo("body");
		}
		jQuery("#error-list").empty().append(error);
		jQuery.magnificPopup.open({
		  items: {src: '#error-messages'},
		  type: 'inline'
		}, 0);
		return false;
	},
	
	toTitleCase: function(str) {
		 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},
	
	//Accordian
	initAccordion: function(){
		var oAccordion = jQuery('.accordion_container');
		if(oAccordion.size() > 0){
			var menu_ul = jQuery('.accordion_container > li > div.accordion_content'), menu_a  = jQuery('.accordion_container > li > a'), default_open_slide = jQuery('.accordion_container > li > div.default_open_slide');		
			menu_ul.hide();	
			default_open_slide.show();	
			menu_a.click(function(e) {
				e.preventDefault();
				if(!jQuery(this).hasClass('active')) {
					menu_a.removeClass('active');
					menu_ul.filter(':visible').slideUp('normal');
					jQuery(this).addClass('active').next().stop(true,true).slideDown('normal');
				} else {
					jQuery(this).removeClass('active');
					jQuery(this).next().stop(true,true).slideUp('normal');
				}
			});
		}
	},	
	
	equalHeight: function(el){
		if(jQuery(el).size() > 0){
			var byRow = true;
			jQuery(el).matchHeight(byRow);
		}
	},
	
	populateSelect: function(el, items) { 
		el.options.length = 0; 
		if (items.length > 0) 
			el.options[0] = new Option('Please Select', ''); 
		jQuery.each(items, function () { 
			(el.options[el.options.length] = new Option(this.name, this.value)).setAttribute("data-flid",this.flid);; 
		}); 
	},
	 
	filterByProperty: function(arr, prop, value) { 
		return jQuery.grep(arr, function (item) { return item[prop] == value }); 
	}	
	
};


var SITEForms = {
	isValidEmail: function(v){
		var filter_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter_email.test(v)==false){
			return false;
		}else{
			return true;
		}
	},
	
	isValidZip: function(v){
		var filter_zipcode =  /^(\d{5}-\d{4}|\d{5}|\d{9})$|^([a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d)$/;
		if (filter_zipcode.test(v)==false){
			return false;
		}else{
			return true;
		}
	},
	
	isValidPhone: function(v){
		var filter_phone = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
		if (filter_phone.test(v)==false){
			return false;
		}else{
			return true;
		}
	},
	
	getValue: function(fieldID){
		var value = jQuery.trim(jQuery("#"+fieldID).val());
		jQuery("#"+fieldID).val(value);
		return value;
	},
	
	contact:function(){
		var d, isOK = true, msg = "";
		d = document.frmContact;
		var name = SITEForms.getValue("contact_name");
		var email = SITEForms.getValue("contact_email");
		var phone = SITEForms.getValue("contact_phone");
		var zipcode = SITEForms.getValue("contact_zip");
			
		if(name==""){
			msg += '<li>Please enter name.</li>';
			isOK = false;
		}	
		
		if(email == ""){
			msg += "<li>Please enter email</li>";
			isOK = false;
		}else{
			if (SITEForms.isValidEmail(email)==false){
				msg += "<li>Please enter valid email</li>";
				isOK = false;
			}
		}
		
		if (SITEForms.isValidPhone(phone)==false && phone.length != 0){
			msg += "<li>Please enter valid phone</li>";
			isOK = false;
		}
		
		if(zipcode == ""){
			msg += "<li>Please enter zipcode</li>";
			isOK = false;
		}else{
			if (SITEForms.isValidZip(zipcode)==false){
				msg += "<li>Please enter valid zipcode</li>";
				isOK = false;
			}
		}

		if(isOK === false && msg.length !== 0){
			SITE.showErrorBox(msg);
			return false;
		}else if(isOK === true && msg.length === 0){
			d.submit();			
			return false;
		}
	}	
	
}      

//---------------------------------------------
jQuery(window).load(function() {	
	//equal div height on image load
	if(jQuery('.eq-parent .eq-child').size() > 0){
		jQuery('.eq-parent .eq-child').waitForImages( function() {
			SITE.equalHeight(".eq-parent .eq-child");
		});
	}
	
	if(typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
	
	SITE.initMobileMenu();
	SITE.initAccordion();
	
	jQuery('.popup-youtube').magnificPopup({         
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false
	});
	
	jQuery('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});
	
	jQuery('.popup-gallery').magnificPopup({
		delegate: 'a.gallery-thumb',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	});
	
	if(jQuery("iframe").size() > 0 && jQuery(".iframe_video").size() > 0){
		fluidvids.init({
		  selector: ['.iframe_video'], // runs querySelectorAll()
		  players: ['www.youtube.com', 'player.vimeo.com'] // players to support
		});
	}
});
// Resize header div's height
jQuery( window ).on( 'debouncedresize', function() {
	jQuery.fn.matchHeight._update();
	jQuery.fn.matchHeight._maintainScroll = true;		
	jQuery('#mobile_menu').trigger('close');			
});