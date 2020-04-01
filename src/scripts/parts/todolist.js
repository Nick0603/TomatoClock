import $ from "jquery";
import { createItem } from './todolist/view';
import { getTodolist, storeNote, setFinishTodolist } from './todolist/model';

function init() {
  console.log("Hello World! Todolist!");
  $("#add-button").click(addNote);
  //初始化頁面
  initPage();
  $(".top-left .left").click(showNotFinishList);
  $(".top-left .right").click(showfinishList);
  $("ul").on("click", ".edit", editItem);
  $("ul").on("click", ".delete", deleteItem);
  $("ul").on("click", ".check-btn", checkItem);
}

function addNote() {
  var inputValue = $("#add-text").val();
  if (inputValue != "") {
    storeNote(inputValue, function(params){
      var {id, text, status} = params;
      $("ul").append(createItem(id, text, status));
    });
    $("#add-text").val("");
  }
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

function editItem() {
  var id = $(this).attr("value");
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

function deleteItem() {
  var id = $(this).attr("value");
  $("li." + id).remove();
  var noteArray = getTodolist();
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

function checkItem(id) {
  var id = $(this).attr("value");
  if (setFinishTodolist(id)) {
      $("li." + id).remove();
  }
}

function initPage() {
  var noteArray = getTodolist();
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

export { init, getTodolist, setFinishTodolist };
