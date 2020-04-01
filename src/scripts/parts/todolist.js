import $ from "jquery";

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

function createItem(id, name, status) {
  var li = document.createElement("li");
  li.setAttribute("class", id);
  var div_block = addDiv("item-block");
  var block_left = addDiv("block-left");
  var block_right = addDiv("block-right");
  var check_Btn;
  if (!status) {
      check_Btn = addButton("check-btn", id);
      check_Btn.appendChild(addCheck("check", id));
  } else {
      check_Btn = addButton("check-btn finished", id);
      check_Btn.disabled = true;
      check_Btn.appendChild(addCheck("check finished", id));
  }
  block_left.appendChild(check_Btn);
  if (!status) {
      block_left.appendChild(addWord("word", name));
      block_right.appendChild(addPen("edit"));
      block_right.appendChild(addClose("delete", id));
  } else {
      block_left.appendChild(addWord("word finished", name));
  }
  div_block.appendChild(block_left);
  div_block.appendChild(block_right);
  li.appendChild(div_block);
  li.appendChild(addHr());
  return li;
}

function checkItem(id) {
  var id = $(this).attr("value");
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

function addDiv(attr) {
  var div = document.createElement("div");
  div.setAttribute("class", attr);
  return div;
}

function addButton(attr, id) {
  var btn = document.createElement("button");
  btn.setAttribute("class", attr);
  btn.setAttribute("value", id);
  return btn;
}

function addWord(attr, name) {
  var word = document.createElement("h3");
  word.setAttribute("class", attr);
  word.innerHTML = name;
  return word;
}

function addPen(attr) {
  var span = document.createElement("span");
  span.setAttribute("class", attr);
  span.innerHTML =
      '<svg class="svg-inline--fa fa-pen fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>';
  return span;
}

function addClose(attr, id) {
  var span = document.createElement("span");
  span.setAttribute("class", attr);
  span.setAttribute("value", id);
  span.innerHTML =
      '<svg class="svg-inline--fa fa-times fa-w-11" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg=""><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
  return span;
}

function addHr() {
  var hr = document.createElement("hr");
  hr.setAttribute("class", "separate");
  return hr;
}

function addCheck(attr, id) {
  var span = document.createElement("span");
  span.setAttribute("class", attr);
  span.setAttribute("value", id);
  span.innerHTML =
      '<svg class="svg-inline--fa fa-check fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>';
  return span;
}

export { init, finishTodolist, setFinishTodolist };
