(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{LY9D:function(e,a,t){"use strict";var n=t("4Gf+");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t("OjS7")),c=n(t("BZ3U")),s=t("dCQc"),u={namespace:"profile",state:{basicGoods:[],advancedOperation1:[],advancedOperation2:[],advancedOperation3:[]},effects:{fetchBasic:c.default.mark(function e(a,t){var n,r,u;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.call,r=t.put,e.next=3,n(s.queryBasicProfile);case 3:return u=e.sent,e.next=6,r({type:"show",payload:u});case 6:case"end":return e.stop()}},e,this)}),fetchAdvanced:c.default.mark(function e(a,t){var n,r,u;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.call,r=t.put,e.next=3,n(s.queryAdvancedProfile);case 3:return u=e.sent,e.next=6,r({type:"show",payload:u});case 6:case"end":return e.stop()}},e,this)})},reducers:{show:function(e,a){var t=a.payload;return(0,r.default)({},e,t)}}};a.default=u}}]);