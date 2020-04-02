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

//api return all todo list in an array
function getTodolist() {
    var Todolist = [];
    Todolist = JSON.parse(localStorage.getItem("noteStr"));

    return Todolist;
}

function deleteItemById(id){
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
    return {
        id: id,
        text: text,
        status: false
    }
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


function editItemById(id, text){
    var noteArray = getTodolist();
    for (var i = 0; i < noteArray.length; i++) {
        if (noteArray[i].id == id) {
            noteArray[i].name = text;
            localStorage.setItem("noteStr", JSON.stringify(noteArray));
            break;
        }
    }
}

export {
    storeNote,
    setFinishTodolist,
    deleteItemById,
    getTodolist,
    editItemById
}