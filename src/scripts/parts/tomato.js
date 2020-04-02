import $ from 'jquery';
import { setFinishTodolist, getTodolistByStatus } from './todolist';

function init(){
    //輸入 id 則會將該id的status改成true,成功回傳true,失敗回傳false
    //console.log(setFinishTodolist(id));
    console.log(getTodolistByStatus(false));
    window.onload = nowDate;
    $(".green").hide();
    $("#bellSlash").hide();
}


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

//----------count down timer-----------
var countDownNumber = 1500;
var countDownID;
var countDownGoing = 0;
var countDownTime = $("#clock");
var orangeGreenMode = true;     //true = its orange(default) mode now

function countDownfunc() {

    if (countDownNumber == 0) {
        //alert("倒數結束");
        countDownTime.html("00:00");
        clearTimeout(countDownID);
        if (orangeGreenMode) {
            countDownNumber = 300;
            countDownTime.html("05:00");
            orangeGreenMode = false;
            greenMode();
        }else {
            countDownNumber = 1500;
            countDownTime.html("25:00");
            orangeGreenMode = true;
            orangeMode();
        }
        
    }else {
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

//---------initial and bell---------

$("#bell").click(function() {
    bellfunc(1);
});
$("#bellSlash").click(function() {
    bellfunc(2);
});

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

//---------orange mode------------

function orangeMode() {
    $(".orange").show();
    $(".green").hide();
}
$("#orangePlay").click(function() {
    // some feature
    orangeChangeState(1);
    countDownGoing = 0;
    startCount();
});

$("#orangePause").click(function() {
    orangeChangeState(2);
    stopCount();
});
function orangeChangeState(param) {
    if(param == 1) {
        $("#orangePause").show();
        $("#orangePlay").hide();
    }
    else {
        $("#orangePause").hide();
        $("#orangePlay").show();
    }
}
$("#orangeCancel").click(function() {
    countDownNumber = 300;
    countDownTime.html("05:00");
    stopCount();
    greenMode();
});

//------------green mode----------------

function greenMode() {
    $(".green").show();
    $(".orange").hide();
}

$("#greenPlay").click(function() {
    greenChangeState(1);
    countDownGoing = 0;
    startCount();
});
$("#greenPause").click(function() {
    greenChangeState(2);
    stopCount();
});
function greenChangeState(param) {
    if(param == 1) {
        $("#greenPause").show();
        $("#greenPlay").hide();
    }
    else {
        $("#greenPause").hide();
        $("#greenPlay").show();
    }
}
$("#greenCancel").click(function() {
    countDownNumber = 1500;
    countDownTime.html("25:00");
    stopCount();
    orangeMode();
});

export {
    init
};