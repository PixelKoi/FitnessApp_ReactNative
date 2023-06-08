import {
	changeBMR,
	changeDailyCal,
} from "../../redux-manager/redux-slice/user-slice";
import { AppDispatch } from "../../redux-manager/store";

/*
    Calorie Counting Algorithm

    For men: BMR = 88.36 + (13.4 x weight in kg) + (4.8 x height in cm) - (5.7 x age in years)
    For women: BMR = 447.6 + (9.2 x weight in kg) + (3.1 x height in cm) - (4.3 x age in years)

    Sedentary (little or no exercise): TDEE = BMR x 1.2
    Lightly active (light exercise or sports 1-3 days/week): TDEE = BMR x 1.375
	Moderately active (moderate exercise or sports 3-5 days/week): TDEE = BMR x 1.55
	Very active (hard exercise or sports 6-7 days/week): TDEE = BMR x 1.725
	Extremely active (very hard exercise or sports, physical job or training twice a day): TDEE = BMR x 1.9

	Lose 1lb a week = -500 cal deficit
*/
export default function calAlgo(
	age: number,
	gender: string,
	weight: number,
	height: number,
	activity: string,
	goal: number,
	dispatch: AppDispatch
): void {
	let calBMR = 0;

	if (gender === "Male") {
		calBMR = 88.3 + 14.4 * weight + 4.8 * height - 5.7 * age;
	} else if (gender === "Female") {
		calBMR = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
	}

	switch (activity) {
		case "Sedentary":
			calBMR *= 1.2;
			break;
		case "Lightly active":
			calBMR *= 1.375;
			break;
		case "Moderately active":
			calBMR *= 1.55;
			break;
		case "Very active":
			calBMR *= 1.725;
			break;
		case "Extremely active":
			calBMR *= 1.9;
			break;
		default:
			break;
	}

	switch (goal) {
		case 1:
			dispatch(changeDailyCal(Math.round(calBMR - 500)));
			break;
		case 2:
			dispatch(changeDailyCal(Math.round(calBMR - 1000)));
			break;
		default:
			dispatch(changeDailyCal(Math.round(calBMR)));
			break;
	}

	dispatch(changeBMR(Math.round(calBMR)));
}
