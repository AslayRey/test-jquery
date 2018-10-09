/*$(document).ready(function() {
	// Function to get input value.
	$("#form").on("submit", function(event) {
		event.preventDefault();
		let allValid = 0;
		var name = $(".name").val();
		var surname = $(".surname").val();
		var object = $(".object").val();
		var message = $(".message").val();

		if(name=='') {
			var input_name = "<label1><p>Enter a name</p></label1>";
			$( ".name" ).after(input_name);
		} else if(name.length > 3){
			var input_name = "<input_name><br><p>Name: " + name + "</p></input_name>";
			$( ".message_sent" ).append(input_name);
			$("label1").hide();
		} else if(name.length < 3){
			var input_name = "<label2><p>Name is too short</p></label2>";
			$( ".name" ).after(input_name);
			$("label1").hide();
			allValid++;
		}

		if(surname=='') {
			var input_surname = "<label1><p>Enter a surname</p></label1>";
			$( ".surname" ).after(input_surname);
		}else if(surname.length > 3){
			var input_surname = "<input_surname><p>Surname: " + surname + "</p></input_surname>";
			$( ".message_sent" ).append(input_surname);
			$("label1").hide();
		}else if(surname.length < 3){
			var input_surname = "<label2><p>Surname is too short</p></label2>";
			$( ".surname" ).after(input_surname);
			$("label1").hide();
			allValid++;
		}

		if(object=='') {
			var input_object = "<input_object><p>Oggetto vuoto</p></input_object>";
			$( ".message_sent" ).append(input_object);
		}else{
			var input_object = "<input_object><p>Object: " + object + "</p></input_object>";
			$( ".message_sent" ).append(input_object);
		}

		if(message=='') {
			var input_message = "<label1><p>Enter a message</p></label1>";
			$( ".message" ).after(input_message);
		}else if(message.length > 25){
			var input_message = "<input_message><p>Message: " + message + "</p></input_name>";
			$( ".message_sent" ).append(input_message);
			$("label1").hide();
		}else if(message.length < 25){
			var input_message = "<label2><p>Message is too short</p></label2>";
			$( ".message" ).after(input_message);
			$("label1").hide();
			allValid++;
		}
		if (allValid == 0) {
			$("#form").addClass("hide");
			$(".message_sent").removeClass("hide");
		}
		if (allValid == 0) {
			$("#form").addClass("hide");
			$(".message_sent").removeClass("hide");
		}
	});

	$( ".return" ).click(function() {
		$(".message_sent").addClass("hide");
		$("#form").removeClass("hide");
		$(".name").val("");
		$(".surname").val("");
		$(".object").val("");
		$(".message").val("");
		$("p").addClass("hide");
	});
});*/



$(document).ready(function() {
	// Function to get input value.
	$("#form").on("submit", function(event) {
		event.preventDefault();
		let allValid = 0;
		var name = $(".name").val();
		var surname = $(".surname").val();
		var object = $(".object").val();
		var message = $(".message").val();

		if(name=='') {
			var input_name = "<label1><p>Enter a name</p></label1>";
			$( ".name" ).after(input_name);
		} else if(name.length > 3){
			var input_name = "<br>" + name + " ";
			$( ".message_sent" ).append(input_name);
			$("label1").hide();
		} else if(name.length < 3){
			var input_name = "<label2><p>Name is too short</p></label2>";
			$( ".name" ).after(input_name);
			$("label1").hide();
			allValid++;
		}

		if(surname=='') {
			var input_surname = "<label1><p>Enter a surname</p></label1>";
			$( ".surname" ).after(input_surname);
		}else if(surname.length > 3){
			var input_surname = surname;
			$( ".message_sent" ).append(input_surname);
			$("label1").hide();
		}else if(surname.length < 3){
			var input_surname = "<label2><p>Surname is too short</p></label2>";
			$( ".surname" ).after(input_surname);
			$("label1").hide();
			allValid++;
		}

		if(object=='') {
			var input_object = "<input_object><p>Oggetto vuoto</p></input_object>";
			$( ".message_sent" ).append(input_object);
		}else{
			var input_object = "<input_object><p>" + object + "</p></input_object>";
			$( ".message_sent" ).append(input_object);
		}

		if(message=='') {
			var input_message = "<label1><p>Enter a message</p></label1>";
			$( ".message" ).after(input_message);
		}else if(message.length > 25){
			var input_message = "<input_message><p>" + message + "</p></input_name>";
			$( ".message_sent" ).append(input_message);
			$("label1").hide();
		}else if(message.length < 25){
			var input_message = "<label2><p>Message is too short</p></label2>";
			$( ".message" ).after(input_message);
			$("label1").hide();
			allValid++;
		}
		if (allValid == 0) {
			$(".message_sent").removeClass("hide");
		}
		if($(".name").val() && $(".surname").val() !== ""){
			$(".label_name").addClass("hide");
			$(".name").addClass("hide");
			$(".label_surname").addClass("hide");
			$(".surname").addClass("hide");
		}

		var encodedMessage = {
			"id": 77,
			"name": (name + " " + surname),
			"subject": object,
			"message": message
		}
		$.ajax({
			url: "//172.16.15.200:3000/push",
			dataType: "json",
			data: {
				"message" : encodeURIComponent(JSON.stringify(encodedMessage))
			}
		});

		$.ajax({
			url: "//172.16.15.200:3000/push",
			dataType: "json",
			data: {
				"message" : encodeURIComponent(JSON.stringify(encodedMessage))
			}
		});
		$.ajax({
			url: "https://172.16.15.200:3000/pull",
			dataType: "json"
		  }).done(function( data ) {
			  console.log(getId(data));
			  handleChat(data);
		  });
		  
		  function getId(data){
			  return data.messages.length+1;
		  }
		  
		  function handleChat(data){
			  $(data.messages).each(function(i, el){
				  console.log(el);
			  })
		  }
	});
});