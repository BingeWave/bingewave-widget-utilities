let namespace = BWProperties.namespace;

let session_id = BWProperties.participant.session_id;

let event_id = BWProperties.event_id;

function displayWhenUmuted() {
    $(`#${namespace}_${session_id}_muted`).hide();
    $(`#${namespace}_${session_id}_unmuted`).show();
}

function displayWhenMuted() {
    $(`#${namespace}_${session_id}_muted`).show();
    $(`#${namespace}_${session_id}_unmuted`).hide();
}

if (BWProperties.participant.is_audio_on == 1) {
    displayWhenUmuted();
} else {
    displayWhenMuted();
}

function unmute() {

    BWAPI.post(`/events/${event_id}/setUserAudioUnmute`, { session_id: session_id }).then(response => {

        if (response.status == 'success') {
            displayWhenUmuted();
        }
    }).catch(error => {
		console.log(error);
    });
}

function mute() {

    BWAPI.post(`/events/${event_id}/setUserAudioMute`, { session_id: session_id }).then(response => {

        if (response.status == 'success') {
            displayWhenMuted();
        }
    }).catch(error => {
		console.log(error);
    });
}

this.mute = mute;
this.unmute = unmute;

BWEvents.subscribe('user_mic_muted', `${namespace}_listener`, function (response) {
    if (response.session_id == session_id) {
        displayWhenMuted();
    }
});

BWEvents.subscribe('user_mic_unmuted', `${namespace}_listener`, function (response) {
    if (response.session_id == session_id) {
        displayWhenUmuted();
    }
});