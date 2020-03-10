function accordionFrame(obj,data){
	//创建骨架
	var html;
	//创建图片骨架
	html = makeImgsFrame(data);
	//骨架添加内容
	obj.innerHTML = html;
	obj.index = null;
	makeImgChange(obj);
}
function makeImgsFrame(data){
	var html = '<ul class="imgul">';
	    for(var i=0;i<=data.length-1;i++){
	    html += '<li><img src="'+data[i]+'"></li>';	
	    }
	    html += '</ul>';
	    return html;
}
function makeImgChange(obj){
	var imgul = obj.children[0];
	var lis = imgul.children;
	
	for(var i=0;i<=lis.length-1;i++){
		lis[i].index = i;
		lis[i].addEventListener('mouseover',function(){
			for(var j=0;j<=lis.length-1;j++){
				//lis[j].style.width = "150px";
				
				animation(lis[j],150);
			}
			//lis[this.index].style.width = "800px";
			
			animation(this,800);
		})
		lis[i].addEventListener('mouseout',function(){
			for(var j=0;j<=lis.length-1;j++){
//				lis[j].style.width = "280px";
             
			  animation(lis[j],280);
			}
//			lis[this.index].style.width = "280px";
          
			animation(this,280);
		})
	}
}
//缓冲运动
function animation(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		if(obj.offsetWidth == target){
			clearInterval(obj.timer);
			return;
		}
		var s = (target - obj.offsetWidth)/20;
		s = s>0?Math.ceil(s):Math.floor(s);
		obj.style.width = obj.offsetWidth +s + "px";
	},20)
}
