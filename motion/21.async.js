(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"2AEw":function(e,t,a){"use strict";var l=a("4Gf+"),r=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("DxMX");var d=l(a("ivY1"));a("qhfc");var m=l(a("aEti"));a("aslW");var o=l(a("b+b+"));a("IGVr");var s=l(a("I9+W"));a("slQz");var u=l(a("EXKx"));a("CKBq");var f=l(a("nvQ8")),i=l(a("RSNA")),n=l(a("jx1L")),c=l(a("pvd2")),p=l(a("RPUv")),g=l(a("1KPh")),E=l(a("ZA+g"));a("oeOs");var b=l(a("AXz3"));a("sPI1");var h=l(a("paLH"));a("B5iR");var v=l(a("c0J2"));a("62OL");var M,F,y,w=l(a("lZ5B")),q=r(a("ZS5U")),x=a("rAnT"),A=a("Zp3c"),R=l(a("zHco")),U=l(a("Zpge")),k=w.default.Item,C=v.default.Option,P=h.default.RangePicker,S=b.default.TextArea,B=(M=(0,x.connect)(function(e){var t=e.loading;return{submitting:t.effects["form/submitRegularForm"]}}),F=w.default.create(),M(y=F(y=function(e){function t(){var e,a;(0,n.default)(this,t);for(var l=arguments.length,r=new Array(l),d=0;d<l;d++)r[d]=arguments[d];return a=(0,p.default)(this,(e=(0,g.default)(t)).call.apply(e,[this].concat(r))),a.handleSubmit=function(e){var t=a.props,l=t.dispatch,r=t.form;e.preventDefault(),r.validateFieldsAndScroll(function(e,t){e||l({type:"form/submitRegularForm",payload:t})})},a}return(0,E.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){var e=this.props.submitting,t=this.props.form,a=t.getFieldDecorator,l=t.getFieldValue,r={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:10}}},n={wrapperCol:{xs:{span:24,offset:0},sm:{span:10,offset:7}}};return q.default.createElement(R.default,{title:q.default.createElement(A.FormattedMessage,{id:"app.forms.basic.title"}),content:q.default.createElement(A.FormattedMessage,{id:"app.forms.basic.description"})},q.default.createElement(d.default,{bordered:!1},q.default.createElement(w.default,{onSubmit:this.handleSubmit,hideRequiredMark:!0,style:{marginTop:8}},q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement(A.FormattedMessage,{id:"form.title.label"})}),a("title",{rules:[{required:!0,message:(0,A.formatMessage)({id:"validation.title.required"})}]})(q.default.createElement(b.default,{placeholder:(0,A.formatMessage)({id:"form.title.placeholder"})}))),q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement(A.FormattedMessage,{id:"form.date.label"})}),a("date",{rules:[{required:!0,message:(0,A.formatMessage)({id:"validation.date.required"})}]})(q.default.createElement(P,{style:{width:"100%"},placeholder:[(0,A.formatMessage)({id:"form.date.placeholder.start"}),(0,A.formatMessage)({id:"form.date.placeholder.end"})]}))),q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement(A.FormattedMessage,{id:"form.goal.label"})}),a("goal",{rules:[{required:!0,message:(0,A.formatMessage)({id:"validation.goal.required"})}]})(q.default.createElement(S,{style:{minHeight:32},placeholder:(0,A.formatMessage)({id:"form.goal.placeholder"}),rows:4}))),q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement(A.FormattedMessage,{id:"form.standard.label"})}),a("standard",{rules:[{required:!0,message:(0,A.formatMessage)({id:"validation.standard.required"})}]})(q.default.createElement(S,{style:{minHeight:32},placeholder:(0,A.formatMessage)({id:"form.standard.placeholder"}),rows:4}))),q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement("span",null,q.default.createElement(A.FormattedMessage,{id:"form.client.label"}),q.default.createElement("em",{className:U.default.optional},q.default.createElement(A.FormattedMessage,{id:"form.optional"}),q.default.createElement(u.default,{title:q.default.createElement(A.FormattedMessage,{id:"form.client.label.tooltip"})},q.default.createElement(f.default,{type:"info-circle-o",style:{marginRight:4}}))))}),a("client")(q.default.createElement(b.default,{placeholder:(0,A.formatMessage)({id:"form.client.placeholder"})}))),q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement("span",null,q.default.createElement(A.FormattedMessage,{id:"form.invites.label"}),q.default.createElement("em",{className:U.default.optional},q.default.createElement(A.FormattedMessage,{id:"form.optional"})))}),a("invites")(q.default.createElement(b.default,{placeholder:(0,A.formatMessage)({id:"form.invites.placeholder"})}))),q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement("span",null,q.default.createElement(A.FormattedMessage,{id:"form.weight.label"}),q.default.createElement("em",{className:U.default.optional},q.default.createElement(A.FormattedMessage,{id:"form.optional"})))}),a("weight")(q.default.createElement(s.default,{placeholder:(0,A.formatMessage)({id:"form.weight.placeholder"}),min:0,max:100})),q.default.createElement("span",{className:"ant-form-text"},"%")),q.default.createElement(k,(0,i.default)({},r,{label:q.default.createElement(A.FormattedMessage,{id:"form.public.label"}),help:q.default.createElement(A.FormattedMessage,{id:"form.public.label.help"})}),q.default.createElement("div",null,a("public",{initialValue:"1"})(q.default.createElement(o.default.Group,null,q.default.createElement(o.default,{value:"1"},q.default.createElement(A.FormattedMessage,{id:"form.public.radio.public"})),q.default.createElement(o.default,{value:"2"},q.default.createElement(A.FormattedMessage,{id:"form.public.radio.partially-public"})),q.default.createElement(o.default,{value:"3"},q.default.createElement(A.FormattedMessage,{id:"form.public.radio.private"})))),q.default.createElement(k,{style:{marginBottom:0}},a("publicUsers")(q.default.createElement(v.default,{mode:"multiple",placeholder:(0,A.formatMessage)({id:"form.publicUsers.placeholder"}),style:{margin:"8px 0",display:"2"===l("public")?"block":"none"}},q.default.createElement(C,{value:"1"},q.default.createElement(A.FormattedMessage,{id:"form.publicUsers.option.A"})),q.default.createElement(C,{value:"2"},q.default.createElement(A.FormattedMessage,{id:"form.publicUsers.option.B"})),q.default.createElement(C,{value:"3"},q.default.createElement(A.FormattedMessage,{id:"form.publicUsers.option.C"}))))))),q.default.createElement(k,(0,i.default)({},n,{style:{marginTop:32}}),q.default.createElement(m.default,{type:"primary",htmlType:"submit",loading:e},q.default.createElement(A.FormattedMessage,{id:"form.submit"})),q.default.createElement(m.default,{style:{marginLeft:8}},q.default.createElement(A.FormattedMessage,{id:"form.save"}))))))}}]),t}(q.PureComponent))||y)||y),N=B;t.default=N}}]);