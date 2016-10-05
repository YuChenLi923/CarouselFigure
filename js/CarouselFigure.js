//轮播图 0.7 by chen
function Carousel(carouselInf){
	this.inf=carouselInf;
}
Carousel.prototype.createCarousel=function(carouselInf){
	var dis,
		doc=document,
		carousel=doc.getElementById(carouselInf.ID),
		boxW=carousel.getElementsByTagName('li')[0].offsetWidth,
		showBox=doc.getElementById(carouselInf.ID+'_show'),
		showNum=(showBox.offsetWidth)/boxW,
		tureNum=carousel.getElementsByTagName('li').length,
		num=tureNum+showNum+1,
		go=doc.getElementById(carouselInf.ID+'_go'),
		back=doc.getElementById(carouselInf.ID+'_back'),
		button=doc.getElementById(carouselInf.ID+'_buttons'),	
		time=carouselInf.time,
		inteval=carouselInf.inteval,
		index=carouselInf.index,
		indexButton=carouselInf.indexButton,
		Time=carousel.getAttribute("AutoTime"),
		auto=null;
	carousel.style.width=num*boxW+'px';
	carousel.style.left=-(index-1)*boxW+'px';
	clone(showNum+1);
	if(indexButton==true&&showNum==1){
		var buttons=button.getElementsByTagName('span');
		buttons[index-1].className='on';
	}
	else{
		button.style.cssText='display:none';
	}
	back.onclick=function(){
		clickEvent(-1);
	};
	go.onclick=function(){
		clickEvent(1);
	};
	if(Time!=0){
		auto=setInterval(function(){
			if(carousel.getAttribute("Animation")=='true'){
				loop();
			}
		},Time*1000);
		showBox.onmouseover=function(){
			clearInterval(auto);
		}
		showBox.onmouseout=function(){
			auto=setInterval(function(){
				if(carousel.getAttribute("Animation")=='true'){
					loop();
				}
			},Time*1000);
		}
	}
	if(indexButton==true&&showNum==1){
		button.onclick=function(event){
			if(carousel.getAttribute("Animation")=='true'){
				var event=event?event:window.event,
					target=event.target,
					toIndex=target.getAttribute("index"),
					dis;
				if(toIndex!=index&&toIndex){
						dis=(toIndex-index)*boxW;
						carousel.style.left=-1*boxW*(index-1);
						index=toIndex;
						addButtonOn(buttons);
						carouselAnimation(-1*dis);
				}
			}
		};
	}
	function loop(){
		if(indexButton==true&&showNum==1){
			++index;
			if(index>tureNum){
				index=1;
			}
				addButtonOn(buttons);
		}
		carouselAnimation(-boxW);
	}			
	function clickEvent(factor){
			if(carousel.getAttribute("Animation")=='true'){
					if(indexButton==true&&showNum==1){
						index=index+factor;
						if(index<1){
							index=tureNum;
						}
						else if(index>tureNum){
							index=1;
						}
						addButtonOn(buttons);
					}
					dis=boxW*(-factor);
					carouselAnimation(dis);
			}	
	}
	function carouselAnimation(dis){
		carousel.setAttribute("Animation",'false');
		var speed=dis/(time*1000/inteval),
			left=parseInt(carousel.style.left),
			newpos=left+dis,
			preLeft=0;	
		if(newpos>0&&dis>0){
			carousel.style.left=((num-(showNum+1))*boxW*-1)+'px';
			left=parseInt(carousel.style.left);
			newpos=left+dis;
		}
		if(newpos<(boxW*(num-showNum+1)*(-1)+1)&&dis<0){
			carousel.style.left=-1*boxW+'px';
			left=parseInt(carousel.style.left);
			newpos=left+dis;
		}
		preLeft=left;
		var go = function(){

			if(dis>0&&left<newpos || dis<0&&left>newpos){
				carousel.style.left=left+speed+'px';
				left=left+speed;
				setTimeout(go,inteval);
			}
			else{
				carousel.style.left=preLeft+dis+'px';
				carousel.setAttribute("Animation",'true');
			}
		}
		go();	
	}
	function addButtonOn(){
		for(var i=0;i<buttons.length;i++){
			if(i==index-1){
				buttons[i].className='on';
			}
			else{
				buttons[i].className='';
			}
		}
	}
	function clone(num){
		for(var i=0;i<num;i++){
			var li=document.createElement('li');
			li.className=i%2==0?'box1':'box2';
			li.innerHTML=i+1;
			carousel.appendChild(li);
		}
	}
}
var carousel1=new Carousel(
	{ 
		ID:'carousel',//id-轮播图的滚动块的ID
		time:0.5,//time-轮播图每次滚动的时间
		index:4,//index-轮播图中出现在显示区域最右边块的索引号
		inteval:10,//inteval-流畅度
		indexButton:true//indexButton当轮播图只显示一个BOX的时候为ture才开启下标按钮
	}
);
carousel1.createCarousel(carousel1.inf);
