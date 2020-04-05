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
    //window.onload = nowDate;
    $(function(){nowDate();});
    
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

    $("#finishCheckONE").click(function() { 
        setFinish(0);
        outputTodolist();
    });
    $("#finishCheckTWO").click(function() { 
        setFinish(1);
        outputTodolist();
    });
    $("#finishCheckTHREE").click(function() {
        setFinish(2);
        outputTodolist();
    });
    $("#finishCheckFOUR").click(function() {
        setFinish(3);
        outputTodolist();
    });

}

function nowDate() {
    var nowDatetime = new Date();
    var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");

    $("#nowDatetimeFront").text(nowDatetime.getFullYear() + "."
        + (nowDatetime.getMonth() < 10 ? '0' : '') + (nowDatetime.getMonth() + 1) + "."
        + (nowDatetime.getDate() < 10 ? '0' : '') + nowDatetime.getDate());

    $("#nowDatetimeBack").text(weekdays[nowDatetime.getDay()]
        + (nowDatetime.getHours() < 10 ? '0' : '') + nowDatetime.getHours() + ":"
        + (nowDatetime.getMinutes() < 10 ? '0' : '') + nowDatetime.getMinutes());
    
    setTimeout(nowDate, 1000);
}

function countDownfunc() {
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
    
        countDownID = setTimeout(countDownfunc, 1000);
    }
}

function startCount() {
    if (countDownGoing == 0) {
        countDownGoing = 1;
        countDownfunc();
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
    if (notFinish.length == 0) {
        $("#listONE").html("none！");
        $("#listTWO").html("none！");
        $("#listTHREE").html("none！");
        $("#listFOUR").html("none！");
    }
    for (var i = 0; i < notFinish.length; i++) {
        var readObject = notFinish[i];
        $.each(readObject, function(key, value) {
           if (key == "name") {
                if (i == 0) {
                    $("#listONE").html(value);
                }
                else if (i == 1) {
                    $("#listTWO").html(value);
                }
                else if (i == 2) {
                    $("#listTHREE").html(value);
                }
                else if (i == 3) {
                    $("#listFOUR").html(value);
                }
            }
        });
        if (i < 1) { $("#listTWO").html("none！"); }
        if (i < 2) { $("#listTHREE").html("none！"); }
        if (i < 3) { $("#listFOUR").html("none！"); }
    }
}

function setFinish(whichOneFinish) {
    var notFinish = getTodolistByStatus(0);
    var readObject = notFinish[whichOneFinish];
    $.each(readObject, function(key, value) {
       if (key == "id") {
            setFinishTodolist(value);
        }
    });     
}

export {
    init
};