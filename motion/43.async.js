(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[43],{FSIE:function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Osh2");var n=l(a("zaZ5"));a("DxMX");var u,d,c=l(a("ivY1")),i=l(a("jx1L")),f=l(a("pvd2")),s=l(a("RPUv")),o=l(a("1KPh")),m=l(a("ZA+g")),v=r(a("ZS5U")),p=l(a("I9Uw")),E=a("rAnT"),w=l(a("pUXw")),h=l(a("wgDz")),b=(u=(0,E.connect)(function(e){var t=e.list;return{list:t}}),u(d=function(e){function t(){return(0,i.default)(this,t),(0,s.default)(this,(0,o.default)(t).apply(this,arguments))}return(0,m.default)(t,e),(0,f.default)(t,[{key:"render",value:function(){var e=this.props.list.list;return v.default.createElement(n.default,{className:h.default.coverCardList,rowKey:"id",grid:{gutter:24,xxl:3,xl:2,lg:2,md:2,sm:2,xs:1},dataSource:e,renderItem:function(e){return v.default.createElement(n.default.Item,null,v.default.createElement(c.default,{className:h.default.card,hoverable:!0,cover:v.default.createElement("img",{alt:e.title,src:e.cover})},v.default.createElement(c.default.Meta,{title:v.default.createElement("a",null,e.title),description:e.subDescription}),v.default.createElement("div",{className:h.default.cardItemContent},v.default.createElement("span",null,(0,p.default)(e.updatedAt).fromNow()),v.default.createElement("div",{className:h.default.avatarList},v.default.createElement(w.default,{size:"mini"},e.members.map(function(t){return v.default.createElement(w.default.Item,{key:"".concat(e.id,"-avatar-").concat(t.id),src:t.avatar,tips:t.name})}))))))}})}}]),t}(v.PureComponent))||d),g=b;t.default=g}}]);