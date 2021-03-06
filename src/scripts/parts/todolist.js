import $ from "jquery";
import {
    renderList,
    createItem
} from "./todolist/view";
import {
    storeNote,
    getTodolist,
    deleteItemById,
    setFinishTodolist as _setFinishTodolist,
    editItemById,
    getTodolistByStatus
} from "./todolist/model";

function init() {
    //初始化頁面
    showNotFinishList();
    $(".top-left .left").click(showNotFinishList);
    $(".top-left .right").click(showfinishList);
    $("#add-button").click(addNote);
    $("ul").on("click", ".edit", editItem);
    $("ul").on("click", ".delete", deleteItem);
    $("ul").on("click", ".check-btn", checkItem);
}

function showNotFinishList() {
    $(".top-left .left").css("opacity", "0.5");
    $(".top-left .right").css("opacity", "1");
    var status = false;
    var noteArray = getTodolistByStatus(status);
    renderList(noteArray);
}

function showfinishList() {
    $(".top-left .left").css("opacity", "1");
    $(".top-left .right").css("opacity", "0.5");
    var status = true;
    var noteArray = getTodolistByStatus(status);
    renderList(noteArray);
}

function addNote() {
    var inputValue = $("#add-text").val();
    $("#add-text").val("");
    if (inputValue == "") {
        return ;
    }
    storeNote(inputValue);
    showNotFinishList();
}

function checkItem(id) {
    var id = $(this).attr("value");
    setFinishTodolist(id);
}

function setFinishTodolist(id){
    if (_setFinishTodolist(id)) {
        showNotFinishList();
    }
}

function editItem() {
    var id = $(this).attr("value");
    var text = $('li.'+ id +' .word').text();
    Swal.fire({
        title: "請輸入修改記事",
        input: "text",
        inputValue:text,
        showCancelButton: true,
        heightAuto:false,
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
        showNotFinishList();
    });
}

function deleteItem(id) {
    var id = $(this).attr("value");
    deleteItemById(id);
    showNotFinishList();
}

export {
    init,
    getTodolist,
    getTodolistByStatus,
    setFinishTodolist
};
