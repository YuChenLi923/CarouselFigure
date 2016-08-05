function addCarousel(id,time,index,inteval){//id-轮播图的滚动块的ID，time-轮播图每次滚动的时间，index-轮播图中出现在显示区域最右边块的索引号，inteval-流畅度
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
	var dis=this.boxW;
	go.onclick=function(){
		carouselAnimation.call(carousel,dis,time,inteval);
	};
	back.onclick=function(){
		carouselAnimation.call(carousel,-1*dis,time,inteval);
	}
	if(this.carousel.getAttribute("AutoTime")!=0){
		var Time=this.carousel.getAttribute("AutoTime");
		setInterval(function(){
			carouselAnimation.call(carousel,dis,time,inteval)
		},Time*1000)
	}	
}
function carouselAnimation(dis,time,inteval){
	var carousel=this.carousel;
	if(carousel.getAttribute("Animation")=='true'){
		carousel.setAttribute("Animation",'false');
		var speed=dis/(time*1000/inteval);
		var left=parseInt(carousel.style.left);
		var newpos=parseInt(carousel.style.left)+dis;
		
		if(newpos==this.boxW&&dis>0){
			carousel.style.left=((this.num-(this.showNum+1))*this.boxW*-1)+'px';
			newpos=parseInt(carousel.style.left)+dis;
			left=parseInt(carousel.style.left);
		}
		if(newpos==this.boxW*(this.num-this.showNum+1)*(-1)&&dis<0){
			carousel.style.left=-1*this.boxW+'px';
			newpos=parseInt(carousel.style.left)+dis;
			left=parseInt(carousel.style.left);
		}
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

// 创建一个轮播图对象的实例
var carousel=new addCarousel('carousel',0.5,4,10);
