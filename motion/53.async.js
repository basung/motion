(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[53],{BjK0:function(e,t,a){e.exports={bannerWrapper:"antd-pro-pages-component-motion2-index-bannerWrapper",bannerBgCenter:"antd-pro-pages-component-motion2-index-bannerBgCenter",banner:"antd-pro-pages-component-motion2-index-banner",bannerText:"antd-pro-pages-component-motion2-index-bannerText",bannerTextButtonLeft:"antd-pro-pages-component-motion2-index-bannerTextButtonLeft",bannerTextButtonRight:"antd-pro-pages-component-motion2-index-bannerTextButtonRight",bannerDemo:"antd-pro-pages-component-motion2-index-bannerDemo",logoDemo:"antd-pro-pages-component-motion2-index-logoDemo",rightSide:"antd-pro-pages-component-motion2-index-rightSide",pointWrapper:"antd-pro-pages-component-motion2-index-pointWrapper",point:"antd-pro-pages-component-motion2-index-point"}},IllE:function(e,t,a){"use strict";var n=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(a("jx1L")),r=n(a("pvd2")),l=n(a("RPUv")),i=n(a("1KPh")),d=n(a("ZA+g")),u=n(a("ZS5U")),c=n(a("4mCY")),p=n(a("6yYj")),m=n(a("vCQ1")),f=n(a("9+Y0")),s=(a("bFZZ"),n(a("XD/6"))),h=n(a("BjK0"));c.default.plugins.push(f.default);var y=function(e){function t(){return(0,o.default)(this,t),(0,l.default)(this,(0,i.default)(t).apply(this,arguments))}return(0,d.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){return u.default.createElement(m.default,{id:"banner",className:h.default.bannerWrapper},u.default.createElement("svg",{className:h.default.bannerBgCenter,width:"100%",viewBox:"0 0 1200 550"},u.default.createElement(c.default,{component:"circle",fill:"rgba(161,174,245,.15)",r:"130",cx:"350",cy:"350",animation:{y:30,x:-10,repeat:-1,duration:3e3,yoyo:!0}}),u.default.createElement(c.default,{component:"circle",fill:"rgba(120,172,254,.1)",r:"80",cx:"500",cy:"420",animation:{y:-30,x:10,repeat:-1,duration:3e3,yoyo:!0}})),u.default.createElement("div",{className:h.default.banner},u.default.createElement("div",{className:h.default.bannerDemo},u.default.createElement(s.default,null)),u.default.createElement(p.default,{type:"bottom",className:h.default.bannerText,delay:300},u.default.createElement("h1",null,"Motion Design"),u.default.createElement("h3",null,"Animation specification and components of Ant Design."),u.default.createElement("p",null,"\u4f7f\u7528 Ant Motion \u80fd\u591f\u5feb\u901f\u5728 React \u6846\u67b6\u4e2d\u4f7f\u7528\u52a8\u753b\u3002",u.default.createElement("br",null),"\u6211\u4eec\u63d0\u4f9b\u4e86\u5355\u9879\uff0c\u7ec4\u5408\u52a8\u753b\uff0c\u4ee5\u53ca\u6574\u5957\u89e3\u51b3\u65b9\u6848"),u.default.createElement("a",{className:h.default.bannerTextButtonLeft,href:"/language/basic"},"\u4e86\u89e3\u66f4\u591a",u.default.createElement("i",null)),u.default.createElement("a",{className:h.default.bannerTextButtonRight,href:"/language/basic",target:"_blank"},"\u5feb\u901f\u642d\u5efa",u.default.createElement("i",null)))))}}]),t}(u.default.Component);t.default=y},"XD/6":function(e,t,a){"use strict";var n=a("GyWo"),o=a("4Gf+");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("OjS7")),l=o(a("jx1L")),i=o(a("pvd2")),d=o(a("RPUv")),u=o(a("1KPh")),c=o(a("ZA+g")),p=o(a("fKDl")),m=o(a("ZS5U")),f=o(a("FY2y")),s=(o(a("T9cD")),n(a("4mCY"))),h=o(a("vrtb")),y=o(a("afdV")),g=a("NO6H"),v=a("0GH0"),b=o(a("BjK0"));s.default.plugins.push(y.default);var x=function(e){function t(e){var a;return(0,l.default)(this,t),a=(0,d.default)(this,(0,u.default)(t).call(this,e)),a.onResize=function(){(0,g.enquireScreen)(function(e){if(a.scale=e?.7:1,!a.tickerOut){var t=a.resizeData(a.state.children);a.setState({children:t},function(){a.gather||a.updateTweenData(),h.default.clear(a.interval),a.interval=h.default.interval(a.updateTweenData,a.intervalTime)})}},"only screen and (max-width: 414px)")},a.onMouseEnter=function(){a.gather||a.updateTweenData(),a.remInterval()},a.onMouseLeave=function(){a.gather&&a.updateTweenData(),a.interval=h.default.interval(a.updateTweenData,a.intervalTime)},a.resizeData=function(e){return e.map(function(e,t){var n=e.props.children,o=(0,r.default)({},n.props,{style:(0,r.default)({},n.props.style,{width:a.pointArray[t].r*a.scale,height:a.pointArray[t].r*a.scale})}),l={key:t,style:{left:a.pointArray[t].x*a.scale,top:a.pointArray[t].y*a.scale}};return m.default.cloneElement(e,l,m.default.cloneElement(n,o))})},a.remInterval=function(){h.default.clear(a.interval),a.interval=null},a.createPointData=function(){a.tickerOut=null;var e=a.width,t=a.height,n=document.createElement("canvas");a.dom.appendChild(n);var o=n.getContext("2d");o.clearRect(0,0,e,t),n.width=e,n.height=t;var r=new Image;r.onload=function(){o.drawImage(r,0,0),a.imgData=o.getImageData(0,0,e,t).data,a.setDataToDom(a.imgData,e,t),a.dom.removeChild(n)},r.crossOrigin="anonymous",r.src=a.props.image},a.gatherData=function(){var e=a.state.children.map(function(e){return m.default.cloneElement(e,{animation:{x:0,y:0,opacity:1,scale:1,delay:500*Math.random(),duration:800,ease:"easeInOutQuint"}})});a.setState({children:e})},a.disperseData=function(){var e=document.getElementById("banner").getBoundingClientRect(),t=document.getElementById("J-Side").getBoundingClientRect(),n=t.top+(0,v.currentScrollTop)(),o=a.state.children.map(function(a){return m.default.cloneElement(a,{animation:{x:Math.random()*document.body.clientWidth-t.left-a.props.style.left,y:Math.random()*e.height-n-a.props.style.top,opacity:.4*Math.random()+.1,scale:2.4*Math.random()+.1,duration:500*Math.random()+500,ease:"easeInOutQuint"}})});a.setState({children:o})},a.updateTweenData=function(){a.dom=f.default.findDOMNode((0,p.default)((0,p.default)(a))),(a.gather&&a.disperseData||a.gatherData)(),a.gather=!a.gather},a.state={},a.interval=null,a.gather=!0,a.intervalTime=9e3,a.width=265,a.height=290,a.tickerOut=null,a.scale=1,a}return(0,c.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.dom=f.default.findDOMNode(this),this.tickerOut=h.default.timeout(this.createPointData,1400)}},{key:"componentWillUnmount",value:function(){this.remInterval()}},{key:"setDataToDom",value:function(e,t,a){var n=this;this.pointArray=[];for(var o=Math.round(t/11),r=0;r<t;r+=o)for(var l=0;l<a;l+=o)e[4*(r+l*t)+3]>150&&this.pointArray.push({x:r,y:l,r:18*Math.random()+12});var i=[];this.pointArray.forEach(function(e,t){var a=.4*Math.random()+.1;i.push(m.default.createElement(s.default,{className:b.default.pointWrapper,key:t,style:{left:e.x,top:e.y}},m.default.createElement(s.default,{className:b.default.point,style:{width:e.r,height:e.r,opacity:a,backgroundColor:"rgb(".concat(Math.round(95*Math.random()+160),",255,255)")},animation:{y:10*(2*Math.random()-1)||5,x:5*(2*Math.random()-1)||2.5,delay:1e3*Math.random(),repeat:-1,duration:3e3,yoyo:!0,ease:"easeInOutQuad"}})))}),this.pointArray.push({x:75,y:180,r:40}),i.push(m.default.createElement(s.default,{className:b.default.pointWrapper,key:i.length,style:{left:75,top:180}},m.default.createElement(s.default,{className:b.default.point,style:{width:40,height:40,backgroundColor:"rgb(".concat(Math.round(95*Math.random()+160),",255,255)"),opacity:.5*Math.random()+.2},animation:{y:10*(2*Math.random()-1)||5,x:5*(2*Math.random()-1)||2.5,delay:1e3*Math.random(),repeat:-1,duration:3e3,yoyo:!0,ease:"easeInOutQuad"}}))),i=this.resizeData(i),this.setState({children:i,end:!0},function(){n.onResize(),n.interval=h.default.interval(n.updateTweenData,n.intervalTime)})}},{key:"render",value:function(){return m.default.createElement(s.TweenOneGroup,{enter:{opacity:0,type:"from",duration:800},leave:{opacity:0,duration:800},className:b.default.logoDemo},this.state.end?m.default.createElement("div",{key:"box",className:b.default.rightSide,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,id:"J-Side"},this.state.children):m.default.createElement("div",{key:"line"},m.default.createElement("svg",{className:b.default.rightSide,viewBox:"0,0,300,400"},m.default.createElement(s.default,{d:"M30,265L30,25",component:"path",animation:[{opacity:0,type:"from",delay:300,duration:0},{SVGDraw:0,type:"from",duration:300,ease:"easeInQuart"}]}),m.default.createElement(s.default,{d:"M30,25L137,135",component:"path",animation:[{opacity:0,type:"from",delay:600,duration:0},{SVGDraw:0,type:"from",duration:250,ease:"linear"}]}),m.default.createElement(s.default,{d:"M137,135L245,25",component:"path",animation:[{opacity:0,type:"from",delay:850,duration:0},{SVGDraw:0,type:"from",duration:250,ease:"linear"}]}),m.default.createElement(s.default,{d:"M245,25L245,190",component:"path",animation:[{opacity:0,type:"from",delay:1100,duration:0},{SVGDraw:0,type:"from",duration:300,ease:"easeOutQuart"}]}),m.default.createElement(s.default,{component:"circle",r:"20",fill:"#fff",cx:"95",cy:"200",animation:{delay:1300,r:0,opacity:0,duration:300,type:"from",attr:"attr",ease:"easeOutQuart"}}))))}}]),t}(m.default.PureComponent);t.default=x,x.defaultProps={image:"https://zos.alipayobjects.com/rmsportal/fbbUPUkdhvXwRYp.png"}}}]);