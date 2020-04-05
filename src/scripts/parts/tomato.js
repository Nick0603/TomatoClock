import $ from 'jquery';
import { setFinishTodolist, getTodolistByStatus, getTodolist } from './todolist';

function init(){
    //window.onload = nowDate;
    $(function(){nowDate();});
    
    outputTodolist();
    $("#add-button").on("click", function() { outputTodolist(); });     //button in todolist
    
    $(".green").hide();
    $("#bellSlash").hide();
    
    $("#bell").click(function() { bellfunc(1); });
    $("#bellSlash").click(function() { bellfunc(2); });

    $("#orangePlay").click(function() { orangeChangeState(1); });
    $("#orangePause").click(function() { orangeChangeState(2); });

    $("#greenPlay").click(function() { greenChangeState(1); });
    $("#greenPause").click(function() { greenChangeState(2); });
    
    $("#orangeCancel").click(function() { greenMode(); });
    $("#greenCancel").click(function() { orangeMode(); });

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
var countDownNumber = 1500;
var countDownID;
var countDownGoing = 0;
var countDownTime = $("#clock");
var orangeGreenMode = true;     //true = its orange(default) mode now

function nowDate() {
    var nowDatetime = new Date();
    var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");

    $("#nowDatetimeFront").html(nowDatetime.getFullYear() + "."
        + (nowDatetime.getMonth() < 10 ? '0' : '') + (nowDatetime.getMonth() + 1) + "."
        + (nowDatetime.getDate() < 10 ? '0' : '') + nowDatetime.getDate());

    $("#nowDatetimeBack").html(weekdays[nowDatetime.getDay()]
        + (nowDatetime.getHours() < 10 ? '0' : '') + nowDatetime.getHours() + ":"
        + (nowDatetime.getMinutes() < 10 ? '0' : '') + nowDatetime.getMinutes());
    
    setTimeout(nowDate, 1000);
}

function plusZero (param) {
    return (param < 10 ? '0' : '');
}

function countDownfunc() {
    if (countDownNumber == 0) {
        countDownTime.html("00:00");
        clearTimeout(countDownID);
        if (orangeGreenMode) {
            greenMode();
        }
        else {
            orangeMode();
        }
    }
    else {
        countDownNumber--;
        var countDownMin = Math.floor(countDownNumber / 60);
        var countDownSec = countDownNumber % 60
        countDownTime.html((countDownMin < 10 ? '0' : '') + countDownMin + ":"
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

function orangeMode() {
    countDownNumber = 1500;
    countDownTime.html("25:00");
    stopCount();
    $(".orange").show();
    $(".green").hide();
    orangeGreenMode = true;
}

function bellfunc(bellState) {
    if(bellState == 1) {
        $("#bellSlash").show();
        $("#bell").hide();
    }
    else {
        $("#bell").show();
        $("#bellSlash").hide();
    }
}

function orangeChangeState(param) {
    if(param == 1) {
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

function greenMode() {
    countDownNumber = 300;
    countDownTime.html("05:00");
    stopCount();
    $(".green").show();
    $(".orange").hide();
    orangeGreenMode = false;
}

function greenChangeState(param) {
    if(param == 1) {
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