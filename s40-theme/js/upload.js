	$(document).ready(function(){

		$.getJSON("http://localhost/project/robocloud/upload_item.php", function(data)
		{
			var url = data.items.url;

			var input = [];

			input.push("key*" + data.items.params.key);
			input.push("AWSAccessKeyId*" + data.items.params.AWSAccessKeyId);
			input.push("acl*" + data.items.params.acl);
			input.push("success_action_redirect*" + data.items.params.success_action_redirect);
			input.push("policy*" + data.items.params.policy);
			input.push("signature*" + data.items.params.signature);

			var inputhtml;
			var name;
			var value;
			// var inputdata

			$.each(input, function(){
				// alert(this);
				var inputdata = this.split("*");
				// alert(inputdata);
				name = inputdata[0];
				value = inputdata[1];
				inputhtml += "<input type='hidden' name='"+ name +"' value='"+ value +"'>";
			});

			inputhtml += '<br/><br/><br/><input name="file" type="file"><br/><br/>';
			inputhtml += '<input type="submit" value="Upload File">';

			// alert(inputhtml);

			// var inputdata[1] = data.items.params.AWSAccessKeyId;
			// var inputdata[2] = data.items.params.key;
			// var inputdata[3] = data.items.params.policy;
			// var inputdata[4] = data.items.params.acl;
			// var inputdata[5] = data.items.params.success_action_redirect;
			// var inputdata[6] = data.items.params.acl;
			$('#upload_form').attr('action', url);
			$(inputhtml).appendTo('#upload_form');

		});

	});