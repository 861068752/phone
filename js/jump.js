function jumpFrame(obj,data){
	//创建主体骨架
	var html;
	//创建导航
	html = makeNavFrame(data);
	//创建内容
	html += makeContentFrame(data);
	//骨架追加内容
	obj.innerHTML = html;
	//设置导航位置
	obj.index = 0;
	//设置样式
	makeDomStyle(obj);
	//导航点击事件
	makeNavEevent(obj);
}
//创建导航
function makeNavFrame(data){
	var html = '<ul class="navul">';
	    for(var i=0;i<=data.length-1;i++){
	    if(i==0){
	     html += '<li class="now">'+data[i].txt+'</li>';		
	    }else{
	     html += '<li>'+data[i].txt+'</li>';		
	    }
	    }
	    html += '</ul>';
	    return html;
}
//创建内容
function makeContentFrame(data){
	var html = '<ul class="contentul">';
	    for(var i=0;i<=data.length-1;i++){
	    html += '<li style="background:'+data[i].bg+'">'+data[i].txt+'</li>';	
	    }
	    html += '</ul>';
	    return html;
}
//设置样式
function makeDomStyle(obj){
	var cul = obj.children[1];
	var clis = cul.children;
	
	var h = window.innerHeight;
	for(var i=0;i<=clis.length-1;i++){
		clis[i].style.height = h + "px";
	}
	
	
}
//导航点击事件
function makeNavEevent(obj){
	var navul = obj.children[0];
	var nlis = navul.children;
	var cul = obj.children[1];
	var clis = cul.children;
	for(var i=0;i<=nlis.length-1;i++){
		nlis[i].index = i;
		nlis[i].onclick = function(){
			obj.index = this.index;
			navHight(obj);
			var target = (clis[0].offsetHeight)*this.index;
			console.log(target);
			jumpEvent(obj,target);
		}
	}
	wscroll(obj);
}
function jumpEvent(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		if(scroll().top == target){
			clearInterval(obj.timer);
			return;
		}
		var speed = (target - scroll().top)/10;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		window.scrollTo(0,scroll().top+speed);
	},20)
	
}
//滚动导航跳动
function wscroll(obj){
	var cul = obj.children[1];
	var clis = cul.children;
	window.onscroll = function(){
		var h = clis[0].offsetHeight;
		var t = scroll().top;
		obj.index = parseInt(Math.round(t/h));
        navHight(obj)
	}
	
	
}
//高亮
function navHight(obj){
	var navul = obj.children[0];
	var nlis = navul.children;
	
	for(var i=0;i<=nlis.length-1;i++){
		nlis[i].classList.remove("now");
	}
	nlis[obj.index].classList.add("now");
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
			top:document.documentElement.scrollTo
		}
	}
}
