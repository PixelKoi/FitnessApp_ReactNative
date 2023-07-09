import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";
import { playListData, sleepTracks } from "./constants";

export async function setupPlayer() {
	let isSetup = false;
	try {
		await TrackPlayer.getCurrentTrack();
		isSetup = true;
	} catch (error) {
		await TrackPlayer.setupPlayer();
		isSetup = true;
	} finally {
		return isSetup;
	}
}

export async function addTrack(track) {
	await TrackPlayer.add(track);
	await TrackPlayer.setRepeatMode(RepeatMode.Off);
}

//pROVIDES ABILITY TO PLAY, PLAUSE ETC
export async function playBackService() {
	TrackPlayer.addEventListener(Event.RemotePause, () => {
		TrackPlayer.pause();
	});

	TrackPlayer.addEventListener(Event.RemotePlay, () => {
		TrackPlayer.play();
	});

	// TrackPlayer.addEventListener(Event.RemoteJumpForward, () => {
	// 	TrackPlayer.;
	// });
}
