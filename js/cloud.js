function cloudFrame(obj,data){
	//创建骨架
	var html;
	//创建导航
	html = makeNavFrame(data);
	//创建导航条
	html += makeBarFrame();
	//追加内容
	obj.innerHTML = html;
	//设置样式
	makeDomStyle(obj);
	//导航滑动事件
	barSliber(obj);
	
}
//创建导航
function makeNavFrame(data){
	var html = '<ul class="nav">';
	    for(var i=0;i<=data.length-1;i++){
	    html += '<li>'+data[i]+'</li>';	
	    }
	    html += '</ul>';
	    return html;
}
//创建导航条
function makeBarFrame(){
	return '<div class="bar"></div>';
}
//设置样式
function makeDomStyle(obj){
	var nav = obj.children[0];
	var nlis = nav.children;
	var bar = obj.children[1];
	
	obj.style.width = nlis.length*nlis[0].offsetWidth + "px";
	obj.style.height = nlis[0].offsetHeight + 2 + "px";
}
//导航滑动事件
function barSliber(obj){
	var nav = obj.children[0];
	var nlis = nav.children;
	
	var bar = obj.children[1];
	bar.index = 0;
	for(var i=0;i<=nlis.length-1;i++){
		nlis[i].index = i;
		nlis[i].onmouseover = function(){
			bar.style.left = bar.offsetWidth*this.index + "px";
		}
		nlis[i].onclick = function(){
			bar.index = this.index;
			bar.style.left = bar.offsetWidth*bar.index + "px";
		}
		nlis[i].onmouseout = function(){
			bar.style.left = bar.offsetWidth*bar.index + "px";
		}
	}
}
