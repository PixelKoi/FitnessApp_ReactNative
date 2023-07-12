import {
	setMeditationTimer,
	incrementTimeSpentMeditating,
} from "../redux-slice/meditation-slice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

const startMeditationTimer = createListenerMiddleware();

let interval; // Declare the interval variable outside the effect

// Keeps track of how long a user has spent meditating
startMeditationTimer.startListening({
	actionCreator: setMeditationTimer,
	effect: async (action, listenerApi) => {
		if (listenerApi.getState().meditation.startMeditationTimer === true) {
			// Call updateCountdown immediately to avoid delay
			const updateMeditationTimer = () => {
				listenerApi.dispatch(incrementTimeSpentMeditating());
			};
			// Update the countdown every second using the interval
			interval = setInterval(updateMeditationTimer, 1000);
		} else {
			// Clear the interval and stop the timer
			clearInterval(interval);
			interval = null;
		}
	},
});

export default startMeditationTimer;
