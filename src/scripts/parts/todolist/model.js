function getCurrentTime() {
    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
  
    return dateTime;
}

function getTodolist(status) {
    var data = JSON.parse(localStorage.getItem("noteStr"));
    if(status == true){
        return data.filter(row => row.status == true);
    }
    if(status == false){
        return data.filter(row => row.status == false);
    }
    return data;
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

function storeNote(text, cb) {
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
    if(cb){
        cb({
            id: id,
            text: text,
            status: false
        });
    }
  }

  
export {
    getTodolist,
    setFinishTodolist,
    storeNote
}