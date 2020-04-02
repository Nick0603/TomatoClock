import $ from "jquery";
import {createItem} from "./todolist/view";
import {
    storeNote,
    getTodolist,
    deleteItemById,
    setFinishTodolist,
    editItemById
} from "./todolist/model";

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
        checkItem($(this).attr("value"));
    });
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
    // 取新增的資料
    var inputValue = $("#add-text").val();
    $("#add-text").val("");
    // 防呆
    if (inputValue == "") {
        return ;
    }
    var params = storeNote(inputValue);
    $("ul").append(createItem(params.id, params.text, params.status));
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


function editItem(id) {
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
        if (!result.value) {
            return ;
        }
        editItemById(id, result.value);
        initPage();
    });
}

function deleteItem(id) {
    $("li." + id).remove();
    deleteItemById(id);
}

export { init, setFinishTodolist };
