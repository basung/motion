(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{EHGT:function(e,a,t){"use strict";var r=t("4Gf+");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t("OjS7")),s=r(t("BZ3U")),i=t("Dk/q"),u=r(t("hXee")),l=t("ciBx"),o=t("83d0"),p=t("/c+t"),c={namespace:"role",state:{data:{list:[],pagination:{}},currentItem:{},modalType:"create",modalVisible:!1,permission:[],rolePermission:[]},effects:{query:s.default.mark(function e(a,t){var r,n,u,p,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,u=t.put,e.next=4,n(l.query,{url:o.api_url.api_role_query,params:(0,i.parse)(r)});case 4:if(p=e.sent,!(0,o.checkStatus)(p)){e.next=9;break}return c={list:p.rows,pagination:{total:p.total,pageSize:p.pageSize,current:p.pageIndex+1}},e.next=9,u({type:"save",payload:{data:c}});case 9:case"end":return e.stop()}},e,this)}),create:s.default.mark(function e(a,t){var r,n,i,u,c,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,i=t.put,e.next=4,n(l.create,{url:o.api_url.api_role_create,args:r.item});case 4:if(u=e.sent,!(0,o.checkStatus)(u)){e.next=17;break}return e.next=8,i({type:"hideModal"});case 8:return(0,p.Notification)("success","\u521b\u5efa\u6210\u529f!!!"),r.params,e.next=12,n(l.query,{url:o.api_url.api_role_query,params:{}});case 12:if(c=e.sent,!(0,o.checkStatus)(c)){e.next=17;break}return d={list:c.rows,pagination:{total:c.total,pageSize:c.pageSize,current:c.pageIndex+1}},e.next=17,i({type:"save",payload:{data:d}});case 17:case"end":return e.stop()}},e,this)}),update:s.default.mark(function e(a,t){var r,u,c,d,f,m,x,y,h,_;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,u=t.select,c=t.call,d=t.put,e.next=4,u(function(e){var a=e.role;return a.currentItem.id});case 4:return f=e.sent,m=(0,n.default)({},r.item,{id:f}),e.next=8,c(l.update,{url:o.api_url.api_role_edit,args:m});case 8:if(x=e.sent,!(0,o.checkStatus)(x)){e.next=21;break}return e.next=12,d({type:"hideModal"});case 12:return(0,p.Notification)("success","\u7f16\u8f91\u6210\u529f"),y=r.params,e.next=16,c(l.query,{url:o.api_url.api_role_query,params:(0,i.parse)(y)});case 16:if(h=e.sent,!(0,o.checkStatus)(h)){e.next=21;break}return _={list:h.rows,pagination:{total:h.total,pageSize:h.pageSize,current:h.pageIndex+1}},e.next=21,d({type:"save",payload:{data:_}});case 21:case"end":return e.stop()}},e,this)}),remove:s.default.mark(function e(a,t){var r,n,u,c,d,f,m;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,u=t.put,e.next=4,n(l.remove,{url:o.api_url.api_role_remove,id:r.id});case 4:if(c=e.sent,!(0,o.checkStatus)(c)){e.next=15;break}return(0,p.Notification)("success","\u5220\u9664\u6210\u529f"),d=r.params,e.next=10,n(l.query,{url:o.api_url.api_role_query,params:(0,i.parse)(d)});case 10:if(f=e.sent,!(0,o.checkStatus)(f)){e.next=15;break}return m={list:f.rows,pagination:{total:f.total,pageSize:f.pageSize,current:f.pageIndex+1}},e.next=15,u({type:"save",payload:{data:m}});case 15:case"end":return e.stop()}},e,this)}),relationPage:s.default.mark(function e(a,t){var r,n;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r=a.payload,t.call,t.put,n=r.id,u.default.push("/system/role/relationPermission/"+n);case 4:case"end":return e.stop()}},e,this)}),getRoleRelationPermission:s.default.mark(function e(a,t){var r,n,i,u,p,c,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,i=t.put,e.next=4,n(l.query,{url:o.api_url.api_permission_query,params:{pageIndex:0,pageSize:1e4}});case 4:return u=e.sent,e.next=7,n(l.getByIds,{url:o.api_url.api_role_relation_permission,id:r.id});case 7:if(p=e.sent,!(0,o.checkStatus)(u)||!(0,o.checkStatus)(p)){e.next=13;break}return c=u.rows,d=p.data,e.next=13,i({type:"save",payload:{permission:c,rolePermission:d}});case 13:case"end":return e.stop()}},e,this)}),setRoleRelationPermission:s.default.mark(function e(a,t){var r,n,i,u,c,d,f,m;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,i=t.put,e.next=4,n(l.postByParams,{url:o.api_url.api_role_add_permissions,args:"?permissions="+r.permissions+"&roleId="+r.roleId});case 4:if(u=e.sent,!(0,o.checkStatus)(u)){e.next=18;break}return(0,p.Notification)("success","\u6743\u9650\u8bbe\u7f6e\u6210\u529f"),e.next=9,n(l.query,{url:o.api_url.api_permission_query,params:{pageIndex:0,pageSize:1e4}});case 9:return c=e.sent,e.next=12,n(l.getByIds,{url:o.api_url.api_role_relation_permission,id:r.roleId});case 12:if(d=e.sent,!(0,o.checkStatus)(c)||!(0,o.checkStatus)(d)){e.next=18;break}return f=c.rows,m=d.data,e.next=18,i({type:"save",payload:{permission:f,rolePermission:m}});case 18:case"end":return e.stop()}},e,this)}),backPage:s.default.mark(function e(a,t){var r;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r=a.payload,t.call,t.put,console.info("payload ==",JSON.stringify(r));case 3:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,a){return(0,n.default)({},e,a.payload)},showModal:function(e,a){return(0,n.default)({},e,a.payload,{modalVisible:!0})},hideModal:function(e){return(0,n.default)({},e,{modalVisible:!1})}}};a.default=c}}]);