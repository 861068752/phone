function tCarouselFrame(obj,data){
	//创建基本骨架
	var html;
	//创建图片骨架
	html = makeImgFrame(data);
	//创建圆点骨架
	html += makeDotsFrame(data);
	//追加内容到基本骨架
	obj.innerHTML = html;
	//记录图片位置
	obj.index = 0;
	//设置基本骨架样式
	makeDomStyle(obj);
	//滑动事件
	sliberAll(obj);
	
}
//创建图片骨架
function makeImgFrame(data){
	var html = '<ul class="imgul">';
	for(var i=0;i<=data.length-1;i++){
		html += '<li><a href="#"><img src="'+data[i]+'"/></a></li>';
	}
	    html += '</ul>'
	    return html;
}
//创建圆点骨架
function makeDotsFrame(data){
	var html = '<ul class="dotul">';
	    for(var i=0;i<=data.length-1;i++){
	    	if(i==0){
	    html += '<li class="now"></li>';		
	    	}else{
	    html += '<li></li>';		
	    	}
	    }
	    html += '</ul>';
	    return html;
}
//设置基本骨架样式
function makeDomStyle(obj){
	var imgul = obj.children[0];
	var lis = imgul.children;
	var a = lis[0].children[0];
	var img = a.children[0];
	var dotul = obj.children[1];
	var dlis = dotul.children;
	
	img.addEventListener('load',function(){
		var x = parseInt(getCurrentStyle(img,'width'));
		var y = parseInt(getCurrentStyle(img,'height'));
		for(var i=0;i<=lis.length-1;i++){
			lis[i].style.width = x + "px";
			lis[i].style.height = y + "px";
		}
		obj.style.width = x + "px";
		obj.style.height = y + "px";
		imgul.style.width = obj.offsetWidth*lis.length + "px";
		imgul.style.height = obj.offsetHeight + "px";
	})
	    dotul.style.marginLeft = -dotul.offsetWidth/2 + "px";
	
}
//获取图片自然属性
function getCurrentStyle(obj,property){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[property];
	}else{
		return obj.currentStyle[property];
	}
}
//滑动事件
function sliberAll(obj){
	var imgul = obj.children[0];
	var lis = imgul.children;
	var a = lis[0].children[0];
	var img = a.children[0];
	var dotul = obj.children[1];
	var dlis = dotul.children;
	
	imgul.ontouchstart = function(e){
		e.preventDefault();
		imgul.start = e.touches[0].pageX;
	}
	imgul.ontouchmove = function(e){
		e.preventDefault();
		imgul.isMove = true;
		imgul.end = e.touches[0].pageX;
		imgul.rad = imgul.end - imgul.start;
		tlb.removeTransition(imgul);
		tlb.setTransform(imgul,-obj.index*obj.offsetWidth + imgul.rad);
	}
	imgul.ontouchend = function(e){
		e.preventDefault();
		if(imgul.isMove){
			if(Math.abs(imgul.rad)>=obj.offsetWidth/3){
				if(imgul.rad<0){
					obj.index ++ ;
				}else if(imgul.rad >0){
					obj.index -- ;
				}
				imgMove(obj);
			}
			    imgMove(obj);
		}
	}
}
function imgMove(obj){
	var imgul = obj.children[0];
	var lis = imgul.children;
	if(obj.index<=0){
		obj.index = 0;
	}else if(obj.index>lis.length-1){
		obj.index = lis.length-1;
	}
	tlb.addTransition(imgul,1);
	tlb.setTransform(imgul,-obj.index*obj.offsetWidth);
	dotsHight(obj);
}
function dotsHight(obj){
	var dotul = obj.children[1];
	var dots = dotul.children;
	
	for(var i=0;i<dots.length;i++){
		for(var j=0;j<dots.length;j++){
			dots[j].classList.remove("now");
		}
		dots[obj.index].classList.add("now");
	}
	
	
}
