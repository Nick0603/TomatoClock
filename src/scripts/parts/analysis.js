import $ from 'jquery';
import { setFinishTodolist, getTodolist } from './todolist';
import {
	getCurrentTime,
	getTodolistByStatus
} from "./todolist/model"


function init() {
	console.log('Hello World! Analysis!');

}
window.onload = today();
window.onload = getCurrentWeek();




function GetFormatDate(InputValue) {
	if (InputValue < 10) {
		InputValue = '0' + InputValue;
	}
	return InputValue;
}
function today() {
	var d = new Date();
	todaydate.innerHTML = d.getFullYear() + "." + GetFormatDate((d.getMonth() + 1)) + "." + GetFormatDate(d.getDate());
}
function getCurrentWeek() {
	var d = new Date();
	var w = d.getDay();

	if (w == 0) {
		w = 7
	}
	var EndDate = new Date();// 將日期變成目前禮拜的星期六
	EndDate.setDate(EndDate.getDate() + (7 - w));

	var StartDate = new Date();// 將日期變成目前禮拜的星期日
	StartDate.setDate(StartDate.getDate() + (-w));

	var startweek = document.getElementById("startweek");
	startweek.innerHTML = StartDate.getFullYear() + "." + GetFormatDate(StartDate.getMonth() + 1) + "." + GetFormatDate(StartDate.getDate());

	var endweek = document.getElementById("endweek");
	endweek.innerHTML = EndDate.getFullYear() + "." + (GetFormatDate(EndDate.getMonth() + 1)) + "." + GetFormatDate(EndDate.getDate());
}

function todayworking() {
	var arrStatus = getTodolistByStatus(status)
	var today_date = today();
	var finishAt = getCurrentTime();
	finish_count = 0;
	doing_count = 0;
	for (i = 0; i < arrStatus.length; i++) {
		if (arrStatus[i] == true && today_date == finishAt.date) {
			finish_count += 1
		}
		else {
			doing_count += 1
		}
		document.getElementById("today-finish").innerHTML = finish_count;
		document.getElementById("today-doing").innerHTML = doing_count;

	}
}



export {
	init,
	getCurrentTime,
	getTodolistByStatus

};