$(document).ready(function() {
console.log('ready');

$.ajax({
	method:'GET',
	url:'/convos',
	success: handleSuccess,
	error: handleError
});

function handleSuccess(convo){
      convo.forEach(function(convo){
        renderConvos(convo);
      });
}


$.ajax({
	method:'GET',
	url:'/convos/:convoId/messages/',
	success: handleMsgSuccess,
	error: handleError
});

function handleMsgSuccess(msg){
      allMsgs.forEach(function(msg){
        renderMessages(allMsgs);
      });
}

$('#convoForm').on('submit', function(event){
	event.preventDefault();
	var formData = $(this).serialize();
	console.log(formData);
	this.reset();
	
	$.ajax({
		method:'POST',
		url: "/addConvo",
		data: formData,
		success: postSuccess,
		error: handleError
	});
});

 function handleError (err){
    console.log('There is an error', + err); 
  }

function renderConvos(convo){
	$('#allTheConvos').append(`
		<div class="row">
			<div class="col-lg-8">
				<span class='convo-title'><a href='/convos/${convo.convoid}/messages'>${convo.title}</a></span>
			</div>
			<div class="col-lg-4">
				<span class='convo-createdDate'>${convo.startdate}</span>
			</div>
		</div>

		`)

};
function renderMessages(msg){
	$('#allTheMessages').append(`
		<h3>${msg.convo}</h3>
		<div class="row">
			<div class="col-lg-8">
				<span class='msg-title'><a href='/convos/${msg.convo}/msg'>${msg.msgText}</a></span>
			</div>
			<div class="col-lg-4">
				<span class='msg-createdDate'>${msg.msgCreatedDate}</span>
			</div>
		</div>

		`)

};

//end
});