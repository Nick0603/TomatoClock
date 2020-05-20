import $ from 'jquery';
import {
 getTodolistByStatus,
 getTodolist,
 storeNote,
 setFinishTodolist,
} from './todolist/model';

var complete_data = [{index:"1", content:"擬定專案內容", completePomoNum:"3", status: "complete", date: "2020.5.20"},
{index:"2", content:"架構規劃", completePomoNum:"5", status: "complete", date: "2020.5.20"},
{index:"3", content:"底層框架撰寫", completePomoNum:"2", status: "complete", date: "2020.5.20"},
{index:"4", content:"選擇主題", completePomoNum:"1", status: "complete", date: "2020.5.20"}];
localStorage.setItem('complete_data', JSON.stringify(complete_data));

var counter = 0;
var d = new Date();
var t = d.getTime();
var w = d.getDay();
var oneDayTime = 24 * 60 * 60 * 1000;
var dateAry = [];


function init() {
 today()
 GetFormatDate()
 getCurrentWeek()
 $("#rightspan").click(addWeek);
 $("#leftspan").click(minusWeek);
 // generateChart(dateAry)
 // getNearlyWeekDate(d.getFullYear()+"."+(d.getMonth()+1)+"."+d.getDate());
}

function GetFormatDate(InputValue) {
 if (InputValue < 10) {
  InputValue = '0' + InputValue;
 }
 return InputValue;
}
function today() {
 $("#todaydate").text(d.getFullYear() + "." + GetFormatDate((d.getMonth() + 1)) + "." + GetFormatDate(d.getDate()));
}
function getCurrentWeek() {
 var SundayTime = t + (-w) * oneDayTime;  // 將日期變成目前禮拜的星期日
 var SaturdayTime = t + (6 - w) * oneDayTime;// 將日期變成目前禮拜的星期六
 var Sunday = new Date(SundayTime);
 var Saturday = new Date(SaturdayTime)
 $("#startweek").text(Sunday.getFullYear() + "." + GetFormatDate(Sunday.getMonth() + 1) + "." + GetFormatDate(Sunday.getDate()));
 $("#endweek").text(Saturday.getFullYear() + "." + GetFormatDate(Saturday.getMonth() + 1) + "." + GetFormatDate(Saturday.getDate()));
}
function addWeek() {
 counter += 1
 var nextWeekTime = t + oneDayTime * (7 * counter);
 var nextSundayTime = nextWeekTime + (-w) * oneDayTime;
 var nextSaturdayTime = nextWeekTime + (6 - w) * oneDayTime;
 var nextSunday = new Date(nextSundayTime);
 var nextSaturday = new Date(nextSaturdayTime)
 $("#startweek").text(nextSunday.getFullYear() + "." + GetFormatDate(nextSunday.getMonth() + 1) + "." + GetFormatDate(nextSunday.getDate()));
 $("#endweek").text(nextSaturday.getFullYear() + "." + GetFormatDate(nextSaturday.getMonth() + 1) + "." + GetFormatDate(nextSaturday.getDate()));
}
function minusWeek() {
 counter -= 1;
 var lastWeekTime = t + oneDayTime * (7 * counter);
 var lastSundayTime = lastWeekTime + (-w) * oneDayTime;
 var lastSaturdayTime = lastWeekTime + (6 - w) * oneDayTime;
 var lastSunday = new Date(lastSundayTime);
 var lastSaturday = new Date(lastSaturdayTime)
 $("#startweek").text(lastSunday.getFullYear() + "." + GetFormatDate(lastSunday.getMonth() + 1) + "." + GetFormatDate(lastSunday.getDate()));
 $("#endweek").text(lastSaturday.getFullYear() + "." + GetFormatDate(lastSaturday.getMonth() + 1) + "." + GetFormatDate(lastSaturday.getDate()));
}

// 取得指定日期一周時間
function getNearlyWeekDate(dateStr) {
    // 計算近一周日期
    var date = new Date(dateStr);
    var date_sm = new Date(dateStr);
    var date_lg = new Date(dateStr);
    var dateAry = [];
    dateAry.push(date.getFullYear() + '.' + GetFormatDate(date.getMonth()+1) + '.' + GetFormatDate(date.getDate()));
    // 取得今天星期幾
    var day = date.getDay() == 0 ? 7 : date.getDay();
    // var day_sm = date_sm.getDay() == 0 ? 7 : date_sm.getDay();
    // var day_lg = date_lg.getDay() == 0 ? 7 : date_lg.getDay();
    // 從星期日取到今天
    for(var i = day ; i >= 0 ; i--) {
        date_sm.setDate(date_sm.getDate()-1);
        dateAry.unshift(date_sm.getFullYear() + '.' + GetFormatDate(date_sm.getMonth()+1) + '.' + GetFormatDate(date_sm.getDate()));
    }
    // 從今天取到星期六
    for(var i = day ; i < 6 ; i++) {
        date_lg.setDate(date_lg.getDate()+1);
        dateAry.push(date_lg.getFullYear() + '.' + (date_lg.getMonth()+1) + '.' + date_lg.getDate());
    }
    return dateAry;
}

function generateChart(dateAry) {
    // title 日期區間
    document.querySelector('.week').textContent = dateAry[0] + ' ~ ' + dateAry[dateAry.length-1];
    // 取得 data
    var complete_data = JSON.parse(localStorage.getItem('complete_data'));
    var num = [0,0,0,0,0,0,0];
    var bgcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'];
    var today = new Date();
    // 先取得所有完成的個數
    for(var i = 0 ; i < dateAry.length ; i++) {
        for(var j = 0 ; j < complete_data.length ; j++) {
            if(complete_data[j].date == dateAry[i]) {
                num[i] = num[i] + 1;
            }
        }
        if(dateAry[i] == (today.getFullYear() + "." + (today.getMonth()+1) + '.' + today.getDate())) {
            bgcolor[i] = '#FF4384';
        }
    }
    // 將dateAry轉為只有月份+日期
    var dateMonthAry = dateAry.map(item => item.split('.')[1] + '/' + item.split('.')[2]);
    // 繪製圖表
    // if(document.querySelector('.chart') != null) {
    //     document.querySelector('.chart').remove();
    // }
    var chart_block = document.querySelector('.chart');
    
    var canvas  = document.getElementById(".barchart");
    // 先清空 canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    canvas.height = 250;
    var chart = new Chart(canvas , {
        // 參數設定[註1]
        type: "bar", // 圖表類型
        data: {
            labels: dateMonthAry, // 標題
            datasets: [{
                label: " Set of Pomodoro", // 標籤
                data: num, // 資料
                backgroundColor: bgcolor,
                borderWidth: 1, // 外框寬度
            }]
        },
        options: { 
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    barPercentage: 0.8,
                    gridLines: {
                        zeroLineColor: 'white'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",
                        fontSize: 16,
                        padding: 10,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    offset: true,
                    barPercentage: 0.8,
                    gridLines: {
                        zeroLineColor: 'white'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",
                        fontSize: 16,
                        padding: 10,
                        stepSize: 1
                    }
                }]
            }
        }
    });
    // 報表往前算一個星期
    document.querySelector('.leftspan').addEventListener('click', () => {
        var date_text = document.querySelector('.week').textContent;
        var today = new Date(date_text.split(' - ')[0]);
        today.setDate(today.getDate() - 1);
        generateChart(getNearlyWeekDate(today.getFullYear()+"."+(today.getMonth()+1)+"."+today.getDate()));
    });
    // 報表往後算一個星期
    document.querySelector('.rightspan').addEventListener('click', () => {
        var date_text = document.querySelector('.week').textContent;
        var today = new Date(date_text.split(' - ')[1]);
        today.setDate(today.getDate() + 1);
        generateChart(getNearlyWeekDate(today.getFullYear()+"."+(today.getMonth()+1)+"."+today.getDate()));
    });
}


export {
 init
};