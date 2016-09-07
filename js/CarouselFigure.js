//轮播图 0.4 by chen
createCarousel();//开启轮播图模块
function createCarousel(){
	var carousel=new addCarousel(// 创建一个轮播图对象的实例 
		{ 
			ID:'carousel',//id-轮播图的滚动块的ID
			time:0.5,//time-轮播图每次滚动的时间
			index:4,//index-轮播图中出现在显示区域最右边块的索引号
			inteval:10,//inteval-流畅度
			indexButton:true//indexButton当轮播图只显示一个BOX的时候为ture才开启下标按钮
		}
	);
	function addCarousel(carousel){
		var Carousel=carousel;
		var dis;
		Carousel.elem=document.getElementById(carousel.ID);
		Carousel.boxW=carousel.elem.getElementsByTagName('li')[0].offsetWidth;
		Carousel.num=carousel.elem.getElementsByTagName('li').length;
		Carousel.showNum=(document.getElementById(carousel.ID+'_show').offsetWidth)/carousel.boxW;
		Carousel.go=document.getElementById(carousel.ID+'_go');
		Carousel.back=document.getElementById(carousel.ID+'_back');
		Carousel.tureNum=Carousel.num-Carousel.showNum-1;
		Carousel.button=document.getElementById(carousel.ID+'_buttons')	
		Carousel.elem.style.width=Carousel.num*Carousel.boxW+'px';
		Carousel.elem.style.left=-(Carousel.index-1)*Carousel.boxW+'px';
		if(Carousel.indexButton==true&&Carousel.showNum==1){
			var buttons=Carousel.button.getElementsByTagName('span');
			buttons[Carousel.index-1].className='on';
		}
		else{
			Carousel.button.style.cssText='display:none';
		}
		Carousel.back.onclick=function(){
			clickEvent.call(Carousel,-1,buttons);
		};
		Carousel.go.onclick=function(){
			clickEvent.call(Carousel,1,buttons);
		};
		if(Carousel.elem.getAttribute("AutoTime")!=0){
				var Time=Carousel.elem.getAttribute("AutoTime");
				dis=-Carousel.boxW;
				setInterval(function(){
					if(Carousel.elem.getAttribute("Animation")=='true'){
						if(Carousel.indexButton==true&&Carousel.showNum==1){
							++Carousel.index;
							if(Carousel.index>Carousel.tureNum){
							Carousel.index=1;
							}
							addButtonOn(buttons,Carousel.index);
						}
						carouselAnimation.call(Carousel,dis,Carousel.time,Carousel.inteval);
					}
				},Time*1000);
		}
		if(Carousel.indexButton==true&&Carousel.showNum==1){
			Carousel.button.onclick=function(event){
				if(Carousel.elem.getAttribute("Animation")=='true'){
					var event=event?event:window.event;
					var target=event.target;
					var toIndex=target.getAttribute("index");
					if(toIndex!=index&&toIndex){
							dis=(toIndex-index)*Carousel.boxW;
							Carousel.elem.style.left=-1*Carousel.boxW*(Carousel.index-1);
							Carousel.index=toIndex;
							addButtonOn(buttons,Carousel.index);
							carouselAnimation.call(Carousel,-1*dis,Carousel.time,Carousel.inteval);
					}
				}
			};
		}		
	}
	function clickEvent(factor,buttons){
			if(this.elem.getAttribute("Animation")=='true'){
					if(this.indexButton==true&&this.showNum==1){
						this.index=this.index+factor;
						if(this.index<1){
							this.index=this.tureNum;
						}
						else if(this.index>this.tureNum){
							this.index=1;
						}
						addButtonOn(buttons,this.index);
					}
					dis=this.boxW*(-factor);
					carouselAnimation.call(this,dis,this.time,this.inteval);
			}	
	}
	function carouselAnimation(dis,time,inteval){
		var carousel=this.elem;
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
		console.log(buttons);
		for(var i=0;i<buttons.length;i++){
			if(i==index-1){
				buttons[i].className='on';
			}
			else{
				buttons[i].className='';
			}
		}
	}
};