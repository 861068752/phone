function PcCarousel(obj,data){
	//创建html骨架
	var html;
	//创建图片的骨架
	html = makeImgsFrame(data);
	//创建圆点骨架
	html += makeDotsFrame(data);
	//创建控制器骨架
	html += makeControlFrame();
	//追究内容在骨架上
	obj.innerHTML = html;
	//记录图片的位置
	obj.index = 1;
	//设置骨架样式
	makeDomStyle(obj);
	//事件集
	makeEventAll(obj);
}
    //创建图片的骨架
    function makeImgsFrame(data){
    	var html = '<ul class="imgul">';
    	    html += '<li><a href=""><img src="'+data[data.length-1]+'" alt="图片加载失败" /></a></li>';	
    	    for(var i=0;i<=data.length-1;i++){
    	    html += '<li><a href=""><img src="'+data[i]+'" alt="图片加载失败" /></a></li>';	
    	    }
    	    html += '<li><a href=""><img src="'+data[0]+'" alt="图片加载失败" /></a></li>';	
    	html += '</ul>';
    	return html;
    }
	//创建圆点骨架
	function makeDotsFrame(data){
	   var html = '<ul class="dotsul">';
	       for(var i=0;i<=data.length-1;i++){
	       if(i==0){
	       html += '<li class="now">'+(i+1)+'</li>';	
	       }
	       else{
	       html += '<li>'+(i+1)+'</li>';	
	       }
	       }
	       html+= '</ul>';
	       return html;
	}
	//创建控制器骨架
	function makeControlFrame(){
		return '<ul class="arrowul">'+
				'<li class="left">&lt</li>'+
				'<li class="right">&gt</li>'+
			   '</ul>';
	}
	//设置骨架样式
	function makeDomStyle(obj){
	var imgul = obj.children[0];
	var lis = imgul.children;
	var a = lis[0].children[0];
	var img = a.children[0];
	var dotsul = obj.children[1];
	var dots = dotsul.children[0];
	var arrowul = obj.children[2];
	imgul.style.width = obj.offsetWidth*lis.length + "px";
	imgul.style.left = -obj.offsetWidth + "px";
	
	dotsul.style.marginLeft = -dotsul.offsetWidth/2 - dots.offsetLeft/2 +"px";
	
	arrowul.style.marginTop = -arrowul.offsetHeight/2 + "px";
	
	}
	//事件集
	function makeEventAll(obj){
	var imgul = obj.children[0];
	var lis = imgul.children;
	var a = lis[0].children[0];
	var img = a.children[0];
	var dotsul = obj.children[1];
	var dots = dotsul.children;
	var arrowul = obj.children[2];	
	
	//圆点点击事件
	dotsEvent(obj);
	//控制器点击事件
	arrowEvent(obj);
	}
	//圆点点击事件
    function dotsEvent(obj){
    	var imgul = obj.children[0];
    	var dotsul = obj.children[1];
	    var dots = dotsul.children;
		for(var i=0;i<=dots.length-1;i++){
			dots[i].index = i;
			dots[i].onclick = function(){
				obj.index = this.index+1;
				
				imgulMove(obj);
			}
			
		}
	}
    //控制器事件
    function arrowEvent(obj){
    	var imgul = obj.children[0];
    	var arrowul = obj.children[2];	
    	var leftBtn = arrowul.children[0];
    	var rightBtn = arrowul.children[1];
    	
    	leftBtn.onclick = function(){
    		obj.index --;
    		imgulMove(obj)
    	}
    	rightBtn.onclick = function(){
    		obj.index ++;
    		imgulMove(obj)
    	}
    }
 
    //圆点点击高亮
    function dotsHight(obj){
    	var imgul = obj.children[0];
    	var dotsul = obj.children[1];
	    var dots = dotsul.children;
	    var index = obj.index -1;
	    if(index<0){
	    	index = dots.length-1;
	    }
	    else if(index>dots.length-1){
	    	index = 0;
	    }
	    for(var i=0;i<=dots.length-1;i++){
	    	dots[i].classList.remove("now");
	    }
	    dots[index].classList.add("now");
    }
   //图片移动事件
   function imgulMove(obj){
    
   	var imgul = obj.children[0];
   	var lis = imgul.children;
    console.log(obj.index);
   	if(obj.index<0){
   		obj.index = lis.length - 2;
   		imgul.style.left = -obj.offsetWidth*obj.index + "px";
   		obj.index --;
   	}
   	else if(obj.index > lis.length - 2){
   		obj.index = 0;
   		imgul.style.left = -obj.offsetWidth*obj.index + "px";
   		obj.index ++;
   	}
    target = -obj.offsetWidth*obj.index;
   	dotsHight(obj);
   	animation(imgul,target);
   }
   //缓冲动画
   function animation(imgul,target){
   	clearInterval(imgul.timer);
   	imgul.timer = setInterval(function(){
   		if(imgul.offsetLeft == target){
   			clearInterval(imgul.timer);
   			return;
   		}
   		var speed = (target - imgul.offsetLeft)/10;
   		speed = speed>0?Math.ceil(speed):Math.floor(speed);
   		imgul.style.left = imgul.offsetLeft +speed + "px";
   	},20)
   }
   