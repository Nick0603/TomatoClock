import $ from "jquery";
import {createItem} from "./todolist/view";

function init() {
    console.log("Hello World! Todolist!");
    $("#add-button").click(addNote);
    //初始化頁面
    initPage();
    $(".top-left .left").click(showNotFinishList);
    $(".top-left .right").click(showfinishList);
    $("ul").on("click", ".edit", function () {
        editItem($(this).attr("value"));
    });
    $("ul").on("click", ".delete", function () {
        deleteItem($(this).attr("value"));
    });
    $("ul").on("click", ".check-btn", function () {
        console.log("check");
        checkItem($(this).attr("value"));
    });
}

//api return all todo list in an array
function getTodolist() {
    var Todolist = [];
    Todolist = JSON.parse(localStorage.getItem("noteStr"));

    return Todolist;
}
//api give an id and return event status
function finishTodolist(id) {
    var TodolistJSON;
    TodolistJSON = JSON.parse(localStorage.getItem(id));
    return TodolistJSON.status;
}

function initPage() {
    var noteArray = [];
    noteArray = getTodolist();
    $("ul").empty();
    if (noteArray != null) {
        for (var i = 0; i < noteArray.length; i++) {
            if (!noteArray[i].status) {
                $("ul").append(
                    createItem(noteArray[i].id, noteArray[i].name, noteArray[i].status)
                );
            }
        }
    }
}

function addNote() {
    var inputValue = $("#add-text").val();
    if (inputValue != "") {
        storeNote(inputValue);
        $("#add-text").val("");
    }
}
function storeNote(text) {
    var noteArray = [];
    var createTime = getCurrentTime();
    var id = 1;
    if (localStorage.getItem("noteStr") != null) {
        noteArray = JSON.parse(localStorage.getItem("noteStr"));
        id = noteArray[noteArray.length - 1].id + 1;
    }
    var noteJson = {
        id: id,
        name: text,
        status: false,
        createAt: createTime,
        finishAt: null
    };
    noteArray.push(noteJson);
    localStorage.setItem("noteStr", JSON.stringify(noteArray));
    $("ul").append(createItem(id, text, false));
}
function getCurrentTime() {
    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    return dateTime;
}
function showNotFinishList() {
    $(".top-left .left").css("opacity", "0.5");
    $(".top-left .right").css("opacity", "1");
    initPage();
}
function showfinishList() {
    $(".top-left .left").css("opacity", "1");
    $(".top-left .right").css("opacity", "0.5");
    //清空list
    $("ul").empty();
    //apend list
    var noteArray = getTodolist();
    for (var i = 0; i < noteArray.length; i++) {
        if (noteArray[i].status) {
            $("ul").append(
                createItem(noteArray[i].id, noteArray[i].name, noteArray[i].status)
            );
        }
    }
}

function checkItem(id) {
    if (setFinishTodolist(id)) {
        $("li." + id).remove();
    }
}

function setFinishTodolist(id) {
    var noteArray = getTodolist();
    for (var i = 0; i < noteArray.length; i++) {
        if (noteArray[i].id == id) {
            noteArray[i].status = true;
            localStorage.setItem("noteStr", JSON.stringify(noteArray));
            return true;
        }
    }
    return false;
}
function editItem(id) {
    var noteArray = getTodolist();
    Swal.fire({
        title: "請輸入修改記事",
        input: "text",
        showCancelButton: true,
        inputValidator: value => {
            if (!value) {
                return "請輸入修改記事";
            }
        }
    }).then(result => {
        if (result.value) {
            //console.log(result.value);
            for (var i = 0; i < noteArray.length; i++) {
                if (noteArray[i].id == id) {
                    if (newText) {
                        noteArray[i].name = result.value;
                        localStorage.setItem("noteStr", JSON.stringify(noteArray));
                        break;
                    }
                }
            }
            initPage();
        }
    });
}
function deleteItem(id) {
    $("li." + id).remove();
    var noteArray = [];
    noteArray = getTodolist();
    for (var i = 0; i < noteArray.length; i++) {
        if (id == noteArray[i].id) {
            noteArray.splice(i, 1);
            localStorage.setItem("noteStr", JSON.stringify(noteArray));
            if (noteArray.length == 0) {
                localStorage.removeItem("noteStr");
            }
            break;
        }
    }
}

export { init, finishTodolist, setFinishTodolist };
