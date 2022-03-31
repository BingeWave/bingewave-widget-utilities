let namespace = BWProperties.namespace;

let event_id = BWProperties.event_id;

function displayWhenBroadcasting() {
 	$(`#${namespace}_start_broadcasting`).hide();
  	$(`#${namespace}_stop_broadcasting`).show();
}

function displayWhenNotBroadcasting() {
   	$(`#${namespace}_start_broadcasting`).show();
  	$(`#${namespace}_stop_broadcasting`).hide();
}

if(BWProperties.is_broadcasting == 1){
  	displayWhenBroadcasting();
} else {
  	displayWhenNotBroadcasting();
}

function startBroadcasting() {
  	
  	BWAPI.post(`/events/${event_id}/startBroadcasting`);
  
}

function stopBroadcasting() {
  	
  	BWAPI.post(`/events/${event_id}/stopBroadcasting`);
  
}

this.startBroadcasting = startBroadcasting;

this.stopBroadcasting = stopBroadcasting;

BWEvents.subscribe('broadcasting_started', `${namespace}_listener_1`, function(response){
  	displayWhenBroadcasting();
});

BWEvents.subscribe('broadcasting_error', `${namespace}_listener_1`, function(response){
  	displayWhenNotBroadcasting();
});

BWEvents.subscribe('broadcasting_stopped', `${namespace}_listener_1`, function(response){
  	displayWhenNotBroadcasting();
});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 