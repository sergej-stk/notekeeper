(function(){"use strict";var e={4455:function(e,l,t){var n=t(5130),a=(t(4114),t(8992),t(4520),t(2577),t(6768)),o=t(144),u=t(4232),i=(0,a.pM)({__name:"ConfirmDialog",setup(e,{expose:l}){const t=(0,o.KR)(""),n=(0,o.KR)(""),i=(0,o.KR)();async function r(e,l){return t.value=e,n.value=l,c.value=!0,await new Promise(((e,l)=>{i.value=e}))}function s(e){c.value=!1,void 0!==i.value&&i.value({accept:e})}const c=(0,o.KR)(!1);return l({open:r}),(e,l)=>{const o=(0,a.g2)("v-card-title"),i=(0,a.g2)("v-card-text"),r=(0,a.g2)("v-btn"),d=(0,a.g2)("v-card-actions"),v=(0,a.g2)("v-card"),f=(0,a.g2)("v-dialog");return(0,a.uX)(),(0,a.Wv)(f,{class:"w-50",modelValue:c.value,"onUpdate:modelValue":l[2]||(l[2]=e=>c.value=e),persistent:""},{default:(0,a.k6)((()=>[(0,a.bF)(v,null,{default:(0,a.k6)((()=>[(0,a.bF)(o,null,{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(t.value),1)])),_:1}),(0,a.bF)(i,null,{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(n.value),1)])),_:1}),(0,a.bF)(d,{class:"d-flex flex-row justify-space-between"},{default:(0,a.k6)((()=>[(0,a.bF)(r,{onClick:l[0]||(l[0]=e=>s(!0))},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("general.yes")),1)])),_:1}),(0,a.bF)(r,{onClick:l[1]||(l[1]=e=>s(!1))},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("general.no")),1)])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])}}});const r=i;var s=r;const c="api/v3/notes",d="api/v3/auth/";var v=t(5234);const f=(0,v.nY)("mainStore",{state:()=>({theme:"light",user:null,token:null}),actions:{setToken(e){this.user={id:0,username:e},this.token=e}},getters:{getTheme:e=>e.theme},persist:{storage:localStorage}});var g=t(4373);async function p(){const e=f(),l={headers:{Authorization:`Bearer ${e.token}`}},t=await g.A.get(c,l);return 200!==t.status?null:t.data}async function m(e){const l=f(),t={headers:{Authorization:`Bearer ${l.token}`}},n=await g.A.post(c,e,t);return 201!==n.status?null:n.data}async function k(e){const l=f(),t={headers:{Authorization:`Bearer ${l.token}`}},n=await g.A.put(c+"/"+e.id,e,t);return 200!==n.status?null:n.data}async function b(e){const l=f(),t={headers:{Authorization:`Bearer ${l.token}`}},n=await g.A.delete(c+"/"+e,t);return 200===n.status}const _={class:"d-flex flex-row justify-space-between"},y={class:"d-flex flex-row"},h=["contenteditable","innerHTML"];var F=(0,a.pM)({__name:"NoteElement",props:{note:{}},setup(e){const l=e,t=(0,o.KR)(null),n=(0,o.KR)(null),i=(0,o.KR)(!1),r=(0,o.KR)("");async function c(){if(null===t.value)return;const e=await t.value.open("Note löschen","Wollen Sie die Note löschen?");e.accept&&b(l.note.id)}function d(){setTimeout((()=>{null!==n.value&&(r.value=n.value.innerText)}))}function v(){null!==n.value&&(r.value=n.value.innerText,i.value=!0)}function f(){null!==n.value&&(n.value.innerText=l.note.text,i.value=!1)}function g(){if(null===n.value)return;const e={...l.note};e.text=n.value.innerText,k(e),f()}function p(){null!==n.value&&(n.value.innerText=l.note.text)}const m=(0,a.EW)((()=>null!==n.value&&l.note.text!==r.value));return(e,o)=>{const r=(0,a.g2)("v-list-item-title"),k=(0,a.g2)("v-icon"),b=(0,a.g2)("v-list-item");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(b,{class:"mb-2"},{default:(0,a.k6)((()=>[(0,a.bF)(r,null,{default:(0,a.k6)((()=>[(0,a.eW)("Anaonym "+(0,u.v_)(e.$d(l.note.timestamp,"long")),1)])),_:1}),(0,a.Lk)("div",_,[(0,a.Lk)("div",null,(0,u.v_)(l.note.id),1),(0,a.Lk)("div",y,[i.value?((0,a.uX)(),(0,a.Wv)(k,{key:0,icon:"mdi-check-bold",onClick:g})):(0,a.Q3)("",!0),i.value?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.Wv)(k,{key:1,icon:"mdi-pencil",onClick:v})),i.value&&!m.value?((0,a.uX)(),(0,a.Wv)(k,{key:2,icon:"mdi-close",onClick:f})):i.value&&m.value?((0,a.uX)(),(0,a.Wv)(k,{key:3,icon:"mdi-reload",onClick:p})):((0,a.uX)(),(0,a.Wv)(k,{key:4,icon:"mdi-close",onClick:c}))])]),(0,a.Lk)("div",{ref_key:"editRef",ref:n,contenteditable:i.value,onKeydown:d,innerHTML:l.note.text.replace(/\n/g,"<br />")},null,40,h)])),_:1}),(0,a.bF)(s,{ref_key:"confirmDialog",ref:t},null,512)],64)}}}),w=t(1241);const x=(0,w.A)(F,[["__scopeId","data-v-92569054"]]);var W=x,R=t(1189);async function V(e,l){const t=await g.A.post(d+"login",{email:e,password:l});return 200!==t.status?null:t.data.startsWith("token=")?t.data.split("token=")[1]:null}async function K(e,l,t){const n=await g.A.post(d+"/signup",{username:e,password:l,fullName:t});return 200===n.status}const C={key:0};var $=(0,a.pM)({__name:"LoginDialog",setup(e,{expose:l}){const t=(0,o.KR)(""),n=(0,o.KR)(""),i=(0,o.KR)(!1),r=(0,o.KR)(),s=f();async function c(){return g.value=!0,await new Promise(((e,l)=>{r.value=e}))}function d(e){g.value=!1,void 0!==r.value&&r.value({accept:e})}async function v(){const e=await V(t.value,n.value);null!==e?(console.log("set"),s.setToken(e),d(!0)):i.value=!0}const g=(0,o.KR)(!1),p=(0,a.EW)((()=>""!==t.value&&""!==n.value));return l({open:c}),(e,l)=>{const o=(0,a.g2)("v-card-title"),r=(0,a.g2)("v-text-field"),s=(0,a.g2)("v-card-text"),c=(0,a.g2)("v-btn"),f=(0,a.g2)("v-card-actions"),m=(0,a.g2)("v-card"),k=(0,a.g2)("v-dialog");return(0,a.uX)(),(0,a.Wv)(k,{class:"w-50",modelValue:g.value,"onUpdate:modelValue":l[3]||(l[3]=e=>g.value=e),persistent:""},{default:(0,a.k6)((()=>[(0,a.bF)(m,null,{default:(0,a.k6)((()=>[(0,a.bF)(o,null,{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("loginDialog.login")),1)])),_:1}),(0,a.bF)(s,null,{default:(0,a.k6)((()=>[i.value?((0,a.uX)(),(0,a.CE)("p",C,(0,u.v_)(e.$t("loginDialog.errorMessage")),1)):(0,a.Q3)("",!0),(0,a.bF)(r,{type:"username",modelValue:t.value,"onUpdate:modelValue":l[0]||(l[0]=e=>t.value=e),placeholder:e.$t("loginDialog.username")},null,8,["modelValue","placeholder"]),(0,a.bF)(r,{type:"password",modelValue:n.value,"onUpdate:modelValue":l[1]||(l[1]=e=>n.value=e),placeholder:e.$t("loginDialog.password")},null,8,["modelValue","placeholder"])])),_:1}),(0,a.bF)(f,{class:"d-flex flex-row justify-space-between"},{default:(0,a.k6)((()=>[(0,a.bF)(c,{onClick:l[2]||(l[2]=e=>d(!1))},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("general.abort")),1)])),_:1}),(0,a.bF)(c,{onClick:v,disabled:!p.value},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("loginDialog.login")),1)])),_:1},8,["disabled"])])),_:1})])),_:1})])),_:1},8,["modelValue"])}}});const D=$;var A=D;const T={key:0};var X=(0,a.pM)({__name:"RegisterDialog",setup(e,{expose:l}){const t=(0,o.KR)(""),n=(0,o.KR)(""),i=(0,o.KR)(""),r=(0,o.KR)(!1),s=(0,o.KR)();async function c(){return f.value=!0,await new Promise(((e,l)=>{s.value=e}))}function d(e){f.value=!1,void 0!==s.value&&s.value({accept:e})}async function v(){const e=K(t.value,i.value,n.value);e?d(!0):r.value=!0}const f=(0,o.KR)(!1),g=(0,a.EW)((()=>""!==t.value&&""!==i.value));return l({open:c}),(e,l)=>{const o=(0,a.g2)("v-card-title"),s=(0,a.g2)("v-text-field"),c=(0,a.g2)("v-card-text"),p=(0,a.g2)("v-btn"),m=(0,a.g2)("v-card-actions"),k=(0,a.g2)("v-card"),b=(0,a.g2)("v-dialog");return(0,a.uX)(),(0,a.Wv)(b,{class:"w-50",modelValue:f.value,"onUpdate:modelValue":l[4]||(l[4]=e=>f.value=e),persistent:""},{default:(0,a.k6)((()=>[(0,a.bF)(k,null,{default:(0,a.k6)((()=>[(0,a.bF)(o,null,{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("loginDialog.login")),1)])),_:1}),(0,a.bF)(c,null,{default:(0,a.k6)((()=>[r.value?((0,a.uX)(),(0,a.CE)("p",T,(0,u.v_)(e.$t("loginDialog.errorMessage")),1)):(0,a.Q3)("",!0),(0,a.bF)(s,{type:"username",modelValue:t.value,"onUpdate:modelValue":l[0]||(l[0]=e=>t.value=e),placeholder:e.$t("loginDialog.username")},null,8,["modelValue","placeholder"]),(0,a.bF)(s,{type:"username",modelValue:n.value,"onUpdate:modelValue":l[1]||(l[1]=e=>n.value=e),placeholder:e.$t("loginDialog.fullName")},null,8,["modelValue","placeholder"]),(0,a.bF)(s,{type:"password",modelValue:i.value,"onUpdate:modelValue":l[2]||(l[2]=e=>i.value=e),placeholder:e.$t("loginDialog.password")},null,8,["modelValue","placeholder"])])),_:1}),(0,a.bF)(m,{class:"d-flex flex-row justify-space-between"},{default:(0,a.k6)((()=>[(0,a.bF)(p,{onClick:l[3]||(l[3]=e=>d(!1))},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("general.abort")),1)])),_:1}),(0,a.bF)(p,{onClick:v,disabled:!g.value},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("loginDialog.login")),1)])),_:1},8,["disabled"])])),_:1})])),_:1})])),_:1},8,["modelValue"])}}});const j=X;var E=j;const O={key:0},M={class:"w-75"};var N=(0,a.pM)({__name:"App",setup(e){const l=(0,o.KR)([]),t=(0,o.KR)(""),n=(0,o.KR)(!1),i=f(),r=(0,o.KR)(null),s=(0,o.KR)(null);async function c(){n.value=!0;await m({text:t.value});t.value="",setTimeout((()=>{n.value=!1}),1e3)}function d(){i.theme="dark"===i.theme?"light":"dark"}async function v(){null!==r.value&&r.value.open()}async function g(){null!==s.value&&s.value.open()}(0,a.sV)((async()=>{const e=(0,R.io)("/notes");e.on("addNote",(e=>{l.value.push(e)})),e.on("removeNote",(e=>{l.value=l.value.filter((l=>l.id!==e))})),e.on("editNote",(e=>{const t=l.value.find((l=>l.id===e.id));void 0!==t&&(t.text=e.text,t.timestamp=e.timestamp)}));const t=await p();null!==t&&(l.value=t)}));const k=(0,a.EW)((()=>""!==t.value)),b=(0,a.EW)((()=>{const e=l.value.slice().reverse();return e}));return(e,l)=>{const f=(0,a.g2)("v-app-bar-title"),p=(0,a.g2)("v-btn"),m=(0,a.g2)("v-icon"),_=(0,a.g2)("v-list-item"),y=(0,a.g2)("v-list"),h=(0,a.g2)("v-menu"),F=(0,a.g2)("v-app-bar"),w=(0,a.g2)("v-card-title"),x=(0,a.g2)("v-textarea"),R=(0,a.g2)("v-card-text"),V=(0,a.g2)("v-card-actions"),K=(0,a.g2)("v-card"),C=(0,a.g2)("v-layout"),$=(0,a.g2)("v-container"),D=(0,a.g2)("v-main"),T=(0,a.g2)("v-app");return(0,a.uX)(),(0,a.Wv)(T,{theme:(0,o.R1)(i).theme},{default:(0,a.k6)((()=>[(0,a.bF)(F,{elevation:2},{append:(0,a.k6)((()=>[(0,a.bF)(p,{icon:"mdi-theme-light-dark",onClick:d}),(0,a.bF)(p,{icon:"mdi-account"},{default:(0,a.k6)((()=>[(0,a.bF)(m,{icon:"mdi-account"}),(0,a.bF)(h,{activator:"parent"},{default:(0,a.k6)((()=>[(0,a.bF)(y,null,{default:(0,a.k6)((()=>[null===(0,o.R1)(i).user?((0,a.uX)(),(0,a.CE)("div",O,[(0,a.bF)(_,{onClick:v},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("general.login")),1)])),_:1}),(0,a.bF)(_,{onClick:g},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("general.register")),1)])),_:1})])):((0,a.uX)(),(0,a.Wv)(_,{key:1,onClick:l[0]||(l[0]=e=>(0,o.R1)(i).user=null)},{default:(0,a.k6)((()=>[(0,a.eW)((0,u.v_)(e.$t("general.logout")),1)])),_:1}))])),_:1})])),_:1})])),_:1})])),default:(0,a.k6)((()=>[(0,a.bF)(f,null,{default:(0,a.k6)((()=>l[3]||(l[3]=[(0,a.eW)("Application Bar")]))),_:1})])),_:1}),(0,a.bF)(D,null,{default:(0,a.k6)((()=>[(0,a.bF)($,null,{default:(0,a.k6)((()=>[(0,a.bF)(C,{row:"",wrap:"","align-center":"",class:"justify-center"},{default:(0,a.k6)((()=>[(0,a.Lk)("div",M,[(0,a.bF)(K,{justify:"center",class:"mb-3"},{default:(0,a.k6)((()=>[(0,a.bF)(w,{class:"text-left"},{default:(0,a.k6)((()=>l[4]||(l[4]=[(0,a.eW)("Note erstellen")]))),_:1}),(0,a.bF)(R,null,{default:(0,a.k6)((()=>[(0,a.bF)(x,{modelValue:t.value,"onUpdate:modelValue":l[1]||(l[1]=e=>t.value=e)},null,8,["modelValue"])])),_:1}),(0,a.bF)(V,null,{default:(0,a.k6)((()=>[(0,a.bF)(p,{onClick:l[2]||(l[2]=e=>t.value=""),disabled:!k.value},{default:(0,a.k6)((()=>l[5]||(l[5]=[(0,a.eW)("Reset")]))),_:1},8,["disabled"]),(0,a.bF)(p,{onClick:c,disabled:!k.value,loading:n.value},{default:(0,a.k6)((()=>l[6]||(l[6]=[(0,a.eW)("Senden")]))),_:1},8,["disabled","loading"])])),_:1})])),_:1}),(0,a.bF)(y,null,{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(b.value,(e=>((0,a.uX)(),(0,a.Wv)(W,{note:e,key:e.id,class:"element"},null,8,["note"])))),128))])),_:1})])])),_:1})])),_:1})])),_:1}),(0,a.bF)(A,{ref_key:"loginDialog",ref:r},null,512),(0,a.bF)(E,{ref_key:"registerDialog",ref:s},null,512)])),_:1},8,["theme"])}}});const U=N;var L=U,P=t(1920),S=t(5741),B=(t(5524),t(7768)),z=e=>{const l=(0,B.$N)({directives:S,components:P});e.use(l)},Q=t(5931),H=t(5827),I={general:{yes:"Ja",no:"Nein",abort:"Abbrechen"},loginDialog:{login:"Anmelden",username:"Benutzername",password:"Passwort"}},Y={general:{yes:"Yes",no:"No",abort:"Abort"},loginDialog:{login:"Login",username:"Username",password:"Password"}};const J=(0,n.Ef)(L),q=(0,v.Ey)();q.use(H.A);const G=(0,Q.hU)({locale:"de",fallbackLocale:"de",messages:{de:I,en:Y},datetimeFormats:{en:{short:{year:"numeric",month:"numeric",day:"numeric"},long:{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}},de:{short:{year:"numeric",month:"numeric",day:"numeric"},long:{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}}}});z(J),J.use(G),J.use(q),J.mount("#app")}},l={};function t(n){var a=l[n];if(void 0!==a)return a.exports;var o=l[n]={exports:{}};return e[n].call(o.exports,o,o.exports,t),o.exports}t.m=e,function(){var e=[];t.O=function(l,n,a,o){if(!n){var u=1/0;for(c=0;c<e.length;c++){n=e[c][0],a=e[c][1],o=e[c][2];for(var i=!0,r=0;r<n.length;r++)(!1&o||u>=o)&&Object.keys(t.O).every((function(e){return t.O[e](n[r])}))?n.splice(r--,1):(i=!1,o<u&&(u=o));if(i){e.splice(c--,1);var s=a();void 0!==s&&(l=s)}}return l}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[n,a,o]}}(),function(){t.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(l,{a:l}),l}}(),function(){t.d=function(e,l){for(var n in l)t.o(l,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:l[n]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};t.O.j=function(l){return 0===e[l]};var l=function(l,n){var a,o,u=n[0],i=n[1],r=n[2],s=0;if(u.some((function(l){return 0!==e[l]}))){for(a in i)t.o(i,a)&&(t.m[a]=i[a]);if(r)var c=r(t)}for(l&&l(n);s<u.length;s++)o=u[s],t.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return t.O(c)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(l.bind(null,0)),n.push=l.bind(null,n.push.bind(n))}();var n=t.O(void 0,[504],(function(){return t(4455)}));n=t.O(n)})();
//# sourceMappingURL=app.53bbc36c.js.map