import $ from "jquery";
import { renderList, createItem } from './todolist/view';
import { getTodolist, storeNote, setFinishTodolist } from './todolist/model';

function init() {
  console.log("Hello World! Todolist!");
  $("#add-button").click(addNote);
  //初始化頁面
  renderUnfinishList();
  $(".top-left .left").click(showNotFinishList);
  $(".top-left .right").click(showfinishList);
  $("ul").on("click", ".edit", editItem);
  $("ul").on("click", ".delete", deleteItem);
  $("ul").on("click", ".check-btn", checkItem);
}

function addNote() {
  var inputValue = $("#add-text").val();
  $("#add-text").val("");
  if (inputValue == "") {
    return ;
  }
  var addNewRow = function(params){
    var {id, text, status} = params;
    $("ul").append(createItem(id, text, status));
  };
  storeNote(inputValue, addNewRow);
}

function showNotFinishList() {
  $(".top-left .left").css("opacity", "0.5");
  $(".top-left .right").css("opacity", "1");
  renderUnfinishList();
}

function showfinishList() {
  $(".top-left .left").css("opacity", "1");
  $(".top-left .right").css("opacity", "0.5");
  renderFinishList();
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
      if (result.value == false) {
        return ;
      }
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
        renderUnfinishList();
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

function renderUnfinishList() {
  var status = false;
  var array = getTodolist(status);
  renderList(array);
}

function renderFinishList() {
  var status = true;
  var array = getTodolist(status);
  renderList(array);
}

export { init, getTodolist, setFinishTodolist };
