import $ from 'jquery';
import { setFinishTodolist, getTodolist } from './todolist';



function init(){
    console.log('Hello World! Analysis!');
    //console.log(getTodolist());
    //console.log(setFinishTodolist(1));
    //輸入 id 則會將該id的status改成true,成功回傳true,失敗回傳false
}
function adddate(){
	
	//向右跳转时间（加时间）的按钮
	var s = document.getElementById("beginTime").innerHTML;
	
	var arr = s.split("/"); //将获取的数组按“/”拆分成字符串数组
	
	var year = parseInt(arr[0]);//开分字符串数组的第一个地址的内容是年份
	var mouth = parseInt(arr[1]);//开分字符串数组的第二个地址的内容是月份
	var date = parseInt( arr[arr.length-1]);//开分字符串数组的第三个地址的内容是日期
	
	if(date == 28){//当日期为28号时 只判断是否是2月
		switch(mouth)
		{
			  case 2:
				  if(year % 4 == 0 && year % 100 !=0 || year%400 ==0){
					  date = date +1;
					  break;
					  //如果是闰年2月 日期就加一
					 } else{
						  date = 1;
					     mouth = mouth +1; 
					     break;
					 //不是闰年2月 日期就变为1 月份加一
						 }
			  default:
					date = date +1;
					break;
						 //其他月份默认日期加一
		}
		
	}else if(date == 29){ //当日期为29号是 也是判断是否是2月
		switch(mouth)
		{
			  case 2:
				   date = 1;
				   mouth = mouth +1;
				   break;
			  default:
				   date = date +1;
				   break;
		} //当29号出现必定是闰年 日期变为1 月份加一 其他月份默认日期加一
		
	}else if(date == 30){ //当日期为30 时
			 switch(mouth)
			   {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12: 
						 date = date +1;
						 break; //这些月份的时候一个月有31天 到30的时候再加一
					case 4:
					case 6:
					case 9:
					case 11: 
						 date = 1;
						 mouth = mouth +1;
						break; //这些月份的时候一个月有30天 到30的时候 日期变为1 月份加一
					
			   }
	   }else if(date == 31){
		   
			 switch(mouth)
			   {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
						 date = 1;
						 mouth = mouth+1;
						 break; //这些月份的时候一个月有31天 到31的时候  日期为1月份加一
					case 12: 
						 date = 1;
						 mouth = 1;
						 year = year+1;;
						 break;  //十二月 的 31 号 日期变为一 月份变为一 年份加一
										
			   }
	   }else{
		   date +=1;
		   }
	
	document.getElementById("beginTime").innerHTML = year+"/"+mouth+"/"+date;
 
	}
	
	
function reducedate(){
	//向左跳转时间（减时间）的按钮
	var s = document.getElementById("beginTime").innerHTML;
	
	var arr = s.split("/"); //将获取的数组按“/”拆分成字符串数组
	
	var year = parseInt(arr[0]);//开分字符串数组的第一个地址的内容是年份
	var mouth = parseInt(arr[1]);//开分字符串数组的第二个地址的内容是月份
	var date = parseInt( arr[arr.length-1]);//开分字符串数组的第三个地址的内容是日期
	
	if(date == 1){//当日期为1时，再剪就会改变月份，甚至年份
		switch(mouth){
			case 1:
			     date = 31;
				 mouth = 12;
				 year = year-1;
				 break;  //一月一日 再剪一天 年份减一 月份为12 日期为31
		    case 2:
			case 4:
			case 6:
			case 8:
			case 9:
			case 11:
			     date = 31;
				 mouth = mouth-1;
				 break; //这些月一日 再剪一天  月份减一 日期为31
			case 3:
			      if(year % 4 == 0 && year % 100 !=0 || year%400 ==0){
					  date = 29;
					  mouth = mouth -1;
					 }else {
						 date = 28;
						 mouth = mouth -1;
						 }
			       break; //三月一日 再剪一天  月份减一 日期为根据是否是闰年来判断 日期
			case 5:
			case 7:
			case 10:
			     date = 30;
				 mouth = mouth -1;
			     break; //这些月一日 再剪一天  月份减一 日期为30
			}
		}else{
			date = date-1;
			}
	
	document.getElementById("beginTime").innerHTML = year+"/"+mouth+"/"+date; //拼接字符串插入到标签中
	
	}

   
export {
    init
};