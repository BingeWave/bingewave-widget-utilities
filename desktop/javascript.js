let namespace = BWProperties.namespace;

let session_id = BWProperties.participant.session_id;

let event_id = BWProperties.event_id;

if (BWProperties.participant.is_desktop == 1) {
    displayWhenDesktopShowing();
} else {
    displayWhenVideoShowing();
}

function displayWhenDesktopShowing() {
  	$(`#${namespace}_${session_id}_share_desktop`).hide();
   	$(`#${namespace}_${session_id}_share_video`).show();
}
  

function displayWhenVideoShowing() {
    $(`#${namespace}_${session_id}_share_desktop`).show();
   	$(`#${namespace}_${session_id}_share_video`).hide();
}

function shareDesktop() {

    BWAPI.post(`/events/${event_id}/shareUserDesktop`, { session_id: session_id }).then(response => {

        if (response.status == 'success') {
            displayWhenDesktopShowing();
        }
    }).catch(error => {

    });
}

function shareVideo() {

    BWAPI.post(`/events/${event_id}/shareUserVideo`, { session_id: session_id }).then(response => {

        if (response.status == 'success') {
            displayWhenVideoShowing();
        }
    }).catch(error => {

    });
}

this.shareDesktop = shareDesktop;
this.shareVideo = shareVideo;

BWEvents.subscribe('user_share_desktop', `${namespace}_listener`, function (response) {
    if (response.session_id == session_id) {
        displayWhenDesktopShowing();
    }
});

BWEvents.subscribe('user_share_video', `${namespace}_listener`, function (response) {
    if (response.session_id == session_id) {
        displayWhenVideoShowing();
    }
});








 
 
 
 
 
 
 
 
 