let namespace = BWProperties.namespace;

let session_id = BWProperties.participant.session_id;

let event_id = BWProperties.event_id;

function displayWhenVideoIsOn() {
    $(`#${namespace}_${session_id}_video_off`).hide();
    $(`#${namespace}_${session_id}_video_on`).show();
}

function displayWhenVideoIsOff() {
    $(`#${namespace}_${session_id}_video_off`).show();
    $(`#${namespace}_${session_id}_video_on`).hide();
}

if (BWProperties.participant.is_video_on == 1) {
    displayWhenVideoIsOn();
} else {
    displayWhenVideoIsOff();
}

function showVideo() {

    BWAPI.post(`/events/${event_id}/setUserVideoOn`, { session_id: session_id }).then(response => {

        if (response.status == 'success') {
            displayWhenVideoIsOn();
        }
    }).catch(error => {
		console.log(error);
    });
}

function hideVideo() {

    BWAPI.post(`/events/${event_id}/setUserVideoOff`, { session_id: session_id }).then(response => {

        if (response.status == 'success') {
            displayWhenVideoIsOff();
        }
    }).catch(error => {
		console.log(error);
    });
}

this.hideVideo = hideVideo;
this.showVideo = showVideo;

BWEvents.subscribe('user_video_off', `${namespace}_listener`, function (response) {
    if (response.session_id == session_id) {
        displayWhenVideoIsOff();
    }
});

BWEvents.subscribe('user_video_on', `${namespace}_listener`, function (response) {
    if (response.session_id == session_id) {
        displayWhenVideoIsOn();
    }
});
 