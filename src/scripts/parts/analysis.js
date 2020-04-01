import $ from 'jquery';
import { setFinishTodolist, getTodolist } from './todolist';



function init(){
    console.log('Hello World! Analysis!');
    //console.log(getTodolist());
    //console.log(setFinishTodolist(1));
    //輸入 id 則會將該id的status改成true,成功回傳true,失敗回傳false
}

export {
    init
};