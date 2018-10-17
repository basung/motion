(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"5WY0":function(e,t,a){e.exports={main:"antd-pro-pages-user-register-main",getCaptcha:"antd-pro-pages-user-register-getCaptcha",submit:"antd-pro-pages-user-register-submit",login:"antd-pro-pages-user-register-login",error:"antd-pro-pages-user-register-error",success:"antd-pro-pages-user-register-success",warning:"antd-pro-pages-user-register-warning","progress-pass":"antd-pro-pages-user-register-progress-pass",progress:"antd-pro-pages-user-register-progress"}},cq3J:function(e,t,a){"use strict";var r=a("4Gf+"),s=a("GyWo");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("P7WH");var l=r(a("KVOY"));a("qhfc");var i=r(a("aEti"));a("sXvm");var n=r(a("0WXq"));a("wZWK");var o=r(a("WWZi"));a("ccCL");var d=r(a("bM7h")),u=r(a("OjS7")),c=r(a("jx1L")),f=r(a("pvd2")),m=r(a("RPUv")),p=r(a("1KPh")),g=r(a("ZA+g"));a("oeOs");var h=r(a("AXz3"));a("B5iR");var v=r(a("c0J2"));a("62OL");var E,w,b,y=r(a("lZ5B")),M=s(a("ZS5U")),S=a("rAnT"),k=a("Zp3c"),P=r(a("GERq")),F=r(a("hXee")),q=r(a("5WY0")),C=y.default.Item,x=v.default.Option,W=h.default.Group,z={ok:M.default.createElement("div",{className:q.default.success},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.strong"})),pass:M.default.createElement("div",{className:q.default.warning},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.medium"})),poor:M.default.createElement("div",{className:q.default.error},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.short"}))},N={ok:"success",pass:"normal",poor:"exception"},D=(E=(0,S.connect)(function(e){var t=e.register,a=e.loading;return{register:t,submitting:a.effects["register/submit"]}}),w=y.default.create(),E(b=w(b=function(e){function t(){var e,a;(0,c.default)(this,t);for(var r=arguments.length,s=new Array(r),l=0;l<r;l++)s[l]=arguments[l];return a=(0,m.default)(this,(e=(0,p.default)(t)).call.apply(e,[this].concat(s))),a.state={count:0,confirmDirty:!1,visible:!1,help:"",prefix:"86"},a.onGetCaptcha=function(){var e=59;a.setState({count:e}),a.interval=setInterval(function(){e-=1,a.setState({count:e}),0===e&&clearInterval(a.interval)},1e3)},a.getPasswordStatus=function(){var e=a.props.form,t=e.getFieldValue("password");return t&&t.length>9?"ok":t&&t.length>5?"pass":"poor"},a.handleSubmit=function(e){e.preventDefault();var t=a.props,r=t.form,s=t.dispatch;r.validateFields({force:!0},function(e,t){if(!e){var r=a.state.prefix;s({type:"register/submit",payload:(0,u.default)({},t,{prefix:r})})}})},a.handleConfirmBlur=function(e){var t=e.target.value,r=a.state.confirmDirty;a.setState({confirmDirty:r||!!t})},a.checkConfirm=function(e,t,r){var s=a.props.form;t&&t!==s.getFieldValue("password")?r((0,k.formatMessage)({id:"validation.password.twice"})):r()},a.checkPassword=function(e,t,r){var s=a.state,l=s.visible,i=s.confirmDirty;if(t)if(a.setState({help:""}),l||a.setState({visible:!!t}),t.length<6)r("error");else{var n=a.props.form;t&&i&&n.validateFields(["confirm"],{force:!0}),r()}else a.setState({help:(0,k.formatMessage)({id:"validation.password.required"}),visible:!!t}),r("error")},a.changePrefix=function(e){a.setState({prefix:e})},a.renderPasswordProgress=function(){var e=a.props.form,t=e.getFieldValue("password"),r=a.getPasswordStatus();return t&&t.length?M.default.createElement("div",{className:q.default["progress-".concat(r)]},M.default.createElement(d.default,{status:N[r],className:q.default.progress,strokeWidth:6,percent:10*t.length>100?100:10*t.length,showInfo:!1})):null},a}return(0,g.default)(t,e),(0,f.default)(t,[{key:"componentDidUpdate",value:function(){var e=this.props,t=e.form,a=e.register,r=t.getFieldValue("mail");"ok"===a.status&&F.default.push({pathname:"/user/register-result",state:{account:r}})}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.props,t=e.form,a=e.submitting,r=t.getFieldDecorator,s=this.state,d=s.count,u=s.prefix,c=s.help,f=s.visible;return M.default.createElement("div",{className:q.default.main},M.default.createElement("h3",null,M.default.createElement(k.FormattedMessage,{id:"app.register.register"})),M.default.createElement(y.default,{onSubmit:this.handleSubmit},M.default.createElement(C,null,r("mail",{rules:[{required:!0,message:(0,k.formatMessage)({id:"validation.email.required"})},{type:"email",message:(0,k.formatMessage)({id:"validation.email.wrong-format"})}]})(M.default.createElement(h.default,{size:"large",placeholder:(0,k.formatMessage)({id:"form.email.placeholder"})}))),M.default.createElement(C,{help:c},M.default.createElement(o.default,{content:M.default.createElement("div",{style:{padding:"4px 0"}},z[this.getPasswordStatus()],this.renderPasswordProgress(),M.default.createElement("div",{style:{marginTop:10}},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.msg"}))),overlayStyle:{width:240},placement:"right",visible:f},r("password",{rules:[{validator:this.checkPassword}]})(M.default.createElement(h.default,{size:"large",type:"password",placeholder:(0,k.formatMessage)({id:"form.password.placeholder"})})))),M.default.createElement(C,null,r("confirm",{rules:[{required:!0,message:(0,k.formatMessage)({id:"validation.confirm-password.required"})},{validator:this.checkConfirm}]})(M.default.createElement(h.default,{size:"large",type:"password",placeholder:(0,k.formatMessage)({id:"form.confirm-password.placeholder"})}))),M.default.createElement(C,null,M.default.createElement(W,{compact:!0},M.default.createElement(v.default,{size:"large",value:u,onChange:this.changePrefix,style:{width:"20%"}},M.default.createElement(x,{value:"86"},"+86"),M.default.createElement(x,{value:"87"},"+87")),r("mobile",{rules:[{required:!0,message:(0,k.formatMessage)({id:"validation.phone-number.required"})},{pattern:/^\d{10}$/,message:(0,k.formatMessage)({id:"validation.phone-number.wrong-format"})}]})(M.default.createElement(h.default,{size:"large",style:{width:"80%"},placeholder:(0,k.formatMessage)({id:"form.phone-number.placeholder"})})))),M.default.createElement(C,null,M.default.createElement(l.default,{gutter:8},M.default.createElement(n.default,{span:16},r("captcha",{rules:[{required:!0,message:(0,k.formatMessage)({id:"validation.verification-code.required"})}]})(M.default.createElement(h.default,{size:"large",placeholder:(0,k.formatMessage)({id:"form.verification-code.placeholder"})}))),M.default.createElement(n.default,{span:8},M.default.createElement(i.default,{size:"large",disabled:d,className:q.default.getCaptcha,onClick:this.onGetCaptcha},d?"".concat(d," s"):(0,k.formatMessage)({id:"app.register.get-verification-code"}))))),M.default.createElement(C,null,M.default.createElement(i.default,{size:"large",loading:a,className:q.default.submit,type:"primary",htmlType:"submit"},M.default.createElement(k.FormattedMessage,{id:"app.register.register"})),M.default.createElement(P.default,{className:q.default.login,to:"/User/Login"},M.default.createElement(k.FormattedMessage,{id:"app.register.sing-in"})))))}}]),t}(M.Component))||b)||b),G=D;t.default=G}}]);