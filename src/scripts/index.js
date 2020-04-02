import * as analysis from './parts/analysis';
import * as todolist from './parts/todolist'
import * as tomato from './parts/tomato';
import * as layout from './layout';
import * as icon from './icon';
import $ from 'jquery';

import { library, dom } from '@fortawesome/fontawesome-svg-core'; // 拿來 load icon
import { fas, faPen } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";


$('document').ready(function(){
    analysis.init();
    todolist.init();
    tomato.init();
    layout.init();
    library.add(fas);
    library.add(far);
    icon.init();
    dom.i2svg();
})