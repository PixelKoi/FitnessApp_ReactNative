import {
	setTimerStates,
	setCountdown,
	setPercentageComplete,
} from "../redux-slice/fasting-slice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

const startFastingTimer = createListenerMiddleware();

startFastingTimer.startListening({
	actionCreator: setTimerStates,
	effect: async (action, listenerApi) => {
		let interval; // Declare the interval variable outside the effect

		const updateCountdown = () => {
			const state = listenerApi.getState();
			const endDate = state.fasting.endDate;

			//Todo: save fasting time to db
			if (endDate === null) {
				clearInterval(interval); // Clear the interval when endDate is null
				console.log("Countdown has been canceled!");
				return;
			}

			const endTime = new Date(endDate).getTime();
			let timeRemaining = endTime - Date.now();

			//Todo: save fasting time to db
			if (timeRemaining <= 0) {
				clearInterval(interval);
				console.log("Countdown has finished!");
				return;
			}

			const startDate = state.fasting.startDate;
			const startTime = new Date(startDate).getTime();
			const countdownDuration = endTime - startTime;

			// Calculate the remaining time, percentage complete, and formatted countdown
			timeRemaining = Math.max(timeRemaining, 0);
			const percentage =
				((countdownDuration - timeRemaining) / countdownDuration) * 100;
			const roundedPercentage = Math.round(percentage);
			const seconds = Math.floor((timeRemaining / 1000) % 60);
			const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
			const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
			const formattedCountdown = `${hours.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

			listenerApi.dispatch(setCountdown(formattedCountdown));
			listenerApi.dispatch(setPercentageComplete(roundedPercentage));
		};

		// Call updateCountdown immediately to avoid delay
		updateCountdown();

		// Update the countdown every second using the interval
		interval = setInterval(updateCountdown, 1000);
	},
});

export default startFastingTimer;
