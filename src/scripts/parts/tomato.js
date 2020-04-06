import $ from 'jquery';
import { setFinishTodolist, getTodolistByStatus } from './todolist';

const ON = 1;
const OFF = 2;
const ORANGE = true;
const GREEN = false;

var viewMode = ORANGE;
var countDownNumber = 1500;
var countDownID;
var countDownGoing = 0;
var $countDownTime = $("#clock");

function init(){

    updateOutputDate();
    outputTodolist();
    $("#add-button").on("click", function() { outputTodolist(); });     //button in todolist
    
    $(".green").hide();
    $("#bellSlash").hide();
    
    $("#bell").click(function() { bellfunc(OFF); });
    $("#bellSlash").click(function() { bellfunc(ON); });

    $("#orangePlay").click(function() { changeOrangeState(ON); });
    $("#orangePause").click(function() { changeOrangeState(OFF); });

    $("#greenPlay").click(function() { changeGreenState(ON); });
    $("#greenPause").click(function() { changeGreenState(OFF); });
    
    $("#orangeCancel").click(function() { initGreenMode(); });
    $("#greenCancel").click(function() { initOrangeMode(); });

    $("#finishCheckONE").click(function() { finishWhichOne(0); });
    $("#finishCheckTWO").click(function() { finishWhichOne(1); });
    $("#finishCheckTHREE").click(function() { finishWhichOne(2); });
    $("#finishCheckFOUR").click(function() { finishWhichOne(3); });
}

function updateOutputDate() {
    var timeNow = new Date();
    var weekDays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");

    $("#nowDatetimeFront").text(timeNow.getFullYear() + "."
        + (timeNow.getMonth() < 10 ? '0' : '') + (timeNow.getMonth() + 1) + "."
        + (timeNow.getDate() < 10 ? '0' : '') + timeNow.getDate());

    $("#nowDatetimeBack").text(weekDays[timeNow.getDay()]
        + (timeNow.getHours() < 10 ? '0' : '') + timeNow.getHours() + ":"
        + (timeNow.getMinutes() < 10 ? '0' : '') + timeNow.getMinutes());
    
    setTimeout(updateOutputDate, 1000);
}

function countDown() {
    if (countDownNumber == 0) {
        clearTimeout(countDownID);
        if (viewMode) {
            initGreenMode();
        }
        else {
            initOrangeMode();
        }
    }
    else {
        countDownNumber--;
        var countDownMin = Math.floor(countDownNumber / 60);
        var countDownSec = countDownNumber % 60
        $countDownTime.html((countDownMin < 10 ? '0' : '') + countDownMin + ":"
            + (countDownSec < 10 ? '0' : '') + countDownSec);
    
        countDownID = setTimeout(countDown, 1000);
    }
}

function startCount() {
    if (countDownGoing == 0) {
        countDownGoing = 1;
        countDown();
    }
}

function stopCount() {
    clearTimeout(countDownID);
    countDownGoing = 0;
}

function initOrangeMode() {
    countDownNumber = 1500;
    $countDownTime.html("25:00");
    stopCount();
    $(".orange").show();
    $(".green").hide();
    viewMode = ORANGE;
}

function bellfunc(bellState) {
    if(bellState == ON) {
        $("#bell").show();
        $("#bellSlash").hide();
    }
    else {
        $("#bellSlash").show();
        $("#bell").hide();
    }
}

function changeOrangeState(param) {
    if(param == ON) {
        $("#orangePause").show();
        $("#orangePlay").hide();
        countDownGoing = 0;
        startCount();
    }
    else {
        $("#orangePause").hide();
        $("#orangePlay").show();
        stopCount();
    }
}

function initGreenMode() {
    countDownNumber = 300;
    $countDownTime.html("05:00");
    stopCount();
    $(".green").show();
    $(".orange").hide();
    viewMode = GREEN;
}

function changeGreenState(param) {
    if(param == ON) {
        $("#greenPause").show();
        $("#greenPlay").hide();
        countDownGoing = 0;
        startCount();
    }
    else {
        $("#greenPause").hide();
        $("#greenPlay").show();
        stopCount();
    }
}
//not yet todolist操作無法自動更新(刪除、修改、完成時)，一定要重新整理(新增可以
function outputTodolist() {     
    var notFinish = getTodolistByStatus(0);
    hideNoUseLi(notFinish.length);
    for (var i = 0; i < notFinish.length; i++) {
        var readObject = notFinish[i];
        if (i == 0) {
            $("#finishCheckONE").css("opacity", "1");
            $("#listONE").text(readObject.name);
        }
        else if (i == 1) {
            $("#finishCheckTWO").css("opacity", "1");
            $("#listTWO").text(readObject.name);
        }
        else if (i == 2) {
            $("#finishCheckTHREE").css("opacity", "1");
            $("#listTHREE").text(readObject.name);
        }
        else if (i == 3) {
            $("#finishCheckFOUR").css("opacity", "1");
            $("#listFOUR").text(readObject.name);
        }
    }
}

function hideNoUseLi(notFinishNum) {
    if (notFinishNum == 0) {
        $("#finishCheckONE").css("opacity", "0");
        $("#listONE").text("");
    }
    if (notFinishNum < 2) {
        $("#finishCheckTWO").css("opacity", "0");
        $("#listTWO").text("");
    }
    if (notFinishNum < 3) {
        $("#finishCheckTHREE").css("opacity", "0");
        $("#listTHREE").text("");
    }
    if (notFinishNum < 4) {
        $("#finishCheckFOUR").css("opacity", "0");
        $("#listFOUR").text("");
    }   
}

function setFinish(whichOneFinish) {
    var notFinish = getTodolistByStatus(0);
    var readObject = notFinish[whichOneFinish];
    setFinishTodolist(readObject.id);  
}

function finishWhichOne(clickedButton) {
    setFinish(clickedButton);
    outputTodolist();
}

export {
    init
};