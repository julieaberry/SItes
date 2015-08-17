var hash = '', priceCalculator = {
	currentEstimate : 0,
	
	pages        : 0,
	layouts      : 0,
	complexity   : 0,
	complexityURL: 0,
	emails       : 0,
	recurringFee : 0,
	
	optionsLogo :  {
		selected : false,
		features : ['High Quality, Custom Logo', 'PNG, JPG & PDF Logo Source Files','PSD, SVG, EPS Logo Source Files'],
		price    : 500,
		complexityRate : 5,
		recurring : false
	},
	optionsUpload :  {
		selected : false,
		features : ['HTTP/SFTP File Uploader'],
		price    : 450,
		complexityRate : 1,
		recurring : false
	},
	optionsSearch :  {
		selected : false,
		features : ['Site-Wide Search'],
		price    : 370,
		complexityRate : 20,
		recurring : false
	},
	optionsRSS :  {
		selected : false,
		features : ['RSS / Atom Feed'],
		price    : 100,
		complexityRate : 1,
		recurring : false
	},
	optionsMobile : {
		selected : false,
		features : ['Mobile Optimization', 'CSS3 Media Queries'],
		price    : 250,
		complexityRate : 10,
		recurring : false
	},
	
	
	facebookIntegration :  {
		selected : false,
		features : ['Facebook Feed Integration'],
		price    : 100,
		complexityRate : 2,
		recurring : false
	},
	twitterIntegration :  {
		selected : false,
		features : ['Twitter Feed Integration'],
		price    : 100,
		complexityRate : 2,
		recurring : false
	},
	blogIntegration :  {
		selected : false,
		features : ['Blog Integration'],
		price    : 350,
		complexityRate : 5,
		recurring : false
	},
	youtubeIntegration :  {
		selected : false,
		features : ['Youtube Channel Integration'],
		price    : 100,
		complexityRate : 5,
		recurring : false
	},
	otherIntegration :  {
		selected : false,
		features : ['Other Social Integration'],
		price    : 100,
		complexityRate : 5,
		recurring : false
	},
	
	gallery :  {
		selected : false,
		features : ['Custom Photo Gallery'],
		price    : 400,
		complexityRate : 5,
		recurring : false
	},
	slideshow :  {
		selected : false,
		features : ['Photo Slideshow'],
		price    : 350,
		complexityRate : 5,
		recurring : false
	},
	
	photoManagement : {
		selected : false,
		features : ['Photo Gallery Management'],
		price    : 1200,
		complexityRate : 5,
		recurring : false
	},
	flickrIntegration :  {
		selected : false,
		features : ['Flickr Gallery Integration'],
		price    : 150,
		complexityRate : 2,
		recurring : false
	},
	photoIntegration :  {
		selected : false,
		features : ['Add or Change Image'],
		price    : 100,
		complexityRate : 5,
		recurring : false
	},
	userLogin :  {
		selected : false,
		features : ['Secure User Login','Secure Military-Grade Encryption','Secure Credentials Database'],
		price    : 400,
		complexityRate : 5,
		recurring : false
	},
	userProfile :  {
		selected : false,
		features : ['User Managed Profiles','Users Database'],
		price    : 1500,
		complexityRate : 5,
		recurring : false
	},
	products :  {
		selected : false,
		features : ['Product Administration','Products Database'],
		price    : 1500,
		complexityRate : 20,
		recurring : false
	},
	cms :  {
		selected : false,
		features : ['Installation of Content Management System','Content Database'],
		price    : 800,
		complexityRate : 10,
		recurring : false
	},
	comments :  {
		selected : false,
		features : ['Comments plugin'],
		price    : 350,
		complexityRate : 15,
		recurring : false
	},
	payDonations :  {
		selected : false,
		features : ['Secure Donation Processing'],
		price    : 350,
		complexityRate : 10,
		recurring : false
	},
	payBasic :  {
		selected : false,
		features : ['Basic Ecommerce Integration'],
		price    : 350,
		complexityRate : 10,
		recurring : false
	},
	payIntermediate :  {
		selected : false,
		features : ['Intermediate Ecommerce Integration'],
		price    : 550,
		complexityRate : 10,
		recurring : false
	},
	payAdvanced :  {
		selected : false,
		features : ['Advanced Payment Gateway'],
		price    : 1400,
		complexityRate : 20,
		recurring : false
	},
	payDownloadable :  {
		selected : false,
		features : ['Downloadable Media'],
		price    : 250,
		complexityRate : 10,
		recurring : false
	},
	manHosting :  {
		selected : false,
		features : ['Hosting Management and Setup'],
		price    : 240,
		complexityRate : 0,
		recurring : false
	},
	manDomain :  {
		selected : false,
		features : ['Domain Management and Setup'],
		price    : 100,
		complexityRate : 0,
		recurring : false
	},
	manEmail :  {
		selected : false,
		features : ['Email Account Management'],
		price    : 15,
		complexityRate : 20,
		recurring : true
	},
	manAdvertising :  {
		selected : false,
		features : ['Advertising Campaign Management'],
		price    : 400,
		complexityRate : 20,
		recurring : true
	},
	manHamilton :  {
		selected : false,
		features : ['Email List Management'],
		price    : 25,
		complexityRate : 0,
		recurring : true
	},
	
	
};


/*
$(window).unload(function() {
	var exdate=new Date();
    exdate.setDate(exdate.getDate()+365);
    document.cookie = 'pc=' + escape(hash) + ';path=/index.html; expires=' + exdate.toUTCString() ;
	console.log("cookie set");
});
*/


function priceCalcUpdatePrice() {
		// reset the current estimate
		priceCalculator.currentEstimate = 0;
		priceCalculator.recurringFee = 0;
		listElements = '';
		hash = 'pages=' + priceCalculator.pages + 
			'&layouts=' + priceCalculator.layouts +
			'&complexity=' + priceCalculator.complexityURL +
			'&emails=' + priceCalculator.emails + '&options=';
		
		// pages
		priceCalculator.currentEstimate += priceCalculator.pages * 450 + 
			((priceCalculator.pages * 450) * (priceCalculator.complexity * 20));
			
		if(priceCalculator.pages !== 0) 
			listElements += '<li>'+priceCalculator.pages+" page"+pluralize(priceCalculator.pages, 's')+"</li>" + 
				"<li>Optimized for SEO</li><li>HTML 5 / CSS3</li><li>Website Stats</li><li>Full Rights to Source Code</li><li>Hand Built for Performance</li>";
		
		// layouts
		priceCalculator.currentEstimate += priceCalculator.layouts * 100 + 
			((priceCalculator.layouts * 100) * (priceCalculator.complexity * 2));
		if(priceCalculator.layouts !== 0)
			listElements += '<li>'+priceCalculator.layouts+" layout"+pluralize(priceCalculator.layouts, 's')+"</li><li>Custom Images/Graphics</li>";
		
		// emails
		if(priceCalculator.emails > 0) {
			if(priceCalculator.emails <= 3) {
				priceCalculator.currentEstimate += 40;
			} else if(priceCalculator.emails <= 10) {
				priceCalculator.currentEstimate += priceCalculator.emails * 10;
			} else {
				priceCalculator.currentEstimate += 100 + ((priceCalculator.emails - 10) * 8);
			}
			listElements += '<li>'+priceCalculator.emails+" email address"+pluralize(priceCalculator.emails, 'es')+"</li>";
		}
			
		

		//

		// radio buttons
		var len = document.forms.pricecalculator.elements.length;
		
		for(i=0;i<len;i++) {
			if(document.forms.pricecalculator.elements[i].type == "checkbox" &&
				document.forms.pricecalculator.elements[i].checked == true) {
				hash += document.forms.pricecalculator.elements[i].name + '|';
				
				if(priceCalculator[document.forms.pricecalculator.elements[i].name].recurring === true) {
					priceCalculator.recurringFee += priceCalculator[document.forms.pricecalculator.elements[i].name].price;
						priceCalculator.recurringFee += priceCalculator[document.forms.pricecalculator.elements[i].name].price *
							(priceCalculator.complexity * priceCalculator[document.forms.pricecalculator.elements[i].name].complexityRate)
				} else {
					// is mobile options
					if(document.forms.pricecalculator.elements[i].name === "optionsMobile") {
					
						priceCalculator.currentEstimate += (priceCalculator["optionsMobile"].price + 
								(priceCalculator["optionsMobile"].price *
									(priceCalculator.complexity * 
										priceCalculator["optionsMobile"].complexityRate))) * 
							priceCalculator.layouts;

					} else {
						priceCalculator.currentEstimate += priceCalculator[document.forms.pricecalculator.elements[i].name].price;
						priceCalculator.currentEstimate += priceCalculator[document.forms.pricecalculator.elements[i].name].price *
							(priceCalculator.complexity * priceCalculator[document.forms.pricecalculator.elements[i].name].complexityRate)
					}
				}
				listElements += "<li>" + priceCalculator[document.forms.pricecalculator.elements[i].name].features.join("</li><li>") + "</li>"
			}
		}
		listElements = listElements == '' ? 
			'<div class="medium-text" style="text-align:center;">{{ Nothing Selected }}</div>' : listElements;
		$( "#selectedFeatures" ).html(listElements);
		$( "#currentEstimate" ).text(priceCalculator.currentEstimate === 0 ? '0.00' : Math.round(priceCalculator.currentEstimate));
		
		if(priceCalculator.recurringFee === 0) {
			$( "#recurringWrapper" ).css("display", "none");
		} else {
			$( "#recurringWrapper" ).css("display", "block");
			$( "#recurringAmt" ).text(Math.round(priceCalculator.recurringFee) + "/m");
		}
		hash = hash.substring(0, hash.length-1); // remove trailing |
		
		
		$("#marketEstimate").text(priceCalculator.currentEstimate === 0 ? '0.00' : Math.round(priceCalculator.currentEstimate * 1.8));
		
		if($("#promocode").val() !== "") { hash += '&promo=' + $("#promocode").val(); }
		
		window.location.replace(window.location.href.split('#')[0] + '#' + hash);

		
	}


$(function(){
	
	$(".tooltip").tipTip({defaultPosition : "top" });
	
	var complexityVals = [
		'<b>Personal </b><br>A simple introductory level. Simple graphics, standard styling, and basic scripting on ONE Page. ',
		'<b>Standard</b><br> Great for small startup businesses. Basic but polished design and development. EXAMPLE: One Page scrolling with Pricing Table or Images',
		'<b>Advanced</b><br> Great for the enterprising small business. When a bit more detail is required from the design. EXAMPLE: Real Estate Broker, Image Portfolio, Wedding Website',
		'<b>Deluxe</b><br> Great for intermediate businesses. Design complexity and development features are much more advanced. EXAMPLE: Add rollover buttons, smooth scrolling, hover effects',
		'<b>Professional</b><br> Great for projects that require advanced features, mid-sized eCommerce systems, or top quality graphics. EXAMPLE: E-Book Sales, Custom Theming, Craft Sales ',
		'<b>Enterprise</b><br> Exceptional quality and very complex database-driven construction.  EXAMPLE: eCommerce Catalog, A website that says WOW to a large audience'
	], complexityFooterVals = [
		'Personal',
		'Standard',
		'Advanced',
		'Deluxe',
		'Professional',
		'Enterprise'
	];
	
	priceCalculator.pages      = parseInt(getParameterByName('pages'),10);
	priceCalculator.layouts    = parseInt(getParameterByName('layouts'),10);
	priceCalculator.complexityURL = parseInt(getParameterByName('complexity'),10);
	priceCalculator.emails     = parseInt(getParameterByName('emails'),10);
	
	priceCalculator.pages = priceCalculator.pages >= 0 && priceCalculator.pages < 51 ? priceCalculator.pages : 0;
	priceCalculator.layouts = priceCalculator.layouts >= 0 && priceCalculator.layouts < 11 ? priceCalculator.layouts : 0;
	priceCalculator.complexityURL = priceCalculator.complexityURL >= 0 && priceCalculator.complexityURL < 7 ? priceCalculator.complexityURL : 0;
	priceCalculator.complexity = (priceCalculator.complexityURL * priceCalculator.complexityURL) / 110

	priceCalculator.emails = priceCalculator.emails >= 0 && priceCalculator.emails < 101 ? priceCalculator.emails : 0;


	$( "#slider-page-output" ).text(priceCalculator.pages + " page" + pluralize(priceCalculator.pages, 's'));
	$( "#slider-layout-output" ).text(priceCalculator.layouts + " layout" + pluralize(priceCalculator.layouts, 's'));
	$( "#slider-complexity-output" ).html(complexityVals[priceCalculator.complexityURL]);
	$( "#slider-complexity-output-footer" ).html('Build Complexity: <b>' + complexityFooterVals[priceCalculator.complexityURL] + '</b>');
	$( "#slider-email-output" ).text(priceCalculator.emails + " email address" + pluralize(priceCalculator.emails, 'es'));


		
		
	$( "#slider-range-number-of-pages" ).slider({
		value: priceCalculator.pages,
		min: 0,
		max: 6,
		slide: function( event, ui ) {
			priceCalculator.pages = ui.value;
			priceCalcUpdatePrice();
			$( "#slider-page-output" ).text(ui.value + " page" + pluralize(ui.value, 's'));
		}
	});
	
	$( "#slider-range-number-of-layouts" ).slider({

		value: priceCalculator.layouts,
		min: 0,
		max: 4,
		slide: function( event, ui ) {
			priceCalculator.layouts = ui.value;
			priceCalcUpdatePrice();
			$( "#slider-layout-output" ).text(ui.value + " layout" + pluralize(ui.value, 's'));
		}
	});

	
	$( "#slider-range-complexity" ).slider({
		value: priceCalculator.complexityURL,
		min: 1,
		max: 6,
		slide: function( event, ui ) {
			priceCalculator.complexity = (ui.value * ui.value) / 220;
			priceCalculator.complexityURL = ui.value;

			priceCalcUpdatePrice();
			$( "#slider-complexity-output" ).html(complexityVals[ui.value]);
			$( "#slider-complexity-output-footer" ).html('Build Complexity: <b>' + complexityFooterVals[ui.value] + '</b>');
		}
	});
	
	$( "#slider-range-email" ).slider({
		value: priceCalculator.emails,
		min: 0,
		max: 3,
		slide: function( event, ui ) {
			priceCalculator.emails = ui.value;
			priceCalcUpdatePrice();
			$( "#slider-email-output" ).text( ui.value + " email address" + pluralize(priceCalculator.emails, 'es') );
		}
	});
	
	$("input:checkbox").change(function () {
			var element = $(this).attr('name') ;
			var isChecked = $(this).is(":checked");
			if(priceCalculator[element] != undefined)  {
				priceCalculator[element].selected = isChecked;
			}
			priceCalcUpdatePrice();
	});
	
	// get the values from the URL,
	var selectedElements = getParameterByName('options').split('|');
	
	// set selected values from URL.
	for(i = 0; i < selectedElements.length; i++) {
		if(typeof document.forms.pricecalculator.elements[selectedElements[i]] !== "undefined") {
			document.forms.pricecalculator.elements[selectedElements[i]].checked = true;
		}
	}

	priceCalcUpdatePrice();
	
	$("#promocode").bind('input', function() {
		priceCalcUpdatePrice();
	});

});
function pluralize(count, plural) {
 return ( count === 1 ? '' : plural  );
}


function copyToClipboard (text) {
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}
function mailLink() {
	document.location.href = "mailto:?subject=Codestar%20Dev%20Website%20configuration&body=\n\nWebsite%20configuration%3A%20" + encodeURIComponent(window.location.href);
}

function getParameterByName(name)
{
  var regexS = "[\\#&]" + name + "=([^&]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.hash);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}