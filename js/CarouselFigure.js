// 创建一个轮播图对象的实例
var carousel=new addCarousel('carousel',0.5,4,10,true);
function addCarousel(id,time,index,inteval,indexButton){//id-轮播图的滚动块的ID，time-轮播图每次滚动的时间，index-轮播图中出现在显示区域最右边块的索引号，inteval-流畅度,indexButton当轮播图只显示一个BOX的时候为ture才开启下标按钮
	var index=index;
	this.carousel=document.getElementById(id);
	this.boxW=this.carousel.getElementsByTagName('li')[0].offsetWidth;
	this.num=this.carousel.getElementsByTagName('li').length;
	this.showNum=(document.getElementById(id+'_show').offsetWidth)/this.boxW;
	this.time=time;
	this.carousel.style.width=this.num*this.boxW+'px';
	this.carousel.style.left=-(index-1)*this.boxW+'px';
	var go=document.getElementById(id+'_go');
	var back=document.getElementById(id+'_back');
	var Carousel=this.carousel;
	var boxW=this.boxW;
	var tureNum=this.num-this.showNum-1;
	var button=document.getElementById(id+'_buttons');
	var showNum=this.showNum;
	if(indexButton==true&&showNum==1){
		var buttons=button.getElementsByTagName('span');
		buttons[index-1].className='on';
	}
	else{
		button.style.cssText='display:none';
	}
	back.onclick=function(){
		if(Carousel.getAttribute("Animation")=='true'){
			if(indexButton==true&&showNum==1){
				--index;
				if(index<1){
					index=tureNum;
				}
				addButtonOn(buttons,index);
			}
			dis=boxW;
			carouselAnimation.call(carousel,dis,time,inteval);
		}	
	};
	go.onclick=function(){
		if(Carousel.getAttribute("Animation")=='true'){
			if(indexButton==true&&showNum==1){
				++index;
				if(index>tureNum){
					index=1;
				}
				addButtonOn(buttons,index);
			}
			dis=-boxW;
			carouselAnimation.call(carousel,dis,time,inteval);
		}
	};
	if(this.carousel.getAttribute("AutoTime")!=0){
			var Time=this.carousel.getAttribute("AutoTime");
			dis=-boxW;
			setInterval(function(){
				if(Carousel.getAttribute("Animation")=='true'){
					if(indexButton==true&&showNum==1){
						++index;
						if(index>tureNum){
						index=1;
						}
						addButtonOn(buttons,index);
					}
					carouselAnimation.call(carousel,dis,time,inteval);
				}
			},Time*1000);
	}
	if(indexButton==true&&showNum==1){
		button.onclick=function(event){
			var event=event?event:window.event;
			var target=event.target;
			var toIndex=target.getAttribute("index");
			if(toIndex!=index){
				dis=(toIndex-index)*boxW;
				index=toIndex;
				addButtonOn(buttons,index);
				carouselAnimation.call(carousel,-1*dis,time,inteval);
			}
		};
	}	
}
function carouselAnimation(dis,time,inteval){
	var carousel=this.carousel;
	carousel.setAttribute("Animation",'false');
	var speed=dis/(time*1000/inteval);
	var left=parseInt(carousel.style.left);
	var newpos=parseInt(carousel.style.left)+dis;	
	if(newpos>0&&dis>0){
		carousel.style.left=((this.num-(this.showNum+1))*this.boxW*-1)+'px';
		newpos=parseInt(carousel.style.left)+dis;
		left=parseInt(carousel.style.left);
	}
	if(newpos<(this.boxW*(this.num-this.showNum+1)*(-1)+1)&&dis<0){
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

function addButtonOn(buttons,index){
	for(var i=0;i<buttons.length;i++){
		if(i==index-1){
			buttons[i].className='on';
		}
		else{
			buttons[i].className='';
		}
	}

}
