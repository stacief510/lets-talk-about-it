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

//onBtnClick call this & pass data-value to convoid
function showMessages(cid){
	console.log(cid);
$.ajax({
		method:'GET',
		url:'/convos/'+cid+'/messages/',
		success: handleMsgSuccess,
		error: handleError
});

	function handleMsgSuccess(msg){
		msg.forEach(function(msg){
			renderMessages(msg);
		});
	}
}
// $.ajax({
// 		method:'GET',
// 		url:'/convos/:convoId/messages/:messageId/thoughts',
// 		success: handleThoughtSuccess,
// 		error: handleError
// });

// 	function handleMsgSuccess(msg){
// 		allMsgs.forEach(function(msg){
// 			renderMessages(allMsgs);
// 		});
// 	}

// 	function handleThoughtSuccess(thoughts){

// 	}




function renderConvos(convo){	
	$('#allTheConvos').append(`
		<div class="row convoRow" data-value=${convo.convoid}>
			<div class="col-lg-6 cTitleColumn">
				<span class='convo-title'><button onClick="showMessages(${convo.convoid})" id=${convo.convoid}>${convo.title}</button></span>
			</div>
			<div class="col-lg-6 dateColumn">
				<span class='convo-createdDate'>${convo.startdate.substring(0,10)}</span>
			</div>
		</div>

		`)

};

function renderMessages(msg){
	console.log('in')
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

function handleError (err){
    console.log('There is an error', + err); 
  }
//end
});


$('#convoForm').on('submit', function(event){
	event.preventDefault();
	var formData = $(this).serialize();
	console.log(formData);
	this.reset();
	
	$.ajax({
		method:'POST',
		url: "/addConvo",
		data: formData,
		success: handleSuccess,
		error: handleError
	});

});
function handleSuccess(convo){
	convo.forEach(function(convo){
	  renderConvos(convo);
	});
}
function handleError (err){
	console.log('There is an error', + err); 
  }

function renderConvos(convo){	
$('#allTheConvos').append(`
	<div class="row convoRow" data-value=${convo.convoid}>
		<div class="col-lg-6 cTitleColumn">
			<span class='convo-title'><button onClick="showMessages(${convo.convoid})" id=${convo.convoid}>${convo.title}</button></span>
		</div>
		<div class="col-lg-6 dateColumn">
			<span class='convo-createdDate'>${convo.startdate.substring(0,10)}</span>
		</div>
	</div>

	`)
	
};