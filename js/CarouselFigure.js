function addCarousel(id,time,index){//id-轮播图的滚动块的ID，time-轮播图每次滚动的时间，index-轮播图中出现在显示区域最右边块的索引号
	this.index=index;
	this.carousel=document.getElementById(id);
	this.boxW=this.carousel.getElementsByTagName('li')[0].offsetWidth;
	this.num=this.carousel.getElementsByTagName('li').length;
	this.showNum=(document.getElementById(id+'_show').offsetWidth)/this.boxW;
	this.time=time;
	this.carousel.style.width=this.num*this.boxW+'px';
	this.carousel.style.left=-(this.index-1)*this.boxW+'px';
	var go=document.getElementById(id+'_go');
	var back=document.getElementById(id+'_back');
	var Carousel=this.carousel;
	go.onclick=function(){
		carouselAnimation.call(carousel,200,time);
	};
	back.onclick=function(){
		carouselAnimation.call(carousel,-200,time);
	}	
}
function carouselAnimation(dis,time){
	var carousel=this.carousel;
	if(carousel.getAttribute("Animation")=='true'&&((parseInt(carousel.style.left)<0&&dis>0)||(parseInt(carousel.style.left)>200*(this.showNum-this.num)&&dis<0))){
		carousel.setAttribute("Animation",'false');
		var inteval=5;
		var speed=dis/(time*1000/inteval);
		var left=parseInt(carousel.style.left);
		var newpos=parseInt(carousel.style.left)+dis;
		var go = function(){
			if(dis>0&&parseInt(carousel.style.left)<newpos || dis<0&&parseInt(carousel.style.left)>newpos){
				carousel.style.left=parseInt(carousel.style.left)+speed+'px';
				setTimeout(go,inteval);
			}
			else{
				carousel.style.left=left+dis+'px';
				carousel.setAttribute("Animation",'true');
			}
		}
		go();
	}
}

var carousel=new addCarousel('carousel',0.5,4);
