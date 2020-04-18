import $ from 'jquery';
import { getTodolistByStatus, getTodolist } from './todolist';

function init() {
	console.log('Hello World! Analysis!');
	//console.log(getTodolist());
	//console.log(setFinishTodolist(1));
	//輸入 id 則會將該id的status改成true,成功回傳true,失敗回傳false
}

window.onload = getCurrentWeek();

document.getElementById("leftspan").onclick = function () {
	reduceweek();

};
document.getElementById("rightspan").onclick = function () {
	addweek();
};


function GetFormatDate(InputValue) {
	if (InputValue < 10) {
		InputValue = '0' + InputValue;
	}
	return InputValue;
}
function getCurrentWeek() {
	var d = new Date();
	var w = d.getDay();

	if (w == 0) {
		w = 7
	}
	var EndDate = new Date();// 將日期變成目前禮拜的星期六
	EndDate.setDate(EndDate.getDate() + ((w - 1)));

	var StartDate = new Date();// 將日期變成目前禮拜的星期日
	StartDate.setDate(StartDate.getDate() + (7 - w));

	var startweek = document.getElementById("startweek");
	startweek.innerHTML = StartDate.getFullYear() + "." + GetFormatDate(StartDate.getMonth() + 1) + "." + GetFormatDate(StartDate.getDate());

	var endweek = document.getElementById("endweek");
	endweek.innerHTML = EndDate.getFullYear() + "." + (GetFormatDate(EndDate.getMonth() + 1)) + "." + GetFormatDate(EndDate.getDate());
}

function addweek() {
	var d = new Date();
	var w = d.getDay();
	if (w == 0) {
		w = 7
	}
	var StartDate = new Date();// 將日期變成下禮拜的星期日
	StartDate.setDate(StartDate.getDate() + (7 - w));
	var EndDate = new Date();// 將日期變下禮拜的星期六
	EndDate.setDate(EndDate.getDate() + ((w + 6)));

	var startweek = document.getElementById("startweek");
	startweek.innerHTML = StartDate.getFullYear() + "." + GetFormatDate(StartDate.getMonth() + 1) + "." + GetFormatDate(StartDate.getDate());

	var endweek = document.getElementById("endweek");
	endweek.innerHTML = EndDate.getFullYear() + "." + (GetFormatDate(EndDate.getMonth() + 1)) + "." + GetFormatDate(EndDate.getDate());
}

function reduceweek() {
	var d = new Date();
	var w = d.getDay();

	if (w == 0) {
		w = 7
	}
	var StartDate = new Date();// 將日期變成上禮拜的星期日
	StartDate.setDate(StartDate.getDate() - (7 + w));
	var EndDate = new Date();// 將日期變上禮拜的星期六
	EndDate.setDate(EndDate.getDate() - ((w + 1)));

	var startweek = document.getElementById("startweek");
	startweek.innerHTML = StartDate.getFullYear() + "." + GetFormatDate(StartDate.getMonth() + 1) + "." + GetFormatDate(StartDate.getDate());

	var endweek = document.getElementById("endweek");
	endweek.innerHTML = EndDate.getFullYear() + "." + (GetFormatDate(EndDate.getMonth() + 1)) + "." + GetFormatDate(EndDate.getDate());
}
export {
	init
};