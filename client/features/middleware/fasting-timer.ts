import {
	setTimerStates,
	setCountdown,
} from "../../features/user/fasting-slice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

const startFastingTimer = createListenerMiddleware();

startFastingTimer.startListening({
	actionCreator: setTimerStates,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState();
		const endDate = state.fasting.endDate;
		const endTime = new Date(endDate).getTime();
		let timeRemaining = endTime - Date.now();

		if (timeRemaining <= 0) {
			console.log("Countdown has already finished!");
			return;
		}

		// Update the countdown every second
		const interval = setInterval(() => {
			// Calculate the remaining time
			timeRemaining = endTime - Date.now();

			// Check if the countdown has reached zero
			if (timeRemaining <= 0) {
				clearInterval(interval);
				console.log("Countdown has finished!");
				// Perform any actions you want when the countdown finishes
			} else {
				// Convert the remaining time to hours, minutes, and seconds
				let seconds = Math.floor((timeRemaining / 1000) % 60);
				let minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
				let hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

				// Add leading zeros if necessary
				hours = String(hours).padStart(2, "0");
				minutes = String(minutes).padStart(2, "0");
				seconds = String(seconds).padStart(2, "0");

				listenerApi.dispatch(setCountdown(`${hours}:${minutes}:${seconds}`));
			}
		}, 1000); // Update every second
	},
});

export default startFastingTimer;
