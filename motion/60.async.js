(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[60],{z5Ba:function(e,a,t){"use strict";var r=t("4Gf+");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t("OjS7")),i=r(t("BZ3U")),s=t("Dk/q"),u=t("ciBx"),p=t("83d0"),c=t("/c+t"),o={namespace:"permission",state:{data:{list:[],pagination:{}},currentItem:{},modalType:"create",modalVisible:!1},effects:{query:i.default.mark(function e(a,t){var r,n,c,o,l;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,c=t.put,e.next=4,n(u.query,{url:p.api_url.api_permission_query,params:(0,s.parse)(r)});case 4:if(o=e.sent,!(0,p.checkStatus)(o)){e.next=9;break}return l={list:o.rows,pagination:{total:o.total,pageSize:o.pageSize,current:o.pageIndex+1}},e.next=9,c({type:"save",payload:{data:l}});case 9:case"end":return e.stop()}},e,this)}),create:i.default.mark(function e(a,t){var r,n,o,l,d,f,m;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,o=t.put,e.next=4,n(u.create,{url:p.api_url.api_permission_create,args:r.item});case 4:if(l=e.sent,!(0,p.checkStatus)(l)){e.next=17;break}return e.next=8,o({type:"hideModal"});case 8:return(0,c.Notification)("success","\u521b\u5efa\u6210\u529f!!!"),d=r.params,e.next=12,n(u.query,{url:p.api_url.api_permission_query,params:(0,s.parse)(d)});case 12:if(f=e.sent,!(0,p.checkStatus)(f)){e.next=17;break}return m={list:f.rows,pagination:{total:f.total,pageSize:f.pageSize,current:f.pageIndex+1}},e.next=17,o({type:"save",payload:{data:m}});case 17:case"end":return e.stop()}},e,this)}),update:i.default.mark(function e(a,t){var r,o,l,d,f,m,x,y,h,w;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,o=t.select,l=t.call,d=t.put,e.next=4,o(function(e){var a=e.permission;return a.currentItem.id});case 4:return f=e.sent,m=(0,n.default)({},r.item,{id:f}),e.next=8,l(u.update,{url:p.api_url.api_permission_edit,args:m});case 8:if(x=e.sent,!(0,p.checkStatus)(x)){e.next=21;break}return e.next=12,d({type:"hideModal"});case 12:return(0,c.Notification)("success","\u7f16\u8f91\u6210\u529f"),y=r.params,e.next=16,l(u.query,{url:p.api_url.api_permission_query,params:(0,s.parse)(y)});case 16:if(h=e.sent,!(0,p.checkStatus)(h)){e.next=21;break}return w={list:h.rows,pagination:{total:h.total,pageSize:h.pageSize,current:h.pageIndex+1}},e.next=21,d({type:"save",payload:{data:w}});case 21:case"end":return e.stop()}},e,this)}),remove:i.default.mark(function e(a,t){var r,n,o,l,d,f,m;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,o=t.put,e.next=4,n(u.remove,{url:p.api_url.api_permission_remove,id:r.id});case 4:if(l=e.sent,!(0,p.checkStatus)(l)){e.next=15;break}return(0,c.Notification)("success","\u5220\u9664\u6210\u529f"),d=r.params,e.next=10,n(u.query,{url:p.api_url.api_permission_query,params:(0,s.parse)(d)});case 10:if(f=e.sent,!(0,p.checkStatus)(f)){e.next=15;break}return m={list:f.rows,pagination:{total:f.total,pageSize:f.pageSize,current:f.pageIndex+1}},e.next=15,o({type:"save",payload:{data:m}});case 15:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,a){return(0,n.default)({},e,a.payload)},showModal:function(e,a){return(0,n.default)({},e,a.payload,{modalVisible:!0})},hideModal:function(e){return(0,n.default)({},e,{modalVisible:!1})}}};a.default=o}}]);