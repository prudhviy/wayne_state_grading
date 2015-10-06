// Load the fs (filesystem) module
var fs = require('fs');
var jquery = fs.readFileSync("./jquery-1.11.3.min.js").toString();


fs.readFile(process.argv[2], function (err, logData) {
  
	// If an error occurred, throwing it will
  	// display the exception and end our app.
  	if (err) throw err;

  	var html = logData.toString();
  	var jsdom = require("jsdom").jsdom;
	jsdom.env({
		html: html,
		src: [
	    	jquery
		],
		done: function(errors, window) {
	    	var $ = window.$,
	    	headers_arr = [];

	    	if($(":header").length > 0) {
		    	$(":header").each(function(i, v){
		    		if($.inArray($(v).prop("tagName"), headers_arr) == -1) {
		    			headers_arr.push($(v).prop("tagName"));
		    		}
		    	});
	    	}

	    	if($('title').length == 0) {
	    		console.log("1. title not found");
	    	}
	    	if(headers_arr.length < 3) {
	    		console.log("2. min 3 headers not found");
	    	}
	    	if($('p').length < 1) {
	    		console.log("3. min 1 para not found");
	    	}
	    	if($('ul li').length < 1) {
	    		console.log("4. min 1 ul list not found");
	    	}
	    	if($('ol li').length < 1) {
	    		console.log("5. min 1 ol list not found");
	    	}
	    	if($('strong').length < 1 || $('code').length < 1) {
	    		console.log("5. min 1 strong and code not found");
	    	}
	    	if($('a').length < 1) {
	    		console.log("6. min 1 hyperlink not found");
	    	}
	    	if($("a[href^='#']").length < 1) {
	    		console.log("7. min 1 internal hyperlink not found");
	    	}
	    	if($('hr').length < 1 && $('br').length < 1) {
	    		console.log("8. min 1 hr or br not found");
	    	}
	    	if($('abbr').length < 1) {
	    		console.log("9. min 1 abbr not found");
	    	}
	    	if($('em').length < 1 && $('small').length < 1 && $('mark').length < 1 
	    		&& $('del').length < 1 && $('ins').length < 1
	    		&& $('sub').length < 1 && $('sup').length < 1) {
	    		console.log("10. min 1 text format not found");
	    	}
	    	if($("*").contents().filter(function(){
            	return this.nodeType == 8;
	        }).length < 1) {
	    		console.log("11. min 1 html comment not found");	
	        }
	        if($('meta').length < 1) {
	    		console.log("12. min 1 meta not found");
	    	}
	    	if(!html.match(/&(?:[a-z]+|#\d+);/g)) {
	    		console.log("13. min 1 special entity not found");
	    	}
	    	if(!html.match(/rowspan/g)) {
	    		console.log("14. min 1 rowspan not found");
	    	}
	    	if(!html.match(/colspan/g)) {
	    		console.log("14. min 1 colspan not found");
	    	}
	    	if($('iframe').length < 1) {
	    		console.log("15. min 1 iframe not found");
	    	}
	  	}
	});
});


fs.readFile(process.argv[3], function (err, logData) {
  
	// If an error occurred, throwing it will
  	// display the exception and end our app.
  	if (err) throw err;

  	var html = logData.toString();
  	var jsdom = require("jsdom").jsdom;
	jsdom.env({
		html: html,
		src: [
	    	jquery
		],
		done: function(errors, window) {
	    	var $ = window.$;
	    	var text_checkbox = false;
	    	var datalist_exists = false;

	    	if($('input[type="text"]').length == 0 || (!$('input[type="text"]').attr("placeholder"))
	    		|| (!$('input[type="text"]').attr('required'))) {
	    		console.log("1. input type text is not proper");
				//console.log($('input[type="text"]').prop('required'))
	    	}
	    	if($('input[type="email"]').length == 0 || !($('input[type="email"]').attr("autocomplete"))) {
	    		console.log("2. input email not proper");
	    	}
	    	if(!html.match(/size/g)) {
	    		console.log("3. input text size missing");
	    	}
	    	if(!html.match(/maxlength/g)) {
	    		console.log("3. input text maxlength missing");
	    	}
	    	if($('input[type="reset"]').length == 0) {
	    		console.log("4. input reset missing");
	    	}
	    	if($('input[type="submit"]').length == 0) {
	    		console.log("4. input submit missing");
	    	}
	    	$('input[type="checkbox"]').each(function(i, v){
	    		if($(v).prop("checked")) {
	    			text_checkbox = true;
	    		}
	    	});
	    	if(!text_checkbox) {
	    		console.log("5. input checkbox not proper");	
	    	}
	    	if($('input[type="radio"]').length == 0) {
	    		console.log("6. input radio missing");
	    	}
	    	if($('input[type="password"]').length == 0) {
	    		console.log("7. input password missing");
	    	}
	    	if($('textarea').length == 0 || (!$('textarea').attr('wrap'))) {
	    		console.log("8. textarea is not proper");
	    	}
	    	if($('select').length == 0 || (!$('select').attr('multiple'))) {
	    		console.log("9. select is not proper");
	    	}
	    	if($('label').length < 2) {
	    		console.log("10. label is not proper");
	    	}
	    	if($('fieldset').length == 0) {
	    		console.log("11. fieldset is not proper");
	    	}
	    	if($('fieldset legend').length == 0) {
	    		console.log("12. fieldset legend is not proper");
	    	}
	    	if($('input[type="tel"]').length == 0 || (!$('input[type="tel"]').attr('pattern'))) {
	    		console.log("13. input tel is not proper");
	    		//console.log($('input[type="tel"]').attr('pattern'));
	    	}
	    	$('input').each(function(i, v){
	    		var datalist = '';
	    		if($(v).attr("list")) {
	    			datalist = $(v).attr("list");
	    			if($('#' + datalist).length > 0) {
	    				datalist_exists = true;
	    			}
	    		}
	    	});
	    	if(!datalist_exists) {
	    		console.log("14. datalist is not proper");	
	    	}
	    	if($('input[type="range"]').length == 0) {
	    		console.log("15. input range missing");
	    	}
	    	if($('input[type="number"]').length == 0) {
	    		console.log("16. input number missing");
	    	}
	    	if($('input[type="date"]').length == 0) {
	    		console.log("17. input date missing");
	    	}

	  	}
	});
});
