function backTop(obj){
	
	
	wscroll(obj);
}
function wscroll(obj){
	window.onscroll = function(){
		if(scroll().top >= 400){
			obj.style.display = "block";
		}else{
			obj.style.display = "none";
		}
	}
	obj.onclick = function(){
		animation(obj,0)
	}
}
//缓冲动画
function animation(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		if(scroll().top == target){
			clearInterval(obj.timer);
			return;
		}
		var s = (target - scroll().top )/10;
		s = s>0?Math.ceil(s):Math.floor(s);
		
		window.scrollTo(0,scroll().top+s);
	},20)
}
function scroll(){
	if(window.getComputedStyle){
		return{
			left:window.pageXOffset,
			top:window.pageYOffset
		}
	}else if(document.compatMode == "backCompat"){
		return{
			left:document.body.scrollLeft,
			top:document.body.scrollTop
		}
	}else{
		return{
			left:document.documentElement.scrollLeft,
			top:document.documentElement.scrollTop
		}
	}
}
