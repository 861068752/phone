var tlb = {};

tlb.addTransition = function(obj,time){
	obj.style.transition = 'all+'+time+'s';
}
tlb.setTransform = function(obj,target){
	obj.style.transform = 'translateX('+target+'px)';
}
tlb.removeTransition = function(obj){
	obj.style.transition = '';
}
