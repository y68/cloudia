
// $(function() 
// {
	$(document).ready(function(){

		// alert("asdasd");
		$.getJSON("http://localhost/project/robocloud/list.php", function(data)
		{
			// var str = "";
			$.each(data.items, function(i,data)
			{
				var str =  "<li class='single_item' name='"+data.name+"' url='" +  data.content_url + "' id='" + data.url + "'>";		
				// str += 	"<img src='"+ data.icon +"'/>";
				str += 	"<span class='name'>"+ data.name +"</span>";	
				str += 	"<span class='counter'>"+ data.view_counter +"</span>";
				str +=  "</li>";
				$(str).appendTo("#list_item");
				// alert(str);
			});
		});
	// return false;
		$(".single_item").live("click", function(){
            var name = $(this).attr('name');
            var url = $(this).attr('url');
            // alert(id);
            $("section#list").hide();
            $("section#download").show();

            $("body").css("background-color", "#222");

            $("#item_name").html(name);
            $("#item_url").attr('href', url);
        });
	});
// });