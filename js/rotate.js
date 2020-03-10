function rotateFrame(obj,data,jsond){
	//创建基本骨架
	var html;
	//创建图片骨架
	html = makeImgsFrame(data);
	//创建控制器
	html += makeArrow();
	//追加内容
	obj.innerHTML = html;
	//设置样式
	makeDomStyle(obj,jsond);
	//点击切换
	imgSwitch(obj,jsond);
	
}
//创建图片骨架
function makeImgsFrame(data){
	var html = '<ul class="imgul">';
	    for(var i=0;i<=data.length-1;i++){
	    html += '<li><a href="#"><img src="'+data[i]+'"/></a></li>';
	    }
	    html += '</ul>';
	    return html;
	
}
//创建控制器
function makeArrow(){
	var html = '<ul class="arrow">';
	    html += '<li class="left">&lt</li><li class="right">&gt</li>';
	    html += '</ul>';
	    return html;
}
//设置样式
function makeDomStyle(obj,jsond){
	var imgul = obj.children[0];
	var lis = imgul.children;
	var a = lis[2].children[0];
	var img = a.children[0];
	
	img.addEventListener('load',function(){
		var imgh = parseInt(getCurrentStyle(img,'height'));
		obj.style.height = jsond[2].top+imgh +jsond[0].top +"px"
	})
	obj.style.width = jsond[2].left*2+jsond[2].width + "px";
	
	
	
}
//点击切换
function imgSwitch(obj,jsond){
	var arrow = obj.children[1];
	var leftBtn = arrow.children[0];
	var rightBtn = arrow.children[1];
	var imgul = obj.children[0];
	var lis = imgul.children;
	
	var imgArr = [];
	for(var i=0;i<=lis.length-1;i++){
		imgArr.push(lis[i]);
	}
	imgMove(imgArr,jsond);
	leftBtn.onclick = function(){
		var first = imgArr.shift();
		imgArr.push(first);
		imgMove(imgArr,jsond);
	}
	rightBtn.onclick = function(){
		var end = imgArr.pop();
		imgArr.unshift(end);
		imgMove(imgArr,jsond);
	}
	
	
}


//自然属性
function imgMove(obj,jsond){
	
	for(var i=0;i<=obj.length-1;i++){
		obj[i].style.width = jsond[i].width + "px";
		obj[i].style.top = jsond[i].top + "px";
		obj[i].style.left = jsond[i].left + "px";
		//animation(obj[i],jsond[i].left);
		obj[i].style.zIndex = jsond[i].zIndex;
		obj[i].style.opacity = jsond[i].opacity + "px";
	}
	}
//获取自然属性
function getCurrentStyle(obj,property){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[property];
	}else{
		return obj.currentStyle[property];
	}
}
//缓冲运动
function animation(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		if(obj.offsetLeft == target){
			clearInterval(obj.timer);
			return;
		}
		
		var s = (target - obj.offsetLeft)/10;
		s = s>0?Math.ceil(s):Math.floor(s);
		obj.style.left = obj.offsetLeft + s + "px";
	},20)
}
