import $ from "jquery";

function init() {
  console.log("Hello World! Todolist!");
  //放在裡面會執行兩次!?
  //$("#add-button").click(addNote);
}
$("#add-button").click(addNote);
initPage();
$('.block-right .pen').click(function(){console.log("pen");});
$('.block-right .close').click(function (){
  deleteItem($(this).attr("value"));
});
//api return all todo list in an array
function getTodolist() {
  var Todolist = [];
  for (var i = 0; i < localStorage.length; i++) {
    Todolist.push(JSON.parse(localStorage.getItem(i)));
  }
  //console.log(Todolist);
  return Todolist;
}
//api give an id and return event status
function finishTodolist(id) {
  var TodolistJSON;
  TodolistJSON = JSON.parse(localStorage.getItem(id));
  //console.log(TodolistJSON.status);
  return TodolistJSON.status;
}

function initPage(){
  var list;
  console.log("iniPage");
  list = getTodolist();
  console.log(list);
    //console(list[3].name);
  for(var i =1;i<list.length;i++){
    console.log(list[i].name);
    $('ul').append(createItem(list[i].id,list[i].name));

  }
  //console.log(list[3].name);
}



function addNote() {
  storeNote($("#add-text").val());
}
function storeNote(text) {
  console.log(text);
  //localStorage = window.localStorage;
  var id = localStorage.length;
  var itemJson = {
    id: id,
    name: text,
    status: false,
    createAt: getCurrentTime(),
    finishAt: null
  };
  localStorage.setItem(id, JSON.stringify(itemJson));
  $('ul').append(createItem(id,text));
  //console.log(JSON.parse(localStorage.getItem(id)));
  //localStorage.clear();
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

function createItem(id,name){
  //乾這好煩OAQ
  console.log("create");
  var li = document.createElement("li");
  li.setAttribute("class",id);
  var div_block = addDiv("item-block");
  var block_left = addDiv("block-left");
  var block_right = addDiv("block-right");
  block_left.appendChild(addButton("check-btn"));
  block_left.appendChild(addWord("word",name));
  block_right.appendChild(addPen("pen"));
  block_right.appendChild(addClose("close",id));
  div_block.appendChild(block_left);
  div_block.appendChild(block_right);
  li.appendChild(div_block);
  li.appendChild(addHr());
  return li;
}

function deleteItem(id){
  console.log(id);
  $("li."+id).remove();
  for(var i = 1;i<localStorage.length;i++){
    if(i==id){
      localStorage.removeItem(i);
      break;
    }
  }
}

function addDiv(attr){
  var div = document.createElement("div");
  div.setAttribute("class",attr);
  return div;
}
function addButton(attr){
  var btn = document.createElement("button");
  btn.setAttribute("class",attr);
  return btn;
}

function addWord(attr, name){
  var word = document.createElement("h3");
  word.setAttribute("class",attr);
  word.innerHTML=name;
  return word;
}

function addPen(attr){
  var span = document.createElement("span");
  span.setAttribute("class",attr);
  span.innerHTML='<svg class="svg-inline--fa fa-pen fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>';
  return span
}

function addClose(attr,id){
  var span = document.createElement("span");
  span.setAttribute("class",attr);
  span.setAttribute("value",id);
  span.innerHTML='<svg class="svg-inline--fa fa-times fa-w-11" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg=""><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>'
  return span;
}

function addHr(){
  var hr = document.createElement("hr");
  hr.setAttribute("class","separate");
  return hr;
}
export { init, finishTodolist, getTodolist };
