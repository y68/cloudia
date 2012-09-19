



var jsonDataSource = {
		
	URL: "http://localhost/project/robocloud/list.php",

	init: function(){
		//URL, success callback, failure callback	
		// alert("sukses");	
		this.connect(this.URL, this.responseHandler, this.failureHandler);
	},

	/**
	 * Handles the response, and displays device data in web app
	 * @param json
	 */	
	responseHandler: function(json) {
		
		//For commercial applications usage of json2.js is recommended, instead of eval.
		//see https://github.com/douglascrockford/JSON-js	
		var obj = eval('(' + json + ')');
		var devices = obj.devices;
		
		var markup = "";
			
		for(i=0; i < devices.length; i++){			
			markup += this.generateHTMLMarkup(i, devices[i]);		
		}	
		document.getElementById("list_item").innerHTML = markup;
	},
	
	/**
	 * Generates HTML markup to be inserted in to Web App DOM.
	 * @index i, index of the device
	 * @param device, device object
	 */
	generateHTMLMarkup: function(i, device){
		
		var str ="";
		// <li class="single_item first">
  //               <span class="name">Manual Book.pdf</span>
  //               <span class="counter">1416</span>
  //               <!-- <span class="name">Manual Book.pdf</span> -->
  //           </li>
		str +=  "<li class='single_item' id='items_"+i+"'>";		
		str += 	"<span class='name'>"+ device['name'] +"</span>";	
		str += 	"<span class='counter'>"+ device['view_couter'] +"</span>";
		str +=  "</li>";
		return str;
	},
		
	failureHandler: function(reason){	
		document.getElementById("list_item").innerHTML = "Could not get JSON data.<br>"+ reason;
	}, 	
	  
	
	/**
	 * Retrieves a JSON resource in given URL by using XMLHttpRequest. 
	 * @param url  URL of the JSON resource to retrieve
	 * @param successCb Called, when the JSON resourece is retrieved successfully. Retreived JSON formatted data is passed as argument. 
	 * @param failCb Called, if something goes wrong. Reason in text format, is passed as argument.  
	 */

	connect: function(url, successCb, failCb) {
		
		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.open("GET", url, true);

		xmlhttp.setRequestHeader("Accept","application/json");	
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.setRequestHeader("Pragma", "no-cache");
		
		var that = this;
		xmlhttp.onreadystatechange= function() {
			
			if (xmlhttp.readyState ==  4 ){
				
				if(xmlhttp.status == 200){		
	                if (xmlhttp.responseText != null) {
	                	successCb.call(that, xmlhttp.responseText);
					}else{
						failCb.call(that, "Empty response.");
					}	
				}else{				
					failCb.call(that, "Connection failed: Status "+xmlhttp.status);
				}
			}
		};
		xmlhttp.send();
	}		
};









