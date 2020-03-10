function scrollFrame(obj,data){
	//创建基本骨架
	var html;
	//创建文本
	html = makeTxtFrame(data);
	//创建控制器
	html += makeScrollBar();
	//追加内容
	obj.innerHTML = html;
	//鼠标滑动
	wheelScroll(obj);
	//控制器滑动
	sBarSliber(obj);
	
}
//创建文本
function makeTxtFrame(data){
	var html = '<ul class="nav">';
	for(var i=0;i<=data.length-1;i++){
		html+= '<li>'+data[i].text+'</li>';
	}
	   html += '</ul>';
	   return html;
}
//创建控制器
function makeScrollBar(){
	return '<div class="scrollthumb">'+
			'<div class="sBar"></div>'+
		  '</div>';
}
//控制器滑动
function sBarSliber(obj){
	var nav = obj.children[0];
	var nlis = nav.children;
	
	var sthumb = obj.children[1];
	var sbar = sthumb.children[0];
	
	sbar.addEventListener('mousedown',function(){
		sbar.move = true;
		this.classList.add("Dowm");
	})
	sbar.addEventListener('mouseup',function(){
		sbar.move = false;
		this.classList.remove("Dowm");
	})
	sbar.addEventListener('mousemove',function(e){
		var y = e.clientY - obj.offsetTop - sthumb.offsetTop - sbar.offsetHeight/2;
		if(sbar.move){
			barMove(sbar,y);
		}
		
	})
	
}
//滑动块
function barMove(sbar,y){
	var sthumb = sbar.parentNode;
	var parent = sthumb.parentNode;
	if(y<0){
		y = 0;
	}else if(y>=sthumb.offsetHeight - sbar.offsetHeight){
		y = sthumb.offsetHeight - sbar.offsetHeight;
	}
	sbar.style.top = y + "px";
	sbar.rad = sbar.offsetTop/(sthumb.offsetHeight - sbar.offsetHeight);
	navContent(parent,sbar.rad)
}
//内容滑动
function navContent(obj,rad){
	var nav = obj.children[0];
	nav.style.top = -rad*(nav.offsetHeight - obj.offsetHeight) + "px";
}
function wheelScroll(obj){
	var sthumb = obj.children[1];
	var sbar = sthumb.children[0];
	
	obj.onmousewheel = function(e){
		e.preventDefault();
		var speed = e.wheelDelta>0?-10:10;
		var target = sbar.offsetTop + speed;
		barMove(sbar,target);
	}
}
