let namespace = BWProperties.namespace;

let event_id = BWProperties.event_id;

function displayWhenRecording() {
 	$(`#${namespace}_start_recording`).hide();
  	$(`#${namespace}_stop_recording`).show();
}

function displayWhenNotRecording() {
   	$(`#${namespace}_start_recording`).show();
  	$(`#${namespace}_stop_recording`).hide();
}

if(BWProperties.is_recording == 1){
  	displayWhenRecording();
} else {
  	displayWhenNotRecording();
}

function startRecroding() {
  	
  	BWAPI.post(`/events/${event_id}/startRecording`);
  
}

function stopRecroding() {
  	
  	BWAPI.post(`/events/${event_id}/stopRecording`);
  
}

this.startRecording = startRecroding;

this.stopRecording = stopRecroding;

BWEvents.subscribe('recording_started', `${namespace}_listener_1`, function(response){
  	
  	displayWhenRecording();
});

BWEvents.subscribe('recording_error', `${namespace}_listener_1`, function(response){
  
  	displayWhenNotRecording();
});

BWEvents.subscribe('recording_stopped', `${namespace}_listener_1`, function(response){

  	displayWhenNotRecording();
});
 