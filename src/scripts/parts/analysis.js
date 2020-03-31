import $ from 'jquery';
import { finishTodolist, getTodolist } from './todolist';



function init(){
    console.log('Hello World! Analysis!');
    console.log(finishTodolist(2));
    console.log(getTodolist());
}

export {
    init
};