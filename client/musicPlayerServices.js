import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";

export async function setupPlayer() {
	let isSetup = false;
	try {
		//assuming player is ready and trying to get a track
		await TrackPlayer.getCurrentTrack();
		isSetup = true;
	} catch (error) {
		//player is not ready so we are setting up player
		await TrackPlayer.setupPlayer();
		isSetup = true;
	} finally {
		//if nothing works we return as false
		return isSetup;
	}
}

export async function addTrack(track) {
	await TrackPlayer.add(track);
	await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

//provides ability to play, pause etc
export async function playbackService() {
	TrackPlayer.addEventListener(Event.RemotePause, () => {
		TrackPlayer.pause();
	});

	TrackPlayer.addEventListener(Event.RemotePlay, () => {
		TrackPlayer.play();
	});

	TrackPlayer.addEventListener(Event.RemoteNext, () => {
		TrackPlayer.skipToNext();
	});

	TrackPlayer.addEventListener(Event.RemotePrevious, () => {
		TrackPlayer.skipToPrevious();
	});
}
