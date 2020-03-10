function dragFrame(obj1,obj2,data){
	var html;
	html = fromFrame(data);
	obj1.innerHTML = html;
	obj2.innerHTML = targetFrame();
	makeDomStyle(obj1,obj2);
	dragEvent(obj1,obj2);
	
}
function fromFrame(data){
	var html = '<ul class="fnav">';
	    for(var i=0;i<=data.length-1;i++){
	    html += '<li style="background:'+data[i]+'">'+data[i]+'</li>';	
	    }
	    html += '</ul>';
	    return html;
}
function targetFrame(){
	return '<ul class="tnav"></ul>';
}
function makeDomStyle(obj1,obj2){
	var fnav = obj1.children[0];
	var flis = fnav.children;
	
	obj1.style.width = flis[0].offsetWidth + 40 + "px";
	obj1.style.height = fnav.offsetHeight +40+ "px";
	obj2.style.width = flis[0].offsetWidth + 40 + "px";
	obj2.style.height = obj1.offsetHeight + "px";
	
	for(var i=0;i<=flis.length-1;i++){
		flis[i].setAttribute('draggable',true);
	}
}
function dragEvent(obj1,obj2){
	var fnav = obj1.children[0];
	var flis = fnav.children;
	var tnav = obj2.children[0];
	var li = null;
	
	for(var i=0;i<=flis.length-1;i++){
		flis[i].ondrag = function(){
			li = this;
		}
		
		obj2.ondragover = function(e){
			e.preventDefault();
		}
		obj2.ondrop = function(){
			tnav.appendChild(li);
			dragEventtwo(obj1,obj2);
		}
		
	}
}
function dragEventtwo(obj1,obj2){
	var fnav = obj1.children[0];
	var tnav = obj2.children[0];
	var tlis = tnav.children;
	console.log(tnav);
	var li = null;
	
	for(var i=0;i<=tlis.length-1;i++){
		tlis[i].setAttribute('draggable',true);
		tlis[i].ondrag = function(){
			li = this;
		}
		obj1.ondragover = function(e){
			e.preventDefault();
		}
		obj1.ondrop = function(){
			fnav.appendChild(li);
		}
	}
}
