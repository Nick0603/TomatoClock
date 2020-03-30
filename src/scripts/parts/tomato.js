import $ from 'jquery';

function init(){
    console.log('Hello World! Tomato!');
}

window.onload = now_date;       //Uncaught ReferenceError: now_date is not defined at <anonymous>:1:1
function now_date() {
    var now_datetime = new Date();
    var now_datetime_front = document.getElementById("now-datetime_front");
    var now_datetime_back = document.getElementById("now-datetime_back");

    var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");

    now_datetime_front.innerHTML = now_datetime.getFullYear() + "."
        + (now_datetime.getMonth() < 10 ? '0' : '') + (now_datetime.getMonth() + 1) + "."
        + (now_datetime.getDate() < 10 ? '0' : '') + now_datetime.getDate();

    now_datetime_back.innerHTML = weekdays[now_datetime.getDay()]
        + (now_datetime.getHours() < 10 ? '0' : '') + now_datetime.getHours() + ":"
        + (now_datetime.getMinutes() < 10 ? '0' : '') + now_datetime.getMinutes();
    setTimeout("now_date()", 1000);
}       //load the initial time, didnt update, test by +"///"+now_datetime.getSeconds()


//----------count down timer-----------

var countDownNumber = 1500;
var countDownID;
var countDownGoing = 0;
//var startTime = new Date().getTime();
var countDownTime = document.getElementById("clock");
var orangeGreenMode = true;     //true = its orange(default) mode now

function countDownfunc() {

    if (countDownNumber == 0) {
        //alert("倒數結束");
        countDownTime.innerHTML = "00:00";
        clearTimeout(countDownID);
        if (orangeGreenMode) {
            countDownNumber = 300;
            countDownTime.innerHTML = "05:00";
            orangeGreenMode = false;
            greenMode();
        }else {
            countDownNumber = 1500;
            countDownTime.innerHTML = "25:00";
            orangeGreenMode = true;
            orangeMode();
        }
        
    }else {
        countDownNumber--;
        var countDownMin = Math.floor(countDownNumber / 60);
        var countDownSec = countDownNumber % 60
        countDownTime.innerHTML= (countDownMin < 10 ? '0' : '') + countDownMin + ":"
            + (countDownSec < 10 ? '0' : '') + countDownSec;
    
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

$(".green").hide();
//---------orange mode------------

function orangeMode() {
    $(".orange").show();
    $(".green").hide();
}
$("#orangeBell").click(function(){
    orangeBellfunc();
});
var orangeBellState = 0;
function orangeBellfunc() {
    if(orangeBellState == 0) {
        $("#orangeBell").attr("style","background-color: #F08448");
        orangeBellState = 1;
    }
    else {
        $("#orangeBell").attr("style","background-color: none");
        orangeBellState = 0;
    }
}

$("#orangePlay").click(function(){
    orangeChangeState(1);
    countDownGoing = 0;
    startCount();
});
$("#orangePause").click(function(){
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
$("#orangeCancel").click(function(){
    countDownNumber = 300;
    countDownTime.innerHTML = "05:00";
    stopCount();
    greenMode();
});


//------------green mode----------------

function greenMode() {
    $(".green").show();
    $(".orange").hide();
}
$("#greenBell").click(function(){
    greenBellfunc();
});
var greenBellState = 0;
function greenBellfunc() {
    if(greenBellState == 0) {
        $("#greenBell").attr("style","background-color: #6C9460");
        greenBellState = 1;
    }
    else {
        $("#greenBell").attr("style","background-color: none");
        greenBellState = 0;
    }
}


$("#greenPlay").click(function(){
    greenChangeState(1);
    countDownGoing = 0;
    startCount();
});
$("#greenPause").click(function(){
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
$("#greenCancel").click(function(){
    countDownNumber = 1500;
    countDownTime.innerHTML = "25:00";
    stopCount();
    orangeMode();
});


export {
    init
};