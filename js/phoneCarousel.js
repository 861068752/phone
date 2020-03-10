function pCarousel(obj,data){
	//创建html骨架
	var html;
	//创建图片骨架
	html = makeImgsFrame(data);
	//创建圆点骨架
	html += makeDots(data);
	//骨架添加内容
	obj.innerHTML = html;
	//设置骨架样式
	makeDomStyle(obj);
	//记录图片当前位置
	obj.index = 1;
	//滑动事件
	sliberEvent(obj);
}
//创建图片骨架
function makeImgsFrame(data){
	var html = '<ul class="imgul">';
	    html += '<li><a href="#"><img src="'+data[data.length-1]+'"/></a></li>';
	    for(var i=0;i<=data.length-1;i++){
	    	 html += '<li><a href="#"><img src="'+data[i]+'"/></a></li>';
	    }
	    html += '<li><a href="#"><img src="'+data[0]+'"/></a></li>';
	    html += '</ul>';
	    return html;
}
//创建圆点
function makeDots(data){
	var html = '<ul class="dotul">';
	    for(var i=0;i<=data.length-1;i++){
	    if(i==0){
	    html += '<li class="now"></li>'	
	    }
	    else{
	    html += '<li></li>';	
	    }
	    }
	    html += '</ul>';
	    return html;
}
//设置样式
function makeDomStyle(obj){
	var imgul = obj.children[0];
	var lis = imgul.children;
	var a = lis[0].children[0];
	var img = a.children[0];
	
	var dotul = obj.children[1];
	var dots = dotul.children;
	
	var imgw;
	var imgh;
	img.addEventListener('load',function(){
		
		imgw = parseInt(getCurrentStyle(img,'width'));
		imgh = parseInt(getCurrentStyle(img,'height'));
		
		obj.style.width = imgw + "px";
	    obj.style.height = imgh + "px";
	    
	    imgul.style.width = obj.offsetWidth*lis.length + "px";
	    imgul.style.height = obj.offsetHeight + "px";
	    
	    imgul.style.left = -obj.offsetWidth + "px";
	})
	
	dotul.style.marginLeft = -dotul.offsetWidth/2 + "px";
	
	
}
//获取属性
function getCurrentStyle(obj,property){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[property];
	}else{
		return obj.currentStyle[property];
	}
}
//滑动事件
function sliberEvent(obj){
	var imgul = obj.children[0];
	
	imgul.addEventListener('touchstart',function(e){
		e.preventDefault();
		imgul.start = e.touches[0].pageX;
	})
	imgul.addEventListener('touchmove',function(e){
		e.preventDefault();
		imgul.ismove = true;
		imgul.end = e.touches[0].pageX;
		imgul.rad = imgul.end - imgul.start;
		imgul.style.left = -obj.offsetWidth*obj.index + imgul.rad + "px";
	})
	imgul.addEventListener('touchend',function(e){
		e.preventDefault();
		if(imgul.ismove){
			if(Math.abs(imgul.rad)>obj.offsetWidth/3){
				if(imgul.rad>0){
					obj.index --;
				}else if(imgul.rad<0){
					obj.index ++;
				}
				imgMove(imgul,-obj.offsetWidth*obj.index)
			}
			imgMove(imgul,-obj.offsetWidth*obj.index)
		}
	})
}
//图片移动事件
function imgMove(obj,target){
	var parent = obj.parentNode;
	var lis = obj.children;
	console.log(parent.index);
	if(parent.index>lis.length - 2){
		parent.index = 0;
		obj.style.left = -parent.offsetWidth*parent.index + "px";
		parent.index ++;
	}else if(parent.index<0){
		parent.index = lis.length - 2;
		obj.style.left = -parent.offsetWidth*parent.index + "px";
		parent.index --;
	}
	animation(obj,target);
	dotsHight(obj);
}
//动画缓冲
function animation(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
	if(obj.offsetLeft == target){
		clearInterval(obj.timer);
		return;
	}
	var speed = (target - obj.offsetLeft)/10;
	speed = speed>0?Math.ceil(speed):Math.floor(speed);
	obj.style.left = obj.offsetLeft + speed + "px";
	
	},20)
}
//高亮
function dotsHight(obj){
	var parent = obj.parentNode;
	var dotul = parent.children[1];
	var dots = dotul.children;
	var index = parent.index -1;
	
	if(index<0){
		index = dots.length - 1;
	}else if(index>dots.length - 1){
		index = 0;
	}
	
	
	for(var i=0;i<=dots.length-1;i++){
		dots[i].classList.remove("now");
	}
	dots[index].classList.add("now");
}
