import * as analysis from './parts/analysis';
import * as todolist from './parts/todolist'
import * as tomato from './parts/tomato';
import * as layout from './layout';
import * as icon from './icon';
import $ from 'jquery';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
$('document').ready(function(){
    analysis.init();
    todolist.init();
    tomato.init();
    layout.init();
    icon.init();
})