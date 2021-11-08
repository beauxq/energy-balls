(()=>{"use strict";var t=[function(){return[]},function(t,n,i,s,a,e){return[[n,i-s*(t[3]-a)/(t[3]-t[1]),n-s*(t[3]-a)/(t[3]-t[2]),i]]},function(t,n,i,s,a,e){return[[n-s,i-s*(t[2]-a)/(t[2]-t[0]),n-s*(a-t[3])/(t[2]-t[3]),i]]},function(t,n,i,s,a,e){return[[n-s,i-s*(t[2]-a)/(t[2]-t[0]),n,i-s*(t[3]-a)/(t[3]-t[1])]]},function(t,n,i,s,a,e){var o=i-s*(a-t[3])/(t[1]-t[3]);return[[n-s*(t[1]-a)/(t[1]-t[0]),i-s,n,o]]},function(t,n,i,s,a,e){return[[n-s*(t[1]-a)/(t[1]-t[0]),i-s,n-s*(t[3]-a)/(t[3]-t[2]),i]]},function(t,n,i,s,a,e){var o=n-s*(t[1]-a)/(t[1]-t[0]),h=n-s*(a-t[3])/(t[2]-t[3]),r=i-s*(t[2]-a)/(t[2]-t[0]),c=i-s*(a-t[3])/(t[1]-t[3]),u=s/2;return e(n-u,i-u)>a?[[o,i-s,n-s,r],[n,c,h,i]]:[[o,i-s,n,c],[n-s,r,h,i]]},function(t,n,i,s,a,e){var o=i-s*(t[2]-a)/(t[2]-t[0]);return[[n-s*(t[1]-a)/(t[1]-t[0]),i-s,n-s,o]]},function(t,n,i,s,a,e){var o=i-s*(a-t[2])/(t[0]-t[2]);return[[n-s*(a-t[1])/(t[0]-t[1]),i-s,n-s,o]]},function(t,n,i,s,a,e){var o=n-s*(a-t[1])/(t[0]-t[1]),h=n-s*(t[3]-a)/(t[3]-t[2]),r=i-s*(a-t[2])/(t[0]-t[2]),c=i-s*(t[3]-a)/(t[3]-t[1]),u=s/2;return e(n-u,i-u)>a?[[o,i-s,n,c],[n-s,r,h,i]]:[[o,i-s,n-s,r],[n,c,h,i]]},function(t,n,i,s,a,e){return[[n-s*(a-t[1])/(t[0]-t[1]),i-s,n-s*(a-t[3])/(t[2]-t[3]),i]]},function(t,n,i,s,a,e){var o=i-s*(t[3]-a)/(t[3]-t[1]);return[[n-s*(a-t[1])/(t[0]-t[1]),i-s,n,o]]},function(t,n,i,s,a,e){return[[n-s,i-s*(a-t[2])/(t[0]-t[2]),n,i-s*(a-t[3])/(t[1]-t[3])]]},function(t,n,i,s,a,e){return[[n-s,i-s*(a-t[2])/(t[0]-t[2]),n-s*(t[3]-a)/(t[3]-t[2]),i]]},function(t,n,i,s,a,e){return[[n,i-s*(a-t[3])/(t[1]-t[3]),n-s*(a-t[3])/(t[2]-t[3]),i]]},function(){return[]}];const n=function(){function t(t,n,i,s,a){this.radius=t,this.x=n,this.y=i,this.dx_ms=s,this.dy_ms=a}return t.prototype.update=function(t,n,i){this.x+=t*this.dx_ms,this.x>n?(this.x=n,this.dx_ms=-Math.abs(this.dx_ms)):this.x<0&&(this.x=0,this.dx_ms=Math.abs(this.dx_ms)),this.y+=t*this.dy_ms,this.y>i?(this.y=i,this.dy_ms=-Math.abs(this.dy_ms)):this.y<0&&(this.y=0,this.dy_ms=Math.abs(this.dy_ms))},t}(),i=function(){function i(t,n){var i=this;this.canvas=document.getElementById("c"),this.canvas.width=t,this.canvas.height=n,this.context=this.canvas.getContext("2d"),this.canvas.addEventListener("click",(function(t){console.log("click: "+t.x+" "+t.y)})),this.lastT=0,this.balls=[],this.makeBalls(),requestAnimationFrame((function(t){i.draw(t)}))}return i.prototype.makeBalls=function(){var t=Math.floor(Math.min(12,Math.max(4,this.canvas.width*this.canvas.height/15e4+2)));console.log(t+" balls");for(var i=t;i>0;--i)this.balls.push(new n(Math.random()*Math.min(this.canvas.height,this.canvas.width)/5+17,Math.random()*this.canvas.width,Math.random()*this.canvas.height,.04*Math.random(),.04*Math.random()))},i.prototype.resize=function(t,n){this.canvas.width=t,this.canvas.height=n,this.context=this.canvas.getContext("2d")},i.prototype.draw=function(n){var i=this,s=n-this.lastT;s>500&&(s=0),this.lastT=n;for(var a=0,e=this.balls;a<e.length;a++)e[a].update(s,this.canvas.width,this.canvas.height);for(var o=function(t,n){for(var s=0,a=0,e=i.balls;a<e.length;a++){var o=e[a],h=t-o.x,r=n-o.y;s+=o.radius*o.radius/(h*h+r*r)}return s},h=12,r=this.canvas.width/h+1,c=this.canvas.height/h+1,u=[],d=0;d<r;++d){var v=d*h,l=0;u.push(o(v,l))}this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(var f=1;f<c;++f){var m=[o(0,l=f*h)];for(d=1;d<r;++d){v=d*h,m.push(o(v,l));var w=[u[d-1],u[d],m[d-1],m[d]],g=t[+(w[0]>1)<<3|+(w[1]>1)<<2|+(w[2]>1)<<1|+(w[3]>1)](w,v,l,h,1,o),x=Math.floor(255*v/this.canvas.width);this.context.strokeStyle="rgb(0, "+(255-x)+", "+x+")",g.forEach((function(t){i.context.beginPath(),i.context.moveTo(t[0],t[1]),i.context.lineTo(t[2],t[3]),i.context.stroke()}))}u=m}requestAnimationFrame((function(t){i.draw(t)}))},i}();var s;window.onload=function(){var t=window.innerWidth,n=window.innerHeight;s=new i(t,n)},window.addEventListener("resize",(function(){console.log("browserZoomLevel: "+window.devicePixelRatio);var t=window.innerWidth,n=Math.max(window.innerHeight,document.documentElement.clientHeight);null==s||s.resize(t,n)}),!1),window.onorientationchange=function(){var t=document.getElementsByTagName("html")[0],n=document.getElementsByTagName("body")[0];window.innerWidth<window.innerHeight?(t.style.overflowX="hidden",n.style.overflowX="hidden"):(t.style.overflowX="auto",n.style.overflowX="auto")}})();