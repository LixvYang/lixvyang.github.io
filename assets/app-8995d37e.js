var X1=Object.defineProperty;var J1=(e,t,n)=>t in e?X1(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ca=(e,t,n)=>(J1(e,typeof t!="symbol"?t+"":t,n),n);const Q1="modulepreload",e0=function(e){return"/"+e},Us={},v=function(t,n,r){if(!n||n.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=e0(o),o in Us)return;Us[o]=!0;const s=o.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(!!r)for(let d=a.length-1;d>=0;d--){const p=a[d];if(p.href===o&&(!s||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const c=document.createElement("link");if(c.rel=s?"stylesheet":Q1,s||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),s)return new Promise((d,p)=>{c.addEventListener("load",d),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t()).catch(o=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o})};function No(e,t){const n=Object.create(null),r=e.split(",");for(let a=0;a<r.length;a++)n[r[a]]=!0;return t?a=>!!n[a.toLowerCase()]:a=>!!n[a]}const Re={},On=[],_t=()=>{},t0=()=>!1,n0=/^on[^a-z]/,Sr=e=>n0.test(e),Vo=e=>e.startsWith("onUpdate:"),De=Object.assign,Mo=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},r0=Object.prototype.hasOwnProperty,me=(e,t)=>r0.call(e,t),J=Array.isArray,Cn=e=>ha(e)==="[object Map]",kl=e=>ha(e)==="[object Set]",ne=e=>typeof e=="function",pe=e=>typeof e=="string",$o=e=>typeof e=="symbol",Se=e=>e!==null&&typeof e=="object",Sl=e=>Se(e)&&ne(e.then)&&ne(e.catch),Rl=Object.prototype.toString,ha=e=>Rl.call(e),a0=e=>ha(e).slice(8,-1),wl=e=>ha(e)==="[object Object]",Fo=e=>pe(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,sr=No(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ma=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},o0=/-(\w)/g,ut=ma(e=>e.replace(o0,(t,n)=>n?n.toUpperCase():"")),s0=/\B([A-Z])/g,gn=ma(e=>e.replace(s0,"-$1").toLowerCase()),Rr=ma(e=>e.charAt(0).toUpperCase()+e.slice(1)),Da=ma(e=>e?`on${Rr(e)}`:""),vr=(e,t)=>!Object.is(e,t),ta=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},ra=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},oo=e=>{const t=parseFloat(e);return isNaN(t)?e:t},i0=e=>{const t=pe(e)?Number(e):NaN;return isNaN(t)?e:t};let js;const so=()=>js||(js=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ho(e){if(J(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],a=pe(r)?d0(r):Ho(r);if(a)for(const o in a)t[o]=a[o]}return t}else{if(pe(e))return e;if(Se(e))return e}}const l0=/;(?![^(]*\))/g,c0=/:([^]+)/,u0=/\/\*[^]*?\*\//g;function d0(e){const t={};return e.replace(u0,"").split(l0).forEach(n=>{if(n){const r=n.split(c0);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function Go(e){let t="";if(pe(e))t=e;else if(J(e))for(let n=0;n<e.length;n++){const r=Go(e[n]);r&&(t+=r+" ")}else if(Se(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const p0="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",f0=No(p0);function Tl(e){return!!e||e===""}const o8=e=>pe(e)?e:e==null?"":J(e)||Se(e)&&(e.toString===Rl||!ne(e.toString))?JSON.stringify(e,Il,2):String(e),Il=(e,t)=>t&&t.__v_isRef?Il(e,t.value):Cn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,a])=>(n[`${r} =>`]=a,n),{})}:kl(t)?{[`Set(${t.size})`]:[...t.values()]}:Se(t)&&!J(t)&&!wl(t)?String(t):t;let Je;class v0{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Je,!t&&Je&&(this.index=(Je.scopes||(Je.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=Je;try{return Je=this,t()}finally{Je=n}}}on(){Je=this}off(){Je=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this._active=!1}}}function h0(e,t=Je){t&&t.active&&t.effects.push(e)}function Ll(){return Je}function m0(e){Je&&Je.cleanups.push(e)}const zo=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Pl=e=>(e.w&Yt)>0,Ol=e=>(e.n&Yt)>0,g0=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Yt},_0=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const a=t[r];Pl(a)&&!Ol(a)?a.delete(e):t[n++]=a,a.w&=~Yt,a.n&=~Yt}t.length=n}},aa=new WeakMap;let ar=0,Yt=1;const io=30;let mt;const pn=Symbol(""),lo=Symbol("");class Ko{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,h0(this,r)}run(){if(!this.active)return this.fn();let t=mt,n=Ut;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=mt,mt=this,Ut=!0,Yt=1<<++ar,ar<=io?g0(this):Ys(this),this.fn()}finally{ar<=io&&_0(this),Yt=1<<--ar,mt=this.parent,Ut=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){mt===this?this.deferStop=!0:this.active&&(Ys(this),this.onStop&&this.onStop(),this.active=!1)}}function Ys(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let Ut=!0;const Cl=[];function Wn(){Cl.push(Ut),Ut=!1}function qn(){const e=Cl.pop();Ut=e===void 0?!0:e}function Ze(e,t,n){if(Ut&&mt){let r=aa.get(e);r||aa.set(e,r=new Map);let a=r.get(n);a||r.set(n,a=zo()),Dl(a)}}function Dl(e,t){let n=!1;ar<=io?Ol(e)||(e.n|=Yt,n=!Pl(e)):n=!e.has(mt),n&&(e.add(mt),mt.deps.push(e))}function Dt(e,t,n,r,a,o){const s=aa.get(e);if(!s)return;let l=[];if(t==="clear")l=[...s.values()];else if(n==="length"&&J(e)){const u=Number(r);s.forEach((c,d)=>{(d==="length"||d>=u)&&l.push(c)})}else switch(n!==void 0&&l.push(s.get(n)),t){case"add":J(e)?Fo(n)&&l.push(s.get("length")):(l.push(s.get(pn)),Cn(e)&&l.push(s.get(lo)));break;case"delete":J(e)||(l.push(s.get(pn)),Cn(e)&&l.push(s.get(lo)));break;case"set":Cn(e)&&l.push(s.get(pn));break}if(l.length===1)l[0]&&co(l[0]);else{const u=[];for(const c of l)c&&u.push(...c);co(zo(u))}}function co(e,t){const n=J(e)?e:[...e];for(const r of n)r.computed&&Ws(r);for(const r of n)r.computed||Ws(r)}function Ws(e,t){(e!==mt||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}function E0(e,t){var n;return(n=aa.get(e))==null?void 0:n.get(t)}const y0=No("__proto__,__v_isRef,__isVue"),xl=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter($o)),b0=Uo(),A0=Uo(!1,!0),k0=Uo(!0),qs=S0();function S0(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=fe(this);for(let o=0,s=this.length;o<s;o++)Ze(r,"get",o+"");const a=r[t](...n);return a===-1||a===!1?r[t](...n.map(fe)):a}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Wn();const r=fe(this)[t].apply(this,n);return qn(),r}}),e}function R0(e){const t=fe(this);return Ze(t,"has",e),t.hasOwnProperty(e)}function Uo(e=!1,t=!1){return function(r,a,o){if(a==="__v_isReactive")return!e;if(a==="__v_isReadonly")return e;if(a==="__v_isShallow")return t;if(a==="__v_raw"&&o===(e?t?H0:$l:t?Ml:Vl).get(r))return r;const s=J(r);if(!e){if(s&&me(qs,a))return Reflect.get(qs,a,o);if(a==="hasOwnProperty")return R0}const l=Reflect.get(r,a,o);return($o(a)?xl.has(a):y0(a))||(e||Ze(r,"get",a),t)?l:Ve(l)?s&&Fo(a)?l:l.value:Se(l)?e?Xt(l):wr(l):l}}const w0=Bl(),T0=Bl(!0);function Bl(e=!1){return function(n,r,a,o){let s=n[r];if(Fn(s)&&Ve(s)&&!Ve(a))return!1;if(!e&&(!oa(a)&&!Fn(a)&&(s=fe(s),a=fe(a)),!J(n)&&Ve(s)&&!Ve(a)))return s.value=a,!0;const l=J(n)&&Fo(r)?Number(r)<n.length:me(n,r),u=Reflect.set(n,r,a,o);return n===fe(o)&&(l?vr(a,s)&&Dt(n,"set",r,a):Dt(n,"add",r,a)),u}}function I0(e,t){const n=me(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Dt(e,"delete",t,void 0),r}function L0(e,t){const n=Reflect.has(e,t);return(!$o(t)||!xl.has(t))&&Ze(e,"has",t),n}function P0(e){return Ze(e,"iterate",J(e)?"length":pn),Reflect.ownKeys(e)}const Nl={get:b0,set:w0,deleteProperty:I0,has:L0,ownKeys:P0},O0={get:k0,set(e,t){return!0},deleteProperty(e,t){return!0}},C0=De({},Nl,{get:A0,set:T0}),jo=e=>e,ga=e=>Reflect.getPrototypeOf(e);function Fr(e,t,n=!1,r=!1){e=e.__v_raw;const a=fe(e),o=fe(t);n||(t!==o&&Ze(a,"get",t),Ze(a,"get",o));const{has:s}=ga(a),l=r?jo:n?qo:hr;if(s.call(a,t))return l(e.get(t));if(s.call(a,o))return l(e.get(o));e!==a&&e.get(t)}function Hr(e,t=!1){const n=this.__v_raw,r=fe(n),a=fe(e);return t||(e!==a&&Ze(r,"has",e),Ze(r,"has",a)),e===a?n.has(e):n.has(e)||n.has(a)}function Gr(e,t=!1){return e=e.__v_raw,!t&&Ze(fe(e),"iterate",pn),Reflect.get(e,"size",e)}function Zs(e){e=fe(e);const t=fe(this);return ga(t).has.call(t,e)||(t.add(e),Dt(t,"add",e,e)),this}function Xs(e,t){t=fe(t);const n=fe(this),{has:r,get:a}=ga(n);let o=r.call(n,e);o||(e=fe(e),o=r.call(n,e));const s=a.call(n,e);return n.set(e,t),o?vr(t,s)&&Dt(n,"set",e,t):Dt(n,"add",e,t),this}function Js(e){const t=fe(this),{has:n,get:r}=ga(t);let a=n.call(t,e);a||(e=fe(e),a=n.call(t,e)),r&&r.call(t,e);const o=t.delete(e);return a&&Dt(t,"delete",e,void 0),o}function Qs(){const e=fe(this),t=e.size!==0,n=e.clear();return t&&Dt(e,"clear",void 0,void 0),n}function zr(e,t){return function(r,a){const o=this,s=o.__v_raw,l=fe(s),u=t?jo:e?qo:hr;return!e&&Ze(l,"iterate",pn),s.forEach((c,d)=>r.call(a,u(c),u(d),o))}}function Kr(e,t,n){return function(...r){const a=this.__v_raw,o=fe(a),s=Cn(o),l=e==="entries"||e===Symbol.iterator&&s,u=e==="keys"&&s,c=a[e](...r),d=n?jo:t?qo:hr;return!t&&Ze(o,"iterate",u?lo:pn),{next(){const{value:p,done:f}=c.next();return f?{value:p,done:f}:{value:l?[d(p[0]),d(p[1])]:d(p),done:f}},[Symbol.iterator](){return this}}}}function Vt(e){return function(...t){return e==="delete"?!1:this}}function D0(){const e={get(o){return Fr(this,o)},get size(){return Gr(this)},has:Hr,add:Zs,set:Xs,delete:Js,clear:Qs,forEach:zr(!1,!1)},t={get(o){return Fr(this,o,!1,!0)},get size(){return Gr(this)},has:Hr,add:Zs,set:Xs,delete:Js,clear:Qs,forEach:zr(!1,!0)},n={get(o){return Fr(this,o,!0)},get size(){return Gr(this,!0)},has(o){return Hr.call(this,o,!0)},add:Vt("add"),set:Vt("set"),delete:Vt("delete"),clear:Vt("clear"),forEach:zr(!0,!1)},r={get(o){return Fr(this,o,!0,!0)},get size(){return Gr(this,!0)},has(o){return Hr.call(this,o,!0)},add:Vt("add"),set:Vt("set"),delete:Vt("delete"),clear:Vt("clear"),forEach:zr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=Kr(o,!1,!1),n[o]=Kr(o,!0,!1),t[o]=Kr(o,!1,!0),r[o]=Kr(o,!0,!0)}),[e,n,t,r]}const[x0,B0,N0,V0]=D0();function Yo(e,t){const n=t?e?V0:N0:e?B0:x0;return(r,a,o)=>a==="__v_isReactive"?!e:a==="__v_isReadonly"?e:a==="__v_raw"?r:Reflect.get(me(n,a)&&a in r?n:r,a,o)}const M0={get:Yo(!1,!1)},$0={get:Yo(!1,!0)},F0={get:Yo(!0,!1)},Vl=new WeakMap,Ml=new WeakMap,$l=new WeakMap,H0=new WeakMap;function G0(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function z0(e){return e.__v_skip||!Object.isExtensible(e)?0:G0(a0(e))}function wr(e){return Fn(e)?e:Wo(e,!1,Nl,M0,Vl)}function Fl(e){return Wo(e,!1,C0,$0,Ml)}function Xt(e){return Wo(e,!0,O0,F0,$l)}function Wo(e,t,n,r,a){if(!Se(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=a.get(e);if(o)return o;const s=z0(e);if(s===0)return e;const l=new Proxy(e,s===2?r:n);return a.set(e,l),l}function Dn(e){return Fn(e)?Dn(e.__v_raw):!!(e&&e.__v_isReactive)}function Fn(e){return!!(e&&e.__v_isReadonly)}function oa(e){return!!(e&&e.__v_isShallow)}function Hl(e){return Dn(e)||Fn(e)}function fe(e){const t=e&&e.__v_raw;return t?fe(t):e}function Gl(e){return ra(e,"__v_skip",!0),e}const hr=e=>Se(e)?wr(e):e,qo=e=>Se(e)?Xt(e):e;function Zo(e){Ut&&mt&&(e=fe(e),Dl(e.dep||(e.dep=zo())))}function Xo(e,t){e=fe(e);const n=e.dep;n&&co(n)}function Ve(e){return!!(e&&e.__v_isRef===!0)}function $(e){return zl(e,!1)}function Le(e){return zl(e,!0)}function zl(e,t){return Ve(e)?e:new K0(e,t)}class K0{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:fe(t),this._value=n?t:hr(t)}get value(){return Zo(this),this._value}set value(t){const n=this.__v_isShallow||oa(t)||Fn(t);t=n?t:fe(t),vr(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:hr(t),Xo(this))}}function fn(e){return Ve(e)?e.value:e}const U0={get:(e,t,n)=>fn(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const a=e[t];return Ve(a)&&!Ve(n)?(a.value=n,!0):Reflect.set(e,t,n,r)}};function Kl(e){return Dn(e)?e:new Proxy(e,U0)}class j0{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:n,set:r}=t(()=>Zo(this),()=>Xo(this));this._get=n,this._set=r}get value(){return this._get()}set value(t){this._set(t)}}function Ul(e){return new j0(e)}class Y0{constructor(t,n,r){this._object=t,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return E0(fe(this._object),this._key)}}class W0{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Zn(e,t,n){return Ve(e)?e:ne(e)?new W0(e):Se(e)&&arguments.length>1?q0(e,t,n):$(e)}function q0(e,t,n){const r=e[t];return Ve(r)?r:new Y0(e,t,n)}class Z0{constructor(t,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Ko(t,()=>{this._dirty||(this._dirty=!0,Xo(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const t=fe(this);return Zo(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function X0(e,t,n=!1){let r,a;const o=ne(e);return o?(r=e,a=_t):(r=e.get,a=e.set),new Z0(r,a,o||!a,n)}function jt(e,t,n,r){let a;try{a=r?e(...r):e()}catch(o){Tr(o,t,n)}return a}function ct(e,t,n,r){if(ne(e)){const o=jt(e,t,n,r);return o&&Sl(o)&&o.catch(s=>{Tr(s,t,n)}),o}const a=[];for(let o=0;o<e.length;o++)a.push(ct(e[o],t,n,r));return a}function Tr(e,t,n,r=!0){const a=t?t.vnode:null;if(t){let o=t.parent;const s=t.proxy,l=n;for(;o;){const c=o.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](e,s,l)===!1)return}o=o.parent}const u=t.appContext.config.errorHandler;if(u){jt(u,null,10,[e,s,l]);return}}J0(e,n,a,r)}function J0(e,t,n,r=!0){console.error(e)}let mr=!1,uo=!1;const Fe=[];let St=0;const xn=[];let Ct=null,ln=0;const jl=Promise.resolve();let Jo=null;function Jt(e){const t=Jo||jl;return e?t.then(this?e.bind(this):e):t}function Q0(e){let t=St+1,n=Fe.length;for(;t<n;){const r=t+n>>>1;gr(Fe[r])<e?t=r+1:n=r}return t}function _a(e){(!Fe.length||!Fe.includes(e,mr&&e.allowRecurse?St+1:St))&&(e.id==null?Fe.push(e):Fe.splice(Q0(e.id),0,e),Yl())}function Yl(){!mr&&!uo&&(uo=!0,Jo=jl.then(Wl))}function e2(e){const t=Fe.indexOf(e);t>St&&Fe.splice(t,1)}function t2(e){J(e)?xn.push(...e):(!Ct||!Ct.includes(e,e.allowRecurse?ln+1:ln))&&xn.push(e),Yl()}function ei(e,t=mr?St+1:0){for(;t<Fe.length;t++){const n=Fe[t];n&&n.pre&&(Fe.splice(t,1),t--,n())}}function sa(e){if(xn.length){const t=[...new Set(xn)];if(xn.length=0,Ct){Ct.push(...t);return}for(Ct=t,Ct.sort((n,r)=>gr(n)-gr(r)),ln=0;ln<Ct.length;ln++)Ct[ln]();Ct=null,ln=0}}const gr=e=>e.id==null?1/0:e.id,n2=(e,t)=>{const n=gr(e)-gr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Wl(e){uo=!1,mr=!0,Fe.sort(n2);const t=_t;try{for(St=0;St<Fe.length;St++){const n=Fe[St];n&&n.active!==!1&&jt(n,null,14)}}finally{St=0,Fe.length=0,sa(),mr=!1,Jo=null,(Fe.length||xn.length)&&Wl()}}function r2(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||Re;let a=n;const o=t.startsWith("update:"),s=o&&t.slice(7);if(s&&s in r){const d=`${s==="modelValue"?"model":s}Modifiers`,{number:p,trim:f}=r[d]||Re;f&&(a=n.map(h=>pe(h)?h.trim():h)),p&&(a=n.map(oo))}let l,u=r[l=Da(t)]||r[l=Da(ut(t))];!u&&o&&(u=r[l=Da(gn(t))]),u&&ct(u,e,6,a);const c=r[l+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,ct(c,e,6,a)}}function ql(e,t,n=!1){const r=t.emitsCache,a=r.get(e);if(a!==void 0)return a;const o=e.emits;let s={},l=!1;if(!ne(e)){const u=c=>{const d=ql(c,t,!0);d&&(l=!0,De(s,d))};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}return!o&&!l?(Se(e)&&r.set(e,null),null):(J(o)?o.forEach(u=>s[u]=null):De(s,o),Se(e)&&r.set(e,s),s)}function Ea(e,t){return!e||!Sr(t)?!1:(t=t.slice(2).replace(/Once$/,""),me(e,t[0].toLowerCase()+t.slice(1))||me(e,gn(t))||me(e,t))}let $e=null,ya=null;function ia(e){const t=$e;return $e=e,ya=e&&e.type.__scopeId||null,t}function s8(e){ya=e}function i8(){ya=null}function a2(e,t=$e,n){if(!t||e._n)return e;const r=(...a)=>{r._d&&pi(-1);const o=ia(t);let s;try{s=e(...a)}finally{ia(o),r._d&&pi(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function xa(e){const{type:t,vnode:n,proxy:r,withProxy:a,props:o,propsOptions:[s],slots:l,attrs:u,emit:c,render:d,renderCache:p,data:f,setupState:h,ctx:g,inheritAttrs:A}=e;let R,_;const y=ia(e);try{if(n.shapeFlag&4){const D=a||r;R=ht(d.call(D,D,p,o,h,f,g)),_=u}else{const D=t;R=ht(D.length>1?D(o,{attrs:u,slots:l,emit:c}):D(o,null)),_=t.props?u:o2(u)}}catch(D){cr.length=0,Tr(D,e,1),R=Pe(nt)}let O=R;if(_&&A!==!1){const D=Object.keys(_),{shapeFlag:U}=O;D.length&&U&7&&(s&&D.some(Vo)&&(_=s2(_,s)),O=Wt(O,_))}return n.dirs&&(O=Wt(O),O.dirs=O.dirs?O.dirs.concat(n.dirs):n.dirs),n.transition&&(O.transition=n.transition),R=O,ia(y),R}const o2=e=>{let t;for(const n in e)(n==="class"||n==="style"||Sr(n))&&((t||(t={}))[n]=e[n]);return t},s2=(e,t)=>{const n={};for(const r in e)(!Vo(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function i2(e,t,n){const{props:r,children:a,component:o}=e,{props:s,children:l,patchFlag:u}=t,c=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&u>=0){if(u&1024)return!0;if(u&16)return r?ti(r,s,c):!!s;if(u&8){const d=t.dynamicProps;for(let p=0;p<d.length;p++){const f=d[p];if(s[f]!==r[f]&&!Ea(c,f))return!0}}}else return(a||l)&&(!l||!l.$stable)?!0:r===s?!1:r?s?ti(r,s,c):!0:!!s;return!1}function ti(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let a=0;a<r.length;a++){const o=r[a];if(t[o]!==e[o]&&!Ea(n,o))return!0}return!1}function l2({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const c2=e=>e.__isSuspense;function Zl(e,t){t&&t.pendingBranch?J(e)?t.effects.push(...e):t.effects.push(e):t2(e)}function Xl(e,t){return Qo(e,null,t)}const Ur={};function re(e,t,n){return Qo(e,t,n)}function Qo(e,t,{immediate:n,deep:r,flush:a,onTrack:o,onTrigger:s}=Re){var l;const u=Ll()===((l=Ne)==null?void 0:l.scope)?Ne:null;let c,d=!1,p=!1;if(Ve(e)?(c=()=>e.value,d=oa(e)):Dn(e)?(c=()=>e,r=!0):J(e)?(p=!0,d=e.some(D=>Dn(D)||oa(D)),c=()=>e.map(D=>{if(Ve(D))return D.value;if(Dn(D))return dn(D);if(ne(D))return jt(D,u,2)})):ne(e)?t?c=()=>jt(e,u,2):c=()=>{if(!(u&&u.isUnmounted))return f&&f(),ct(e,u,3,[h])}:c=_t,t&&r){const D=c;c=()=>dn(D())}let f,h=D=>{f=y.onStop=()=>{jt(D,u,4)}},g;if(zn)if(h=_t,t?n&&ct(t,u,3,[c(),p?[]:void 0,h]):c(),a==="sync"){const D=nd();g=D.__watcherHandles||(D.__watcherHandles=[])}else return _t;let A=p?new Array(e.length).fill(Ur):Ur;const R=()=>{if(y.active)if(t){const D=y.run();(r||d||(p?D.some((U,x)=>vr(U,A[x])):vr(D,A)))&&(f&&f(),ct(t,u,3,[D,A===Ur?void 0:p&&A[0]===Ur?[]:A,h]),A=D)}else y.run()};R.allowRecurse=!!t;let _;a==="sync"?_=R:a==="post"?_=()=>Ye(R,u&&u.suspense):(R.pre=!0,u&&(R.id=u.uid),_=()=>_a(R));const y=new Ko(c,_);t?n?R():A=y.run():a==="post"?Ye(y.run.bind(y),u&&u.suspense):y.run();const O=()=>{y.stop(),u&&u.scope&&Mo(u.scope.effects,y)};return g&&g.push(O),O}function u2(e,t,n){const r=this.proxy,a=pe(e)?e.includes(".")?Jl(r,e):()=>r[e]:e.bind(r,r);let o;ne(t)?o=t:(o=t.handler,n=t);const s=Ne;Gn(this);const l=Qo(a,o.bind(r),n);return s?Gn(s):vn(),l}function Jl(e,t){const n=t.split(".");return()=>{let r=e;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function dn(e,t){if(!Se(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),Ve(e))dn(e.value,t);else if(J(e))for(let n=0;n<e.length;n++)dn(e[n],t);else if(kl(e)||Cn(e))e.forEach(n=>{dn(n,t)});else if(wl(e))for(const n in e)dn(e[n],t);return e}function l8(e,t){const n=$e;if(n===null)return e;const r=ka(n)||n.proxy,a=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[s,l,u,c=Re]=t[o];s&&(ne(s)&&(s={mounted:s,updated:s}),s.deep&&dn(l),a.push({dir:s,instance:r,value:l,oldValue:void 0,arg:u,modifiers:c}))}return e}function kt(e,t,n,r){const a=e.dirs,o=t&&t.dirs;for(let s=0;s<a.length;s++){const l=a[s];o&&(l.oldValue=o[s].value);let u=l.dir[r];u&&(Wn(),ct(u,n,8,[e.el,l,e,t]),qn())}}function Ql(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return se(()=>{e.isMounted=!0}),ts(()=>{e.isUnmounting=!0}),e}const st=[Function,Array],ec={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:st,onEnter:st,onAfterEnter:st,onEnterCancelled:st,onBeforeLeave:st,onLeave:st,onAfterLeave:st,onLeaveCancelled:st,onBeforeAppear:st,onAppear:st,onAfterAppear:st,onAppearCancelled:st},d2={name:"BaseTransition",props:ec,setup(e,{slots:t}){const n=_n(),r=Ql();let a;return()=>{const o=t.default&&es(t.default(),!0);if(!o||!o.length)return;let s=o[0];if(o.length>1){for(const A of o)if(A.type!==nt){s=A;break}}const l=fe(e),{mode:u}=l;if(r.isLeaving)return Ba(s);const c=ni(s);if(!c)return Ba(s);const d=_r(c,l,r,n);Er(c,d);const p=n.subTree,f=p&&ni(p);let h=!1;const{getTransitionKey:g}=c.type;if(g){const A=g();a===void 0?a=A:A!==a&&(a=A,h=!0)}if(f&&f.type!==nt&&(!cn(c,f)||h)){const A=_r(f,l,r,n);if(Er(f,A),u==="out-in")return r.isLeaving=!0,A.afterLeave=()=>{r.isLeaving=!1,n.update.active!==!1&&n.update()},Ba(s);u==="in-out"&&c.type!==nt&&(A.delayLeave=(R,_,y)=>{const O=tc(r,f);O[String(f.key)]=f,R._leaveCb=()=>{_(),R._leaveCb=void 0,delete d.delayedLeave},d.delayedLeave=y})}return s}}},p2=d2;function tc(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function _r(e,t,n,r){const{appear:a,mode:o,persisted:s=!1,onBeforeEnter:l,onEnter:u,onAfterEnter:c,onEnterCancelled:d,onBeforeLeave:p,onLeave:f,onAfterLeave:h,onLeaveCancelled:g,onBeforeAppear:A,onAppear:R,onAfterAppear:_,onAppearCancelled:y}=t,O=String(e.key),D=tc(n,e),U=(I,K)=>{I&&ct(I,r,9,K)},x=(I,K)=>{const G=K[1];U(I,K),J(I)?I.every(oe=>oe.length<=1)&&G():I.length<=1&&G()},q={mode:o,persisted:s,beforeEnter(I){let K=l;if(!n.isMounted)if(a)K=A||l;else return;I._leaveCb&&I._leaveCb(!0);const G=D[O];G&&cn(e,G)&&G.el._leaveCb&&G.el._leaveCb(),U(K,[I])},enter(I){let K=u,G=c,oe=d;if(!n.isMounted)if(a)K=R||u,G=_||c,oe=y||d;else return;let z=!1;const Q=I._enterCb=j=>{z||(z=!0,j?U(oe,[I]):U(G,[I]),q.delayedLeave&&q.delayedLeave(),I._enterCb=void 0)};K?x(K,[I,Q]):Q()},leave(I,K){const G=String(e.key);if(I._enterCb&&I._enterCb(!0),n.isUnmounting)return K();U(p,[I]);let oe=!1;const z=I._leaveCb=Q=>{oe||(oe=!0,K(),Q?U(g,[I]):U(h,[I]),I._leaveCb=void 0,D[G]===e&&delete D[G])};D[G]=e,f?x(f,[I,z]):z()},clone(I){return _r(I,t,n,r)}};return q}function Ba(e){if(Ir(e))return e=Wt(e),e.children=null,e}function ni(e){return Ir(e)?e.children?e.children[0]:void 0:e}function Er(e,t){e.shapeFlag&6&&e.component?Er(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function es(e,t=!1,n){let r=[],a=0;for(let o=0;o<e.length;o++){let s=e[o];const l=n==null?s.key:String(n)+String(s.key!=null?s.key:o);s.type===ze?(s.patchFlag&128&&a++,r=r.concat(es(s.children,t,l))):(t||s.type!==nt)&&r.push(l!=null?Wt(s,{key:l}):s)}if(a>1)for(let o=0;o<r.length;o++)r[o].patchFlag=-2;return r}function B(e,t){return ne(e)?(()=>De({name:e.name},t,{setup:e}))():e}const Bn=e=>!!e.type.__asyncLoader;function b(e){ne(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:r,delay:a=200,timeout:o,suspensible:s=!0,onError:l}=e;let u=null,c,d=0;const p=()=>(d++,u=null,f()),f=()=>{let h;return u||(h=u=t().catch(g=>{if(g=g instanceof Error?g:new Error(String(g)),l)return new Promise((A,R)=>{l(g,()=>A(p()),()=>R(g),d+1)});throw g}).then(g=>h!==u&&u?u:(g&&(g.__esModule||g[Symbol.toStringTag]==="Module")&&(g=g.default),c=g,g)))};return B({name:"AsyncComponentWrapper",__asyncLoader:f,get __asyncResolved(){return c},setup(){const h=Ne;if(c)return()=>Na(c,h);const g=y=>{u=null,Tr(y,h,13,!r)};if(s&&h.suspense||zn)return f().then(y=>()=>Na(y,h)).catch(y=>(g(y),()=>r?Pe(r,{error:y}):null));const A=$(!1),R=$(),_=$(!!a);return a&&setTimeout(()=>{_.value=!1},a),o!=null&&setTimeout(()=>{if(!A.value&&!R.value){const y=new Error(`Async component timed out after ${o}ms.`);g(y),R.value=y}},o),f().then(()=>{A.value=!0,h.parent&&Ir(h.parent.vnode)&&_a(h.parent.update)}).catch(y=>{g(y),R.value=y}),()=>{if(A.value&&c)return Na(c,h);if(R.value&&r)return Pe(r,{error:R.value});if(n&&!_.value)return Pe(n)}}})}function Na(e,t){const{ref:n,props:r,children:a,ce:o}=t.vnode,s=Pe(e,r,a);return s.ref=n,s.ce=o,delete t.vnode.ce,s}const Ir=e=>e.type.__isKeepAlive;function f2(e,t){nc(e,"a",t)}function v2(e,t){nc(e,"da",t)}function nc(e,t,n=Ne){const r=e.__wdc||(e.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return e()});if(ba(t,r,n),n){let a=n.parent;for(;a&&a.parent;)Ir(a.parent.vnode)&&h2(r,t,n,a),a=a.parent}}function h2(e,t,n,r){const a=ba(t,e,r,!0);Qt(()=>{Mo(r[t],a)},n)}function ba(e,t,n=Ne,r=!1){if(n){const a=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;Wn(),Gn(n);const l=ct(t,n,e,s);return vn(),qn(),l});return r?a.unshift(o):a.push(o),o}}const Bt=e=>(t,n=Ne)=>(!zn||e==="sp")&&ba(e,(...r)=>t(...r),n),m2=Bt("bm"),se=Bt("m"),g2=Bt("bu"),rc=Bt("u"),ts=Bt("bum"),Qt=Bt("um"),_2=Bt("sp"),E2=Bt("rtg"),y2=Bt("rtc");function b2(e,t=Ne){ba("ec",e,t)}const ac="components";function et(e,t){return k2(ac,e,!0,t)||e}const A2=Symbol.for("v-ndc");function k2(e,t,n=!0,r=!1){const a=$e||Ne;if(a){const o=a.type;if(e===ac){const l=Q2(o,!1);if(l&&(l===t||l===ut(t)||l===Rr(ut(t))))return o}const s=ri(a[e]||o[e],t)||ri(a.appContext[e],t);return!s&&r?o:s}}function ri(e,t){return e&&(e[t]||e[ut(t)]||e[Rr(ut(t))])}function c8(e,t,n,r){let a;const o=n&&n[r];if(J(e)||pe(e)){a=new Array(e.length);for(let s=0,l=e.length;s<l;s++)a[s]=t(e[s],s,void 0,o&&o[s])}else if(typeof e=="number"){a=new Array(e);for(let s=0;s<e;s++)a[s]=t(s+1,s,void 0,o&&o[s])}else if(Se(e))if(e[Symbol.iterator])a=Array.from(e,(s,l)=>t(s,l,void 0,o&&o[l]));else{const s=Object.keys(e);a=new Array(s.length);for(let l=0,u=s.length;l<u;l++){const c=s[l];a[l]=t(e[c],c,l,o&&o[l])}}else a=[];return n&&(n[r]=a),a}function u8(e,t,n={},r,a){if($e.isCE||$e.parent&&Bn($e.parent)&&$e.parent.isCE)return t!=="default"&&(n.name=t),Pe("slot",n,r&&r());let o=e[t];o&&o._c&&(o._d=!1),vc();const s=o&&oc(o(n)),l=mc(ze,{key:n.key||s&&s.key||`_${t}`},s||(r?r():[]),s&&e._===1?64:-2);return!a&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),o&&o._c&&(o._d=!0),l}function oc(e){return e.some(t=>da(t)?!(t.type===nt||t.type===ze&&!oc(t.children)):!0)?e:null}const po=e=>e?yc(e)?ka(e)||e.proxy:po(e.parent):null,ir=De(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>po(e.parent),$root:e=>po(e.root),$emit:e=>e.emit,$options:e=>ns(e),$forceUpdate:e=>e.f||(e.f=()=>_a(e.update)),$nextTick:e=>e.n||(e.n=Jt.bind(e.proxy)),$watch:e=>u2.bind(e)}),Va=(e,t)=>e!==Re&&!e.__isScriptSetup&&me(e,t),S2={get({_:e},t){const{ctx:n,setupState:r,data:a,props:o,accessCache:s,type:l,appContext:u}=e;let c;if(t[0]!=="$"){const h=s[t];if(h!==void 0)switch(h){case 1:return r[t];case 2:return a[t];case 4:return n[t];case 3:return o[t]}else{if(Va(r,t))return s[t]=1,r[t];if(a!==Re&&me(a,t))return s[t]=2,a[t];if((c=e.propsOptions[0])&&me(c,t))return s[t]=3,o[t];if(n!==Re&&me(n,t))return s[t]=4,n[t];fo&&(s[t]=0)}}const d=ir[t];let p,f;if(d)return t==="$attrs"&&Ze(e,"get",t),d(e);if((p=l.__cssModules)&&(p=p[t]))return p;if(n!==Re&&me(n,t))return s[t]=4,n[t];if(f=u.config.globalProperties,me(f,t))return f[t]},set({_:e},t,n){const{data:r,setupState:a,ctx:o}=e;return Va(a,t)?(a[t]=n,!0):r!==Re&&me(r,t)?(r[t]=n,!0):me(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:a,propsOptions:o}},s){let l;return!!n[s]||e!==Re&&me(e,s)||Va(t,s)||(l=o[0])&&me(l,s)||me(r,s)||me(ir,s)||me(a.config.globalProperties,s)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:me(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function d8(e,t,n){const r=_n();if(n&&n.local){const a=$(e[t]);return re(()=>e[t],o=>a.value=o),re(a,o=>{o!==e[t]&&r.emit(`update:${t}`,o)}),a}else return{__v_isRef:!0,get value(){return e[t]},set value(a){r.emit(`update:${t}`,a)}}}function ai(e){return J(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let fo=!0;function R2(e){const t=ns(e),n=e.proxy,r=e.ctx;fo=!1,t.beforeCreate&&oi(t.beforeCreate,e,"bc");const{data:a,computed:o,methods:s,watch:l,provide:u,inject:c,created:d,beforeMount:p,mounted:f,beforeUpdate:h,updated:g,activated:A,deactivated:R,beforeDestroy:_,beforeUnmount:y,destroyed:O,unmounted:D,render:U,renderTracked:x,renderTriggered:q,errorCaptured:I,serverPrefetch:K,expose:G,inheritAttrs:oe,components:z,directives:Q,filters:j}=t;if(c&&w2(c,r,null),s)for(const _e in s){const te=s[_e];ne(te)&&(r[_e]=te.bind(n))}if(a){const _e=a.call(n,n);Se(_e)&&(e.data=wr(_e))}if(fo=!0,o)for(const _e in o){const te=o[_e],pt=ne(te)?te.bind(n,n):ne(te.get)?te.get.bind(n,n):_t,bt=!ne(te)&&ne(te.set)?te.set.bind(n):_t,je=k({get:pt,set:bt});Object.defineProperty(r,_e,{enumerable:!0,configurable:!0,get:()=>je.value,set:Oe=>je.value=Oe})}if(l)for(const _e in l)sc(l[_e],r,n,_e);if(u){const _e=ne(u)?u.call(n):u;Reflect.ownKeys(_e).forEach(te=>{tt(te,_e[te])})}d&&oi(d,e,"c");function le(_e,te){J(te)?te.forEach(pt=>_e(pt.bind(n))):te&&_e(te.bind(n))}if(le(m2,p),le(se,f),le(g2,h),le(rc,g),le(f2,A),le(v2,R),le(b2,I),le(y2,x),le(E2,q),le(ts,y),le(Qt,D),le(_2,K),J(G))if(G.length){const _e=e.exposed||(e.exposed={});G.forEach(te=>{Object.defineProperty(_e,te,{get:()=>n[te],set:pt=>n[te]=pt})})}else e.exposed||(e.exposed={});U&&e.render===_t&&(e.render=U),oe!=null&&(e.inheritAttrs=oe),z&&(e.components=z),Q&&(e.directives=Q)}function w2(e,t,n=_t){J(e)&&(e=vo(e));for(const r in e){const a=e[r];let o;Se(a)?"default"in a?o=ie(a.from||r,a.default,!0):o=ie(a.from||r):o=ie(a),Ve(o)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>o.value,set:s=>o.value=s}):t[r]=o}}function oi(e,t,n){ct(J(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function sc(e,t,n,r){const a=r.includes(".")?Jl(n,r):()=>n[r];if(pe(e)){const o=t[e];ne(o)&&re(a,o)}else if(ne(e))re(a,e.bind(n));else if(Se(e))if(J(e))e.forEach(o=>sc(o,t,n,r));else{const o=ne(e.handler)?e.handler.bind(n):t[e.handler];ne(o)&&re(a,o,e)}}function ns(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:a,optionsCache:o,config:{optionMergeStrategies:s}}=e.appContext,l=o.get(t);let u;return l?u=l:!a.length&&!n&&!r?u=t:(u={},a.length&&a.forEach(c=>la(u,c,s,!0)),la(u,t,s)),Se(t)&&o.set(t,u),u}function la(e,t,n,r=!1){const{mixins:a,extends:o}=t;o&&la(e,o,n,!0),a&&a.forEach(s=>la(e,s,n,!0));for(const s in t)if(!(r&&s==="expose")){const l=T2[s]||n&&n[s];e[s]=l?l(e[s],t[s]):t[s]}return e}const T2={data:si,props:ii,emits:ii,methods:or,computed:or,beforeCreate:Ge,created:Ge,beforeMount:Ge,mounted:Ge,beforeUpdate:Ge,updated:Ge,beforeDestroy:Ge,beforeUnmount:Ge,destroyed:Ge,unmounted:Ge,activated:Ge,deactivated:Ge,errorCaptured:Ge,serverPrefetch:Ge,components:or,directives:or,watch:L2,provide:si,inject:I2};function si(e,t){return t?e?function(){return De(ne(e)?e.call(this,this):e,ne(t)?t.call(this,this):t)}:t:e}function I2(e,t){return or(vo(e),vo(t))}function vo(e){if(J(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Ge(e,t){return e?[...new Set([].concat(e,t))]:t}function or(e,t){return e?De(Object.create(null),e,t):t}function ii(e,t){return e?J(e)&&J(t)?[...new Set([...e,...t])]:De(Object.create(null),ai(e),ai(t??{})):t}function L2(e,t){if(!e)return t;if(!t)return e;const n=De(Object.create(null),e);for(const r in t)n[r]=Ge(e[r],t[r]);return n}function ic(){return{app:null,config:{isNativeTag:t0,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let P2=0;function O2(e,t){return function(r,a=null){ne(r)||(r=De({},r)),a!=null&&!Se(a)&&(a=null);const o=ic(),s=new Set;let l=!1;const u=o.app={_uid:P2++,_component:r,_props:a,_container:null,_context:o,_instance:null,version:rd,get config(){return o.config},set config(c){},use(c,...d){return s.has(c)||(c&&ne(c.install)?(s.add(c),c.install(u,...d)):ne(c)&&(s.add(c),c(u,...d))),u},mixin(c){return o.mixins.includes(c)||o.mixins.push(c),u},component(c,d){return d?(o.components[c]=d,u):o.components[c]},directive(c,d){return d?(o.directives[c]=d,u):o.directives[c]},mount(c,d,p){if(!l){const f=Pe(r,a);return f.appContext=o,d&&t?t(f,c):e(f,c,p),l=!0,u._container=c,c.__vue_app__=u,ka(f.component)||f.component.proxy}},unmount(){l&&(e(null,u._container),delete u._container.__vue_app__)},provide(c,d){return o.provides[c]=d,u},runWithContext(c){ca=u;try{return c()}finally{ca=null}}};return u}}let ca=null;function tt(e,t){if(Ne){let n=Ne.provides;const r=Ne.parent&&Ne.parent.provides;r===n&&(n=Ne.provides=Object.create(r)),n[e]=t}}function ie(e,t,n=!1){const r=Ne||$e;if(r||ca){const a=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:ca._context.provides;if(a&&e in a)return a[e];if(arguments.length>1)return n&&ne(t)?t.call(r&&r.proxy):t}}function C2(e,t,n,r=!1){const a={},o={};ra(o,Aa,1),e.propsDefaults=Object.create(null),lc(e,t,a,o);for(const s in e.propsOptions[0])s in a||(a[s]=void 0);n?e.props=r?a:Fl(a):e.type.props?e.props=a:e.props=o,e.attrs=o}function D2(e,t,n,r){const{props:a,attrs:o,vnode:{patchFlag:s}}=e,l=fe(a),[u]=e.propsOptions;let c=!1;if((r||s>0)&&!(s&16)){if(s&8){const d=e.vnode.dynamicProps;for(let p=0;p<d.length;p++){let f=d[p];if(Ea(e.emitsOptions,f))continue;const h=t[f];if(u)if(me(o,f))h!==o[f]&&(o[f]=h,c=!0);else{const g=ut(f);a[g]=ho(u,l,g,h,e,!1)}else h!==o[f]&&(o[f]=h,c=!0)}}}else{lc(e,t,a,o)&&(c=!0);let d;for(const p in l)(!t||!me(t,p)&&((d=gn(p))===p||!me(t,d)))&&(u?n&&(n[p]!==void 0||n[d]!==void 0)&&(a[p]=ho(u,l,p,void 0,e,!0)):delete a[p]);if(o!==l)for(const p in o)(!t||!me(t,p))&&(delete o[p],c=!0)}c&&Dt(e,"set","$attrs")}function lc(e,t,n,r){const[a,o]=e.propsOptions;let s=!1,l;if(t)for(let u in t){if(sr(u))continue;const c=t[u];let d;a&&me(a,d=ut(u))?!o||!o.includes(d)?n[d]=c:(l||(l={}))[d]=c:Ea(e.emitsOptions,u)||(!(u in r)||c!==r[u])&&(r[u]=c,s=!0)}if(o){const u=fe(n),c=l||Re;for(let d=0;d<o.length;d++){const p=o[d];n[p]=ho(a,u,p,c[p],e,!me(c,p))}}return s}function ho(e,t,n,r,a,o){const s=e[n];if(s!=null){const l=me(s,"default");if(l&&r===void 0){const u=s.default;if(s.type!==Function&&!s.skipFactory&&ne(u)){const{propsDefaults:c}=a;n in c?r=c[n]:(Gn(a),r=c[n]=u.call(null,t),vn())}else r=u}s[0]&&(o&&!l?r=!1:s[1]&&(r===""||r===gn(n))&&(r=!0))}return r}function cc(e,t,n=!1){const r=t.propsCache,a=r.get(e);if(a)return a;const o=e.props,s={},l=[];let u=!1;if(!ne(e)){const d=p=>{u=!0;const[f,h]=cc(p,t,!0);De(s,f),h&&l.push(...h)};!n&&t.mixins.length&&t.mixins.forEach(d),e.extends&&d(e.extends),e.mixins&&e.mixins.forEach(d)}if(!o&&!u)return Se(e)&&r.set(e,On),On;if(J(o))for(let d=0;d<o.length;d++){const p=ut(o[d]);li(p)&&(s[p]=Re)}else if(o)for(const d in o){const p=ut(d);if(li(p)){const f=o[d],h=s[p]=J(f)||ne(f)?{type:f}:De({},f);if(h){const g=di(Boolean,h.type),A=di(String,h.type);h[0]=g>-1,h[1]=A<0||g<A,(g>-1||me(h,"default"))&&l.push(p)}}}const c=[s,l];return Se(e)&&r.set(e,c),c}function li(e){return e[0]!=="$"}function ci(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function ui(e,t){return ci(e)===ci(t)}function di(e,t){return J(t)?t.findIndex(n=>ui(n,e)):ne(t)&&ui(t,e)?0:-1}const uc=e=>e[0]==="_"||e==="$stable",rs=e=>J(e)?e.map(ht):[ht(e)],x2=(e,t,n)=>{if(t._n)return t;const r=a2((...a)=>rs(t(...a)),n);return r._c=!1,r},dc=(e,t,n)=>{const r=e._ctx;for(const a in e){if(uc(a))continue;const o=e[a];if(ne(o))t[a]=x2(a,o,r);else if(o!=null){const s=rs(o);t[a]=()=>s}}},pc=(e,t)=>{const n=rs(t);e.slots.default=()=>n},B2=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=fe(t),ra(t,"_",n)):dc(t,e.slots={})}else e.slots={},t&&pc(e,t);ra(e.slots,Aa,1)},N2=(e,t,n)=>{const{vnode:r,slots:a}=e;let o=!0,s=Re;if(r.shapeFlag&32){const l=t._;l?n&&l===1?o=!1:(De(a,t),!n&&l===1&&delete a._):(o=!t.$stable,dc(t,a)),s=t}else t&&(pc(e,t),s={default:1});if(o)for(const l in a)!uc(l)&&!(l in s)&&delete a[l]};function ua(e,t,n,r,a=!1){if(J(e)){e.forEach((f,h)=>ua(f,t&&(J(t)?t[h]:t),n,r,a));return}if(Bn(r)&&!a)return;const o=r.shapeFlag&4?ka(r.component)||r.component.proxy:r.el,s=a?null:o,{i:l,r:u}=e,c=t&&t.r,d=l.refs===Re?l.refs={}:l.refs,p=l.setupState;if(c!=null&&c!==u&&(pe(c)?(d[c]=null,me(p,c)&&(p[c]=null)):Ve(c)&&(c.value=null)),ne(u))jt(u,l,12,[s,d]);else{const f=pe(u),h=Ve(u);if(f||h){const g=()=>{if(e.f){const A=f?me(p,u)?p[u]:d[u]:u.value;a?J(A)&&Mo(A,o):J(A)?A.includes(o)||A.push(o):f?(d[u]=[o],me(p,u)&&(p[u]=d[u])):(u.value=[o],e.k&&(d[e.k]=u.value))}else f?(d[u]=s,me(p,u)&&(p[u]=s)):h&&(u.value=s,e.k&&(d[e.k]=s))};s?(g.id=-1,Ye(g,n)):g()}}}let Mt=!1;const jr=e=>/svg/.test(e.namespaceURI)&&e.tagName!=="foreignObject",Yr=e=>e.nodeType===8;function V2(e){const{mt:t,p:n,o:{patchProp:r,createText:a,nextSibling:o,parentNode:s,remove:l,insert:u,createComment:c}}=e,d=(_,y)=>{if(!y.hasChildNodes()){n(null,_,y),sa(),y._vnode=_;return}Mt=!1,p(y.firstChild,_,null,null,null),sa(),y._vnode=_,Mt&&console.error("Hydration completed but contains mismatches.")},p=(_,y,O,D,U,x=!1)=>{const q=Yr(_)&&_.data==="[",I=()=>A(_,y,O,D,U,q),{type:K,ref:G,shapeFlag:oe,patchFlag:z}=y;let Q=_.nodeType;y.el=_,z===-2&&(x=!1,y.dynamicChildren=null);let j=null;switch(K){case Hn:Q!==3?y.children===""?(u(y.el=a(""),s(_),_),j=_):j=I():(_.data!==y.children&&(Mt=!0,_.data=y.children),j=o(_));break;case nt:Q!==8||q?j=I():j=o(_);break;case lr:if(q&&(_=o(_),Q=_.nodeType),Q===1||Q===3){j=_;const Te=!y.children.length;for(let le=0;le<y.staticCount;le++)Te&&(y.children+=j.nodeType===1?j.outerHTML:j.data),le===y.staticCount-1&&(y.anchor=j),j=o(j);return q?o(j):j}else I();break;case ze:q?j=g(_,y,O,D,U,x):j=I();break;default:if(oe&1)Q!==1||y.type.toLowerCase()!==_.tagName.toLowerCase()?j=I():j=f(_,y,O,D,U,x);else if(oe&6){y.slotScopeIds=U;const Te=s(_);if(t(y,Te,null,O,D,jr(Te),x),j=q?R(_):o(_),j&&Yr(j)&&j.data==="teleport end"&&(j=o(j)),Bn(y)){let le;q?(le=Pe(ze),le.anchor=j?j.previousSibling:Te.lastChild):le=_.nodeType===3?Ec(""):Pe("div"),le.el=_,y.component.subTree=le}}else oe&64?Q!==8?j=I():j=y.type.hydrate(_,y,O,D,U,x,e,h):oe&128&&(j=y.type.hydrate(_,y,O,D,jr(s(_)),U,x,e,p))}return G!=null&&ua(G,null,D,y),j},f=(_,y,O,D,U,x)=>{x=x||!!y.dynamicChildren;const{type:q,props:I,patchFlag:K,shapeFlag:G,dirs:oe}=y,z=q==="input"&&oe||q==="option";if(z||K!==-1){if(oe&&kt(y,null,O,"created"),I)if(z||!x||K&48)for(const j in I)(z&&j.endsWith("value")||Sr(j)&&!sr(j))&&r(_,j,null,I[j],!1,void 0,O);else I.onClick&&r(_,"onClick",null,I.onClick,!1,void 0,O);let Q;if((Q=I&&I.onVnodeBeforeMount)&&it(Q,O,y),oe&&kt(y,null,O,"beforeMount"),((Q=I&&I.onVnodeMounted)||oe)&&Zl(()=>{Q&&it(Q,O,y),oe&&kt(y,null,O,"mounted")},D),G&16&&!(I&&(I.innerHTML||I.textContent))){let j=h(_.firstChild,y,_,O,D,U,x);for(;j;){Mt=!0;const Te=j;j=j.nextSibling,l(Te)}}else G&8&&_.textContent!==y.children&&(Mt=!0,_.textContent=y.children)}return _.nextSibling},h=(_,y,O,D,U,x,q)=>{q=q||!!y.dynamicChildren;const I=y.children,K=I.length;for(let G=0;G<K;G++){const oe=q?I[G]:I[G]=ht(I[G]);if(_)_=p(_,oe,D,U,x,q);else{if(oe.type===Hn&&!oe.children)continue;Mt=!0,n(null,oe,O,null,D,U,jr(O),x)}}return _},g=(_,y,O,D,U,x)=>{const{slotScopeIds:q}=y;q&&(U=U?U.concat(q):q);const I=s(_),K=h(o(_),y,I,O,D,U,x);return K&&Yr(K)&&K.data==="]"?o(y.anchor=K):(Mt=!0,u(y.anchor=c("]"),I,K),K)},A=(_,y,O,D,U,x)=>{if(Mt=!0,y.el=null,x){const K=R(_);for(;;){const G=o(_);if(G&&G!==K)l(G);else break}}const q=o(_),I=s(_);return l(_),n(null,y,I,q,O,D,jr(I),U),q},R=_=>{let y=0;for(;_;)if(_=o(_),_&&Yr(_)&&(_.data==="["&&y++,_.data==="]")){if(y===0)return o(_);y--}return _};return[d,p]}const Ye=Zl;function M2(e){return $2(e,V2)}function $2(e,t){const n=so();n.__VUE__=!0;const{insert:r,remove:a,patchProp:o,createElement:s,createText:l,createComment:u,setText:c,setElementText:d,parentNode:p,nextSibling:f,setScopeId:h=_t,insertStaticContent:g}=e,A=(m,E,S,w=null,L=null,P=null,F=!1,N=null,M=!!E.dynamicChildren)=>{if(m===E)return;m&&!cn(m,E)&&(w=T(m),Oe(m,L,P,!0),m=null),E.patchFlag===-2&&(M=!1,E.dynamicChildren=null);const{type:C,ref:Z,shapeFlag:Y}=E;switch(C){case Hn:R(m,E,S,w);break;case nt:_(m,E,S,w);break;case lr:m==null&&y(E,S,w,F);break;case ze:z(m,E,S,w,L,P,F,N,M);break;default:Y&1?U(m,E,S,w,L,P,F,N,M):Y&6?Q(m,E,S,w,L,P,F,N,M):(Y&64||Y&128)&&C.process(m,E,S,w,L,P,F,N,M,V)}Z!=null&&L&&ua(Z,m&&m.ref,P,E||m,!E)},R=(m,E,S,w)=>{if(m==null)r(E.el=l(E.children),S,w);else{const L=E.el=m.el;E.children!==m.children&&c(L,E.children)}},_=(m,E,S,w)=>{m==null?r(E.el=u(E.children||""),S,w):E.el=m.el},y=(m,E,S,w)=>{[m.el,m.anchor]=g(m.children,E,S,w,m.el,m.anchor)},O=({el:m,anchor:E},S,w)=>{let L;for(;m&&m!==E;)L=f(m),r(m,S,w),m=L;r(E,S,w)},D=({el:m,anchor:E})=>{let S;for(;m&&m!==E;)S=f(m),a(m),m=S;a(E)},U=(m,E,S,w,L,P,F,N,M)=>{F=F||E.type==="svg",m==null?x(E,S,w,L,P,F,N,M):K(m,E,L,P,F,N,M)},x=(m,E,S,w,L,P,F,N)=>{let M,C;const{type:Z,props:Y,shapeFlag:X,transition:ee,dirs:ce}=m;if(M=m.el=s(m.type,P,Y&&Y.is,Y),X&8?d(M,m.children):X&16&&I(m.children,M,null,w,L,P&&Z!=="foreignObject",F,N),ce&&kt(m,null,w,"created"),q(M,m,m.scopeId,F,w),Y){for(const be in Y)be!=="value"&&!sr(be)&&o(M,be,null,Y[be],P,m.children,w,L,xe);"value"in Y&&o(M,"value",null,Y.value),(C=Y.onVnodeBeforeMount)&&it(C,w,m)}ce&&kt(m,null,w,"beforeMount");const ke=(!L||L&&!L.pendingBranch)&&ee&&!ee.persisted;ke&&ee.beforeEnter(M),r(M,E,S),((C=Y&&Y.onVnodeMounted)||ke||ce)&&Ye(()=>{C&&it(C,w,m),ke&&ee.enter(M),ce&&kt(m,null,w,"mounted")},L)},q=(m,E,S,w,L)=>{if(S&&h(m,S),w)for(let P=0;P<w.length;P++)h(m,w[P]);if(L){let P=L.subTree;if(E===P){const F=L.vnode;q(m,F,F.scopeId,F.slotScopeIds,L.parent)}}},I=(m,E,S,w,L,P,F,N,M=0)=>{for(let C=M;C<m.length;C++){const Z=m[C]=N?zt(m[C]):ht(m[C]);A(null,Z,E,S,w,L,P,F,N)}},K=(m,E,S,w,L,P,F)=>{const N=E.el=m.el;let{patchFlag:M,dynamicChildren:C,dirs:Z}=E;M|=m.patchFlag&16;const Y=m.props||Re,X=E.props||Re;let ee;S&&on(S,!1),(ee=X.onVnodeBeforeUpdate)&&it(ee,S,E,m),Z&&kt(E,m,S,"beforeUpdate"),S&&on(S,!0);const ce=L&&E.type!=="foreignObject";if(C?G(m.dynamicChildren,C,N,S,w,ce,P):F||te(m,E,N,null,S,w,ce,P,!1),M>0){if(M&16)oe(N,E,Y,X,S,w,L);else if(M&2&&Y.class!==X.class&&o(N,"class",null,X.class,L),M&4&&o(N,"style",Y.style,X.style,L),M&8){const ke=E.dynamicProps;for(let be=0;be<ke.length;be++){const Be=ke[be],ft=Y[Be],bn=X[Be];(bn!==ft||Be==="value")&&o(N,Be,ft,bn,L,m.children,S,w,xe)}}M&1&&m.children!==E.children&&d(N,E.children)}else!F&&C==null&&oe(N,E,Y,X,S,w,L);((ee=X.onVnodeUpdated)||Z)&&Ye(()=>{ee&&it(ee,S,E,m),Z&&kt(E,m,S,"updated")},w)},G=(m,E,S,w,L,P,F)=>{for(let N=0;N<E.length;N++){const M=m[N],C=E[N],Z=M.el&&(M.type===ze||!cn(M,C)||M.shapeFlag&70)?p(M.el):S;A(M,C,Z,null,w,L,P,F,!0)}},oe=(m,E,S,w,L,P,F)=>{if(S!==w){if(S!==Re)for(const N in S)!sr(N)&&!(N in w)&&o(m,N,S[N],null,F,E.children,L,P,xe);for(const N in w){if(sr(N))continue;const M=w[N],C=S[N];M!==C&&N!=="value"&&o(m,N,C,M,F,E.children,L,P,xe)}"value"in w&&o(m,"value",S.value,w.value)}},z=(m,E,S,w,L,P,F,N,M)=>{const C=E.el=m?m.el:l(""),Z=E.anchor=m?m.anchor:l("");let{patchFlag:Y,dynamicChildren:X,slotScopeIds:ee}=E;ee&&(N=N?N.concat(ee):ee),m==null?(r(C,S,w),r(Z,S,w),I(E.children,S,Z,L,P,F,N,M)):Y>0&&Y&64&&X&&m.dynamicChildren?(G(m.dynamicChildren,X,S,L,P,F,N),(E.key!=null||L&&E===L.subTree)&&fc(m,E,!0)):te(m,E,S,Z,L,P,F,N,M)},Q=(m,E,S,w,L,P,F,N,M)=>{E.slotScopeIds=N,m==null?E.shapeFlag&512?L.ctx.activate(E,S,w,F,M):j(E,S,w,L,P,F,M):Te(m,E,M)},j=(m,E,S,w,L,P,F)=>{const N=m.component=W2(m,w,L);if(Ir(m)&&(N.ctx.renderer=V),q2(N),N.asyncDep){if(L&&L.registerDep(N,le),!m.el){const M=N.subTree=Pe(nt);_(null,M,E,S)}return}le(N,m,E,S,L,P,F)},Te=(m,E,S)=>{const w=E.component=m.component;if(i2(m,E,S))if(w.asyncDep&&!w.asyncResolved){_e(w,E,S);return}else w.next=E,e2(w.update),w.update();else E.el=m.el,w.vnode=E},le=(m,E,S,w,L,P,F)=>{const N=()=>{if(m.isMounted){let{next:Z,bu:Y,u:X,parent:ee,vnode:ce}=m,ke=Z,be;on(m,!1),Z?(Z.el=ce.el,_e(m,Z,F)):Z=ce,Y&&ta(Y),(be=Z.props&&Z.props.onVnodeBeforeUpdate)&&it(be,ee,Z,ce),on(m,!0);const Be=xa(m),ft=m.subTree;m.subTree=Be,A(ft,Be,p(ft.el),T(ft),m,L,P),Z.el=Be.el,ke===null&&l2(m,Be.el),X&&Ye(X,L),(be=Z.props&&Z.props.onVnodeUpdated)&&Ye(()=>it(be,ee,Z,ce),L)}else{let Z;const{el:Y,props:X}=E,{bm:ee,m:ce,parent:ke}=m,be=Bn(E);if(on(m,!1),ee&&ta(ee),!be&&(Z=X&&X.onVnodeBeforeMount)&&it(Z,ke,E),on(m,!0),Y&&ve){const Be=()=>{m.subTree=xa(m),ve(Y,m.subTree,m,L,null)};be?E.type.__asyncLoader().then(()=>!m.isUnmounted&&Be()):Be()}else{const Be=m.subTree=xa(m);A(null,Be,S,w,m,L,P),E.el=Be.el}if(ce&&Ye(ce,L),!be&&(Z=X&&X.onVnodeMounted)){const Be=E;Ye(()=>it(Z,ke,Be),L)}(E.shapeFlag&256||ke&&Bn(ke.vnode)&&ke.vnode.shapeFlag&256)&&m.a&&Ye(m.a,L),m.isMounted=!0,E=S=w=null}},M=m.effect=new Ko(N,()=>_a(C),m.scope),C=m.update=()=>M.run();C.id=m.uid,on(m,!0),C()},_e=(m,E,S)=>{E.component=m;const w=m.vnode.props;m.vnode=E,m.next=null,D2(m,E.props,w,S),N2(m,E.children,S),Wn(),ei(),qn()},te=(m,E,S,w,L,P,F,N,M=!1)=>{const C=m&&m.children,Z=m?m.shapeFlag:0,Y=E.children,{patchFlag:X,shapeFlag:ee}=E;if(X>0){if(X&128){bt(C,Y,S,w,L,P,F,N,M);return}else if(X&256){pt(C,Y,S,w,L,P,F,N,M);return}}ee&8?(Z&16&&xe(C,L,P),Y!==C&&d(S,Y)):Z&16?ee&16?bt(C,Y,S,w,L,P,F,N,M):xe(C,L,P,!0):(Z&8&&d(S,""),ee&16&&I(Y,S,w,L,P,F,N,M))},pt=(m,E,S,w,L,P,F,N,M)=>{m=m||On,E=E||On;const C=m.length,Z=E.length,Y=Math.min(C,Z);let X;for(X=0;X<Y;X++){const ee=E[X]=M?zt(E[X]):ht(E[X]);A(m[X],ee,S,null,L,P,F,N,M)}C>Z?xe(m,L,P,!0,!1,Y):I(E,S,w,L,P,F,N,M,Y)},bt=(m,E,S,w,L,P,F,N,M)=>{let C=0;const Z=E.length;let Y=m.length-1,X=Z-1;for(;C<=Y&&C<=X;){const ee=m[C],ce=E[C]=M?zt(E[C]):ht(E[C]);if(cn(ee,ce))A(ee,ce,S,null,L,P,F,N,M);else break;C++}for(;C<=Y&&C<=X;){const ee=m[Y],ce=E[X]=M?zt(E[X]):ht(E[X]);if(cn(ee,ce))A(ee,ce,S,null,L,P,F,N,M);else break;Y--,X--}if(C>Y){if(C<=X){const ee=X+1,ce=ee<Z?E[ee].el:w;for(;C<=X;)A(null,E[C]=M?zt(E[C]):ht(E[C]),S,ce,L,P,F,N,M),C++}}else if(C>X)for(;C<=Y;)Oe(m[C],L,P,!0),C++;else{const ee=C,ce=C,ke=new Map;for(C=ce;C<=X;C++){const Xe=E[C]=M?zt(E[C]):ht(E[C]);Xe.key!=null&&ke.set(Xe.key,C)}let be,Be=0;const ft=X-ce+1;let bn=!1,Gs=0;const er=new Array(ft);for(C=0;C<ft;C++)er[C]=0;for(C=ee;C<=Y;C++){const Xe=m[C];if(Be>=ft){Oe(Xe,L,P,!0);continue}let At;if(Xe.key!=null)At=ke.get(Xe.key);else for(be=ce;be<=X;be++)if(er[be-ce]===0&&cn(Xe,E[be])){At=be;break}At===void 0?Oe(Xe,L,P,!0):(er[At-ce]=C+1,At>=Gs?Gs=At:bn=!0,A(Xe,E[At],S,null,L,P,F,N,M),Be++)}const zs=bn?F2(er):On;for(be=zs.length-1,C=ft-1;C>=0;C--){const Xe=ce+C,At=E[Xe],Ks=Xe+1<Z?E[Xe+1].el:w;er[C]===0?A(null,At,S,Ks,L,P,F,N,M):bn&&(be<0||C!==zs[be]?je(At,S,Ks,2):be--)}}},je=(m,E,S,w,L=null)=>{const{el:P,type:F,transition:N,children:M,shapeFlag:C}=m;if(C&6){je(m.component.subTree,E,S,w);return}if(C&128){m.suspense.move(E,S,w);return}if(C&64){F.move(m,E,S,V);return}if(F===ze){r(P,E,S);for(let Y=0;Y<M.length;Y++)je(M[Y],E,S,w);r(m.anchor,E,S);return}if(F===lr){O(m,E,S);return}if(w!==2&&C&1&&N)if(w===0)N.beforeEnter(P),r(P,E,S),Ye(()=>N.enter(P),L);else{const{leave:Y,delayLeave:X,afterLeave:ee}=N,ce=()=>r(P,E,S),ke=()=>{Y(P,()=>{ce(),ee&&ee()})};X?X(P,ce,ke):ke()}else r(P,E,S)},Oe=(m,E,S,w=!1,L=!1)=>{const{type:P,props:F,ref:N,children:M,dynamicChildren:C,shapeFlag:Z,patchFlag:Y,dirs:X}=m;if(N!=null&&ua(N,null,S,m,!0),Z&256){E.ctx.deactivate(m);return}const ee=Z&1&&X,ce=!Bn(m);let ke;if(ce&&(ke=F&&F.onVnodeBeforeUnmount)&&it(ke,E,m),Z&6)Nt(m.component,S,w);else{if(Z&128){m.suspense.unmount(S,w);return}ee&&kt(m,null,E,"beforeUnmount"),Z&64?m.type.remove(m,E,S,L,V,w):C&&(P!==ze||Y>0&&Y&64)?xe(C,E,S,!1,!0):(P===ze&&Y&384||!L&&Z&16)&&xe(M,E,S),w&&Tt(m)}(ce&&(ke=F&&F.onVnodeUnmounted)||ee)&&Ye(()=>{ke&&it(ke,E,m),ee&&kt(m,null,E,"unmounted")},S)},Tt=m=>{const{type:E,el:S,anchor:w,transition:L}=m;if(E===ze){ot(S,w);return}if(E===lr){D(m);return}const P=()=>{a(S),L&&!L.persisted&&L.afterLeave&&L.afterLeave()};if(m.shapeFlag&1&&L&&!L.persisted){const{leave:F,delayLeave:N}=L,M=()=>F(S,P);N?N(m.el,P,M):M()}else P()},ot=(m,E)=>{let S;for(;m!==E;)S=f(m),a(m),m=S;a(E)},Nt=(m,E,S)=>{const{bum:w,scope:L,update:P,subTree:F,um:N}=m;w&&ta(w),L.stop(),P&&(P.active=!1,Oe(F,m,E,S)),N&&Ye(N,E),Ye(()=>{m.isUnmounted=!0},E),E&&E.pendingBranch&&!E.isUnmounted&&m.asyncDep&&!m.asyncResolved&&m.suspenseId===E.pendingId&&(E.deps--,E.deps===0&&E.resolve())},xe=(m,E,S,w=!1,L=!1,P=0)=>{for(let F=P;F<m.length;F++)Oe(m[F],E,S,w,L)},T=m=>m.shapeFlag&6?T(m.component.subTree):m.shapeFlag&128?m.suspense.next():f(m.anchor||m.el),H=(m,E,S)=>{m==null?E._vnode&&Oe(E._vnode,null,null,!0):A(E._vnode||null,m,E,null,null,null,S),ei(),sa(),E._vnode=m},V={p:A,um:Oe,m:je,r:Tt,mt:j,mc:I,pc:te,pbc:G,n:T,o:e};let W,ve;return t&&([W,ve]=t(V)),{render:H,hydrate:W,createApp:O2(H,W)}}function on({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function fc(e,t,n=!1){const r=e.children,a=t.children;if(J(r)&&J(a))for(let o=0;o<r.length;o++){const s=r[o];let l=a[o];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=a[o]=zt(a[o]),l.el=s.el),n||fc(s,l)),l.type===Hn&&(l.el=s.el)}}function F2(e){const t=e.slice(),n=[0];let r,a,o,s,l;const u=e.length;for(r=0;r<u;r++){const c=e[r];if(c!==0){if(a=n[n.length-1],e[a]<c){t[r]=a,n.push(r);continue}for(o=0,s=n.length-1;o<s;)l=o+s>>1,e[n[l]]<c?o=l+1:s=l;c<e[n[o]]&&(o>0&&(t[r]=n[o-1]),n[o]=r)}}for(o=n.length,s=n[o-1];o-- >0;)n[o]=s,s=t[s];return n}const H2=e=>e.__isTeleport,ze=Symbol.for("v-fgt"),Hn=Symbol.for("v-txt"),nt=Symbol.for("v-cmt"),lr=Symbol.for("v-stc"),cr=[];let gt=null;function vc(e=!1){cr.push(gt=e?null:[])}function G2(){cr.pop(),gt=cr[cr.length-1]||null}let yr=1;function pi(e){yr+=e}function hc(e){return e.dynamicChildren=yr>0?gt||On:null,G2(),yr>0&&gt&&gt.push(e),e}function p8(e,t,n,r,a,o){return hc(_c(e,t,n,r,a,o,!0))}function mc(e,t,n,r,a){return hc(Pe(e,t,n,r,a,!0))}function da(e){return e?e.__v_isVNode===!0:!1}function cn(e,t){return e.type===t.type&&e.key===t.key}const Aa="__vInternal",gc=({key:e})=>e??null,na=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?pe(e)||Ve(e)||ne(e)?{i:$e,r:e,k:t,f:!!n}:e:null);function _c(e,t=null,n=null,r=0,a=null,o=e===ze?0:1,s=!1,l=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&gc(t),ref:t&&na(t),scopeId:ya,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:$e};return l?(as(u,n),o&128&&e.normalize(u)):n&&(u.shapeFlag|=pe(n)?8:16),yr>0&&!s&&gt&&(u.patchFlag>0||o&6)&&u.patchFlag!==32&&gt.push(u),u}const Pe=z2;function z2(e,t=null,n=null,r=0,a=null,o=!1){if((!e||e===A2)&&(e=nt),da(e)){const l=Wt(e,t,!0);return n&&as(l,n),yr>0&&!o&&gt&&(l.shapeFlag&6?gt[gt.indexOf(e)]=l:gt.push(l)),l.patchFlag|=-2,l}if(ed(e)&&(e=e.__vccOpts),t){t=K2(t);let{class:l,style:u}=t;l&&!pe(l)&&(t.class=Go(l)),Se(u)&&(Hl(u)&&!J(u)&&(u=De({},u)),t.style=Ho(u))}const s=pe(e)?1:c2(e)?128:H2(e)?64:Se(e)?4:ne(e)?2:0;return _c(e,t,n,r,a,s,o,!0)}function K2(e){return e?Hl(e)||Aa in e?De({},e):e:null}function Wt(e,t,n=!1){const{props:r,ref:a,patchFlag:o,children:s}=e,l=t?U2(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&gc(l),ref:t&&t.ref?n&&a?J(a)?a.concat(na(t)):[a,na(t)]:na(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ze?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Wt(e.ssContent),ssFallback:e.ssFallback&&Wt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Ec(e=" ",t=0){return Pe(Hn,null,e,t)}function f8(e,t){const n=Pe(lr,null,e);return n.staticCount=t,n}function v8(e="",t=!1){return t?(vc(),mc(nt,null,e)):Pe(nt,null,e)}function ht(e){return e==null||typeof e=="boolean"?Pe(nt):J(e)?Pe(ze,null,e.slice()):typeof e=="object"?zt(e):Pe(Hn,null,String(e))}function zt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Wt(e)}function as(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(J(t))n=16;else if(typeof t=="object")if(r&65){const a=t.default;a&&(a._c&&(a._d=!1),as(e,a()),a._c&&(a._d=!0));return}else{n=32;const a=t._;!a&&!(Aa in t)?t._ctx=$e:a===3&&$e&&($e.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else ne(t)?(t={default:t,_ctx:$e},n=32):(t=String(t),r&64?(n=16,t=[Ec(t)]):n=8);e.children=t,e.shapeFlag|=n}function U2(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const a in r)if(a==="class")t.class!==r.class&&(t.class=Go([t.class,r.class]));else if(a==="style")t.style=Ho([t.style,r.style]);else if(Sr(a)){const o=t[a],s=r[a];s&&o!==s&&!(J(o)&&o.includes(s))&&(t[a]=o?[].concat(o,s):s)}else a!==""&&(t[a]=r[a])}return t}function it(e,t,n,r=null){ct(e,t,7,[n,r])}const j2=ic();let Y2=0;function W2(e,t,n){const r=e.type,a=(t?t.appContext:e.appContext)||j2,o={uid:Y2++,vnode:e,type:r,parent:t,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new v0(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:cc(r,a),emitsOptions:ql(r,a),emit:null,emitted:null,propsDefaults:Re,inheritAttrs:r.inheritAttrs,ctx:Re,data:Re,props:Re,attrs:Re,slots:Re,refs:Re,setupState:Re,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=r2.bind(null,o),e.ce&&e.ce(o),o}let Ne=null;const _n=()=>Ne||$e;let os,An,fi="__VUE_INSTANCE_SETTERS__";(An=so()[fi])||(An=so()[fi]=[]),An.push(e=>Ne=e),os=e=>{An.length>1?An.forEach(t=>t(e)):An[0](e)};const Gn=e=>{os(e),e.scope.on()},vn=()=>{Ne&&Ne.scope.off(),os(null)};function yc(e){return e.vnode.shapeFlag&4}let zn=!1;function q2(e,t=!1){zn=t;const{props:n,children:r}=e.vnode,a=yc(e);C2(e,n,a,t),B2(e,r);const o=a?Z2(e,t):void 0;return zn=!1,o}function Z2(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Gl(new Proxy(e.ctx,S2));const{setup:r}=n;if(r){const a=e.setupContext=r.length>1?J2(e):null;Gn(e),Wn();const o=jt(r,e,0,[e.props,a]);if(qn(),vn(),Sl(o)){if(o.then(vn,vn),t)return o.then(s=>{vi(e,s,t)}).catch(s=>{Tr(s,e,0)});e.asyncDep=o}else vi(e,o,t)}else bc(e,t)}function vi(e,t,n){ne(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Se(t)&&(e.setupState=Kl(t)),bc(e,n)}let hi;function bc(e,t,n){const r=e.type;if(!e.render){if(!t&&hi&&!r.render){const a=r.template||ns(e).template;if(a){const{isCustomElement:o,compilerOptions:s}=e.appContext.config,{delimiters:l,compilerOptions:u}=r,c=De(De({isCustomElement:o,delimiters:l},s),u);r.render=hi(a,c)}}e.render=r.render||_t}Gn(e),Wn(),R2(e),qn(),vn()}function X2(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return Ze(e,"get","$attrs"),t[n]}}))}function J2(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return X2(e)},slots:e.slots,emit:e.emit,expose:t}}function ka(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Kl(Gl(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ir)return ir[n](e)},has(t,n){return n in t||n in ir}}))}function Q2(e,t=!0){return ne(e)?e.displayName||e.name:e.name||t&&e.__name}function ed(e){return ne(e)&&"__vccOpts"in e}const k=(e,t)=>X0(e,t,zn);function i(e,t,n){const r=arguments.length;return r===2?Se(t)&&!J(t)?da(t)?Pe(e,null,[t]):Pe(e,t):Pe(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&da(n)&&(n=[n]),Pe(e,t,n))}const td=Symbol.for("v-scx"),nd=()=>ie(td),rd="3.3.4",ad="http://www.w3.org/2000/svg",un=typeof document<"u"?document:null,mi=un&&un.createElement("template"),od={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const a=t?un.createElementNS(ad,e):un.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:e=>un.createTextNode(e),createComment:e=>un.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>un.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,a,o){const s=n?n.previousSibling:t.lastChild;if(a&&(a===o||a.nextSibling))for(;t.insertBefore(a.cloneNode(!0),n),!(a===o||!(a=a.nextSibling)););else{mi.innerHTML=r?`<svg>${e}</svg>`:e;const l=mi.content;if(r){const u=l.firstChild;for(;u.firstChild;)l.appendChild(u.firstChild);l.removeChild(u)}t.insertBefore(l,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function sd(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function id(e,t,n){const r=e.style,a=pe(n);if(n&&!a){if(t&&!pe(t))for(const o in t)n[o]==null&&mo(r,o,"");for(const o in n)mo(r,o,n[o])}else{const o=r.display;a?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=o)}}const gi=/\s*!important$/;function mo(e,t,n){if(J(n))n.forEach(r=>mo(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=ld(e,t);gi.test(n)?e.setProperty(gn(r),n.replace(gi,""),"important"):e[r]=n}}const _i=["Webkit","Moz","ms"],Ma={};function ld(e,t){const n=Ma[t];if(n)return n;let r=ut(t);if(r!=="filter"&&r in e)return Ma[t]=r;r=Rr(r);for(let a=0;a<_i.length;a++){const o=_i[a]+r;if(o in e)return Ma[t]=o}return t}const Ei="http://www.w3.org/1999/xlink";function cd(e,t,n,r,a){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(Ei,t.slice(6,t.length)):e.setAttributeNS(Ei,t,n);else{const o=f0(t);n==null||o&&!Tl(n)?e.removeAttribute(t):e.setAttribute(t,o?"":n)}}function ud(e,t,n,r,a,o,s){if(t==="innerHTML"||t==="textContent"){r&&s(r,a,o),e[t]=n??"";return}const l=e.tagName;if(t==="value"&&l!=="PROGRESS"&&!l.includes("-")){e._value=n;const c=l==="OPTION"?e.getAttribute("value"):e.value,d=n??"";c!==d&&(e.value=d),n==null&&e.removeAttribute(t);return}let u=!1;if(n===""||n==null){const c=typeof e[t];c==="boolean"?n=Tl(n):n==null&&c==="string"?(n="",u=!0):c==="number"&&(n=0,u=!0)}try{e[t]=n}catch{}u&&e.removeAttribute(t)}function wn(e,t,n,r){e.addEventListener(t,n,r)}function dd(e,t,n,r){e.removeEventListener(t,n,r)}function pd(e,t,n,r,a=null){const o=e._vei||(e._vei={}),s=o[t];if(r&&s)s.value=r;else{const[l,u]=fd(t);if(r){const c=o[t]=md(r,a);wn(e,l,c,u)}else s&&(dd(e,l,s,u),o[t]=void 0)}}const yi=/(?:Once|Passive|Capture)$/;function fd(e){let t;if(yi.test(e)){t={};let r;for(;r=e.match(yi);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):gn(e.slice(2)),t]}let $a=0;const vd=Promise.resolve(),hd=()=>$a||(vd.then(()=>$a=0),$a=Date.now());function md(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;ct(gd(r,n.value),t,5,[r])};return n.value=e,n.attached=hd(),n}function gd(e,t){if(J(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>a=>!a._stopped&&r&&r(a))}else return t}const bi=/^on[a-z]/,_d=(e,t,n,r,a=!1,o,s,l,u)=>{t==="class"?sd(e,r,a):t==="style"?id(e,n,r):Sr(t)?Vo(t)||pd(e,t,n,r,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Ed(e,t,r,a))?ud(e,t,r,o,s,l,u):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),cd(e,t,r,a))};function Ed(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&bi.test(t)&&ne(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||bi.test(t)&&pe(n)?!1:t in e}const $t="transition",tr="animation",qt=(e,{slots:t})=>i(p2,kc(e),t);qt.displayName="Transition";const Ac={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},yd=qt.props=De({},ec,Ac),sn=(e,t=[])=>{J(e)?e.forEach(n=>n(...t)):e&&e(...t)},Ai=e=>e?J(e)?e.some(t=>t.length>1):e.length>1:!1;function kc(e){const t={};for(const z in e)z in Ac||(t[z]=e[z]);if(e.css===!1)return t;const{name:n="v",type:r,duration:a,enterFromClass:o=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:u=o,appearActiveClass:c=s,appearToClass:d=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:h=`${n}-leave-to`}=e,g=bd(a),A=g&&g[0],R=g&&g[1],{onBeforeEnter:_,onEnter:y,onEnterCancelled:O,onLeave:D,onLeaveCancelled:U,onBeforeAppear:x=_,onAppear:q=y,onAppearCancelled:I=O}=t,K=(z,Q,j)=>{Gt(z,Q?d:l),Gt(z,Q?c:s),j&&j()},G=(z,Q)=>{z._isLeaving=!1,Gt(z,p),Gt(z,h),Gt(z,f),Q&&Q()},oe=z=>(Q,j)=>{const Te=z?q:y,le=()=>K(Q,z,j);sn(Te,[Q,le]),ki(()=>{Gt(Q,z?u:o),Lt(Q,z?d:l),Ai(Te)||Si(Q,r,A,le)})};return De(t,{onBeforeEnter(z){sn(_,[z]),Lt(z,o),Lt(z,s)},onBeforeAppear(z){sn(x,[z]),Lt(z,u),Lt(z,c)},onEnter:oe(!1),onAppear:oe(!0),onLeave(z,Q){z._isLeaving=!0;const j=()=>G(z,Q);Lt(z,p),Rc(),Lt(z,f),ki(()=>{z._isLeaving&&(Gt(z,p),Lt(z,h),Ai(D)||Si(z,r,R,j))}),sn(D,[z,j])},onEnterCancelled(z){K(z,!1),sn(O,[z])},onAppearCancelled(z){K(z,!0),sn(I,[z])},onLeaveCancelled(z){G(z),sn(U,[z])}})}function bd(e){if(e==null)return null;if(Se(e))return[Fa(e.enter),Fa(e.leave)];{const t=Fa(e);return[t,t]}}function Fa(e){return i0(e)}function Lt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e._vtc||(e._vtc=new Set)).add(t)}function Gt(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function ki(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Ad=0;function Si(e,t,n,r){const a=e._endId=++Ad,o=()=>{a===e._endId&&r()};if(n)return setTimeout(o,n);const{type:s,timeout:l,propCount:u}=Sc(e,t);if(!s)return r();const c=s+"end";let d=0;const p=()=>{e.removeEventListener(c,f),o()},f=h=>{h.target===e&&++d>=u&&p()};setTimeout(()=>{d<u&&p()},l+1),e.addEventListener(c,f)}function Sc(e,t){const n=window.getComputedStyle(e),r=g=>(n[g]||"").split(", "),a=r(`${$t}Delay`),o=r(`${$t}Duration`),s=Ri(a,o),l=r(`${tr}Delay`),u=r(`${tr}Duration`),c=Ri(l,u);let d=null,p=0,f=0;t===$t?s>0&&(d=$t,p=s,f=o.length):t===tr?c>0&&(d=tr,p=c,f=u.length):(p=Math.max(s,c),d=p>0?s>c?$t:tr:null,f=d?d===$t?o.length:u.length:0);const h=d===$t&&/\b(transform|all)(,|$)/.test(r(`${$t}Property`).toString());return{type:d,timeout:p,propCount:f,hasTransform:h}}function Ri(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,r)=>wi(n)+wi(e[r])))}function wi(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function Rc(){return document.body.offsetHeight}const wc=new WeakMap,Tc=new WeakMap,Ic={name:"TransitionGroup",props:De({},yd,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=_n(),r=Ql();let a,o;return rc(()=>{if(!a.length)return;const s=e.moveClass||`${e.name||"v"}-move`;if(!Id(a[0].el,n.vnode.el,s))return;a.forEach(Rd),a.forEach(wd);const l=a.filter(Td);Rc(),l.forEach(u=>{const c=u.el,d=c.style;Lt(c,s),d.transform=d.webkitTransform=d.transitionDuration="";const p=c._moveCb=f=>{f&&f.target!==c||(!f||/transform$/.test(f.propertyName))&&(c.removeEventListener("transitionend",p),c._moveCb=null,Gt(c,s))};c.addEventListener("transitionend",p)})}),()=>{const s=fe(e),l=kc(s);let u=s.tag||ze;a=o,o=t.default?es(t.default()):[];for(let c=0;c<o.length;c++){const d=o[c];d.key!=null&&Er(d,_r(d,l,r,n))}if(a)for(let c=0;c<a.length;c++){const d=a[c];Er(d,_r(d,l,r,n)),wc.set(d,d.el.getBoundingClientRect())}return Pe(u,null,o)}}},kd=e=>delete e.mode;Ic.props;const Sd=Ic;function Rd(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb()}function wd(e){Tc.set(e,e.el.getBoundingClientRect())}function Td(e){const t=wc.get(e),n=Tc.get(e),r=t.left-n.left,a=t.top-n.top;if(r||a){const o=e.el.style;return o.transform=o.webkitTransform=`translate(${r}px,${a}px)`,o.transitionDuration="0s",e}}function Id(e,t,n){const r=e.cloneNode();e._vtc&&e._vtc.forEach(s=>{s.split(/\s+/).forEach(l=>l&&r.classList.remove(l))}),n.split(/\s+/).forEach(s=>s&&r.classList.add(s)),r.style.display="none";const a=t.nodeType===1?t:t.parentNode;a.appendChild(r);const{hasTransform:o}=Sc(r);return a.removeChild(r),o}const Ti=e=>{const t=e.props["onUpdate:modelValue"]||!1;return J(t)?n=>ta(t,n):t};function Ld(e){e.target.composing=!0}function Ii(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const h8={created(e,{modifiers:{lazy:t,trim:n,number:r}},a){e._assign=Ti(a);const o=r||a.props&&a.props.type==="number";wn(e,t?"change":"input",s=>{if(s.target.composing)return;let l=e.value;n&&(l=l.trim()),o&&(l=oo(l)),e._assign(l)}),n&&wn(e,"change",()=>{e.value=e.value.trim()}),t||(wn(e,"compositionstart",Ld),wn(e,"compositionend",Ii),wn(e,"change",Ii))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:r,number:a}},o){if(e._assign=Ti(o),e.composing||document.activeElement===e&&e.type!=="range"&&(n||r&&e.value.trim()===t||(a||e.type==="number")&&oo(e.value)===t))return;const s=t??"";e.value!==s&&(e.value=s)}},Pd=["ctrl","shift","alt","meta"],Od={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Pd.some(n=>e[`${n}Key`]&&!t.includes(n))},m8=(e,t)=>(n,...r)=>{for(let a=0;a<t.length;a++){const o=Od[t[a]];if(o&&o(n,t))return}return e(n,...r)},Cd={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},g8=(e,t)=>n=>{if(!("key"in n))return;const r=gn(n.key);if(t.some(a=>a===r||Cd[a]===r))return e(n)},_8={beforeMount(e,{value:t},{transition:n}){e._vod=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):nr(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),nr(e,!0),r.enter(e)):r.leave(e,()=>{nr(e,!1)}):nr(e,t))},beforeUnmount(e,{value:t}){nr(e,t)}};function nr(e,t){e.style.display=t?e._vod:"none"}const Dd=De({patchProp:_d},od);let Ha,Li=!1;function xd(){return Ha=Li?Ha:M2(Dd),Li=!0,Ha}const Bd=(...e)=>{const t=xd().createApp(...e),{mount:n}=t;return t.mount=r=>{const a=Nd(r);if(a)return n(a,!0,a instanceof SVGElement)},t};function Nd(e){return pe(e)?document.querySelector(e):e}const Vd={"v-8daa1a0e":()=>v(()=>import("./index.html-f7650280.js"),[]).then(({data:e})=>e),"v-4b17c12f":()=>v(()=>import("./archives.html-66c2aca3.js"),[]).then(({data:e})=>e),"v-184f4da6":()=>v(()=>import("./intro.html-c5f29b02.js"),[]).then(({data:e})=>e),"v-47a75f3e":()=>v(()=>import("./Perfect-competition.html-0b675377.js"),[]).then(({data:e})=>e),"v-4ba4912a":()=>v(()=>import("./index.html-573273bd.js"),[]).then(({data:e})=>e),"v-1f902b80":()=>v(()=>import("./betxin-rules.html-3560deb8.js"),[]).then(({data:e})=>e),"v-51ce692c":()=>v(()=>import("./Docker-get-start.html-ca55428a.js"),[]).then(({data:e})=>e),"v-5ac20bf9":()=>v(()=>import("./index.html-2797333a.js"),[]).then(({data:e})=>e),"v-77c978ab":()=>v(()=>import("./index.html-c9aa4fdd.js"),[]).then(({data:e})=>e),"v-5b6f1d36":()=>v(()=>import("./get-start-with-c-tcp-program.html-728a9aba.js"),[]).then(({data:e})=>e),"v-ed510016":()=>v(()=>import("./backtrack.html-c13ff83d.js"),[]).then(({data:e})=>e),"v-6bd45cce":()=>v(()=>import("./dynamic-programming.html-59e54650.js"),[]).then(({data:e})=>e),"v-1de1766a":()=>v(()=>import("./offer.html-7052668d.js"),[]).then(({data:e})=>e),"v-6b316540":()=>v(()=>import("./currency.html-2dcb19e1.js"),[]).then(({data:e})=>e),"v-a115b05a":()=>v(()=>import("./go-depth.html-229c030f.js"),[]).then(({data:e})=>e),"v-56bd5e7e":()=>v(()=>import("./mysql-notes.html-c9df22c6.js"),[]).then(({data:e})=>e),"v-46709ae2":()=>v(()=>import("./cache-consistency.html-9c6ebd2c.js"),[]).then(({data:e})=>e),"v-f29e4144":()=>v(()=>import("./datastruct.html-c262cbe9.js"),[]).then(({data:e})=>e),"v-fead0b28":()=>v(()=>import("./redis-note.html-9e1ddd99.js"),[]).then(({data:e})=>e),"v-5ff9675f":()=>v(()=>import("./global-variable.html-e4bbec6f.js"),[]).then(({data:e})=>e),"v-75b021da":()=>v(()=>import("./2021-What-I-do.html-72b8965e.js"),[]).then(({data:e})=>e),"v-191e3f24":()=>v(()=>import("./I-wrote-a-blockchain-in-160-lines-of-code.html-15bd3acf.js"),[]).then(({data:e})=>e),"v-47375370":()=>v(()=>import("./I-wrote-a-new-App-that-could-help-me-in-immersed.html-e3e662e3.js"),[]).then(({data:e})=>e),"v-5376a85d":()=>v(()=>import("./cosmic-origin.html-f5a11477.js"),[]).then(({data:e})=>e),"v-6d02af8e":()=>v(()=>import("./learn-again.html-db79c2a8.js"),[]).then(({data:e})=>e),"v-48804d80":()=>v(()=>import("./Absolutely-Correct.html-d5e75336.js"),[]).then(({data:e})=>e),"v-374fb63b":()=>v(()=>import("./Battle-Internet.html-0a083de2.js"),[]).then(({data:e})=>e),"v-6162d44c":()=>v(()=>import("./More-valuable-than-linear-algebra.html-59ee1bc6.js"),[]).then(({data:e})=>e),"v-0230ae44":()=>v(()=>import("./Protect-yourself.html-ef19a39a.js"),[]).then(({data:e})=>e),"v-4f026ee2":()=>v(()=>import("./be-friends-with-time.html-b2942906.js"),[]).then(({data:e})=>e),"v-ca8f39fa":()=>v(()=>import("./get-away-wechat.html-527b3166.js"),[]).then(({data:e})=>e),"v-8b9fe7ba":()=>v(()=>import("./patient-with-develop.html-bd353ee1.js"),[]).then(({data:e})=>e),"v-3a828186":()=>v(()=>import("./run.html-6207cf42.js"),[]).then(({data:e})=>e),"v-423b1ad8":()=>v(()=>import("./the-future-of-internet.html-711caef6.js"),[]).then(({data:e})=>e),"v-1c41ff49":()=>v(()=>import("./two-days.html-d3d9cdeb.js"),[]).then(({data:e})=>e),"v-51eb093a":()=>v(()=>import("./2023-5-23-why-I-long-write.html-e64d6866.js"),[]).then(({data:e})=>e),"v-2cbfa890":()=>v(()=>import("./2023-5-24-danger.html-45262533.js"),[]).then(({data:e})=>e),"v-7e425500":()=>v(()=>import("./2023-5-25-money-with-life.html-6c470714.js"),[]).then(({data:e})=>e),"v-321ca414":()=>v(()=>import("./2023-5-25-who-are-you_.html-c7531bc5.js"),[]).then(({data:e})=>e),"v-21ddef20":()=>v(()=>import("./2023-5-26-what-is-thinking_.html-1c57f396.js"),[]).then(({data:e})=>e),"v-6056606e":()=>v(()=>import("./2023-5-27-roll-up.html-f71f0d9e.js"),[]).then(({data:e})=>e),"v-27098123":()=>v(()=>import("./2023-5-28-the-realy-true.html-0270a6ee.js"),[]).then(({data:e})=>e),"v-0e92e1ec":()=>v(()=>import("./2023-5-29-in-knowledge-people.html-72842724.js"),[]).then(({data:e})=>e),"v-7057c552":()=>v(()=>import("./2023-5-30-about-thinging-self.html-0bce44ba.js"),[]).then(({data:e})=>e),"v-69799310":()=>v(()=>import("./2023-6-14-change-blog.html-4cc4988f.js"),[]).then(({data:e})=>e),"v-f94547aa":()=>v(()=>import("./2023-6-16-mini-startup1.html-ea0416c3.js"),[]).then(({data:e})=>e),"v-63abedbc":()=>v(()=>import("./2023-6-2-be-affected.html-b006f8ac.js"),[]).then(({data:e})=>e),"v-1eb20697":()=>v(()=>import("./2023-6-23-book-list.html-0ca147b5.js"),[]).then(({data:e})=>e),"v-5316d9fc":()=>v(()=>import("./2023-6-23-startup.html-291663ff.js"),[]).then(({data:e})=>e),"v-3e8c5afb":()=>v(()=>import("./2023-6-4-be-a-time-people.html-0aefe3a9.js"),[]).then(({data:e})=>e),"v-5d6d81ad":()=>v(()=>import("./2023-6-4-self-thinking.html-f9a8279f.js"),[]).then(({data:e})=>e),"v-650ae6ea":()=>v(()=>import("./2023-6-6-correct-comparison.html-ebf328f4.js"),[]).then(({data:e})=>e),"v-6c2f3742":()=>v(()=>import("./2023-6-7-best-internet-win.html-cb52caa0.js"),[]).then(({data:e})=>e),"v-508e0582":()=>v(()=>import("./2023-6-8-praise-short-video.html-cd09e5ca.js"),[]).then(({data:e})=>e),"v-6ecc2a70":()=>v(()=>import("./2023-6-9-value-of-gpt.html-0cd9745f.js"),[]).then(({data:e})=>e),"v-6e1e1211":()=>v(()=>import("./top10-sorting.html-7559701d.js"),[]).then(({data:e})=>e),"v-5e01f85f":()=>v(()=>import("./gomock-tuto.html-75ca978f.js"),[]).then(({data:e})=>e),"v-79877d44":()=>v(()=>import("./mockey.html-8e9cc100.js"),[]).then(({data:e})=>e),"v-7eae6995":()=>v(()=>import("./gin-framework-principle.html-229e74f5.js"),[]).then(({data:e})=>e),"v-e7a26318":()=>v(()=>import("./1.html-7951b351.js"),[]).then(({data:e})=>e),"v-e438b1da":()=>v(()=>import("./2.html-66c3d9a6.js"),[]).then(({data:e})=>e),"v-e0cf009c":()=>v(()=>import("./3.html-75ad90ec.js"),[]).then(({data:e})=>e),"v-dd654f5e":()=>v(()=>import("./4.html-4d80e5db.js"),[]).then(({data:e})=>e),"v-5da90d53":()=>v(()=>import("./std-bufio.html-d80e4251.js"),[]).then(({data:e})=>e),"v-6f8bc77d":()=>v(()=>import("./std-context.html-1e8e1714.js"),[]).then(({data:e})=>e),"v-00e31ada":()=>v(()=>import("./std-flag.html-6a860110.js"),[]).then(({data:e})=>e),"v-18827cdf":()=>v(()=>import("./std-fmt.html-a6f2b8cb.js"),[]).then(({data:e})=>e),"v-4931fef0":()=>v(()=>import("./std-log.html-b6e69a0d.js"),[]).then(({data:e})=>e),"v-76b39f2f":()=>v(()=>import("./std-reflect.html-d443a18b.js"),[]).then(({data:e})=>e),"v-6621bbf2":()=>v(()=>import("./std-strconv.html-1a57fe0b.js"),[]).then(({data:e})=>e),"v-5c5ebc19":()=>v(()=>import("./std-time.html-9ad18203.js"),[]).then(({data:e})=>e),"v-3706649a":()=>v(()=>import("./404.html-45dc07fb.js"),[]).then(({data:e})=>e),"v-69a86107":()=>v(()=>import("./index.html-4ab84e33.js"),[]).then(({data:e})=>e),"v-e1e3da16":()=>v(()=>import("./index.html-a943a722.js"),[]).then(({data:e})=>e),"v-41ad8c23":()=>v(()=>import("./index.html-09ecd0dc.js"),[]).then(({data:e})=>e),"v-1aaf0020":()=>v(()=>import("./index.html-69d9102c.js"),[]).then(({data:e})=>e),"v-88d61c22":()=>v(()=>import("./index.html-d76d4613.js"),[]).then(({data:e})=>e),"v-85603d8c":()=>v(()=>import("./index.html-e541807a.js"),[]).then(({data:e})=>e),"v-2aef844c":()=>v(()=>import("./index.html-3fff7e8d.js"),[]).then(({data:e})=>e),"v-2897b160":()=>v(()=>import("./index.html-7c5b8b71.js"),[]).then(({data:e})=>e),"v-368344da":()=>v(()=>import("./index.html-6140f5cb.js"),[]).then(({data:e})=>e),"v-01742aa6":()=>v(()=>import("./index.html-a1ad6458.js"),[]).then(({data:e})=>e),"v-fa3fa1b0":()=>v(()=>import("./index.html-1470202f.js"),[]).then(({data:e})=>e),"v-7dc9dfbb":()=>v(()=>import("./index.html-bd48d168.js"),[]).then(({data:e})=>e),"v-7915bbed":()=>v(()=>import("./index.html-d2d74639.js"),[]).then(({data:e})=>e),"v-2d1aaa94":()=>v(()=>import("./index.html-a001bfac.js"),[]).then(({data:e})=>e),"v-ff059b98":()=>v(()=>import("./index.html-c93812ce.js"),[]).then(({data:e})=>e),"v-561f115c":()=>v(()=>import("./index.html-5165052b.js"),[]).then(({data:e})=>e),"v-121f466e":()=>v(()=>import("./index.html-463de0b9.js"),[]).then(({data:e})=>e),"v-a93e83a8":()=>v(()=>import("./index.html-b455d40f.js"),[]).then(({data:e})=>e),"v-af437cd2":()=>v(()=>import("./index.html-6d59cf69.js"),[]).then(({data:e})=>e),"v-1410c3e8":()=>v(()=>import("./index.html-d6298c18.js"),[]).then(({data:e})=>e),"v-3d42f458":()=>v(()=>import("./index.html-e41e7465.js"),[]).then(({data:e})=>e),"v-1410c407":()=>v(()=>import("./index.html-e5b61866.js"),[]).then(({data:e})=>e),"v-5bb0b1ce":()=>v(()=>import("./index.html-e951e604.js"),[]).then(({data:e})=>e),"v-1410c426":()=>v(()=>import("./index.html-f00e24fd.js"),[]).then(({data:e})=>e),"v-558b1c03":()=>v(()=>import("./index.html-fab8b6fe.js"),[]).then(({data:e})=>e),"v-1582d2de":()=>v(()=>import("./index.html-36ea5cd6.js"),[]).then(({data:e})=>e),"v-1f7c2346":()=>v(()=>import("./index.html-be26289f.js"),[]).then(({data:e})=>e),"v-0e00f24e":()=>v(()=>import("./index.html-e98b2a46.js"),[]).then(({data:e})=>e),"v-f57efbb0":()=>v(()=>import("./index.html-8043d4e8.js"),[]).then(({data:e})=>e),"v-6aedfa76":()=>v(()=>import("./index.html-bfbd8b4d.js"),[]).then(({data:e})=>e),"v-22d3e82c":()=>v(()=>import("./index.html-5a72d29e.js"),[]).then(({data:e})=>e),"v-614d0189":()=>v(()=>import("./index.html-a681043b.js"),[]).then(({data:e})=>e),"v-522ca6fe":()=>v(()=>import("./index.html-ed57bdc8.js"),[]).then(({data:e})=>e),"v-5bc93818":()=>v(()=>import("./index.html-3d55858a.js"),[]).then(({data:e})=>e),"v-744d024e":()=>v(()=>import("./index.html-309b98f5.js"),[]).then(({data:e})=>e),"v-e52c881c":()=>v(()=>import("./index.html-3a0e4a12.js"),[]).then(({data:e})=>e),"v-154dc4c4":()=>v(()=>import("./index.html-0ccff65a.js"),[]).then(({data:e})=>e),"v-01560935":()=>v(()=>import("./index.html-1626c757.js"),[]).then(({data:e})=>e),"v-721aed2b":()=>v(()=>import("./index.html-fbd56254.js"),[]).then(({data:e})=>e),"v-c06a95c0":()=>v(()=>import("./index.html-9cc163ac.js"),[]).then(({data:e})=>e),"v-3318a379":()=>v(()=>import("./index.html-7c20914d.js"),[]).then(({data:e})=>e),"v-17bd7e0b":()=>v(()=>import("./index.html-5a84415c.js"),[]).then(({data:e})=>e),"v-6a0b0faf":()=>v(()=>import("./index.html-acafe518.js"),[]).then(({data:e})=>e),"v-6106c001":()=>v(()=>import("./index.html-03c5c2ec.js"),[]).then(({data:e})=>e),"v-e348c378":()=>v(()=>import("./index.html-5f3d5b6c.js"),[]).then(({data:e})=>e),"v-49627fe2":()=>v(()=>import("./index.html-6aea2ab8.js"),[]).then(({data:e})=>e),"v-9c48d85a":()=>v(()=>import("./index.html-fa129375.js"),[]).then(({data:e})=>e),"v-46b9d66c":()=>v(()=>import("./index.html-cb2f5e74.js"),[]).then(({data:e})=>e),"v-e9a125fe":()=>v(()=>import("./index.html-a885cd60.js"),[]).then(({data:e})=>e),"v-25e1acb9":()=>v(()=>import("./index.html-366f1566.js"),[]).then(({data:e})=>e),"v-80e9ca34":()=>v(()=>import("./index.html-c38b510c.js"),[]).then(({data:e})=>e),"v-f6aa26dc":()=>v(()=>import("./index.html-cdc56ef3.js"),[]).then(({data:e})=>e),"v-58ab7bb3":()=>v(()=>import("./index.html-5bd54fd7.js"),[]).then(({data:e})=>e),"v-173e7dbe":()=>v(()=>import("./index.html-5f45d271.js"),[]).then(({data:e})=>e),"v-70677d9e":()=>v(()=>import("./index.html-25b080e2.js"),[]).then(({data:e})=>e),"v-0033da0b":()=>v(()=>import("./index.html-d3d92d33.js"),[]).then(({data:e})=>e),"v-9cc57efa":()=>v(()=>import("./index.html-c852b9e5.js"),[]).then(({data:e})=>e),"v-7b39bf6c":()=>v(()=>import("./index.html-bec864b8.js"),[]).then(({data:e})=>e),"v-b6a4f932":()=>v(()=>import("./index.html-2c707199.js"),[]).then(({data:e})=>e),"v-1bee38ca":()=>v(()=>import("./index.html-5bd771fb.js"),[]).then(({data:e})=>e),"v-7b0b3a14":()=>v(()=>import("./index.html-452a725f.js"),[]).then(({data:e})=>e),"v-0d1f4c3c":()=>v(()=>import("./index.html-9c74d99c.js"),[]).then(({data:e})=>e),"v-1c5eedbf":()=>v(()=>import("./index.html-6b3024cd.js"),[]).then(({data:e})=>e),"v-606be265":()=>v(()=>import("./index.html-6bcab98e.js"),[]).then(({data:e})=>e),"v-58c21dea":()=>v(()=>import("./index.html-59d191c7.js"),[]).then(({data:e})=>e),"v-291ba33d":()=>v(()=>import("./index.html-9b52aeb4.js"),[]).then(({data:e})=>e),"v-b93724ec":()=>v(()=>import("./index.html-c67a831a.js"),[]).then(({data:e})=>e),"v-574eed66":()=>v(()=>import("./index.html-4d41cf8f.js"),[]).then(({data:e})=>e),"v-65f5031c":()=>v(()=>import("./index.html-53ced805.js"),[]).then(({data:e})=>e),"v-d293f072":()=>v(()=>import("./index.html-c1f7fb77.js"),[]).then(({data:e})=>e),"v-1c5f3310":()=>v(()=>import("./index.html-182ad628.js"),[]).then(({data:e})=>e),"v-59ca63e7":()=>v(()=>import("./index.html-b144a3f3.js"),[]).then(({data:e})=>e),"v-219beb8e":()=>v(()=>import("./index.html-e00e36a6.js"),[]).then(({data:e})=>e),"v-2bdb1026":()=>v(()=>import("./index.html-4cad3b23.js"),[]).then(({data:e})=>e),"v-2b6a541e":()=>v(()=>import("./index.html-5e9553a0.js"),[]).then(({data:e})=>e),"v-69787d8a":()=>v(()=>import("./index.html-d82d2e17.js"),[]).then(({data:e})=>e),"v-000f2cac":()=>v(()=>import("./index.html-320fc15a.js"),[]).then(({data:e})=>e),"v-47e821f5":()=>v(()=>import("./index.html-c61a3f3e.js"),[]).then(({data:e})=>e),"v-29324574":()=>v(()=>import("./index.html-0dc056ac.js"),[]).then(({data:e})=>e),"v-3d0b43bb":()=>v(()=>import("./index.html-4031f0c2.js"),[]).then(({data:e})=>e),"v-6224bc80":()=>v(()=>import("./index.html-a39329e3.js"),[]).then(({data:e})=>e),"v-b3067b5c":()=>v(()=>import("./index.html-a1d5199f.js"),[]).then(({data:e})=>e),"v-40b79b1b":()=>v(()=>import("./index.html-bca41531.js"),[]).then(({data:e})=>e),"v-318ed680":()=>v(()=>import("./index.html-a8575ac2.js"),[]).then(({data:e})=>e),"v-53f6d684":()=>v(()=>import("./index.html-1c950a02.js"),[]).then(({data:e})=>e),"v-02b233fe":()=>v(()=>import("./index.html-00a93e1d.js"),[]).then(({data:e})=>e),"v-283760d8":()=>v(()=>import("./index.html-93c43769.js"),[]).then(({data:e})=>e),"v-32017b2c":()=>v(()=>import("./index.html-03413a64.js"),[]).then(({data:e})=>e),"v-28d23657":()=>v(()=>import("./index.html-56a49ed1.js"),[]).then(({data:e})=>e),"v-0da0f862":()=>v(()=>import("./index.html-701c8a07.js"),[]).then(({data:e})=>e),"v-3d1ed623":()=>v(()=>import("./index.html-0e91d991.js"),[]).then(({data:e})=>e),"v-b310d59e":()=>v(()=>import("./index.html-9c22350a.js"),[]).then(({data:e})=>e),"v-287f3643":()=>v(()=>import("./index.html-e99a568b.js"),[]).then(({data:e})=>e)},Md=JSON.parse('{"base":"/","lang":"zh-CN","title":"","description":"vuepress-theme-hope 的博客演示","head":[["link",{"rel":"icon","href":"/favicon.ico"}],["link",{"rel":"manifest","href":"/manifest.webmanifest","crossorigin":"use-credentials"}],["meta",{"name":"theme-color","content":"#46bd87"}],["meta",{"name":"viewport","content":"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"}]],"locales":{}}');var $d=([e,t,n])=>e==="meta"&&t.name?`${e}.${t.name}`:["title","base"].includes(e)?e:e==="template"&&t.id?`${e}.${t.id}`:JSON.stringify([e,t,n]),Fd=e=>{const t=new Set,n=[];return e.forEach(r=>{const a=$d(r);t.has(a)||(t.add(a),n.push(r))}),n},Hd=e=>e[e.length-1]==="/"||e.endsWith(".html")?e:`${e}/`,Gd=e=>e.startsWith("ftp://"),En=e=>/^(https?:)?\/\//.test(e),zd=/.md((\?|#).*)?$/,pa=(e,t="/")=>!!(En(e)||Gd(e)||e.startsWith("/")&&!e.startsWith(t)&&!zd.test(e)),Lc=e=>/^mailto:/.test(e),Kd=e=>/^tel:/.test(e),Lr=e=>Object.prototype.toString.call(e)==="[object Object]",ss=e=>e[e.length-1]==="/"?e.slice(0,-1):e,Pc=e=>e[0]==="/"?e.slice(1):e,Ud=(e,t)=>{const n=Object.keys(e).sort((r,a)=>{const o=a.split("/").length-r.split("/").length;return o!==0?o:a.length-r.length});for(const r of n)if(t.startsWith(r))return r;return"/"};const Oc={"v-8daa1a0e":b(()=>v(()=>import("./index.html-ddebc05d.js"),["assets/index.html-ddebc05d.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-4b17c12f":b(()=>v(()=>import("./archives.html-75bdf204.js"),["assets/archives.html-75bdf204.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-184f4da6":b(()=>v(()=>import("./intro.html-012f790f.js"),["assets/intro.html-012f790f.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-47a75f3e":b(()=>v(()=>import("./Perfect-competition.html-2d97f6ac.js"),["assets/Perfect-competition.html-2d97f6ac.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-4ba4912a":b(()=>v(()=>import("./index.html-5d02b72a.js"),["assets/index.html-5d02b72a.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1f902b80":b(()=>v(()=>import("./betxin-rules.html-df7c3bcc.js"),["assets/betxin-rules.html-df7c3bcc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-51ce692c":b(()=>v(()=>import("./Docker-get-start.html-993cf7a4.js"),["assets/Docker-get-start.html-993cf7a4.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5ac20bf9":b(()=>v(()=>import("./index.html-d0ea94a1.js"),["assets/index.html-d0ea94a1.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-77c978ab":b(()=>v(()=>import("./index.html-5cb9db8a.js"),["assets/index.html-5cb9db8a.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5b6f1d36":b(()=>v(()=>import("./get-start-with-c-tcp-program.html-5e99e8d4.js"),["assets/get-start-with-c-tcp-program.html-5e99e8d4.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-ed510016":b(()=>v(()=>import("./backtrack.html-a723a9d6.js"),["assets/backtrack.html-a723a9d6.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6bd45cce":b(()=>v(()=>import("./dynamic-programming.html-f7a566b1.js"),["assets/dynamic-programming.html-f7a566b1.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1de1766a":b(()=>v(()=>import("./offer.html-670312e1.js"),["assets/offer.html-670312e1.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6b316540":b(()=>v(()=>import("./currency.html-d128d744.js"),["assets/currency.html-d128d744.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-a115b05a":b(()=>v(()=>import("./go-depth.html-2499d482.js"),["assets/go-depth.html-2499d482.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-56bd5e7e":b(()=>v(()=>import("./mysql-notes.html-f38d7f8c.js"),["assets/mysql-notes.html-f38d7f8c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-46709ae2":b(()=>v(()=>import("./cache-consistency.html-a3a8f1f5.js"),["assets/cache-consistency.html-a3a8f1f5.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-f29e4144":b(()=>v(()=>import("./datastruct.html-1f3459bc.js"),["assets/datastruct.html-1f3459bc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-fead0b28":b(()=>v(()=>import("./redis-note.html-b99e0ef0.js"),["assets/redis-note.html-b99e0ef0.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5ff9675f":b(()=>v(()=>import("./global-variable.html-b7c18de9.js"),["assets/global-variable.html-b7c18de9.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-75b021da":b(()=>v(()=>import("./2021-What-I-do.html-6ecd0faf.js"),["assets/2021-What-I-do.html-6ecd0faf.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-191e3f24":b(()=>v(()=>import("./I-wrote-a-blockchain-in-160-lines-of-code.html-ae59a594.js"),["assets/I-wrote-a-blockchain-in-160-lines-of-code.html-ae59a594.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-47375370":b(()=>v(()=>import("./I-wrote-a-new-App-that-could-help-me-in-immersed.html-b9e7d0b5.js"),["assets/I-wrote-a-new-App-that-could-help-me-in-immersed.html-b9e7d0b5.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5376a85d":b(()=>v(()=>import("./cosmic-origin.html-5c506404.js"),["assets/cosmic-origin.html-5c506404.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6d02af8e":b(()=>v(()=>import("./learn-again.html-5c670543.js"),["assets/learn-again.html-5c670543.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-48804d80":b(()=>v(()=>import("./Absolutely-Correct.html-68cbbb67.js"),["assets/Absolutely-Correct.html-68cbbb67.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-374fb63b":b(()=>v(()=>import("./Battle-Internet.html-3a3c8e6e.js"),["assets/Battle-Internet.html-3a3c8e6e.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6162d44c":b(()=>v(()=>import("./More-valuable-than-linear-algebra.html-d037e44f.js"),["assets/More-valuable-than-linear-algebra.html-d037e44f.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-0230ae44":b(()=>v(()=>import("./Protect-yourself.html-49153964.js"),["assets/Protect-yourself.html-49153964.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-4f026ee2":b(()=>v(()=>import("./be-friends-with-time.html-712bdbd9.js"),["assets/be-friends-with-time.html-712bdbd9.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-ca8f39fa":b(()=>v(()=>import("./get-away-wechat.html-090977bf.js"),["assets/get-away-wechat.html-090977bf.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-8b9fe7ba":b(()=>v(()=>import("./patient-with-develop.html-d68c385c.js"),["assets/patient-with-develop.html-d68c385c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-3a828186":b(()=>v(()=>import("./run.html-25d1b426.js"),["assets/run.html-25d1b426.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-423b1ad8":b(()=>v(()=>import("./the-future-of-internet.html-304f19cc.js"),["assets/the-future-of-internet.html-304f19cc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1c41ff49":b(()=>v(()=>import("./two-days.html-b0691b27.js"),["assets/two-days.html-b0691b27.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-51eb093a":b(()=>v(()=>import("./2023-5-23-why-I-long-write.html-8727a011.js"),["assets/2023-5-23-why-I-long-write.html-8727a011.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-2cbfa890":b(()=>v(()=>import("./2023-5-24-danger.html-0208e786.js"),["assets/2023-5-24-danger.html-0208e786.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-7e425500":b(()=>v(()=>import("./2023-5-25-money-with-life.html-c201e2e3.js"),["assets/2023-5-25-money-with-life.html-c201e2e3.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-321ca414":b(()=>v(()=>import("./2023-5-25-who-are-you_.html-f54f067c.js"),["assets/2023-5-25-who-are-you_.html-f54f067c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-21ddef20":b(()=>v(()=>import("./2023-5-26-what-is-thinking_.html-be55a4ce.js"),["assets/2023-5-26-what-is-thinking_.html-be55a4ce.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6056606e":b(()=>v(()=>import("./2023-5-27-roll-up.html-393eed00.js"),["assets/2023-5-27-roll-up.html-393eed00.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-27098123":b(()=>v(()=>import("./2023-5-28-the-realy-true.html-94edc4fc.js"),["assets/2023-5-28-the-realy-true.html-94edc4fc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-0e92e1ec":b(()=>v(()=>import("./2023-5-29-in-knowledge-people.html-9f63e22e.js"),["assets/2023-5-29-in-knowledge-people.html-9f63e22e.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-7057c552":b(()=>v(()=>import("./2023-5-30-about-thinging-self.html-56684d20.js"),["assets/2023-5-30-about-thinging-self.html-56684d20.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-69799310":b(()=>v(()=>import("./2023-6-14-change-blog.html-928312c6.js"),["assets/2023-6-14-change-blog.html-928312c6.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-f94547aa":b(()=>v(()=>import("./2023-6-16-mini-startup1.html-0c2b839a.js"),["assets/2023-6-16-mini-startup1.html-0c2b839a.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-63abedbc":b(()=>v(()=>import("./2023-6-2-be-affected.html-49888997.js"),["assets/2023-6-2-be-affected.html-49888997.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1eb20697":b(()=>v(()=>import("./2023-6-23-book-list.html-f8e8d774.js"),["assets/2023-6-23-book-list.html-f8e8d774.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5316d9fc":b(()=>v(()=>import("./2023-6-23-startup.html-8a55d426.js"),["assets/2023-6-23-startup.html-8a55d426.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-3e8c5afb":b(()=>v(()=>import("./2023-6-4-be-a-time-people.html-d81eaa7f.js"),["assets/2023-6-4-be-a-time-people.html-d81eaa7f.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5d6d81ad":b(()=>v(()=>import("./2023-6-4-self-thinking.html-d0642474.js"),["assets/2023-6-4-self-thinking.html-d0642474.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-650ae6ea":b(()=>v(()=>import("./2023-6-6-correct-comparison.html-f2eaa50e.js"),["assets/2023-6-6-correct-comparison.html-f2eaa50e.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6c2f3742":b(()=>v(()=>import("./2023-6-7-best-internet-win.html-3897ad92.js"),["assets/2023-6-7-best-internet-win.html-3897ad92.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-508e0582":b(()=>v(()=>import("./2023-6-8-praise-short-video.html-e3e22e66.js"),["assets/2023-6-8-praise-short-video.html-e3e22e66.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6ecc2a70":b(()=>v(()=>import("./2023-6-9-value-of-gpt.html-a1a6e703.js"),["assets/2023-6-9-value-of-gpt.html-a1a6e703.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6e1e1211":b(()=>v(()=>import("./top10-sorting.html-28f0e556.js"),["assets/top10-sorting.html-28f0e556.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5e01f85f":b(()=>v(()=>import("./gomock-tuto.html-4daead17.js"),["assets/gomock-tuto.html-4daead17.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-79877d44":b(()=>v(()=>import("./mockey.html-a207d703.js"),["assets/mockey.html-a207d703.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-7eae6995":b(()=>v(()=>import("./gin-framework-principle.html-938b6109.js"),["assets/gin-framework-principle.html-938b6109.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-e7a26318":b(()=>v(()=>import("./1.html-2a98037c.js"),["assets/1.html-2a98037c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-e438b1da":b(()=>v(()=>import("./2.html-c324f90b.js"),["assets/2.html-c324f90b.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-e0cf009c":b(()=>v(()=>import("./3.html-8ded2416.js"),["assets/3.html-8ded2416.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-dd654f5e":b(()=>v(()=>import("./4.html-f4c254d8.js"),["assets/4.html-f4c254d8.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5da90d53":b(()=>v(()=>import("./std-bufio.html-a266991c.js"),["assets/std-bufio.html-a266991c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6f8bc77d":b(()=>v(()=>import("./std-context.html-12b0e17b.js"),["assets/std-context.html-12b0e17b.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-00e31ada":b(()=>v(()=>import("./std-flag.html-a9b3f449.js"),["assets/std-flag.html-a9b3f449.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-18827cdf":b(()=>v(()=>import("./std-fmt.html-0dedd791.js"),["assets/std-fmt.html-0dedd791.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-4931fef0":b(()=>v(()=>import("./std-log.html-93eefa07.js"),["assets/std-log.html-93eefa07.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-76b39f2f":b(()=>v(()=>import("./std-reflect.html-2a6ed84b.js"),["assets/std-reflect.html-2a6ed84b.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6621bbf2":b(()=>v(()=>import("./std-strconv.html-afcc1e19.js"),["assets/std-strconv.html-afcc1e19.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5c5ebc19":b(()=>v(()=>import("./std-time.html-b510765e.js"),["assets/std-time.html-b510765e.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-3706649a":b(()=>v(()=>import("./404.html-7d6e1ac1.js"),["assets/404.html-7d6e1ac1.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-69a86107":b(()=>v(()=>import("./index.html-241078d3.js"),["assets/index.html-241078d3.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-e1e3da16":b(()=>v(()=>import("./index.html-084aabd7.js"),["assets/index.html-084aabd7.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-41ad8c23":b(()=>v(()=>import("./index.html-caa44780.js"),["assets/index.html-caa44780.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1aaf0020":b(()=>v(()=>import("./index.html-6bb18ec2.js"),["assets/index.html-6bb18ec2.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-88d61c22":b(()=>v(()=>import("./index.html-9249ac45.js"),["assets/index.html-9249ac45.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-85603d8c":b(()=>v(()=>import("./index.html-5fc4b3fb.js"),["assets/index.html-5fc4b3fb.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-2aef844c":b(()=>v(()=>import("./index.html-1f237e7f.js"),["assets/index.html-1f237e7f.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-2897b160":b(()=>v(()=>import("./index.html-79a2fd80.js"),["assets/index.html-79a2fd80.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-368344da":b(()=>v(()=>import("./index.html-1f8c3684.js"),["assets/index.html-1f8c3684.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-01742aa6":b(()=>v(()=>import("./index.html-c813d951.js"),["assets/index.html-c813d951.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-fa3fa1b0":b(()=>v(()=>import("./index.html-461cda42.js"),["assets/index.html-461cda42.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-7dc9dfbb":b(()=>v(()=>import("./index.html-c9121751.js"),["assets/index.html-c9121751.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-7915bbed":b(()=>v(()=>import("./index.html-de77ef69.js"),["assets/index.html-de77ef69.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-2d1aaa94":b(()=>v(()=>import("./index.html-a751e761.js"),["assets/index.html-a751e761.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-ff059b98":b(()=>v(()=>import("./index.html-f1873cc3.js"),["assets/index.html-f1873cc3.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-561f115c":b(()=>v(()=>import("./index.html-289e583c.js"),["assets/index.html-289e583c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-121f466e":b(()=>v(()=>import("./index.html-6058dd3e.js"),["assets/index.html-6058dd3e.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-a93e83a8":b(()=>v(()=>import("./index.html-4a609c01.js"),["assets/index.html-4a609c01.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-af437cd2":b(()=>v(()=>import("./index.html-7ba0cd39.js"),["assets/index.html-7ba0cd39.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1410c3e8":b(()=>v(()=>import("./index.html-b93d467c.js"),["assets/index.html-b93d467c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-3d42f458":b(()=>v(()=>import("./index.html-3c818ebe.js"),["assets/index.html-3c818ebe.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1410c407":b(()=>v(()=>import("./index.html-87112f5d.js"),["assets/index.html-87112f5d.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5bb0b1ce":b(()=>v(()=>import("./index.html-09724004.js"),["assets/index.html-09724004.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1410c426":b(()=>v(()=>import("./index.html-cec55259.js"),["assets/index.html-cec55259.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-558b1c03":b(()=>v(()=>import("./index.html-331cb5d3.js"),["assets/index.html-331cb5d3.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1582d2de":b(()=>v(()=>import("./index.html-f512cc67.js"),["assets/index.html-f512cc67.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1f7c2346":b(()=>v(()=>import("./index.html-761b01bf.js"),["assets/index.html-761b01bf.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-0e00f24e":b(()=>v(()=>import("./index.html-9b4e4c67.js"),["assets/index.html-9b4e4c67.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-f57efbb0":b(()=>v(()=>import("./index.html-63f922dd.js"),["assets/index.html-63f922dd.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6aedfa76":b(()=>v(()=>import("./index.html-4cde6ac3.js"),["assets/index.html-4cde6ac3.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-22d3e82c":b(()=>v(()=>import("./index.html-cd84649f.js"),["assets/index.html-cd84649f.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-614d0189":b(()=>v(()=>import("./index.html-3f66ad89.js"),["assets/index.html-3f66ad89.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-522ca6fe":b(()=>v(()=>import("./index.html-87c24be1.js"),["assets/index.html-87c24be1.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-5bc93818":b(()=>v(()=>import("./index.html-47375aa7.js"),["assets/index.html-47375aa7.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-744d024e":b(()=>v(()=>import("./index.html-df402558.js"),["assets/index.html-df402558.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-e52c881c":b(()=>v(()=>import("./index.html-932a548b.js"),["assets/index.html-932a548b.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-154dc4c4":b(()=>v(()=>import("./index.html-6789de83.js"),["assets/index.html-6789de83.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-01560935":b(()=>v(()=>import("./index.html-8cd0e885.js"),["assets/index.html-8cd0e885.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-721aed2b":b(()=>v(()=>import("./index.html-dc7fe814.js"),["assets/index.html-dc7fe814.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-c06a95c0":b(()=>v(()=>import("./index.html-8ab1f7dc.js"),["assets/index.html-8ab1f7dc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-3318a379":b(()=>v(()=>import("./index.html-4d24db09.js"),["assets/index.html-4d24db09.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-17bd7e0b":b(()=>v(()=>import("./index.html-7d8da312.js"),["assets/index.html-7d8da312.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6a0b0faf":b(()=>v(()=>import("./index.html-cc341610.js"),["assets/index.html-cc341610.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6106c001":b(()=>v(()=>import("./index.html-4b825aff.js"),["assets/index.html-4b825aff.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-e348c378":b(()=>v(()=>import("./index.html-2ccf0af9.js"),["assets/index.html-2ccf0af9.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-49627fe2":b(()=>v(()=>import("./index.html-a7a7a0fc.js"),["assets/index.html-a7a7a0fc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-9c48d85a":b(()=>v(()=>import("./index.html-887bd5ea.js"),["assets/index.html-887bd5ea.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-46b9d66c":b(()=>v(()=>import("./index.html-bb1e7a8b.js"),["assets/index.html-bb1e7a8b.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-e9a125fe":b(()=>v(()=>import("./index.html-28e3d8db.js"),["assets/index.html-28e3d8db.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-25e1acb9":b(()=>v(()=>import("./index.html-864ef82c.js"),["assets/index.html-864ef82c.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-80e9ca34":b(()=>v(()=>import("./index.html-63db75e0.js"),["assets/index.html-63db75e0.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-f6aa26dc":b(()=>v(()=>import("./index.html-5aa30601.js"),["assets/index.html-5aa30601.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-58ab7bb3":b(()=>v(()=>import("./index.html-fc55d1b1.js"),["assets/index.html-fc55d1b1.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-173e7dbe":b(()=>v(()=>import("./index.html-cb64f7f4.js"),["assets/index.html-cb64f7f4.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-70677d9e":b(()=>v(()=>import("./index.html-fbfebed9.js"),["assets/index.html-fbfebed9.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-0033da0b":b(()=>v(()=>import("./index.html-44e60ea7.js"),["assets/index.html-44e60ea7.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-9cc57efa":b(()=>v(()=>import("./index.html-cb89ba61.js"),["assets/index.html-cb89ba61.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-7b39bf6c":b(()=>v(()=>import("./index.html-017a5254.js"),["assets/index.html-017a5254.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-b6a4f932":b(()=>v(()=>import("./index.html-8f20e10e.js"),["assets/index.html-8f20e10e.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1bee38ca":b(()=>v(()=>import("./index.html-cad23c62.js"),["assets/index.html-cad23c62.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-7b0b3a14":b(()=>v(()=>import("./index.html-0acfdb6b.js"),["assets/index.html-0acfdb6b.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-0d1f4c3c":b(()=>v(()=>import("./index.html-c9350221.js"),["assets/index.html-c9350221.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1c5eedbf":b(()=>v(()=>import("./index.html-5a8ce966.js"),["assets/index.html-5a8ce966.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-606be265":b(()=>v(()=>import("./index.html-cb88e880.js"),["assets/index.html-cb88e880.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-58c21dea":b(()=>v(()=>import("./index.html-cee35319.js"),["assets/index.html-cee35319.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-291ba33d":b(()=>v(()=>import("./index.html-06a60a8a.js"),["assets/index.html-06a60a8a.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-b93724ec":b(()=>v(()=>import("./index.html-9e647b58.js"),["assets/index.html-9e647b58.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-574eed66":b(()=>v(()=>import("./index.html-7de4a88a.js"),["assets/index.html-7de4a88a.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-65f5031c":b(()=>v(()=>import("./index.html-c21c5027.js"),["assets/index.html-c21c5027.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-d293f072":b(()=>v(()=>import("./index.html-52f38965.js"),["assets/index.html-52f38965.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-1c5f3310":b(()=>v(()=>import("./index.html-ec27de1b.js"),["assets/index.html-ec27de1b.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-59ca63e7":b(()=>v(()=>import("./index.html-3ef2c67a.js"),["assets/index.html-3ef2c67a.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-219beb8e":b(()=>v(()=>import("./index.html-5ddd90fc.js"),["assets/index.html-5ddd90fc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-2bdb1026":b(()=>v(()=>import("./index.html-8115a44d.js"),["assets/index.html-8115a44d.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-2b6a541e":b(()=>v(()=>import("./index.html-d871fead.js"),["assets/index.html-d871fead.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-69787d8a":b(()=>v(()=>import("./index.html-28e0fdd1.js"),["assets/index.html-28e0fdd1.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-000f2cac":b(()=>v(()=>import("./index.html-6b6431d3.js"),["assets/index.html-6b6431d3.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-47e821f5":b(()=>v(()=>import("./index.html-1b6b3683.js"),["assets/index.html-1b6b3683.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-29324574":b(()=>v(()=>import("./index.html-7b8c8719.js"),["assets/index.html-7b8c8719.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-3d0b43bb":b(()=>v(()=>import("./index.html-433e8ebc.js"),["assets/index.html-433e8ebc.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-6224bc80":b(()=>v(()=>import("./index.html-70cf17ff.js"),["assets/index.html-70cf17ff.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-b3067b5c":b(()=>v(()=>import("./index.html-d4ab67e2.js"),["assets/index.html-d4ab67e2.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-40b79b1b":b(()=>v(()=>import("./index.html-fb0543b4.js"),["assets/index.html-fb0543b4.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-318ed680":b(()=>v(()=>import("./index.html-8d3f8166.js"),["assets/index.html-8d3f8166.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-53f6d684":b(()=>v(()=>import("./index.html-d53e4eae.js"),["assets/index.html-d53e4eae.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-02b233fe":b(()=>v(()=>import("./index.html-8cb78d8a.js"),["assets/index.html-8cb78d8a.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-283760d8":b(()=>v(()=>import("./index.html-3ecbdb36.js"),["assets/index.html-3ecbdb36.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-32017b2c":b(()=>v(()=>import("./index.html-e66f55c5.js"),["assets/index.html-e66f55c5.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-28d23657":b(()=>v(()=>import("./index.html-7b611eb6.js"),["assets/index.html-7b611eb6.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-0da0f862":b(()=>v(()=>import("./index.html-5e996a53.js"),["assets/index.html-5e996a53.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-3d1ed623":b(()=>v(()=>import("./index.html-9bafbcb7.js"),["assets/index.html-9bafbcb7.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-b310d59e":b(()=>v(()=>import("./index.html-15fdaf08.js"),["assets/index.html-15fdaf08.js","assets/plugin-vue_export-helper-c27b6911.js"])),"v-287f3643":b(()=>v(()=>import("./index.html-77b9876f.js"),["assets/index.html-77b9876f.js","assets/plugin-vue_export-helper-c27b6911.js"]))};var jd=Symbol(""),Cc=Symbol(""),Yd=Xt({key:"",path:"",title:"",lang:"",frontmatter:{},headers:[]}),de=()=>{const e=ie(Cc);if(!e)throw new Error("pageData() is called without provider.");return e},Dc=Symbol(""),ye=()=>{const e=ie(Dc);if(!e)throw new Error("usePageFrontmatter() is called without provider.");return e},xc=Symbol(""),Wd=()=>{const e=ie(xc);if(!e)throw new Error("usePageHead() is called without provider.");return e},qd=Symbol(""),Bc=Symbol(""),is=()=>{const e=ie(Bc);if(!e)throw new Error("usePageLang() is called without provider.");return e},Nc=Symbol(""),Zd=()=>{const e=ie(Nc);if(!e)throw new Error("usePageLayout() is called without provider.");return e},Xd=$(Vd),ls=Symbol(""),Rt=()=>{const e=ie(ls);if(!e)throw new Error("useRouteLocale() is called without provider.");return e},Ln=$(Md),Vc=()=>Ln,Mc=Symbol(""),Xn=()=>{const e=ie(Mc);if(!e)throw new Error("useSiteLocaleData() is called without provider.");return e},Jd=Symbol(""),Qd="Layout",ep="NotFound",Pt=wr({resolveLayouts:e=>e.reduce((t,n)=>({...t,...n.layouts}),{}),resolvePageData:async e=>{const t=Xd.value[e];return await(t==null?void 0:t())??Yd},resolvePageFrontmatter:e=>e.frontmatter,resolvePageHead:(e,t,n)=>{const r=pe(t.description)?t.description:n.description,a=[...J(t.head)?t.head:[],...n.head,["title",{},e],["meta",{name:"description",content:r}]];return Fd(a)},resolvePageHeadTitle:(e,t)=>[e.title,t.title].filter(n=>!!n).join(" | "),resolvePageLang:(e,t)=>e.lang||t.lang||"en-US",resolvePageLayout:(e,t)=>{let n;if(e.path){const r=e.frontmatter.layout;pe(r)?n=r:n=Qd}else n=ep;return t[n]},resolveRouteLocale:(e,t)=>Ud(e,t),resolveSiteLocaleData:(e,t)=>({...e,...e.locales[t]})}),Sa=B({name:"ClientOnly",setup(e,t){const n=$(!1);return se(()=>{n.value=!0}),()=>{var r,a;return n.value?(a=(r=t.slots).default)==null?void 0:a.call(r):null}}}),cs=B({name:"Content",props:{pageKey:{type:String,required:!1,default:""}},setup(e){const t=de(),n=k(()=>Oc[e.pageKey||t.value.key]);return()=>n.value?i(n.value):i("div","404 Not Found")}}),at=(e={})=>e,Ie=e=>En(e)?e:`/${Pc(e)}`;const tp={};/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Tn=typeof window<"u";function np(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const Ee=Object.assign;function Ga(e,t){const n={};for(const r in t){const a=t[r];n[r]=yt(a)?a.map(e):e(a)}return n}const ur=()=>{},yt=Array.isArray,rp=/\/$/,ap=e=>e.replace(rp,"");function za(e,t,n="/"){let r,a={},o="",s="";const l=t.indexOf("#");let u=t.indexOf("?");return l<u&&l>=0&&(u=-1),u>-1&&(r=t.slice(0,u),o=t.slice(u+1,l>-1?l:t.length),a=e(o)),l>-1&&(r=r||t.slice(0,l),s=t.slice(l,t.length)),r=lp(r??t,n),{fullPath:r+(o&&"?")+o+s,path:r,query:a,hash:s}}function op(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Pi(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function sp(e,t,n){const r=t.matched.length-1,a=n.matched.length-1;return r>-1&&r===a&&Kn(t.matched[r],n.matched[a])&&$c(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Kn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function $c(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!ip(e[n],t[n]))return!1;return!0}function ip(e,t){return yt(e)?Oi(e,t):yt(t)?Oi(t,e):e===t}function Oi(e,t){return yt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function lp(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),a=r[r.length-1];(a===".."||a===".")&&r.push("");let o=n.length-1,s,l;for(s=0;s<r.length;s++)if(l=r[s],l!==".")if(l==="..")o>1&&o--;else break;return n.slice(0,o).join("/")+"/"+r.slice(s-(s===r.length?1:0)).join("/")}var br;(function(e){e.pop="pop",e.push="push"})(br||(br={}));var dr;(function(e){e.back="back",e.forward="forward",e.unknown=""})(dr||(dr={}));function cp(e){if(!e)if(Tn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),ap(e)}const up=/^[^#]+#/;function dp(e,t){return e.replace(up,"#")+t}function pp(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Ra=()=>({left:window.pageXOffset,top:window.pageYOffset});function fp(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),a=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!a)return;t=pp(a,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function Ci(e,t){return(history.state?history.state.position-t:-1)+e}const go=new Map;function vp(e,t){go.set(e,t)}function hp(e){const t=go.get(e);return go.delete(e),t}let mp=()=>location.protocol+"//"+location.host;function Fc(e,t){const{pathname:n,search:r,hash:a}=t,o=e.indexOf("#");if(o>-1){let l=a.includes(e.slice(o))?e.slice(o).length:1,u=a.slice(l);return u[0]!=="/"&&(u="/"+u),Pi(u,"")}return Pi(n,e)+r+a}function gp(e,t,n,r){let a=[],o=[],s=null;const l=({state:f})=>{const h=Fc(e,location),g=n.value,A=t.value;let R=0;if(f){if(n.value=h,t.value=f,s&&s===g){s=null;return}R=A?f.position-A.position:0}else r(h);a.forEach(_=>{_(n.value,g,{delta:R,type:br.pop,direction:R?R>0?dr.forward:dr.back:dr.unknown})})};function u(){s=n.value}function c(f){a.push(f);const h=()=>{const g=a.indexOf(f);g>-1&&a.splice(g,1)};return o.push(h),h}function d(){const{history:f}=window;f.state&&f.replaceState(Ee({},f.state,{scroll:Ra()}),"")}function p(){for(const f of o)f();o=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:u,listen:c,destroy:p}}function Di(e,t,n,r=!1,a=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:a?Ra():null}}function _p(e){const{history:t,location:n}=window,r={value:Fc(e,n)},a={value:t.state};a.value||o(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function o(u,c,d){const p=e.indexOf("#"),f=p>-1?(n.host&&document.querySelector("base")?e:e.slice(p))+u:mp()+e+u;try{t[d?"replaceState":"pushState"](c,"",f),a.value=c}catch(h){console.error(h),n[d?"replace":"assign"](f)}}function s(u,c){const d=Ee({},t.state,Di(a.value.back,u,a.value.forward,!0),c,{position:a.value.position});o(u,d,!0),r.value=u}function l(u,c){const d=Ee({},a.value,t.state,{forward:u,scroll:Ra()});o(d.current,d,!0);const p=Ee({},Di(r.value,u,null),{position:d.position+1},c);o(u,p,!1),r.value=u}return{location:r,state:a,push:l,replace:s}}function Ep(e){e=cp(e);const t=_p(e),n=gp(e,t.state,t.location,t.replace);function r(o,s=!0){s||n.pauseListeners(),history.go(o)}const a=Ee({location:"",base:e,go:r,createHref:dp.bind(null,e)},t,n);return Object.defineProperty(a,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(a,"state",{enumerable:!0,get:()=>t.state.value}),a}function yp(e){return typeof e=="string"||e&&typeof e=="object"}function Hc(e){return typeof e=="string"||typeof e=="symbol"}const Ot={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Gc=Symbol("");var xi;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(xi||(xi={}));function Un(e,t){return Ee(new Error,{type:e,[Gc]:!0},t)}function It(e,t){return e instanceof Error&&Gc in e&&(t==null||!!(e.type&t))}const Bi="[^/]+?",bp={sensitive:!1,strict:!1,start:!0,end:!0},Ap=/[.+*?^${}()[\]/\\]/g;function kp(e,t){const n=Ee({},bp,t),r=[];let a=n.start?"^":"";const o=[];for(const c of e){const d=c.length?[]:[90];n.strict&&!c.length&&(a+="/");for(let p=0;p<c.length;p++){const f=c[p];let h=40+(n.sensitive?.25:0);if(f.type===0)p||(a+="/"),a+=f.value.replace(Ap,"\\$&"),h+=40;else if(f.type===1){const{value:g,repeatable:A,optional:R,regexp:_}=f;o.push({name:g,repeatable:A,optional:R});const y=_||Bi;if(y!==Bi){h+=10;try{new RegExp(`(${y})`)}catch(D){throw new Error(`Invalid custom RegExp for param "${g}" (${y}): `+D.message)}}let O=A?`((?:${y})(?:/(?:${y}))*)`:`(${y})`;p||(O=R&&c.length<2?`(?:/${O})`:"/"+O),R&&(O+="?"),a+=O,h+=20,R&&(h+=-8),A&&(h+=-20),y===".*"&&(h+=-50)}d.push(h)}r.push(d)}if(n.strict&&n.end){const c=r.length-1;r[c][r[c].length-1]+=.7000000000000001}n.strict||(a+="/?"),n.end?a+="$":n.strict&&(a+="(?:/|$)");const s=new RegExp(a,n.sensitive?"":"i");function l(c){const d=c.match(s),p={};if(!d)return null;for(let f=1;f<d.length;f++){const h=d[f]||"",g=o[f-1];p[g.name]=h&&g.repeatable?h.split("/"):h}return p}function u(c){let d="",p=!1;for(const f of e){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const h of f)if(h.type===0)d+=h.value;else if(h.type===1){const{value:g,repeatable:A,optional:R}=h,_=g in c?c[g]:"";if(yt(_)&&!A)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const y=yt(_)?_.join("/"):_;if(!y)if(R)f.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${g}"`);d+=y}}return d||"/"}return{re:s,score:r,keys:o,parse:l,stringify:u}}function Sp(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function Rp(e,t){let n=0;const r=e.score,a=t.score;for(;n<r.length&&n<a.length;){const o=Sp(r[n],a[n]);if(o)return o;n++}if(Math.abs(a.length-r.length)===1){if(Ni(r))return 1;if(Ni(a))return-1}return a.length-r.length}function Ni(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const wp={type:0,value:""},Tp=/[a-zA-Z0-9_]/;function Ip(e){if(!e)return[[]];if(e==="/")return[[wp]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(h){throw new Error(`ERR (${n})/"${c}": ${h}`)}let n=0,r=n;const a=[];let o;function s(){o&&a.push(o),o=[]}let l=0,u,c="",d="";function p(){c&&(n===0?o.push({type:0,value:c}):n===1||n===2||n===3?(o.length>1&&(u==="*"||u==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),o.push({type:1,value:c,regexp:d,repeatable:u==="*"||u==="+",optional:u==="*"||u==="?"})):t("Invalid state to consume buffer"),c="")}function f(){c+=u}for(;l<e.length;){if(u=e[l++],u==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:u==="/"?(c&&p(),s()):u===":"?(p(),n=1):f();break;case 4:f(),n=r;break;case 1:u==="("?n=2:Tp.test(u)?f():(p(),n=0,u!=="*"&&u!=="?"&&u!=="+"&&l--);break;case 2:u===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+u:n=3:d+=u;break;case 3:p(),n=0,u!=="*"&&u!=="?"&&u!=="+"&&l--,d="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${c}"`),p(),s(),a}function Lp(e,t,n){const r=kp(Ip(e.path),n),a=Ee(r,{record:e,parent:t,children:[],alias:[]});return t&&!a.record.aliasOf==!t.record.aliasOf&&t.children.push(a),a}function Pp(e,t){const n=[],r=new Map;t=$i({strict:!1,end:!0,sensitive:!1},t);function a(d){return r.get(d)}function o(d,p,f){const h=!f,g=Op(d);g.aliasOf=f&&f.record;const A=$i(t,d),R=[g];if("alias"in d){const O=typeof d.alias=="string"?[d.alias]:d.alias;for(const D of O)R.push(Ee({},g,{components:f?f.record.components:g.components,path:D,aliasOf:f?f.record:g}))}let _,y;for(const O of R){const{path:D}=O;if(p&&D[0]!=="/"){const U=p.record.path,x=U[U.length-1]==="/"?"":"/";O.path=p.record.path+(D&&x+D)}if(_=Lp(O,p,A),f?f.alias.push(_):(y=y||_,y!==_&&y.alias.push(_),h&&d.name&&!Mi(_)&&s(d.name)),g.children){const U=g.children;for(let x=0;x<U.length;x++)o(U[x],_,f&&f.children[x])}f=f||_,(_.record.components&&Object.keys(_.record.components).length||_.record.name||_.record.redirect)&&u(_)}return y?()=>{s(y)}:ur}function s(d){if(Hc(d)){const p=r.get(d);p&&(r.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(s),p.alias.forEach(s))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&r.delete(d.record.name),d.children.forEach(s),d.alias.forEach(s))}}function l(){return n}function u(d){let p=0;for(;p<n.length&&Rp(d,n[p])>=0&&(d.record.path!==n[p].record.path||!zc(d,n[p]));)p++;n.splice(p,0,d),d.record.name&&!Mi(d)&&r.set(d.record.name,d)}function c(d,p){let f,h={},g,A;if("name"in d&&d.name){if(f=r.get(d.name),!f)throw Un(1,{location:d});A=f.record.name,h=Ee(Vi(p.params,f.keys.filter(y=>!y.optional).map(y=>y.name)),d.params&&Vi(d.params,f.keys.map(y=>y.name))),g=f.stringify(h)}else if("path"in d)g=d.path,f=n.find(y=>y.re.test(g)),f&&(h=f.parse(g),A=f.record.name);else{if(f=p.name?r.get(p.name):n.find(y=>y.re.test(p.path)),!f)throw Un(1,{location:d,currentLocation:p});A=f.record.name,h=Ee({},p.params,d.params),g=f.stringify(h)}const R=[];let _=f;for(;_;)R.unshift(_.record),_=_.parent;return{name:A,path:g,params:h,matched:R,meta:Dp(R)}}return e.forEach(d=>o(d)),{addRoute:o,resolve:c,removeRoute:s,getRoutes:l,getRecordMatcher:a}}function Vi(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Op(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Cp(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Cp(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Mi(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Dp(e){return e.reduce((t,n)=>Ee(t,n.meta),{})}function $i(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function zc(e,t){return t.children.some(n=>n===e||zc(e,n))}const Kc=/#/g,xp=/&/g,Bp=/\//g,Np=/=/g,Vp=/\?/g,Uc=/\+/g,Mp=/%5B/g,$p=/%5D/g,jc=/%5E/g,Fp=/%60/g,Yc=/%7B/g,Hp=/%7C/g,Wc=/%7D/g,Gp=/%20/g;function us(e){return encodeURI(""+e).replace(Hp,"|").replace(Mp,"[").replace($p,"]")}function zp(e){return us(e).replace(Yc,"{").replace(Wc,"}").replace(jc,"^")}function _o(e){return us(e).replace(Uc,"%2B").replace(Gp,"+").replace(Kc,"%23").replace(xp,"%26").replace(Fp,"`").replace(Yc,"{").replace(Wc,"}").replace(jc,"^")}function Kp(e){return _o(e).replace(Np,"%3D")}function Up(e){return us(e).replace(Kc,"%23").replace(Vp,"%3F")}function jp(e){return e==null?"":Up(e).replace(Bp,"%2F")}function fa(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function Yp(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let a=0;a<r.length;++a){const o=r[a].replace(Uc," "),s=o.indexOf("="),l=fa(s<0?o:o.slice(0,s)),u=s<0?null:fa(o.slice(s+1));if(l in t){let c=t[l];yt(c)||(c=t[l]=[c]),c.push(u)}else t[l]=u}return t}function Fi(e){let t="";for(let n in e){const r=e[n];if(n=Kp(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(yt(r)?r.map(o=>o&&_o(o)):[r&&_o(r)]).forEach(o=>{o!==void 0&&(t+=(t.length?"&":"")+n,o!=null&&(t+="="+o))})}return t}function Wp(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=yt(r)?r.map(a=>a==null?null:""+a):r==null?r:""+r)}return t}const qp=Symbol(""),Hi=Symbol(""),wa=Symbol(""),ds=Symbol(""),Eo=Symbol("");function rr(){let e=[];function t(r){return e.push(r),()=>{const a=e.indexOf(r);a>-1&&e.splice(a,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Kt(e,t,n,r,a){const o=r&&(r.enterCallbacks[a]=r.enterCallbacks[a]||[]);return()=>new Promise((s,l)=>{const u=p=>{p===!1?l(Un(4,{from:n,to:t})):p instanceof Error?l(p):yp(p)?l(Un(2,{from:t,to:p})):(o&&r.enterCallbacks[a]===o&&typeof p=="function"&&o.push(p),s())},c=e.call(r&&r.instances[a],t,n,u);let d=Promise.resolve(c);e.length<3&&(d=d.then(u)),d.catch(p=>l(p))})}function Ka(e,t,n,r){const a=[];for(const o of e)for(const s in o.components){let l=o.components[s];if(!(t!=="beforeRouteEnter"&&!o.instances[s]))if(Zp(l)){const c=(l.__vccOpts||l)[t];c&&a.push(Kt(c,n,r,o,s))}else{let u=l();a.push(()=>u.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${o.path}"`));const d=np(c)?c.default:c;o.components[s]=d;const f=(d.__vccOpts||d)[t];return f&&Kt(f,n,r,o,s)()}))}}return a}function Zp(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function yo(e){const t=ie(wa),n=ie(ds),r=k(()=>t.resolve(fn(e.to))),a=k(()=>{const{matched:u}=r.value,{length:c}=u,d=u[c-1],p=n.matched;if(!d||!p.length)return-1;const f=p.findIndex(Kn.bind(null,d));if(f>-1)return f;const h=Gi(u[c-2]);return c>1&&Gi(d)===h&&p[p.length-1].path!==h?p.findIndex(Kn.bind(null,u[c-2])):f}),o=k(()=>a.value>-1&&e3(n.params,r.value.params)),s=k(()=>a.value>-1&&a.value===n.matched.length-1&&$c(n.params,r.value.params));function l(u={}){return Qp(u)?t[fn(e.replace)?"replace":"push"](fn(e.to)).catch(ur):Promise.resolve()}return{route:r,href:k(()=>r.value.href),isActive:o,isExactActive:s,navigate:l}}const Xp=B({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:yo,setup(e,{slots:t}){const n=wr(yo(e)),{options:r}=ie(wa),a=k(()=>({[zi(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[zi(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const o=t.default&&t.default(n);return e.custom?o:i("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},o)}}}),Jp=Xp;function Qp(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function e3(e,t){for(const n in t){const r=t[n],a=e[n];if(typeof r=="string"){if(r!==a)return!1}else if(!yt(a)||a.length!==r.length||r.some((o,s)=>o!==a[s]))return!1}return!0}function Gi(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const zi=(e,t,n)=>e??t??n,t3=B({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=ie(Eo),a=k(()=>e.route||r.value),o=ie(Hi,0),s=k(()=>{let c=fn(o);const{matched:d}=a.value;let p;for(;(p=d[c])&&!p.components;)c++;return c}),l=k(()=>a.value.matched[s.value]);tt(Hi,k(()=>s.value+1)),tt(qp,l),tt(Eo,a);const u=$();return re(()=>[u.value,l.value,e.name],([c,d,p],[f,h,g])=>{d&&(d.instances[p]=c,h&&h!==d&&c&&c===f&&(d.leaveGuards.size||(d.leaveGuards=h.leaveGuards),d.updateGuards.size||(d.updateGuards=h.updateGuards))),c&&d&&(!h||!Kn(d,h)||!f)&&(d.enterCallbacks[p]||[]).forEach(A=>A(c))},{flush:"post"}),()=>{const c=a.value,d=e.name,p=l.value,f=p&&p.components[d];if(!f)return Ki(n.default,{Component:f,route:c});const h=p.props[d],g=h?h===!0?c.params:typeof h=="function"?h(c):h:null,R=i(f,Ee({},g,t,{onVnodeUnmounted:_=>{_.component.isUnmounted&&(p.instances[d]=null)},ref:u}));return Ki(n.default,{Component:R,route:c})||R}}});function Ki(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const qc=t3;function n3(e){const t=Pp(e.routes,e),n=e.parseQuery||Yp,r=e.stringifyQuery||Fi,a=e.history,o=rr(),s=rr(),l=rr(),u=Le(Ot);let c=Ot;Tn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Ga.bind(null,T=>""+T),p=Ga.bind(null,jp),f=Ga.bind(null,fa);function h(T,H){let V,W;return Hc(T)?(V=t.getRecordMatcher(T),W=H):W=T,t.addRoute(W,V)}function g(T){const H=t.getRecordMatcher(T);H&&t.removeRoute(H)}function A(){return t.getRoutes().map(T=>T.record)}function R(T){return!!t.getRecordMatcher(T)}function _(T,H){if(H=Ee({},H||u.value),typeof T=="string"){const S=za(n,T,H.path),w=t.resolve({path:S.path},H),L=a.createHref(S.fullPath);return Ee(S,w,{params:f(w.params),hash:fa(S.hash),redirectedFrom:void 0,href:L})}let V;if("path"in T)V=Ee({},T,{path:za(n,T.path,H.path).path});else{const S=Ee({},T.params);for(const w in S)S[w]==null&&delete S[w];V=Ee({},T,{params:p(S)}),H.params=p(H.params)}const W=t.resolve(V,H),ve=T.hash||"";W.params=d(f(W.params));const m=op(r,Ee({},T,{hash:zp(ve),path:W.path})),E=a.createHref(m);return Ee({fullPath:m,hash:ve,query:r===Fi?Wp(T.query):T.query||{}},W,{redirectedFrom:void 0,href:E})}function y(T){return typeof T=="string"?za(n,T,u.value.path):Ee({},T)}function O(T,H){if(c!==T)return Un(8,{from:H,to:T})}function D(T){return q(T)}function U(T){return D(Ee(y(T),{replace:!0}))}function x(T){const H=T.matched[T.matched.length-1];if(H&&H.redirect){const{redirect:V}=H;let W=typeof V=="function"?V(T):V;return typeof W=="string"&&(W=W.includes("?")||W.includes("#")?W=y(W):{path:W},W.params={}),Ee({query:T.query,hash:T.hash,params:"path"in W?{}:T.params},W)}}function q(T,H){const V=c=_(T),W=u.value,ve=T.state,m=T.force,E=T.replace===!0,S=x(V);if(S)return q(Ee(y(S),{state:typeof S=="object"?Ee({},ve,S.state):ve,force:m,replace:E}),H||V);const w=V;w.redirectedFrom=H;let L;return!m&&sp(r,W,V)&&(L=Un(16,{to:w,from:W}),je(W,W,!0,!1)),(L?Promise.resolve(L):G(w,W)).catch(P=>It(P)?It(P,2)?P:bt(P):te(P,w,W)).then(P=>{if(P){if(It(P,2))return q(Ee({replace:E},y(P.to),{state:typeof P.to=="object"?Ee({},ve,P.to.state):ve,force:m}),H||w)}else P=z(w,W,!0,E,ve);return oe(w,W,P),P})}function I(T,H){const V=O(T,H);return V?Promise.reject(V):Promise.resolve()}function K(T){const H=ot.values().next().value;return H&&typeof H.runWithContext=="function"?H.runWithContext(T):T()}function G(T,H){let V;const[W,ve,m]=r3(T,H);V=Ka(W.reverse(),"beforeRouteLeave",T,H);for(const S of W)S.leaveGuards.forEach(w=>{V.push(Kt(w,T,H))});const E=I.bind(null,T,H);return V.push(E),xe(V).then(()=>{V=[];for(const S of o.list())V.push(Kt(S,T,H));return V.push(E),xe(V)}).then(()=>{V=Ka(ve,"beforeRouteUpdate",T,H);for(const S of ve)S.updateGuards.forEach(w=>{V.push(Kt(w,T,H))});return V.push(E),xe(V)}).then(()=>{V=[];for(const S of m)if(S.beforeEnter)if(yt(S.beforeEnter))for(const w of S.beforeEnter)V.push(Kt(w,T,H));else V.push(Kt(S.beforeEnter,T,H));return V.push(E),xe(V)}).then(()=>(T.matched.forEach(S=>S.enterCallbacks={}),V=Ka(m,"beforeRouteEnter",T,H),V.push(E),xe(V))).then(()=>{V=[];for(const S of s.list())V.push(Kt(S,T,H));return V.push(E),xe(V)}).catch(S=>It(S,8)?S:Promise.reject(S))}function oe(T,H,V){l.list().forEach(W=>K(()=>W(T,H,V)))}function z(T,H,V,W,ve){const m=O(T,H);if(m)return m;const E=H===Ot,S=Tn?history.state:{};V&&(W||E?a.replace(T.fullPath,Ee({scroll:E&&S&&S.scroll},ve)):a.push(T.fullPath,ve)),u.value=T,je(T,H,V,E),bt()}let Q;function j(){Q||(Q=a.listen((T,H,V)=>{if(!Nt.listening)return;const W=_(T),ve=x(W);if(ve){q(Ee(ve,{replace:!0}),W).catch(ur);return}c=W;const m=u.value;Tn&&vp(Ci(m.fullPath,V.delta),Ra()),G(W,m).catch(E=>It(E,12)?E:It(E,2)?(q(E.to,W).then(S=>{It(S,20)&&!V.delta&&V.type===br.pop&&a.go(-1,!1)}).catch(ur),Promise.reject()):(V.delta&&a.go(-V.delta,!1),te(E,W,m))).then(E=>{E=E||z(W,m,!1),E&&(V.delta&&!It(E,8)?a.go(-V.delta,!1):V.type===br.pop&&It(E,20)&&a.go(-1,!1)),oe(W,m,E)}).catch(ur)}))}let Te=rr(),le=rr(),_e;function te(T,H,V){bt(T);const W=le.list();return W.length?W.forEach(ve=>ve(T,H,V)):console.error(T),Promise.reject(T)}function pt(){return _e&&u.value!==Ot?Promise.resolve():new Promise((T,H)=>{Te.add([T,H])})}function bt(T){return _e||(_e=!T,j(),Te.list().forEach(([H,V])=>T?V(T):H()),Te.reset()),T}function je(T,H,V,W){const{scrollBehavior:ve}=e;if(!Tn||!ve)return Promise.resolve();const m=!V&&hp(Ci(T.fullPath,0))||(W||!V)&&history.state&&history.state.scroll||null;return Jt().then(()=>ve(T,H,m)).then(E=>E&&fp(E)).catch(E=>te(E,T,H))}const Oe=T=>a.go(T);let Tt;const ot=new Set,Nt={currentRoute:u,listening:!0,addRoute:h,removeRoute:g,hasRoute:R,getRoutes:A,resolve:_,options:e,push:D,replace:U,go:Oe,back:()=>Oe(-1),forward:()=>Oe(1),beforeEach:o.add,beforeResolve:s.add,afterEach:l.add,onError:le.add,isReady:pt,install(T){const H=this;T.component("RouterLink",Jp),T.component("RouterView",qc),T.config.globalProperties.$router=H,Object.defineProperty(T.config.globalProperties,"$route",{enumerable:!0,get:()=>fn(u)}),Tn&&!Tt&&u.value===Ot&&(Tt=!0,D(a.location).catch(ve=>{}));const V={};for(const ve in Ot)Object.defineProperty(V,ve,{get:()=>u.value[ve],enumerable:!0});T.provide(wa,H),T.provide(ds,Fl(V)),T.provide(Eo,u);const W=T.unmount;ot.add(T),T.unmount=function(){ot.delete(T),ot.size<1&&(c=Ot,Q&&Q(),Q=null,u.value=Ot,Tt=!1,_e=!1),W()}}};function xe(T){return T.reduce((H,V)=>H.then(()=>K(V)),Promise.resolve())}return Nt}function r3(e,t){const n=[],r=[],a=[],o=Math.max(t.matched.length,e.matched.length);for(let s=0;s<o;s++){const l=t.matched[s];l&&(e.matched.find(c=>Kn(c,l))?r.push(l):n.push(l));const u=e.matched[s];u&&(t.matched.find(c=>Kn(c,u))||a.push(u))}return[n,r,a]}function He(){return ie(wa)}function wt(){return ie(ds)}var Ke=Uint8Array,Pn=Uint16Array,a3=Int32Array,Zc=new Ke([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Xc=new Ke([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o3=new Ke([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Jc=function(e,t){for(var n=new Pn(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var a=new a3(n[30]),r=1;r<30;++r)for(var o=n[r];o<n[r+1];++o)a[o]=o-n[r]<<5|r;return{b:n,r:a}},Qc=Jc(Zc,2),eu=Qc.b,s3=Qc.r;eu[28]=258,s3[258]=28;var i3=Jc(Xc,0),l3=i3.b,bo=new Pn(32768);for(var we=0;we<32768;++we){var Ft=(we&43690)>>1|(we&21845)<<1;Ft=(Ft&52428)>>2|(Ft&13107)<<2,Ft=(Ft&61680)>>4|(Ft&3855)<<4,bo[we]=((Ft&65280)>>8|(Ft&255)<<8)>>1}var pr=function(e,t,n){for(var r=e.length,a=0,o=new Pn(t);a<r;++a)e[a]&&++o[e[a]-1];var s=new Pn(t);for(a=1;a<t;++a)s[a]=s[a-1]+o[a-1]<<1;var l;if(n){l=new Pn(1<<t);var u=15-t;for(a=0;a<r;++a)if(e[a])for(var c=a<<4|e[a],d=t-e[a],p=s[e[a]-1]++<<d,f=p|(1<<d)-1;p<=f;++p)l[bo[p]>>u]=c}else for(l=new Pn(r),a=0;a<r;++a)e[a]&&(l[a]=bo[s[e[a]-1]++]>>15-e[a]);return l},Pr=new Ke(288);for(var we=0;we<144;++we)Pr[we]=8;for(var we=144;we<256;++we)Pr[we]=9;for(var we=256;we<280;++we)Pr[we]=7;for(var we=280;we<288;++we)Pr[we]=8;var tu=new Ke(32);for(var we=0;we<32;++we)tu[we]=5;var c3=pr(Pr,9,1),u3=pr(tu,5,1),Ua=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},vt=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},ja=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},d3=function(e){return(e+7)/8|0},ps=function(e,t,n){(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length);var r=new Ke(n-t);return r.set(e.subarray(t,n)),r},p3=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],lt=function(e,t,n){var r=new Error(t||p3[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,lt),!n)throw r;return r},f3=function(e,t,n,r){var a=e.length,o=r?r.length:0;if(!a||t.f&&!t.l)return n||new Ke(0);var s=!n||t.i!=2,l=t.i;n||(n=new Ke(a*3));var u=function(W){var ve=n.length;if(W>ve){var m=new Ke(Math.max(ve*2,W));m.set(n),n=m}},c=t.f||0,d=t.p||0,p=t.b||0,f=t.l,h=t.d,g=t.m,A=t.n,R=a*8;do{if(!f){c=vt(e,d,1);var _=vt(e,d+1,3);if(d+=3,_)if(_==1)f=c3,h=u3,g=9,A=5;else if(_==2){var U=vt(e,d,31)+257,x=vt(e,d+10,15)+4,q=U+vt(e,d+5,31)+1;d+=14;for(var I=new Ke(q),K=new Ke(19),G=0;G<x;++G)K[o3[G]]=vt(e,d+G*3,7);d+=x*3;for(var oe=Ua(K),z=(1<<oe)-1,Q=pr(K,oe,1),G=0;G<q;){var j=Q[vt(e,d,z)];d+=j&15;var y=j>>4;if(y<16)I[G++]=y;else{var Te=0,le=0;for(y==16?(le=3+vt(e,d,3),d+=2,Te=I[G-1]):y==17?(le=3+vt(e,d,7),d+=3):y==18&&(le=11+vt(e,d,127),d+=7);le--;)I[G++]=Te}}var _e=I.subarray(0,U),te=I.subarray(U);g=Ua(_e),A=Ua(te),f=pr(_e,g,1),h=pr(te,A,1)}else lt(1);else{var y=d3(d)+4,O=e[y-4]|e[y-3]<<8,D=y+O;if(D>a){l&&lt(0);break}s&&u(p+O),n.set(e.subarray(y,D),p),t.b=p+=O,t.p=d=D*8,t.f=c;continue}if(d>R){l&&lt(0);break}}s&&u(p+131072);for(var pt=(1<<g)-1,bt=(1<<A)-1,je=d;;je=d){var Te=f[ja(e,d)&pt],Oe=Te>>4;if(d+=Te&15,d>R){l&&lt(0);break}if(Te||lt(2),Oe<256)n[p++]=Oe;else if(Oe==256){je=d,f=null;break}else{var Tt=Oe-254;if(Oe>264){var G=Oe-257,ot=Zc[G];Tt=vt(e,d,(1<<ot)-1)+eu[G],d+=ot}var Nt=h[ja(e,d)&bt],xe=Nt>>4;Nt||lt(3),d+=Nt&15;var te=l3[xe];if(xe>3){var ot=Xc[xe];te+=ja(e,d)&(1<<ot)-1,d+=ot}if(d>R){l&&lt(0);break}s&&u(p+131072);var T=p+Tt;if(p<te){var H=o-te,V=Math.min(te,T);for(H+p<0&&lt(3);p<V;++p)n[p]=r[H+p]}for(;p<T;p+=4)n[p]=n[p-te],n[p+1]=n[p+1-te],n[p+2]=n[p+2-te],n[p+3]=n[p+3-te];p=T}}t.l=f,t.p=je,t.b=p,t.f=c,f&&(c=1,t.m=g,t.d=h,t.n=A)}while(!c);return p==n.length?n:ps(n,0,p)},v3=new Ke(0),h3=function(e,t){return((e[0]&15)!=8||e[0]>>4>7||(e[0]<<8|e[1])%31)&&lt(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&lt(6,"invalid zlib data: "+(e[1]&32?"need":"unexpected")+" dictionary"),(e[1]>>3&4)+2};function m3(e,t){return f3(e.subarray(h3(e,t&&t.dictionary),-4),{i:2},t&&t.out,t&&t.dictionary)}var Ui=typeof TextEncoder<"u"&&new TextEncoder,Ao=typeof TextDecoder<"u"&&new TextDecoder,g3=0;try{Ao.decode(v3,{stream:!0}),g3=1}catch{}var _3=function(e){for(var t="",n=0;;){var r=e[n++],a=(r>127)+(r>223)+(r>239);if(n+a>e.length)return{s:t,r:ps(e,n-1)};a?a==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):a&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function E3(e,t){if(t){for(var n=new Ke(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(Ui)return Ui.encode(e);for(var a=e.length,o=new Ke(e.length+(e.length>>1)),s=0,l=function(d){o[s++]=d},r=0;r<a;++r){if(s+5>o.length){var u=new Ke(s+8+(a-r<<1));u.set(o),o=u}var c=e.charCodeAt(r);c<128||t?l(c):c<2048?(l(192|c>>6),l(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|e.charCodeAt(++r)&1023,l(240|c>>18),l(128|c>>12&63),l(128|c>>6&63),l(128|c&63)):(l(224|c>>12),l(128|c>>6&63),l(128|c&63))}return ps(o,0,s)}function y3(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(Ao)return Ao.decode(e);var a=_3(e),o=a.s,n=a.r;return n.length&&lt(8),o}}const ae=({name:e="",color:t="currentColor"},{slots:n})=>{var r;return i("svg",{xmlns:"http://www.w3.org/2000/svg",class:["icon",`${e}-icon`],viewBox:"0 0 1024 1024",fill:t,"aria-label":`${e} icon`},(r=n.default)==null?void 0:r.call(n))};ae.displayName="IconBase";const en=({size:e=48,stroke:t=4,wrapper:n=!0,height:r=2*e})=>{const a=i("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:e,preserveAspectRatio:"xMidYMid",viewBox:"25 25 50 50"},[i("animateTransform",{attributeName:"transform",type:"rotate",dur:"2s",keyTimes:"0;1",repeatCount:"indefinite",values:"0;360"}),i("circle",{cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":t,"stroke-linecap":"round"},[i("animate",{attributeName:"stroke-dasharray",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"1,200;90,200;1,200"}),i("animate",{attributeName:"stroke-dashoffset",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"0;-35px;-125px"})])]);return n?i("div",{class:"loading-icon-wrapper",style:`display:flex;align-items:center;justify-content:center;height:${r}px`},a):a};en.displayName="LoadingIcon";const nu=(e,{slots:t})=>{var n;return(n=t.default)==null?void 0:n.call(t)},b3=e=>[/\((ipad);[-\w),; ]+apple/i,/applecoremedia\/[\w.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i].some(t=>t.test(e)),A3=e=>[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i].some(t=>t.test(e)),k3=e=>[/(mac os x) ?([\w. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i].some(t=>t.test(e)),fs=(e="")=>{if(e){if(typeof e=="number")return new Date(e);const t=Date.parse(e.toString());if(!Number.isNaN(t))return new Date(t)}return null},Ta=(e,t)=>{let n=1;for(let r=0;r<e.length;r++)n+=e.charCodeAt(r),n+=n<<10,n^=n>>6;return n+=n<<3,n^=n>>11,n%t},vs=Array.isArray,S3=e=>typeof e=="function",R3=e=>typeof e=="string";var w3=e=>e.startsWith("ftp://"),hs=e=>/^(https?:)?\/\//.test(e),T3=/.md((\?|#).*)?$/,I3=(e,t="/")=>!!(hs(e)||w3(e)||e.startsWith("/")&&!e.startsWith(t)&&!T3.test(e)),fr=e=>Object.prototype.toString.call(e)==="[object Object]";function L3(){const e=$(!1);return _n()&&se(()=>{e.value=!0}),e}function P3(e){return L3(),k(()=>!!e())}const O3=e=>typeof e=="function",xt=e=>typeof e=="string",hn=(e,t)=>xt(e)&&e.startsWith(t),kn=(e,t)=>xt(e)&&e.endsWith(t),Jn=Object.entries,C3=Object.fromEntries,rt=Object.keys,ji=(e,...t)=>{if(t.length===0)return e;const n=t.shift()||null;return n&&Jn(n).forEach(([r,a])=>{r==="__proto__"||r==="constructor"||(fr(e[r])&&fr(a)?ji(e[r],a):vs(a)?e[r]=[...a]:fr(a)?e[r]={...a}:e[r]=n[r])}),ji(e,...t)},D3=e=>(e.endsWith(".md")&&(e=`${e.slice(0,-3)}.html`),!e.endsWith("/")&&!e.endsWith(".html")&&(e=`${e}.html`),e=e.replace(/(^|\/)(?:README|index).html$/i,"$1"),e),ru=e=>{const[t,n=""]=e.split("#");return t?`${D3(t)}${n?`#${n}`:""}`:e},Yi=e=>fr(e)&&xt(e.name),Ar=(e,t=!1)=>e?vs(e)?e.map(n=>xt(n)?{name:n}:Yi(n)?n:null).filter(n=>n!==null):xt(e)?[{name:e}]:Yi(e)?[e]:(console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${t?"":"| false"} | undefined\`, but got`,e),[]):[],au=(e,t)=>{if(e){if(vs(e)&&e.every(xt))return e;if(xt(e))return[e];console.error(`Expect ${t||"value"} to be \`string[] | string | undefined\`, but got`,e)}return[]},ou=e=>au(e,"category"),su=e=>au(e,"tag"),Ia=e=>hn(e,"/");let x3=class{constructor(){Ca(this,"containerElement");Ca(this,"messageElements",{});const t="message-container",n=document.getElementById(t);n?this.containerElement=n:(this.containerElement=document.createElement("div"),this.containerElement.id=t,document.body.appendChild(this.containerElement))}pop(t,n=2e3){const r=document.createElement("div"),a=Date.now();return r.className="message move-in",r.innerHTML=t,this.containerElement.appendChild(r),this.messageElements[a]=r,n>0&&setTimeout(()=>{this.close(a)},n),a}close(t){if(t){const n=this.messageElements[t];n.classList.remove("move-in"),n.classList.add("move-out"),n.addEventListener("animationend",()=>{n.remove(),delete this.messageElements[t]})}else rt(this.messageElements).forEach(n=>this.close(Number(n)))}destroy(){document.body.removeChild(this.containerElement)}};const iu=/#.*$/u,B3=e=>{const t=iu.exec(e);return t?t[0]:""},Wi=e=>decodeURI(e).replace(iu,"").replace(/(index)?\.(md|html)$/,""),ms=(e,t)=>{if(t===void 0)return!1;const n=Wi(e.path),r=Wi(t),a=B3(t);return a?a===e.hash&&(!r||n===r):n===r},mn=e=>{const t=atob(e);return y3(m3(E3(t,!0)))},N3=e=>hs(e)?e:`https://github.com/${e}`,lu=e=>!hs(e)||/github\.com/.test(e)?"GitHub":/bitbucket\.org/.test(e)?"Bitbucket":/gitlab\.com/.test(e)?"GitLab":/gitee\.com/.test(e)?"Gitee":null,jn=(e,...t)=>{const n=e.resolve(...t),r=n.matched[n.matched.length-1];if(!(r!=null&&r.redirect))return n;const{redirect:a}=r,o=S3(a)?a(n):a,s=R3(o)?{path:o}:o;return jn(e,{hash:n.hash,query:n.query,params:n.params,...s})},V3=e=>{if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget){const t=e.currentTarget.getAttribute("target");if(t!=null&&t.match(/\b_blank\b/i))return}return e.preventDefault(),!0}},Me=({to:e=""},{slots:t})=>{var n;const r=He(),a=(o={})=>V3(o)?r.push(e).catch():Promise.resolve();return i("a",{class:"vp-link",href:Ie(ru(e)),onClick:a},(n=t.default)==null?void 0:n.call(t))};Me.displayName="VPLink";const cu=()=>i(ae,{name:"github"},()=>i("path",{d:"M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z"}));cu.displayName="GitHubIcon";const uu=()=>i(ae,{name:"gitlab"},()=>i("path",{d:"M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z"}));uu.displayName="GitLabIcon";const du=()=>i(ae,{name:"gitee"},()=>i("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z"}));du.displayName="GiteeIcon";const pu=()=>i(ae,{name:"bitbucket"},()=>i("path",{d:"M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z"}));pu.displayName="BitbucketIcon";const fu=()=>i(ae,{name:"source"},()=>i("path",{d:"M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z"}));fu.displayName="SourceIcon";const Et=(e,t)=>{const n=t?t._instance:_n();return fr(n==null?void 0:n.appContext.components)&&(e in n.appContext.components||ut(e)in n.appContext.components||Rr(ut(e))in n.appContext.components)},M3=()=>P3(()=>typeof window<"u"&&window.navigator&&"userAgent"in window.navigator),vu=()=>{const e=M3();return k(()=>e.value&&/\b(?:Android|iPhone)/i.test(navigator.userAgent))},tn=e=>{const t=Rt();return k(()=>e[t.value])};function qi(e,t){var n;const r=Le();return Xl(()=>{r.value=e()},{...t,flush:(n=t==null?void 0:t.flush)!=null?n:"sync"}),Xt(r)}function $3(e,t){let n,r,a;const o=$(!0),s=()=>{o.value=!0,a()};re(e,s,{flush:"sync"});const l=typeof t=="function"?t:t.get,u=typeof t=="function"?void 0:t.set,c=Ul((d,p)=>(r=d,a=p,{get(){return o.value&&(n=l(),o.value=!1),r(),n},set(f){u==null||u(f)}}));return Object.isExtensible(c)&&(c.trigger=s),c}function nn(e){return Ll()?(m0(e),!0):!1}function We(e){return typeof e=="function"?e():fn(e)}const Or=typeof window<"u"&&typeof document<"u",F3=Object.prototype.toString,H3=e=>F3.call(e)==="[object Object]",Zt=()=>{},ko=G3();function G3(){var e;return Or&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent)}function gs(e,t){function n(...r){return new Promise((a,o)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(a).catch(o)})}return n}const hu=e=>e();function z3(e,t={}){let n,r,a=Zt;const o=l=>{clearTimeout(l),a(),a=Zt};return l=>{const u=We(e),c=We(t.maxWait);return n&&o(n),u<=0||c!==void 0&&c<=0?(r&&(o(r),r=null),Promise.resolve(l())):new Promise((d,p)=>{a=t.rejectOnCancel?p:d,c&&!r&&(r=setTimeout(()=>{n&&o(n),r=null,d(l())},c)),n=setTimeout(()=>{r&&o(r),r=null,d(l())},u)})}}function K3(e,t=!0,n=!0,r=!1){let a=0,o,s=!0,l=Zt,u;const c=()=>{o&&(clearTimeout(o),o=void 0,l(),l=Zt)};return p=>{const f=We(e),h=Date.now()-a,g=()=>u=p();return c(),f<=0?(a=Date.now(),g()):(h>f&&(n||!s)?(a=Date.now(),g()):t&&(u=new Promise((A,R)=>{l=r?R:A,o=setTimeout(()=>{a=Date.now(),s=!0,A(g()),c()},Math.max(0,f-h))})),!n&&!o&&(o=setTimeout(()=>s=!0,f)),s=!1,u)}}function U3(e=hu){const t=$(!0);function n(){t.value=!1}function r(){t.value=!0}const a=(...o)=>{t.value&&e(...o)};return{isActive:Xt(t),pause:n,resume:r,eventFilter:a}}function j3(...e){if(e.length!==1)return Zn(...e);const t=e[0];return typeof t=="function"?Xt(Ul(()=>({get:t,set:Zt}))):$(t)}function _s(e,t=200,n={}){return gs(z3(t,n),e)}function Y3(e,t=200,n=!1,r=!0,a=!1){return gs(K3(t,n,r,a),e)}function W3(e,t,n={}){const{eventFilter:r=hu,...a}=n;return re(e,gs(r,t),a)}function q3(e,t,n={}){const{eventFilter:r,...a}=n,{eventFilter:o,pause:s,resume:l,isActive:u}=U3(r);return{stop:W3(e,t,{...a,eventFilter:o}),pause:s,resume:l,isActive:u}}function mu(e,t=!0){_n()?se(e):t?e():Jt(e)}function Z3(e,t,n={}){const{immediate:r=!0}=n,a=$(!1);let o=null;function s(){o&&(clearTimeout(o),o=null)}function l(){a.value=!1,s()}function u(...c){s(),a.value=!0,o=setTimeout(()=>{a.value=!1,o=null,e(...c)},We(t))}return r&&(a.value=!0,Or&&u()),nn(l),{isPending:Xt(a),start:u,stop:l}}function So(e=!1,t={}){const{truthyValue:n=!0,falsyValue:r=!1}=t,a=Ve(e),o=$(e);function s(l){if(arguments.length)return o.value=l,o.value;{const u=We(n);return o.value=o.value===u?We(r):u,o.value}}return a?s:[o,s]}function Qe(e){var t;const n=We(e);return(t=n==null?void 0:n.$el)!=null?t:n}const dt=Or?window:void 0,gu=Or?window.document:void 0,X3=Or?window.navigator:void 0;function Ce(...e){let t,n,r,a;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,a]=e,t=dt):[t,n,r,a]=e,!t)return Zt;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const o=[],s=()=>{o.forEach(d=>d()),o.length=0},l=(d,p,f,h)=>(d.addEventListener(p,f,h),()=>d.removeEventListener(p,f,h)),u=re(()=>[Qe(t),We(a)],([d,p])=>{if(s(),!d)return;const f=H3(p)?{...p}:p;o.push(...n.flatMap(h=>r.map(g=>l(d,h,g,f))))},{immediate:!0,flush:"post"}),c=()=>{u(),s()};return nn(c),c}let Zi=!1;function _u(e,t,n={}){const{window:r=dt,ignore:a=[],capture:o=!0,detectIframe:s=!1}=n;if(!r)return;ko&&!Zi&&(Zi=!0,Array.from(r.document.body.children).forEach(f=>f.addEventListener("click",Zt)),r.document.documentElement.addEventListener("click",Zt));let l=!0;const u=f=>a.some(h=>{if(typeof h=="string")return Array.from(r.document.querySelectorAll(h)).some(g=>g===f.target||f.composedPath().includes(g));{const g=Qe(h);return g&&(f.target===g||f.composedPath().includes(g))}}),d=[Ce(r,"click",f=>{const h=Qe(e);if(!(!h||h===f.target||f.composedPath().includes(h))){if(f.detail===0&&(l=!u(f)),!l){l=!0;return}t(f)}},{passive:!0,capture:o}),Ce(r,"pointerdown",f=>{const h=Qe(e);h&&(l=!f.composedPath().includes(h)&&!u(f))},{passive:!0}),s&&Ce(r,"blur",f=>{setTimeout(()=>{var h;const g=Qe(e);((h=r.document.activeElement)==null?void 0:h.tagName)==="IFRAME"&&!(g!=null&&g.contains(r.document.activeElement))&&t(f)},0)})].filter(Boolean);return()=>d.forEach(f=>f())}function J3(){const e=$(!1);return _n()&&se(()=>{e.value=!0}),e}function Cr(e){const t=J3();return k(()=>(t.value,!!e()))}function Eu(e,t={}){const{window:n=dt}=t,r=Cr(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let a;const o=$(!1),s=c=>{o.value=c.matches},l=()=>{a&&("removeEventListener"in a?a.removeEventListener("change",s):a.removeListener(s))},u=Xl(()=>{r.value&&(l(),a=n.matchMedia(We(e)),"addEventListener"in a?a.addEventListener("change",s):a.addListener(s),o.value=a.matches)});return nn(()=>{u(),l(),a=void 0}),o}function Q3(e={}){const{navigator:t=X3,read:n=!1,source:r,copiedDuring:a=1500,legacy:o=!1}=e,s=Cr(()=>t&&"clipboard"in t),l=k(()=>s.value||o),u=$(""),c=$(!1),d=Z3(()=>c.value=!1,a);function p(){s.value?t.clipboard.readText().then(A=>{u.value=A}):u.value=g()}l.value&&n&&Ce(["copy","cut"],p);async function f(A=We(r)){l.value&&A!=null&&(s.value?await t.clipboard.writeText(A):h(A),u.value=A,c.value=!0,d.start())}function h(A){const R=document.createElement("textarea");R.value=A??"",R.style.position="absolute",R.style.opacity="0",document.body.appendChild(R),R.select(),document.execCommand("copy"),R.remove()}function g(){var A,R,_;return(_=(R=(A=document==null?void 0:document.getSelection)==null?void 0:A.call(document))==null?void 0:R.toString())!=null?_:""}return{isSupported:l,text:u,copied:c,copy:f}}const Wr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},qr="__vueuse_ssr_handlers__",e4=t4();function t4(){return qr in Wr||(Wr[qr]=Wr[qr]||{}),Wr[qr]}function n4(e,t){return e4[e]||t}function r4(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const a4={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},Xi="vueuse-storage";function yn(e,t,n,r={}){var a;const{flush:o="pre",deep:s=!0,listenToStorageChanges:l=!0,writeDefaults:u=!0,mergeDefaults:c=!1,shallow:d,window:p=dt,eventFilter:f,onError:h=I=>{console.error(I)}}=r,g=(d?Le:$)(t);if(!n)try{n=n4("getDefaultStorage",()=>{var I;return(I=dt)==null?void 0:I.localStorage})()}catch(I){h(I)}if(!n)return g;const A=We(t),R=r4(A),_=(a=r.serializer)!=null?a:a4[R],{pause:y,resume:O}=q3(g,()=>D(g.value),{flush:o,deep:s,eventFilter:f});return p&&l&&(Ce(p,"storage",q),Ce(p,Xi,x)),q(),g;function D(I){try{if(I==null)n.removeItem(e);else{const K=_.write(I),G=n.getItem(e);G!==K&&(n.setItem(e,K),p&&p.dispatchEvent(new CustomEvent(Xi,{detail:{key:e,oldValue:G,newValue:K,storageArea:n}})))}}catch(K){h(K)}}function U(I){const K=I?I.newValue:n.getItem(e);if(K==null)return u&&A!==null&&n.setItem(e,_.write(A)),A;if(!I&&c){const G=_.read(K);return typeof c=="function"?c(G,A):R==="object"&&!Array.isArray(G)?{...A,...G}:G}else return typeof K!="string"?K:_.read(K)}function x(I){q(I.detail)}function q(I){if(!(I&&I.storageArea!==n)){if(I&&I.key==null){g.value=A;return}if(!(I&&I.key!==e)){y();try{(I==null?void 0:I.newValue)!==_.write(g.value)&&(g.value=U(I))}catch(K){h(K)}finally{I?Jt(O):O()}}}}}function o4(e){return Eu("(prefers-color-scheme: dark)",e)}function s4(e,t,n={}){const{window:r=dt,...a}=n;let o;const s=Cr(()=>r&&"MutationObserver"in r),l=()=>{o&&(o.disconnect(),o=void 0)},u=re(()=>Qe(e),d=>{l(),s.value&&r&&d&&(o=new MutationObserver(t),o.observe(d,a))},{immediate:!0}),c=()=>{l(),u()};return nn(c),{isSupported:s,stop:c}}function i4(e,t,n={}){const{window:r=dt,...a}=n;let o;const s=Cr(()=>r&&"ResizeObserver"in r),l=()=>{o&&(o.disconnect(),o=void 0)},u=k(()=>Array.isArray(e)?e.map(p=>Qe(p)):[Qe(e)]),c=re(u,p=>{if(l(),s.value&&r){o=new ResizeObserver(t);for(const f of p)f&&o.observe(f,a)}},{immediate:!0,flush:"post",deep:!0}),d=()=>{l(),c()};return nn(d),{isSupported:s,stop:d}}function l4(e,t={width:0,height:0},n={}){const{window:r=dt,box:a="content-box"}=n,o=k(()=>{var u,c;return(c=(u=Qe(e))==null?void 0:u.namespaceURI)==null?void 0:c.includes("svg")}),s=$(t.width),l=$(t.height);return i4(e,([u])=>{const c=a==="border-box"?u.borderBoxSize:a==="content-box"?u.contentBoxSize:u.devicePixelContentBoxSize;if(r&&o.value){const d=Qe(e);if(d){const p=r.getComputedStyle(d);s.value=Number.parseFloat(p.width),l.value=Number.parseFloat(p.height)}}else if(c){const d=Array.isArray(c)?c:[c];s.value=d.reduce((p,{inlineSize:f})=>p+f,0),l.value=d.reduce((p,{blockSize:f})=>p+f,0)}else s.value=u.contentRect.width,l.value=u.contentRect.height},n),re(()=>Qe(e),u=>{s.value=u?t.width:0,l.value=u?t.height:0}),{width:s,height:l}}const Ji=["fullscreenchange","webkitfullscreenchange","webkitendfullscreen","mozfullscreenchange","MSFullscreenChange"];function Es(e,t={}){const{document:n=gu,autoExit:r=!1}=t,a=k(()=>{var _;return(_=Qe(e))!=null?_:n==null?void 0:n.querySelector("html")}),o=$(!1),s=k(()=>["requestFullscreen","webkitRequestFullscreen","webkitEnterFullscreen","webkitEnterFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"].find(_=>n&&_ in n||a.value&&_ in a.value)),l=k(()=>["exitFullscreen","webkitExitFullscreen","webkitExitFullScreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"].find(_=>n&&_ in n||a.value&&_ in a.value)),u=k(()=>["fullScreen","webkitIsFullScreen","webkitDisplayingFullscreen","mozFullScreen","msFullscreenElement"].find(_=>n&&_ in n||a.value&&_ in a.value)),c=["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"].find(_=>n&&_ in n),d=Cr(()=>a.value&&n&&s.value!==void 0&&l.value!==void 0&&u.value!==void 0),p=()=>c?(n==null?void 0:n[c])===a.value:!1,f=()=>{if(u.value){if(n&&n[u.value]!=null)return n[u.value];{const _=a.value;if((_==null?void 0:_[u.value])!=null)return!!_[u.value]}}return!1};async function h(){if(!(!d.value||!o.value)){if(l.value)if((n==null?void 0:n[l.value])!=null)await n[l.value]();else{const _=a.value;(_==null?void 0:_[l.value])!=null&&await _[l.value]()}o.value=!1}}async function g(){if(!d.value||o.value)return;f()&&await h();const _=a.value;s.value&&(_==null?void 0:_[s.value])!=null&&(await _[s.value](),o.value=!0)}async function A(){await(o.value?h():g())}const R=()=>{const _=f();(!_||_&&p())&&(o.value=_)};return Ce(n,Ji,R,!1),Ce(()=>Qe(a),Ji,R,!1),r&&nn(h),{isSupported:d,isFullscreen:o,enter:g,exit:h,toggle:A}}function Ya(e){return typeof Window<"u"&&e instanceof Window?e.document.documentElement:typeof Document<"u"&&e instanceof Document?e.documentElement:e}function y8(e,t,n={}){const{window:r=dt}=n;return yn(e,t,r==null?void 0:r.localStorage,n)}function yu(e){const t=window.getComputedStyle(e);if(t.overflowX==="scroll"||t.overflowY==="scroll"||t.overflowX==="auto"&&e.clientWidth<e.scrollWidth||t.overflowY==="auto"&&e.clientHeight<e.scrollHeight)return!0;{const n=e.parentNode;return!n||n.tagName==="BODY"?!1:yu(n)}}function c4(e){const t=e||window.event,n=t.target;return yu(n)?!1:t.touches.length>1?!0:(t.preventDefault&&t.preventDefault(),!1)}function ys(e,t=!1){const n=$(t);let r=null,a;re(j3(e),l=>{const u=Ya(We(l));if(u){const c=u;a=c.style.overflow,n.value&&(c.style.overflow="hidden")}},{immediate:!0});const o=()=>{const l=Ya(We(e));!l||n.value||(ko&&(r=Ce(l,"touchmove",u=>{c4(u)},{passive:!1})),l.style.overflow="hidden",n.value=!0)},s=()=>{const l=Ya(We(e));!l||!n.value||(ko&&(r==null||r()),l.style.overflow=a,n.value=!1)};return nn(s),k({get(){return n.value},set(l){l?o():s()}})}function bu(e,t,n={}){const{window:r=dt}=n;return yn(e,t,r==null?void 0:r.sessionStorage,n)}let u4=0;function d4(e,t={}){const n=$(!1),{document:r=gu,immediate:a=!0,manual:o=!1,id:s=`vueuse_styletag_${++u4}`}=t,l=$(e);let u=()=>{};const c=()=>{if(!r)return;const p=r.getElementById(s)||r.createElement("style");p.isConnected||(p.id=s,t.media&&(p.media=t.media),r.head.appendChild(p)),!n.value&&(u=re(l,f=>{p.textContent=f},{immediate:!0}),n.value=!0)},d=()=>{!r||!n.value||(u(),r.head.removeChild(r.getElementById(s)),n.value=!1)};return a&&!o&&mu(c),o||nn(d),{id:s,css:l,unload:d,load:c,isLoaded:Xt(n)}}function p4({window:e=dt}={}){if(!e)return{x:$(0),y:$(0)};const t=$(e.scrollX),n=$(e.scrollY);return Ce(e,"scroll",()=>{t.value=e.scrollX,n.value=e.scrollY},{capture:!1,passive:!0}),{x:t,y:n}}function f4(e={}){const{window:t=dt,initialWidth:n=Number.POSITIVE_INFINITY,initialHeight:r=Number.POSITIVE_INFINITY,listenOrientation:a=!0,includeScrollbar:o=!0}=e,s=$(n),l=$(r),u=()=>{t&&(o?(s.value=t.innerWidth,l.value=t.innerHeight):(s.value=t.document.documentElement.clientWidth,l.value=t.document.documentElement.clientHeight))};if(u(),mu(u),Ce("resize",u,{passive:!0}),a){const c=Eu("(orientation: portrait)");re(c,()=>u())}return{width:s,height:l}}const Au=({type:e="info",text:t="",vertical:n,color:r},{slots:a})=>{var o;return i("span",{class:["vp-badge",e,{diy:r}],style:{verticalAlign:n??!1,backgroundColor:r??!1}},((o=a.default)==null?void 0:o.call(a))||t)};Au.displayName="Badge";var v4=B({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(e){const t=k(()=>{const r=["font-icon icon"],a=`iconfont icon-${e.icon}`;return r.push(a),r}),n=k(()=>{const r={};return e.color&&(r.color=e.color),e.size&&(r["font-size"]=Number.isNaN(Number(e.size))?e.size:`${e.size}px`),rt(r).length?r:null});return()=>e.icon?i("span",{key:e.icon,class:t.value,style:n.value}):null}});const ku=()=>i(ae,{name:"back-to-top"},()=>[i("path",{d:"M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z"}),i("path",{d:"m795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z"})]);ku.displayName="BackToTopIcon";var h4=B({name:"BackToTop",props:{threshold:{type:Number,default:100},noProgress:Boolean},setup(e){const t=ye(),n=tn({"/":{backToTop:"返回顶部"}}),r=Le(),{height:a}=l4(r),{height:o}=f4(),{y:s}=p4(),l=k(()=>t.value.backToTop!==!1&&s.value>e.threshold),u=k(()=>s.value/(a.value-o.value));return se(()=>{r.value=document.body}),()=>i(qt,{name:"fade"},()=>l.value?i("button",{type:"button",class:"vp-back-to-top-button","aria-label":n.value.backToTop,"data-balloon-pos":"left",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})}},[e.noProgress?null:i("svg",{class:"vp-scroll-progress"},i("circle",{cx:"50%",cy:"50%",style:{"stroke-dasharray":`calc(${Math.PI*u.value*100}% - ${4*Math.PI}px) calc(${Math.PI*100}% - ${4*Math.PI}px)`}})),i(ku)]):null)}});const m4=at({enhance:({app:e})=>{Et("Badge")||e.component("Badge",Au),Et("FontIcon")||e.component("FontIcon",v4)},setup:()=>{d4(`  @import url("https://at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");
  `)},rootComponents:[()=>i(h4,{})]});function g4(e,t,n){var r,a,o;t===void 0&&(t=50),n===void 0&&(n={});var s=(r=n.isImmediate)!=null&&r,l=(a=n.callback)!=null&&a,u=n.maxWait,c=Date.now(),d=[];function p(){if(u!==void 0){var h=Date.now()-c;if(h+t>=u)return u-h}return t}var f=function(){var h=[].slice.call(arguments),g=this;return new Promise(function(A,R){var _=s&&o===void 0;if(o!==void 0&&clearTimeout(o),o=setTimeout(function(){if(o=void 0,c=Date.now(),!s){var O=e.apply(g,h);l&&l(O),d.forEach(function(D){return(0,D.resolve)(O)}),d=[]}},p()),_){var y=e.apply(g,h);return l&&l(y),A(y)}d.push({resolve:A,reject:R})})};return f.cancel=function(h){o!==void 0&&clearTimeout(o),d.forEach(function(g){return(0,g.reject)(h)}),d=[]},f}const _4=({headerLinkSelector:e,headerAnchorSelector:t,delay:n,offset:r=5})=>{const a=He(),s=g4(()=>{var A,R;const l=Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop);if(Math.abs(l-0)<r){Qi(a,"");return}const c=window.innerHeight+l,d=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),p=Math.abs(d-c)<r,f=Array.from(document.querySelectorAll(e)),g=Array.from(document.querySelectorAll(t)).filter(_=>f.some(y=>y.hash===_.hash));for(let _=0;_<g.length;_++){const y=g[_],O=g[_+1],D=l>=(((A=y.parentElement)==null?void 0:A.offsetTop)??0)-r,U=!O||l<(((R=O.parentElement)==null?void 0:R.offsetTop)??0)-r;if(!(D&&U))continue;const q=decodeURIComponent(a.currentRoute.value.hash),I=decodeURIComponent(y.hash);if(q===I)return;if(p){for(let K=_+1;K<g.length;K++)if(q===decodeURIComponent(g[K].hash))return}Qi(a,I);return}},n);se(()=>{window.addEventListener("scroll",s)}),ts(()=>{window.removeEventListener("scroll",s)})},Qi=async(e,t)=>{const{scrollBehavior:n}=e.options;e.options.scrollBehavior=void 0,await e.replace({query:e.currentRoute.value.query,hash:t}).finally(()=>e.options.scrollBehavior=n)},E4=".vp-sidebar-link, .toc-link",y4=".header-anchor",b4=200,A4=5,k4=at({setup(){_4({headerLinkSelector:E4,headerAnchorSelector:y4,delay:b4,offset:A4})}});let Su=()=>null;const Ru=Symbol(""),S4=e=>{Su=e},R4=()=>ie(Ru),w4=e=>{e.provide(Ru,Su)};var T4=B({name:"AutoCatalog",props:{base:{type:String,default:""},level:{type:Number,default:3},index:Boolean},setup(e){const t=R4(),n=tn({"/":{title:"目录",empty:"暂无目录"}}),r=de(),a=He(),o=Vc(),s=c=>{const d=c.I;return typeof d>"u"||d},l=()=>{const c=e.base||r.value.path.replace(/\/[^/]+$/,"/"),d=a.getRoutes(),p=[];return d.filter(({meta:f,path:h})=>{if(!hn(h,c)||h===c)return!1;if(c==="/"){const g=rt(o.value.locales).filter(A=>A!=="/");if(h==="/404.html"||g.some(A=>hn(h,A)))return!1}return(kn(h,".html")&&!kn(h,"/index.html")||kn(h,"/"))&&s(f)}).map(({path:f,meta:h})=>{const g=f.substring(c.length).split("/").length;return{title:h.t||"",icon:h.i,base:f.replace(/\/[^/]+\/?$/,"/"),order:h.O||null,level:kn(f,"/")?g-1:g,path:f}}).filter(({title:f,level:h})=>f&&h<=e.level).sort(({title:f,level:h,path:g,order:A},{title:R,level:_,path:y,order:O})=>h-_||(kn(g,"/index.html")?-1:kn(y,"/index.html")?1:A===null?O===null?f.localeCompare(R):O:O===null?A:A>0?O>0?A-O:-1:O<0?A-O:1)).forEach(f=>{var h;const{base:g,level:A}=f;switch(A){case 1:p.push(f);break;case 2:{const R=p.find(_=>_.path===g);R&&(R.children??(R.children=[])).push(f);break}default:{const R=p.find(_=>_.path===g.replace(/\/[^/]+\/$/,"/"));if(R){const _=(h=R.children)==null?void 0:h.find(y=>y.path===g);_&&(_.children??(_.children=[])).push(f)}}}}),p},u=k(()=>l());return()=>i("div",{class:"vp-catalog"},[i("h2",{class:"vp-catalog-main-title"},n.value.title),u.value.length?u.value.map(({children:c=[],icon:d,path:p,title:f},h)=>[i("h3",{id:f,class:["vp-catalog-child-title",{"has-children":c.length}]},[i("a",{href:`#${f}`,class:"header-anchor","aria-hidden":!0},"#"),i(Me,{class:"vp-catalog-title",to:p},()=>[e.index?`${h+1}.`:null,d&&t?i(t,{icon:d}):null,f||p])]),c.length?i("ul",{class:"vp-catalog-child-catalogs"},c.map(({children:g=[],icon:A,path:R,title:_},y)=>i("li",{class:"vp-child-catalog"},[i("div",{class:["vp-catalog-sub-title",{"has-children":g.length}]},[i("a",{href:`#${_}`,class:"header-anchor"},"#"),i(Me,{class:"vp-catalog-title",to:R},()=>[e.index?`${h+1}.${y+1}`:null,A&&t?i(t,{icon:A}):null,_||R])]),g.length?i("div",{class:"v-sub-catalogs"},g.map(({icon:O,path:D,title:U},x)=>i(Me,{class:"vp-sub-catalog",to:D},()=>[e.index?`${h+1}.${y+1}.${x+1}`:null,O&&t?i(t,{icon:O}):null,U||D]))):null]))):null]):i("p",{class:"vp-empty-catalog"},n.value.empty)])}}),I4=at({enhance:({app:e})=>{w4(e),Et("AutoCatalog",e)||e.component("AutoCatalog",T4)}});const L4=i("svg",{class:"external-link-icon",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15"},[i("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),i("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),wu=B({name:"ExternalLinkIcon",props:{locales:{type:Object,required:!1,default:()=>({})}},setup(e){const t=Rt(),n=k(()=>e.locales[t.value]??{openInNewWindow:"open in new window"});return()=>i("span",[L4,i("span",{class:"external-link-icon-sr-only"},n.value.openInNewWindow)])}}),P4={},O4=at({enhance({app:e}){e.component("ExternalLinkIcon",i(wu,{locales:P4}))}});/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */const he={settings:{minimum:.08,easing:"ease",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,barSelector:'[role="bar"]',parent:"body",template:'<div class="bar" role="bar"></div>'},status:null,set:e=>{const t=he.isStarted();e=Wa(e,he.settings.minimum,1),he.status=e===1?null:e;const n=he.render(!t),r=n.querySelector(he.settings.barSelector),a=he.settings.speed,o=he.settings.easing;return n.offsetWidth,C4(s=>{Zr(r,{transform:"translate3d("+el(e)+"%,0,0)",transition:"all "+a+"ms "+o}),e===1?(Zr(n,{transition:"none",opacity:"1"}),n.offsetWidth,setTimeout(function(){Zr(n,{transition:"all "+a+"ms linear",opacity:"0"}),setTimeout(function(){he.remove(),s()},a)},a)):setTimeout(()=>s(),a)}),he},isStarted:()=>typeof he.status=="number",start:()=>{he.status||he.set(0);const e=()=>{setTimeout(()=>{he.status&&(he.trickle(),e())},he.settings.trickleSpeed)};return he.settings.trickle&&e(),he},done:e=>!e&&!he.status?he:he.inc(.3+.5*Math.random()).set(1),inc:e=>{let t=he.status;return t?(typeof e!="number"&&(e=(1-t)*Wa(Math.random()*t,.1,.95)),t=Wa(t+e,0,.994),he.set(t)):he.start()},trickle:()=>he.inc(Math.random()*he.settings.trickleRate),render:e=>{if(he.isRendered())return document.getElementById("nprogress");tl(document.documentElement,"nprogress-busy");const t=document.createElement("div");t.id="nprogress",t.innerHTML=he.settings.template;const n=t.querySelector(he.settings.barSelector),r=e?"-100":el(he.status||0),a=document.querySelector(he.settings.parent);return Zr(n,{transition:"all 0 linear",transform:"translate3d("+r+"%,0,0)"}),a!==document.body&&tl(a,"nprogress-custom-parent"),a==null||a.appendChild(t),t},remove:()=>{nl(document.documentElement,"nprogress-busy"),nl(document.querySelector(he.settings.parent),"nprogress-custom-parent");const e=document.getElementById("nprogress");e&&D4(e)},isRendered:()=>!!document.getElementById("nprogress")},Wa=(e,t,n)=>e<t?t:e>n?n:e,el=e=>(-1+e)*100,C4=function(){const e=[];function t(){const n=e.shift();n&&n(t)}return function(n){e.push(n),e.length===1&&t()}}(),Zr=function(){const e=["Webkit","O","Moz","ms"],t={};function n(s){return s.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(l,u){return u.toUpperCase()})}function r(s){const l=document.body.style;if(s in l)return s;let u=e.length;const c=s.charAt(0).toUpperCase()+s.slice(1);let d;for(;u--;)if(d=e[u]+c,d in l)return d;return s}function a(s){return s=n(s),t[s]??(t[s]=r(s))}function o(s,l,u){l=a(l),s.style[l]=u}return function(s,l){for(const u in l){const c=l[u];c!==void 0&&Object.prototype.hasOwnProperty.call(l,u)&&o(s,u,c)}}}(),Tu=(e,t)=>(typeof e=="string"?e:bs(e)).indexOf(" "+t+" ")>=0,tl=(e,t)=>{const n=bs(e),r=n+t;Tu(n,t)||(e.className=r.substring(1))},nl=(e,t)=>{const n=bs(e);if(!Tu(e,t))return;const r=n.replace(" "+t+" "," ");e.className=r.substring(1,r.length-1)},bs=e=>(" "+(e.className||"")+" ").replace(/\s+/gi," "),D4=e=>{e&&e.parentNode&&e.parentNode.removeChild(e)};const x4=()=>{se(()=>{const e=He(),t=new Set;t.add(e.currentRoute.value.path),e.beforeEach(n=>{t.has(n.path)||he.start()}),e.afterEach(n=>{t.add(n.path),he.done()})})},B4=at({setup(){x4()}}),N4=JSON.parse('{"encrypt":{"config":{"/demo/encrypt.html":["$2a$10$f7EnUH0OElg2JDJrcK.hD.UlXTgeWROhvLUzvV8HfHPDL8hbdfWhG"]}},"darkmode":"toggle","fullscreen":true,"themeColor":true,"author":"离心","copyright":"Lixin © 2020-2023","breadcrumb":false,"repo":"lixvyang","docsDir":"src","footer":"本站博客未经授权禁止转载","displayFooter":true,"blog":{"avatar":"/assets/images/wechatAvatar.png","roundAvatar":true,"description":"长期持续分享学习内容","medias":{"BiliBili":"https://space.bilibili.com/520711550","Email":"lixin@tutamail.com","GitHub":"https://github.com/lixvyang","Twitter":"https://twitter.com/Lixv28332301","Wechat":"https://example.com"}},"locales":{"/":{"lang":"zh-CN","navbarLocales":{"langName":"简体中文","selectLangAriaLabel":"选择语言"},"metaLocales":{"author":"作者","date":"写作日期","origin":"原创","views":"访问量","category":"分类","tag":"标签","readingTime":"阅读时间","words":"字数","toc":"此页内容","prev":"上一页","next":"下一页","lastUpdated":"上次编辑于","contributors":"贡献者","editLink":"在 GitHub 上编辑此页","print":"打印"},"blogLocales":{"article":"文章","articleList":"文章列表","category":"分类","tag":"标签","timeline":"时间轴","timelineTitle":"昨日不在","all":"全部","intro":"个人介绍","star":"收藏"},"paginationLocales":{"prev":"上一页","next":"下一页","navigate":"跳转到","action":"前往","errorText":"请输入 1 到 $page 之前的页码！"},"outlookLocales":{"themeColor":"主题色","darkmode":"外观","fullscreen":"全屏"},"encryptLocales":{"iconLabel":"文章已加密","placeholder":"输入密码","remember":"记住密码","errorHint":"请输入正确的密码"},"routeLocales":{"skipToContent":"跳至主要內容","notFoundTitle":"页面不存在","notFoundMsg":["这里什么也没有","我们是怎么来到这儿的？","这 是 四 零 四 !","看起来你访问了一个失效的链接"],"back":"返回上一页","home":"带我回家","openInNewWindow":"Open in new window"},"sidebar":false,"navbar":["/",{"text":"技术","icon":"note","link":"/posts/program/golang/"},{"text":"思考","icon":"creative","link":"/posts/thinking/"},{"text":"归档","icon":"discover","link":"/archives"},{"text":"关于","icon":"info","link":"/intro/"}]}}}'),V4=$(N4),Iu=()=>V4,Lu=Symbol(""),M4=()=>{const e=ie(Lu);if(!e)throw new Error("useThemeLocaleData() is called without provider.");return e},$4=(e,t)=>{const{locales:n,...r}=e;return{...r,...n==null?void 0:n[t]}},F4=at({enhance({app:e}){const t=Iu(),n=e._context.provides[ls],r=k(()=>$4(t.value,n.value));e.provide(Lu,r),Object.defineProperties(e.config.globalProperties,{$theme:{get(){return t.value}},$themeLocale:{get(){return r.value}}})}});const H4={provider:"Giscus",lightTheme:"https://unpkg.com/vuepress-theme-hope@2.0.0-beta.236/templates/giscus/light.css",darkTheme:"https://unpkg.com/vuepress-theme-hope@2.0.0-beta.236/templates/giscus/dark.css",repo:"LixvYang/blog-comments",repoId:"R_kgDOJpRLYg",category:"Announcements",categoryId:"DIC_kwDOJpRLYs4CW1R-"};let G4=H4;const Pu=Symbol(""),Ou=()=>ie(Pu),z4=Ou,K4=e=>{e.provide(Pu,G4)},rl=["ar","de","gsw","en","es","fa","fr","id","it","ja","ko","nl","pl","pt","ro","ru","th","tr","uk","vi","zh-CN","zh-TW"];var U4=B({name:"GiscusComment",props:{identifier:{type:String,required:!0},darkmode:Boolean},setup(e){const t=z4(),n=!!(t.repo&&t.repoId&&t.category&&t.categoryId),{repo:r,repoId:a,category:o,categoryId:s}=t,l=$(!1),u=k(()=>{const d=is().value;if(rl.includes(d))return d;const p=d.split("-")[0];return rl.includes(p)?p:"en"}),c=k(()=>({repo:r,repoId:a,category:o,categoryId:s,lang:u.value,theme:e.darkmode?t.darkTheme||"dark":t.lightTheme||"light",mapping:t.mapping||"pathname",term:e.identifier,inputPosition:t.inputPosition||"top",reactionsEnabled:t.reactionsEnabled===!1?"0":"1",strict:t.strict===!1?"0":"1",loading:t.lazyLoading===!1?"eager":"lazy",emitMetadata:"0"}));return se(async()=>{await v(()=>import("./giscus-0b7adcf8.js"),[]),l.value=!0}),()=>n?i("div",{id:"comment",class:["giscus-wrapper",{"input-top":t.inputPosition!=="bottom"}]},l.value?i("giscus-widget",c.value):i(en)):null}}),j4=B({name:"CommentService",props:{darkmode:Boolean},setup(e){const t=Ou(),n=de(),r=ye(),a=t.comment!==!1,o=k(()=>r.value.comment||a&&r.value.comment!==!1);return()=>i(U4,{identifier:r.value.commentID||n.value.path,darkmode:e.darkmode,style:{display:o.value?"block":"none"}})}}),Y4=at({enhance:({app:e})=>{K4(e),e.component("CommentService",j4)}});const W4=800,q4=2e3,Z4={"/":{copy:"复制代码",copied:"已复制",hint:"复制成功"}},X4=!1,J4=['.theme-hope-content div[class*="language-"] pre'],al=!1,qa=new Map,Q4=()=>{const{copy:e}=Q3({legacy:!0}),t=tn(Z4),n=de(),r=vu(),a=l=>{if(!l.hasAttribute("copy-code-registered")){const u=document.createElement("button");u.type="button",u.classList.add("copy-code-button"),u.innerHTML='<div class="copy-icon" />',u.setAttribute("aria-label",t.value.copy),u.setAttribute("data-copied",t.value.copied),l.parentElement&&l.parentElement.insertBefore(u,l),l.setAttribute("copy-code-registered","")}},o=()=>Jt().then(()=>new Promise(l=>{setTimeout(()=>{J4.forEach(u=>{document.querySelectorAll(u).forEach(a)}),l()},W4)})),s=(l,u,c)=>{let{innerText:d=""}=u;/language-(shellscript|shell|bash|sh|zsh)/.test(l.classList.toString())&&(d=d.replace(/^ *(\$|>) /gm,"")),e(d).then(()=>{c.classList.add("copied"),clearTimeout(qa.get(c));const p=setTimeout(()=>{c.classList.remove("copied"),c.blur(),qa.delete(c)},q4);qa.set(c,p)})};se(()=>{(!r.value||al)&&o(),Ce("click",l=>{const u=l.target;if(u.matches('div[class*="language-"] > button.copy')){const c=u.parentElement,d=u.nextElementSibling;d&&s(c,d,u)}else if(u.matches('div[class*="language-"] div.copy-icon')){const c=u.parentElement,d=c.parentElement,p=c.nextElementSibling;p&&s(d,p,c)}}),re(()=>n.value.path,()=>{(!r.value||al)&&o()})})};var e6=at({setup:()=>{Q4()}});const t6=(e,t)=>t==="json"?JSON.parse(e):new Function(`let config,__chart_js_config__;
{
${e}
__chart_js_config__=config;
}
return __chart_js_config__;`)();var n6=B({name:"ChartJS",props:{config:{type:String,required:!0},id:{type:String,required:!0},title:{type:String,default:""},type:{type:String,default:"json"}},setup(e){const t=Le(),n=Le(),r=$(!0);return se(async()=>{const[{default:a}]=await Promise.all([v(()=>import("./auto-fe80bb03.js"),[]),new Promise(l=>setTimeout(l,800))]);a.defaults.maintainAspectRatio=!1;const o=t6(mn(e.config),e.type),s=n.value.getContext("2d");new a(s,o),r.value=!1}),()=>[e.title?i("div",{class:"chartjs-title"},decodeURIComponent(e.title)):null,r.value?i(en,{class:"chartjs-loading",height:192}):null,i("div",{ref:t,class:"chartjs-wrapper",id:e.id,style:{display:r.value?"none":"block"}},i("canvas",{ref:n,height:400}))]}});const Xr=yn("VUEPRESS_CODE_TAB_STORE",{});var r6=B({name:"CodeTabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const n=$(e.active),r=Le([]),a=()=>{e.tabId&&(Xr.value[e.tabId]=e.data[n.value].id)},o=(c=n.value)=>{n.value=c<r.value.length-1?c+1:0,r.value[n.value].focus()},s=(c=n.value)=>{n.value=c>0?c-1:r.value.length-1,r.value[n.value].focus()},l=(c,d)=>{c.key===" "||c.key==="Enter"?(c.preventDefault(),n.value=d):c.key==="ArrowRight"?(c.preventDefault(),o()):c.key==="ArrowLeft"&&(c.preventDefault(),s()),e.tabId&&(Xr.value[e.tabId]=e.data[n.value].id)},u=()=>{if(e.tabId){const c=e.data.findIndex(({id:d})=>Xr.value[e.tabId]===d);if(c!==-1)return c}return e.active};return se(()=>{n.value=u(),re(()=>Xr.value[e.tabId],(c,d)=>{if(e.tabId&&c!==d){const p=e.data.findIndex(({id:f})=>f===c);p!==-1&&(n.value=p)}})}),()=>e.data.length?i("div",{class:"vp-code-tabs"},[i("div",{class:"vp-code-tabs-nav",role:"tablist"},e.data.map(({id:c},d)=>{const p=d===n.value;return i("button",{type:"button",ref:f=>{f&&(r.value[d]=f)},class:["vp-code-tab-nav",{active:p}],role:"tab","aria-controls":`codetab-${e.id}-${d}`,"aria-selected":p,onClick:()=>{n.value=d,a()},onKeydown:f=>l(f,d)},t[`title${d}`]({value:c,isActive:p}))})),e.data.map(({id:c},d)=>{const p=d===n.value;return i("div",{class:["vp-code-tab",{active:p}],id:`codetab-${e.id}-${d}`,role:"tabpanel","aria-expanded":p},t[`tab${d}`]({value:c,isActive:p}))})]):null}});const Cu=({active:e=!1},{slots:t})=>{var n;return i("div",{class:["code-group-item",{active:e}],"aria-selected":e},(n=t.default)==null?void 0:n.call(t))};Cu.displayName="CodeGroupItem";const a6=B({name:"CodeGroup",slots:Object,setup(e,{slots:t}){const n=$(-1),r=Le([]),a=(l=n.value)=>{n.value=l<r.value.length-1?l+1:0,r.value[n.value].focus()},o=(l=n.value)=>{n.value=l>0?l-1:r.value.length-1,r.value[n.value].focus()},s=(l,u)=>{l.key===" "||l.key==="Enter"?(l.preventDefault(),n.value=u):l.key==="ArrowRight"?(l.preventDefault(),a(u)):l.key==="ArrowLeft"&&(l.preventDefault(),o(u))};return()=>{var l;const u=(((l=t.default)==null?void 0:l.call(t))||[]).filter(c=>c.type.name==="CodeGroupItem").map(c=>(c.props===null&&(c.props={}),c));return u.length===0?null:(n.value<0||n.value>u.length-1?(n.value=u.findIndex(c=>"active"in c.props),n.value===-1&&(n.value=0)):u.forEach((c,d)=>{c.props.active=d===n.value}),i("div",{class:"code-group"},[i("div",{class:"code-group-nav"},u.map((c,d)=>{const p=d===n.value;return i("button",{type:"button",ref:f=>{f&&(r.value[d]=f)},class:["code-group-nav-tab",{active:p}],"aria-pressed":p,"aria-expanded":p,onClick:()=>{n.value=d},onKeydown:f=>s(f,d)},c.props.title)})),u]))}}});const o6=()=>i(ae,{name:"back"},()=>i("path",{d:"M1014.749 449.156v125.688H260.626l345.64 345.64-89.239 89.237L19.307 512l497.72-497.721 89.238 89.238-345.64 345.64h754.124z"})),s6=()=>i(ae,{name:"home"},()=>i("path",{d:"M780.106 420.978L506.994 147.866 233.882 420.978h.045v455.11H780.06v-455.11h.046zm90.977 90.976V876.09a91.022 91.022 0 01-91.023 91.022H233.927a91.022 91.022 0 01-91.022-91.022V511.954l-67.22 67.175-64.307-64.307 431.309-431.31c35.498-35.498 93.115-35.498 128.614 0l431.309 431.31-64.307 64.307L871.083 512z"})),i6='<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>',l6='<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>',c6='<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333z"/><path d="M708.267 465.067 473.6 330.667c-8.533-4.267-17.067-6.4-25.6-6.4-29.867 0-53.333 23.466-53.333 53.333v268.8c0 8.533 2.133 19.2 6.4 25.6 10.666 17.067 27.733 27.733 46.933 27.733 8.533 0 17.067-2.133 25.6-6.4l234.667-134.4c8.533-4.266 14.933-10.666 19.2-19.2 6.4-12.8 8.533-27.733 4.266-40.533-2.133-14.933-10.666-25.6-23.466-34.133zM458.667 627.2V396.8L661.333 512 458.667 627.2z"/></svg>';const Za={useBabel:!1,jsLib:[],cssLib:[],codepenLayout:"left",codepenEditors:"101",babel:"https://unpkg.com/@babel/standalone/babel.min.js",vue:"https://unpkg.com/vue/dist/vue.global.prod.js",react:"https://unpkg.com/react/umd/react.production.min.js",reactDOM:"https://unpkg.com/react-dom/umd/react-dom.production.min.js"},ol={html:{types:["html","slim","haml","md","markdown","vue"],map:{html:"none",vue:"none",md:"markdown"}},js:{types:["js","javascript","coffee","coffeescript","ts","typescript","ls","livescript"],map:{js:"none",javascript:"none",coffee:"coffeescript",ls:"livescript",ts:"typescript"}},css:{types:["css","less","sass","scss","stylus","styl"],map:{css:"none",styl:"stylus"}}},u6=(e,t,n)=>{const r=document.createElement(e);return Lr(t)&&rt(t).forEach(a=>{if(a.indexOf("data"))r[a]=t[a];else{const o=a.replace("data","");r.dataset[o]=t[a]}}),n&&n.forEach(a=>{r.appendChild(a)}),r},As=e=>({...Za,...e,jsLib:Array.from(new Set([...Za.jsLib||[],...e.jsLib||[]])),cssLib:Array.from(new Set([...Za.cssLib||[],...e.cssLib||[]]))}),Nn=(e,t)=>{if(e[t]!==void 0)return e[t];const n=new Promise(r=>{var a;const o=document.createElement("script");o.src=t,(a=document.querySelector("body"))==null||a.appendChild(o),o.onload=()=>{r()}});return e[t]=n,n},d6=(e,t)=>{if(t.css&&Array.from(e.childNodes).every(n=>n.nodeName!=="STYLE")){const n=u6("style",{innerHTML:t.css});e.appendChild(n)}},p6=(e,t,n)=>{const r=n.getScript();if(r&&Array.from(t.childNodes).every(a=>a.nodeName!=="SCRIPT")){const a=document.createElement("script");a.appendChild(document.createTextNode(`{const document=window.document.querySelector('#${e} .vp-code-demo-display').shadowRoot;
${r}}`)),t.appendChild(a)}},f6=e=>{const t=rt(e),n={html:[],js:[],css:[],isLegal:!1};return["html","js","css"].forEach(r=>{const a=t.filter(o=>ol[r].types.includes(o));if(a.length){const o=a[0];n[r]=[e[o].replace(/^\n|\n$/g,""),ol[r].map[o]||o]}}),n.isLegal=(!n.html.length||n.html[1]==="none")&&(!n.js.length||n.js[1]==="none")&&(!n.css.length||n.css[1]==="none"),n},Du=e=>e.replace(/<br \/>/g,"<br>").replace(/<((\S+)[^<]*?)\s+\/>/g,"<$1></$2>"),xu=e=>`<div id="app">
${Du(e)}
</div>`,v6=e=>`${e.replace("export default ","const $reactApp = ").replace(/App\.__style__(\s*)=(\s*)`([\s\S]*)?`/,"")};
ReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`,h6=e=>e.replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u,"Vue.createApp({$1}).mount('#app')").replace(/export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,"Vue.createApp({$1}).mount('#app')").trim(),Bu=e=>`(function(exports){var module={};module.exports=exports;${e};return module.exports.__esModule?module.exports.default:module.exports;})({})`,m6=(e,t)=>{const n=As(t),r=e.js[0]||"";return{...n,html:Du(e.html[0]||""),js:r,css:e.css[0]||"",isLegal:e.isLegal,getScript:()=>{var a;return n.useBabel?((a=window.Babel.transform(r,{presets:["es2015"]}))==null?void 0:a.code)||"":r}}},g6=/<template>([\s\S]+)<\/template>/u,_6=/<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u,E6=/<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u,y6=(e,t)=>{const n=As(t),r=e.html[0]||"",a=g6.exec(r),o=_6.exec(r),s=E6.exec(r),l=a?a[1].replace(/^\n|\n$/g,""):"",[u="",c=""]=o?[o[4].replace(/^\n|\n$/g,""),o[3]]:[],[d="",p=""]=s?[s[4].replace(/^\n|\n$/g,""),s[3]]:[],f=c===""&&(p===""||p==="css");return{...n,html:xu(l),js:h6(u),css:d,isLegal:f,jsLib:[n.vue,...n.jsLib],getScript:()=>{var h,g;const A=t.useBabel?((g=(h=window.Babel)==null?void 0:h.transform(u,{presets:["es2015"]}))==null?void 0:g.code)||"":u.replace(/export\s+default/u,"return");return`const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${Bu(A)};appOptions.template=\`${l.replace("`",'\\`"')}\`;window.Vue.createApp(appOptions).mount(app);`}}},b6=(e,t)=>{const n=As(t);return{...n,html:xu(""),js:v6(e.js[0]||""),css:e.css[0]||(e.js[0]?e.js[0].replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/,"$1").trim():""),isLegal:e.isLegal,jsLib:[n.react,n.reactDOM,...n.jsLib],jsx:!0,getScript:()=>{var r,a;const o=((a=(r=window.Babel)==null?void 0:r.transform(e.js[0]||"",{presets:["es2015","react"]}))==null?void 0:a.code)||"";return`window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${Bu(o)}))`}}},Vn={},A6=e=>Promise.all([Nn(Vn,e.babel),Nn(Vn,e.react),Nn(Vn,e.reactDOM)]),k6=e=>{const t=[Nn(Vn,e.vue)];return e.useBabel&&t.push(Nn(Vn,e.babel)),Promise.all(t)},S6=e=>e.useBabel?Nn(Vn,e.babel):Promise.resolve();var R6=B({name:"CodeDemo",props:{id:{type:String,required:!0},type:{type:String,default:"normal"},title:{type:String,default:""},config:{type:String,default:""},code:{type:String,required:!0}},slots:Object,setup(e,{slots:t}){const[n,r]=So(!1),a=Le(),o=Le(),s=$("0"),l=$(!1),u=k(()=>JSON.parse(e.config?mn(e.config):"{}")),c=k(()=>{const g=JSON.parse(mn(e.code));return f6(g)}),d=k(()=>e.type==="react"?b6(c.value,u.value):e.type==="vue"?y6(c.value,u.value):m6(c.value,u.value)),p=k(()=>d.value.isLegal),f=(g=!1)=>{const A=a.value.attachShadow({mode:"open"}),R=document.createElement("div");R.classList.add("code-demo-app"),A.appendChild(R),p.value?(g&&(R.innerHTML=d.value.html),d6(A,d.value),p6(e.id,A,d.value),s.value="0"):s.value="auto",l.value=!0},h=()=>{switch(e.type){case"react":return A6(d.value).then(()=>f());case"vue":return k6(d.value).then(()=>f());default:return S6(d.value).then(()=>f(!0))}};return se(()=>{setTimeout(()=>{h()},800)}),()=>{var g;return i("div",{class:"vp-code-demo",id:e.id},[i("div",{class:"vp-code-demo-header"},[d.value.isLegal?i("button",{type:"button",title:"toggle","aria-hidden":!0,class:["vp-code-demo-toggle-button",n.value?"down":"end"],onClick:()=>{s.value=n.value?"0":`${o.value.clientHeight+13.8}px`,r()}}):null,e.title?i("span",{class:"vp-code-demo-title"},decodeURIComponent(e.title)):null,d.value.isLegal&&d.value.jsfiddle!==!1?i("form",{class:"code-demo-jsfiddle",target:"_blank",action:"https://jsfiddle.net/api/post/library/pure/",method:"post"},[i("input",{type:"hidden",name:"html",value:d.value.html}),i("input",{type:"hidden",name:"js",value:d.value.js}),i("input",{type:"hidden",name:"css",value:d.value.css}),i("input",{type:"hidden",name:"wrap",value:"1"}),i("input",{type:"hidden",name:"panel_js",value:"3"}),i("input",{type:"hidden",name:"resources",value:[...d.value.cssLib,...d.value.jsLib].join(",")}),i("button",{type:"submit",class:"jsfiddle-button",innerHTML:l6,"aria-label":"JSFiddle","data-balloon-pos":"up"})]):null,!d.value.isLegal||d.value.codepen!==!1?i("form",{class:"code-demo-codepen",target:"_blank",action:"https://codepen.io/pen/define",method:"post"},[i("input",{type:"hidden",name:"data",value:JSON.stringify({html:d.value.html,js:d.value.js,css:d.value.css,js_external:d.value.jsLib.join(";"),css_external:d.value.cssLib.join(";"),layout:d.value.codepenLayout,html_pre_processor:c.value?c.value.html[1]:"none",js_pre_processor:c.value?c.value.js[1]:d.value.jsx?"babel":"none",css_pre_processor:c.value?c.value.css[1]:"none",editors:d.value.codepenEditors})}),i("button",{type:"submit",innerHTML:i6,class:"codepen-button","aria-label":"Codepen","data-balloon-pos":"up"})]):null]),l.value?null:i(en,{class:"vp-code-demo-loading"}),i("div",{ref:a,class:"vp-code-demo-display",style:{display:p.value&&l.value?"block":"none"}}),i("div",{class:"vp-code-demo-code-wrapper",style:{height:s.value}},i("div",{ref:o,class:"vp-code-demo-codes"},(g=t.default)==null?void 0:g.call(t)))])}}});const w6=(async()=>{}).constructor,T6=(e,t,n)=>t==="js"?w6("myChart",`let width,height,option,__echarts_config__;
{
${e}
__echarts_config__={width,height,option};
}
return __echarts_config__;
`)(n):Promise.resolve({option:JSON.parse(e)});var I6=B({name:"ECharts",props:{config:{type:String,required:!0},id:{type:String,required:!0},title:{type:String,default:""},type:{type:String,default:"json"}},setup(e){const t=$(!0),n=Le();let r;return Ce("resize",_s(()=>r==null?void 0:r.resize(),100)),se(()=>{Promise.all([v(()=>import("./index-2bf332f6.js"),[]),new Promise(a=>setTimeout(a,800))]).then(async([a])=>{r=a.init(n.value);const{option:o,...s}=await T6(mn(e.config),e.type,r);r.resize(s),r.setOption(o),t.value=!1})}),Qt(()=>{r==null||r.dispose()}),()=>[e.title?i("div",{class:"echarts-title"},decodeURIComponent(e.title)):null,i("div",{class:"echarts-wrapper"},[i("div",{ref:n,class:"echarts-container",id:e.id}),t.value?i(en,{class:"echarts-loading",height:360}):null])]}});var ks={x:0,y:0,"line-width":2,"line-length":40,"text-margin":8,"font-size":14,"font-color":"#8DA1AC","line-color":"#8DA1AC","element-color":"black",fill:"white","yes-text":"Yes","no-text":"No","arrow-end":"block",scale:1},L6={...ks,symbols:{start:{class:"start-element","font-color":"#fff",fill:"#595959","line-width":"0px"},end:{class:"end-element","font-color":"#fff",fill:"#595959","line-width":"0px"},operation:{class:"operation-element","font-color":"#fff",fill:"#1890ff","line-width":"0px"},inputoutput:{class:"inputoutput-element","font-color":"#fff",fill:"#1890ff","line-width":"0px"},subroutine:{class:"subroutine-element","font-color":"#fff",fill:"#FF485E","element-color":"#fff","line-color":"red"},condition:{class:"condition-element","font-color":"#fff",fill:"#FF485E","line-width":"0px"},parallel:{class:"parallel-element","font-color":"#fff",fill:"#1890ff","line-width":"0px"}}},P6={...ks,"line-width":1,symbols:{start:{class:"start-element",fill:"#ccc","line-color":"#5c6ac4","font-color":"#000"},end:{class:"end-element",fill:"#ccc","line-color":"#5c6ac4","font-color":"#000"},operation:{class:"operation-element",fill:"#f1f1f1","line-color":"#5c6ac4","font-color":"#000"},inputoutput:{class:"inputoutput-element",fill:"#f1f1f1","line-color":"#5c6ac4","font-color":"#000"},subroutine:{class:"subroutine-element",fill:"#f1f1f1","line-color":"#5c6ac4","font-color":"#000"},condition:{class:"condition-element",fill:"#f1f1f1","line-color":"#5c6ac4","font-color":"#000"},parallel:{class:"parallel-element",fill:"#f1f1f1","line-color":"#5c6ac4","font-color":"#000"}}},O6={...ks,symbols:{start:{class:"start-element","font-color":"#fff",fill:"#2F495F","line-width":"0px"},end:{class:"end-element","font-color":"#fff",fill:"#2F495F","line-width":"0px"},operation:{class:"operation-element","font-color":"#fff",fill:"#00BC7D","line-width":"0px"},inputoutput:{class:"inputoutput-element","font-color":"#fff",fill:"#EB4D5D","line-width":"0px"},subroutine:{class:"subroutine-element","font-color":"#fff",fill:"#937AC4","element-color":"#fff","line-color":"red"},condition:{class:"condition-element","font-color":"#fff",fill:"#FFB500","line-width":"0px"},parallel:{class:"parallel-element","font-color":"#fff",fill:"#2F495F","line-width":"0px"}}};const sl={ant:L6,vue:O6,pie:P6};var C6=B({name:"FlowChart",props:{code:{type:String,required:!0},id:{type:String,required:!0},preset:{type:String,default:"vue"}},setup(e){let t=null;const n=Le(),r=$(!0),a=$(1),o=k(()=>sl[e.preset]||(console.warn(`[md-enhance:flowchart] Unknown preset: ${e.preset}`),sl.vue)),s=l=>l<419?.8:l>1280?1:.9;return se(()=>{Promise.all([v(()=>import("./flowchart-c441f34d.js"),[]),new Promise(l=>setTimeout(l,800))]).then(([{parse:l}])=>{t=l(mn(e.code)),a.value=s(window.innerWidth),r.value=!1,t.draw(e.id,{...o.value,scale:a.value})}),Ce("resize",_s(()=>{if(t){const l=s(window.innerWidth);a.value!==l&&(a.value=l,t.draw(e.id,{...o.value,scale:l}))}},100))}),()=>[r.value?i(en,{class:"flowchart-loading",height:192}):null,i("div",{ref:n,class:["flowchart-wrapper",e.preset],id:e.id,style:{display:r.value?"none":"block"}})]}});let D6={};const Nu=Symbol(""),x6=()=>ie(Nu),B6=e=>{e.provide(Nu,D6)},Sn={useMaxWidth:!1},N6=e=>({dark:e,background:e?"#1e1e1e":"#fff",primaryColor:e?"#389d70":"#4abf8a",primaryBorderColor:e?"#389d70":"#4abf8a",primaryTextColor:"#fff",secondaryColor:"#ffb500",secondaryBorderColor:e?"#fff":"#000",secondaryTextColor:e?"#ddd":"#333",tertiaryColor:e?"#282828":"#efeef4",tertiaryBorderColor:e?"#bbb":"#242424",tertiaryTextColor:e?"#ddd":"#333",noteBkgColor:e?"#f6d365":"#fff5ad",noteTextColor:"#242424",noteBorderColor:e?"#f6d365":"#333",lineColor:e?"#d3d3d3":"#333",textColor:e?"#fff":"#242424",mainBkg:e?"#389d70":"#4abf8a",errorBkgColor:"#eb4d5d",errorTextColor:"#fff",nodeBorder:e?"#389d70":"#4abf8a",nodeTextColor:e?"#fff":"#242424",signalTextColor:e?"#9e9e9e":"#242424",classText:"#fff",labelColor:"#fff",fillType0:e?"#cf1322":"#f1636e",fillType1:"#f39c12",fillType2:"#2ecc71",fillType3:"#fa541c",fillType4:"#25a55b",fillType5:"#13c2c2",fillType6:"#096dd9",fillType7:"#aa6fe9"});var V6=B({name:"Mermaid",props:{id:{type:String,required:!0},code:{type:String,required:!0}},setup(e){const{themeVariables:t,...n}=x6(),r=Le(),a=k(()=>mn(e.code)),o=$(""),s=$(!1),l=async()=>{const[{default:d}]=await Promise.all([v(()=>import("./mermaid.core-28c82253.js").then(p=>p.b7),["assets/mermaid.core-28c82253.js","assets/commonjsHelpers-de833af9.js"]),new Promise(p=>setTimeout(p,800))]);d.initialize({theme:"base",themeVariables:{...N6(s.value),...O3(t)?t(s.value):t},flowchart:Sn,sequence:Sn,journey:Sn,gantt:Sn,er:Sn,pie:Sn,...n,startOnLoad:!1}),o.value=(await d.render(e.id,a.value)).svg},u=()=>{const{body:d}=document,p=document.createElement("div");p.classList.add("mermaid-preview"),p.innerHTML=o.value,d.appendChild(p),p.addEventListener("click",()=>{d.removeChild(p)})},c=()=>{const d=`data:image/svg+xml;charset=utf8,${o.value.replace(/<br>/g,"<br />").replace(/%/g,"%25").replace(/"/g,"%22").replace(/'/g,"%27").replace(/&/g,"%26").replace(/#/g,"%23").replace(/{/g,"%7B").replace(/}/g,"%7D").replace(/</g,"%3C").replace(/>/g,"%3E")}`,p=document.createElement("a");p.setAttribute("href",d),p.setAttribute("download",`${e.id}.svg`),p.click()};return se(()=>{const d=document.documentElement,p=()=>d.classList.contains("dark")||d.getAttribute("data-theme")==="dark";s.value=p(),l(),s4(d,()=>{s.value=p()},{attributeFilter:["class","data-theme"],attributes:!0}),re(s,()=>l())}),()=>[i("div",{class:"mermaid-actions"},[i("button",{class:"preview-button",onClick:()=>u(),title:"preview",innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1316 1024" fill="currentColor"><path d="M658.286 0C415.89 0 0 297.106 0 512c0 214.82 415.89 512 658.286 512 242.322 0 658.285-294.839 658.285-512S900.608 0 658.286 0zm0 877.714c-161.573 0-512-221.769-512-365.714 0-144.018 350.427-365.714 512-365.714 161.572 0 512 217.16 512 365.714s-350.428 365.714-512 365.714z"/><path d="M658.286 292.571a219.429 219.429 0 1 0 0 438.858 219.429 219.429 0 0 0 0-438.858zm0 292.572a73.143 73.143 0 1 1 0-146.286 73.143 73.143 0 0 1 0 146.286z"/></svg>'}),i("button",{class:"download-button",onClick:()=>c(),title:"download",innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M828.976 894.125H190.189c-70.55 0-127.754-57.185-127.754-127.753V606.674c0-17.634 14.31-31.933 31.933-31.933h63.889c17.634 0 31.932 14.299 31.932 31.933v95.822c0 35.282 28.596 63.877 63.877 63.877h511.033c35.281 0 63.877-28.595 63.877-63.877v-95.822c0-17.634 14.298-31.933 31.943-31.933h63.878c17.635 0 31.933 14.299 31.933 31.933v159.7c0 70.566-57.191 127.751-127.754 127.751zM249.939 267.51c12.921-12.92 33.885-12.92 46.807 0l148.97 148.972V94.893c0-17.634 14.302-31.947 31.934-31.947h63.876c17.638 0 31.946 14.313 31.946 31.947v321.589l148.97-148.972c12.922-12.92 33.876-12.92 46.797 0l46.814 46.818c12.922 12.922 12.922 33.874 0 46.807L552.261 624.93c-1.14 1.138-21.664 13.684-42.315 13.693-20.877.01-41.88-12.542-43.021-13.693L203.122 361.135c-12.923-12.934-12.923-33.885 0-46.807l46.817-46.818z"/></svg>'})]),i("div",{ref:r,class:"mermaid-wrapper"},o.value?i("div",{class:"mermaid-content",innerHTML:o.value}):i(en,{class:"mermaid-loading",height:96}))]}});let M6={};const Vu=Symbol(""),$6=()=>ie(Vu),F6=e=>{e.provide(Vu,M6)},H6={showCompileOutput:!1,clearConsole:!1,ssr:!1};let G6=H6;const Mu=Symbol(""),b8=()=>ie(Mu),z6=e=>{e.provide(Mu,G6)},K6=()=>v(()=>import("./highlight.esm-75b11b9d.js"),[]),U6=()=>v(()=>import("./markdown.esm-abe06b83.js"),[]),j6=()=>v(()=>import("./math.esm-70a288c8.js"),[]),Y6=()=>v(()=>import("./notes.esm-a106bb2c.js"),[]),W6=()=>v(()=>import("./reveal.esm-ec5549c1.js"),[]),q6=()=>v(()=>import("./search.esm-7e6792e2.js"),[]),Z6=()=>v(()=>import("./zoom.esm-b83b91d0.js"),[]);const X6=()=>[W6(),U6(),K6(),j6(),q6(),Y6(),Z6()];var J6=B({name:"Presentation",props:{id:{type:String,required:!0},code:{type:String,required:!0},theme:{type:String,default:"auto"}},setup(e){const t=$6(),n=ye(),r=$(""),a=$(!0),o=Le();let s=null;const l=async u=>{const c=[new Promise(h=>setTimeout(h,800)),...X6()],[,d,...p]=await Promise.all(c),f=new d.default(u,{backgroundTransition:"slide",hash:n.value.layout==="Slide",mouseWheel:n.value.layout==="Slide",transition:"slide",slideNumber:!0,...t,...n.value.reveal||{},embedded:n.value.layout!=="Slide",plugins:[...p.map(({default:h})=>h),...t.plugins??[]]});return await f.initialize(),f};return se(async()=>{const u=o.value;u&&(r.value=mn(e.code),u.setAttribute("id",e.id),u.setAttribute("data-theme",e.theme),s=await l(u),a.value=!1)}),Qt(()=>{s==null||s.destroy()}),()=>i("div",{class:"vp-reveal"},[i("div",{ref:o,class:["reveal","reveal-viewport"]},i("div",{class:"slides",innerHTML:`<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${r.value}<\/script></section>`})),a.value?i(en,{class:"reveal-loading",height:400}):null])}});var Q6=B({name:"Playground",props:{title:{type:String,default:""},link:{type:String,required:!0}},setup(e){return()=>[i("div",{class:"vp-playground"},[i("div",{class:"vp-playground-header"},[e.title?i("div",{class:"vp-playground-title"},decodeURIComponent(e.title)):null,i("div",{class:"vp-playground-actions"},[i("a",{class:"vp-playground-action",href:decodeURIComponent(e.link),target:"_blank",innerHTML:c6})])]),i("div",{class:"vp-playground-container"},i("iframe",{src:decodeURIComponent(e.link)}))])]}});const Xa=yn("VUEPRESS_TAB_STORE",{});var ef=B({name:"Tabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const n=$(e.active),r=Le([]),a=()=>{e.tabId&&(Xa.value[e.tabId]=e.data[n.value].id)},o=(c=n.value)=>{n.value=c<r.value.length-1?c+1:0,r.value[n.value].focus()},s=(c=n.value)=>{n.value=c>0?c-1:r.value.length-1,r.value[n.value].focus()},l=(c,d)=>{c.key===" "||c.key==="Enter"?(c.preventDefault(),n.value=d):c.key==="ArrowRight"?(c.preventDefault(),o()):c.key==="ArrowLeft"&&(c.preventDefault(),s()),a()},u=()=>{if(e.tabId){const c=e.data.findIndex(({id:d})=>Xa.value[e.tabId]===d);if(c!==-1)return c}return e.active};return se(()=>{n.value=u(),re(()=>Xa.value[e.tabId],(c,d)=>{if(e.tabId&&c!==d){const p=e.data.findIndex(({id:f})=>f===c);p!==-1&&(n.value=p)}})}),()=>e.data.length?i("div",{class:"vp-tabs"},[i("div",{class:"vp-tabs-nav",role:"tablist"},e.data.map(({id:c},d)=>{const p=d===n.value;return i("button",{type:"button",ref:f=>{f&&(r.value[d]=f)},class:["vp-tab-nav",{active:p}],role:"tab","aria-controls":`tab-${e.id}-${d}`,"aria-selected":p,onClick:()=>{n.value=d,a()},onKeydown:f=>l(f,d)},t[`title${d}`]({value:c,isActive:p}))})),e.data.map(({id:c},d)=>{const p=d===n.value;return i("div",{class:["vp-tab",{active:p}],id:`tab-${e.id}-${d}`,role:"tabpanel","aria-expanded":p},t[`tab${d}`]({value:c,isActive:p}))})]):null}});const tf=at({enhance:({app:e})=>{e.component("ChartJS",n6),e.component("CodeTabs",r6),Et("CodeGroup",e)||e.component("CodeGroup",a6),Et("CodeGroupItem",e)||e.component("CodeGroupItem",Cu),e.component("CodeDemo",R6),e.component("ECharts",I6),e.component("FlowChart",C6),B6(e),e.component("Mermaid",V6),F6(e),e.component("Presentation",J6),e.component("Playground",Q6),e.component("Tabs",ef),z6(e),e.component("VuePlayground",b(()=>v(()=>import("./VuePlayground-cb5e6731.js"),[])))},setup:()=>{}});let nf={};const $u=Symbol(""),rf=()=>ie($u),af=e=>{e.provide($u,nf)};const of=".theme-hope-content :not(a) > img:not([no-view])",sf={"/":{closeTitle:"关闭",downloadTitle:"下载图片",fullscreenTitle:"切换全屏",zoomTitle:"缩放",arrowPrevTitle:"上一个 (左箭头)",arrowNextTitle:"下一个 (右箭头)"}},lf=800,cf='<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>',uf=e=>pe(e)?Array.from(document.querySelectorAll(e)):e.map(t=>Array.from(document.querySelectorAll(t))).flat(),Fu=e=>new Promise((t,n)=>{e.complete?t({type:"image",element:e,src:e.src,width:e.naturalWidth,height:e.naturalHeight,alt:e.alt,msrc:e.src}):(e.onload=()=>t(Fu(e)),e.onerror=r=>n(r))}),df=()=>{const{isSupported:e,toggle:t}=Es(),n=rf(),r=tn(sf),a=de();let o;const s=u=>{u.on("uiRegister",()=>{e&&u.ui.registerElement({name:"fullscreen",order:7,isButton:!0,html:'<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',onClick:()=>{t()}}),u.ui.registerElement({name:"download",order:8,isButton:!0,tagName:"a",html:{isCustomSVG:!0,inner:'<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',outlineID:"pswp__icn-download"},onInit:(c,d)=>{c.setAttribute("download",""),c.setAttribute("target","_blank"),c.setAttribute("rel","noopener"),d.on("change",()=>{c.setAttribute("href",d.currSlide.data.src)})}}),u.ui.registerElement({name:"bulletsIndicator",className:"photo-swipe-bullets-indicator",appendTo:"wrapper",onInit:(c,d)=>{const p=[];let f=-1;for(let h=0;h<d.getNumItems();h++){const g=document.createElement("div");g.className="photo-swipe-bullet",g.onclick=A=>{d.goTo(p.indexOf(A.target))},p.push(g),c.appendChild(g)}d.on("change",()=>{f>=0&&p[f].classList.remove("active"),p[d.currIndex].classList.add("active"),f=d.currIndex})}})})},l=()=>Promise.all([v(()=>import("./photoswipe.esm-4e1eea98.js"),[]),Jt().then(()=>new Promise(u=>setTimeout(u,lf)).then(()=>uf(of)))]).then(([{default:u},c])=>{const d=c.map(p=>({html:cf,element:p,msrc:p.src}));c.forEach((p,f)=>{const h=()=>{o=new u({preloaderDelay:0,showHideAnimationType:"zoom",...r.value,...n,dataSource:d,index:f,closeOnVerticalDrag:!0,wheelToZoom:!1}),s(o),o.addFilter("thumbEl",()=>p),o.addFilter("placeholderSrc",()=>p.src),o.init()};p.style.cursor="zoom-in",p.addEventListener("click",()=>{h()}),p.addEventListener("keypress",({key:g})=>{g==="Enter"&&h()})}),c.forEach((p,f)=>{Fu(p).then(h=>{d.splice(f,1,h),o==null||o.refreshSlideContent(f)})})});se(()=>{Ce("wheel",()=>{o==null||o.close()}),l(),re(()=>a.value.path,()=>l())})};var pf=at({enhance:({app:e})=>{af(e)},setup:()=>{df()}});function ff(e){return{all:e=e||new Map,on:function(t,n){var r=e.get(t);r?r.push(n):e.set(t,[n])},off:function(t,n){var r=e.get(t);r&&(n?r.splice(r.indexOf(n)>>>0,1):e.set(t,[]))},emit:function(t,n){var r=e.get(t);r&&r.slice().map(function(a){a(n)}),(r=e.get("*"))&&r.slice().map(function(a){a(t,n)})}}}const vf=Symbol(""),hf=async(e,t={},n=!0)=>{const{register:r}=await v(()=>import("./index-e32a7948.js"),[]);r(e,{ready(a){var o;n&&console.info("[Service Worker]: active"),(o=t.ready)==null||o.call(t,a)},registered(a){var o;n&&console.log("[Service Worker]: registered"),(o=t.registered)==null||o.call(t,a)},cached(a){var o;n&&console.log("[Service Worker]: cached"),(o=t.cached)==null||o.call(t,a)},async updatefound(a){var o;await navigator.serviceWorker.getRegistration()&&(n&&console.log("[Service Worker]: update found"),(o=t.updatefound)==null||o.call(t,a))},updated(a){var o;n&&console.log("[Service Worker]: updated"),(o=t.updated)==null||o.call(t,a)},offline(){var a;n&&console.log("[Service Worker]: offline"),(a=t.offline)==null||a.call(t)},error(a){var o;n&&console.error("[Service Worker]: ",a),(o=t.error)==null||o.call(t,a)}})},mf=async e=>hf(Ie("service-worker.js"),{ready(t){e.emit("ready",t)},registered(t){e.emit("registered",t)},cached(t){e.emit("cached",t)},updatefound(t){e.emit("updatefound",t)},updated(t){const n="service-worker-version",r=Number(localStorage.getItem(n)||0);localStorage.setItem(n,(r+1).toString()),localStorage.removeItem("manifest"),e.emit("updated",t)},offline(){e.emit("offline")},error(t){e.emit("error",t)}}),gf=()=>{const e=ff();tt(vf,e),se(async()=>{var t;let n=!1;(t=navigator.serviceWorker)!=null&&t.controller&&navigator.serviceWorker.addEventListener("controllerchange",()=>{n||(n=!0,window.location.reload())}),await mf(e)})},_f=at({setup:()=>{gf()},rootComponents:[]}),Hu=()=>{const e=de();return k(()=>e.value.readingTime??null)},Ro=typeof{"/":{word:"约 $word 字",less1Minute:"小于 1 分钟",time:"大约 $time 分钟"}}>"u"?null:{"/":{word:"约 $word 字",less1Minute:"小于 1 分钟",time:"大约 $time 分钟"}},Gu=(e,t)=>{const{minutes:n,words:r}=e,{less1Minute:a,word:o,time:s}=t;return{time:n<1?a:s.replace("$time",Math.round(n).toString()),words:o.replace("$word",r.toString())}},il={words:"",time:""},zu=()=>Ro?tn(Ro):k(()=>null),Ef=()=>{if(typeof Ro>"u")return k(()=>il);const e=Hu(),t=zu();return k(()=>e.value&&t.value?Gu(e.value,t.value):il)},rn=()=>Iu(),ue=()=>M4(),Qn=()=>k(()=>!!rn().value.pure);var Ja=B({name:"EmptyComponent",setup:()=>()=>null});const yf="719px",bf="1440px",Af="true",Ss={mobileBreakPoint:yf,pcBreakPoint:bf,enableThemeColor:Af,"theme-1":"#2196f3","theme-2":"#f26d6d","theme-3":"#3eaf7c","theme-4":"#fb9b5f"},Rs={},Ku=e=>{const{icon:t="",color:n,size:r}=e,a={};return n&&(a.color=n),r&&(a.height=Number.isNaN(Number(r))?r:`${r}px`),En(t)?i("img",{class:"icon",src:t,"no-view":"",style:a}):Ia(t)?i("img",{class:"icon",src:Ie(t),"no-view":"",style:a}):i(et("FontIcon"),e)};Ku.displayName="HopeIcon";var Ue=Ku,Ae=(e=>(e.type="y",e.title="t",e.shortTitle="s",e.icon="i",e.author="a",e.date="d",e.localizedDate="l",e.category="c",e.tag="g",e.isEncrypted="n",e.isOriginal="o",e.readingTime="r",e.excerpt="e",e.sticky="u",e.cover="v",e.index="I",e.order="O",e))(Ae||{}),Uu=(e=>(e.article="a",e.home="h",e.slide="s",e.page="p",e))(Uu||{});const Mn=(e,t,n=!1)=>{let r=jn(e,ru(encodeURI(t)));r.name==="404"&&(r=jn(e,t));const{fullPath:a,meta:o,name:s}=r;return{text:!n&&o[Ae.shortTitle]?o[Ae.shortTitle]:o[Ae.title]||t,link:s==="404"?t:a,...o[Ae.icon]?{icon:o[Ae.icon]}:{}}},Dr=()=>{const e=He(),t=wt();return n=>{if(n)if(Ia(n))t.path!==n&&e.push(n);else if(En(n)||Lc(n))window&&window.open(n);else{const r=t.path.slice(0,t.path.lastIndexOf("/"));e.push(`${r}/${encodeURI(n)}`)}}},ju=()=>{const e=ue(),t=ye();return k(()=>{const{author:n}=t.value;return n?Ar(n):n===!1?[]:Ar(e.value.author,!1)})},kf=()=>{const e=ye();return k(()=>ou(e.value.category).map(t=>{var n,r;return{name:t,path:((r=(n=ie(Symbol.for("categoryMap")))==null?void 0:n.value.map[t])==null?void 0:r.path)||""}}))},Sf=()=>{const e=ye();return k(()=>su(e.value.tag).map(t=>{var n,r;return{name:t,path:((r=(n=ie(Symbol.for("tagMap")))==null?void 0:n.value.map[t])==null?void 0:r.path)||""}}))},Rf=()=>{const e=ye(),t=de();return k(()=>{const n=fs(e.value.date);if(n)return n;const{createdTime:r}=t.value.git||{};return r?new Date(r):null})},wf=()=>{const e=ue(),t=de(),n=ye(),r=ju(),a=kf(),o=Sf(),s=Rf(),l=Hu(),u=Ef(),c=k(()=>({author:r.value,category:a.value,date:s.value,localizedDate:t.value.localizedDate,tag:o.value,isOriginal:n.value.isOriginal||!1,readingTime:l.value,readingTimeLocale:u.value,pageview:"pageview"in n.value?n.value.pageview:!0})),d=k(()=>"pageInfo"in n.value?n.value.pageInfo:"pageInfo"in e.value?e.value.pageInfo:null);return{info:c,items:d}},{mobileBreakPoint:Tf,pcBreakPoint:If}=Ss,ll=e=>e.endsWith("px")?Number(e.slice(0,-2)):null,xr=()=>{const e=$(!1),t=$(!1),n=()=>{e.value=window.innerWidth<=(ll(Tf)??719),t.value=window.innerWidth>=(ll(If)??1440)};return se(()=>{n(),Ce("resize",n,!1),Ce("orientationchange",n,!1)}),{isMobile:e,isPC:t}},Yu=Symbol(""),Br=()=>{const e=ie(Yu);if(!e)throw new Error("useDarkmode() is called without provider.");return e},Lf=e=>{const t=rn(),n=o4(),r=yn("vuepress-theme-hope-scheme","auto"),a=k(()=>t.value.darkmode||"switch"),o=k(()=>{const l=a.value;return l==="disable"?!1:l==="enable"?!0:l==="auto"?n.value:l==="toggle"?r.value==="dark":r.value==="dark"||r.value==="auto"&&n.value}),s=k(()=>{const l=a.value;return l==="switch"||l==="toggle"});e.provide(Yu,{canToggle:s,config:a,isDarkmode:o,status:r}),Object.defineProperties(e.config.globalProperties,{$isDarkmode:{get:()=>o.value}})},Pf=()=>{const{isDarkmode:e}=Br(),t=(n=e.value)=>document.documentElement.setAttribute("data-theme",n?"dark":"light");se(()=>{re(e,t,{immediate:!0})})};var qe=B({name:"AutoLink",inheritAttrs:!1,props:{config:{type:Object,required:!0},exact:Boolean,noExternalLinkIcon:Boolean},emits:["focusout"],slots:Object,setup(e,{attrs:t,emit:n,slots:r}){const a=wt(),o=Vc(),s=Zn(e,"config"),l=k(()=>En(s.value.link)),u=k(()=>Lc(s.value.link)||Kd(s.value.link)),c=k(()=>u.value?void 0:s.value.target||(l.value?"_blank":void 0)),d=k(()=>c.value==="_blank"),p=k(()=>!l.value&&!u.value&&!d.value),f=k(()=>u.value?void 0:s.value.rel||(d.value?"noopener noreferrer":void 0)),h=k(()=>s.value.ariaLabel||s.value.text),g=k(()=>{if(e.exact)return!1;const R=rt(o.value.locales);return R.length?R.every(_=>_!==s.value.link):s.value.link!=="/"}),A=k(()=>p.value?s.value.activeMatch?new RegExp(s.value.activeMatch).test(a.path):g.value?hn(a.path,s.value.link):a.path===s.value.link:!1);return()=>{const{before:R,after:_,default:y}=r,{text:O,icon:D,link:U}=s.value;return p.value?i(Me,{to:U,"aria-label":h.value,...t,class:["nav-link",{active:A.value},t.class],onFocusout:()=>n("focusout")},()=>y?y():[R?R():i(Ue,{icon:D}),O,_==null?void 0:_()]):i("a",{href:U,rel:f.value,target:c.value,"aria-label":h.value,...t,class:["nav-link",t.class],onFocusout:()=>n("focusout")},y?y():[R?R():i(Ue,{icon:D}),O,e.noExternalLinkIcon?null:i(wu),_==null?void 0:_()])}}});const Yn=(e,t,n=!1)=>"activeMatch"in t?new RegExp(t.activeMatch).test(e.path):ms(e,t.link)?!0:t.children&&!n?t.children.some(r=>Yn(e,r)):!1,Wu=(e,t)=>t.type==="group"?t.children.some(n=>n.type==="group"?Wu(e,n):n.type==="page"&&Yn(e,n,!0))||"prefix"in t&&ms(e,t.prefix):!1,qu=(e,t)=>pe(e.link)?i(qe,{...t,config:e}):i("p",t,[i(Ue,{icon:e.icon}),e.text]),Zu=e=>{const t=wt();return e?i("ul",{class:"vp-sidebar-sub-headers"},e.map(n=>{const r=Yn(t,n,!0);return i("li",{class:"vp-sidebar-sub-header"},[qu(n,{class:["vp-sidebar-link","vp-heading",{active:r}]}),Zu(n.children)])})):null},Qa=(e="",t="")=>Ia(t)?t:`${Hd(e)}${t}`,Of=(e,t)=>{const n=de();return{type:"heading",text:e.title,link:`${n.value.path}#${e.slug}`,children:ws(e.children,t)}},ws=(e,t)=>t>0?e.map(n=>Of(n,t-1)):[],Xu=e=>{const t=de();return ws(t.value.headers,e)},wo=(e,t,n="")=>{const r=He(),a=de(),o=(s,l=n)=>{var u;const c=pe(s)?Mn(r,Qa(l,s)):s.link?{...s,...pa(s.link)?{}:{link:Mn(r,Qa(l,s.link)).link}}:s;if("children"in c){const d=Qa(l,c.prefix),p=c.children==="structure"?Rs[d]:c.children;return{type:"group",...c,prefix:d,children:p.map(f=>o(f,d))}}return{type:"page",...c,children:c.link===a.value.path?ws(((u=a.value.headers[0])==null?void 0:u.level)===1?a.value.headers[0].children:a.value.headers,t):[]}};return e.map(s=>o(s))},Cf=(e,t)=>{const n=de(),r=rt(e).sort((a,o)=>o.length-a.length);for(const a of r)if(hn(decodeURI(n.value.path),a)){const o=e[a];return o?wo(o==="structure"?Rs[a]:o==="heading"?Xu(t):o,t,a):[]}return console.warn(`${n.value.path} is missing sidebar config.`),[]},Df=(e,t)=>{const n=Rt();return e===!1?[]:e==="heading"?Xu(t):e==="structure"?wo(Rs[n.value],t,n.value):J(e)?wo(e,t):Lr(e)?Cf(e,t):[]},Ju=Symbol(""),xf=()=>{const e=ye(),t=ue(),n=k(()=>e.value.home?!1:e.value.sidebar??t.value.sidebar??"structure"),r=k(()=>e.value.headerDepth??t.value.headerDepth??2),a=k(()=>Df(n.value,r.value));tt(Ju,a)},Ts=()=>{const e=ie(Ju);if(!e)throw new Error("useSidebarItems() is called without provider.");return e};var Bf=B({name:"PageFooter",setup(){const e=ye(),t=ue(),n=ju(),r=k(()=>{const{copyright:s,footer:l}=e.value;return l!==!1&&!!(s||l||t.value.displayFooter)}),a=k(()=>{const{footer:s}=e.value;return s===!1?!1:pe(s)?s:t.value.footer||""}),o=k(()=>"copyright"in e.value?e.value.copyright:"copyright"in t.value?t.value.copyright:n.value.length?`Copyright © ${new Date().getFullYear()} ${n.value[0].name}`:!1);return()=>r.value?i("footer",{class:"vp-footer-wrapper"},[a.value?i("div",{class:"vp-footer",innerHTML:a.value}):null,o.value?i("div",{class:"vp-copyright",innerHTML:o.value}):null]):null}}),Nf=B({name:"NavbarDropdownLink",props:{config:{type:Object,required:!0}},slots:Object,setup(e,{slots:t}){const n=de(),r=Zn(e,"config"),a=k(()=>r.value.ariaLabel||r.value.text),o=$(!1);re(()=>n.value.path,()=>{o.value=!1});const s=l=>{l.detail===0&&(o.value=!o.value)};return()=>{var l;return i("div",{class:["dropdown-wrapper",{open:o.value}]},[i("button",{type:"button",class:"dropdown-title","aria-label":a.value,onClick:s},[((l=t.title)==null?void 0:l.call(t))||i("span",{class:"title"},[i(Ue,{icon:r.value.icon}),e.config.text]),i("span",{class:"arrow"}),i("ul",{class:"nav-dropdown"},r.value.children.map((u,c)=>{const d=c===r.value.children.length-1;return i("li",{class:"dropdown-item"},"children"in u?[i("h4",{class:"dropdown-subtitle"},u.link?i(qe,{config:u,onFocusout:()=>{u.children.length===0&&d&&(o.value=!1)}}):i("span",u.text)),i("ul",{class:"dropdown-subitem-wrapper"},u.children.map((p,f)=>i("li",{class:"dropdown-subitem"},i(qe,{config:p,onFocusout:()=>{f===u.children.length-1&&d&&(o.value=!1)}}))))]:i(qe,{config:u,onFocusout:()=>{d&&(o.value=!1)}}))}))])])}}});const Qu=(e,t,n="")=>pe(t)?Mn(e,`${n}${t}`):"children"in t?{...t,...t.link&&!pa(t.link)?Mn(e,`${n}${t.link}`):{},children:t.children.map(r=>Qu(e,r,`${n}${t.prefix||""}`))}:{...t,link:pa(t.link)?t.link:Mn(e,`${n}${t.link}`).link},e1=()=>{const e=ue(),t=He(),n=()=>(e.value.navbar||[]).map(a=>Qu(t,a)),r=$(n());return re(e,()=>{r.value=n()}),r},Vf=()=>{const e=ue(),t=k(()=>e.value.repo||null),n=k(()=>t.value?N3(t.value):null),r=k(()=>t.value?lu(t.value):null),a=k(()=>n.value?e.value.repoLabel??(r.value===null?"Source":r.value):null);return k(()=>!n.value||!a.value||e.value.repoDisplay===!1?null:{type:r.value||"Source",label:a.value,link:n.value})};var Mf=B({name:"NavScreenDropdown",props:{config:{type:Object,required:!0}},setup(e){const t=de(),n=Zn(e,"config"),r=k(()=>n.value.ariaLabel||n.value.text),a=$(!1);re(()=>t.value.path,()=>{a.value=!1});const o=(s,l)=>l[l.length-1]===s;return()=>[i("button",{type:"button",class:["nav-screen-dropdown-title",{active:a.value}],"aria-label":r.value,onClick:()=>{a.value=!a.value}},[i("span",{class:"title"},[i(Ue,{icon:n.value.icon}),e.config.text]),i("span",{class:["arrow",a.value?"down":"end"]})]),i("ul",{class:["nav-screen-dropdown",{hide:!a.value}]},n.value.children.map(s=>i("li",{class:"dropdown-item"},"children"in s?[i("h4",{class:"dropdown-subtitle"},s.link?i(qe,{config:s,onFocusout:()=>{o(s,n.value.children)&&s.children.length===0&&(a.value=!1)}}):i("span",s.text)),i("ul",{class:"dropdown-subitem-wrapper"},s.children.map(l=>i("li",{class:"dropdown-subitem"},i(qe,{config:l,onFocusout:()=>{o(l,s.children)&&o(s,n.value.children)&&(a.value=!1)}}))))]:i(qe,{config:s,onFocusout:()=>{o(s,n.value.children)&&(a.value=!1)}}))))]}}),$f=B({name:"NavScreenLinks",setup(){const e=e1();return()=>e.value.length?i("nav",{class:"nav-screen-links"},e.value.map(t=>i("div",{class:"navbar-links-item"},"children"in t?i(Mf,{config:t}):i(qe,{config:t})))):null}});const t1=()=>i(ae,{name:"dark"},()=>i("path",{d:"M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"}));t1.displayName="DarkIcon";const n1=()=>i(ae,{name:"light"},()=>i("path",{d:"M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"}));n1.displayName="LightIcon";const r1=()=>i(ae,{name:"auto"},()=>i("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"}));r1.displayName="AutoIcon";const a1=()=>i(ae,{name:"enter-fullscreen"},()=>i("path",{d:"M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"}));a1.displayName="EnterFullScreenIcon";const o1=()=>i(ae,{name:"cancel-fullscreen"},()=>i("path",{d:"M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"}));o1.displayName="CancelFullScreenIcon";const s1=()=>i(ae,{name:"outlook"},()=>[i("path",{d:"M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"})]);s1.displayName="OutlookIcon";var i1=B({name:"AppearanceSwitch",setup(){const{config:e,status:t}=Br(),n=()=>{e.value==="switch"?t.value={light:"dark",dark:"auto",auto:"light"}[t.value]:t.value=t.value==="light"?"dark":"light"};return()=>i("button",{type:"button",id:"appearance-switch",onClick:()=>n()},[i(r1,{style:{display:t.value==="auto"?"block":"none"}}),i(t1,{style:{display:t.value==="dark"?"block":"none"}}),i(n1,{style:{display:t.value==="light"?"block":"none"}})])}}),Ff=B({name:"AppearanceMode",setup(){const e=ue(),{canToggle:t}=Br(),n=k(()=>e.value.outlookLocales.darkmode);return()=>t.value?i("div",{class:"appearance-wrapper"},[i("label",{class:"appearance-title",for:"appearance-switch"},n.value),i(i1)]):null}});const eo="VUEPRESS_THEME_COLOR";var Hf=B({name:"ThemeColorPicker",props:{themeColor:{type:Object,required:!0}},setup(e){const t=(n="")=>{const r=document.documentElement.classList,a=rt(e.themeColor);if(!n){localStorage.removeItem(eo),r.remove(...a);return}r.remove(...a.filter(o=>o!==n)),r.add(n),localStorage.setItem(eo,n)};return se(()=>{const n=localStorage.getItem(eo);n&&t(n)}),()=>i("ul",{id:"theme-color-picker"},[i("li",i("span",{class:"theme-color",onClick:()=>t()})),Jn(e.themeColor).map(([n,r])=>i("li",i("span",{style:{background:r},onClick:()=>t(n)})))])}});const $n=Ss.enableThemeColor==="true",Gf=$n?C3(Jn(Ss).filter(([e])=>e.startsWith("theme-"))):{};var zf=B({name:"ThemeColor",setup(){const e=ue(),t=k(()=>e.value.outlookLocales.themeColor);return()=>$n?i("div",{class:"theme-color-wrapper"},[i("label",{class:"theme-color-title",for:"theme-color-picker"},t.value),i(Hf,{themeColor:Gf})]):null}}),l1=B({name:"ToggleFullScreenButton",setup(){const e=ue(),{isSupported:t,isFullscreen:n,toggle:r}=Es(),a=k(()=>e.value.outlookLocales.fullscreen);return()=>t?i("div",{class:"full-screen-wrapper"},[i("label",{class:"full-screen-title",for:"full-screen-switch"},a.value),i("button",{type:"button",id:"full-screen-switch",class:"full-screen",ariaPressed:n.value,onClick:()=>r()},n.value?i(o1):i(a1))]):null}}),c1=B({name:"OutlookSettings",setup(){const e=rn(),t=Qn(),n=k(()=>!t.value&&e.value.fullscreen);return()=>i(Sa,()=>[$n?i(zf):null,i(Ff),n.value?i(l1):null])}}),Kf=B({name:"NavScreen",props:{show:Boolean},emits:["close"],slots:Object,setup(e,{emit:t,slots:n}){const r=de(),{isMobile:a}=xr(),o=Le(),s=ys(o);return se(()=>{o.value=document.body,re(a,l=>{!l&&e.show&&(s.value=!1,t("close"))}),re(()=>r.value.path,()=>{s.value=!1,t("close")})}),Qt(()=>{s.value=!1}),()=>i(qt,{name:"fade",onEnter:()=>{s.value=!0},onAfterLeave:()=>{s.value=!1}},()=>{var l,u;return e.show?i("div",{id:"nav-screen"},i("div",{class:"vp-nav-screen-container"},[(l=n.before)==null?void 0:l.call(n),i($f),i("div",{class:"vp-outlook-wrapper"},i(c1)),(u=n.after)==null?void 0:u.call(n)])):null})}}),Uf=B({name:"NavbarBrand",setup(){const e=Rt(),t=Xn(),n=ue(),r=k(()=>n.value.home||e.value),a=k(()=>t.value.title),o=k(()=>n.value.navTitle??a.value),s=k(()=>n.value.logo?Ie(n.value.logo):null),l=k(()=>n.value.logoDark?Ie(n.value.logoDark):null);return()=>i(Me,{to:r.value,class:"vp-brand"},()=>[s.value?i("img",{class:["vp-nav-logo",{light:!!l.value}],src:s.value,alt:a.value}):null,l.value?i("img",{class:["vp-nav-logo dark"],src:l.value,alt:a.value}):null,o.value?i("span",{class:["vp-site-name",{"hide-in-pad":s.value&&n.value.hideSiteNameOnMobile!==!1}]},o.value):null])}}),jf=B({name:"NavbarLinks",setup(){const e=e1();return()=>e.value.length?i("nav",{class:"vp-nav-links"},e.value.map(t=>i("div",{class:"nav-item hide-in-mobile"},"children"in t?i(Nf,{config:t}):i(qe,{config:t})))):null}}),Yf=B({name:"RepoLink",components:{BitbucketIcon:pu,GiteeIcon:du,GitHubIcon:cu,GitLabIcon:uu,SourceIcon:fu},setup(){const e=Vf();return()=>e.value?i("div",{class:"nav-item vp-repo"},i("a",{class:"vp-repo-link",href:e.value.link,target:"_blank",rel:"noopener noreferrer","aria-label":e.value.label},i(et(`${e.value.type}Icon`),{style:{width:"1.25rem",height:"1.25rem",verticalAlign:"middle"}}))):null}});const u1=({active:e=!1},{emit:t})=>i("button",{type:"button",class:["vp-toggle-navbar-button",{"is-active":e}],"aria-label":"Toggle Navbar","aria-expanded":e,"aria-controls":"nav-screen",onClick:()=>t("toggle")},i("span",[i("span",{class:"vp-top"}),i("span",{class:"vp-middle"}),i("span",{class:"vp-bottom"})]));u1.displayName="ToggleNavbarButton";var Wf=u1;const To=(e,{emit:t})=>i("button",{type:"button",class:"vp-toggle-sidebar-button",title:"Toggle Sidebar",onClick:()=>t("toggle")},i("span",{class:"icon"}));To.displayName="ToggleSidebarButton",To.emits=["toggle"];var qf=To,Zf=B({name:"OutlookButton",setup(){const{isSupported:e}=Es(),t=rn(),n=Qn(),r=de(),{canToggle:a}=Br(),o=$(!1),s=k(()=>!n.value&&t.value.fullscreen&&e);return re(()=>r.value.path,()=>{o.value=!1}),()=>a.value||s.value||$n?i("div",{class:"nav-item hide-in-mobile"},a.value&&!s.value&&!$n?i(i1):s.value&&!a.value&&!$n?i(l1):i("button",{type:"button",class:["outlook-button",{open:o.value}],tabindex:"-1","aria-hidden":!0},[i(s1),i("div",{class:"outlook-dropdown"},i(c1))])):null}}),Xf=B({name:"NavBar",emits:["toggleSidebar"],slots:Object,setup(e,{emit:t,slots:n}){const r=ue(),{isMobile:a}=xr(),o=$(!1),s=k(()=>{const{navbarAutoHide:d="mobile"}=r.value;return d!=="none"&&(d==="always"||a.value)}),l=k(()=>r.value.navbarLayout||{start:["Brand"],center:["Links"],end:["Language","Repo","Outlook","Search"]}),u={Brand:Uf,Language:Ja,Links:jf,Repo:Yf,Outlook:Zf,Search:Et("Docsearch")?et("Docsearch"):Et("SearchBox")?et("SearchBox"):Ja},c=d=>u[d]??(Et(d)?et(d):Ja);return()=>{var d,p,f,h,g,A;return[i("header",{id:"navbar",class:["vp-navbar",{"auto-hide":s.value,"hide-icon":r.value.navbarIcon===!1}]},[i("div",{class:"vp-navbar-start"},[i(qf,{onToggle:()=>{o.value&&(o.value=!1),t("toggleSidebar")}}),(d=n.startBefore)==null?void 0:d.call(n),(l.value.start||[]).map(R=>i(c(R))),(p=n.startAfter)==null?void 0:p.call(n)]),i("div",{class:"vp-navbar-center"},[(f=n.centerBefore)==null?void 0:f.call(n),(l.value.center||[]).map(R=>i(c(R))),(h=n.centerAfter)==null?void 0:h.call(n)]),i("div",{class:"vp-navbar-end"},[(g=n.endBefore)==null?void 0:g.call(n),(l.value.end||[]).map(R=>i(c(R))),(A=n.endAfter)==null?void 0:A.call(n),i(Wf,{active:o.value,onToggle:()=>{o.value=!o.value}})])]),i(Kf,{show:o.value,onClose:()=>{o.value=!1}},{before:()=>{var R;return(R=n.screenTop)==null?void 0:R.call(n)},after:()=>{var R;return(R=n.screenBottom)==null?void 0:R.call(n)}})]}}}),Jf=B({name:"SidebarChild",props:{config:{type:Object,required:!0}},setup(e){const t=wt();return()=>[qu(e.config,{class:["vp-sidebar-link",`vp-sidebar-${e.config.type}`,{active:Yn(t,e.config,!0)}],exact:!0}),Zu(e.config.children)]}}),Qf=B({name:"SidebarGroup",props:{config:{type:Object,required:!0},open:{type:Boolean,required:!0}},emits:["toggle"],setup(e,{emit:t}){const n=wt(),r=k(()=>Yn(n,e.config)),a=k(()=>Yn(n,e.config,!0));return()=>{const{collapsible:o,children:s=[],icon:l,prefix:u,link:c,text:d}=e.config;return i("section",{class:"vp-sidebar-group"},[i(o?"button":"p",{class:["vp-sidebar-heading",{clickable:o||c,exact:a.value,active:r.value}],...o?{type:"button",onClick:()=>t("toggle"),onKeydown:p=>{p.key==="Enter"&&t("toggle")}}:{}},[i(Ue,{icon:l}),c?i(qe,{class:"vp-sidebar-title",config:{text:d,link:c},noExternalLinkIcon:!0}):i("span",{class:"vp-sidebar-title"},d),o?i("span",{class:["vp-arrow",e.open?"down":"end"]}):null]),e.open||!o?i(d1,{key:u,config:s}):null])}}}),d1=B({name:"SidebarLinks",props:{config:{type:Array,required:!0}},setup(e){const t=wt(),n=$(-1),r=a=>{n.value=a===n.value?-1:a};return re(()=>t.path,()=>{const a=e.config.findIndex(o=>Wu(t,o));n.value=a},{immediate:!0,flush:"post"}),()=>i("ul",{class:"vp-sidebar-links"},e.config.map((a,o)=>i("li",a.type==="group"?i(Qf,{config:a,open:o===n.value,onToggle:()=>r(o)}):i(Jf,{config:a}))))}}),ev=B({name:"SideBar",slots:Object,setup(e,{slots:t}){const n=wt(),r=ue(),a=Ts(),o=Le();return se(()=>{re(()=>n.hash,s=>{const l=document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${n.path}${s}"]`);if(!l)return;const{top:u,height:c}=o.value.getBoundingClientRect(),{top:d,height:p}=l.getBoundingClientRect();d<u?l.scrollIntoView(!0):d+p>u+c&&l.scrollIntoView(!1)},{immediate:!0})}),()=>{var s,l,u;return i("aside",{ref:o,id:"sidebar",class:["vp-sidebar",{"hide-icon":r.value.sidebarIcon===!1}]},[(s=t.top)==null?void 0:s.call(t),((l=t.default)==null?void 0:l.call(t))||i(d1,{config:a.value}),(u=t.bottom)==null?void 0:u.call(t)])}}}),Is=B({name:"CommonWrapper",props:{containerClass:{type:String,default:""},noNavbar:Boolean,noSidebar:Boolean,noToc:Boolean},slots:Object,setup(e,{slots:t}){const n=He(),r=de(),a=ye(),o=ue(),{isMobile:s,isPC:l}=xr(),[u,c]=So(!1),[d,p]=So(!1),f=Ts(),h=$(!1),g=k(()=>e.noNavbar||a.value.navbar===!1||o.value.navbar===!1?!1:!!(r.value.title||o.value.logo||o.value.repo||o.value.navbar)),A=k(()=>e.noSidebar?!1:a.value.sidebar!==!1&&f.value.length!==0&&!a.value.home),R=k(()=>e.noToc||a.value.home?!1:a.value.toc||o.value.toc!==!1&&a.value.toc!==!1),_={x:0,y:0},y=x=>{_.x=x.changedTouches[0].clientX,_.y=x.changedTouches[0].clientY},O=x=>{const q=x.changedTouches[0].clientX-_.x,I=x.changedTouches[0].clientY-_.y;Math.abs(q)>Math.abs(I)*1.5&&Math.abs(q)>40&&(q>0&&_.x<=80?c(!0):c(!1))},D=()=>window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;let U=0;return Ce("scroll",Y3(()=>{const x=D();x<=58||x<U?h.value=!1:U+200<x&&!u.value&&(h.value=!0),U=x},300,!0)),re(s,x=>{x||c(!1)}),se(()=>{const x=ys(document.body);re(u,I=>{x.value=I});const q=n.afterEach(()=>{c(!1)});Qt(()=>{x.value=!1,q()})}),()=>i(Et("GlobalEncrypt")?et("GlobalEncrypt"):nu,()=>i("div",{class:["theme-container",{"no-navbar":!g.value,"no-sidebar":!A.value&&!(t.sidebar||t.sidebarTop||t.sidebarBottom),"has-toc":R.value,"hide-navbar":h.value,"sidebar-collapsed":!s.value&&!l.value&&d.value,"sidebar-open":s.value&&u.value},e.containerClass,a.value.containerClass||""],onTouchStart:y,onTouchEnd:O},[g.value?i(Xf,{onToggleSidebar:()=>c()},{startBefore:()=>{var x;return(x=t.navbarStartBefore)==null?void 0:x.call(t)},startAfter:()=>{var x;return(x=t.navbarStartAfter)==null?void 0:x.call(t)},centerBefore:()=>{var x;return(x=t.navbarCenterBefore)==null?void 0:x.call(t)},centerAfter:()=>{var x;return(x=t.navbarCenterAfter)==null?void 0:x.call(t)},endBefore:()=>{var x;return(x=t.navbarEndBefore)==null?void 0:x.call(t)},endAfter:()=>{var x;return(x=t.navbarEndAfter)==null?void 0:x.call(t)},screenTop:()=>{var x;return(x=t.navScreenTop)==null?void 0:x.call(t)},screenBottom:()=>{var x;return(x=t.navScreenBottom)==null?void 0:x.call(t)}}):null,i(qt,{name:"fade"},()=>u.value?i("div",{class:"vp-sidebar-mask",onClick:()=>c(!1)}):null),i(qt,{name:"fade"},()=>s.value?null:i("div",{class:"toggle-sidebar-wrapper",onClick:()=>p()},i("span",{class:["arrow",d.value?"end":"start"]}))),i(ev,{},{...t.sidebar?{default:()=>t.sidebar()}:{},top:()=>{var x;return(x=t.sidebarTop)==null?void 0:x.call(t)},bottom:()=>{var x;return(x=t.sidebarBottom)==null?void 0:x.call(t)}}),t.default(),i(Bf)]))}}),ge=B({name:"DropTransition",props:{type:{type:String,default:"single"},delay:{type:Number,default:0},duration:{type:Number,default:.25},appear:Boolean},slots:Object,setup(e,{slots:t}){const n=a=>{a.style.transition=`transform ${e.duration}s ease-in-out ${e.delay}s, opacity ${e.duration}s ease-in-out ${e.delay}s`,a.style.transform="translateY(-20px)",a.style.opacity="0"},r=a=>{a.style.transform="translateY(0)",a.style.opacity="1"};return()=>i(e.type==="single"?qt:Sd,{name:"drop",appear:e.appear,onAppear:n,onAfterAppear:r,onEnter:n,onAfterEnter:r,onBeforeLeave:n},()=>t.default())}});const Io=({custom:e})=>i(cs,{class:["theme-hope-content",{custom:e}]});Io.displayName="MarkdownContent",Io.props={custom:Boolean};var Ls=Io;const p1=()=>i(ae,{name:"author"},()=>i("path",{d:"M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"}));p1.displayName="AuthorIcon";const f1=()=>i(ae,{name:"calendar"},()=>i("path",{d:"M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"}));f1.displayName="CalendarIcon";const v1=()=>i(ae,{name:"category"},()=>i("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));v1.displayName="CategoryIcon";const h1=()=>i(ae,{name:"print"},()=>i("path",{d:"M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"}));h1.displayName="PrintIcon";const m1=()=>i(ae,{name:"tag"},()=>i("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));m1.displayName="TagIcon";const g1=()=>i(ae,{name:"timer"},()=>i("path",{d:"M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"}));g1.displayName="TimerIcon";const _1=()=>i(ae,{name:"word"},()=>[i("path",{d:"M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"}),i("path",{d:"M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"})]);_1.displayName="WordIcon";const an=()=>{const e=ue();return k(()=>e.value.metaLocales)};var tv=B({name:"AuthorInfo",inheritAttrs:!1,props:{author:{type:Array,required:!0},pure:Boolean},setup(e){const t=an();return()=>e.author.length?i("span",{class:"page-author-info","aria-label":`${t.value.author}${e.pure?"":"🖊"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(p1),i("span",e.author.map(n=>n.url?i("a",{class:"page-author-item",href:n.url,target:"_blank",rel:"noopener noreferrer"},n.name):i("span",{class:"page-author-item"},n.name))),i("span",{property:"author",content:e.author.map(n=>n.name).join(", ")})]):null}}),nv=B({name:"CategoryInfo",inheritAttrs:!1,props:{category:{type:Array,required:!0},pure:Boolean},setup(e){const t=He(),n=de(),r=an(),a=(o,s="")=>{s&&n.value.path!==s&&(o.preventDefault(),t.push(s))};return()=>e.category.length?i("span",{class:"page-category-info","aria-label":`${r.value.category}${e.pure?"":"🌈"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(v1),e.category.map(({name:o,path:s})=>i("span",{class:["page-category-item",{[`category${Ta(o,9)}`]:!e.pure,clickable:s}],role:s?"navigation":"",onClick:l=>a(l,s)},o)),i("meta",{property:"articleSection",content:e.category.map(({name:o})=>o).join(",")})]):null}}),rv=B({name:"DateInfo",inheritAttrs:!1,props:{date:{type:Object,default:null},localizedDate:{type:String,default:""},pure:Boolean},setup(e){const t=is(),n=an();return()=>e.date?i("span",{class:"page-date-info","aria-label":`${n.value.date}${e.pure?"":"📅"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(f1),i("span",i(Sa,()=>e.localizedDate||e.date.toLocaleDateString(t.value))),i("meta",{property:"datePublished",content:e.date.toISOString()||""})]):null}}),av=B({name:"OriginalInfo",inheritAttrs:!1,props:{isOriginal:Boolean},setup(e){const t=an();return()=>e.isOriginal?i("span",{class:"page-original-info"},t.value.origin):null}}),ov=B({name:"ReadingTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(e){const t=an(),n=k(()=>{if(!e.readingTime)return null;const{minutes:r}=e.readingTime;return r<1?"PT1M":`PT${Math.round(r)}M`});return()=>{var r,a;return(r=e.readingTimeLocale)!=null&&r.time?i("span",{class:"page-reading-time-info","aria-label":`${t.value.readingTime}${e.pure?"":"⌛"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(g1),i("span",(a=e.readingTimeLocale)==null?void 0:a.time),i("meta",{property:"timeRequired",content:n.value})]):null}}}),sv=B({name:"TagInfo",inheritAttrs:!1,props:{tag:{type:Array,default:()=>[]},pure:Boolean},setup(e){const t=He(),n=de(),r=an(),a=(o,s="")=>{s&&n.value.path!==s&&(o.preventDefault(),t.push(s))};return()=>e.tag.length?i("span",{class:"page-tag-info","aria-label":`${r.value.tag}${e.pure?"":"🏷"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(m1),e.tag.map(({name:o,path:s})=>i("span",{class:["page-tag-item",{[`tag${Ta(o,9)}`]:!e.pure,clickable:s}],role:s?"navigation":"",onClick:l=>a(l,s)},o)),i("meta",{property:"keywords",content:e.tag.map(({name:o})=>o).join(",")})]):null}}),iv=B({name:"ReadTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(e){const t=an();return()=>{var n,r,a;return(n=e.readingTimeLocale)!=null&&n.words?i("span",{class:"page-word-info","aria-label":`${t.value.words}${e.pure?"":"🔠"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[i(_1),i("span",(r=e.readingTimeLocale)==null?void 0:r.words),i("meta",{property:"wordCount",content:(a=e.readingTime)==null?void 0:a.words})]):null}}}),E1=B({name:"PageInfo",components:{AuthorInfo:tv,CategoryInfo:nv,DateInfo:rv,OriginalInfo:av,PageViewInfo:()=>null,ReadingTimeInfo:ov,TagInfo:sv,WordInfo:iv},props:{items:{type:[Array,Boolean],default:()=>["Author","Original","Date","PageView","ReadingTime","Category","Tag"]},info:{type:Object,required:!0}},setup(e){const t=Qn();return()=>e.items?i("div",{class:"page-info"},e.items.map(n=>i(et(`${n}Info`),{...e.info,pure:t.value}))):null}}),lv=B({name:"PrintButton",setup(){const e=rn(),t=ue();return()=>e.value.print===!1?null:i("button",{type:"button",class:"print-button",title:t.value.metaLocales.print,onClick:()=>{window.print()}},i(h1))}});const cv=({title:e,level:t,slug:n})=>i(Me,{to:`#${n}`,class:["toc-link",`level${t}`]},()=>e),Lo=(e,t)=>{const n=wt();return e.length&&t>0?i("ul",{class:"toc-list"},e.map(r=>{const a=Lo(r.children,t-1);return[i("li",{class:["toc-item",{active:ms(n,`#${r.slug}`)}]},cv(r)),a?i("li",a):null]})):null};var y1=B({name:"TOC",props:{items:{type:Array,default:()=>[]},headerDepth:{type:Number,default:2}},slots:Object,setup(e,{slots:t}){const n=wt(),r=de(),a=an(),o=Le(),s=$("-1.7rem"),l=c=>{var d;(d=o.value)==null||d.scrollTo({top:c,behavior:"smooth"})},u=()=>{if(o.value){const c=document.querySelector(".toc-item.active");c?s.value=`${c.getBoundingClientRect().top-o.value.getBoundingClientRect().top+o.value.scrollTop}px`:s.value="-1.7rem"}else s.value="-1.7rem"};return se(()=>{re(()=>n.hash,c=>{if(o.value){const d=document.querySelector(`#toc a.toc-link[href$="${c}"]`);if(!d)return;const{top:p,height:f}=o.value.getBoundingClientRect(),{top:h,height:g}=d.getBoundingClientRect();h<p?l(o.value.scrollTop+h-p):h+g>p+f&&l(o.value.scrollTop+h+g-p-f)}}),re(()=>n.fullPath,()=>u(),{flush:"post",immediate:!0})}),()=>{var c,d;const p=e.items.length?Lo(e.items,e.headerDepth):r.value.headers?Lo(r.value.headers,e.headerDepth):null;return p?i("div",{class:"toc-place-holder"},[i("aside",{id:"toc"},[(c=t.before)==null?void 0:c.call(t),i("div",{class:"toc-header"},[a.value.toc,i(lv)]),i("div",{class:"toc-wrapper",ref:o},[p,i("div",{class:"toc-marker",style:{top:s.value}})]),(d=t.after)==null?void 0:d.call(t)])]):null}}}),Ps=B({name:"SkipLink",props:{content:{type:String,default:"main-content"}},setup(e){const t=de(),n=ue(),r=Le(),a=({target:o})=>{const s=document.querySelector(o.hash);if(s){const l=()=>{s.removeAttribute("tabindex"),s.removeEventListener("blur",l)};s.setAttribute("tabindex","-1"),s.addEventListener("blur",l),s.focus(),window.scrollTo(0,0)}};return se(()=>{re(()=>t.value.path,()=>r.value.focus())}),()=>[i("span",{ref:r,tabindex:"-1"}),i("a",{href:`#${e.content}`,class:"vp-skip-link sr-only",onClick:a},n.value.routeLocales.skipToContent)]}});let to=null,Jr=null;const uv={wait:()=>to,pending:()=>{to=new Promise(e=>Jr=e)},resolve:()=>{Jr==null||Jr(),to=null,Jr=null}},b1=()=>uv;var A1=B({name:"FadeSlideY",slots:Object,setup(e,{slots:t}){const{resolve:n,pending:r}=b1();return()=>i(qt,{name:"fade-slide-y",mode:"out-in",onBeforeEnter:n,onBeforeLeave:r},()=>{var a;return(a=t.default)==null?void 0:a.call(t)})}});const dv=(e,t)=>{const n=e.replace(t,"/").split("/"),r=[];let a=ss(t);return n.forEach((o,s)=>{s!==n.length-1?(a+=`${o}/`,r.push({link:a,name:o||"Home"})):o!==""&&(a+=o,r.push({link:a,name:o}))}),r},k1=(e,{slots:t})=>{var n,r;const{bgImage:a,bgImageDark:o,bgImageStyle:s,color:l,description:u,image:c,imageDark:d,header:p,features:f=[]}=e;return i("div",{class:"vp-feature-wrapper"},[a?i("div",{class:["vp-feature-bg",{light:o}],style:[{"background-image":`url(${a})`},s]}):null,o?i("div",{class:"vp-feature-bg dark",style:[{"background-image":`url(${o})`},s]}):null,i("div",{class:"vp-feature",style:l?{color:l}:{}},[((n=t.image)==null?void 0:n.call(t,e))||[c?i("img",{class:["vp-feature-image",{light:d}],src:Ie(c),alt:p}):null,d?i("img",{class:"vp-feature-image dark",src:Ie(d),alt:p}):null],((r=t.info)==null?void 0:r.call(t,e))||[p?i("h2",{class:"vp-feature-header"},p):null,u?i("p",{class:"vp-feature-description",innerHTML:u}):null],f.length?i("div",{class:"vp-features"},f.map(({icon:h,title:g,details:A,link:R})=>{const _=[i("h3",{class:"vp-feature-title"},[i(Ue,{icon:h}),i("span",{innerHTML:g})]),i("p",{class:"vp-feature-details",innerHTML:A})];return R?pa(R)?i("a",{class:"vp-feature-item link",href:R,role:"navigation","aria-label":g,target:"_blank"},_):i(Me,{class:"vp-feature-item link",to:R,role:"navigation","aria-label":g},()=>_):i("div",{class:"vp-feature-item"},_)})):null])])};k1.displayName="FeaturePanel";var cl=k1,pv=B({name:"HeroInfo",slots:Object,setup(e,{slots:t}){const n=ye(),r=Xn(),a=k(()=>n.value.heroFullScreen??!1),o=k(()=>{const{heroText:c,tagline:d}=n.value;return{text:c??r.value.title??"Hello",tagline:d??r.value.description??"",isFullScreen:a.value}}),s=k(()=>{const{heroText:c,heroImage:d,heroImageDark:p,heroAlt:f,heroImageStyle:h}=n.value;return{image:d?Ie(d):null,imageDark:p?Ie(p):null,heroStyle:h,alt:f||c||"hero image",isFullScreen:a.value}}),l=k(()=>{const{bgImage:c,bgImageDark:d,bgImageStyle:p}=n.value;return{image:xt(c)?Ie(c):null,imageDark:xt(d)?Ie(d):null,bgStyle:p,isFullScreen:a.value}}),u=k(()=>n.value.actions??[]);return()=>{var c,d,p;return i("header",{class:["vp-hero-info-wrapper",{fullscreen:a.value}]},[((c=t.heroBg)==null?void 0:c.call(t,l.value))||[l.value.image?i("div",{class:["vp-hero-mask",{light:l.value.imageDark}],style:[{"background-image":`url(${l.value.image})`},l.value.bgStyle]}):null,l.value.imageDark?i("div",{class:"vp-hero-mask dark",style:[{"background-image":`url(${l.value.imageDark})`},l.value.bgStyle]}):null],i("div",{class:"vp-hero-info"},[((d=t.heroImage)==null?void 0:d.call(t,s.value))||i(ge,{appear:!0,type:"group"},()=>[s.value.image?i("img",{key:"light",class:["vp-hero-image",{light:s.value.imageDark}],style:s.value.heroStyle,src:s.value.image,alt:s.value.alt}):null,s.value.imageDark?i("img",{key:"dark",class:"vp-hero-image dark",style:s.value.heroStyle,src:s.value.imageDark,alt:s.value.alt}):null]),((p=t.heroInfo)==null?void 0:p.call(t,o.value))??i("div",{class:"vp-hero-infos"},[o.value.text?i(ge,{appear:!0,delay:.04},()=>i("h1",{id:"main-title"},o.value.text)):null,o.value.tagline?i(ge,{appear:!0,delay:.08},()=>i("p",{class:"vp-description",innerHTML:o.value.tagline})):null,u.value.length?i(ge,{appear:!0,delay:.12},()=>i("p",{class:"vp-actions"},u.value.map(f=>i(qe,{class:["vp-action",f.type||"default"],config:f,noExternalLinkIcon:!0})))):null])])])}}});const S1=(e,{slots:t})=>{var n,r,a;const{bgImage:o,bgImageDark:s,bgImageStyle:l,color:u,description:c,image:d,imageDark:p,header:f,highlights:h=[],type:g="un-order"}=e;return i("div",{class:"vp-highlight-wrapper",style:u?{color:u}:{}},[o?i("div",{class:["vp-highlight-bg",{light:s}],style:[{"background-image":`url(${o})`},l]}):null,s?i("div",{class:"vp-highlight-bg dark",style:[{"background-image":`url(${s})`},l]}):null,i("div",{class:"vp-highlight"},[((n=t.image)==null?void 0:n.call(t,e))||[d?i("img",{class:["vp-highlight-image",{light:p}],src:Ie(d),alt:f}):null,p?i("img",{class:"vp-highlight-image dark",src:Ie(p),alt:f}):null],((r=t.info)==null?void 0:r.call(t,e))||[i("div",{class:"vp-highlight-info-wrapper"},i("div",{class:"vp-highlight-info"},[f?i("h2",{class:"vp-highlight-header",innerHTML:f}):null,c?i("p",{class:"vp-highlight-description",innerHTML:c}):null,((a=t.highlights)==null?void 0:a.call(t,h))||i(g==="order"?"ol":g==="no-order"?"dl":"ul",{class:"vp-highlights"},h.map(({icon:A,title:R,details:_,link:y})=>{const O=[i(g==="no-order"?"dt":"h3",{class:"vp-highlight-title"},[A?i(Ue,{class:"vp-highlight-icon",icon:A}):null,i("span",{innerHTML:R})]),_?i(g==="no-order"?"dd":"p",{class:"vp-highlight-details",innerHTML:_}):null];return i(g==="no-order"?"div":"li",{class:["vp-highlight-item-wrapper",{link:y}]},y?I3(y)?i("a",{class:"vp-highlight-item link",href:y,role:"navigation","aria-label":R,target:"_blank"},O):i(Me,{class:"vp-highlight-item link",to:y,role:"navigation","aria-label":R},()=>O):i("div",{class:"vp-highlight-item"},O))}))]))]])])};S1.displayName="HighlightPanel";var fv=S1,vv=B({name:"HomePage",slots:Object,setup(e,{slots:t}){const n=Qn(),r=ye(),a=k(()=>{const{features:s}=r.value;return J(s)?s:null}),o=k(()=>{const{highlights:s}=r.value;return J(s)?s:null});return()=>{var s,l,u,c;return i("main",{id:"main-content",class:["vp-project-home ",{pure:n.value}],"aria-labelledby":r.value.heroText===null?"":"main-title"},[(s=t.top)==null?void 0:s.call(t),i(pv),((l=o.value)==null?void 0:l.map(d=>"features"in d?i(cl,d):i(fv,d)))||(a.value?i(ge,{appear:!0,delay:.24},()=>i(cl,{features:a.value})):null),(u=t.center)==null?void 0:u.call(t),i(ge,{appear:!0,delay:.32},()=>i(Ls)),(c=t.bottom)==null?void 0:c.call(t)])}}}),hv=B({name:"BreadCrumb",setup(){const e=He(),t=de(),n=Rt(),r=ye(),a=ue(),o=Le([]),s=k(()=>(r.value.breadcrumb||r.value.breadcrumb!==!1&&a.value.breadcrumb!==!1)&&o.value.length>1),l=k(()=>r.value.breadcrumbIcon||r.value.breadcrumbIcon!==!1&&a.value.breadcrumbIcon!==!1),u=()=>{const c=e.getRoutes(),d=dv(t.value.path,n.value).map(({link:p,name:f})=>{const h=c.find(g=>g.path===p);if(h){const{meta:g,path:A}=jn(e,h.path);return{title:g[Ae.shortTitle]||g[Ae.title]||f,icon:g[Ae.icon],path:A}}return null}).filter(p=>p!==null);d.length>1&&(o.value=d)};return se(()=>{u(),re(()=>t.value.path,u)}),()=>i("nav",{class:["vp-breadcrumb",{disable:!s.value}]},s.value?i("ol",{vocab:"https://schema.org/",typeof:"BreadcrumbList"},o.value.map((c,d)=>i("li",{class:{"is-active":o.value.length-1===d},property:"itemListElement",typeof:"ListItem"},[i(Me,{to:c.path,property:"item",typeof:"WebPage"},()=>[l.value?i(Ue,{icon:c.icon}):null,i("span",{property:"name"},c.title||"Unknown")]),i("meta",{property:"position",content:d+1})]))):[])}});const ul=e=>{const t=He();return e===!1?!1:pe(e)?Mn(t,e,!0):Lr(e)?e:null},Po=(e,t,n)=>{const r=e.findIndex(a=>a.link===t);if(r!==-1){const a=e[r+n];return a!=null&&a.link?a:null}for(const a of e)if(a.children){const o=Po(a.children,t,n);if(o)return o}return null};var mv=B({name:"PageNav",setup(){const e=ue(),t=ye(),n=Ts(),r=de(),a=Dr(),o=k(()=>{const l=ul(t.value.prev);return l===!1?null:l||(e.value.prevLink===!1?null:Po(n.value,r.value.path,-1))}),s=k(()=>{const l=ul(t.value.next);return l===!1?null:l||(e.value.nextLink===!1?null:Po(n.value,r.value.path,1))});return Ce("keydown",l=>{l.altKey&&(l.key==="ArrowRight"?s.value&&(a(s.value.link),l.preventDefault()):l.key==="ArrowLeft"&&o.value&&(a(o.value.link),l.preventDefault()))}),()=>o.value||s.value?i("nav",{class:"vp-page-nav"},[o.value?i(qe,{class:"prev",config:o.value},()=>{var l,u;return[i("div",{class:"hint"},[i("span",{class:"arrow start"}),e.value.metaLocales.prev]),i("div",{class:"link"},[i(Ue,{icon:(l=o.value)==null?void 0:l.icon}),(u=o.value)==null?void 0:u.text])]}):null,s.value?i(qe,{class:"next",config:s.value},()=>{var l,u;return[i("div",{class:"hint"},[e.value.metaLocales.next,i("span",{class:"arrow end"})]),i("div",{class:"link"},[(l=s.value)==null?void 0:l.text,i(Ue,{icon:(u=s.value)==null?void 0:u.icon})])]}):null]):null}});const gv={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},_v=({docsRepo:e,docsBranch:t,docsDir:n,filePathRelative:r,editLinkPattern:a})=>{if(!r)return null;const o=lu(e);let s;return a?s=a:o!==null&&(s=gv[o]),s?s.replace(/:repo/,En(e)?e:`https://github.com/${e}`).replace(/:branch/,t).replace(/:path/,Pc(`${ss(n)}/${r}`)):null},Ev=()=>{const e=ue(),t=de(),n=ye();return k(()=>{const{repo:r,docsRepo:a=r,docsBranch:o="main",docsDir:s="",editLink:l,editLinkPattern:u=""}=e.value;if(!(n.value.editLink??l??!0)||!a)return null;const c=_v({docsRepo:a,docsBranch:o,docsDir:s,editLinkPattern:u,filePathRelative:t.value.filePathRelative});return c?{text:e.value.metaLocales.editLink,link:c}:null})},yv=()=>{const e=Xn(),t=ue(),n=de(),r=ye();return k(()=>{var a,o;return!(r.value.lastUpdated??t.value.lastUpdated??!0)||!((a=n.value.git)!=null&&a.updatedTime)?null:new Date((o=n.value.git)==null?void 0:o.updatedTime).toLocaleString(e.value.lang)})},bv=()=>{const e=ue(),t=de(),n=ye();return k(()=>{var r;return n.value.contributors??e.value.contributors??!0?((r=t.value.git)==null?void 0:r.contributors)??null:null})};var Av=B({name:"PageTitle",setup(){const e=de(),t=ye(),n=ue(),{info:r,items:a}=wf();return()=>i("div",{class:"vp-page-title"},[i("h1",[n.value.titleIcon===!1?null:i(Ue,{icon:t.value.icon}),e.value.title]),i(E1,{info:r.value,...a.value===null?{}:{items:a.value}}),i("hr")])}});const R1=()=>i(ae,{name:"edit"},()=>[i("path",{d:"M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"}),i("path",{d:"M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"})]);R1.displayName="EditIcon";var kv=B({name:"PageMeta",setup(){const e=ue(),t=Ev(),n=yv(),r=bv();return()=>{const{metaLocales:a}=e.value;return i("footer",{class:"page-meta"},[t.value?i("div",{class:"meta-item edit-link"},i(qe,{class:"label",config:t.value},{before:()=>i(R1)})):null,i("div",{class:"meta-item git-info"},[n.value?i("div",{class:"update-time"},[i("span",{class:"label"},`${a.lastUpdated}: `),i(Sa,()=>i("span",{class:"info"},n.value))]):null,r.value&&r.value.length?i("div",{class:"contributors"},[i("span",{class:"label"},`${a.contributors}: `),r.value.map(({email:o,name:s},l)=>[i("span",{class:"contributor",title:`email: ${o}`},s),l!==r.value.length-1?",":""])]):null])])}}}),Sv=B({name:"NormalPage",slots:Object,setup(e,{slots:t}){const n=ye(),r=de(),{isDarkmode:a}=Br(),o=ue(),s=k(()=>n.value.toc||n.value.toc!==!1&&o.value.toc!==!1);return()=>i("main",{id:"main-content",class:"vp-page"},i(Et("LocalEncrypt")?et("LocalEncrypt"):nu,()=>{var l,u,c,d;return[(l=t.top)==null?void 0:l.call(t),n.value.cover?i("img",{class:"page-cover",src:Ie(n.value.cover),alt:r.value.title,"no-view":""}):null,i(hv),i(Av),s.value?i(y1,{headerDepth:n.value.headerDepth??o.value.headerDepth??2},{before:()=>{var p;return(p=t.tocBefore)==null?void 0:p.call(t)},after:()=>{var p;return(p=t.tocAfter)==null?void 0:p.call(t)}}):null,(u=t.contentBefore)==null?void 0:u.call(t),i(Ls),(c=t.contentAfter)==null?void 0:c.call(t),i(kv),i(mv),Et("CommentService")?i(et("CommentService"),{darkmode:a.value}):null,(d=t.bottom)==null?void 0:d.call(t)]}))}}),Rv=B({name:"Layout",setup(){const e=rn(),t=ue(),n=de(),r=ye(),{isMobile:a}=xr(),o=k(()=>{var s,l;return((s=t.value.blog)==null?void 0:s.sidebarDisplay)||((l=e.value.blog)==null?void 0:l.sidebarDisplay)||"mobile"});return()=>[i(Ps),i(Is,{},{default:()=>r.value.home?i(vv):i(A1,()=>i(Sv,{key:n.value.path})),...o.value!=="none"?{navScreenBottom:()=>i(et("BloggerInfo"))}:{},...!a.value&&o.value==="always"?{sidebar:()=>i(et("BloggerInfo"))}:{}})]}}),wv=B({name:"NotFoundHint",setup(){const e=ue(),t=()=>{const n=e.value.routeLocales.notFoundMsg;return n[Math.floor(Math.random()*n.length)]};return()=>i("div",{class:"not-found-hint"},[i("p",{class:"error-code"},"404"),i("h1",{class:"error-title"},e.value.routeLocales.notFoundTitle),i("p",{class:"error-hint"},t())])}}),Tv=B({name:"NotFound",slots:Object,setup(e,{slots:t}){const n=Rt(),r=ue(),{navigate:a}=yo({to:r.value.home??n.value});return()=>[i(Ps),i(Is,{noSidebar:!0},()=>{var o;return i("main",{id:"main-content",class:"vp-page not-found"},((o=t.default)==null?void 0:o.call(t))||[i(wv),i("div",{class:"actions"},[i("button",{type:"button",class:"action-button",onClick:()=>{window.history.go(-1)}},r.value.routeLocales.back),i("button",{type:"button",class:"action-button",onClick:()=>a()},r.value.routeLocales.home)])])})]}});const Iv={BiliBili:'<svg xmlns="http://www.w3.org/2000/svg" class="icon bilibili-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1296db"/><path fill="#fff" d="M745.363 177.725a47 47 0 0 1 0 66.3L702.5 286.85h44A141 141 0 0 1 887 427.512v281.25a141 141 0 0 1-141 140.626H277.25A141 141 0 0 1 137 708.763v-281.25a141 141 0 0 1 141-141h43.725l-42.788-42.825a47 47 0 1 1 66.263-66.3l99.45 99.45c2.963 2.962 5.438 6.187 7.425 9.637h120.487c1.988-3.45 4.5-6.75 7.463-9.675l99.413-99.45a47 47 0 0 1 66.3 0zm1.012 203.25h-468.75a47 47 0 0 0-46.763 43.388l-.112 3.525v281.25c0 24.712 19.125 44.962 43.387 46.724l3.488.15h468.75a47 47 0 0 0 46.763-43.387l.112-3.487v-281.25c0-26-21-47-47-46.876zm-375 93.75c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47zm281.25 0c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47z"/></svg>',Email:'<svg xmlns="http://www.w3.org/2000/svg" class="icon email-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1384FF"/><path fill="#fff" d="M270.077 286.233H751.99c32.933 0 59.86 24.855 60.274 55.51l-301.023 157L210.217 341.88c.207-30.723 26.927-55.717 59.86-55.717zm-59.929 115.714-.276 277.756c0 30.931 27.134 56.2 60.205 56.2H751.99c33.14 0 60.274-25.269 60.274-56.2V401.81L518.283 551.492a15.88 15.88 0 0 1-14.43 0L210.148 401.947z"/></svg>',GitHub:'<svg xmlns="http://www.w3.org/2000/svg" class="icon github-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#171515"/><path fill="#fff" d="M509.423 146.442c-200.317 0-362.756 162.42-362.756 362.8 0 160.266 103.936 296.24 248.109 344.217 18.139 3.327 24.76-7.872 24.76-17.486 0-8.613-.313-31.427-.49-61.702-100.912 21.923-122.205-48.63-122.205-48.63-16.495-41.91-40.28-53.067-40.28-53.067-32.937-22.51 2.492-22.053 2.492-22.053 36.407 2.566 55.568 37.386 55.568 37.386 32.362 55.438 84.907 39.43 105.58 30.143 3.296-23.444 12.667-39.43 23.032-48.498-80.557-9.156-165.246-40.28-165.246-179.297 0-39.604 14.135-71.988 37.342-97.348-3.731-9.178-16.18-46.063 3.556-96.009 0 0 30.46-9.754 99.76 37.19 28.937-8.048 59.97-12.071 90.823-12.211 30.807.14 61.843 4.165 90.822 12.21 69.26-46.944 99.663-37.189 99.663-37.189 19.792 49.946 7.34 86.831 3.61 96.01 23.25 25.359 37.29 57.742 37.29 97.347 0 139.366-84.82 170.033-165.637 179.013 13.026 11.2 24.628 33.342 24.628 67.182 0 48.498-.445 87.627-.445 99.521 0 9.702 6.535 20.988 24.945 17.444 144.03-48.067 247.881-183.95 247.881-344.175 0-200.378-162.442-362.798-362.802-362.798z"/></svg>',Twitter:'<svg xmlns="http://www.w3.org/2000/svg" class="icon twitter-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#3397db"/><path fill="#fff" d="M808.325 346.204c-18.128 16.702-25.664 25.257-25.664 25.257s6.518 130.151-61.715 230.362-156.427 160.296-284.542 173.128c-128.114 12.832-211.623-39.31-211.623-39.31s56.012-3.259 91.86-16.906c35.644-13.85 86.97-49.901 86.97-49.901s-72.917-22.609-99.191-47.865c-26.275-25.46-32.793-40.532-32.793-40.532l72.103-1.019s-75.77-40.532-97.36-72.306-24.44-63.141-24.44-63.141l55.4 22.405s-46.032-62.938-52.55-111.82 8.352-75.159 8.352-75.159 23.423 44.199 119.967 93.082 178.017 46.032 178.017 46.032-31.163-108.154 64.363-156.02 161.11 32.997 161.11 32.997 16.703-4.481 29.127-9.166c12.425-4.48 30.348-12.832 30.348-12.832l-29.33 52.754 45.421-4.889s-5.703 8.147-23.83 24.85z"/></svg>',Wechat:'<svg xmlns="http://www.w3.org/2000/svg" class="icon wechat-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1AC88E"/><path fill="#fff" d="M827.551 578.742a176.583 176.583 0 0 0-185.685-158.379 172.942 172.942 0 0 0-186.3 158.379 172.942 172.942 0 0 0 185.686 158.379 282.169 282.169 0 0 0 65.536-10.923l60.689 32.768-16.384-54.613a166.275 166.275 0 0 0 76.458-125.611zm-245.76-27.307a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.307 21.845 24.872 24.872 0 0 1-27.921 21.845h.614zm121.356 0a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.306 21.845 24.872 24.872 0 0 1-28.512 21.845h1.206z"/><path fill="#fff" d="M623.662 400.953h21.23A222.709 222.709 0 0 0 419.772 245.6a208.145 208.145 0 0 0-223.323 189.94 182.044 182.044 0 0 0 89.201 150.483l-22.436 67.356 78.279-39.435a389.575 389.575 0 0 0 78.279 10.923h20.616a163.226 163.226 0 0 1-6.667-46.718 182.044 182.044 0 0 1 189.94-177.197zm-121.379-60.69a27.921 27.921 0 1 1 0 55.843 31.562 31.562 0 0 1-33.36-27.921 31.562 31.562 0 0 1 34.59-27.921h-1.23zM346.34 396.107a31.562 31.562 0 0 1-33.383-27.921 31.562 31.562 0 0 1 33.383-27.921 27.921 27.921 0 1 1 0 55.842z"/></svg>'},Lv={category:{"/":{path:"/category/",map:{betxin:{path:"/category/betxin/",keys:["v-1f902b80"]},tutorial:{path:"/category/tutorial/",keys:["v-79877d44","v-6f8bc77d","v-5da90d53","v-76b39f2f","v-6621bbf2","v-00e31ada","v-5c5ebc19","v-4931fef0","v-18827cdf","v-5e01f85f","v-dd654f5e","v-e0cf009c","v-e438b1da","v-e7a26318","v-46709ae2","v-7eae6995","v-51ce692c","v-a115b05a","v-fead0b28","v-6e1e1211","v-56bd5e7e","v-1de1766a","v-6bd45cce","v-ed510016"]},Golang笔记:{path:"/category/golang%E7%AC%94%E8%AE%B0/",keys:["v-5ac20bf9"]},c:{path:"/category/c/",keys:["v-5b6f1d36"]},linux:{path:"/category/linux/",keys:["v-5b6f1d36"]},golang:{path:"/category/golang/",keys:["v-6b316540"]},record:{path:"/category/record/",keys:["v-f29e4144"]},rust:{path:"/category/rust/",keys:["v-5ff9675f"]},years:{path:"/category/years/",keys:["v-75b021da"]},learn:{path:"/category/learn/",keys:["v-6d02af8e"]},thinking:{path:"/category/thinking/",keys:["v-1eb20697","v-5316d9fc","v-f94547aa","v-69799310","v-6ecc2a70","v-508e0582","v-6c2f3742","v-650ae6ea","v-3e8c5afb","v-5d6d81ad","v-0e92e1ec","v-7057c552","v-63abedbc","v-27098123","v-6056606e","v-21ddef20","v-7e425500","v-321ca414","v-2cbfa890","v-51eb093a","v-1c41ff49","v-48804d80","v-374fb63b"]},value:{path:"/category/value/",keys:["v-6162d44c"]},privacy:{path:"/category/privacy/",keys:["v-ca8f39fa","v-0230ae44"]},time:{path:"/category/time/",keys:["v-4f026ee2"]},develop:{path:"/category/develop/",keys:["v-8b9fe7ba","v-423b1ad8"]},run:{path:"/category/run/",keys:["v-3a828186"]}}}},tag:{"/":{path:"/tag/",map:{econonics:{path:"/tag/econonics/",keys:["v-47a75f3e"]},"betxin-rules":{path:"/tag/betxin-rules/",keys:["v-1f902b80"]},docker:{path:"/tag/docker/",keys:["v-51ce692c"]},network:{path:"/tag/network/",keys:["v-5b6f1d36","v-374fb63b"]},leetcode:{path:"/tag/leetcode/",keys:["v-1de1766a","v-6bd45cce","v-ed510016"]},backtrack:{path:"/tag/backtrack/",keys:["v-ed510016"]},"dynamic-programming":{path:"/tag/dynamic-programming/",keys:["v-6bd45cce"]},offer:{path:"/tag/offer/",keys:["v-1de1766a"]},golang:{path:"/tag/golang/",keys:["v-79877d44","v-6f8bc77d","v-5da90d53","v-76b39f2f","v-6621bbf2","v-00e31ada","v-5c5ebc19","v-4931fef0","v-18827cdf","v-5e01f85f","v-dd654f5e","v-e0cf009c","v-e438b1da","v-e7a26318","v-6b316540","v-a115b05a","v-6e1e1211"]},concurrency:{path:"/tag/concurrency/",keys:["v-6b316540"]},mysql:{path:"/tag/mysql/",keys:["v-56bd5e7e"]},redis:{path:"/tag/redis/",keys:["v-46709ae2","v-f29e4144","v-75b021da","v-fead0b28"]},consistency:{path:"/tag/consistency/",keys:["v-46709ae2","v-75b021da"]},rust:{path:"/tag/rust/",keys:["v-5ff9675f"]},blockchain:{path:"/tag/blockchain/",keys:["v-374fb63b","v-191e3f24"]},"white-noise":{path:"/tag/white-noise/",keys:["v-47375370"]},music:{path:"/tag/music/",keys:["v-47375370"]},imagine:{path:"/tag/imagine/",keys:["v-5376a85d"]},learn:{path:"/tag/learn/",keys:["v-6d02af8e"]},thinging:{path:"/tag/thinging/",keys:["v-374fb63b","v-6d02af8e"]},thinking:{path:"/tag/thinking/",keys:["v-1eb20697","v-5316d9fc","v-f94547aa","v-69799310","v-6ecc2a70","v-508e0582","v-6c2f3742","v-650ae6ea","v-3e8c5afb","v-5d6d81ad","v-0e92e1ec","v-7057c552","v-63abedbc","v-27098123","v-6056606e","v-21ddef20","v-7e425500","v-321ca414","v-2cbfa890","v-51eb093a","v-1c41ff49","v-48804d80"]},secure:{path:"/tag/secure/",keys:["v-0230ae44","v-6162d44c"]},value:{path:"/tag/value/",keys:["v-6162d44c"]},privacy:{path:"/tag/privacy/",keys:["v-ca8f39fa","v-0230ae44"]},time:{path:"/tag/time/",keys:["v-4f026ee2"]},wechat:{path:"/tag/wechat/",keys:["v-ca8f39fa"]},develop:{path:"/tag/develop/",keys:["v-8b9fe7ba"]},run:{path:"/tag/run/",keys:["v-3a828186"]},long_termism:{path:"/tag/long-termism/",keys:["v-3a828186"]},internet:{path:"/tag/internet/",keys:["v-423b1ad8"]},future:{path:"/tag/future/",keys:["v-423b1ad8"]},write:{path:"/tag/write/",keys:["v-1eb20697","v-5316d9fc","v-f94547aa","v-69799310","v-6ecc2a70","v-508e0582","v-6c2f3742","v-650ae6ea","v-3e8c5afb","v-5d6d81ad","v-0e92e1ec","v-7057c552","v-63abedbc","v-27098123","v-6056606e","v-21ddef20","v-7e425500","v-321ca414","v-2cbfa890","v-51eb093a"]},book:{path:"/tag/book/",keys:["v-1eb20697","v-5316d9fc","v-f94547aa"]},"top10-sort":{path:"/tag/top10-sort/",keys:["v-6e1e1211"]},mock:{path:"/tag/mock/",keys:["v-5e01f85f"]},UT:{path:"/tag/ut/",keys:["v-79877d44","v-5e01f85f"]},mockey:{path:"/tag/mockey/",keys:["v-79877d44"]},gin:{path:"/tag/gin/",keys:["v-7eae6995"]},grpc:{path:"/tag/grpc/",keys:["v-dd654f5e","v-e0cf009c","v-e438b1da","v-e7a26318"]}}}}},Pv={article:{"/":{path:"/article/",keys:["v-5ac20bf9","v-5ff9675f","v-79877d44","v-1eb20697","v-5316d9fc","v-f94547aa","v-69799310","v-6ecc2a70","v-508e0582","v-6c2f3742","v-650ae6ea","v-3e8c5afb","v-5d6d81ad","v-6f8bc77d","v-0e92e1ec","v-7057c552","v-63abedbc","v-27098123","v-5da90d53","v-6056606e","v-76b39f2f","v-6621bbf2","v-21ddef20","v-7e425500","v-321ca414","v-00e31ada","v-2cbfa890","v-51eb093a","v-5c5ebc19","v-4931fef0","v-18827cdf","v-5e01f85f","v-dd654f5e","v-e0cf009c","v-e438b1da","v-e7a26318","v-1c41ff49","v-46709ae2","v-f29e4144","v-1f902b80","v-5b6f1d36","v-48804d80","v-374fb63b","v-47a75f3e","v-6d02af8e","v-7eae6995","v-75b021da","v-6b316540","v-51ce692c","v-47375370","v-a115b05a","v-fead0b28","v-6e1e1211","v-ca8f39fa","v-56bd5e7e","v-1de1766a","v-6bd45cce","v-ed510016","v-0230ae44","v-6162d44c","v-3a828186","v-8b9fe7ba","v-423b1ad8","v-191e3f24","v-5376a85d","v-4f026ee2"]}},star:{"/":{path:"/star/",keys:["v-5ac20bf9"]}},timeline:{"/":{path:"/timeline/",keys:["v-5ac20bf9","v-5ff9675f","v-79877d44","v-1eb20697","v-5316d9fc","v-f94547aa","v-69799310","v-6ecc2a70","v-508e0582","v-6c2f3742","v-650ae6ea","v-3e8c5afb","v-5d6d81ad","v-6f8bc77d","v-0e92e1ec","v-7057c552","v-63abedbc","v-27098123","v-5da90d53","v-6056606e","v-76b39f2f","v-6621bbf2","v-21ddef20","v-7e425500","v-321ca414","v-00e31ada","v-2cbfa890","v-51eb093a","v-5c5ebc19","v-4931fef0","v-18827cdf","v-5e01f85f","v-dd654f5e","v-e0cf009c","v-e438b1da","v-e7a26318","v-1c41ff49","v-46709ae2","v-f29e4144","v-1f902b80","v-5b6f1d36","v-48804d80","v-374fb63b","v-47a75f3e","v-6d02af8e","v-7eae6995","v-75b021da","v-6b316540","v-51ce692c","v-47375370","v-a115b05a","v-fead0b28","v-6e1e1211","v-ca8f39fa","v-56bd5e7e","v-1de1766a","v-6bd45cce","v-ed510016","v-0230ae44","v-6162d44c","v-3a828186","v-8b9fe7ba","v-423b1ad8","v-191e3f24","v-5376a85d","v-4f026ee2"]}}},dl=$(Lv),w1=(e="")=>{const t=de(),n=He(),r=Rt();return k(()=>{var a;const o=e||((a=ye().value.blog)==null?void 0:a.key)||"";if(!o)return console.warn("useBlogCategory: key not found"),{path:"/",map:{}};const s=n.getRoutes();if(!dl.value[o])throw new Error(`useBlogCategory: key ${o} is invalid`);const l=dl.value[o][r.value],u={path:l.path,map:{}};for(const c in l.map){const d=l.map[c];u.map[c]={path:d.path,items:[]};for(const p of d.keys){const f=s.find(({name:h})=>h===p);if(f){const h=jn(n,f.path);u.map[c].items.push({path:h.path,info:h.meta})}}t.value.path===d.path&&(u.currentItems=u.map[c].items)}return u})},pl=$(Pv),La=(e="")=>{const t=He(),n=Rt();return k(()=>{var r;const a=e||((r=ye().value.blog)==null?void 0:r.key)||"";if(!a)return console.warn("useBlogType: key not found"),{path:"/",items:[]};if(!pl.value[a])throw new Error(`useBlogType: key ${e} is invalid`);const o=t.getRoutes(),s=pl.value[a][n.value],l={path:s.path,items:[]};for(const u of s.keys){const c=o.find(({name:d})=>d===u);if(c){const d=jn(t,c.path);l.items.push({path:d.path,info:d.meta})}}return l})},Ov={"Content-Type":"application/json"},Cv=({serverURL:e,lang:t,paths:n,signal:r})=>(({serverURL:a,lang:o,paths:s,type:l,signal:u})=>fetch(`${a}/article?path=${encodeURIComponent(s.join(","))}&type=${encodeURIComponent(l.join(","))}&lang=${o}`,{signal:u}).then(c=>c.json()))({serverURL:e,lang:t,paths:n,type:["time"],signal:r}).then(a=>Array.isArray(a)?a:[a]),Dv=e=>(({serverURL:t,lang:n,path:r,type:a,action:o})=>fetch(`${t}/article?lang=${n}`,{method:"POST",headers:Ov,body:JSON.stringify({path:r,type:a,action:o})}).then(s=>s.json()))({...e,type:"time",action:"inc"}),fl=e=>{const t=((n="")=>n.replace(/\/$/u,""))(e);return/^(https?:)?\/\//.test(t)?t:`https://${t}`},xv=e=>{e.name!=="AbortError"&&console.error(e.message)},vl=e=>e.dataset.path||e.getAttribute("id"),hl=(e,t)=>{t.forEach((n,r)=>{n.innerText=e[r].toString()})},Bv=({serverURL:e,path:t=window.location.pathname,selector:n=".waline-pageview-count",update:r=!0,lang:a=navigator.language})=>{const o=new AbortController,s=Array.from(document.querySelectorAll(n)),l=c=>{const d=vl(c);return d!==null&&t!==d},u=c=>Cv({serverURL:fl(e),paths:c.map(d=>vl(d)||t),lang:a,signal:o.signal}).then(d=>hl(d,c)).catch(xv);if(r){const c=s.filter(p=>!l(p)),d=s.filter(l);Dv({serverURL:fl(e),path:t,lang:a}).then(p=>hl(new Array(c.length).fill(p),c)),d.length&&u(d)}else u(s);return o.abort.bind(o)},Nv=()=>Bv({serverURL:{provider:"Giscus",lightTheme:"https://unpkg.com/vuepress-theme-hope@2.0.0-beta.236/templates/giscus/light.css",darkTheme:"https://unpkg.com/vuepress-theme-hope@2.0.0-beta.236/templates/giscus/dark.css",repo:"LixvYang/blog-comments",repoId:"R_kgDOJpRLYg",category:"Announcements",categoryId:"DIC_kwDOJpRLYs4CW1R-"}.serverURL});const Vv="/assets/hero-197a9d2d.jpg",T1=Symbol.for("categoryMap"),Nr=()=>{const e=ie(T1);if(!e)throw new Error("useCategoryMap() is called without provider.");return e},Mv=()=>{const e=w1("category");tt(T1,e)},Vr=()=>{const e=rn(),t=ue();return k(()=>({...e.value.blog,...t.value.blog}))},I1=Symbol.for("tagMap"),Mr=()=>{const e=ie(I1);if(!e)throw new Error("useTagMap() is called without provider.");return e},$v=()=>{const e=w1("tag");tt(I1,e)},Fv=e=>{const t=ue();return k(()=>{const{[Ae.author]:n}=e.value;return n?Ar(n):n===!1?[]:Ar(t.value.author,!1)})},Hv=e=>{const t=Nr();return k(()=>ou(e.value[Ae.category]).map(n=>({name:n,path:t.value.map[n].path})))},Gv=e=>{const t=Mr();return k(()=>su(e.value[Ae.tag]).map(n=>({name:n,path:t.value.map[n].path})))},zv=e=>k(()=>{const{[Ae.date]:t}=e.value;return fs(t)}),Kv=e=>{const t=Zn(e,"info"),n=Vr(),r=Fv(t),a=Hv(t),o=Gv(t),s=zv(t),l=zu(),u=k(()=>({author:r.value,category:a.value,date:s.value,localizedDate:t.value[Ae.localizedDate]||"",tag:o.value,isOriginal:t.value[Ae.isOriginal]||!1,readingTime:t.value[Ae.readingTime]||null,readingTimeLocale:t.value[Ae.readingTime]&&l.value?Gu(t.value[Ae.readingTime],l.value):null,pageview:e.path})),c=k(()=>n.value.articleInfo);return{info:u,items:c}},L1=Symbol(""),$r=()=>{const e=ie(L1);if(!e)throw new Error("useArticles() is called without provider.");return e},Uv=()=>{const e=La("article");tt(L1,e)},P1=Symbol(""),Os=()=>{const e=ie(P1);if(!e)throw new Error("useStars() is called without provider.");return e},jv=()=>{const e=La("star");tt(P1,e)},O1=Symbol(""),Cs=()=>{const e=ie(O1);if(!e)throw new Error("useTimelines() is called without provider.");return e},Yv=()=>{const e=La("timeline"),t=k(()=>{const n=[];return e.value.items.forEach(({info:r,path:a})=>{const o=fs(r[Ae.date]),s=o==null?void 0:o.getFullYear(),l=o?o.getMonth()+1:null,u=o==null?void 0:o.getDate();s&&l&&u&&((!n[0]||n[0].year!==s)&&n.unshift({year:s,items:[]}),n[0].items.push({date:`${l}/${u}`,info:r,path:a}))}),{...e.value,config:n.reverse()}});tt(O1,t)},Wv=()=>{Uv(),Mv(),jv(),$v(),Yv()};var qv=B({name:"SocialMedia",setup(){const e=Vr(),t=Qn(),n=k(()=>{const r=e.value.medias;return r?Jn(r).map(([a,o])=>({name:a,icon:Iv[a],url:o})):[]});return()=>n.value.length?i("div",{class:"vp-social-medias"},n.value.map(({name:r,icon:a,url:o})=>i("a",{class:"vp-social-media",href:o,rel:"noopener noreferrer",target:"_blank","aria-label":r,...t.value?{}:{"data-balloon-pos":"up"},innerHTML:a}))):null}}),Ds=B({name:"BloggerInfo",setup(){const e=Vr(),t=Xn(),n=ue(),r=$r(),a=Nr(),o=Mr(),s=Cs(),l=Dr(),u=k(()=>{var f;return e.value.name||((f=Ar(n.value.author)[0])==null?void 0:f.name)||t.value.title}),c=k(()=>e.value.avatar||n.value.logo),d=k(()=>n.value.blogLocales),p=k(()=>e.value.intro);return()=>{const{article:f,category:h,tag:g,timeline:A}=d.value,R=[[r.value.path,r.value.items.length,f],[a.value.path,rt(a.value.map).length,h],[o.value.path,rt(o.value.map).length,g],[s.value.path,s.value.items.length,A]];return i("div",{class:"vp-blogger-info",vocab:"https://schema.org/",typeof:"Person"},[i("div",{class:"vp-blogger",...p.value?{style:{cursor:"pointer"},"aria-label":d.value.intro,"data-balloon-pos":"down",role:"navigation",onClick:()=>l(p.value)}:{}},[c.value?i("img",{class:["vp-blogger-avatar",{round:e.value.roundAvatar}],src:Ie(c.value),property:"image",alt:"Blogger Avatar"}):null,u.value?i("div",{class:"vp-blogger-name",property:"name"},u.value):null,e.value.description?i("div",{class:"vp-blogger-description",innerHTML:e.value.description}):null,p.value?i("meta",{property:"url",content:Ie(p.value)}):null]),i("div",{class:"vp-blog-counts"},R.map(([_,y,O])=>i(Me,{class:"vp-blog-count",to:_},()=>[i("div",{class:"count"},y),i("div",O)]))),i(qv)])}}});const Oo=()=>i(ae,{name:"category"},()=>i("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));Oo.displayName="CategoryIcon";const Co=()=>i(ae,{name:"tag"},()=>i("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));Co.displayName="TagIcon";const xs=()=>i(ae,{name:"timeline"},()=>i("path",{d:"M511.997 70.568c-243.797 0-441.429 197.633-441.429 441.435 0 243.797 197.632 441.429 441.43 441.429S953.431 755.8 953.431 512.002c0-243.796-197.637-441.434-441.435-441.434zm150.158 609.093-15.605 15.61c-8.621 8.615-22.596 8.615-31.215 0L472.197 552.126c-4.95-4.944-4.34-14.888-4.34-24.677V247.14c0-12.19 9.882-22.07 22.07-22.07h22.07c12.19 0 22.07 9.882 22.07 22.07v273.218l128.088 128.088c8.62 8.62 8.62 22.595 0 31.215zm0 0"}));xs.displayName="TimelineIcon";const C1=()=>i(ae,{name:"slides"},()=>i("path",{d:"M896 170.667v426.666a85.333 85.333 0 0 1-85.333 85.334h-256v61.184l192.597 115.584-43.861 73.13-148.736-89.173v95.275h-85.334v-95.318l-148.736 89.216-43.861-73.13 192.597-115.627v-61.141h-256A85.333 85.333 0 0 1 128 597.333V170.667H85.333V85.333h853.334v85.334H896zm-682.667 0v426.666h597.334V170.667H213.333zM426.667 512h-85.334V341.333h85.334V512zm128 0h-85.334V256h85.334v256zm128 0h-85.334V384h85.334v128z"}));C1.displayName="SlideIcon";const D1=()=>i(ae,{name:"sticky"},()=>[i("path",{d:"m381.3 733.8l-161.9 118c-5.9 4.5-13.2 6.6-20.1 6.6-8.7 0-17.7-3.4-24.3-10-12.2-12.2-13.9-31.3-3.5-45.2l144.5-195.5-113.6-112.9c-11.1-11.1-13.2-28.4-5.5-42 5.5-8.7 52.1-76.4 155.5-51 1.8 0.3 3.5 0.3 5.6 0.7 4.2 0.3 9 0.7 14.2 1.7 21.9 3.5 60.8-13.9 94.5-42.7 32.3-27.5 53.1-59.4 53.1-81.6 0-5.2 0-10.8-0.3-16-0.7-20.8-2.1-52.8 21.5-76.4 28.1-28.1 72.9-30.6 103.9-5.2 0.6 0.3 1 1 1.7 1.7 16.7 16.3 187.5 187.2 189.3 188.9 14.5 14.6 22.9 34.4 22.9 55.3 0 20.8-8 40.2-22.9 54.8-23.7 23.6-56 22.6-77.1 21.6-4.9 0-10.5-0.4-15.7-0.4-20.8 0-45.8 14.6-70.5 41.3-34.3 37.5-55.5 85.8-53.8 107.7 0.7 6.9 2.1 19.1 2.4 20.8 25 101.4-42.7 147.6-50.7 152.8-13.9 8.4-31.6 6.3-42.7-4.8l-112.1-112.2z"})]);D1.displayName="StickyIcon";const va=()=>i(ae,{name:"article"},()=>i("path",{d:"M853.333 938.667H170.667A42.667 42.667 0 0 1 128 896V128a42.667 42.667 0 0 1 42.667-42.667h682.666A42.667 42.667 0 0 1 896 128v768a42.667 42.667 0 0 1-42.667 42.667zm-42.666-85.334V170.667H213.333v682.666h597.334zM298.667 256h170.666v170.667H298.667V256zm0 256h426.666v85.333H298.667V512zm0 170.667h426.666V768H298.667v-85.333zm256-384h170.666V384H554.667v-85.333z"}));va.displayName="ArticleIcon";const x1=()=>i(ae,{name:"book"},()=>i("path",{d:"M256 853.333h426.667A85.333 85.333 0 0 0 768 768V256a85.333 85.333 0 0 0-85.333-85.333H469.333a42.667 42.667 0 0 1 0-85.334h213.334A170.667 170.667 0 0 1 853.333 256v512a170.667 170.667 0 0 1-170.666 170.667H213.333A42.667 42.667 0 0 1 170.667 896V128a42.667 42.667 0 0 1 42.666-42.667h128A42.667 42.667 0 0 1 384 128v304.256l61.653-41.088a42.667 42.667 0 0 1 47.36 0l61.654 41.045V256A42.667 42.667 0 0 1 640 256v256a42.667 42.667 0 0 1-66.347 35.499l-104.32-69.547-104.32 69.547A42.667 42.667 0 0 1 298.667 512V170.667H256v682.666z"}));x1.displayName="BookIcon";const B1=()=>i(ae,{name:"link"},()=>i("path",{d:"M460.8 584.533c17.067 17.067 17.067 42.667 0 59.734-17.067 17.066-42.667 17.066-59.733 0-85.334-85.334-85.334-217.6 0-302.934L554.667 192C640 110.933 776.533 110.933 857.6 196.267c81.067 81.066 81.067 213.333 0 294.4l-68.267 64c0-34.134-4.266-68.267-17.066-102.4l21.333-21.334c51.2-46.933 55.467-128 4.267-179.2s-128-55.466-179.2-4.266c-4.267 0-4.267 4.266-4.267 4.266L465.067 401.067c-51.2 51.2-51.2 132.266-4.267 183.466m123.733-183.466C601.6 384 627.2 384 644.267 401.067c85.333 85.333 85.333 217.6 0 302.933l-153.6 149.333C405.333 934.4 268.8 934.4 187.733 849.067c-81.066-81.067-81.066-213.334 0-294.4l68.267-64c0 34.133 4.267 72.533 17.067 102.4L251.733 614.4C204.8 665.6 204.8 746.667 256 793.6c51.2 46.933 123.733 46.933 174.933 0l149.334-149.333c51.2-51.2 51.2-128 0-179.2-12.8-17.067-17.067-46.934 4.266-64z"}));B1.displayName="LinkIcon";const N1=()=>i(ae,{name:"project"},()=>i("path",{d:"M987.456 425.152H864V295.296a36.48 36.48 0 0 0-36.544-36.544h-360l-134.08-128.256A9.344 9.344 0 0 0 327.04 128H36.48A36.48 36.48 0 0 0 0 164.544v676.608a36.48 36.48 0 0 0 36.544 36.544h797.76a36.672 36.672 0 0 0 33.92-22.848L1021.44 475.52a36.48 36.48 0 0 0-33.92-50.304zM82.304 210.304h215.424l136.64 130.752h347.328v84.096H198.848A36.672 36.672 0 0 0 164.928 448L82.304 652.8V210.304zM808.32 795.456H108.544l118.08-292.608h699.904L808.32 795.52z"}));N1.displayName="ProjectIcon";const V1=()=>i(ae,{name:"friend"},()=>i("path",{d:"M860.16 213.333A268.373 268.373 0 0 0 512 186.027a267.52 267.52 0 0 0-348.16 404.48L428.8 855.893a118.613 118.613 0 0 0 166.4 0l264.96-265.386a267.52 267.52 0 0 0 0-377.174zM800 531.627l-264.96 264.96a32.427 32.427 0 0 1-46.08 0L224 530.347a183.04 183.04 0 0 1 0-256 182.187 182.187 0 0 1 256 0 42.667 42.667 0 0 0 60.587 0 182.187 182.187 0 0 1 256 0 183.04 183.04 0 0 1 3.413 256z"}));V1.displayName="FriendIcon";const Do=()=>i(ae,{name:"slide-down"},()=>i("path",{d:"M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"}));Do.displayName="SlideDownIcon";const M1=()=>i("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",class:"empty-icon",viewBox:"0 0 1024 1024",innerHTML:'<defs><linearGradient id="f" x1="512.342" y1="2266.13" x2="512.342" y2="666.063" gradientUnits="userSpaceOnUse"><stop offset=".919" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="g" x1="528.912" y1="774" x2="388.088" y2="612" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#e6e6e6" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="213.219" y1="721.704" x2="251.313" y2="683.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7d7d7"/><stop offset=".485" stop-color="#fafafa"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="i" x1="724.813" y1="821.718" x2="768.656" y2="777.876" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="a" x1="513.493" y1="714.594" x2="471.007" y2="544.188" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999"/><stop offset="1" stop-color="#ccc"/></linearGradient><linearGradient id="b" x1="440.156" y1="564.031" x2="508.594" y2="495.594" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="l" x1="660.988" y1="754.156" x2="608.637" y2="544.188" xlink:href="#a"/><linearGradient id="m" x1="479.188" y1="774.219" x2="649.782" y2="603.625" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="n" x1="447.121" y1="774.219" x2="394.661" y2="563.813" xlink:href="#a"/><linearGradient id="o" x1="494" y1="597" x2="628" y2="463" xlink:href="#b"/><linearGradient id="d" x1="610.485" y1="604.938" x2="697.298" y2="518.125" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="p" x1="457.438" y1="619.25" x2="353.469" y2="619.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="q" x1="542.734" y1="674.25" x2="615.672" y2="601.313" xlink:href="#b"/><linearGradient id="c" x1="627.933" y1="358.938" x2="685.192" y2="422.531" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#e6e6e6" stop-opacity=".4"/><stop offset=".443" stop-color="#fff"/><stop offset=".6" stop-color="#ccc"/></linearGradient><linearGradient id="r" x1="618.547" y1="422.531" x2="681.547" y2="359.531" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="s" x1="625" y1="441.5" x2="697" y2="369.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="t" x1="627.681" y1="361.438" x2="692.257" y2="433.156" xlink:href="#c"/><linearGradient id="u" x1="561.414" y1="735.438" x2="573.149" y2="688.375" xlink:href="#d"/><linearGradient id="v" x1="405" y1="485.875" x2="440" y2="450.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".702"/></linearGradient><linearGradient id="w" x1="404.61" y1="486.906" x2="441.86" y2="449.656" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".495" stop-color="#ccc" stop-opacity=".702"/><stop offset=".498" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".302"/></linearGradient><radialGradient id="e" cx="329.297" cy="647.578" r="8.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafafa"/><stop offset="1.2" stop-color="#e6e6e6"/></radialGradient><radialGradient id="j" cx="802.297" cy="673.578" r="8.172" xlink:href="#e"/><radialGradient id="k" cx="774.844" cy="642.75" r="5.531" xlink:href="#e"/></defs><path d="M512.33 666.07c441.828 0 800 358.18 800 800.03s-358.172 800.02-800 800.02-800-358.18-800-800.02 358.17-800.03 800-800.03z" style="fill:url(#f);fill-rule:evenodd"/><path d="m272 694 242-82 131 119-188 43z" style="fill:url(#g);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M232.391 723.534a2.4 2.4 0 0 1 2.4 2.4v17.725a2.4 2.4 0 0 1-4.8 0v-17.725a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M232.255 676.559c10.33 0 17.067 15.408 18.7 28.493 1.619 12.942-2.372 23.694-18.7 23.694-16.878 0-20.213-10.733-18.7-23.694 1.633-14.061 8.37-28.493 18.7-28.493z" style="fill:url(#h);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M745.853 826h.938a2.4 2.4 0 0 1 2.4 2.4v22.238a2.4 2.4 0 0 1-2.4 2.4h-.938a2.4 2.4 0 0 1-2.4-2.4V828.4a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M746.727 830.3c-19.438 0-23.278-9.326-21.541-20.59a34.467 34.467 0 0 1 3.289-10.369 16.628 16.628 0 0 1 0-9.112c2.889-12.327 12.059-20.911 18.356-20.911 6.56 0 15.468 9.1 18.356 20.911a14.589 14.589 0 0 1-.335 9.217 34.36 34.36 0 0 1 3.419 10.264c1.861 11.243-2.735 20.59-21.544 20.59z" style="fill:url(#i);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M328.841 654.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.109.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M328.383 653.73a6.567 6.567 0 0 0-5.2-5.027q-4.109-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#e);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M801.841 680.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.108.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M801.383 679.73a6.567 6.567 0 0 0-5.2-5.027q-4.108-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#j);fill-rule:evenodd"/><path d="M774.21 646.9a4.446 4.446 0 0 0-3.517-3.4q-2.778-.643-.023-1.383a4.443 4.443 0 0 0 3.4-3.517q.645-2.778 1.383-.023a4.443 4.443 0 0 0 3.517 3.4q2.778.645.023 1.383a4.446 4.446 0 0 0-3.4 3.517q-.645 2.78-1.383.023z" style="fill:url(#k);fill-rule:evenodd"/><path d="m385.6 714.6.158-150.658L598.9 544.174l-.158 150.658z" style="fill:url(#a);fill-rule:evenodd"/><path d="m385.474 564.031 214.763-19.383-36.171-49.067-215.559 17.634z" style="fill:url(#b);fill-rule:evenodd"/><path d="m598.744 694.832.156-150.658 71.975 59.319-.158 150.658z" style="fill:url(#l);fill-rule:evenodd"/><path d="m457.064 774.209.158-150.658 214.691-19.914-.158 150.663z" style="fill:url(#m);fill-rule:evenodd"/><path d="m384.566 714.459.158-150.659 72.5 59.75-.158 150.658z" style="fill:url(#n);fill-rule:evenodd"/><path d="M494 640s75.357-58.4 42-83-38.887 1.663-37 14 53.847 12.465 54-26c.2-49.979 75-125 75-125" style="fill:none;stroke-width:3px;stroke-dasharray:12 6;stroke:url(#o);fill-rule:evenodd"/><path d="m670.275 604.939-72.041-59.9 38.476-26.909 72.86 58.159z" style="fill:url(#d);fill-rule:evenodd"/><path d="m425.5 674.383-72.042-59.9 31.109-50.347 72.86 58.16z" style="fill:url(#p);fill-rule:evenodd"/><path d="m487.918 674.235 214.482-22.57-31.1-50.346-215.309 20.833z" style="fill:url(#q);fill-rule:evenodd"/><path style="fill:#fff;fill-rule:evenodd" d="m697.363 358.927-69.58 62.511-12.035 1.082z"/><path d="m697.363 358.927-69.58 62.511-12.035 1.082z" style="fill:url(#c);fill-rule:evenodd"/><path d="M615.748 422.52 604 413l92.089-53.46" style="fill:url(#r);fill-rule:evenodd"/><path d="m625 432 12 18 60-89" style="fill:url(#s);fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:#fff;fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:url(#t);fill-rule:evenodd"/><path d="m494.814 735.44 21.293-2.1v-6.613l-13.4 1.319v-6.965l10.977-1.08v-6.613l-10.977 1.08v-6.084l12.917-1.27v-6.525l-20.808 2.047v32.8zM521 732.863l7.054-.694v-11.241a106.361 106.361 0 0 0-1.014-11.274l.176-.017 2.645 7.586 4.453 11.553 4.32-.425 4.408-12.424 2.733-8.116.177-.018a111.811 111.811 0 0 0-1.014 11.474v11.241l7.185-.707V697l-8.552.841-5.025 14.646c-.618 1.956-1.147 4.08-1.808 6.173l-.22.022c-.617-1.968-1.146-3.987-1.808-5.818l-5.2-13.639-8.508.837v32.8zm37.213-3.661 7.891-.776v-10.889l3.835-.377c6.922-.681 12.961-4.714 12.961-12.517 0-8.111-5.951-10.082-13.181-9.371l-11.504 1.128v32.8zm7.891-17.881v-9.478l3.218-.316c3.792-.373 5.908.565 5.908 3.871 0 3.218-1.852 5.208-5.687 5.585zM594 725.682l7.891-.777v-26.274l8.905-.876v-6.524l-25.657 2.524v6.524l8.861-.871v26.274zm27.991-2.754 7.847-.772v-11.594l9.919-22.18-8.244.811-2.733 7.542c-.925 2.56-1.807 4.939-2.733 7.587l-.176.018c-.926-2.466-1.764-4.676-2.645-7.058l-2.734-7-8.375.824 9.874 20.233v11.594z" style="fill:url(#u);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M408.938 457.309a17.5 17.5 0 0 0 21.374 26.725 17.5 17.5 0 1 1-16.306-30.955 17.442 17.442 0 0 0-5.068 4.23z"/><circle cx="422.5" cy="468.375" r="17.5" style="fill:url(#v)"/><path fill="#ccc" fill-rule="evenodd" d="M391.76 451.5c-2.358 4.419 9.827 15.52 27.215 24.8 15.131 8.071 29.212 12.1 34.166 10.093-4.191 2.772-18.943-1.24-34.86-9.73-17.388-9.275-29.573-20.376-27.215-24.8a2.96 2.96 0 0 1 1.585-1.3 2.606 2.606 0 0 0-.891.937z"/><path d="M418.975 476.29c-17.388-9.275-29.573-20.376-27.215-24.8s18.363-.484 35.751 8.791 29.572 20.376 27.215 24.8-18.364.483-35.751-8.791zm31.634 5.732c1.824-3.42-8.789-12.642-23.7-20.6s-28.486-11.633-30.31-8.213 8.789 12.642 23.7 20.6 28.486 11.633 30.31 8.213zm-36.645-29.008-2.775 1.452.032 1.751 28.637 14.183.266-4.559z" style="fill:url(#w);fill-rule:evenodd"/><g class="people"><path style="fill:#f8cfad;fill-rule:evenodd" d="m612.131 676.5 1.362 3.532 3.255-2.324-1.361-3.532zM629.131 665.5l1.362 3.532 3.255-2.324-1.361-3.532z"/><path style="fill:#141a33;fill-rule:evenodd" d="m617.764 678.184-3.162-.078a11.028 11.028 0 0 0-1.034 3.454c-.258 2.006-1.177 5-.449 5.367 1.5 2.659 4.118-.215 4.118-.215s2.187-2.848 1.925-5.265c-.106-.973-1.181-1.869-1.398-3.263zM633.781 665.855l3.019.945a11.008 11.008 0 0 1-.137 3.6c-.4 1.981-.179 4.166-.986 4.277-2.283 2.03-3.827-1.533-3.827-1.533s-1.473-2.456-.444-4.659c.412-.88 1.718-1.385 2.375-2.63z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M599.935 592.534s10.293 9.761 11.95 7.564 3.536-3.463-6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M611.3 596.361c1.674-1.105 11.5 7.048 14.5 11.774s-12.705-4.36-14.632-6.776-1.54-3.893.132-4.998z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M621.815 607.988s1.809 2.549 2.433 1.756 2.475-1.064 2.449-1.138.1-.819 1.288-2.331-3.8-3.632-5.81-.494a2.556 2.556 0 0 0-.36 2.207z"/><path fill="#232c57" fill-rule="evenodd" d="M598 617s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s12.666 11.836 16 19c0 0-4.753-1.629-4 2 0 0-18.132-14.647-19-19s-9.148-18.716-12-31z"/><path d="M589 622s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s4.666 17.836 8 25c0 0-4.753-1.629-4 2 0 0-10.132-20.647-11-25s-9.148-18.716-12-31z" style="fill:#292966;fill-rule:evenodd"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M585.626 597.7s-10.292 9.761-11.95 7.563-3.536-3.463 6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M574.259 601.529c-1.675-1.105-11.5 7.049-14.5 11.774s12.7-4.36 14.631-6.775 1.543-3.894-.131-4.999z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M591.715 577.752s-.606 1.681 1.48 3.716-3.615 5.307-4.645 2.85-.48-2.716-.48-2.716z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M583.527 574.123c-.839 1.043.491 3.873 1.453 5.449s2.749 2.833 3.364 2.428 4.088-2.657 4-4-.228-3.4-.228-3.4 2.562-1.641 2.154-2.916-2.916-.154-2.916-.154a15.853 15.853 0 0 0-.227-2.224c-.189-.929-6.887-1.445-7.827 2.6s.558 1.805.227 2.217z"/><path fill="#232c57" fill-rule="evenodd" d="M584.227 567.758c2.1-.885 7.2-3.684 10.125.318s.842 4.385.989 5.294-1.894 5.69-1.341 6.63-3.865.8-4.657-1.179-2.844-.539-2.227-1.224-1.3-4.456-2.916-2.154a9.252 9.252 0 0 0 .309-1.38c-.115.192.259-3.257-.673-1.32s-2.1 1.037-3.069.762-1.8-1.118-1.071-1.689c.023-.016 2.436-3.172 4.531-4.058z"/><path d="M589 585c-2.584-.47-10.055.362-13 13 0 0 1.9 3.349 5 4s6 21 6 21 24.016 11.06 27-3c-.07-13.826-8-21-8-21s5.829-3.2 5-6-8.016-10.153-11-10-6 0-6 0-2.416 2.47-5 2z" style="fill:#f6bb07;fill-rule:evenodd"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M563.284 612.581s-.986 2.965-1.814 2.389-2.678-.3-2.675-.374-.333-.755-1.912-1.854 2.577-4.583 5.414-2.167a2.551 2.551 0 0 1 .987 2.006z"/></g>'});M1.displayName="EmptyIcon";const $1=()=>i(ae,{name:"lock"},()=>i("path",{d:"M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"}));$1.displayName="LockIcon";var Zv=B({name:"ArticleItem",props:{info:{type:Object,required:!0},path:{type:String,required:!0}},slots:Object,setup(e,{slots:t}){const n=Zn(e,"info"),{info:r,items:a}=Kv(e);return()=>{var o,s,l;const{[Ae.title]:u,[Ae.type]:c,[Ae.isEncrypted]:d=!1,[Ae.cover]:p,[Ae.excerpt]:f,[Ae.sticky]:h}=n.value,g=r.value;return i("div",{class:"vp-article-wrapper"},i("article",{class:"vp-article-item",vocab:"https://schema.org/",typeof:"Article"},[((o=t.cover)==null?void 0:o.call(t,{cover:p}))||(p?[i("img",{class:"vp-article-cover",src:Ie(p)}),i("meta",{property:"image",content:Ie(p)})]:[]),h?i(D1):null,i(Me,{to:e.path},()=>{var A;return((A=t.title)==null?void 0:A.call(t,{title:u,isEncrypted:d,type:c}))||i("header",{class:"vp-article-title"},[d?i($1):null,c===Uu.slide?i(C1):null,i("span",{property:"headline"},u)])}),((s=t.excerpt)==null?void 0:s.call(t,{excerpt:f}))||(f?i("div",{class:"vp-article-excerpt",innerHTML:f}):null),i("hr",{class:"vp-article-hr"}),((l=t.info)==null?void 0:l.call(t,{info:g}))||i(E1,{info:g,...a.value?{items:a.value}:{}})]))}}}),Xv=B({name:"Pagination",props:{total:{type:Number,default:10},perPage:{type:Number,default:10},current:{type:Number,default:1}},emits:["updateCurrentPage"],setup(e,{emit:t}){let n;const r=ue(),a=$(""),o=k(()=>r.value.paginationLocales),s=k(()=>Math.ceil(e.total/e.perPage)),l=k(()=>!!s.value&&s.value!==1),u=k(()=>s.value<7?!1:e.current>4),c=k(()=>s.value<7?!1:e.current<s.value-3),d=k(()=>{const{current:h}=e;let g=1,A=s.value;const R=[];s.value>=7&&(h<=4&&h<s.value-3?(g=1,A=5):h>4&&h>=s.value-3?(A=s.value,g=s.value-4):s.value>7&&(g=h-2,A=h+2));for(let _=g;_<=A;_++)R.push(_);return R}),p=h=>t("updateCurrentPage",h),f=h=>{const g=parseInt(h);g<=s.value&&g>0?p(g):n.pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>${o.value.errorText.replace(/\$page/g,s.value.toString())}`)};return se(()=>{n=new x3}),()=>i("div",{class:"vp-pagination"},l.value?i("div",{class:"vp-pagination-list"},[i("div",{class:"vp-pagination-number "},[e.current>1?i("div",{class:"prev",role:"navigation",unselectable:"on",onClick:()=>p(e.current-1)},o.value.prev):null,u.value?[i("div",{role:"navigation",onClick:()=>p(1)},1),i("div",{class:"ellipsis"},"...")]:null,d.value.map(h=>i("div",{key:h,class:{active:e.current===h},role:"navigation",onClick:()=>p(h)},h)),c.value?[i("div",{class:"ellipsis"},"..."),i("div",{role:"navigation",onClick:()=>p(s.value)},s.value)]:null,e.current<s.value?i("div",{class:"next",role:"navigation",unselectable:"on",onClick:()=>p(e.current+1)},o.value.next):null]),i("div",{class:"vp-pagination-nav"},[i("label",{for:"navigation-text"},`${o.value.navigate}: `),i("input",{id:"navigation-text",value:a.value,onInput:({target:h})=>{a.value=h.value},onKeydown:h=>{h.key==="Enter"&&(h.preventDefault(),f(a.value))}}),i("button",{class:"vp-pagination-button",role:"navigation",title:o.value.action,onClick:()=>f(a.value)},o.value.action)])]):[])}}),Bs=B({name:"ArticleList",props:{items:{type:Array,default:()=>[]}},setup(e){const t=wt(),n=He(),r=Vr(),a=$(1),o=k(()=>r.value.articlePerPage||10),s=k(()=>e.items.slice((a.value-1)*o.value,a.value*o.value)),l=u=>{a.value=u;const c={...t.query};c.page===u.toString()||u===1&&!c.page||(u===1?delete c.page:c.page=u.toString(),n.push({path:t.path,query:c}).then(()=>{Nv()}))};return se(()=>{const{page:u}=t.query;l(u?Number(u):1),re(a,()=>{const c=document.querySelector("#article-list").getBoundingClientRect().top+window.scrollY;setTimeout(()=>{window.scrollTo(0,c)},100)}),re(()=>t.query,({page:c})=>{l(c?Number(c):1)})}),()=>i("div",{id:"article-list",class:"vp-article-list"},s.value.length?[...s.value.map(({info:u,path:c},d)=>i(ge,{appear:!0,delay:d*.04},()=>i(Zv,{key:c,info:u,path:c}))),i(Xv,{current:a.value,perPage:o.value,total:e.items.length,onUpdateCurrentPage:l})]:i(M1))}}),Ns=B({name:"CategoryList",setup(){const e=de(),t=Nr();return()=>i("ul",{class:"vp-category-list"},Jn(t.value.map).map(([n,{path:r,items:a}])=>i("li",{class:["vp-category",`vp-category${Ta(n,9)}`,{active:r===e.value.path}]},i(Me,{to:r},()=>[n,i("span",{class:"count"},a.length)]))))}}),Vs=B({name:"TagList",setup(){const e=ye(),t=Mr(),n=r=>{var a;return r===((a=e.value.blog)==null?void 0:a.name)};return()=>i("ul",{class:"tag-list-wrapper"},Jn(t.value.map).map(([r,{path:a,items:o}])=>i("li",{class:["tag",`tag${Ta(r,9)}`,{active:n(r)}]},i(Me,{to:a},()=>[r,i("span",{class:"tag-num"},o.length)]))))}}),Jv=B({name:"TimelineList",setup(){const e=ue(),t=Cs(),n=Dr(),r=k(()=>e.value.blogLocales.timeline);return()=>i("div",{class:"timeline-list-wrapper"},[i("div",{class:"timeline-list-title",onClick:()=>n(t.value.path)},[i(xs),i("span",{class:"num"},t.value.items.length),r.value]),i("hr"),i("div",{class:"timeline-content"},i("ul",{class:"timeline-list"},t.value.config.map(({year:a,items:o},s)=>i(ge,{appear:!0,delay:.08*(s+1)},()=>i("li",[i("h3",{class:"timeline-year"},a),i("ul",{class:"timeline-year-wrapper"},o.map(({date:l,info:u,path:c})=>i("li",{class:"timeline-item"},[i("span",{class:"timeline-date"},l),i(Me,{class:"timeline-title",to:c},()=>u[Ae.title])])))])))))])}}),F1=B({name:"InfoList",setup(){const e=ue(),t=$r(),n=Nr(),r=k(()=>rt(n.value.map).length),a=Os(),o=Mr(),s=k(()=>rt(o.value.map).length),l=Dr(),u=$("article"),c=k(()=>e.value.blogLocales),d=[["article",va],["category",Oo],["tag",Co],["timeline",xs]];return()=>i("div",{class:"vp-blog-infos"},[i("div",{class:"vp-blog-type-switcher"},d.map(([p,f])=>i("button",{type:"button",class:"vp-blog-type-button",onClick:()=>{u.value=p}},i("div",{class:["icon-wrapper",{active:u.value===p}],"aria-label":c.value[p],"data-balloon-pos":"up"},i(f))))),i(ge,()=>u.value==="article"?i("div",{class:"vp-sticky-article-wrapper"},[i("div",{class:"title",onClick:()=>l(t.value.path)},[i(va),i("span",{class:"num"},t.value.items.length),c.value.article]),i("hr"),i("ul",{class:"vp-sticky-articles"},a.value.items.map(({info:p,path:f},h)=>i(ge,{appear:!0,delay:.08*(h+1)},()=>i("li",{class:"vp-sticky-article"},i(Me,{to:f},()=>p[Ae.title])))))]):u.value==="category"?i("div",{class:"vp-category-wrapper"},[r.value?i("div",{class:"title",onClick:()=>l(n.value.path)},[i(Oo),i("span",{class:"num"},r.value),c.value.category]):null,i("hr"),i(ge,{delay:.04},()=>i(Ns))]):u.value==="tag"?i("div",{class:"vp-tag-wrapper"},[s.value?i("div",{class:"title",onClick:()=>l(o.value.path)},[i(Co),i("span",{class:"num"},s.value),c.value.tag]):null,i("hr"),i(ge,{delay:.04},()=>i(Vs))]):i(ge,()=>i(Jv)))])}}),Pa=B({name:"BlogWrapper",slots:Object,setup(e,{slots:t}){const{isMobile:n}=xr();return()=>[i(Ps),i(Is,{noSidebar:!0,noToc:!0},{default:()=>t.default(),navScreenBottom:()=>i(Ds),...n.value?{sidebar:()=>i(F1)}:{}})]}});const H1=()=>i("aside",{class:"vp-blog-info-wrapper"},[i(ge,()=>i(Ds)),i(ge,{delay:.04},()=>i(F1))]);H1.displayName="InfoPanel";var Oa=H1,Qv=B({name:"BlogPage",components:{CategoryList:Ns,TagList:Vs},setup(){const e=de(),t=ye(),n=Nr(),r=Mr(),a=k(()=>t.value.blog||{}),o=k(()=>{const{key:l=""}=a.value;return l==="category"?"CategoryList":l==="tag"?"TagList":null}),s=k(()=>{const{name:l="",key:u=""}=a.value;return u==="category"?l?n.value.map[l].items:[]:u==="tag"?l?r.value.map[l].items:[]:[]});return()=>i(Pa,()=>i("div",{class:"vp-page vp-blog"},i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[i(ge,()=>o.value?i(et(o.value)):null),a.value.name?i(ge,{appear:!0,delay:.24},()=>i(Bs,{key:e.value.path,items:s.value})):null]),i(ge,{delay:.16},()=>i(Oa,{key:"blog"}))])))}}),e5=B({name:"BlogHero",slots:Object,setup(e,{slots:t}){const n=ye(),r=Xn(),a=Le(),o=k(()=>n.value.heroFullScreen??!1),s=k(()=>{const{heroText:u,heroImage:c,heroImageDark:d,heroAlt:p,heroImageStyle:f,tagline:h}=n.value;return{text:u??r.value.title??"Hello",image:c?Ie(c):null,imageDark:d?Ie(d):null,heroStyle:f,alt:p||u||"hero image",tagline:h??"",isFullScreen:o.value}}),l=k(()=>{const{bgImage:u,bgImageDark:c,bgImageStyle:d}=n.value;return{image:pe(u)?Ie(u):u===!1?null:Vv,imageDark:pe(c)?Ie(c):null,bgStyle:d,isFullScreen:o.value}});return()=>{var u,c;return n.value.hero===!1?null:i("div",{ref:a,class:["vp-blog-hero",{fullscreen:o.value,"no-bg":!l.value.image}]},[((u=t.heroBg)==null?void 0:u.call(t,l.value))||[l.value.image?i("div",{class:["vp-blog-mask",{light:l.value.imageDark}],style:[{background:`url(${l.value.image}) center/cover no-repeat`},l.value.bgStyle]}):null,l.value.imageDark?i("div",{class:"vp-blog-mask dark",style:[{background:`url(${l.value.imageDark}) center/cover no-repeat`},l.value.bgStyle]}):null],((c=t.heroInfo)==null?void 0:c.call(t,s.value))||[i(ge,{appear:!0,type:"group",delay:.04},()=>[s.value.image?i("img",{key:"light",class:["vp-blog-hero-image",{light:s.value.imageDark}],style:s.value.heroStyle,src:s.value.image,alt:s.value.alt}):null,s.value.imageDark?i("img",{key:"dark",class:"vp-blog-hero-image dark",style:s.value.heroStyle,src:s.value.imageDark,alt:s.value.alt}):null]),i(ge,{appear:!0,delay:.08},()=>s.value.text?i("h1",{class:"vp-blog-hero-title"},s.value.text):null),i(ge,{appear:!0,delay:.12},()=>s.value.tagline?i("p",{class:"vp-blog-hero-description",innerHTML:s.value.tagline}):null)],s.value.isFullScreen?i("button",{type:"button",class:"slide-down-button",onClick:()=>{window.scrollTo({top:a.value.clientHeight,behavior:"smooth"})}},[i(Do),i(Do)]):null])}}});const t5=["link","article","book","project","friend"];var n5=B({name:"ProjectPanel",components:{ArticleIcon:va,BookIcon:x1,FriendIcon:V1,LinkIcon:B1,ProjectIcon:N1},setup(){const e=ye(),t=Qn(),n=Dr(),r=(a="",o="icon")=>t5.includes(a)?i(et(`${a}-icon`)):En(a)?i("img",{class:"vp-project-image",src:a,alt:o}):Ia(a)?i("img",{class:"vp-project-image",src:Ie(a),alt:o}):i(Ue,{icon:a});return()=>{var a;return(a=e.value.projects)!=null&&a.length?i("div",{class:"vp-project-panel"},e.value.projects.map(({icon:o,link:s,name:l,desc:u},c)=>i("div",{class:["vp-project-card",{[`project${c%9}`]:!t.value}],onClick:()=>n(s)},[r(o,l),i("div",{class:"vp-project-name"},l),i("div",{class:"vp-project-desc"},u)]))):null}}}),r5=B({name:"BlogHome",setup(){const e=$r();return()=>i("div",{class:"vp-page vp-blog"},[i(e5),i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[i(ge,{appear:!0,delay:.16},()=>i(n5)),i(ge,{appear:!0,delay:.24},()=>i(Bs,{items:e.value.items}))]),i(ge,{appear:!0,delay:.16},()=>i(Oa,{key:"blog"}))]),i(ge,{appear:!0,delay:.28},()=>i(Ls))])}}),a5=B({name:"BlogHome",setup(){return()=>i(Pa,()=>i(r5))}}),G1=B({name:"ArticleType",setup(){const e=de(),t=Rt(),n=ue(),r=$r(),a=Os(),o=k(()=>{const s=n.value.blogLocales;return[{text:s.all,path:r.value.path},{text:s.star,path:a.value.path},...[].map(({key:l,path:u})=>({text:s[l],path:u.replace(/^\//,t.value)}))]});return()=>i("ul",{class:"vp-article-type-wrapper"},o.value.map(s=>i("li",{class:["vp-article-type",{active:s.path===e.value.path}]},i(Me,{to:s.path},()=>s.text))))}}),o5=B({name:"BlogPage",setup(){const e=La(),t=ye(),n=de(),r=$r(),a=Os(),o=k(()=>{const{key:s="",type:l}=t.value.blog||{};return s==="star"?a.value.items:l==="type"&&s?e.value.items:r.value.items});return()=>i(Pa,()=>i("div",{class:"vp-page vp-blog"},i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[i(ge,()=>i(G1)),i(ge,{appear:!0,delay:.24},()=>i(Bs,{key:n.value.path,items:o.value}))]),i(ge,{delay:.16},()=>i(Oa,{key:"blog"}))])))}}),s5=B({name:"TimelineItems",setup(){const e=Vr(),t=ue(),n=Cs(),r=k(()=>e.value.timeline||t.value.blogLocales.timelineTitle),a=k(()=>n.value.config.map(({year:o})=>({title:o.toString(),level:2,slug:o.toString(),children:[]})));return()=>i("div",{class:"timeline-wrapper"},i("ul",{class:"timeline-content"},[i(ge,()=>i("li",{class:"motto"},r.value)),i(y1,{items:a.value}),n.value.config.map(({year:o,items:s},l)=>i(ge,{appear:!0,delay:.08*(l+1),type:"group"},()=>[i("h3",{key:"title",id:o,class:"timeline-year-title"},i("span",o)),i("li",{key:"content",class:"timeline-year-list"},[i("ul",{class:"timeline-year-wrapper"},s.map(({date:u,info:c,path:d})=>i("li",{class:"timeline-item"},[i("span",{class:"timeline-date"},u),i(Me,{class:"timeline-title",to:d},()=>c[Ae.title])])))])]))]))}}),i5=B({name:"Timeline",components:{ArticleType:G1,CategoryList:Ns,TagList:Vs},setup(){return()=>i(Pa,()=>i("div",{class:"vp-page vp-blog"},i("div",{class:"blog-page-wrapper"},[i("main",{id:"main-content",class:"vp-blog-main"},[i(ge,{appear:!0,delay:.24},()=>i(s5))]),i(ge,{delay:.16},()=>i(Oa,{key:"blog"}))])))}});const Rn="./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),no=Array.from({length:64},(e,t)=>t),Qr=e=>Array(e).fill(-1),Ht=[...Qr(46),0,1,...no.slice(54,64),...Qr(7),...no.slice(2,28),...Qr(6),...no.slice(28,54),...Qr(5)],ml=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],gl=[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946,1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055,3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504,976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462],z1=[1332899944,1700884034,1701343084,1684370003,1668446532,1869963892],xo=(e,t)=>{if(t<=0||t>e.length)throw Error(`Illegal len: ${t}`);let n=0,r,a;const o=[];for(;n<t;){if(r=e[n++]&255,o.push(Rn[r>>2&63]),r=(r&3)<<4,n>=t){o.push(Rn[r&63]);break}if(a=e[n++]&255,r|=a>>4&15,o.push(Rn[r&63]),r=(a&15)<<2,n>=t){o.push(Rn[r&63]);break}a=e[n++]&255,r|=a>>6&3,o.push(Rn[r&63]),o.push(Rn[a&63])}return o.join("")},l5=(e,t)=>{if(t<=0)throw Error(`Illegal len: ${t}`);const n=e.length;let r=0,a=0,o,s,l,u,c,d;const p=[];for(;r<n-1&&a<t&&(d=e.charCodeAt(r++),o=d<Ht.length?Ht[d]:-1,d=e.charCodeAt(r++),s=d<Ht.length?Ht[d]:-1,!(o==-1||s==-1||(c=o<<2>>>0,c|=(s&48)>>4,p.push(String.fromCharCode(c)),++a>=t||r>=n)||(d=e.charCodeAt(r++),l=d<Ht.length?Ht[d]:-1,l==-1)||(c=(s&15)<<4>>>0,c|=(l&60)>>2,p.push(String.fromCharCode(c)),++a>=t||r>=n)));)d=e.charCodeAt(r++),u=d<Ht.length?Ht[d]:-1,c=(l&3)<<6>>>0,c|=u,p.push(String.fromCharCode(c)),++a;return p.map(f=>f.charCodeAt(0))},c5=(e,t)=>{let n=null;for(typeof e=="number"&&(n=e,e=()=>null);n!==null||(n=e())!==null;)n<128?t(n&127):n<2048?(t(n>>6&31|192),t(n&63|128)):n<65536?(t(n>>12&15|224),t(n>>6&63|128),t(n&63|128)):(t(n>>18&7|240),t(n>>12&63|128),t(n>>6&63|128),t(n&63|128)),n=null},u5=(e,t)=>{let n,r=null;for(;(n=r!==null?r:e())!==null;){if(n>=55296&&n<=57343&&(r=e())!==null&&r>=56320&&r<=57343){t((n-55296)*1024+r-56320+65536),r=null;continue}t(n)}r!==null&&t(r)},d5=(e,t)=>{u5(e,function(n){c5(n,t)})},p5=typeof process<"u"&&process&&typeof process.nextTick=="function"?typeof setImmediate=="function"?setImmediate:process.nextTick:setTimeout,f5=e=>{const t=[];let n=0;return d5(()=>n>=e.length?null:e.charCodeAt(n++),r=>{t.push(r)}),t},kr=(e,t,n,r)=>{let a,o=e[t],s=e[t+1];return o^=n[0],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[1],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[2],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[3],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[4],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[5],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[6],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[7],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[8],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[9],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[10],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[11],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[12],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[13],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[14],a=r[o>>>24],a+=r[256|o>>16&255],a^=r[512|o>>8&255],a+=r[768|o&255],s^=a^n[15],a=r[s>>>24],a+=r[256|s>>16&255],a^=r[512|s>>8&255],a+=r[768|s&255],o^=a^n[16],e[t]=s^n[16+1],e[t+1]=o,e},In=(e,t)=>{let n=0;for(let r=0;r<4;++r)n=n<<8|e[t]&255,t=(t+1)%e.length;return{key:n,offp:t}},_l=(e,t,n)=>{const r=t.length,a=n.length;let o=0,s=[0,0],l;for(let u=0;u<r;u++)l=In(e,o),o=l.offp,t[u]=t[u]^l.key;for(let u=0;u<r;u+=2)s=kr(s,0,t,n),t[u]=s[0],t[u+1]=s[1];for(let u=0;u<a;u+=2)s=kr(s,0,t,n),n[u]=s[0],n[u+1]=s[1]},v5=(e,t,n,r)=>{const a=n.length,o=r.length;let s=0,l=[0,0],u;for(let c=0;c<a;c++)u=In(t,s),s=u.offp,n[c]=n[c]^u.key;s=0;for(let c=0;c<a;c+=2)u=In(e,s),s=u.offp,l[0]^=u.key,u=In(e,s),s=u.offp,l[1]^=u.key,l=kr(l,0,n,r),n[c]=l[0],n[c+1]=l[1];for(let c=0;c<o;c+=2)u=In(e,s),s=u.offp,l[0]^=u.key,u=In(e,s),s=u.offp,l[1]^=u.key,l=kr(l,0,n,r),r[c]=l[0],r[c+1]=l[1]},El=(e,t,n,r,a)=>{const o=z1.slice(),s=o.length;if(n<4||n>31){const f=new Error(`Illegal number of rounds (4-31): ${n}`);if(r===!1)return Promise.reject(f);throw f}if(t.length!==16){const f=new Error(`Illegal salt length: ${t.length} != 16`);if(r===!1)return Promise.reject(f);throw f}n=1<<n>>>0;let l,u,c=0,d;Int32Array?(l=new Int32Array(ml),u=new Int32Array(gl)):(l=ml.slice(),u=gl.slice()),v5(t,e,l,u);const p=()=>{if(a&&a(c/n),c<n){const f=Date.now();for(;c<n&&(c=c+1,_l(e,l,u),_l(t,l,u),!(Date.now()-f>100)););}else{for(c=0;c<64;c++)for(d=0;d<s>>1;d++)kr(o,d<<1,l,u);const f=[];for(c=0;c<s;c++)f.push((o[c]>>24&255)>>>0),f.push((o[c]>>16&255)>>>0),f.push((o[c]>>8&255)>>>0),f.push((o[c]&255)>>>0);return r===!1?Promise.resolve(f):f}if(r===!1)return new Promise(f=>p5(()=>{p().then(f)}))};if(r===!1)return p();{let f;for(;;)if(typeof(f=p())<"u")return f||[]}},h5=e=>{try{let t;return(self.crypto||self.msCrypto).getRandomValues(t=new Uint32Array(e)),Array.prototype.slice.call(t)}catch{throw Error("WebCryptoAPI is not available")}},m5=(e=10)=>{if(typeof e!="number")throw Error("Illegal arguments: "+typeof e);e<4?e=4:e>31&&(e=31);const t=[];return t.push("$2a$"),e<10&&t.push("0"),t.push(e.toString()),t.push("$"),t.push(xo(h5(16),16)),t.join("")};function g5(e,t,n,r){if(typeof e!="string"||typeof t!="string"){const h=new Error("Invalid string / salt: Not a string");if(n===!1)return Promise.reject(h);throw h}let a,o;if(t.charAt(0)!=="$"||t.charAt(1)!=="2"){const h=new Error("Invalid salt version: "+t.substring(0,2));if(n===!1)return Promise.reject(h);throw h}if(t.charAt(2)==="$")a=String.fromCharCode(0),o=3;else{if(a=t.charAt(2),a!=="a"&&a!=="b"&&a!=="y"||t.charAt(3)!=="$"){const h=Error("Invalid salt revision: "+t.substring(2,4));if(n===!1)return Promise.reject(h);throw h}o=4}if(t.charAt(o+2)>"$"){const h=new Error("Missing salt rounds");if(n===!1)return Promise.reject(h);throw h}const s=parseInt(t.substring(o,o+1),10)*10,l=parseInt(t.substring(o+1,o+2),10),u=s+l,c=t.substring(o+3,o+25);e+=a>="a"?"\0":"";const d=f5(e),p=l5(c,16),f=h=>{const g=[];return g.push("$2"),a>="a"&&g.push(a),g.push("$"),u<10&&g.push("0"),g.push(u.toString()),g.push("$"),g.push(xo(p,p.length)),g.push(xo(h,z1.length*4-1)),g.join("")};return n===!1?El(d,p,u,!1,r).then(h=>f(h)):f(El(d,p,u,!0,r))}const _5=(e,t=10)=>{if(typeof t=="number"&&(t=m5(t)),typeof e!="string"||typeof t!="string")throw Error("Illegal arguments: "+typeof e+", "+typeof t);return g5(e,t,!0)},Bo=(e,t)=>{if(typeof e!="string"||typeof t!="string")throw Error("Illegal arguments: "+typeof e+", "+typeof t);return t.length!==60?!1:_5(e,t.substring(0,t.length-31))===t},K1=()=>i(ae,{name:"lock"},()=>i("path",{d:"M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"}));K1.displayName="LockIcon";var U1=B({name:"PasswordModal",props:{full:Boolean},emits:["verify"],setup(e,{emit:t}){const n=ye(),r=ue(),a=$(""),o=$(!1),s=$(!1),l=k(()=>r.value.encryptLocales);let u=null;const c=()=>{u&&clearTimeout(u),o.value=!1,t("verify",a.value,s.value),Jt().then(()=>{o.value=!0,u=setTimeout(()=>{o.value=!1},1e3)})};return()=>i("div",{class:["vp-decrypt-layer",{expand:e.full||n.value.home}]},i("div",{class:"vp-decrypt-modal"},[i("div",{class:["vp-decrypt-hint",{tried:o.value}]},o.value?l.value.errorHint:i(K1,{"aria-label":l.value.iconLabel})),i("div",{class:"vp-decrypt-input"},[i("input",{type:"password",value:a.value,placeholder:l.value.placeholder,onInput:({target:d})=>{a.value=d.value},onKeydown:({key:d})=>{d==="Enter"&&c()}})]),i("div",{class:"vp-remember-password"},[i("input",{type:"checkbox",value:s.value,onChange:()=>s.value=!s.value}),l.value.remember]),i("button",{type:"button",class:"vp-decrypt-submit",onClick:()=>c()},"OK")]))}});const j1=()=>{const e=rn();return k(()=>e.value.encrypt||{})},yl="VUEPRESS_HOPE_GLOBAL_TOKEN",E5=()=>{const e=j1(),t=yn(yl,""),n=bu(yl,""),r=k(()=>{const{global:o=!1,admin:s=[]}=e.value;return o&&s.length>0}),a=k(()=>{if(r.value){if(t.value)return e.value.admin.some(o=>Bo(t.value,o));if(n.value)return e.value.admin.some(o=>Bo(n.value,o))}return!1});return{isEncrypted:r,isDecrypted:a,validate:(o,s=!1)=>{(s?t:n).value=o}}},ro=(e="",t)=>!!e&&Bo(e,t),bl="VUEPRESS_HOPE_PATH_TOKEN",y5=()=>{const e=de(),t=j1(),n=yn(bl,{}),r=bu(bl,{}),a=s=>Lr(t.value.config)?rt(t.value.config).filter(l=>hn(decodeURI(s),l)).sort((l,u)=>u.length-l.length):[],o=s=>{const l=a(s);if(l.length>0){const{config:u={}}=t.value;return{isEncrypted:!0,isDecrypted:l.some(c=>n.value[c]&&u[c].some(d=>ro(n.value[c],d))||r.value[c]&&u[c].some(d=>ro(r.value[c],d)))}}return{isDecrypted:!1,isEncrypted:!1}};return{status:k(()=>o(e.value.path)),getStatus:o,validate:(s,l=!1)=>{const{config:u={}}=t.value,c=a(e.value.path);for(const d of c)if(u[d].filter(p=>ro(s,p))){(l?n:r).value[d]=s;break}}}};var b5=B({name:"GlobalEncrypt",slots:Object,setup(e,{slots:t}){const{isDecrypted:n,isEncrypted:r,validate:a}=E5(),o=$(!1);return se(()=>{o.value=!0}),()=>i(A1,()=>r.value?o.value?n.value?t.default():i(U1,{full:!0,onVerify:a}):null:t.default())}}),A5=B({name:"LocalEncrypt",slots:Object,setup(e,{slots:t}){const{status:n,validate:r}=y5(),a=$(!1);return se(()=>{a.value=!0}),()=>{const{isEncrypted:o,isDecrypted:s}=n.value;return o?a.value?s?t.default()||null:i(U1,{full:!0,onVerify:r}):null:t.default()||null}}});var k5=B({name:"SlidePage",setup(){const e=He(),t=$(!1),n=Le(),r=()=>{t.value=!t.value},a=()=>{t.value=!1},o=()=>{a(),window.history.go(-1)},s=()=>{a(),e.push("/")};return _u(n,a),()=>i("div",{class:"vp-reveal-page"},[i(cs),i("div",{ref:n,class:["vp-reveal-menu",{active:t.value}]},[i("button",{type:"button",class:"menu-button",onClick:()=>r()},i("span",{class:"icon"})),i("button",{type:"button",class:"back-button",onClick:()=>o()},i(o6)),i("button",{type:"button",class:"home-button",onClick:()=>s()},i(s6))])])}});S4(Ue);const S5=at({enhance:({app:e,router:t})=>{const{scrollBehavior:n}=t.options;t.options.scrollBehavior=async(...r)=>(await b1().wait(),n(...r)),Lf(e),e.component("HopeIcon",Ue),e.component("VPLink",Me),e.component("BloggerInfo",Ds),e.component("GlobalEncrypt",b5),e.component("LocalEncrypt",A5)},setup:()=>{Pf(),xf(),Wv()},layouts:{Layout:Rv,NotFound:Tv,BlogCategory:Qv,BlogHome:a5,BlogType:o5,Timeline:i5,Slide:k5}}),R5=()=>i(ae,{name:"heading"},()=>i("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));R5.displayName="HeadingIcon";const w5=()=>i(ae,{name:"heart"},()=>i("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));w5.displayName="HeartIcon";const T5=()=>i(ae,{name:"history"},()=>i("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));T5.displayName="HistoryIcon";const I5=()=>i(ae,{name:"title"},()=>i("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));I5.displayName="TitleIcon";const Ms=()=>i(ae,{name:"search"},()=>i("path",{d:"M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"}));Ms.displayName="SearchIcon";const Y1=()=>i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",preserveAspectRatio:"xMidYMid",viewBox:"0 0 100 100"},[i("circle",{cx:"28",cy:"75",r:"11",fill:"currentColor"},i("animate",{attributeName:"fill-opacity",begin:"0s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),i("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 47a28 28 0 0 1 28 28"},i("animate",{attributeName:"stroke-opacity",begin:"0.1s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),i("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 25a50 50 0 0 1 50 50"},i("animate",{attributeName:"stroke-opacity",begin:"0.2s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"}))]);Y1.displayName="LoadingIcon";const W1=({hint:e})=>i("div",{class:"search-pro-result-wrapper loading"},[i(Y1),e]);W1.displayName="SearchLoading";const L5='<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',$s={searchDelay:150,suggestDelay:0,queryHistoryCount:5,resultHistoryCount:5,hotKeys:[{key:"k",ctrl:!0},{key:"/",ctrl:!0}],worker:"search-pro.worker.js"},A8={},q1=$s.hotKeys,Fs={"/":{cancel:"取消",placeholder:"搜索",search:"搜索",searching:"搜索中",defaultTitle:"文档",select:"选择",navigate:"切换",autocomplete:"自动补全",exit:"关闭",history:"搜索历史",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}};new URL("data:application/javascript;base64,aW1wb3J0e3NlYXJjaCBhcyBrLGdldFN0b3JlZEZpZWxkcyBhcyBDLGF1dG9TdWdnZXN0IGFzIFIsbG9hZEpTT05JbmRleCBhcyB3fWZyb20ic2xpbXNlYXJjaCI7aW1wb3J0IFQgZnJvbSJAdGVtcC9zZWFyY2gtcHJvL2luZGV4IjtpbXBvcnR7ZW50cmllcyBhcyAkfWZyb20idnVlcHJlc3Mtc2hhcmVkL2NsaWVudCI7Y29uc3QgZD0obCxlKT0+e2NvbnN0IG49bC50b0xvd2VyQ2FzZSgpLHM9ZS50b0xvd2VyQ2FzZSgpLG89W107bGV0IHQ9MCxhPTA7Y29uc3QgaT0oYyx1PSExKT0+e2xldCByPSIiO2E9PT0wP3I9Yy5sZW5ndGg+MjA/YOKApiAke2Muc2xpY2UoLTIwKX1gOmM6dT9yPWMubGVuZ3RoK2E+MTAwP2Ake2Muc2xpY2UoMCwxMDAtYSl94oCmIGA6YzpyPWMubGVuZ3RoPjIwP2Ake2Muc2xpY2UoMCwyMCl9IOKApiAke2Muc2xpY2UoLTIwKX1gOmMsciYmby5wdXNoKHIpLGErPXIubGVuZ3RoLHV8fChvLnB1c2goWyJtYXJrIixlXSksYSs9ZS5sZW5ndGgsYT49MTAwJiZvLnB1c2goIiDigKYiKSl9O2xldCBwPW4uaW5kZXhPZihzLHQpO2lmKHA9PT0tMSlyZXR1cm4gbnVsbDtmb3IoO3A+PTA7KXtjb25zdCBjPXArcy5sZW5ndGg7aWYoaShsLnNsaWNlKHQscCkpLHQ9YyxhPjEwMClicmVhaztwPW4uaW5kZXhPZihzLHQpfXJldHVybiBhPDEwMCYmaShsLnNsaWNlKHQpLCEwKSxvfSx4PS9bXHU0ZTAwLVx1OWZhNV0vZyxTPShsPXt9KT0+KHtmdXp6eTouMixwcmVmaXg6ITAscHJvY2Vzc1Rlcm06ZT0+e2NvbnN0IG49ZS5tYXRjaCh4KXx8W10scz1lLnJlcGxhY2UoeCwiIikudG9Mb3dlckNhc2UoKTtyZXR1cm4gcz9bcywuLi5uXTpbLi4ubl19LC4uLmx9KSxFPShsLGUpPT5lLmNvbnRlbnRzLnJlZHVjZSgobixbLHNdKT0+bitzLDApLWwuY29udGVudHMucmVkdWNlKChuLFssc10pPT5uK3MsMCksRj0obCxlKT0+TWF0aC5tYXgoLi4uZS5jb250ZW50cy5tYXAoKFssbl0pPT5uKSktTWF0aC5tYXgoLi4ubC5jb250ZW50cy5tYXAoKFssbl0pPT5uKSksTT0obCxlLG49e30pPT57Y29uc3Qgcz17fTtyZXR1cm4gayhlLGwsUyh7Ym9vc3Q6e2g6Mix0OjEsYzo0fSwuLi5ufSkpLmZvckVhY2gobz0+e2NvbnN0e2lkOnQsdGVybXM6YSxzY29yZTppfT1vLHA9dC5pbmNsdWRlcygiQCIpLGM9dC5pbmNsdWRlcygiIyIpLFt1LHJdPXQuc3BsaXQoL1sjQF0vKSx7Y29udGVudHM6Zn09c1t1XT8/PXt0aXRsZToiIixjb250ZW50czpbXX07aWYocClmLnB1c2goW3t0eXBlOiJjdXN0b21GaWVsZCIsa2V5OnUsaW5kZXg6cixkaXNwbGF5OmEubWFwKGc9Pm8uYy5tYXAoaD0+ZChoLGcpKSkuZmxhdCgpLmZpbHRlcihnPT5nIT09bnVsbCl9LGldKTtlbHNle2NvbnN0IGc9YS5tYXAoaD0+ZChvLmgsaCkpLmZpbHRlcihoPT5oIT09bnVsbCk7aWYoZy5sZW5ndGgmJmYucHVzaChbe3R5cGU6Yz8iaGVhZGluZyI6InRpdGxlIixrZXk6dSwuLi5jJiZ7YW5jaG9yOnJ9LGRpc3BsYXk6Z30saV0pLCJ0ImluIG8pZm9yKGNvbnN0IGggb2Ygby50KXtjb25zdCB5PWEubWFwKG09PmQoaCxtKSkuZmlsdGVyKG09Pm0hPT1udWxsKTt5Lmxlbmd0aCYmZi5wdXNoKFt7dHlwZToidGV4dCIsa2V5OnUsLi4uYyYme2FuY2hvcjpyfSxkaXNwbGF5Onl9LGldKX19fSksJChzKS5zb3J0KChbLG9dLFssdF0pPT5TRUFSQ0hfUFJPX1NPUlRfU1RSQVRFR1k9PT0idG90YWwiP0Uobyx0KTpGKG8sdCkpLm1hcCgoW28se3RpdGxlOnQsY29udGVudHM6YX1dKT0+e2lmKCF0KXtjb25zdCBpPUMoZSxvKTtpJiYodD1pLmgpfXJldHVybnt0aXRsZTp0LGNvbnRlbnRzOmEubWFwKChbaV0pPT5pKX19KX0sTz0obCxlLG49e30pPT5SKGUsbCxTKG4pKS5tYXAoKHtzdWdnZXN0aW9uOnN9KT0+cyk7c2VsZi5vbm1lc3NhZ2U9YXN5bmMoe2RhdGE6e3R5cGU6bD0iYWxsIixxdWVyeTplLGxvY2FsZTpuLG9wdGlvbnM6c319KT0+e2NvbnN0e2RlZmF1bHQ6b309YXdhaXQgVFtuXSgpLHQ9dyhvLHtmaWVsZHM6WyJoIiwidCIsImMiXSxzdG9yZUZpZWxkczpbImgiLCJ0IiwiYyJdfSk7bD09PSJzdWdnZXN0Ij9zZWxmLnBvc3RNZXNzYWdlKE8oZSx0LHMpKTpsPT09InNlYXJjaCI/c2VsZi5wb3N0TWVzc2FnZShNKGUsdCxzKSk6c2VsZi5wb3N0TWVzc2FnZSh7c3VnZ2VzdGlvbnM6TyhlLHQscykscmVzdWx0czpNKGUsdCxzKX0pfTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwCg==",self.location);let P5={};const Z1=Symbol(""),O5=()=>ie(Z1),C5=e=>{e.provide(Z1,P5)},D5=()=>{const e=new Worker(`/${$s.worker}`,{}),t=[];return e.addEventListener("message",({data:n})=>{const{resolve:r}=t.shift();r(n)}),{search:n=>new Promise((r,a)=>{e.postMessage(n),t.push({resolve:r,reject:a})}),terminate:()=>{e.terminate(),t.forEach(({reject:n})=>n(new Error("Worker has been terminated.")))}}};const x5=(e,t=!1)=>{const n=$(0),r=k(()=>e.value[n.value]),a=()=>{n.value=n.value>0?n.value-1:e.value.length-1},o=()=>{n.value=n.value<e.value.length-1?n.value+1:0};return re(e,()=>{t||(n.value=0)}),{index:n,item:r,prev:a,next:o}},Hs=Symbol(""),B5=()=>{const e=$(!1);tt(Hs,e)},N5=e=>e instanceof Element?document.activeElement===e&&(["TEXTAREA","SELECT","INPUT"].includes(e.tagName)||e.hasAttribute("contenteditable")):!1,V5=e=>q1.some(t=>{const{key:n,ctrl:r=!1,shift:a=!1,alt:o=!1,meta:s=!1}=t;return n===e.key&&r===e.ctrlKey&&a===e.shiftKey&&o===e.altKey&&s===e.metaKey}),M5='<svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>',$5='<svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>',F5='<svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>',H5='<svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>',G5=e=>{const t=$([]);{const n=O5(),r=Rt();se(()=>{const a=_s(l=>{l?o({type:"suggest",query:l,locale:r.value,options:n}).then(u=>{t.value=u.length?hn(u[0],l)&&!u[0].slice(l.length).includes(" ")?u:[l,...u]:[]}).catch(u=>{console.error(u)}):t.value=[]},$s.suggestDelay),{search:o,terminate:s}=D5();re([e,r],()=>a(e.value),{immediate:!0}),Qt(()=>{s()})})}return{suggestions:t}},ao=q1[0];var z5=B({name:"SearchBox",setup(){const e=tn(Fs),t=ie(Hs),n=$(!1),r=k(()=>ao?[(n.value?["⌃","⇧","⌥","⌘"]:["Ctrl","Shift","Alt","Win"]).filter((a,o)=>ao[["ctrl","shift","alt","meta"][o]]),ao.key.toUpperCase()]:null);return Ce("keydown",a=>{!t.value&&V5(a)&&!N5(a.target)&&(a.preventDefault(),t.value=!0)}),se(()=>{const{userAgent:a}=navigator;n.value=k3(a)||A3(a)||b3(a)}),()=>[i("button",{type:"button",class:"search-pro-button",role:"search","aria-label":e.value.search,onClick:()=>{t.value=!0}},[i(Ms),i("div",{class:"search-pro-placeholder"},e.value.search),r.value?i("div",{class:"search-pro-key-hints"},r.value.map(a=>i("kbd",{class:"search-pro-key"},a))):null])]}});const K5=b({loader:()=>v(()=>import("./SearchResult-755dfd0c.js"),[]),loadingComponent:()=>{const e=tn(Fs);return i(W1,{hint:e.value.loading})}});var U5=B({name:"SearchModal",setup(){const e=ie(Hs),t=Xn(),n=vu(),r=tn(Fs),a=$(""),{suggestions:o}=G5(a),s=$(!1),{index:l,prev:u,next:c}=x5(o),d=Le(),p=Le(),f=(h=l.value)=>{a.value=o.value[h],s.value=!1};return Ce("keydown",h=>{s.value?h.key==="ArrowUp"?u():h.key==="ArrowDown"?c():h.key==="Enter"?f():h.key==="Escape"&&(s.value=!1):h.key==="Escape"&&(e.value=!1)}),se(()=>{const h=ys(document.body);re(e,g=>{h.value=g,g&&Jt().then(()=>{var A;(A=d.value)==null||A.focus()})}),_u(p,()=>{s.value=!1}),Qt(()=>{h.value=!1})}),()=>e.value?i("div",{class:"search-pro-modal-wrapper"},[i("div",{class:"search-pro-mask",onClick:()=>{e.value=!1,a.value=""}}),i("div",{class:"search-pro-modal"},[i("div",{class:"search-pro-box"},[i("form",[i("label",{for:"search-pro","aria-label":r.value.search},i(Ms)),i("input",{ref:d,type:"search",class:"search-pro-input",id:"search-pro",placeholder:r.value.placeholder,spellcheck:"false",autocapitalize:"off",autocomplete:"off",autocorrect:"off",name:`${t.value.title}-search`,value:a.value,"aria-controls":"search-pro-results",onKeydown:h=>{const{key:g}=h;o.value.length&&(g==="Tab"?(f(),h.preventDefault()):(g==="ArrowDown"||g==="ArrowUp"||g==="Escape")&&h.preventDefault())},onInput:({target:h})=>{a.value=h.value,s.value=!0,l.value=0}}),a.value?i("button",{type:"reset",class:"search-pro-clear-button",innerHTML:L5,onClick:()=>{a.value=""}}):null,s.value&&o.value.length?i("ul",{class:"search-pro-suggestions",ref:p},o.value.map((h,g)=>i("li",{class:["search-pro-suggestion",{active:g===l.value}],onClick:()=>{f(g)}},[i("kbd",{class:"search-pro-auto-complete",title:`Tab ${r.value.autocomplete}`},"Tab"),h]))):null]),i("button",{type:"button",class:"search-pro-close-button",onClick:()=>{e.value=!1,a.value=""}},r.value.cancel)]),i(K5,{query:a.value,isFocusing:!s.value,onClose:()=>{e.value=!1},onUpdateQuery:h=>{a.value=h}}),n.value?null:i("div",{class:"search-pro-hints"},[i("span",{class:"search-pro-hint"},[i("kbd",{innerHTML:M5}),r.value.select]),i("span",{class:"search-pro-hint"},[i("kbd",{innerHTML:F5}),i("kbd",{innerHTML:$5}),r.value.navigate]),i("span",{class:"search-pro-hint"},[i("kbd",{innerHTML:H5}),r.value.exit])])])]):null}}),j5=at({enhance({app:e}){C5(e),e.component("SearchBox",z5)},setup(){B5()},rootComponents:[U5]});const ea=[tp,m4,k4,I4,O4,B4,F4,Y4,e6,tf,pf,_f,S5,j5],Y5=[["v-8daa1a0e","/",{y:"p",t:"主页",i:"home"},["/README.md"]],["v-4b17c12f","/archives.html",{y:"p",t:"归档内容",i:"share"},[":md"]],["v-184f4da6","/intro.html",{y:"p",t:"关于",i:"info"},[":md"]],["v-47a75f3e","/posts/econonics/Perfect-competition.html",{d:16536096e5,l:"2022年5月27日",g:["econonics"],o:!0,e:`<h1> 完全竞争假设</h1>
<p>在经济学领域里对市场的划分有四个档次，分别是完全竞争市场、垄断竞争市场、寡头垄断市场、完全垄断市场。当然我列出的名词从字面上也可以大致理解个具体，但这不妨碍我还是要说明一下。</p>
<p>Wikipedia的页面最近重新设计了，之前像是上个世纪的Web的纯html页面，很杂，现在则有一种现代感的简洁美，好评一下。以下我内容进行总结自Wiki页面，当然为了防止知识传播的二次消耗，我还是在名字中加上一个链接。</p>
<p><a href="https://zh.m.wikipedia.org/zh/%E5%AE%8C%E5%85%A8%E7%AB%9E%E4%BA%89" target="_blank" rel="noopener noreferrer">完全竞争市场</a>：买卖双方的规模足够大，每个人都是价格的接收者，而且因为市场规模足够大，每个个体都无法左右价格的市场，就称为完全竞争市场。比如我们常见的菜市场，一颗大白菜的价格整个市场都差不多，各个白菜之间近乎无差异，所以在完全竞争市场里，没有一个个体可以左右市场价格。</p>`,r:{minutes:5.22,words:1565},y:"a",t:"完全竞争假设",i:"edit"},[":md"]],["v-4ba4912a","/posts/thinking/",{y:"p",t:"思考",i:"question"},["/posts/thinking/README.md"]],["v-1f902b80","/posts/program/betxin/betxin-rules.html",{d:16663968e5,l:"2022年10月22日",c:["betxin"],g:["betxin-rules"],o:!0,e:`<h1> Betxin 规则</h1>
<h2> Betxin</h2>
<p><span id="top"></span></p>
<h2> Menu</h2>
<p>Start:</p>
<ul>
<li><a href="#intro">Intro</a></li>
<li><a href="#overview">OverView</a></li>
<li><a href="#page">page</a></li>
</ul>
<p><span id="intro"></span></p>
<h1> 介绍</h1>
<h2> 什么是Betxin?</h2>
<p>Betxin是一个信息交易市场平台,你可以在这里交易世界上最受争议的话题例如(病毒、政治、加密货币、实事等)。在Betxin上,你可以根据自己的预测来构建投资预测组合，如果你的投资预测是正确的那么您将获得回报，当你决定在市场上进行预测投资时,你其实是在权衡自己的知识、头脑以及对未来的远见。市场比率在一定程度上反映了过去一段时间人们对未来的看法。在这里您可以根据您的预测进行购买，在预测达不到预期时也可以选择卖出。</p>`,r:{minutes:2.63,words:788},y:"a",t:"Betxin 规则",i:"edit"},[":md"]],["v-51ce692c","/posts/program/docker/Docker-get-start.html",{d:16393536e5,l:"2021年12月13日",c:["tutorial"],g:["docker"],o:!0,e:`<h1> Docker 底层技术</h1>
<p>Docker 的关键部分就是镜像,容器和仓库理解了这三个概念，就理解了 Docker 的整个生命周期。</p>
<p>Docker 在容器的基础上，进行了进一步的封装，从文件系统、网络互联到进程隔离等等，极大的简化了容器的创建和维护。使得 Docker 技术比虚拟机技术更为轻便、快捷。</p>
<p>下面的图片比较了 Docker 和传统虚拟化方式的不同之处。传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。</p>`,r:{minutes:40.7,words:12210},y:"a",t:"Docker 底层技术",i:"edit"},[":md"]],["v-5ac20bf9","/posts/program/golang/",{d:1693711577e3,c:["Golang笔记"],e:`<p>这里整理了一下我在学习Go语言过程中的笔记🚀。</p>
`,r:{minutes:.13,words:39},y:"a",t:"Golang 笔记",i:"laptop-code"},["/posts/program/golang/README.md"]],["v-77c978ab","/posts/program/rust/",{y:"p",t:"Rust 笔记",i:"laptop-code"},["/posts/program/rust/README.md"]],["v-5b6f1d36","/posts/program/c/get-start-with-c-tcp-program/get-start-with-c-tcp-program.html",{d:16573248e5,l:"2022年7月9日",c:["c","linux"],g:["network"],o:!0,e:`<h1> TCP/IP Network Program</h1>
<p>If you are learn TCP/IP network, you must have heard that CS model with this.</p>
<figure><img src="/assets/images/tcp/tcp.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>But if you are new with network programing, there are difficult.</p>`,r:{minutes:2.86,words:857},y:"a",t:"TCP/IP Network Program",i:"edit"},[":md"]],["v-ed510016","/posts/program/leetcode/leetcode/backtrack.html",{d:16358976e5,l:"2021年11月3日",c:["tutorial"],g:["leetcode","backtrack"],o:!0,e:`<h1> 回溯算法</h1>
<p><a href="https://www.programmercarl.com/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html#%E5%9B%9E%E6%BA%AF%E6%B3%95%E8%A7%A3%E5%86%B3%E7%9A%84%E9%97%AE%E9%A2%98" target="_blank" rel="noopener noreferrer">学习笔记</a></p>
<ul>
<li><a href="#%E7%BB%84%E5%90%88">组合</a></li>
<li><a href="#%E5%88%87%E5%89%B2">切割</a></li>
<li><a href="#%E5%AD%90%E9%9B%86">子集</a></li>
<li><a href="#%E6%8E%92%E5%88%97">排列</a></li>
<li><a href="#%E6%A3%8B%E7%9B%98">棋盘</a></li>
</ul>`,r:{minutes:10.6,words:3179},y:"a",t:"回溯算法",i:"edit"},[":md"]],["v-6bd45cce","/posts/program/leetcode/leetcode/dynamic-programming.html",{d:16361568e5,l:"2021年11月6日",c:["tutorial"],g:["leetcode","dynamic-programming"],o:!0,e:`<h1> 动态规划</h1>
<p><a href="https://www.programmercarl.com/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html#%E5%9B%9E%E6%BA%AF%E6%B3%95%E8%A7%A3%E5%86%B3%E7%9A%84%E9%97%AE%E9%A2%98" target="_blank" rel="noopener noreferrer">学习笔记</a></p>
<ul>
<li><a href="#%E5%9F%BA%E7%A1%80%E9%A2%98%E7%9B%AE">基础题目</a></li>
<li><a href="#%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98">背包问题</a></li>
<li><a href="#%E6%89%93%E5%AE%B6%E5%8A%AB%E8%88%8D">打家劫舍</a></li>
<li><a href="#%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98">股票问题</a></li>
<li><a href="#%E5%AD%90%E5%BA%8F%E5%88%97%E9%97%AE%E9%A2%98">子序列问题</a></li>
</ul>`,r:{minutes:55.74,words:16722},y:"a",t:"动态规划",i:"edit"},[":md"]],["v-1de1766a","/posts/program/leetcode/offer/offer.html",{d:1636848e6,l:"2021年11月14日",c:["tutorial"],g:["leetcode","offer"],o:!0,e:`<h1> 剑指offer 刷题笔记</h1>
<p>关于剑指offer,其实今年前半年刷过一次,但许久未做题就遗忘了许多,这次边做题边记录一下做题过程,一方面可以让自己忘了的时候有可以复习的地方,再者也可以让读者查看作者的写题思路,供他人参考.</p>
<ul>
<li><a href="#1">03. 数组中重复的数字</a></li>
<li><a href="#2">04. 二维数组中的查找</a></li>
<li><a href="#3">05. 替换空格</a></li>
<li><a href="#4">4</a></li>
<li><a href="#5">5</a></li>
<li><a href="#6">6</a></li>
<li><a href="#7">7</a></li>
<li><a href="#8">8</a></li>
<li><a href="#9">9</a></li>
<li><a href="#10">10</a></li>
</ul>`,r:{minutes:42.64,words:12792},y:"a",t:"剑指offer 刷题笔记",i:"edit"},[":md"]],["v-6b316540","/posts/program/golang/%E5%BA%95%E5%B1%82/currency.html",{d:16396128e5,l:"2021年12月16日",c:["golang"],g:["golang","concurrency"],o:!0,e:`<h1> Concurrency or Parallelism ?</h1>
<p>First of all, You need to know Go is a concurrent language and not a parallel one. Before discussing how concurrency is taken care in Go, we must first understand what is concurrency and how it is different from parallelism.</p>
<h3> What is concurrency?</h3>`,r:{minutes:9.05,words:2715},y:"a",t:"Concurrency or Parallelism ?",i:"edit"},["/posts/program/golang/底层/currency.html","/posts/program/golang/底层/currency.md",":md"]],["v-a115b05a","/posts/program/golang/%E5%BA%95%E5%B1%82/go-depth.html",{d:16376256e5,l:"2021年11月23日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go 语言底层剖析</h1>
<h3> GMP</h3>
<p>数据结构</p>
<ul>
<li>G — 表示 Goroutine，它是一个待执行的任务；</li>
<li>M — 表示操作系统的线程，它由操作系统的调度器调度和管理；</li>
<li>P — 表示处理器，它可以被看做运行在线程上的本地调度器；</li>
</ul>
<p>我们先在这里介绍一下不同的数据结构, 作用以及运行期间可能的状态:<br>
<img src="https://cdn.learnku.com/uploads/images/202003/11/58489/j37FX8nek9.png!large" alt="" loading="lazy"></p>`,r:{minutes:45.18,words:13553},y:"a",t:"Go 语言底层剖析",i:"edit"},["/posts/program/golang/底层/go-depth.html","/posts/program/golang/底层/go-depth.md",":md"]],["v-56bd5e7e","/posts/program/mysql/notes/mysql-notes.html",{d:16370208e5,l:"2021年11月16日",c:["tutorial"],g:["mysql"],o:!0,e:`<h1> MySQL 学习笔记</h1>
<ul>
<li><a href="#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1SQL%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%EF%BC%8C%E6%9C%9F%E9%97%B4%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88">执行一条 SQL 查询语句，期间发生了什么？</a></li>
<li><a href="#%E7%B4%A2%E5%BC%95">索引</a></li>
<li><a href="#%E5%86%85%E5%AD%98">内存</a></li>
<li><a href="#%E6%97%A5%E5%BF%97">日志</a></li>
<li><a href="#%E4%BA%8B%E5%8A%A1">事务</a></li>
<li><a href="#%E9%94%81">锁</a></li>
<li><a href="#BufferPool">说清楚Buffer Pool是啥</a></li>
</ul>`,r:{minutes:68.33,words:20498},y:"a",t:"MySQL 学习笔记",i:"edit"},[":md"]],["v-46709ae2","/posts/program/redis/cache-consistency/cache-consistency.html",{d:16689888e5,l:"2022年11月21日",c:["tutorial"],g:["redis","consistency"],o:!0,e:`<h1> 缓存一致性目录</h1>
<ul>
<li><a href="#%E7%BC%93%E5%AD%98%E4%B8%80%E8%87%B4%E6%80%A7%E7%9B%AE%E5%BD%95">缓存一致性目录</a>
<ul>
<li><a href="#%E5%BC%95%E5%85%A5%E7%BC%93%E5%AD%98%E6%8F%90%E9%AB%98%E6%80%A7%E8%83%BD">引入缓存提高性能</a></li>
<li><a href="#%E7%BC%93%E5%AD%98%E5%88%A9%E7%94%A8%E7%8E%87%E4%B8%8E%E4%B8%80%E8%87%B4%E6%80%A7%E9%97%AE%E9%A2%98">缓存利用率与一致性问题</a></li>
<li><a href="#%E5%B9%B6%E5%8F%91%E5%BC%95%E5%85%A5%E7%9A%84%E4%B8%80%E8%87%B4%E6%80%A7%E9%97%AE%E9%A2%98">并发引入的一致性问题</a></li>
<li><a href="#%E5%88%A0%E9%99%A4%E7%BC%93%E5%AD%98%E5%8F%AF%E4%BB%A5%E4%BF%9D%E8%AF%81%E4%B8%80%E8%87%B4%E6%80%A7%E5%90%97">删除缓存可以保证一致性吗</a></li>
<li><a href="#%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E4%B8%A4%E6%AD%A5%E9%83%BD%E6%89%A7%E8%A1%8C%E6%88%90%E5%8A%9F">如何保证两步都执行成功?</a></li>
<li><a href="#%E4%B8%BB%E4%BB%8E%E5%BA%93%E5%BB%B6%E8%BF%9F%E5%92%8C%E5%BB%B6%E8%BF%9F%E5%8F%8C%E5%88%A0%E9%97%AE%E9%A2%98">主从库延迟和延迟双删问题</a></li>
<li><a href="#%E5%8F%AF%E4%BB%A5%E5%81%9A%E5%88%B0%E5%BC%BA%E4%B8%80%E8%87%B4%E5%90%97">可以做到强一致吗?</a></li>
<li><a href="#%E6%80%BB%E7%BB%93">总结</a></li>
</ul>
</li>
</ul>`,r:{minutes:16.31,words:4894},y:"a",t:"缓存一致性目录",i:"edit"},[":md"]],["v-f29e4144","/posts/program/redis/datastruct/datastruct.html",{d:16689888e5,l:"2022年11月21日",c:["record"],g:["redis"],o:!0,e:`<h1> Redis 学习笔记</h1>
<h2> 数据结构与对象</h2>
<h3> SDS(简单动态字符串)</h3>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<blockquote>
<p>SDS(简单动态字符串), 是对C语言字符串封装了一层</p>
</blockquote>
</div>
<p>举个例子</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set msg "hello world"
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:127.59,words:38276},y:"a",t:"Redis 学习笔记",i:"edit"},[":md"]],["v-fead0b28","/posts/program/redis/note/redis-note.html",{d:16376256e5,l:"2021年11月23日",c:["tutorial"],g:["redis"],o:!0,e:`<h1> Redis笔记</h1>
<!-- ## 数据结构与对象

### SDS(简单动态字符串)
> SDS(简单动态字符串), 是对C语言字符串封装了一层

举个例子
\`\`\`
set msg "hello world"
OK
\`\`\`
Redis会新增一个键值对, 其中: 键值对键是保存msg的SDS, 值也是一个字符串对象SDS
\`\`\`c
struct sdshdr {
//记录buf数组中已使用字节的数量  等于SDS所保存字符串的长度
int len;
//记录buf数组中未使用字节的数量
int free;
//字节数组，用于保存字符串
char buf[];
};
\`\`\`

其中SDS保留了C字符串中最后一个字符是'\\0'的惯例, 目的是SDS可以直接重用C字符串函数库里的函数.

好处: 
1. 因为SDS内部有个len属性, 所以如果想获取字符串长度就直接返回len, 时间复杂度是O(1), 但如果用原生strlen函数 时间复杂度就是O(n)了
2. SDS不会造成缓冲区溢出,因为 SDS 在拼接字符串之前会检查 SDS 空间是否满足要求，如果空间不够会自动扩容，所以不会导致缓冲区溢出的问题, 可以减少修改字符串带来的内存重分配次数,空间预分配:当append时当SDS长度小于1MB,则再多分配一倍的空间；若大于1MB, 则多分配1MB的空间；惰性空间释放, 当需要减少SDS的空间时, 不会立刻减少, 先更新free, 这样可以避免再次分配带来的性能损耗, 当然也有真正的释放内存空间的API.
3. SDS 不仅可以保存文本数据，还可以保存二进制数据。因为 SDS 使用 len 属性的值而不是空字符来判断字符串是否结束，并且 SDS 的所有 API 都会以处理二进制的方式来处理 SDS 存放在 buf[] 数组里的数据。所以 SDS 不光能存放文本数据，而且能保存图片、音频、视频、压缩文件这样的二进制数据。

### 链表

链表在Redis中的应用非常广泛，比如列表键的底层实现之一就是链表。当一个列表键包含了数量比较多的元素，又或者列表中包含的元素都是比较长的字符串时，Redis就会使用链表作为列表键的底层实现。

每个链表节点是
\`\`\`c
typedef struct listNode {
    struct listNode * prev;
    struct listNode * next;
    void * value;
}listNode;
\`\`\`
多个listNode可以通过prev和next指针组成双端链表。
\`\`\`c
typedef struct list {
listNode * head;
listNode * tail;
// 链表所包含的节点数量
unsigned long len;
// 节点值复制函数
void *(*dup)(void *ptr);
// 节点值释放函数
void (*free)(void *ptr);
// 节点值对比函数
int (*match)(void *ptr,void *key);
} list;
\`\`\`
链表的特性: 双端, 无环, ·带表头指针和表尾指针, 带链表长度计数器

多态：链表节点使用void*指针来保存节点值，并且可以通过list结构的dup、free、match三个属性为节点值设置类型特定函数，所以链表可以用于保存各种不同类型的值。

### 字典

Redis的字典用哈希表来实现, 一个哈希表里面有多个哈希表节点, 而每个哈希表节点就保存了字典中的多个键值对

哈希表实现
\`\`\`c
typedef struct dictht {
//哈希表数组
dictEntry **table;
//哈希表大小
unsigned long size;
//哈希表大小掩码，用于计算索引值
//总是等于size-1
unsigned long sizemask;
//该哈希表已有节点的数量
unsigned long used;
} dictht;
\`\`\`
table属性是一个数组,数组每个元素指向的是dictEntry结构的指针, 每个dictEntry结构都保存着一个键值对.
size属性保存哈希表的大小, 就是table数目的大小
used保存总共的键值对个数
sizemask属性的值总是等于size-1，这个属性和哈希值一起决定一个键应该被放到table数组的哪个索引上面。

哈希节点

\`\`\`c
typedef struct dictEntry {
//键
void *key;
//值
union{
    void *val;
    uint64_tu64;
    int64_ts64;
} v;
//指向下个哈希表节点，形成链表
struct dictEntry *next;
} dictEntry;
\`\`\`

next是一个指针,这个指针可以将哈希值相同的键值对连接在一起, 来解决哈系碰撞问题.

字典实现

\`\`\`c
typedef struct dict {
//类型特定函数
dictType *type;
//私有数据
void *privdata;
//哈希表
dictht ht[2];
// rehash索引
//当rehash 不在进行时，值为-1
int rehashidx; /* rehashing not in progress if rehashidx == -1 */
} dict;
\`\`\`

type属性和privdata属性是针对不同类型的键值对，为创建多态字典而设置的：
type属性是一个指向dictType结构的指针，每个dictType结构保存了一簇用于操作特定类型键值对的函数，Redis会为用途不同的字典设置不同的类型特定函数

而privdata属性则保存了需要传给那些类型特定函数的可选参数

\`\`\`c
typedef struct dictType {
//计算哈希值的函数
unsigned int (*hashFunction)(const void *key);
//复制键的函数
void *(*keyDup)(void *privdata, const void *key);
//复制值的函数
void *(*valDup)(void *privdata, const void *obj);
//对比键的函数
int (*keyCompare)(void *privdata, const void *key1, const void *key2);
//销毁键的函数
void (*keyDestructor)(void *privdata, void *key);
//销毁值的函数
void (*valDestructor)(void *privdata, void *obj);
} dictType;
\`\`\`

ht 属 性 是 一 个 包 含 两 个 项 的 数 组 ， 数 组 中 的 每 个 项 都 是 一 个dictht哈希表，一般情况下，字典只使用ht[0]哈希表，ht[1]哈希表只会在对ht[0]哈希表进行rehash时使用。

除了ht[1]之外，另一个和rehash有关的属性就是rehashidx，它记录了rehash目前的进度，如果目前没有在进行rehash，那么它的值为-1。


rehash

当哈希表的负载因子不断变大, 就需要rehash
1）为字典的ht[1]哈希表分配空间，这个哈希表的空间大小取决于 要 执 行 的 操 作 ， 以 及 ht[0] 当 前 包 含 的 键 值 对 数 量 （ 也 即 是ht[0].used属性的值）：
- 如果执行的是扩展操作，那么ht[1]的大小为第一个大于等于ht[0].used*2的2^n（2的n次方幂）；
- 如果执行的是收缩操作，那么ht[1]的大小为第一个大于等于ht[0].used的2^n。
2）将保存在ht[0]中的所有键值对rehash到ht[1]上面：rehash指的是重新计算键的哈希值和索引值，然后将键值对放置到ht[1]哈希表的指定位置上。

哈希表的扩展与收缩

当以下条件中的任意一个被满足时，程序会自动开始对哈希表执行扩展操作：

1）服务器目前没有在执行BGSAVE命令或者BGREWRITEAOF命令，并且哈希表的负载因子大于等于1。
2）服务器目前正在执行BGSAVE命令或者BGREWRITEAOF命令，并且哈希表的负载因子大于等于5。

负载因子=哈希表已保存节点数量/哈希表大小
load_factor = ht[0].used / ht[0].size

当哈希表的负载因子小于0.1时，程序自动开始对哈希表执行收缩操作。

渐进式rehash
当哈希表里的数据很多时, 一下子瞬间rehash可能导致性能问题, 所以redis采用渐进式rehash
\`\`\`sh
1）为ht[1]分配空间，让字典同时持有ht[0]和ht[1]两个哈希表。
2）在字典中维持一个索引计数器变量rehashidx，并将它的值设置为0，表示rehash工作正式开始。
3）在rehash进行期间，每次对字典执行添加、删除、查找或者更新操作时，程序除了执行指定的操作以外，还会顺带将ht[0]哈希表在rehashidx索引上的所有键值对rehash到ht[1]，当rehash工作完成之后，程序将rehashidx属性的值增一。
4）随着字典操作的不断执行，最终在某个时间点上，ht[0]的所有键值对都会被rehash至ht[1]，这时程序将rehashidx属性的值设为-1，表示rehash操作已完成。

因为在进行渐进式rehash的过程中，字典会同时使用ht[0]和ht[1] 两 个 哈 希 表 ， 所 以 在 渐 进 式 rehash 进 行 期 间 ， 字 典 的 删 除（delete）、查找（find）、更新（update）等操作会在两个哈希表上进行。例如，要在字典里面查找一个键的话，程序会先在ht[0]里面进行查找，如果没找到的话，就会继续到ht[1]里面进行查找，诸如此类。

另外，在渐进式rehash执行期间，新添加到字典的键值对一律会被保存到ht[1]里面，而ht[0]则不再进行任何添加操作，这一措施保证了ht[0]包含的键值对数量会只减不增，并随着rehash操作的执行而最终变成空表
\`\`\`

### 跳表

跳表是一个数据结构, 通过在每个节点内维持多个指向其他节点的指针, 从而达到快速访问节点的目的, 跳跃表支持平均O（logN）、最坏O（N）复杂度的节点查找，还可以通过顺序性操作来批量处理节点。

Redis只在两个地方用到了跳跃表，一个是实现有序集合键，另一个是在集群节点中用作内部数据结构.
跳表节点的属性
\`\`\`c
typedef struct zskiplistNode {
//Zset 对象的元素值
sds ele;
//元素权重值
double score;
//后向指针
struct zskiplistNode *backward;
//节点的level数组，保存每层上的前向指针和跨度
struct zskiplistLevel {
    struct zskiplistNode *forward;
    unsigned long span;
} level[];
} zskiplistNode;
\`\`\`
level层, 指向多个元素, 每个元素都可以访问其他节点, 程序可以通过层快速定位元素每次创建一个新跳跃表节点的时候，程序都根据幂次定律随机生成一个介于1和32之间的值作为level数组的大小，这个大小就是层的“高度”。

前进指针, 每个层之间都有一个指向表尾方向的前进指针, 用于从表头向表尾方向遍历节点, 层的跨度span属性记录了两个节点之间的距离

跳表属性
\`\`\`c
typedef struct zskiplist {
struct zskiplistNode *header, *tail;
unsigned long length;
int level;
} zskiplist;
\`\`\`

### 整数集合

整数集合是集合键的实现之一, 当一个集合只包含整数值元素，并且这个集合的元素数量不多时，Redis就会使用整数集合作为集合键的底层实现。

\`\`\`c
typedef struct intset {
//编码方式
uint32_t encoding;
//集合包含的元素数量
uint32_t length;
//保存元素的数组
int8_t contents[];
} intset;
\`\`\`
整数集合（intset）是Redis用于保存整数值的集合抽象数据结构，它可以保存类型为int16_t、int32_t或者int64_t的整数值，并且保证集合中不会出现重复元素。

contents数组是整数集合的底层实现, 虽然intset结构将contents属性声明为int8_t类型的数组，但实际上contents数组并不保存任何int8_t类型的值，contents数组的真正类型取决于encoding属性的值：

encoding的属性有INTSET_ENC_INT16, INTSET_ENC_INT32, INTSET_ENC_INT64, 分别将contents的属性设置为int16_t, int32_t, int64_t

升级

每当我们要将一个新元素添加到整数集合里面，并且新元素的类型比整数集合现有所有元素的类型都要长时，整数集合需要先进行升级（upgrade），然后才能将新元素添加到整数集合里面。

因为引发升级的新元素的长度总是比整数集合现有所有元素的长度都大，所以这个新元素的值要么就大于所有现有元素，要么就小于所有现有元素：
- 在新元素小于所有现有元素的情况下，新元素会被放置在底层数组的最开头（索引0）；
- 在新元素大于所有现有元素的情况下，新元素会被放置在底层数组的最末尾（索引length-1）。

升级的好处:提升灵活性, 节省内存

不支持降级

### 压缩列表

ziplist是list和hash的底层实现之一, 当一个列表键只包含少量列表项，并且每个列表项要么就是小整数值，要么就是长度比较短的字符串，那么Redis就会使用压缩列表来做列表键的底层实现。

压缩列表是Redis为了节约内存而开发的，是由一系列特殊编码的连续内存块组成的顺序型（sequential）数据结构。一个压缩列表可以包含任意多个节点（entry），每个节点可以保存一个字节数组或者一个整数值。

压缩列表的组成
\`\`\`
压缩列表在表头有三个字段：
zlbytes，记录整个压缩列表占⽤对内存字节数；
zltail，记录压缩列表「尾部」节点距离起始地址由多少字节，也就是列表尾的偏移量；
zllen，记录压缩列表包含的节点数量；
zlend，标记压缩列表的结束点，固定值 0xFF（⼗进制255）。
\`\`\`

在压缩列表中，如果我们要查找定位第⼀个元素和最后⼀个元素，可以通过表头三个字段的⻓度直接定位，复杂度是 O(1)。⽽查找其他元素时，就没有这么⾼效了，只能逐个查找，此时的复杂度就是 O(N)了，因此压缩列表不适合保存过多的元素

压缩列表节点包含三部分内容：prevlen，记录了「前⼀个节点」的⻓度；encoding，记录了当前节点实际数据的类型以及⻓度；data，记录了当前节点的实际数据；

连锁更新

压缩列表新增某个元素或修改某个元素时，如果空间不不够，压缩列表占⽤的内存空间就需要重新分配。⽽当新插⼊的元素较⼤时，可能会导致后续元素的 prevlen 占⽤空间都发⽣变化，从⽽引起「连锁更新」问题，导致每个元素的空间都要重新分配，造成访问压缩列表性能的下降。

### 对象

Redis针对前面所说的类型建立了一个对象系统, 这个系列包括字符串对象、列表对象、哈希对象、集合对象和有序集合对象这五种类型的对象，每种对象都用到了至少一种我们前面所介绍的数据结构。

Redis的总对象类型是
\`\`\`c
typedef struct redisObject {
//类型
unsigned type:4;
//编码
unsigned encoding:4;
//指向底层实现数据结构的指针
void *ptr;
// ...
} robj;
\`\`\`

type类型记录了对象的类型, 这个熟悉可以是REDIS_STRING, REDIS_LIST...

encoding属性记录了对象底层所使用的编码, 比如list的底层对象是list或者quicklist, hash的底层对象是ziplist或hash...


## 5种常见的数据类型

### String内部实现

String的内部实现是
SDS(简单动态字符串), 是对C语言字符串封装了一层

举个例子
\`\`\`
set msg "hello world"
OK
\`\`\`

字符串对象的编码可以是int、raw或者embstr。

Redis会新增一个键值对, 其中: 键值对键是保存msg的SDS, 值也是一个字符串对象SDS
\`\`\`
struct sdshdr {
//记录buf数组中已使用字节的数量  等于SDS所保存字符串的长度
int len;
//记录buf数组中未使用字节的数量
int free;
//字节数组，用于保存字符串
char buf[];
};
\`\`\`

其中SDS保留了C字符串中最后一个字符是'\\0'的惯例, 目的是SDS可以直接重用C字符串函数库里的函数.

好处: 
1. 因为SDS内部有个len属性, 所以如果想获取字符串长度就直接返回len, 时间复杂度是O(1), 但如果用原生strlen函数 时间复杂度就是O(n)了
2. SDS不会造成缓冲区溢出,因为 SDS 在拼接字符串之前会检查 SDS 空间是否满足要求，如果空间不够会自动扩容，所以不会导致缓冲区溢出的问题, 可以减少修改字符串带来的内存重分配次数,空间预分配:当append时当SDS长度小于1MB,则再多分配一倍的空间；若大于1MB, 则多分配1MB的空间；惰性空间释放, 当需要减少SDS的空间时, 不会立刻减少, 先更新free, 这样可以避免再次分配带来的性能损耗, 当然也有真正的释放内存空间的API.
3. SDS 不仅可以保存文本数据，还可以保存二进制数据。因为 SDS 使用 len 属性的值而不是空字符来判断字符串是否结束，并且 SDS 的所有 API 都会以处理二进制的方式来处理 SDS 存放在 buf[] 数组里的数据。所以 SDS 不光能存放文本数据，而且能保存图片、音频、视频、压缩文件这样的二进制数据。

#### 命令
| 命令 | 描述 |
| - | - |
| SET KEY VALUE |	设置指定 KEY 的值 |
| GET KEY |	获取指定 KEY 的值 |
| GETRANGE KEY start end  | 返回 KEY 中字符串值的子字符|
| GETSET KEY value |	将给定 KEY 的值设为 value ，并返回 KEY 的旧值|
| GETBIT KEY offset |	对 KEY 所储存的字符串值，获取指定偏移量上的位|
| MGET KEY1 [KEY2…] |	获取所有(一个或多个)给定 KEY 的值|
| SETBIT KEY offset value |	对 KEY 所储存的字符串值，设置或清除指定偏移量上的位|
| SETEX KEY seconds value |	将值 value 关联到 KEY ，并将 KEY 的过期时间设为 seconds (以秒为单位)|
| SETNX KEY value |	只有在 KEY 不存在时设置 KEY 的值|
| SETRANGE KEY offset value |	用 value 参数覆写给定 KEY 所储存的字符串值，从偏移量 offset 开始|
| STRLEN KEY |	返回 KEY 所储存的字符串值的长度|
| MSET KEY value KEY value … 	|同时设置一个或多个 KEY-value 对|
| MSETNX KEY value KEY value …  |	同时设置一个或多个 KEY-value 对，当且仅当所有给定 KEY 都不存在|
| PSETEX KEY milliseconds value |	这个命令和 SETEX 命令相似，但它以毫秒为单位设置 KEY 的生存时间|
| INCR KEY |	将 KEY 中储存的数字值增一 |
| INCRBY KEY increment |	将 KEY 所储存的值加上给定的增量值 increment|
| INCRBYFLOAT KEY increment |	将 KEY 所储存的值加上给定的浮点增量值 increment|
| DECR KEY |	将 KEY 中储存的数字值减一|
| DECRBY KEY decrement |	KEY 所储存的值减去给定的减量值 decrement|
| APPEND KEY value |	如果 KEY 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 KEY 原来值的末尾|
| BITCOUNT KEY START END 	|计算给定字符串中，被设置为 1 的比特位的数量|
| BITOP OPERATION DESTKEY KEY KEY … 	|对二进制位进行操作|

###  List 类型内部实现

List的内部实现是双向链表或者压缩列表

- 如果列表的元素个数小于 512 个（默认值，可由 list-max-ziplist-entries 配置），列表每个元素的值都小于 64 字节（默认值，可由 list-max-ziplist-value 配置），Redis 会使用压缩列表作为 List 类型的底层数据结构；
- 如果列表的元素不满足上面的条件，Redis 会使用双向链表作为 List 类型的底层数据结构；

但是在 Redis 3.2 版本之后，List 数据类型底层数据结构就只由 quicklist 实现了，替代了双向链表和压缩列表。
#### 命令

| 命令 | 描述 | 
| - | - |
| LPUSH KEY value1 value2 | 将一个或多个值插入到列表头部。 |
| LPUSHX KEY value | 将一个值插入到已存在的列表头部。 |
| RPUSH KEY value1 value2 |	将一个或多个值插入到列表尾部。 |
| RPUSHX KEY value | 将一个值插入到已存在的列表尾部。 |
| LSET KEY index value 	| 将列表索引 index 位置的值设置为 value。 |
| LINSERT KEY BEFORE AFTER pivot value | 将值 value 插入到列表 KEY 当中，位于值 pivot 之前或之后。 |
| LPOP KEY |	获取并移除列表的第一个元素。|
| RPOP KEY 	| 获取并移除列表的最后一个元素。|
| BLPOP KEY1 KEY2 timeout |	获取并移除列表的第一个元素， 如果列表没有元素会阻塞列表直到超时或有元素可弹出为止。|
| BRPOP KEY1 KEY2 timeout |	获取并移除列表的最后一个元素， 如果列表没有元素会阻塞列表直到超时或有元素可弹出为止。|
| RPOPLPUSH source destination |	移除 source 列表的最后一个元素，并将该元素添加到另一个列表 destination 的开头并返回。|
| BRPOPLPUSH source destination timeout | 1. BRPOPLPUSH 是 RPOPLPUSH 的阻塞版本。2. 当 source 有数据时，BRPOPLPUSH 的表现与 RPOPLPUSH 完全一样。3. 当 source 是空时，会阻塞列表直到超时或有元素可弹出为止。|
| LLEN KEY |	获取列表长度。|
| LINDEX KEY index |	通过索引获取列表中的元素。|
| LREM KEY count value |	从列表中移除 count 个值与 value 相等的元素。|
| LTRIM KEY start stop |	对一个列表进行修剪(trim)，只保留列表中的 start 和 stop 之间的元素。|
| LRANGE KEY start stop |	获取列表 start 和 stop 之间 的元素。|

### Hash 类型内部实现

Hash 类型的底层数据结构是由压缩列表或哈希表实现的：

- 如果哈希类型元素个数小于 512 个（默认值，可由 hash-max-ziplist-entries 配置），所有值小于 64 字节（默认值，可由 hash-max-ziplist-value 配置）的话，Redis 会使用压缩列表作为 Hash 类型的底层数据结构；
- 如果哈希类型元素不满足上面条件，Redis 会使用哈希表作为 Hash 类型的底层数据结构

在 Redis 7.0 中，压缩列表数据结构已经废弃了，交由 listpack 数据结构来实现了。

#### 命令

| 命令 |	描述 |
| - | - |
| HSET KEY field value |	将哈希表 KEY 中的字段 field 的值设为 value 。|
| HSETNX KEY field value | 只有在字段 field 不存在时，设置哈希表字段的值。 |
| HMSET KEY field1 value1 field2 value2 |	同时将多个 field-value (域-值)对设置到哈希表 KEY 中。|
| HGET KEY field |	获取存储在哈希表中指定字段的值。|
| HGETALL KEY |	获取在哈希表中指定 KEY 的所有字段和值。|
| HMGET KEY field1 field2 |	获取所有给定字段的值。|
| HKEYS KEY |	获取所有哈希表中的字段。|
| HVALS KEY |	获取哈希表中所有值。|
| HLEN KEY |	获取哈希表中字段的数量。|
| HINCRBY KEY field increment  | 为哈希表 KEY 中的指定字段的整数值加上增量 increment 。|
| HINCRBYFLOAT KEY field increment  |	为哈希表 KEY 中的指定字段的浮点数值加上增量 increment 。|
| HDEL KEY field1 field2  | 删除一个或多个哈希表字段。|
| HEXISTS KEY field | 查看哈希表 KEY 中，指定的字段是否存在。|
| HSCAN KEY cursor [MATCH pattern] [COUNT count] | 迭代哈希表中的键值对，类似 SCAN 命令。|

> Set 类型内部实现

Set 类型的底层数据结构是由哈希表或整数集合实现的：

- 如果集合中的元素都是整数且元素个数小于 512 （默认值，set-maxintset-entries配置）个，Redis 会使用整数集合作为 Set 类型的底层数据结构；
- 如果集合中的元素不满足上面条件，则 Redis 使用哈希表作为 Set 类型的底层数据结构。

当以哈希表存储时, 值为空, key就是所有的set的值

#### 命令

| 命令 | 描述 |
| - | - |
| SADD key member1 member2 | 向集合添加一个或多个成员。 |
| SCARD | key | 	获取集合的成员数。 |
| SDIFF key1 key2 |	返回给定所有集合的差集。|
| SDIFFSTORE destination key1 key2 |	返回给定所有集合的差集并存储在 destination 中。|
| SINTER key1 key2 |	返回给定所有集合的交集。|
| SINTERSTORE destination key1 key2 | 返回给定所有集合的交集并存储在 destination 中。|
| SISMEMBER key member |	判断 member 元素是否是集合 key 的成员。|
| SMEMBERS key |	返回集合中的所有成员。|
| SMOVE source destination member |	将 member 元素从 source 集合移动到 destination 集合。|
| SPOP key |	移除并返回集合中的一个随机元素。|
| SRANDMEMBER key count 	| 返回集合中一个或多个随机数。|
| SREM key member1 member2| 	移除集合中一个或多个成员。|
| SUNION key1 key2 | 	返回所有给定集合的并集。|
| SUNIONSTORE destination key1 key2 | 所有给定集合的并集存储在 destination 集合中。|
| SSCAN key cursor MATCH pattern COUNT count |	迭代集合中的元素。|


> ZSet 类型内部实现

Zset 类型的底层数据结构是由压缩列表或跳表实现的：

- 如果有序集合的元素个数小于 128 个，并且每个元素的值小于 64 字节时，Redis 会使用压缩列表作为 Zset 类型的底层数据结构；
- 如果有序集合的元素不满足上面的条件，Redis 会使用跳表作为 Zset 类型的底层数据结构；

在 Redis 7.0 中，压缩列表数据结构已经废弃了，交由 listpack 数据结构来实现了。

|命令 |-	描述|
| - | - |
|  ZADD KEY score1 member1 [score2 member2] |	向有序集合添加一个或多个成员，或者更新已存在成员的分数。|
|  ZCARD KEY |	获取有序集合的成员数。|
|  ZCOUNT KEY min max |	计算在有序集合中指定区间分数的成员数。|
|  ZINCRBY KEY increment member |	有序集合中对指定成员的分数加上增量 increment 。|
|  ZINTERSTORE destination num KEY [KEY …] |	计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 KEY 中。|
|  ZLEXCOUNT KEY min max |	在有序集合中计算指定字典区间内成员数量。|
|  ZRANGE KEY start stop [WITHSCORES] |	通过索引区间返回有序集合成指定区间内的成员。|
|  ZRANGEBYLEX KEY min max [LIMIT offset count] |	通过字典区间返回有序集合的成员。|
|  ZRANGEBYSCORE KEY min max [WITHSCORES] [LIMIT] |	通过分数返回有序集合指定区间内的成员。|
|  ZRANK KEY member |	返回有序集合中指定成员的索引。|
|  ZREM KEY member [member …] |	移除有序集合中的一个或多个成员。|
|  ZREMRANGEBYLEX KEY min max |	移除有序集合中给定的字典区间的所有成员。|
|  ZREMRANGEBYRANK KEY start stop |	移除有序集合中给定的排名区间的所有成员。|
|  ZREMRANGEBYSCORE KEY min max |	移除有序集合中给定的分数区间的所有成员。|
|  ZREVRANGE KEY start stop [WITHSCORES] |	返回有序集中指定区间内的成员，通过索引，分数从高到底。|
|  ZREVRANGEBYSCORE KEY max min [WITHSCORES] |	返回有序集中指定分数区间内的成员，分数从高到低排序。|
|  ZREVRANK KEY member |	返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序。|
|  ZSCORE KEY member |	返回有序集中，成员的分数值。|
|  ZUNIONSTORE destination numKEYs KEY [KEY …] |	计算给定的一个或多个有序集的并集，并存储在新的 KEY 中。|
|  ZSCAN KEY cursor [MATCH pattern] [COUNT count]  |	迭代有序集合中的元素（包括元素成员和元素分值）。|

## Redis线程模型

Redis单线程指的是在接受客户端请求,解析请求,进行数据读写,发送给客户端这个过程是一个线程完成的

但是，Redis 程序并不是单线程的，Redis 在启动的时候，是会启动后台线程（BIO）的

- Redis 在 2.6 版本，会启动 2 个后台线程，分别处理关闭文件、AOF 刷盘这两个任务；
- Redis 在 4.0 版本之后，新增了一个新的后台线程，用来异步释放 Redis 内存，也就是 lazyfree 线程。例如执行 unlink key / flushdb async / flushall async 等命令，会把这些删除操作交给后台线程来执行，好处是不会导致 Redis 主线程卡顿。因此，当我们要删除一个大 key 的时候，不要使用 del 命令删除，因为 del 是在主线程处理的，这样会导致 Redis 主线程卡顿，因此我们应该使用 unlink 命令来异步删除大key。

之所以 Redis 为「关闭文件、AOF 刷盘、释放内存」这些任务创建单独的线程来处理，是因为这些任务的操作都是很耗时的，如果把这些任务都放在主线程来处理，那么 Redis 主线程就很容易发生阻塞，这样就无法处理后续的请求了。

后台线程相当于一个消费者，生产者把耗时任务丢到任务队列中，消费者（BIO）不停轮询这个队列，拿出任务就去执行对应的方法即可。

## Redis 采用单线程为什么还这么快？

- Redis 的大部分操作都在内存中完成，并且采用了高效的数据结构，因此 Redis 瓶颈可能是机器的内存或者网络带宽，而并非 CPU，既然 CPU 不是瓶颈，那么自然就采用单线程的解决方案了；
- Redis 采用单线程模型可以避免了多线程之间的竞争，省去了多线程切换带来的时间和性能上的开销，而且也不会导致死锁问题。
- Redis 采用了 I/O 多路复用机制处理大量的客户端 Socket 请求，IO 多路复用机制是指一个线程处理多个 IO 流，就是我们经常听到的 select/epoll 机制。简单来说，在 Redis 只运行单线程的情况下，该机制允许内核中，同时存在多个监听 Socket 和已连接 Socket。内核会一直监听这些 Socket 上的连接请求或数据请求。一旦有请求到达，就会交给 Redis 线程处理，这就实现了一个 Redis 线程处理多个 IO 流的效果。

CPU 并不是制约 Redis 性能表现的瓶颈所在，更多情况下是受到内存大小和网络I/O的限制，所以 Redis 核心网络模型使用单线程并没有什么问题，如果你想要使用服务的多核CPU，可以在一台服务器上启动多个节点或者采用分片集群的方式。

除了上面的官方回答，选择单线程的原因也有下面的考虑。

使用了单线程后，可维护性高，多线程模型虽然在某些方面表现优异，但是它却引入了程序执行顺序的不确定性，带来了并发读写的一系列问题，增加了系统复杂度、同时可能存在线程切换、甚至加锁解锁、死锁造成的性能损耗。

在 Redis 6.0 版本之后，也采用了多个 I/O 线程来处理网络请求，这是因为随着网络硬件的性能提升，Redis 的性能瓶颈有时会出现在网络 I/O 的处理上。

所以为了提高网络 I/O 的并行度，Redis 6.0 对于网络 I/O 采用多线程来处理。但是对于命令的执行，Redis 仍然使用单线程来处理，所以大家不要误解 Redis 有多线程同时执行命令。

## Redis持久化

Redis 如何实现数据不丢失？

- AOF 日志：每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里；
- RDB 快照：将某一时刻的内存数据，以二进制的方式写入磁盘；
- 混合持久化方式：Redis 4.0 新增的方式，集成了 AOF 和 RBD 的优点；

AOF 日志是如何实现的？

Redis 在执行完一条写操作命令后，就会把该命令以追加的方式写入到一个文件里，然后 Redis 重启时，会读取该文件记录的命令，然后逐一执行命令的方式来进行数据恢复。

> 为什么先执行命令，再把数据写入日志呢？

- 避免额外的检查开销：因为如果先将写操作命令记录到 AOF 日志里，再执行该命令的话，如果当前的命令语法有问题，那么如果不进行命令语法检查，该错误的命令记录到 AOF 日志里后，Redis 在使用日志恢复数据时，就可能会出错。
- 不会阻塞当前写操作命令的执行：因为当写操作命令执行成功后，才会将命令记录到 AOF 日志。

当然，这样做也会带来风险：

- 数据可能会丢失： 执行写操作命令和记录日志是两个过程，那当 Redis 在还没来得及将命令写入到硬盘时，服务器发生宕机了，这个数据就会有丢失的风险。
- 可能阻塞其他操作： 由于写操作命令执行成功后才记录到 AOF 日志，所以不会阻塞当前命令的执行，但因为 AOF 日志也是在主线程中执行，所以当 Redis 把日志文件写入磁盘的时候，还是会阻塞后续的操作无法执行。

> AOF 写回策略有几种？
- Always，这个单词的意思是「总是」，所以它的意思是每次写操作命令执行完后，同步将 AOF 日志数据写回硬盘；
- Everysec，这个单词的意思是「每秒」，所以它的意思是每次写操作命令执行完后，先将命令写入到 AOF 文件的内核缓冲区，然后每隔一秒将缓冲区里的内容写回到硬盘；
- No，意味着不由 Redis 控制写回硬盘的时机，转交给操作系统控制写回的时机，也就是每次写操作命令执行完后，先将命令写入到 AOF 文件的内核缓冲区，再由操作系统决定何时将缓冲区内容写回硬盘。

> AOF 日志过大，会触发什么机制？

Redis 为了避免 AOF 文件越写越大，提供了 AOF 重写机制，当 AOF 文件的大小超过所设定的阈值后，Redis 就会启用 AOF 重写机制，来压缩 AOF 文件。

> RDB 快照是如何实现的呢？

因为 AOF 日志记录的是操作命令，不是实际的数据，所以用 AOF 方法做故障恢复时，需要全量把日志都执行一遍，一旦 AOF 日志非常多，势必会造成 Redis 的恢复操作缓慢。

为了解决这个问题，Redis 增加了 RDB 快照。所谓的快照，就是记录某一个瞬间东西，比如当我们给风景拍照时，那一个瞬间的画面和信息就记录到了一张照片。

所以，RDB 快照就是记录某一个瞬间的内存数据，记录的是实际数据，而 AOF 文件记录的是命令操作的日志，而不是实际的数据。

因此在 Redis 恢复数据时， RDB 恢复数据的效率会比 AOF 高些，因为直接将 RDB 文件读入内存就可以，不需要像 AOF 那样还需要额外执行操作命令的步骤才能恢复数据。

> RDB 做快照时会阻塞线程吗？

Redis 提供了两个命令来生成 RDB 文件，分别是 save 和 bgsave，他们的区别就在于是否在「主线程」里执行：

- 执行了 save 命令，就会在主线程生成 RDB 文件，由于和执行操作命令在同一个线程，所以如果写入 RDB 文件的时间太长，会阻塞主线程；
- 执行了 bgsave 命令，会创建一个子进程来生成 RDB 文件，这样可以避免主线程的阻塞；

Redis 还可以通过配置文件的选项来实现每隔一段时间自动执行一次 bgsave 命令，默认会提供以下配置：

这里提一点，Redis 的快照是全量快照，也就是说每次执行快照，都是把内存中的「所有数据」都记录到磁盘中。所以执行快照是一个比较重的操作，如果频率太频繁，可能会对 Redis 性能产生影响。如果频率太低，服务器故障时，丢失的数据会更多。

>  为什么会有混合持久化

混合持久化优点：

    混合持久化结合了 RDB 和 AOF 持久化的优点，开头为 RDB 的格式，使得 Redis 可以更快的启动，同时结合 AOF 的优点，有减低了大量数据丢失的风险。

混合持久化缺点：

    AOF 文件中添加了 RDB 格式的内容，使得 AOF 文件的可读性变得很差；
    兼容性差，如果开启混合持久化，那么此混合持久化 AOF 文件，就不能用在 Redis 4.0 之前版本了。

> Redis 如何实现服务高可用？

要想设计一个高可用的 Redis 服务，一定要从 Redis 的多服务节点来考虑，比如 Redis 的主从复制、哨兵模式、切片集群。

> 主从复制
主从复制是 Redis 高可用服务的最基础的保证，实现方案就是将从前的一台 Redis 服务器，同步数据到多台从 Redis 服务器上，即一主多从的模式，且主从服务器之间采用的是「读写分离」的方式。

主服务器可以进行读写操作，当发生写操作时自动将写操作同步给从服务器，而从服务器一般是只读，并接受主服务器同步过来写操作命令，然后执行这条命令。

也就是说，所有的数据修改只在主服务器上进行，然后将最新的数据同步给从服务器，这样就使得主从服务器的数据是一致的。

注意，主从服务器之间的命令复制是异步进行的。

具体来说，在主从服务器命令传播阶段，主服务器收到新的写命令后，会发送给从服务器。但是，主服务器并不会等到从服务器实际执行完命令后，再把结果返回给客户端，而是主服务器自己在本地执行完命令后，就会向客户端返回结果了。如果从服务器还没有执行主服务器同步过来的命令，主从服务器间的数据就不一致了。

所以，无法实现强一致性保证（主从数据时时刻刻保持一致），数据不一致是难以避免的。

> 哨兵模式

在使用 Redis 主从服务的时候，会有一个问题，就是当 Redis 的主从服务器出现故障宕机时，需要手动进行恢复。

为了解决这个问题，Redis 增加了哨兵模式（Redis Sentinel），因为哨兵模式做到了可以监控主从服务器，并且提供主从节点故障转移的功能。

> 切片集群模式

当 Redis 缓存数据量大到一台服务器无法缓存时，就需要使用 Redis 切片集群（Redis Cluster ）方案，它将数据分布在不同的服务器上，以此来降低系统对单主节点的依赖，从而提高 Redis 服务的读写性能。

Redis Cluster 方案采用哈希槽（Hash Slot），来处理数据和节点之间的映射关系。在 Redis Cluster 方案中，一个切片集群共有 16384 个哈希槽，这些哈希槽类似于数据分区，每个键值对都会根据它的 key，被映射到一个哈希槽中，具体执行过程分为两大步：

    根据键值对的 key，按照 CRC16 算法

   计算一个 16 bit 的值。
    再用 16bit 值对 16384 取模，得到 0~16383 范围内的模数，每个模数代表一个相应编号的哈希槽。

接下来的问题就是，这些哈希槽怎么被映射到具体的 Redis 节点上的呢？有两种方案：

    平均分配： 在使用 cluster create 命令创建 Redis 集群时，Redis 会自动把所有哈希槽平均分布到集群节点上。比如集群中有 9 个节点，则每个节点上槽的个数为 16384/9 个。
    手动分配： 可以使用 cluster meet 命令手动建立节点间的连接，组成集群，再使用 cluster addslots 命令，指定每个节点上的哈希槽个数。

为了方便你的理解，我通过一张图来解释数据、哈希槽，以及节点三者的映射分布关系。

集群脑裂导致数据丢失怎么办？
  什么是脑裂？
  总结一句话就是：由于网络问题，集群节点之间失去联系。主从数据不同步；重新平衡选举，产生两个主服务。等网络恢复，旧主节点会降级为从节点，再与新主节点进行同步复制的时候，由于会从节点会清空自己的缓冲区，所以导致之前客户端写入的数据丢失了。

> 解决方案

## Redis 过期删除与内存淘汰

Redis 是可以对 key 设置过期时间的，因此需要有相应的机制将已过期的键值对删除，而做这个工作的就是过期键值删除策略。

每当我们对一个 key 设置了过期时间时，Redis 会把该 key 带上过期时间存储到一个过期字典（expires dict）中，也就是说「过期字典」保存了数据库中所有 key 的过期时间。

当我们查询一个 key 时，Redis 首先检查该 key 是否存在于过期字典中：

    如果不在，则正常读取键值；
    如果存在，则会获取该 key 的过期时间，然后与当前系统时间进行比对，如果比系统时间大，那就没有过期，否则判定该 key 已过期。

Redis 使用的过期删除策略是「惰性删除+定期删除」这两种策略配和使用。

> 什么是惰性删除策略？

惰性删除策略的做法是，不主动删除过期键，每次从数据库访问 key 时，都检测 key 是否过期，如果过期则删除该 key。

惰性删除策略的优点：

    因为每次访问时，才会检查 key 是否过期，所以此策略只会使用很少的系统资源，因此，惰性删除策略对 CPU 时间最友好。

惰性删除策略的缺点：

    如果一个 key 已经过期，而这个 key 又仍然保留在数据库中，那么只要这个过期 key 一直没有被访问，它所占用的内存就不会释放，造成了一定的内存空间浪费。所以，惰性删除策略对内存不友好。

> Redis 持久化时，对过期键会如何处理的？

Redis 持久化文件有两种格式：RDB（Redis Database）和 AOF（Append Only File），下面我们分别来看过期键在这两种格式中的呈现状态。

RDB 文件分为两个阶段，RDB 文件生成阶段和加载阶段。

    RDB 文件生成阶段：从内存状态持久化成 RDB（文件）的时候，会对 key 进行过期检查，过期的键「不会」被保存到新的 RDB 文件中，因此 Redis 中的过期键不会对生成新 RDB 文件产生任何影响。
    RDB 加载阶段：RDB 加载阶段时，要看服务器是主服务器还是从服务器，分别对应以下两种情况：
        如果 Redis 是「主服务器」运行模式的话，在载入 RDB 文件时，程序会对文件中保存的键进行检查，过期键「不会」被载入到数据库中。所以过期键不会对载入 RDB 文件的主服务器造成影响；
        如果 Redis 是「从服务器」运行模式的话，在载入 RDB 文件时，不论键是否过期都会被载入到数据库中。但由于主从服务器在进行数据同步时，从服务器的数据会被清空。所以一般来说，过期键对载入 RDB 文件的从服务器也不会造成影响。

AOF 文件分为两个阶段，AOF 文件写入阶段和 AOF 重写阶段。

    AOF 文件写入阶段：当 Redis 以 AOF 模式持久化时，如果数据库某个过期键还没被删除，那么 AOF 文件会保留此过期键，当此过期键被删除后，Redis 会向 AOF 文件追加一条 DEL 命令来显式地删除该键值。
    AOF 重写阶段：执行 AOF 重写时，会对 Redis 中的键值对进行检查，已过期的键不会被保存到重写后的 AOF 文件中，因此不会对 AOF 重写造成任何影响。

> Redis 主从模式中，对过期键会如何处理？

当 Redis 运行在主从模式下时，从库不会进行过期扫描，从库对过期的处理是被动的。也就是即使从库中的 key 过期了，如果有客户端访问从库时，依然可以得到 key 对应的值，像未过期的键值对一样返回。

从库的过期键处理依靠主服务器控制，主库在 key 到期时，会在 AOF 文件里增加一条 del 指令，同步到所有的从库，从库通过执行这条 del 指令来删除过期的 key。


### Redis的RDB持久化过程

#### RDB文件的创建与载入

Redis是内存型数据库, 这即意味着若服务器断电或关闭, 内存中加载的所有数据都会丢失, 所以Redis有RDB持久化过程,即可以将内存中的数据以固定格式保存在磁盘里,这样即使服务器断电...在重启服务器的时候也可以加载RDB文件来恢复数据,但RDB不是万能的,也就是若RDB文件生成一天后断了电,那么在这一天内产生的数据是没办法恢复的...当然这是另一个话题了

我们先来说一说RDB持久化的过程

生成RDB文件是用\`SAVE\`或\`BGSAVE\`来生成,SAVE命令会阻塞Redis的主进程也就是说若内存中的数据特别多,会导致Redis服务直接卡停, 导致Redis服务器无法处理别的请求.BGSAVE是在后台起一个进程来处理保存数据.

如何加载RDB文件呢?

Redis没有加载RDB文件的命令, 在Redis服务启动的时候会检查在config文件中配置文件下有没有文件,若有则自动加载RDB文件, 没有则不加载.

另外, 因为AOF文件是持久化比RDB频繁,所以若AOF文件和RDB文件同时存在,则优先加载AOF文件.只有在AOF持久化功能处于关闭状态时，服务器才会使用RDB文件来还原数据库状态。

这意味着若开启了AOF,但AOF文件为空,则加载的数据就为空

BGSAVE命令的保存工作由主进程fork的子进程执行,所以在执行了BGSAVE的情况下Redis服务器还能够接受客户端的命令, 但是在BGSAVE命令执行期间,服务器处理\`BGSAVE\`, \`SAVE\`, \`BGREWRITEAOF\`三个命令和平时有所不同

首先BGSAVE执行期间,客户端发送SAVE命令会被服务器直接拒绝, 服务器禁止SAVE和BGSAVE的目的是避免父子进程同时执行\`rdbSave\`防止有竞争条件, 其次BGSAVE命令执行期间客户端发送BGSAVE命令会被服务器直接拒绝, 因为同时执行两个BGSAVE也会产生竞争条件, 最后\`BGREWRITEAOF\`和\`BGSAVE\`两个命令不能同时执行, 如果BGSAVE同时执行, 那么客户端发送的BGREWRITEAOF命令会被延迟到BGSAVE命令执行完毕之后执行。如 果 BGREWRITEAOF命令正在执行，那么客户端发送的BGSAVE命令会被服务器拒绝。

为什么BGREWRITEAOF和BGSAVE两个命令不能同时进行?

> 因为BGREWRITEAOF和BGSAVE两个命令的实际工作都由子进程执行，所以这两个命令在操作方面并没有什么冲突的地方，不能同时执行它们只是一个性能方面的考虑——并发出两个子进程，并且这两个子进程都同时执行大量的磁盘写入操作，这怎么想都不会是一个好主意。

RDB文件载入时服务器会一直阻塞直到载入完成为止.

#### 自动间隔性保存

因为BGSAVE可以创建一个新的子进程来保存数据,所以可以通过配置文件的save选项设置多个保存条件,只要有其中任意一个满足,后台就可以自动执行BGSAVE, 如果我们向服务器提供\`save 900 1\`, 则若服务器在900秒内对数据库有至少一次修改,则BGSAVE自动执行

保存条件: 用户可以自己制定配置文件,若不配置则默认条件是
\`\`\`
save 900 1
save 300 10
save 60 10000
\`\`\`
接着服务器会根据save选项去保存条件,设置服务器状态redisServer结构的saveparams属性:, saveparams属性是一个数组,数组中每个元素是一个saveparam结构,saveparam结构是所设置的保存条件.
\`\`\`c
struct saveparam {
    //秒数
    time_t seconds;
    //修改数
    int changes;
};
\`\`\`
除了saveparams数组外,服务器状态还维持着一个dirty计数器和lastsave属性:
1. dirty计数器记录距离上一次成功执行SAVE命令或者BGSAVE命令之后，服务器对数据库状态（服务器中的所有数据库）进行了多少次修改（包括写入、删除、更新等操作）。
2. lastsave属性是一个UNIX时间戳,记录了上一次服务器的SAVE命令或BGSAVE命令的时间

当服务器成功执行一个数据库修改命令之后，程序就会对dirty计数器进行更新：命令修改了多少次数据库，dirty计数器的值就增加多少。

> 检查保存条件是否满足

Redis服务器周期性操作函数serverCron默认每隔100毫秒就执行一次, 它的工作之一就是检查save选项所设置的保存条件是否已经满足,如果满足的话就执行BGSAVE命令


#### RDB文件的结构
    
    
RDB的文件结构
\`\`\`
REDIS db_version databases EOF check_sum
\`\`\`

注意:为了区分变量常量数据,使用全大写单词标示常量,用全小写字母标识变量和数据

RDB文件的最开头是REDIS部分，这个部分的长度为5字节，保存着“REDIS”五个字符。通过这五个字符，程序可以在载入文件时，快速检查所载入的文件是否RDB文件。又因为Redis保存的是二进制数据,不是C字符串所以开头的REDIS其实就是REDIS五个字符没有'\\0'结尾...

db_version是长度为4字节,它的值是一个字符串表示的整数,这个整数记录了RDB文件的版本,比如"0006"代表是第六版,这里只介绍RDB的第六版文件

databases部分包含着0或多个数据库以及其中的数据.如果数据库的数据库状态为空则这部位为空.否则就保存数据

EOF常量为1字节,这个常量标志着RDB文件正文内容的结束,当读入程序遇到这个值的时候,它知道所有数据库的键值对都录入完毕.

check_sum是一个8字节长的无符号整数,保存着一个校验和,它是REDIS、db_version、databases、EOF四个部分的内容进行计算得出的。服务器在载入RDB文件时，会将载入数据所计算出的校验和与check_sum所记录的校验和进行对比，以此来检查RDB文件是否有出错或者损坏的情况出现。

##### databases部分

一个RDB文件的databases部分可以保存任意多个非空数据库。

每 个 非 空 数 据 库 在 RDB 文 件 中 都 可 以 保 存 为 SELECTDB 、db_number、key_value_pairs三个部分.

- SELECTDB常量的长度为1字节，当读入程序遇到这个值的时候，它知道接下来要读入的将是一个数据库号码。
- db_number保存着一个数据库号码，根据号码的大小不同，这个部分的长度可以是1字节、2字节或者5字节。当程序读入db_number部分之后，服务器会调用SELECT命令，根据读入的数据库号码进行数
据库切换，使得之后读入的键值对可以载入到正确的数据库中。
- key_value_pairs部分保存了数据库中的所有键值对数据，如果键值对带有过期时间，那么过期时间也会和键值对保存在一起。根据键值对的数量、类型、内容以及是否有过期时间等条件的不同，key_value_pairs部分的长度也会有所不同。

##### key_value_pairs部分

RDB文件中的每个key_value_pairs部分都保存了一个或以上数量的键值对，如果键值对带有过期时间的话，那么键值对的过期时间也会被保存在内。

不带过期时间的键值对在RDB文件中由TYPE、key、value三部分组成

TYPE记录了value的类型, 长度为1字节, 值可以是以下常量的其中一个
- REDIS_RDB_TYPE_STRING
- REDIS_RDB_TYPE_LIST
- REDIS_RDB_TYPE_SET
- REDIS_RDB_TYPE_ZSET
- REDIS_RDB_TYPE_HASH
- REDIS_RDB_TYPE_LIST_ZIPLIST
- REDIS_RDB_TYPE_SET_INTSET
- REDIS_RDB_TYPE_ZSET_ZIPLIST
- REDIS_RDB_TYPE_HASH_ZIPLIST

带有过期的部分有新增的EXPIRETIME_MS和ms, 分别是以毫秒为单位的过期时间和UNIX时间戳记录的过期时间

values 部分则是

其他的值类型部分不赘述了

### AOF文件结构

除了RDB持久化功能外,Redis还提供AOF持久化.AOF持久化是通过保存Redis服务器所执行的写命令来记录数据库状态的


被写入AOF文件的所有命令都是以Redis的命令请求协议格式保存的，因为Redis的命令请求协议是纯文本格式，所以我们可以直接打开一个AOF文件，观察里面的内容。

服务器在启动时，可以通过载入和执行AOF文件中保存的命令来还原服务器关闭之前的数据库状态

#### AOF持久化的实现

AOF持久化功能的实现可以分为命令追加（append）、文件写入、文件同步（sync）三个步骤。

追加:当AOF持久化功能处于打开状态时,服务器执行完一个写命令后,会以协议格式命令将被写命令追加到服务器状态的aof_buf缓冲区末尾.  

AOF文件的写入

Redis服务器进程其实就是一个事件循环,这个循环中的文件事件负责接收客户端的命令请求,以及向客户端发送命令回复,而时间事件则负责执行像serverCron函数这样需要定时运行的函数。因为服务器在处理文件事件时可能会执行写命令,使得一些内容被追加到aof_buf缓冲区中,所以服务器在每次循环结束时会调用flushAppendOnlyFile函数,考虑是否刷新aof_buf的内容.

flushAppendOnlyFile函数的行为由服务器配置的appendfsync选项的值来决定.
appendfsync选项有always  everysec   no意思分别为,总是,每秒,由操作系统决定...


文件写入和同步为了提高文件的写入效率,现代计算机中为了提高文件的写入效率,当用户调用write函数，将一些数据写入到文件的时候，操作系统通常会将写入数据暂时保存在一个内存缓冲区里面，等到缓冲区的空间被填满、或者超过了指定的时限之后，才真正地将缓冲区中的数据写入到磁盘里面。这种做法虽然提高了效率，但也为写入数据带来了安全问题，因为如果计算机发生停机，那么保存在内存缓冲区里面的写入数据将会丢失。为此，系统提供了fsync和fdatasync两个同步函数，它们可以强制让操作系统立即将缓冲区中的数据写入到硬盘里面，从而确保写入数据的安全性。


AOF的载入与数据还原

AOF文件包含了重建数据库所需的所有写命令,所以服务器只需要读入并重新执行一遍AOF文件里面保存的写命令就好了.

Redis读取AOF文件并还原数据库状态的详细步骤如下：
1）创建一个不带网络连接的伪客户端（fake client）：因为Redis的命令只能在客户端上下文中执行，而载入AOF文件时所使用的命令直接来源于AOF文件而不是网络连接，所以服务器使用了一个没有网络连接的伪客户端来执行AOF文件保存的写命令，伪客户端执行命令的效果和带网络连接的客户端执行命令的效果完全一样。
2）从AOF文件中分析并读取出一条写命令。
3）使用伪客户端执行被读出的写命令。
4）一直执行步骤2和步骤3，直到AOF文件中的所有写命令都被处理完毕为止。
当完成以上步骤之后，AOF文件所保存的数据库状态就会被完整地还原出来

AOF重写

因为AOF持久化是通过保存被执行的写命令来记录数据库状态的，所以随着服务器运行时间的流逝，AOF文件中的内容会越来越多，文件的体积也会越来越大，如果不加以控制的话，体积过大的AOF文件很可能对Redis服务器、甚至整个宿主计算机造成影响，并且AOF文件的体积越大，使用AOF文件来进行数据还原所需的时间就越多。


为了解决AOF文件体积膨胀的问题，Redis提供了AOF文件重写（rewrite）功能。通过该功能，Redis服务器可以创建一个新的AOF文件来替代现有的AOF文件，新旧两个AOF文件所保存的数据库状态相同，但新AOF文件不会包含任何浪费空间的冗余命令，所以新AOF文件的体积通常会比旧AOF文件的体积要小得多

在接下来的内容中，我们将介绍AOF文件重写的实现原理，以及BGREWEITEAOF命令的实现原理。


虽然Redis将生成新AOF文件替换旧AOF文件的功能命名为“AOF文件重写”，但实际上，AOF文件重写并不需要对现有的AOF文件进行任何读取、分析或者写入操作，这个功能是通过读取服务器当前的数据库状态来实现的。

即就是通过扫描服务器有的所有键值去重建AOF文件

### 发布与订阅

Redis发布订阅功能是由PUBLISH,SUBSCRIBE,PSUBSCRIBE等命令组成.

通过执行SUBSCRIBE命令，客户端可以订阅一个或多个频道，从而成为这些频道的订阅者（subscriber）：每当有其他客户端向被订阅的频道发送消息（message）时，频道的所有订阅者都会收到这条消息。

除了订阅频道之外，客户端还可以通过执行PSUBSCRIBE命令订阅一个或多个模式，从而成为这些模式的订阅者：每当有其他客户端向某个频道发送消息时，消息不仅会被发送给这个频道的所有订阅者，它还会被发送给所有与这个频道相匹配的模式的订阅者。

频道的订阅与退订

当一个客户端执行SUBSCRIBE命令订阅某个或某些频道的时候，这个客户端与被订阅频道之间就建立起了一种订阅关系。Redis将所有的订阅关系都发那个到了RedisServer类下的pubsub_channels字典里面,这个字典的键是某个被订阅的频道,值是一个链表,链表里面记录的是这个频道的客户端.

退订的话其实就是遍历链表删除操作,如果客户端为空,则频道键一并删除掉.

模式的订阅与退订

服务器也将所有模式的订阅关系都保存在服务器状态的pubsub_patterns属性里面,pubsub_patterns属性是一个链表，链表中的每个节点都包含着一个pubsub Pattern结构，这个结构的pattern属性记录了被订阅的模式，而client属性则记录了订阅模式的客户端

退订模式频道的退订差不多

发布消息

当一个redis客户端执行PUBLISH,将消息message发送给频道channel时,服务器需要执行以下两个动作,将消息message发送给channel频道的所有订阅者.如果有一个或多个模式和频道匹配那么将消息message发送给pattern模式的订阅者.

发送给模式的订阅者就是遍历所有模式,找出客户端发送...

查看订阅消息

PUBSUB客户端可以通过这个命令来查看频道或者模式的相关信息，比如某个频道目前有多少订阅者，又或者某个模式目前有多少订阅者，诸如此类。

PUBSUB CHANNELS[pattern]子命令用于返回服务器当前被订阅的频道，其中pattern参数是可选的：
·如果不给定pattern参数，那么命令返回服务器当前被订阅的所有频道。
·如果给定pattern参数，那么命令返回服务器当前被订阅的频道中那些与pattern模式相匹配的频道。

PUBSUB NUMSUB[channel-1 channel-2...channel-n]子命令接受任意多个频道作为输入参数，并返回这些频道的订阅者数量。

PUBSUB NUMPAT子命令用于返回服务器当前被订阅模式的数量。

### 事务

Redis通过multi,exec,watch等命令实现事务(transaction),事务提供了一种将多个命令请求打包,然后一次性顺序执行多个命令的过程.并且在事务执行期间服务器不会中断事务而改去执行其他客户端的命令请求，它会将事务中的所有命令都执行完毕，然后才去处理其他客户端的命令请求。

一个事务从开始到结束通常会经历以下三个阶段：
1）事务开始。
2）命令入队。
3）事务执行。

包括的命令有\`MULTI\`,\`DISCARD\`,\`EXEC\`,\`WATCH\`

\`multi\`事务开始,这一切换是通过在客户端状态的flags属性中打开REDIS_MULTI标识来完成的\`client.flags |= REDIS_MULTI\`.

当一个客户端处于非事务状态时，这个客户端发送的命令会立即被服务器执行, 不同的是若处于事务状态,则根据这个客户端发来的不同命令执行不同的操作.如果客户端发送的命令为EXEC、DISCARD、WATCH、MULTI四个命令的其中一个，那么服务器立即执行这个命令。

与 此 相 反 ， 如 果 客 户 端 发 送 的 命 令 是 EXEC 、 DISCARD 、WATCH、MULTI四个命令以外的其他命令，那么服务器并不立即执行这个命令，而是将这个命令放入一个事务队列里面，然后向客户端返回QUEUED回复

事务队列

每个Redis客户端都有自己的事务状态，这个事务状态保存在客户端状态的mstate属性里面, 事务状态属性包含一个事务队列，以及一个已入队命令的计数器（也可以说是事务队列的长度）：事务队列是一个multiCmd类型的数组，数组中的每个multiCmd结构都保存了一个已入队命令的相关信息，包括指向命令实现函数的指针、命令的参数，以及参数的数量.

执行事务

当一个处于事务状态的客户端向服务器发送EXEC命令时,，这个EXEC命令将立即被服务器执行。服务器会遍历这个客户端的事务队列，执行队列中保存的所有命令，最后将执行命令所得的结果全部返回给客户端。

WATCH命令的实现

WATCH命令是一个乐观锁（optimistic locking），它可以在EXEC命令执行之前，监视任意数量的数据库键，并在EXEC命令执行时，检查被监视的键是否至少有一个已经被修改过了，如果是的话，服务器将拒绝执行事务，并向客户端返回代表事务执行失败的空回复。

若在WATCH监视其间的事务,有其他客户端修改了某个被WATCH监视的键,则事务会被服务器端拒绝执行,WATCH的原理是,每个Redis数据库都保存着一个watched_keys字典，这个字典的键是某个被WATCH命令监视的数据库键，而字典的值则是一个链表，链表中记录了所有监视相应数据库键的客户端

通过watched_keys字典，服务器可以清楚地知道哪些数据库键正在被监视，以及哪些客户端正在监视这些数据库键

比如·客户端c1和c2正在监视键"name"。 ·客户端c3正在监视键"age"。 ·客户端c2和c4正在监视键"address"。

所有对数据库进行修改的命令，比如SET、LPUSH、SADD、ZREM 、 DEL 、 FLUSHDB 等 等 ， 在 执 行 之 后 都 会 调 用multi.c/touchWatchKey函数对watched_keys字典进行检查，查看是否有客户端正在监视刚刚被命令修改过的数据库键，如果有的话，那 么 touchWatchKey 函 数 会 将 监 视 被 修 改 键 的 客 户 端 的REDIS_DIRTY_CAS标识打开，表示该客户端的事务安全性已经被破坏。

当服务器接收到一个客户端发来的EXEC命令时，服务器会根据这个客户端是否打开了REDIS_DIRTY_CAS标识来决定是否执行事务：
- 如果客户端的REDIS_DIRTY_CAS标识已经被打开，那么说明客户端所监视的键当中，至少有一个键已经被修改过了，在这种情况下，客户端提交的事务已经不再安全，所以服务器会拒绝执行客户端提交的事务。
- 如果客户端的REDIS_DIRTY_CAS标识没有被打开，那么说明客户端监视的所有键都没有被修改过（或者客户端没有监视任何键），事务仍然是安全的，服务器将执行客户端提交的这个事务。

事务的ACID性质

在传统的关系式数据库中，常常用ACID性质来检验事务功能的可靠性和安全性。在 Redis 中 ， 事 务 总 是 具 有 原 子 性 （ Atomicity ） 、 一 致 性（Consistency）和隔离性（Isolation），并且当Redis运行在某种特定的持久化模式下时，事务也具有耐久性

事务具有原子性指的是，数据库将事务中的多个操作当作一个整体来执行，服务器要么就执行事务中的所有操作，要么就一个操作也不执行。对于Redis的事务功能来说，事务队列中的命令要么就全部都执行，要么就一个都不执行，因此，Redis的事务是具有原子性的

Redis的事务和传统的关系型数据库事务的最大区别在于，Redis不支持事务回滚机制（rollback），即使事务队列中的某个命令在执行期间出现了错误，整个事务也会继续执行下去，直到将事务队列中的所有命令都执行完毕为止。

Redis的作者在事务功能的文档中解释说，不支持事务回滚是因为这种复杂的功能和Redis追求简单高效的设计主旨不相符，并且他认为，Redis事务的执行时错误通常都是编程错误产生的，这种错误通常只会出现在开发环境中，而很少会在实际的生产环境中出现，所以他认为没有必要为Redis开发事务回滚功能。


事务具有一致性指的是，如果数据库在执行事务之前是一致的，那么在事务执行之后，无论事务是否执行成功，数据库也应该仍然是一致的。“一致”指的是数据符合数据库本身的定义和要求，没有包含非法或者无效的错误数据。Redis通过谨慎的错误检测和简单的设计来保证事务的一致性，以下三个小节将分别介绍三个Redis事务可能出错的地方，并说明Redis是如何妥善地处理这些错误，从而确保事务的一致性的。

1.入队错误: 如果命令在入队时发生了错误,比如命令不存在,或者命令格式不对,那么Redis将拒绝执行这个命令.

2.执行错误: 执行过程中发生的错误都是一些不能在入队时被服务器发现的错误，这些错误只会在命令实际执行时被触发, 并且执行错后,继续执行下面剩余的队列值

3.服务器停机: 

如果Redis服务器在执行事务的过程中停机，那么根据服务器所使用的持久化模式，可能有以下情况出现：如果服务器运行在无持久化的内存模式下，那么重启之后的数据库将是空白的，因此数据总是一致的。

如果服务器运行在RDB模式下，那么在事务中途停机不会导致不一致性，因为服务器可以根据现有的RDB文件来恢复数据，从而将数据库还原到一个一致的状态。如果找不到可供使用的RDB文件，那么重启之后的数据库将是空白的，而空白数据库总是一致的。

·如果服务器运行在AOF模式下，那么在事务中途停机不会导致不一致性，因为服务器可以根据现有的AOF文件来恢复数据，从而将数据库还原到一个一致的状态。如果找不到可供使用的AOF文件，那么重启之后的数据库将是空白的，而空白数据库总是一致的。综上所述，无论Redis服务器运行在哪种持久化模式下，事务执行中途发生的停机都不会影响数据库的一致性。

隔离性

事务的隔离性指的是，即使数据库中有多个事务并发地执行，各个事务之间也不会互相影响，并且在并发状态下执行的事务和串行执行的事务产生的结果完全相同。

因为Redis使用单线程的方式来执行事务（以及事务队列中的命令），并且服务器保证，在执行事务期间不会对事务进行中断，因此，Redis的事务总是以串行的方式运行的，并且事务也总是具有隔离性的。

耐久性

事务的耐久性指的是，当一个事务执行完毕时，执行这个事务所得的结果已经被保存到永久性存储介质（比如硬盘）里面了，即使服务器在事务执行完毕之后停机，执行事务所得的结果也不会丢失。

因为Redis的事务不过是简单地用队列包裹起了一组Redis命令，Redis并没有为事务提供任何额外的持久化功能，所以Redis事务的耐久性由Redis所使用的持久化模式决定


### 复制

在Redis的主从复制中,用户使用\`slaveof\`命令或者设置slaveof选项,可以让一个服务器去复制另一个服务器,被复制的服务器叫主服务器,对主服务器进行复制的服务器叫从服务器

进行复制中的服务器双方保存相同的数据,概念上将这种现象叫数据库状态一致.

这里先介绍2.8版本以前使用的旧版复制功能的实现原理,并说明旧版复制功能在处理断线后重新连接的从服务器时，会遇上怎样的低效情况。接着，本章将介绍Redis从2.8版本开始使用的新版复制功能是如何通过部分重同步来解决旧版复制功能的低效问题的，并说明部分重同步的实现原理。在此之后，本章将列举SLAVEOF命令的具体实现步骤，并在本章最后，说明主从服务器心跳检测机制的实现原理，并对基于心跳检测实现的几个功能进行介绍。

旧版复制功能的实现

Redis的复制分为同步和命令传播两个操作:
1. 同步状态用作将从服务器的数据库状态更新至与主服务器当前所处的数据库状态.
2. 命令传播操作则用于主从服务器状态不一致,让主从服务器状态回到一致的状态.

同步

当客户端向从服务器发送salveof命令时,要求从服务器复制主服务器,从服务器首先需要执行同步操作,也就是将从服务器的数据库状态更新至主服务器当前所处的数据库状态.从服务器对主服务器的同步操作需要通过向主服务器发送SYNC命令来完成,以下是发送SYNC命令的步骤:
1. 从服务器向主服务器发送SYNC命令。
2. 收到SYNC命令的主服务器执行BGSAVE命令在后台生成一个RDB文件,并使用一个缓冲区记录从现在开始执行的所有写命令.
3. 当主服务器BGSAVE命令执行完成,主服务器将BGSAVE生成的RDB文件发送给从服务器,从服务器接收并载入这个RDB文件,将自己的数据库状态更新至主服务器执行BGSAVE命令时的数据库状态
4. 主服务器将记录在缓冲区里的所有写命令发送给从服务器,从服务器执行这些写命令,将自己的数据库状态更新至主服务器所处的状态.

命令传播

在同步操作完成后,主从服务器状态将达成一致,但如果主服务器的客户端发送写命令时,主从服务器的数据库状态可能被修改,并导致主从服务器状态不再一致,为了让主从服务器再次回到一致状态，主服务器需要对从服务器执行命令传播操作：主服务器会将自己执行的写命令，也即是造成主从服务器不一致的那条写命令，发送给从服务器执行，当从服务器执行了相同的写命令之后，主从服务器将再次回到一致状态。

旧版复制功能的缺陷:Redis中从服务器对主服务器的复制可以分为以下两种情况：
- 初次复制：从服务器以前没有复制过任何主服务器，或者从服务器当前要复制的主服务器和上一次复制的主服务器不同。
- 断线后重复制：处于命令传播阶段的主从服务器因为网络原因而中断了复制，但从服务器通过自动重连接重新连上了主服务器，并继续复制主服务器。

对于初次复制来说，旧版复制功能能够很好地完成任务，但对于断线后重复制来说，旧版复制功能虽然也能让主从服务器重新回到一致状态，但效率却非常低,需要主服务器再次发生RDB文件.

新版Redis复制功能的实现:

为了解决旧版复制功能在处理断线重复制情况时的低效问题，Redis从2.8版本开始，使用PSYNC命令代替SYNC命令来执行复制时的同步操作。

PSYNC命令有完整重同步和部分重同步两种模式:
- 其中完整重同步用于处理初次复制情况:完整重同步的执行步骤和SYNC命令的执行步骤基本一样,都是通过让主服务器创建并发送RDB文件，以及向从服务器发送保存在缓冲区里面的写命令来进行同步。
- 部分重同步则用于处理断线后复制的情况,当从服务器在断线后重新连接主服务器时,如果条件允许,主服务器可以将主从服务器连接断开期间执行的写命令发送给从服务器，从服务器只要接收并执行这些写命令，就可以将数据库更新至主服务器当前所处的状态。PSYNC命令的部分重同步模式解决了旧版复制功能在处理断线后重复制时出现的低效情况.

部分重同步的实现

部分重同步功能由以下三个部分构成：
- 主服务器的复制偏移量（replication offset）和从服务器的复制偏移量。
- 主服务器的复制积压缓冲区（replication backlog）。
- 服务器的运行ID（run ID）。

复制偏移量

执行复制的双方——主服务器和从服务器会分别维护一个复制偏移量：
- 主服务器每次向从服务器传播N个字节的数据时，就将自己的复制偏移量的值加上N。
- 从服务器每次收到主服务器传播来的N个字节的数据时，就将自己的复制偏移量的值加上N。

通过对比主从服务器的复制偏移量，程序可以很容易地知道主从服务器是否处于一致状态：·如果主从服务器处于一致状态，那么主从服务器两者的偏移量总是相同的。相反，如果主从服务器两者的偏移量并不相同，那么说明主从服务器并未处于一致状态。

复制积压缓冲区

复制积压缓冲区是由主服务器维护的一个固定长度（fixed-size）先进先出（FIFO）队列，默认大小为1MB。主服务器的复制积压缓冲区里面会保存着一部分最近传播的写命令，并且复制积压缓冲区会为队列中的每个字节记录相应的复制偏移量

当从服务器重新连上主服务器时，从服务器会通过PSYNC命令将自己的复制偏移量offset发送给主服务器，主服务器会根据这个复制偏移量来决定对从服务器执行何种同步操作：
- 如果offset偏移量之后的数据（也即是偏移量offset+1开始的数据）仍然存在于复制积压缓冲区里面，那么主服务器将对从服务器执行部分重同步操作。
- 相反，如果offset偏移量之后的数据已经不存在于复制积压缓冲区，那么主服务器将对从服务器执行完整重同步操作。

服务器运行ID

除了复制偏移量和复制积压缓冲区之外，实现部分重同步还需要用到服务器运行ID（run ID）：
每个Redis服务器，不论主服务器还是从服务，都会有自己的运行ID

当从服务器对主服务器进行初次复制时，主服务器会将自己的运行ID传送给从服务器，而从服务器则会将这个运行ID保存起来。

当从服务器断线并重新连上一个主服务器时，从服务器将向当前连接的主服务器发送之前保存的运行ID：如果从服务器保存的运行ID和当前连接的主服务器的运行ID相同，那么说明从服务器断线之前复制的就是当前连接的这个主服务器，主服务器可以继续尝试执行部分重同步操作。相反地，如果从服务器保存的运行ID和当前连接的主服务器的运行ID并不相同，那么说明从服务器断线之前复制的主服务器并不是当前连接的这个主服务器，主服务器将对从服务器执行完整重同步操作。

PSYNC命令的实现

到目前为止，本章在介绍PSYNC命令时一直没有说明PSYNC命令的参数以及返回值，因为那时我们还未了解服务器运行ID、复制偏移量、复制积压缓冲区这些东西，在学习了部分重同步的实现原理之后，我们现在可以来了解PSYNC命令的完整细节了。

PSYNC命令的调用方法有两种：
如果从服务器以前没有复制过任何主服务器，或者之前执行过SLAVEOF no one命令，那么从服务器在开始一次新的复制时将向主服务器发送PSYNC ? -1命令，主动请求主服务器进行完整重同步（因为这时不可能执行部分重同步）
相反地，如果从服务器已经复制过某个主服务器，那么从服务器在开始一次新的复制时将向主服务器发送\`PSYNC <runid> \${offset}\`命令：其中runid是上一次复制的主服务器的运行ID，而offset则是从服务器当前的复制偏移量，接收到这个命令的主服务器会通过这两个参数来判断应该对从服务器执行哪种同步操作。

根据情况，接收到PSYNC命令的主服务器会向从服务器返回以下三种回复的其中一种：
如果主服务器返回\`+FULLRESYNC <runid> \${offset}\`回复，那么表示主服务器将与从服务器执行完整重同步操作：其中runid是这个主服务器的运行ID，从服务器会将这个ID保存起来，在下一次发送PSYNC命令时使用；而offset则是主服务器当前的复制偏移量，从服务器会将这个值作为自己的初始化偏移量。

如果主服务器返回+CONTINUE回复，那么表示主服务器将与从服务器执行部分重同步操作，从服务器只要等着主服务器将自己缺少的那部分数据发送过来就可以了。

如果主服务器返回-ERR回复，那么表示主服务器的版本低于Redis 2.8，它识别不了PSYNC命令，从服务器将向主服务器发送SYNC命令，并与主服务器执行完整同步操作。

复制的实现

通过向从服务器发送SLAVEOF命令，我们可以让一个从服务器去复制一个主服务器

步骤1：设置主服务器的地址和端口

当客户端向从服务器发送以下命令时：\`slaveof 127.0.0.1 6379\`, 从服务器首先要做的就是将客户端给定的服务器IP地址127.0.0.1以及端口6379保存到服务器状态的masterhost属性和masterport属性里面.

SLAVEOF命令是一个异步命令，在完成masterhost属性和masterport属性的设置工作之后，从服务器将向发送SLAVEOF命令的客户端返回OK，表示复制指令已经被接收，而实际的复制工作将在OK返回之后才真正开始执行。

步骤2：建立套接字连接

在SLAVEOF命令执行之后，从服务器将根据命令所设置的IP地址和端口，创建连向主服务器的套接字连接。

如果从服务器创建的套接字能成功连接（connect）到主服务器，那么从服务器将为这个套接字关联一个专门用于处理复制工作的文件事件处理器，这个处理器将负责执行后续的复制工作，比如接收RDB文件，以及接收主服务器传播来的写命令，诸如此类。
而主服务器在接受（accept）从服务器的套接字连接之后，将为该套接字创建相应的客户端状态，并将从服务器看作是一个连接到主服务器的客户端来对待，这时从服务器将同时具有服务器（server）和客户端（client）两个身份：从服务器可以向主服务器发送命令请求，而主服务器则会向从服务器返回命令回复

因为复制工作接下来的几个步骤都会以从服务器向主服务器发送命令请求的形式来进行，所以理解“从服务器是主服务器的客户端”这一点非常重要。

步骤3：发送PING命令

从服务器成为主服务器的客户端之后，做的第一件事就是向主服务器发送一个PING命令

虽然主从服务器成功建立起了套接字连接，但双方并未使用该套接字进行过任何通信，通过发送PING命令可以检查套接字的读写状态是否正常。

因为复制工作接下来的几个步骤都必须在主服务器可以正常处理命令请求的状态下才能进行，通过发送PING命令可以检查主服务器能否正常处理命令请求。

从服务器在发送PING命令之后将遇到以下三种情况的其中一种：

1. 如果主服务器向从服务器返回了一个命令回复，但从服务器却不能在规定的时限（timeout）内读取出命令回复的内容，那么表示主从服务器之间的网络连接状态不佳，不能继续执行复制工作的后续步骤。当出现这种情况时，从服务器断开并重新创建连向主服务器的套接字。
2. 如果主服务器向从服务器返回一个错误，那么表示主服务器暂时没办法处理从服务器的命令请求，不能继续执行复制工作的后续步骤。当出现这种情况时，从服务器断开并重新创建连向主服务器的套接字。比如说，如果主服务器正在处理一个超时运行的脚本，那么当从服务器向主服务器发送PING命令时，从服务器将收到主服务器返回的BUSY Redisis busy running a script.You can only call SCRIPTKILL or SHUTDOWN NOSAVE.错误。
3. 如果从服务器读取到"PONG"回复，那么表示主从服务器之间的网络连接状态正常，并且主服务器可以正常处理从服务器（客户端）发送的命令请求，在这种情况下，从服务器可以继续执行复制工作的下个步骤。

步骤4：身份验证

从服务器在收到主服务器返回的"PONG"回复之后，下一步要做的就是决定是否进行身份验证：

如果从服务器设置了masterauth选项，那么进行身份验证。

如果从服务器没有设置masterauth选项，那么不进行身份验证。

在需要进行身份验证的情况下，从服务器将向主服务器发送一条AUTH命令，命令的参数为从服务器masterauth选项的值。

举个例子，如果从服务器masterauth选项的值为10086，那么从服务器将向主服务器发送命令AUTH 10086，如图15-18所示。

步骤5：发送端口信息

在 身 份 验 证 步 骤 之 后 ， 从 服 务 器 将 执 行 命 令 REPLCONF listening-port <port-number>，向主服务器发送从服务器的监听端口号。

步骤6：同步

在这一步，从服务器将向主服务器发送PSYNC命令，执行同步操作，并将自己的数据库更新至主服务器数据库当前所处的状态。

步骤7：命令传播

当完成了同步之后，主从服务器就会进入命令传播阶段，这时主服务器只要一直将自己执行的写命令发送给从服务器，而从服务器只要一直接收并执行主服务器发来的写命令，就可以保证主从服务器一直保持一致了。

心跳检测

在命令传播阶段，从服务器默认会以每秒一次的频率，向主服务器发送命令：

其中replication_offset是从服务器当前的复制偏移量。

发送REPLCONF ACK命令对于主从服务器有三个作用：

- 检测主从服务器的网络连接状态。
- 辅助实现min-slaves选项。
- 检测命令丢失。
以下将分别介绍这三个作用。

检测主从服务器的网络连接状态:主从服务器可以通过发送和接收REPLCONF ACK命令来检查两者之间的网络连接是否正常：如果主服务器超过一秒钟没有收到从服务器发来的REPLCONF ACK命令，那么主服务器就知道主从服务器之间的连接出现问题了。

通过向主服务器发送INFO replication命令，在列出的从服务器列表的lag一栏中，我们可以看到相应从服务器最后一次向主服务器发送REPLCONF ACK命令距离现在过了多少秒.在一般情况下，lag的值应该在0秒或者1之间跳动，如果超过1秒的话，那么说明主从服务器之间的连接出现了故障。

辅助实现min-slaves配置选项

Redis的min-slaves-to-write和min-slaves-max-lag两个选项可以防止主服务器在不安全的情况下执行写命令。

举个例子，如果我们向主服务器提供以下设置：

那么在从服务器的数量少于3个，或者三个从服务器的延迟（lag）值都大于或等于10秒时，主服务器将拒绝执行写命令，这里的延迟值就是上面提到的INFO replication命令的lag值。

检测命令丢失

如果因为网络故障，主服务器传播给从服务器的写命令在半路丢失，那么当从服务器向主服务器发送REPLCONF ACK命令时，主服务器将发觉从服务器当前的复制偏移量少于自己的复制偏移量，然后主服务器就会根据从服务器提交的复制偏移量，在复制积压缓冲区里面找到从服务器缺少的数据，并将这些数据重新发送给从服务器。

### 哨兵

Sentinel(哨兵)系统是Redis高可用性解决方案,由一个或多个Sentinel实例组成的Sentineli系统可以监视任意多个服务器,以及这些主服务器下的所有从服务器,并在被监视的主服务器下线时,自动将这个下线主服务器属下的某个从服务器升级为新的主服务器,然后由新的主服务器代替已下线的主服务器处理请求.

当server1的下线时长超过用户设定的下线时长上限时,Sentinel系统就会对server1执行故障转移操作.

另外，Sentinel还会继续监视已下线的server1，并在它重新上线时，将它设置为新的主服务器的从服务器。

当一个Sentinel启动时，它需要执行以下步骤：
1）初始化服务器。
2）将普通Redis服务器使用的代码替换成Sentinel专用代码。
3）初始化Sentinel状态。
4）根据给定的配置文件，初始化Sentinel的监视主服务器列表。
5）创建连向主服务器的网络连接。

初始化服务器

Sentinel的本质就是运行在特殊模式下的Redis服务器,所以第一步其实是先初始化一个普通redis服务器,不过，因为Sentinel执行的工作和普通Redis服务器执行的工作不同，所以Sentinel的初始化过程和普通Redis服务器的初始化过程并不完全相同。

例如，普通服务器在初始化时会通过载入RDB文件或者AOF文件来还原数据库状态，但是因为Sentinel并不使用数据库，所以初始化Sentinel时就不会载入RDB文件或者AOF文件, sentinel内部是可以使用发布订阅功能的.

使用Sentinel专用代码

启动Sentinel的第二个步骤就是将一部分普通Redis服务器使用的代 码 替 换 成 Sentinel 专 用 代 码 。 比 如 说 ， 普 通 Redis 服 务 器 使 用redis.h/REDIS_SERVERPORT常量的值作为服务器端口

初始化Sentinel状态

在应用了Sentinel的专用代码之后，接下来，服务器会初始化一个sentinel.c/sentinelState结构（后面简称“Sentinel状态”），这个结构保存了服务器中所有和Sentinel功能有关的状态

\`\`\`c
struct sentinelState {
    //当前纪元，用于实现故障转移
    uint64_t current_epoch;
    //保存了所有被这个sentinel监视的主服务器
    //字典的键是主服务器的名字
    //字典的值则是一个指向sentinelRedisInstance结构的指针
    dict *masters;
    //是否进入了TILT模式？
    int tilt;
    //目前正在执行的脚本的数量
    int running_scripts;
    //进入TILT模式的时间
    mstime_t tilt_start_time;
    //最后一次执行时间处理器的时间
    mstime_t previous_time;
    //一个FIFO队列，包含了所有需要执行的用户脚本
    list *scripts_queue;
} sentinel;
\`\`\`
字典的键是被监视主服务器的名字, 而 字 典 的 值 则 是 被 监 视 主 服 务 器 对 应 的sentinel.c/sentinelRedisInstance结构。

\`\`\`c
typedef struct sentinelRedisInstance {
    //标识值，记录了实例的类型，以及该实例的当前状态
    int flags;
    //实例的名字
    //主服务器的名字由用户在配置文件中设置
    //从服务器以及Sentinel的名字由Sentinel自动设置
    //格式为ip:port，例如"127.0.0.1:26379"
    char *name;
    //实例的运行ID
    char *runid;
    //配置纪元，用于实现故障转移
    uint64_t config_epoch;
    //实例的地址
    sentinelAddr *addr;
    // SENTINEL down-after-milliseconds选项设定的值
    //实例无响应多少毫秒之后才会被判断为主观下线（subjectively down）
    mstime_t down_after_period;
    // SENTINEL monitor <master-name> <IP> <port> <quorum>选项中的quorum参数
    //判断这个实例为客观下线（objectively down）所需的支持投票数量
    int quorum;
    // SENTINEL parallel-syncs <master-name> <number>选项的值
    //在执行故障转移操作时，可以同时对新的主服务器进行同步的从服务器数量
    int parallel_syncs;
    // SENTINEL failover-timeout <master-name> <ms>选项的值
    //刷新故障迁移状态的最大时限
    mstime_t failover_timeout;
    // ...
} sentinelRedisInstance;

// sentinelRedisInstance.addr 属 性 是 一 个 指 向sentinel.c/sentinelAddr结构的指针，这个结构保存着实例的IP地址和端口号
typedef struct sentinelAddr {
    char *ip;
    int port;
} sentinelAddr;
\`\`\`
创建连向主服务器的网络连接

初始化Sentinel的最后一步是创建连向被监视主服务器的网络连接，Sentinel将成为主服务器的客户端，它可以向主服务器发送命令，并从命令回复中获取相关的信息。

对于每个被Sentinel监视的主服务器来说，Sentinel会创建两个连向主服务器的异步网络连接：
- 一个是命令连接，这个连接专门用于向主服务器发送命令，并接收命令回复。
- 另一个是订阅连接，这个连接专门用于订阅主服务器的__sentinel__:hello频道。

为什么有两个连接？

在Redis目前的发布与订阅功能中，被发送的信息都不会保存在Redis服务器里面，如果在信息发送时，想要接收信息的客户端不在线或者断线，那么这个客户端就会丢失这条信息。因此，为了不丢失__sentinel__:hello频道的任何信息，Sentinel必须专门用一个订阅连接来接收该频道的信息。另一方面，除了订阅频道之外，Sentinel还必须向主服务器发送命令，以此来与主服务器进行通信，所以Sentinel还必须向主服务器创建命令连接。
因为Sentinel需要与多个实例创建多个网络连接，所以Sentinel使用的是异步连接

获取主服务器信息

哨兵会默认以10秒一次的频率通过命令向被监视的主服务器发送INFO命令,并通过分析INFO命令的回复来获取主服务器的当前消息.

通过分析主服务器返回的INFO命令回复，Sentinel可以获取以下两方面的信息：

一方面是关于主服务器本身的信息，包括run_id域记录的服务器运行ID，以及role域记录的服务器角色；
另一方面是关于主服务器属下所有从服务器的信息.至于主服务器返回的从服务器信息，则会被用于更新主服务器实例结构的slaves字典，这个字典记录了主服务器属下从服务器的名单.

获取从服务器信息

当Sentinel发现主服务器有新的从服务器出现时，Sentinel除了会为这个新的从服务器创建相应的实例结构之外，Sentinel还会创建连接到从服务器的命令连接和订阅连接。

在创建命令连接之后，Sentinel在默认情况下，会以每十秒一次的频率通过命令连接向从服务器发送INFO命令.

根据INFO命令的回复，Sentinel会提取出以下信息：
·从服务器的运行ID run_id。
·从服务器的角色role。
· 主 服 务 器 的 IP 地 址 master_host ， 以 及 主 服 务 器 的 端 口 号
master_port。
·主从服务器的连接状态master_link_status。
·从服务器的优先级slave_priority。
·从服务器的复制偏移量slave_repl_offset。根据这些信息，Sentinel会对从服务器的实例结构进行更新.

向主服务器和从服务器发送信息

在默认情况下，Sentinel会以每两秒一次的频率，通过命令连接向所有被监视的主服务器和从服务器发送以下格式的命令
\`\`\`
PUBLISH __sentinel__:hello "<s_ip>,<s_port>,<s_runid>,<s_epoch>,<m_name>,<m_ip>,<m_port>,<m_epoch>"
\`\`\`
这条命令向服务器的__sentinel__:hello频道发送了一条信息，信息的内容由多个参数组成：

·其中以s_开头的参数记录的是Sentinel本身的信息·而m_开头的参数记录的则是主服务器的信息

接收来自主服务器和从服务器的频道信息

当Sentinel与一个主服务器或者从服务器建立起订阅连接之后，Sentinel就会通过订阅连接，向服务器发送以下命令
\`\`\`
SUBSCRIBE __sentinel__:hello
\`\`\`

Sentinel对__sentinel__:hello频道的订阅会一直持续到Sentinel与服务器的连接断开为止。
这也就是说，对于每个与Sentinel连接的服务器，Sentinel既通过命令连接向服务器的__sentinel__:hello频道发送信息，又通过订阅连接从服务器的__sentinel__:hello频道接收信息

对于监视同一个服务器的多个Sentinel来说，一个Sentinel发送的 信 息 会 被 其 他 Sentinel 接 收 到 ， 这 些 信 息 会 被 用 于 更 新 其 他Sentinel对发送信息Sentinel的认知，也会被用于更新其他Sentinel对被监视服务器的认知。

当 一 个 Sentinel 从 __sentinel__:hello 频 道 收 到 一 条 信 息 时 ，Sentinel会对这条信息进行分析，提取出信息中的Sentinel IP地址、Sentinel端口号、Sentinel运行ID等八个参数，并进行以下检查:如果信息中记录的Sentinel运行ID和接收信息的Sentinel的运行ID相同，那么说明这条信息是Sentinel自己发送的，Sentinel将丢弃这条信息，不做进一步处理.相 反 地 ， 如 果 信 息 中 记 录 Sentinel 运 行 ID 和 接 收 信 息 的Sentinel的运行ID不相同，那么说明这条信息是监视同一个服务器的其他Sentinel发来的，接收信息的Sentinel将根据信息中的各个参数，对相应主服务器的实例结构进行更新。

更新sentinels字典

Sentinel为主服务器创建的实例结构中的sentinels字典保存了除Sentinel本身之外，所有同样监视这个主服务器的其他Sentinel的资料

因为一个Sentinel可以通过分析接收到的频道信息来获知其他Sentinel的存在，并通过发送频道信息来让其他Sentinel知道自己的存在，所以用户在使用Sentinel的时候并不需要提供各个Sentinel的地址信息，监视同一个主服务器的多个Sentinel可以自动发现对方。

创建连向其他Sentinel的命令连接

当Sentinel通过频道信息发现一个新的Sentinel时，它不仅会为新Sentinel在sentinels字典中创建相应的实例结构，还会创建一个连向新Sentinel 的命令连接， 而 新 Sentinel 也 同 样 会 创 建 连 向 这 个
Sentinel的命令连接，最终监视同一主服务器的多个Sentinel将形成相 互 连 接 的 网 络 ： Sentinel A 有 连 向 Sentinel B 的 命 令 连 接 ， 而Sentinel B也有连向Sentinel A的命令连接。

使用命令连接相连的各个Sentinel可以通过向其他Sentinel发送命令请求来进行信息交换，本章接下来将对Sentinel实现主观下线检测和客观下线检测的原理进行介绍，这两种检测都会使用Sentinel之间的命令连接来进行通信。

Sentinel之间不会创建订阅连接

检测主观下线状态

在默认情况下，Sentinel会以每秒一次的频率向所有与它创建了命令连接的实例（包括主服务器、从服务器、其他Sentinel在内）发送PING命令，并通过实例返回的PING命令回复来判断实例是否在线。

如果配置文件指定Sentinel1的down-after-milliseconds选项的值为50000毫秒，那么当主服务器master连续50000毫秒都向Sentinel1返回无效回复时，Sentinel1就会将master标记为主观下线，并在master所对应的实例结构的flags属性中打开SRI_S_DOWN标识

主观下线时长选项的作用范围

用户设置的down-after-milliseconds选项的值，不仅会被Sentinel用来判断主服务器的主观下线状态，还会被用于判断主服务器属下的所有从服务器，以及所有同样监视这个主服务器的其他Sentinel的主观下线状态。举个例子，如果用户向Sentinel设置了以下配置：

\`\`\`
sentinel monitor master 127.0.0.1 6379 2
sentinel down-after-milliseconds master 50000
\`\`\`

那么50000毫秒不仅会成为Sentinel判断master进入主观下线的标准，还会成为Sentinel判断master属下所有从服务器，以及所有同样监视master的其他Sentinel进入主观下线的标准。

多个Sentinel设置的主观下线时长可能不同

down-after-milliseconds选项另一个需要注意的地方是，对于监视同一个主服务器的多个Sentinel来说，这些Sentinel所设置的down-after-milliseconds选项的值也可能不同，因此，当一个Sentinel将主服务器判断为主观下线时，其他Sentinel可能仍然会认为主服务器处于在线状态。举个例子，如果Sentinel1载入了以下配置：
\`\`\`
sentinel monitor master 127.0.0.1 6379 2
sentinel down-after-milliseconds master 50000
\`\`\`
而Sentinel2则载入了以下配置：
\`\`\`
sentinel monitor master 127.0.0.1 6379 2
sentinel down-after-milliseconds master 10000
\`\`\`
那么当master的断线时长超过10000毫秒之后，Sentinel2会将master判断为主观下线，而Sentinel1却认为master仍然在 线 。 只 有 当 master 的 断 线 时 长 超 过 50000 毫 秒 之 后 ，
Sentinel1和Sentinel2才会都认为master进入了主观下线状态。

检查客观下线状态

当Sentinel将一个主服务器判断为主观下线之后，为了确认这个主服务器是否真的下线了，它会向同样监视这一主服务器的其他Sentinel进行询问，看它们是否也认为主服务器已经进入了下线状态（可以是主观下线或者客观下线）。当Sentinel从其他Sentinel那里接收到足够数量的已下线判断之后，Sentinel就会将从服务器判定为客观下线，并对主服务器执行故障转移操作。

发送SENTINEL is-master-down-by-addr命令
\`\`\`
SENTINEL is-master-down-by-addr <ip> <port> <current_epoch> <runid>
\`\`\`

接收SENTINEL is-master-down-by-addr命令

当一个Sentinel（目标Sentinel）接收到另一个Sentinel（源Sentinel ） 发 来 的 SENTINEL is-master-down-by 命 令 时 ， 目 标Sentinel会分析并取出命令请求中包含的各个参数，并根据其中的主服务器IP和端口号，检查主服务器是否已下线，然后向源Sentinel返回 一 条 包 含 三 个 参 数 的 Multi Bulk 回 复 作 为 SENTINEL is-master-down-by命令的回复：

根据其他Sentinel发回的SENTINEL is-master-down-by-addr命令回复，Sentinel将统计其他Sentinel同意主服务器已下线的数量，当这一数量达到配置指定的判断客观下线所需的数量时，Sentinel会将主服务器实例结构flags属性的SRI_O_DOWN标识打开，表示主服务器已经进入客观下线状态.

客观下线状态的判断条件

当认为主服务器已经进入下线状态的Sentinel的数量，超过Sentinel配置中设置的quorum参数的值，那么该Sentinel就会认为主服务器已经进入客观下线状态。比如说，如果Sentinel在启动时载入了以下配置
\`\`\`
sentinel monitor master 127.0.0.1 6379 2
\`\`\`
那么包括当前Sentinel在内，只要总共有两个Sentinel认为主服务器已经进入下线状态，那么当前Sentinel就将主服务器判断为客观下线


不同Sentinel判断客观下线的条件可能不同

同样以多的为主

选举领头Sentinel

当一个主服务器被判断为客观下线时，监视这个下线主服务器的各 个 Sentinel 会 进 行 协 商 ， 选 举 出 一 个 领 头 Sentinel ， 并 由 领 头Sentinel对下线主服务器执行故障转移操作。

以下是Redis选举领头Sentinel的规则和方法：

所有在线的Sentinel都有被选为领头Sentinel的资格，换句话说，监视同一个主服务器的多个在线Sentinel中的任意一个都有可能成为领头Sentinel。

· 每 次 进 行 领 头 Sentinel 选 举 之 后 ， 不 论 选 举 是 否 成 功 ， 所 有Sentinel的配置纪元（configuration epoch）的值都会自增一次。配置纪元实际上就是一个计数器，并没有什么特别的。
·在一个配置纪元里面，所有Sentinel都有一次将某个Sentinel设置为局部领头Sentinel的机会，并且局部领头一旦设置，在这个配置纪元里面就不能再更改。
· 每 个 发 现 主 服 务 器 进 入 客 观 下 线 的 Sentinel 都 会 要 求 其 他Sentinel将自己设置为局部领头Sentinel。
· 当 一 个 Sentinel （ 源 Sentinel ） 向 另 一 个 Sentinel （ 目 标Sentinel）发送SENTINEL is-master-down-by-addr命令，并且命令中的runid参数不是*符号而是源Sentinel的运行ID时，这表示源Sentinel要求目标Sentinel将前者设置为后者的局部领头Sentinel。
·Sentinel设置局部领头Sentinel的规则是先到先得：最先向目标Sentinel发送设置要求的源Sentinel将成为目标Sentinel的局部领头Sentinel，而之后接收到的所有设置要求都会被目标Sentinel拒绝。
·目标Sentinel在接收到SENTINEL is-master-down-by-addr命令之后，将向源Sentinel返回一条命令回复，回复中的leader_runid参 数 和 leader_epoch 参 数 分 别 记 录 了 目 标 Sentinel 的 局 部 领 头Sentinel的运行ID和配置纪元。
·源Sentinel在接收到目标Sentinel返回的命令回复之后，会检查回复中leader_epoch参数的值和自己的配置纪元是否相同，如果相同的话，那么源Sentinel继续取出回复中的leader_runid参数，如果leader_runid参数的值和源Sentinel的运行ID一致，那么表示目标Sentinel将源Sentinel设置成了局部领头Sentinel。
·如果有某个Sentinel被半数以上的Sentinel设置成了局部领头Sentinel，那么这个Sentinel成为领头Sentinel。举个例子，在一个由 10 个 Sentinel 组 成 的 Sentinel 系 统 里 面 ， 只 要 有 大 于等 于10/2+1=6个Sentinel将某个Sentinel设置为局部领头Sentinel，那么被设置的那个Sentinel就会成为领头Sentinel。
·因为领头Sentinel的产生需要半数以上Sentinel的支持，并且每个Sentinel在每个配置纪元里面只能设置一次局部领头Sentinel，所以在一个配置纪元里面，只会出现一个领头Sentinel。
·如果在给定时限内，没有一个Sentinel被选举为领头Sentinel，那么各个Sentinel将在一段时间之后再次进行选举，直到选出领头Sentinel为止。

故障转移

在选举产生出领头Sentinel之后，领头Sentinel将对已下线的主服务器执行故障转移操作，该操作包含以下三个步骤：
1）在已下线主服务器属下的所有从服务器里面，挑选出一个从服务器，并将其转换为主服务器。
2）让已下线主服务器属下的所有从服务器改为复制新的主服务器。
3）将已下线主服务器设置为新的主服务器的从服务器，当这个旧的主服务器重新上线时，它就会成为新的主服务器的从服务器。

选出新的主服务器

故障转移操作第一步要做的就是在已下线主服务器属下的所有从服务器中，挑选出一个状态良好、数据完整的从服务器，然后向这个从服务器发送SLAVEOF no one命令，将这个从服务器转换为主服务器。

新的主服务器是怎样挑选出来的

领头Sentinel会将已下线主服务器的所有从服务器保存到一个列表里面，然后按照以下规则，一项一项地对列表进行过滤：

1）删除列表中所有处于下线或者断线状态的从服务器，这可以保证列表中剩余的从服务器都是正常在线的。
2）删除列表中所有最近五秒内没有回复过领头Sentinel的INFO命令的从服务器，这可以保证列表中剩余的从服务器都是最近成功进行过通信的。
3）删除所有与已下线主服务器连接断开超过down-after-milliseconds*10毫秒的从服务器：down-after-milliseconds选项指定了判断主服务器下线所需的时间，而删除断开时长超过down-after-milliseconds*10毫秒的从服务器，则可以保证列表中剩余的从服务器都没有过早地与主服务器断开连接，换句话说，列表中剩余的从服务器保存的数据都是比较新的。

之后，领头Sentinel将根据从服务器的优先级，对列表中剩余的从服务器进行排序，并选出其中优先级最高的从服务器。

如果有多个具有相同最高优先级的从服务器，那么领头Sentinel将按照从服务器的复制偏移量，对具有相同最高优先级的所有从服务器进行排序，并选出其中偏移量最大的从服务器（复制偏移量最大的从服务器就是保存着最新数据的从服务器）。
最后，如果有多个优先级最高、复制偏移量最大的从服务器，那么领头Sentinel将按照运行ID对这些从服务器进行排序，并选出其中运行ID最小的从服务器。

修改从服务器的复制目标

当新的主服务器出现之后，领头Sentinel下一步要做的就是，让已下线主服务器属下的所有从服务器去复制新的主服务器，这一动作可以通过向从服务器发送SLAVEOF命令来实现.

将旧的主服务器变为从服务器

故障转移操作最后要做的是，将已下线的主服务器设置为新的主服务器的从服务器因为旧的主服务器已经下线，所以这种设置是保存在server1对应的实例结构里面的，当server1重新上线时，Sentinel就会向它发送SLAVEOF命令，让它成为server2的从服务器。

### 集群

Redis集群是Redis提供的分布式数据库方案，集群通过分片（sharding）来进行数据共享，并提供复制和故障转移功能。

本节将对集群的节点、槽指派、命令执行、重新分片、转向、故障转移、消息等各个方面进行介绍。

节点

一个Redis集群通常由多个节点（node）组成，在刚开始的时候，每个节点都是相互独立的，它们都处于一个只包含自己的集群当中，要组建一个真正可工作的集群，我们必须将各个独立的节点连接起来，构成一个包含多个节点的集群。

连接各个节点的工作可以使用\`CLUSER MEET <ip> <port>\`命令来完成

跟一个节点发生CLUSER MEET命令可以让node节点与ip和port所指定的节点握手,当握手成功后node节点就会将ip和port所指定的节点添加到node节点所在的集群中.

启动节点

一个节点就是一个运行在集群模式下的Redis服务器，Redis服务器在启动时会根据cluster-enabled配置选项是否为yes来决定是否开启服务器的集群模式

节点会继续使用所有在单机模式中使用的服务器组件, 比如说会继续使用文件事件处理器来处理命令请求和返回命令请求...

集群数据结构

clusterNode结构保存了一个节点的当前状态,比如节点创建的时间,节点的名字,节点当前的配置纪元,节点的IP地址和端口号等,每个节点都会使用clusterNode结构来记录自己的状态,并为集群中的所有其他节点都创建一个相应的clusterNode结构,以此来记录其他节点的状态.
\`\`\`c
struct clusterNode {
    //创建节点的时间
    mstime_t ctime;
    //节点的名字，由40个十六进制字符组成
    //例如68eef66df23420a5862208ef5b1a7005b806f2ff
    char name[REDIS_CLUSTER_NAMELEN];
    //节点标识
    //使用各种不同的标识值记录节点的角色（比如主节点或者从节点），
    //以及节点目前所处的状态（比如在线或者下线）。
    int flags;
    //节点当前的配置纪元，用于实现故障转移
    uint64_t configEpoch;
    //节点的IP地址
    char ip[REDIS_IP_STR_LEN];
    //节点的端口号
    int port;
    //保存连接节点所需的有关信息
    clusterLink *link;
    // ...
};
\`\`\`
link属性对应的是clusterLink结构,该结构保存的其实是连接节点所需要的有关信息,比如socket描述符,输入缓冲区和输出缓冲区:
\`\`\`c
typedef struct clusterLink {
    //连接的创建时间
    mstime_t ctime;
    // TCP套接字描述符
    int fd;
    //输出缓冲区，保存着等待发送给其他节点的消息（message）。
    sds sndbuf;
    //输入缓冲区，保存着从其他节点接收到的消息。
    sds rcvbuf;
    //与这个连接相关联的节点，如果没有的话就为NULL
    struct clusterNode *node;
} clusterLink;
\`\`\`
redisClient和clusterLink结构都有自己的socket描述符,输入输出缓冲区,区别在于,redisClient的socket是连接客户端的,clusterLink的socket是连接集群节点的.

最后，每个节点都保存着一个clusterState结构，这个结构记录了在当前节点的视角下，集群目前所处的状态，例如集群是在线还是下线，集群包含多少个节点，集群当前的配置纪元，诸如此类
\`\`\`c
typedef struct clusterState {
    //指向当前节点的指针
    clusterNode *myself;
    //集群当前的配置纪元，用于实现故障转移
    uint64_t currentEpoch;
    //集群当前的状态：是在线还是下线
    int state;
    //集群中至少处理着一个槽的节点的数量
    int size;
    //集群节点名单（包括myself节点）
    //字典的键为节点的名字，字典的值为节点对应的clusterNode结构
    dict *nodes;
    // ...
} clusterState;
\`\`\`
CLUSTER MEET命令的实现

通过向节点A发送CLUSTER MEET命令，客户端可以让接收命令的节点A将另一个节点B添加到节点A当前所在的集群里面
1）节点A会为节点B创建一个clusterNode结构，并将该结构添加到自己的clusterState.nodes字典里面。
2）之后，节点A将根据CLUSTER MEET命令给定的IP地址和端口号，向节点B发送一条MEET消息（message）。
3）如果一切顺利，节点B将接收到节点A发送的MEET消息，节点B会为节点A创建一个clusterNode结构，并将该结构添加到自己的clusterState.nodes字典里面。
4）之后，节点B将向节点A返回一条PONG消息。
5）如果一切顺利，节点A将接收到节点B返回的PONG消息，通过这条PONG消息节点A可以知道节点B已经成功地接收到了自己发送的MEET消息。
6）之后，节点A将向节点B返回一条PING消息。
7）如果一切顺利，节点B将接收到节点A返回的PING消息，通过这条PING消息节点B可以知道节点A已经成功地接收到了自己返回的PONG消息，握手完成。

之后，节点A会将节点B的信息通过Gossip协议传播给集群中的其他节点，让其他节点也与节点B进行握手，最终，经过一段时间之后，节点B会被集群中的所有节点认识。

#### 槽指派

Redis集群通过分片的形式来保存redis数据库中的键值对,集群中整个数据库被分成16384个槽,数据库中的每个键都数据这些槽中的一个,集群中的每个节点可以处理0-16384个槽.

当数据库中的16384个槽都有节点处理时,集群处于上线状态,相反若有一个槽没有被处理,则整个集群是下线状态.

通过向节点发送\`CLUSTER ADDSLOTS\`命令，我们可以将一个或多个槽指派（assign）给节点负责.
\`\`\`c
CLUSTER ADDSLOTS <slot> [slot ...]
127.0.0.1:7000> CLUSTER ADDSLOTS 0 1 2 3 4 ... 5000
OK
127.0.0.1:7000> CLUSTER NODES
9dfb4c4e016e627d9769e4c9bb0d4fa208e65c26 127.0.0.1:7002 master - 0 1388316664849 0 connected
68eef66df23420a5862208ef5b1a7005b806f2ff 127.0.0.1:7001 master - 0 1388316665850 0 connected
51549e625cfda318ad27423a31e7476fe3cd2939 :0 myself,master - 0 0 0 connected 0-5000
// 为了让7000、7001、7002三个节点所在的集群进入上线状态，我们继续执行以下命令，将槽5001至槽10000指派给节点7001负责：
127.0.0.1:7001> CLUSTER ADDSLOTS 5001 5002 5003 5004 ... 10000
OK
127.0.0.1:7002> CLUSTER ADDSLOTS 10001 10002 10003 10004 ... 16383
OK
\`\`\`
数据库中的16384个槽都已经被指派给了相应的节点，集群进入上线状态

记录节点的槽指派信息

clusterNode结构的slots属性和numslot属性记录了节点负责处理哪些槽：
\`\`\`c
struct clusterNode {
    // ...
    unsigned char slots[16384/8];
    int numslots;
};
\`\`\`
如果slots数组在索引i上的二进制位的值为1，那么表示节点负责处理槽i。如果slots数组在索引i上的二进制位的值为0，那么表示节点不负责处理槽i。

至于numslots属性则记 录 节 点 负 责 处 理 的 槽 的 数 量 ， 也 即 是slots数组中值为1的二进制位的数量

传播节点的槽指派信息

一个节点除了将自己负责处理的槽记录在clusterNode结构的slots属性和numslots,它还会将自己的slots数组通过消息发送给集群中的其他节点，以此来告知其他节点自己目前负责处理哪些槽。

当节点A通过消息接收到了B的slots数组,节点A会从自己的clusterState.nodes字典中查找节点B对应的clusterNode结构,并对结构中的slots数组进行保存或更新.

因为集群中的节点都会将自己的slots数组通过消息发送给集群中的其他节点,并且每个接收到slots数组的节点都会将数组保存到相应节点的clusterNode结构中,因此，集群中的每个节点都会知道数据库中的16384个槽分别被指派给了集群中的哪些节点。

记录集群所有槽的指派信息

clusterState结构中的slots数组记录了集群中所有16384个槽的指派信息：
\`\`\`c
typedef struct clusterState {
    // ...
    clusterNode *slots[16384];
    // ...
} clusterState;
\`\`\`
slots 数 组 包 含 16384 个 项 ， 每 个 数 组 项 都 是 一 个 指 向clusterNode结构的指针：
- 如果slots[i]指针指向NULL，那么表示槽i尚未指派给任何节点。
- 如果slots[i]指针指向一个clusterNode结构，那么表示槽i已经指派给了clusterNode结构所代表的节点

如果只将槽指派信息保存在各个节点的clusterNode.slots数组里，会出现一些无法高效地解决的问题，而clusterState.slots数组的存在解决了这些问题

如果节点只使用clusterNode.slots数组来记录槽的指派信息，那么为了知道槽i是否已经被指派，或者槽i被指派给了哪个节点，程序需要遍历clusterState.nodes字典中的所有clusterNode结构，检查这些结构的slots数组，直到找到负责处理槽i的节点为止，这个过程的复 杂 度 为 O （ N ） ， 其 中 N 为 clusterState.nodes 字 典 保 存 的clusterNode结构的数量。

而通过将所有槽的指派信息保存在clusterState.slots数组里面，程序要检查槽i是否已经被指派，又或者取得负责处理槽i的节点，只需要访问clusterState.slots[i]的值即可，这个操作的复杂度仅为O（1）。

CLUSTER ADDSLOTS命令的实现

CLUSTER ADDSLOTS命令接受一个或多个槽作为参数，并将所有输入的槽指派给接收该命令的节点负责,若输入的槽有任何一个槽有节点,那么返回错误.

最后，在CLUSTER ADDSLOTS命令执行完毕之后，节点会通过发送消息告知集群中的其他节点，自己目前正在负责处理哪些槽。

#### 在集群中执行命令

在对数据库中的16384个槽都进行了指派之后，集群就会进入上线状态，这时客户端就可以向集群中的节点发送数据命令了。当客户端向节点发送与数据库键有关的命令时，接收命令的节点会计算出命令要处理的数据库键属于哪个槽，并检查这个槽是否指派给了自己：
- 如果键所在的槽正好就指派给了当前节点，那么节点直接执行这个命令。
- 如果键所在的槽并没有指派给当前节点，那么节点会向客户端返回一个MOVED错误，指引客户端转向（redirect）至正确的节点，并再次发送之前想要执行的命令。

计算键属于哪个槽

节点使用以下算法来计算给定键key属于哪个槽：
\`\`\`py
def slot_number(key):
return CRC16(key) & 16383
\`\`\`
其中CRC16（key）语句用于计算键key的CRC-16校验和，而&16383语句则用于计算出一个介于0至16383之间的整数作为键key的槽号。

使用\`CLUSTER KEYSLOT <key>\`命令可以查看一个给定键属于哪个槽：
\`\`\`c
127.0.0.1:7000> CLUSTER KEYSLOT "date"
(integer) 2022
127.0.0.1:7000> CLUSTER KEYSLOT "msg"
(integer) 6257
\`\`\`

判断槽是否由当前节点负责处理

当节点计算出键所属的槽i之后，节点就会检查自己在clusterState.slots数组中的项i，判断键所在的槽是否由自己负责

MOVED错误

当节点发现键所在的槽并非由自己负责处理的时候，节点就会向客户端返回一个MOVED错误，指引客户端转向至正在负责槽的节点。
\`\`\`c
MOVED <slot> <ip>:<port>
\`\`\`
一个客户端通常会与集群中多个节点建立socket连接,而所谓的节点转向实际上就是换一个socket来发送命令

如果客户端还没有与想要转向的节点建立socket连接,那么客户端会先根据MOVED错误提供的IP地址和端口号来建立连接,再进行转向.

集群模式的redis-cli客户端在接收到MOVED错误时，并不会打印出MOVED错误，而是根据MOVED错误自动进行节点转向，并打印出转向信息，所以我们是看不见节点返回的MOVED错误的.

#####  节点数据库的实现
集群节点保存键值对以及键值对的过期方式与Redis单机保存键值对过期时间的方式完全相同.

不同的是,节点只能使用0号数据库

另外，除了将键值对保存在数据库里面之外，节点还会用clusterState结构中的slots_to_keys跳跃表来保存槽和键之间的关系

### 重新分片

Redis集群的重新分片操作可以将任意数量已经指派给某个节点的槽指派给另一个节点,并且相关槽所属的键值对也会从源节点被移动到目标节点.

重新分片操作可以在线进行,在重新分片过程中,集群不需要下线,而且源节点和目标节点都可以继续处理命令请求.

重新分片的实现原理

Redis集群的重新分片操作其实是由edis的集群管理软件redis-trib负责执行的，Redis提供了进行重新分片所需的所有命令，而redis-trib则通过向源节点和目标节点发送命令来进行重新分片操作。

redis-trib对集群的单个槽slot进行重新分片的步骤如下：

1. 对目标节点发送\`CLUSTER SETSLOT<slot>IMPORTING<source_id>命令\`让目标节点准备好从源节点导入属于槽的键值对
2. redis-trib 对 源 节 点 发 送 \`CLUSTER SETSLOT<slot>MIGRATING<target_id>\`命令，让源节点准备好将属于槽slot的键值对迁移（migrate）至目标节点。
3. redis-trib向源节点发送\`CLUSTER GETKEYSINSLOT<slot><count>\`命令，获得最多count个属于槽slot的键值对的键名（key name）。
4. 对于步骤3获得的每个键名，redis-trib都向源节点发送一个\`MIGRATE<target_ip><target_port><key_name>0<timeout>\`命令，将被选中的键原子地从源节点迁移至目标节点。
5. 重复3-4直到所有的键值对被迁移完毕
6. redis-trib 向 集 群 中 的 任 意 一 个 节 点 发 送 \`CLUSTERSETSLOT<slot>NODE<target_id>\`命令，将槽slot指派给目标节点，这一指派信息会通过消息发送至整个集群，最终集群中的所有节点都会知槽slot已经指派给了目标节点。

### ASK错误

在进行重新分片期间，源节点向目标节点迁移一个槽的过程中，可能会出现这样一种情况：属于被迁移槽的一部分键值对保存在源节点里面，而另一部分键值对则保存在目标节点里面。

当客户端向源节点发送一个与数据库键有关的命令，并且命令要处理的数据库键恰好就属于正在被迁移的槽时, 源节点会优先从自己的数据库里查找键,如果找到的话,直接执行客户端发送的命令,相反如果源节点没能在自己的数据库里找到,就可能已经迁移至目标节点,源节点就向客户端返回一个ASK错误,指引客户端转向正在导入槽的目标节点,并且再次发送之前想要发送的命令

和接到MOVED错误时的情况类似，集群模式的redis-cli在接到ASK错误时也不会打印错误，而是自动根据错误提供的IP地址和端口进行转向动作。如果想看到节点发送的ASK错误的话，可以使用单机模式的redis-cli客户端


CLUSTER SETSLOT IMPORTING命令的实现

clusterState结构的importing_slots_from数组记录了当前节点正在从其他节点导入的槽：

如 果 importing_slots_from[i] 的 值 不 为 NULL ， 而 是 指 向 一 个clusterNode结构，那么表示当前节点正在从clusterNode所代表的节点导入槽i。

在对集群进行重新分片的时候，向目标节点发送命令：
\`\`\`
CLUSTER SETSLOT <i> IMPORTING <source_id>
\`\`\`
可以将目标节点clusterState.importing_slots_from[i]的值设置为source_id所代表节点的clusterNode结构。

CLUSTER SETSLOT MIGRATING命令的实现

clusterState结构的migrating_slots_to数组记录了当前节点正在迁移至其他节点的槽

如 果 migrating_slots_to[i] 的 值 不 为 NULL ， 而 是 指 向 一 个clusterNode结构，那么表示当前节点正在将槽i迁移至clusterNode所代表的节点。在对集群进行重新分片的时候，向源节点发送命令
\`\`\`
CLUSTER SETSLOT <i> MIGRATING <target_id>
\`\`\`

ASK错误

如果节点收到一个键key的命令请求,并且键key所属的槽i正好指派给了当前节点,那么就尝试从节点自己的数据库里查找key,如果找到了节点就直接执行客户端发送的命令.

与此相反，如果节点没有在自己的数据库里找到键key，那么节点会检查自己的clusterState.migrating_slots_to[i]，看键key所属的槽i是否正在进行迁移，如果槽i的确在进行迁移的话，那么节点会向客户端发送一个ASK错误，引导客户端到正在导入槽i的节点去查找键key。

ASKING命令

在一般情况下，如果客户端向节点发送一个关于槽i的命令，而槽i又没有指派给这个节点的话，那么节点将向客户端返回一个MOVED错误；但是，如果节点的clusterState.importing_slots_from[i]显示节点正在导入槽i，并且发送命令的客户端带有REDIS_ASKING标识，那么节点将破例执行这个关于槽i的命令一次。

### 复制与故障转移
Redis集群中的节点分为主节点（master）和从节点（slave），其中主节点用于处理槽，而从节点则用于复制某个主节点，并在被复制的主节点下线时，代替下线主节点继续处理命令请求。

这时如果一个主节点下线,那么集群仍在正常工作的几个节点将从其从节点中选择选举出一个新节点作为新的主节点,这个新节点将接管原来节点处理的槽,并继续处理客户端的命令请求, 并且原主机的从主机也会改为复制新主机.

此时如果原主节点重新上线,它也会成为新节点的从节点.

设置从节点

向一个节点发送命令：\`CLUSTER REPLICATE <node_id>\`

可以让接收命令的节点成为node_id所指定节点的从节点，并开始对主节点进行复制

接收到该命令的节点首先会在自己的clusterState.nodes字典中找到node_id 所 对 应 节 点 的 clusterNode 结 构 ， 并 将 自 己 的clusterState.myself.slaveof指针指向这个结构，以此来记录这个节点正在复制的主节点

然后节点会修改自己在clusterState.myself.flags中的属性，关闭原本的REDIS_NODE_MASTER标识，打开REDIS_NODE_SLAVE标识，表示这个节点已经由原来的主节点变成了从节点。

最后节点会调用复制代码,对指定节点进行复制.

故障检测

集群中每个节点会定期向集群中的其他节点发送PING消息,监测对方是否在线,如果接收PING的节点没有在规定时间内返回PONG,那么发送PING消息的节点就会将接收PING消息的节点标记为疑似下线（probablefail，PFAIL）.

集群中的各个节点会通过相互发送消息来交换集群中各个节点的消息,例如某个节点是否处于在线状态,疑似下线状态（PFAIL），还是已下线状态（FAIL）。

当一个主节点A通过消息得知主节点B认为主节点C进入了疑似下线状态时，主节点A会在自己的clusterState.nodes字典中找到主节点C所对应的clusterNode结构，并将主节点B的下线报告（failurereport）添加到clusterNode结构的fail_reports链表里面

如果一个集群中半数以上负责槽的主节点都将节点x报告为疑似下线,那么这个主节点将x节点标记为下线,并且将x下线的消息向集群广播,所有收到这条FAIL消息的节点都会立即将主节点x标记为已下线。

故障转移

当一个从节点发现自己正在复制的主节点进入了已下线状态时，从节点将开始对下线主节点进行故障转移，以下是故障转移的执行步骤

1）复制下线主节点的所有从节点里面，会有一个从节点被选中。点。
3）新的主节点会撤销所有对已下线主节点的槽指派，并将这些槽全部指派给自己。
4）新的主节点向集群广播一条PONG消息，这条PONG消息可以让集群中的其他节点立即知道这个节点已经由从节点变成了主节点，并且这个主节点已经接管了原本由已下线节点负责处理的槽。
5）新的主节点开始接收和自己负责处理的槽有关的命令请求，故障转移完成。

选举新的主节点

新的主节点是通过选举产生的。

1）集群的配置纪元是一个自增计数器，它的初始值为0。
2）当集群里的某个节点开始一次故障转移操作时，集群配置纪元的值会被增一。
3）对于每个配置纪元，集群里每个负责处理槽的主节点都有一次投票的机会，而第一个向主节点要求投票的从节点将获得主节点的投票。
4）当从节点发现自己正在复制的主节点进入已下线状态时，从节点会向集群广播一条CLUSTERMSG_TYPE_FAILOVER_AUTH_REQUEST消息，要求所有收到这条消息、并且具有投票权的主节点向这个从节点投票。
5）如果一个主节点具有投票权（它正在负责处理槽），并且这个主节点尚未投票给其他从节点，那么主节点将向要求投票的从节点返回一条CLUSTERMSG_TYPE_FAILOVER_AUTH_ACK消息，表示这个主节点支持从节点成为新的主节点。
6 ） 每 个 参 与 选 举 的 从 节 点 都 会 接 收CLUSTERMSG_TYPE_FAILOVER_AUTH_ACK消息，并根据自己收到了多少条这种消息来统计自己获得了多少主节点的支持。
7）如果集群里有N个具有投票权的主节点，那么当一个从节点收集到大于等于N/2+1张支持票时，这个从节点就会当选为新的主节点。
8）因为在每一个配置纪元里面，每个具有投票权的主节点只能投一次票，所以如果有N个主节点进行投票，那么具有大于等于N/2+1张支持票的从节点只会有一个，这确保了新的主节点只会有一个。
9）如果在一个配置纪元里面没有从节点能收集到足够多的支持票，那么集群进入一个新的配置纪元，并再次进行选举，直到选出新的主节点为止。这个选举新主节点的方法和第16章介绍的选举领头Sentinel的方法非常相 似，因为两者都是基于Raft算法的领头选举leade relection）方法来实现的。

### 消息

集群中的各个节点通过发送和接收消息（message）来进行通信，我们称发送消息的节点为发送者（sender），接收消息的节点为接收者（receiver）

节点发送的消息主要有以下五种：

- MEET消息：当发送者接到客户端发送的CLUSTER MEET命令时，发送者会向接收者发送MEET消息，请求接收者加入到发送者当前所处的集群里面。
- PING消息：集群里的每个节点默认每隔一秒钟就会从已知节点列表中随机选出五个节点，然后对这五个节点中最长时间没有发送过PING消息的节点发送PING消息，以此来检测被选中的节点是否在线。
- PONG消息：当接收者收到发送者发来的MEET消息或者PING消息时，为了向发送者确认这条MEET消息或者PING消息已到达，接收者会向发送者返回一条PONG消息。
- FAIL消息：当一个主节点A判断另一个主节点B已经进入FAIL状态时，节点A会向集群广播一条关于节点B的FAIL消息，所有收到这条消息的节点都会立即将节点B标记为已下线。
- PUBLISH消息：当节点接收到一个PUBLISH命令时，节点会执行这 个 命 令 ， 并 向 集 群 广 播 一 条 PUBLISH 消 息 ， 所 有 接 收 到 这 条PUBLISH消息的节点都会执行相同的PUBLISH命令。

一条消息由消息头（header）和消息正文（data）组成，接下来的内容将首先介绍消息头，然后再分别介绍上面提到的五种不同类型的消息正文。

#### 消息头
节点发送的所有消息都由一个消息头包裹，消息头除了包含消息正文之外，还记录了消息发送者自身的一些信息，因为这些信息也会被消息接收者用到，所以严格来讲，我们可以认为消息头本身也是消息的一部分。

\`\`\`c
typedef struct {
    //消息的长度（包括这个消息头的长度和消息正文的长度）
    uint32_t totlen;
    //消息的类型
    uint16_t type;
    //消息正文包含的节点信息数量
    //只在发送MEET PING PONG 这三种Gossip 协议消息时使用
    uint16_t count;
    //发送者所处的配置纪元
    uint64_t currentEpoch;
    //如果发送者是一个主节点，那么这里记录的是发送者的配置纪元
    // 如果发送者是一个从节点，那么这里记录的是发送者正在复制的主节点的配置纪元
    uint64_t configEpoch;
    //发送者的名字（ID）
    char sender[REDIS_CLUSTER_NAMELEN];
    //发送者目前的槽指派信息
    unsigned char myslots[REDIS_CLUSTER_SLOTS/8];
    //如果发送者是一个从节点，那么这里记录的是发送者正在复制的主节点的名字
    //如果发送者是一个主节点，那么这里记录的是REDIS_NODE_NULL_NAME
    //（一个40字节长，值全为0的字节数组）
    char slaveof[REDIS_CLUSTER_NAMELEN];
    //发送者的端口号
    uint16_t port;
    //发送者的标识值
    uint16_t flags;
    //发送者所处集群的状态
    unsigned char state;
    //消息的正文（或者说，内容）
    union clusterMsgData data;
} clusterMsg;
\`\`\`
clusterMsg.data属性指向联合cluster.h/clusterMsgData，这个联合就是消息的正文：
\`\`\`c
union clusterMsgData {
    // MEET、PING、PONG消息的正文
    struct {
        //每条MEET、PING、PONG消息都包含两个
        // clusterMsgDataGossip结构
        clusterMsgDataGossip gossip[1];
    } ping;
    // FAIL消息的正文
    struct {
        clusterMsgDataFail about;
    } fail;
    // PUBLISH消息的正文
    struct {
        clusterMsgDataPublish msg;
    } publish;
    //其他消息的正文...
};
\`\`\`

MEET、PING、PONG消息的实现

Redis集群中的各个节点通过Gossip协议来交换各自关于不同节点的状态信息，其中Gossip协议由MEET、PING、PONG三种消息实现，这三种消息的正文都由两个cluster.h/clusterMsgDataGossip结构组成：
\`\`\`c
union clusterMsgData {
// ...
// MEET、PING和PONG消息的正文
struct {
//每条MEET、PING、PONG消息都包含两个
// clusterMsgDataGossip结构
clusterMsgDataGossip gossip[1];
} ping;
//其他消息的正文...
};
\`\`\`
当接收者收到MEET、PING、PONG消息时，接收者会访问消息正文中的两个clusterMsgDataGossip结构，并根据自己是否认识clusterMsgDataGossip结构中记录的被选中节点来选择进行哪种操作：
- 如果被选中节点不存在于接收者的已知节点列表，那么说明接收者是第一次接触到被选中节点，接收者将根据结构中记录的IP地址和端口号等信息，与被选中节点进行握手。
- 如果被选中节点已经存在于接收者的已知节点列表，那么说明接收者之前已经与被选中节点进行过接触，接收者将根据clusterMsgDataGossip结构记录的信息，对被选中节点所对应的clusterNode结构进行更新。

举个发送PING消息和返回PONG消息的例子，假设在一个包含A、B、C、D、E、F六个节点的集群里：
·节点A向节点D发送PING消息，并且消息里面包含了节点B和节点C的信息，当节点D收到这条PING消息时，它将更新自己对节点B和节点C的认识。
·之后，节点D将向节点A返回一条PONG消息，并且消息里面包含了节点E和节点F的消息，当节点A收到这条PONG消息时，它将更新自己对节点E和节点F的认识。

FAIL消息的实现

当集群里的主节点A将主节点B标记为已下线（FAIL）时，主节点A将向集群广播一条关于主节点B的FAIL消息，所有接收到这条FAIL消息的节点都会将主节点B标记为已下线。

在集群的节点数量比较大的情况下，单纯使用Gossip协议来传播节点的已下线信息会给节点的信息更新带来一定延迟，因为Gossip协议消息通常需要一段时间才能传播至整个集群，而发送FAIL消息可以让集群里的所有节点立即知道某个主节点已下线，从而尽快判断是否需要将集群标记为下线，又或者对下线主节点进行故障转移。

FAIL消息的正文由cluster.h/clusterMsgDataFail结构表示，这个结构只包含一个nodename属性，该属性记录了已下线节点的名字：
\`\`\`c
typedef struct {
    char nodename[REDIS_CLUSTER_NAMELEN];
} clusterMsgDataFail;
\`\`\`
因为集群里的所有节点都有一个独一无二的名字，所以FAIL消息里面只需要保存下线节点的名字，接收到消息的节点就可以根据这个名字来判断是哪个节点下线了。

PUBLISH消息的实现

当客户端向集群中的某个节点发送命令：
\`\`\`c
PUBLISH <channel> <message>
\`\`\`
的时候,接收到PUBLISH命令的节点不仅会向channel频道发送消息message，它还会向集群广播一条PUBLISH消息，所有接收到这条PUBLISH消息的节点都会向channel频道发送message消息, 将导致集群中的所有节点都向channel频道发送message消息。

PUBLISH消息的正文由cluster.h/clusterMsgDataPublish结构表示：
\`\`\`c
typedef struct {
    uint32_t channel_len;
    uint32_t message_len;
    //定义为8字节只是为了对齐其他消息结构
    //实际的长度由保存的内容决定
    unsigned char bulk_data[8];
} clusterMsgDataPublish;
\`\`\`

clusterMsgDataPublish 结 构 的 bulk_data 属 性 是 一 个 字 节 数组 ， 这 个 字 节 数 组 保 存 了 客 户 端 通 过 PUBLISH 命 令 发 送 给 节 点 的channel 参 数 和 message 参 数 ， 而结 构 的 channel_len 和message_len则分别保存了channel参数的长度和message参数的长度


### Redis分布式锁问题
Redis是如何实现分布式锁的?

Redis本身可以被多个客户端访问,所以恰好是一个共享存储系统,可以来保存分布式锁,而且redis的读写性能很高,足够应付高并发场景了.

Redis的SET命令有个NX参数可以实现在key不存在时插入,所以可以用它实现分布式锁:
1. key不存在,则直接插入成功
2. key存在则插入失败

我们可以看到命令是这样的
\`\`\`
SET lock_key unique_value NX 
expire lock_key px 10000

SET lock_key unique_value NX PX 10000
\`\`\`
选择下面一种,因为可能刚设置了锁,第二步的expire设置过期时间就失败了,所以必须合并到一步,采用第二种方式
- lock_key 就是 key 键；
- unique_value 是客户端生成的唯一的标识，区分来自不同客户端的锁操作；
- NX 代表只在 lock_key 不存在时，才对 lock_key 进行设置操作；
- PX 10000 表示设置 lock_key 的过期时间为 10s，这是为了避免客户端发生异常而无法释放锁。

那么解锁呢?解锁需要1. 保证解锁的客户端是持有锁的客户端 2. 删除锁
所以需要LUA脚本支持

\`\`\`lua
// 释放锁时，先比较 unique_value 是否相等，避免锁的误释放
if redis.call("get",KEYS[1]) == ARGV[1] then
    return redis.call("del",KEYS[1])
else
    return 0
end
\`\`\`

基于 Redis 实现分布式锁有什么优缺点？
基于 Redis 实现分布式锁的优点：

    性能高效（这是选择缓存实现分布式锁最核心的出发点）。
    实现方便。很多研发工程师选择使用 Redis 来实现分布式锁，很大成分上是因为 Redis 提供了 setnx 方法，实现分布式锁很方便。
    避免单点故障（因为 Redis 是跨集群部署的，自然就避免了单点故障）。

基于 Redis 实现分布式锁的缺点：

    超时时间不好设置。如果锁的超时时间设置过长，会影响性能，如果设置的超时时间过短会保护不到共享资源。比如在有些场景中，一个线程 A 获取到了锁之后，由于业务代码执行时间可能比较长，导致超过了锁的超时时间，自动失效，注意 A 线程没执行完，后续线程 B 又意外的持有了锁，意味着可以操作共享资源，那么两个线程之间的共享资源就没办法进行保护了。
        那么如何合理设置超时时间呢？ 我们可以基于续约的方式设置超时时间：先给锁设置一个超时时间，然后启动一个守护线程，让守护线程在一段时间后，重新设置这个锁的超时时间。实现方式就是：写一个守护线程，然后去判断锁的情况，当锁快失效的时候，再次进行续约加锁，当主线程执行完成后，销毁续约锁即可，不过这种方式实现起来相对复杂。

    Redis 主从复制模式中的数据是异步复制的，这样导致分布式锁的不可靠性。如果在 Redis 主节点获取到锁后，在没有同步到其他节点时，Redis 主节点宕机了，此时新的 Redis 主节点依然可以获取锁，所以多个应用服务就可以同时获取到锁。

#### Redis 如何解决集群情况下分布式锁的可靠性？

Redis 官方已经设计了一个分布式锁算法 Redlock（红锁）。

它是基于多个 Redis 节点的分布式锁，即使有节点发生了故障，锁变量仍然是存在的，客户端还是可以完成锁操作。

Redlock 算法的基本思路，是让客户端和多个独立的 Redis 节点依次请求申请加锁，如果客户端能够和半数以上的节点成功地完成加锁操作，那么我们就认为，客户端成功地获得分布式锁，否则加锁失败。

Redlock 算法加锁三个过程：

    第一步是，客户端获取当前时间。

    第二步是，客户端按顺序依次向 N 个 Redis 节点执行加锁操作：
        加锁操作使用 SET 命令，带上 NX，EX/PX 选项，以及带上客户端的唯一标识。
        如果某个 Redis 节点发生故障了，为了保证在这种情况下，Redlock 算法能够继续运行，我们需要给「加锁操作」设置一个超时时间（不是对「锁」设置超时时间，而是对「加锁操作」设置超时时间）。

    第三步是，一旦客户端完成了和所有 Redis 节点的加锁操作，客户端就要计算整个加锁过程的总耗时（t1）。

加锁成功要同时满足两个条件（简述：如果有超过半数的 Redis 节点成功的获取到了锁，并且总耗时没有超过锁的有效时间，那么就是加锁成功）：

    条件一：客户端从超过半数（大于等于 N/2+1）的 Redis 节点上成功获取到了锁；
    条件二：客户端获取锁的总耗时（t1）没有超过锁的有效时间。

加锁成功后，客户端需要重新计算这把锁的有效时间，计算的结果是「锁的最初有效时间」减去「客户端为获取锁的总耗时（t1）」。

加锁失败后，客户端向所有 Redis 节点发起释放锁的操作，释放锁的操作和在单节点上释放锁的操作一样，只要执行释放锁的 Lua 脚本就可以了。 -->`,r:{minutes:127.8,words:38341},y:"a",t:"Redis笔记",i:"edit"},[":md"]],["v-5ff9675f","/posts/program/rust/basic/global-variable.html",{d:16936992e5,l:"2023年9月3日",c:["rust"],g:["rust"],o:!0,e:`<p>声明一个全局变量在其他语言中看起来非常简单，但是在Rust中，由于生命周期特性，让这个本应该特别简单的概念使用起来无比复杂...</p>
`,r:{minutes:6.98,words:2094},y:"a",t:"全局变量",i:"edit"},[":md"]],["v-75b021da","/posts/thinking/2021/thinking/2021-What-I-do.html",{d:16396992e5,l:"2021年12月17日",c:["years"],g:["redis","consistency"],o:!0,e:`<h1> 我在2021年做了些什么？</h1>
<p>记录时间与我而言仅仅只是手段，重要的是明白自己的时间都花在了哪里，或许哪里又可以有所改进？或许，自己的效率又有哪里可以提升的空间？又或许自己在过去一年又有哪些未完成的学习和工作任务？等等</p>
<p>这些问题相信每个人都遇到过，可能有相应的对应方法，又或许仅仅是使用鸵鸟策略对其相视不见。</p>
<p>提出问题却不去想办法解决问题是耍流氓的行为。既然我能心安理得的提出这些问题，那么相应的我就有责任去回答这些问题的解决方案。</p>
<p>当然时间又是一个不可再生资源，至少对于现在是，在可遇见的未来更是。这个不可再生资源又和外界认为的很不一样。煤、石油、天然气等等这些所谓的不可再生资源是有解决方案的。只要在以往的不可再生资源在未消耗完之前，寻找到新的可代替的资源就可以实现持续发展了。比如在煤炭用完之前找到了石油，在石油用完之前找到太阳能，在太阳能竭尽之前找到可以直接使用恒星能量的方法或者实现可控核聚变就没什么问题。</p>`,r:{minutes:6.48,words:1945},y:"a",t:"我在2021年做了些什么？",i:"edit"},[":md"]],["v-191e3f24","/posts/thinking/2021/thinking/I-wrote-a-blockchain-in-160-lines-of-code.html",{d:16197408e5,l:"2021年4月30日",g:["blockchain"],o:!0,e:`<h1> 我用160行代码写出了个区块链...</h1>
<figure><img src="https://pic.editoe.com/b1e68981168aed2b536ac06deddedc53db2fd6f38d8561e4a914247b173901c6.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>完成本篇教程，你将会做出一条属于自己的区块链系统</p>
<p>你可以在自己的浏览器中显示自己的区块链系统，类似于下图所示</p>
<figure><img src="https://pic.editoe.com/f1362f7d18873f3edaab827cc966ff75be5cdf3feb7832d0e3b5cec0ed5125ba.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,r:{minutes:11.61,words:3482},y:"a",t:"我用160行代码写出了个区块链...",i:"edit"},[":md"]],["v-47375370","/posts/thinking/2021/thinking/I-wrote-a-new-App-that-could-help-me-in-immersed.html",{d:16386624e5,l:"2021年12月5日",g:["white-noise","music"],o:!0,e:`<h1> 我写了个APP可以帮助我入定</h1>
<h1> I Wrote a new App that could help me in immersed</h1>
<p>In the past few years, Tide has always been a good App for people who like to meditate. But with the development of time, the tide has become bloated, contrary to its original intention. So three days ago, I decided to develop a new App to replace the Tide at least for me.</p>`,r:{minutes:1.47,words:440},y:"a",t:"我写了个APP可以帮助我入定",i:"edit"},[":md"]],["v-5376a85d","/posts/thinking/2021/thinking/cosmic-origin.html",{d:16111008e5,l:"2021年1月20日",g:["imagine"],o:!0,e:`<h1> 宇宙起源</h1>
<h1> Cosmic origin</h1>
<p>The past universe was in a state of infinitely high density and temperature before a finite time. This state is called a singularity. This high-temperature and high-density phase in the very early stage of the universe is called the "Big Bang", which is regarded as the birth period of our universe. So far, this period of the Big Bang has a history of 13.7 billion years.</p>`,r:{minutes:10.11,words:3033},y:"a",t:"宇宙起源",i:"edit"},[":md"]],["v-6d02af8e","/posts/thinking/2021/thinking/learn-again.html",{d:1644624e6,l:"2022年2月12日",c:["learn"],g:["learn","thinging"],o:!0,e:`<h1> 学习学习再学习</h1>
<p>这篇文章的标题选用李笑来以前的公众号名，看起来有点抄袭的意思了。但其实不是一个意思，根据李笑来的说法，这里的学习学习再学习，三个学习中第二个是名词，其他两个是动词。有点绕口，具体的解释是这样子的：先去学习正确学习的方法，再去学习，这样的学习就比较高效了。</p>
<p>但本文的学习学习再学习对待的是特定领域，比如你要学Javascript，那么你就先去学一学基础语法，确保大概能看懂别人的程序代码，注意：这里是第一个学习。接下来直接上手去做一点自己感兴趣的东西，或者直接去看别人的代码都可以，然后自己写一写，然后发现还是由很多东西没有掌握明白，于是逢山开路，遇河搭桥，这样子，此谓第二个学习，具体是有目的地去解决一些现实问题。到然后再去全然巩固一遍Javascript的全部概念，甚至底层的垃圾回收算法，词法分析，编译器等等问题，这就是第三个学习，全面。</p>`,r:{minutes:3.33,words:998},y:"a",t:"学习学习再学习",i:"edit"},[":md"]],["v-48804d80","/posts/thinking/2022/thinking/Absolutely-Correct.html",{d:16573248e5,l:"2022年7月9日",c:["thinking"],g:["thinking"],o:!0,e:`<h1> 绝对的正确</h1>
<p>绝对的正确存不存在？这对绝大多数人来讲是一个无须讨论的问题。因为对于他们来讲我们的时代就是毫无疑问的正确，所有的事物都是正确的，科学技术，艺术文化。</p>
<p>当我们回头往过去看，往往一切都是那么地失败，仿佛过去的都是错误的，甚至当我们看向我们自己也往往是同样的想法：过去犯的错误太多，如果...就好了，或者要是...，我就...连我们自身都会常常会有这样的想法。</p>
<p>但我们这个时代有什么不同呢？事实上是...没什么不同。这意味着我们的时代往往在当下看确实是<strong>前所未有的正确</strong>，但不用多久甚至五到十年事情往往就会发生变化，又因为信息革命让我们每个人的链接比以往放大了无数倍，所以未来的列车事实上也是加速度向我们驶来的。</p>`,r:{minutes:4.81,words:1444},y:"a",t:"绝对的正确",i:"edit"},[":md"]],["v-374fb63b","/posts/thinking/2022/thinking/Battle-Internet.html",{d:16573248e5,l:"2022年7月9日",c:["thinking"],g:["network","blockchain","thinging"],o:!0,e:`<h1> 个体的反击</h1>
<p>有时候你不得不承认这个世界发展的速度已经超过了我们的想象，有时候在一个领域里一个新蹦出来的知识还没怎么理解透彻，回头一看，又新蹦出来一堆新发明的名词。这不仅仅是对我们考验着我们对资讯的理解和处理能力，也不单单挑战对技术的理解，更挑战着我们对这个世界的认知方式。</p>
<p>在这里还需要熟知的一点是，我们中的绝大多数人都生活在已经熟知的领域之内，因为自己在熟悉的领域中更清楚自己所处的位置以及知晓如何继续下去。你是学生，那么考试成绩就是证明自己的学有所成的有效方式，那么继续做个学生其实是生活在自己熟知领域里的最佳方式，虽然明白未来会呼啸而来，而随之而来的现实世界并没有最优解。在自己熟知的领域里知晓一切，而自己熟知的领域却不过是整个世界的一瞥。</p>`,r:{minutes:16.54,words:4963},y:"a",t:"个体的反击",i:"edit"},[":md"]],["v-6162d44c","/posts/thinking/2022/thinking/More-valuable-than-linear-algebra.html",{d:16347744e5,l:"2021年10月21日",c:["value"],g:["secure","value"],o:!0,e:`<h1> 你所做的比线性代数更有价值</h1>
<h1> What you do is more valuable than linear algebra</h1>
<p>This morning, as usual, the entire linear algebra class is used by me for reading Taleb's books THE BLACK SWAN. But, one little thing is different from before. When 2 hours later, course is coming to an end. My linear algebra teacher liu ,he accidentally walked to my side, ask me : Why don't you play games like them?Really like reading? He watched the title of my book, and keep asking me what have you learnt from this book?</p>`,r:{minutes:1.69,words:507},y:"a",t:"你所做的比线性代数更有价值",i:"edit"},[":md"]],["v-0230ae44","/posts/thinking/2022/thinking/Protect-yourself.html",{d:16353792e5,l:"2021年10月28日",c:["privacy"],g:["secure","privacy"],o:!0,e:`<h1> 保护自己</h1>
<h1> Protect yourself</h1>
<p>My mother said to me: "Don't show off, it will bring danger." On the other hand,xiaolai's book《The Road to Freedom of Wealth》,end , say that <strong>the best way is to grow alone.</strong></p>
<p>Since November last year, I have earned income from the cryptocurrency market. What I don’t belong to my age should be income. The rate of return is about 200%. I have countless times to share the idea of profitability, but I have curbed it.</p>`,r:{minutes:.86,words:257},y:"a",t:"保护自己",i:"edit"},[":md"]],["v-4f026ee2","/posts/thinking/2022/thinking/be-friends-with-time.html",{d:16058304e5,l:"2020年11月20日",c:["time"],g:["time"],o:!0,e:`<h1> 你可以比其他人多活十年？</h1>
<h1> You can live ten years longer than others?</h1>
<blockquote>
<p>Believe it or not, each of us has a chance to live ten years longer than everyone else. Realizing this, you seem to have a life cheating device. Compared with other people, you have won at the starting point.</p>
</blockquote>`,r:{minutes:4.58,words:1375},y:"a",t:"你可以比其他人多活十年？",i:"edit"},[":md"]],["v-ca8f39fa","/posts/thinking/2022/thinking/get-away-wechat.html",{d:16373664e5,l:"2021年11月20日",c:["privacy"],g:["privacy","wechat"],o:!0,e:`<h1> 我离开微信的三天</h1>
<h2> English version</h2>
<p>I changed my phone three days ago and saw a few friends in the Mixin group chatting about the privacy issues of WeChat and the data monopoly of large companies. I have been thinking about this issue. Obviously, the backend of WeChat can monitor everyone's chat data, whether it is a transfer function or a normal chat. So how serious is this problem? I think there may be the following:</p>`,r:{minutes:12.69,words:3807},y:"a",t:"我离开微信的三天",i:"edit"},[":md"]],["v-8b9fe7ba","/posts/thinking/2022/thinking/patient-with-develop.html",{d:16327872e5,l:"2021年9月28日",c:["develop"],g:["develop"],o:!0,e:`<h1> 对开发保持耐心、对一切保持耐心</h1>
<h1> Be patient with develop</h1>
<p>I lost my time book which recorded all my time spent in this year. But at this moment,I feel quiet. Although my time book lost, I got the most valuable stuff which is the perception of time.Time is fair to everyon. You can play games a whole year,or you can learn knowledge for several months.Now I choose the later.</p>`,r:{minutes:.82,words:247},y:"a",t:"对开发保持耐心、对一切保持耐心",i:"edit"},[":md"]],["v-3a828186","/posts/thinking/2022/thinking/run.html",{d:1634256e6,l:"2021年10月15日",c:["run"],g:["run","long_termism"],o:!0,e:`<h1> 长期主义</h1>
<h1> For the long run</h1>
<p>This morning, I ran a kilometer and used 4 minutes. Okay, so did the results a year ago. But the important thing I want to say is FOR THE LONG RUN. In the past year, I often started running at 6 o'clock in the morning, and occasionally took a walk. The fresh air in the morning always made me happy. My school playground always great, yes, at least now.</p>`,r:{minutes:.75,words:225},y:"a",t:"长期主义",i:"edit"},[":md"]],["v-423b1ad8","/posts/thinking/2022/thinking/the-future-of-internet.html",{d:16308864e5,l:"2021年9月6日",c:["develop"],g:["internet","future"],o:!0,e:`<h1> 互联网的未来</h1>
<h1> The future of the internet</h1>
<p>Well know, electronic identities have become popular in recently years,which make our personal information public in internet. Worse,internet company collect our personal privacy information sell to information vendors to make money,which make us become transparent in the world.</p>`,r:{minutes:2.07,words:620},y:"a",t:"互联网的未来",i:"edit"},[":md"]],["v-1c41ff49","/posts/thinking/2022/thinking/two-days.html",{d:16704576e5,l:"2022年12月8日",c:["thinking"],g:["thinking"],o:!0,e:`<h1> 过去十天的传奇经历</h1>
<p>我相信有每个人的一生中总有一些时间点,时间段有特殊意义,但若不记录下来就总会随着时间流逝,直到十年后被他人问起只能说出一句---就那么回事. 其实不是这样的,造成这么回事的不是事件,而是时间.如果这个事件是值得记录的,那就应当记录下来而不是到头来换得一句这么回事.</p>
<p>我尝试从时间角度从始至终全方面说一说这个封校到全面开放的全经过.</p>
<p>初始 - 2022-11-28 起初没人觉得这是</p>
`,r:{minutes:.63,words:188},y:"a",t:"过去十天的传奇经历",i:"edit"},[":md"]],["v-51eb093a","/posts/thinking/2023/thinking/2023-5-23-why-I-long-write.html",{d:16848e8,l:"2023年5月23日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 长期写作</h1>
<p>关于为什么今天我决定开始长期写作，这个问题其实我早就有想过，并且早就想这样去做，但其实今天才开始决定实施，一方面由于过去想的多做的少，第二个就是过去长期一厢情愿地以为写作能力其实不重要…</p>
<p>但最近一段时间以来看到了写作的价值以及写作的生产力有多高，所以到今天2023.5.23 在上海我决定长期写作，长期的意思是大概是5到10年。</p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>首先关于为什么写作，我想说一个最近在一本书《后资本世界》中学到的知识的概念：知识是一个记录在媒介中，随着时间能够进步的东西。</p>
</div>`,r:{minutes:6.58,words:1973},y:"a",t:"长期写作",i:"edit"},[":md"]],["v-2cbfa890","/posts/thinking/2023/thinking/2023-5-24-danger.html",{d:16848864e5,l:"2023年5月24日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 气候危机与集体注意力的缺失🎑</h1>
<h3> 气候难民</h3>
<p>大概2022年前后，有一篇广为流传的文章，里面说了一个词叫<mark>气候难民</mark>，因为2020年后，整个世界好像都开始了一次大混沌时代，曾经有的秩序都不存在了，曾经有过的秩序都被推翻从来，我们只能重新去尝试先过好当下，再去尝试建立新的秩序，气候也是一样。</p>
<p>气候危机这个词说起来非常严重，因为气候危机对于我们每个人都很重要，甚至不局限于人类，整个地球上的生态都受气候危机的影响，由于人类是整个地球上的超级物种，我们拥有可以被传承下来的知识，让我们可以踏着先人留下来的东西继续前行，所以我们似乎应该不止为人类否则，我认为应该对其他物种也应该重视起气候，这也是我认为的人道主义。</p>`,r:{minutes:5.54,words:1662},y:"a",t:"气候危机与集体注意力的缺失🎑",i:"edit"},[":md"]],["v-7e425500","/posts/thinking/2023/thinking/2023-5-25-money-with-life.html",{d:16849728e5,l:"2023年5月25日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 金钱是有生命力的</h1>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>通常，我们对于一些观点都有一些属于自己的看法，而大多数人类似的看法就组成了大众的看法，比如说金钱是有生命力的观点。</p>
</div>
<p>首先我们需要对生命力这个形容词进行一个定义，我首先来说说我的定义，生命是有诞生，成长和衰老和死亡过程的，那么与之对应生命力这个形容词也是有对应的诞生、成长和消亡属性的。</p>
<p>::: card<br>
于是金钱有生命力的含义是，金钱也是有诞生、成长和消亡属性的。<br>
:::</p>`,r:{minutes:1.83,words:548},y:"a",t:"金钱是有生命力的",i:"edit"},[":md"]],["v-321ca414","/posts/thinking/2023/thinking/2023-5-25-who-are-you_.html",{d:16849728e5,l:"2023年5月25日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 你是谁？</h1>
<p>今天重新读了下《超越感觉》的第一章，总结一下，下面的内容。</p>
<p>想象一下有一个其他人问你是谁的时候，你的第一反应是什么？名字对吗？但是人们如果人们想进一步问你是谁的全部情况，那么你的回答得包含身高体重年龄、包括所有情感信息和未曾和他人分享过的秘密等…还包括你的态度。</p>
<p>如果提问者接着问：==你是如何变成现在这个样子?==那么你可能会回答，这是我的个性，我成为这样是因为我想成为这样，这些都是我的风格和态度。这个答案看起来很自然，但是而且在某种程度上是对的，但从更大的意义上来说，这个回答是不正确的。这个世界对我们的影响比我们大多数人要大得多。</p>`,r:{minutes:7.06,words:2119},y:"a",t:"你是谁？",i:"edit"},["/posts/thinking/2023/thinking/2023-5-25-who-are-you?.html","/posts/thinking/2023/thinking/2023-5-25-who-are-you?.md"]],["v-21ddef20","/posts/thinking/2023/thinking/2023-5-26-what-is-thinking_.html",{d:16850592e5,l:"2023年5月26日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 什么是批判性思考？</h1>
<p>今天继续读《超越感觉》第二章——什么是批判性思考？</p>
<p>你在上课时是否被老师教导说，给你们两分钟思考一下？回想一下你是如何思考的呢？无非是闭目养神，或者看着其他同学苦思冥想的样子，自己也紧锁眉头装装样子呢？然后脑海中一直想着要思考，但不知如何思考？</p>
<p>大多数人的经历类似，许多人可能只是告诉你去思考，但是没有告诉你如何思考，以及思考是什么，也没有提及好的思考者具备什么品质。</p>
<ul>
<li>生活中最有趣和令人震惊的矛盾其实是，一方面所有人都在不断坚持逻辑、合理推理。另一方面他们却不能表现出这种能力，当别人表现出来时也不愿接受。</li>
</ul>`,r:{minutes:11.82,words:3546},y:"a",t:"什么是批判性思考？",i:"edit"},["/posts/thinking/2023/thinking/2023-5-26-what-is-thinking?.html","/posts/thinking/2023/thinking/2023-5-26-what-is-thinking?.md"]],["v-6056606e","/posts/thinking/2023/thinking/2023-5-27-roll-up.html",{d:16851456e5,l:"2023年5月27日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 上滑学</h1>
<div class="hint-container info">
<p class="hint-container-title">摘要</p>
<p>我的手机里一直没有抖音这个应用，我也很少去使用这种能提供即时反馈的应用，只是曾经2018年时上高中时经常使用。今天突发奇想，如今的抖音经过5年的迭代，现在成了什么样子呢？</p>
</div>
<p>于是就兴冲冲下载了个抖音，刷了半小时我总结出一个规律，几乎刷3个其他类的，一定会出一个广告类的视频。这个其他类可能是宠物、美女、电影、恋爱、校园、搞笑等分类…但终究会出现一个广告类视频。于是就出现了我的大脑让我加入了一个竞赛——猜猜看下一个视频是不是广告。</p>`,r:{minutes:6.8,words:2041},y:"a",t:"上滑学",i:"edit"},[":md"]],["v-27098123","/posts/thinking/2023/thinking/2023-5-28-the-realy-true.html",{d:1685232e6,l:"2023年5月28日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 真理是被发现的，而不是被创造的</h1>
<p>近年来，我们被灌输每个人要有每个人的想法，这已然是一种时尚。俗语说每个人都在创造他的真理，你的真理或许不是我的。这句话的含义是这是个自由的世界，我可以相信我想要的，于是这个论断就变成了<strong>任何一个人认为是真理的任何事情，都是因为他或她认为它是真理。</strong></p>
<p><mark>但事实上，任何人都有可能犯错</mark></p>
<p>真理是被发现的，不是被创造的。它原本是什么就是什么，真理既不依赖于我们对它的认可，也不因我们的无知而改变，更不因我们的一厢情愿而改变。</p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>抽烟不会因为我们喜欢抽烟而对健康无害。</p>
<p>真的有外星人驾驶UFO吗？</p>
<p>篮球运动员在跳投之前已经超时了吗？</p>
<p>引力是如何起作用的？</p>
<p>谁偷了你的汽车轮盖？</p>
</div>`,r:{minutes:4.83,words:1448},y:"a",t:"真理是被发现的，而不是被创造的",i:"edit"},[":md"]],["v-0e92e1ec","/posts/thinking/2023/thinking/2023-5-29-in-knowledge-people.html",{d:16853184e5,l:"2023年5月29日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 融入知识阶级</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>关于资产阶级，Wiki上的定义是：拥有生产资料的人。而生产资料是什么？生产资料是劳动者进行生产所需要的原材料。</p>
</div>
<p>比如你要盖一栋房子吧？那你需要人力，物力，财力等等，这些就是生产资料。</p>
<p>比如一座工厂：工厂是生产资料的重要组成部分，它包括建筑物、机器设备、生产线等。工厂提供了物质条件，使得商品能够被大规模生产和加工。</p>
<p>又比如说农田：在农业社会中，农田是生产粮食和农产品的生产资料。农田提供了土壤和种植条件，农民使用农具和机械来进行耕种和收获。</p>`,r:{minutes:15.44,words:4631},y:"a",t:"融入知识阶级",i:"edit"},[":md"]],["v-7057c552","/posts/thinking/2023/thinking/2023-5-30-about-thinging-self.html",{d:16853184e5,l:"2023年5月29日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 关于认知的一切</h1>
<h3> 认知意味着什么？</h3>
<p>首先认知和知道之间有什么区别吗？</p>
<p>知道意味着明白了正确答案。但是认知意味着意识到自己已经拥有了它。</p>
<p>可能需要了解许多细节、复杂的原则和过程中的各个步骤。</p>
<p>认知也通常意味着其他事情——有能力表达知道什么和我们如何得到它。但是事情并非总是如此，有时候我们无法用文字表述我们所拥有的知识，我们最多只能说”我知道，仅此而已“。但是这种回答很软弱无力，这样很难检验我们的知识是否正确。</p>
<p>有一些大众所认为的”共同的知识“，也就是大众认为的：</p>
<ol>
<li>女人比个男人更有抚育特质。</li>
<li>发泄愤怒的效果是减弱它，并使我们的感觉好些。</li>
<li>雇主从其他国家进口非熟练劳动力，为的是省钱。</li>
</ol>`,r:{minutes:5.73,words:1718},y:"a",t:"关于认知的一切",i:"edit"},[":md"]],["v-69799310","/posts/thinking/2023/thinking/2023-6-14-change-blog.html",{d:16867008e5,l:"2023年6月14日",c:["thinking"],g:["thinking","write"],o:!0,e:`<p>在这整理博客内容的时候，需要不断去整理之前的内容，我发现我的内容大部分是给我自己看的，其他人看了很难看懂，我仔细思考了这个问题，发现这个原因是我自己造成的。换句话说，我曾经写的文章其实不能够叫做文章，而应该叫做笔记——仅仅只给自己看的笔记。</p>
`,r:{minutes:3.7,words:1111},y:"a",t:"迁移博客",i:"edit"},[":md"]],["v-f94547aa","/posts/thinking/2023/thinking/2023-6-16-mini-startup1.html",{d:16868736e5,l:"2023年6月16日",c:["thinking"],g:["thinking","write","book"],o:!0,e:`<p>先成为创作者然后再是创业者，你需要找到自己理想的客户，然后不断地缩小范围，然后明确他们的痛点，明确他们愿意为此付出多少钱，接着设置一个严格的时间表，专心设计方案，然后收取费用，不断重复这个过程，然后围绕其扩大经营。</p>
`,r:{minutes:2.63,words:788},y:"a",t:"极简主义创业者 第一章总结",i:"edit"},[":md"]],["v-63abedbc","/posts/thinking/2023/thinking/2023-6-2-be-affected.html",{d:16853184e5,l:"2023年5月29日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 被看法所影响</h1>
<p>有一句话被广为流传叫，<mark>选择决定命运</mark>。</p>
<p>我总觉得这句话有点以偏概全，一方面选择确实可以决定命运，另一方面一些小选择对命运好像也影响不大，今天下午选择吃什么饭这种选择几乎对命运没什么影响。</p>
<p>一个人的命运其实是由无数个重大选择决定的，那我们要看背后关键的一点是，究竟是什么决定了我们的选择。</p>
<p>答案是价值观，一个人的价值观决定了一个人的选择质量，价值观决定了命运。我们总说每个人的价值观不一样，要尊重他人的价值观。但我们又对我们命运感到无奈，这一方面既然每个人都对自己的命运有高低上下的感受之分，那就说明每个人的价值观有高低上下之分。</p>`,r:{minutes:.87,words:262},y:"a",t:"被看法所影响",i:"edit"},[":md"]],["v-1eb20697","/posts/thinking/2023/thinking/2023-6-23-book-list.html",{d:16874784e5,l:"2023年6月23日",c:["thinking"],g:["thinking","write","book"],o:!0,e:`<p>这里存放着我这一段时间以来推荐的书籍，不定期更新..</p>
`,r:{minutes:3.24,words:971},y:"a",t:"我的书单",i:"edit"},[":md"]],["v-5316d9fc","/posts/thinking/2023/thinking/2023-6-23-startup.html",{d:16874784e5,l:"2023年6月23日",c:["thinking"],g:["thinking","write","book"],o:!0,e:`<p>有时候一个概念不清楚，很容易导致我们对这个世界的理解有所偏差，但如果这个世界上广为流传的词被大众理解偏差了，就会导致群体理解偏差，于是就会导致各种社会问题。</p>
`,r:{minutes:8.32,words:2496},y:"a",t:"《不公平优势》总结",i:"edit"},[":md"]],["v-3e8c5afb","/posts/thinking/2023/thinking/2023-6-4-be-a-time-people.html",{d:16858368e5,l:"2023年6月4日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 人人都是时间上的资产阶级</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>你有没有想过、什么是资产阶级？关于资产阶级，Wiki上的定义是：拥有生产资料的人。而生产资料是什么？生产资料是劳动者进行生产所需要的原材料。</p>
</div>
<p>比如你要盖一栋房子吧？那你需要人力，物力，财力等等，这些就是生产资料。</p>
<p>比如一座工厂：工厂的机器设备、生产线等就是生产资料，可以让商品能够被大规模生产和加工。</p>
<p>又比如说农田：在农业社会中，土地是生产粮食和农产品的生产资料。农民可以在土地之上来进行耕种和收获。</p>`,r:{minutes:3.47,words:1042},y:"a",t:"人人都是时间上的资产阶级",i:"edit"},[":md"]],["v-5d6d81ad","/posts/thinking/2023/thinking/2023-6-4-self-thinking.html",{d:16858368e5,l:"2023年6月4日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 为什么要独立思考?</h1>
<p>独立思考不是来秀优越感的，让别人觉得你在秀优越感是让人最讨厌的特征，没有之一, 而我也并不想用独立思考能让人生更完善这种看起来比较虚的理由，相反，我关于为什么要独立思考的理由在现实生活当中是很功利的。</p>
<p>现在你请先仔细思考一下这个社会上有多少的人根本不在乎未来，从来不思考未来的自己可能会是怎样的，他们只根据眼前的看到的信息来做一个仓促的、短期的结论，这也决定了说，当那个必然到来的未来一步一步逐渐展开的时候他们会对自己每一时刻的现状都感到不满，但是这个不满是谁造成的啊？</p>
<p><mark>肯定不是这个世界也不是这个社会，那是谁啊？是当时的自己不认真仔细考虑未来，缺乏独立思考能力造成的</mark></p>`,r:{minutes:2.97,words:891},y:"a",t:"为什么要独立思考?",i:"edit"},[":md"]],["v-650ae6ea","/posts/thinking/2023/thinking/2023-6-6-correct-comparison.html",{d:16860096e5,l:"2023年6月6日",c:["thinking"],g:["thinking","write"],o:!0,e:`<h1> 正确比较</h1>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>比较是分主观的还是客观的。比如我今天穿的衣服比你的好看，因为这是主观比较，而每个人的审美不一样，所以也就没有好坏上下之分的，自然也就无法争辩了。</p>
</div>
<p>但是客观思考则不同，客观思考是基于事实的比较。比如空气中氧气的是21%、氮气的占比是78%这就是无法辩驳的事实，这种比较是有意义的，基于事实的比较可以让我们分析出更多的信息。</p>
<p>比如你需要比较几个选择哪个更好，那么就需要对选择的判断因素做权重分析。你正在选择购买一辆汽车，在你的选择中有两个品牌的一些车，那么你就需要先分析出你的判断因素，比如品牌，售后、充电桩分布、价格、最大车龄等等，然后对这些因素做一个权重大小的排序，比如价格占50%、售后占20%、售后服务占10%等等以此类推。然后接着你再分别为你目前的选择中的每辆车依据权重进行打分，再做出选择。那么这个选择就是根据事实进行比较，再进行客观分析进而进行选择。</p>`,r:{minutes:2.65,words:796},y:"a",t:"正确比较",i:"edit"},[":md"]],["v-6c2f3742","/posts/thinking/2023/thinking/2023-6-7-best-internet-win.html",{d:1686096e6,l:"2023年6月7日",c:["thinking"],g:["thinking","write"],o:!0,e:`<p>时间是最重要的生产资料了，我们将时间用在哪些地方最合适呢？</p>
<p>当下产生一种误解，是互联网中的无用信息才可以变现。</p>
`,r:{minutes:2.34,words:702},y:"a",t:"我认为互联网最佳的商业模式",i:"edit"},[":md"]],["v-508e0582","/posts/thinking/2023/thinking/2023-6-8-praise-short-video.html",{d:16861824e5,l:"2023年6月8日",c:["thinking"],g:["thinking","write"],o:!0,e:`<p>人是很容易被反向塑造的，你平时跟什么样的人打交道，输入什么样的内容，那么你多多少少都会被影响的。同样是做销售，那卖奢饰品、卖豪车的和在街边摊的卖货的，反过来都会影响成不同的样子。</p>
`,r:{minutes:1.95,words:584},y:"a",t:"点赞你认为对你有价值的视频",i:"edit"},[":md"]],["v-6ecc2a70","/posts/thinking/2023/thinking/2023-6-9-value-of-gpt.html",{d:16862688e5,l:"2023年6月9日",c:["thinking"],g:["thinking","write"],o:!0,e:`<p>如果有一个人明目张胆站在你面前说你的回答错了，十有八九你的下意识反应一定是抵触。</p>
`,r:{minutes:1.08,words:325},y:"a",t:"从另一个角度看AI的价值",i:"edit"},[":md"]],["v-6e1e1211","/posts/program/golang/%E5%8D%81%E5%A4%A7%E6%8E%92%E5%BA%8F/top-10-sorting/top10-sorting.html",{d:16376256e5,l:"2021年11月23日",c:["tutorial"],g:["golang","top10-sort"],o:!0,e:`<h1> 十大排序</h1>
<h3> 选择排序</h3>
<p>这是最简单也最没用的算法, 时间复杂度有O(n^2), 同时也不稳定</p>
<p>选择排序的思路特别简单: 第一遍找到最小的值把它放在最前面, 再遍历一次找到第二小的数放到第二个位置......</p>
<p>那么我们怎么开始写这个程序呢?</p>
<p>首先第一步是要找到最小的那个数, 如果遍历到的arr[j]比最小位置还要小,那么就让minPosition = j, 所以</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>minPosition <span class="token operator">:=</span> <span class="token number">0</span>
arr <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>

<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span>  <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>minPosition<span class="token punctuation">]</span> <span class="token punctuation">{</span>
    minPosition <span class="token operator">=</span> j
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:7.58,words:2275},y:"a",t:"十大排序",i:"edit"},["/posts/program/golang/十大排序/top-10-sorting/top10-sorting.html","/posts/program/golang/十大排序/top-10-sorting/top10-sorting.md",":md"]],["v-5e01f85f","/posts/program/golang/%E5%8D%95%E6%B5%8B/Mock%E6%A1%86%E6%9E%B6/gomock-tuto.html",{d:168264e7,l:"2023年4月28日",c:["tutorial"],g:["golang","mock","UT"],o:!0,e:`<h1> GoMock 教程</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>GoMock是go官方提供的一款Mock工具，方便开发人员模拟接口行为做测试的工具。</p>
<p>比如我们有一个Person接口下的Eat方法，我们就可以模拟这个接口</p>
</div>
<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ctrl <span class="token operator">:=</span> gomock<span class="token punctuation">.</span><span class="token function">NewController</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>

mockPerson <span class="token operator">:=</span> mocks<span class="token punctuation">.</span><span class="token function">NewMockPerson</span><span class="token punctuation">(</span>ctrl<span class="token punctuation">)</span>

mockPerson<span class="token punctuation">.</span> <span class="token function">EXPECT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Return</span><span class="token punctuation">(</span><span class="token string">"lixin is sleep"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:3.34,words:1002},y:"a",t:"GoMock 教程",i:"edit"},["/posts/program/golang/单测/Mock框架/gomock-tuto.html","/posts/program/golang/单测/Mock框架/gomock-tuto.md",":md"]],["v-79877d44","/posts/program/golang/%E5%8D%95%E6%B5%8B/Mock%E6%A1%86%E6%9E%B6/mockey.html",{d:16936128e5,l:"2023年9月2日",c:["tutorial"],g:["golang","mockey","UT"],o:!0,e:`<p>在单元测试中我们经常需要用到Mock功能，简单来说就是直接模拟我们需要测试方法中的一些接口、函数、方法的返回值，让我们更容易去写Unit Test。</p>
`,r:{minutes:1.51,words:454},y:"a",t:"Mockey 教程",i:"edit"},["/posts/program/golang/单测/Mock框架/mockey.html","/posts/program/golang/单测/Mock框架/mockey.md",":md"]],["v-7eae6995","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/gin/gin-framework-principle.html",{d:1639872e6,l:"2021年12月19日",c:["tutorial"],g:["gin"],o:!0,e:`<h1> Gin 框架深度剖析</h1>
<p>Gin框架是一款高性能的Go Web框架,本文以一个小案例为例,从源码角度分析Gin的启动过程,请求与相应的技术原理.</p>
<p>我们怎么开始Gin呢?很简单,以下代码就可以开始开启Gin的Web服务了</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// init gin with default configs</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token char">'/hello'</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span>   <span class="token string">"Hello"</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// run the engine</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:12.5,words:3751},y:"a",t:"Gin 框架深度剖析",i:"network"},["/posts/program/golang/常用框架工具/gin/gin-framework-principle.html","/posts/program/golang/常用框架工具/gin/gin-framework-principle.md",":md"]],["v-e7a26318","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/grpc/1.html",{d:16798752e5,l:"2023年3月27日",c:["tutorial"],g:["golang","grpc"],o:!0,e:`<h1> GRPC教程 1- Go语言原生RPC原理</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>本篇文章介绍一下RPC的概念以及在Go语言如何使用标准库中的RPC.</p>
<p>RPC是全称叫Remote Procedure Call，远程过程调用，它允许像调用本地服务一样去调用远程服务，相对应的就是本地调用。</p>
</div>
<p>本地调用的例子:</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Args <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	A <span class="token builtin">int</span>
	B <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>args <span class="token operator">*</span>Args<span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> args<span class="token punctuation">.</span>A <span class="token operator">+</span> args<span class="token punctuation">.</span>B 
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span><span class="token function">Getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Args<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">100</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:1.49,words:447},y:"a",t:"GRPC教程 1- Go语言原生RPC原理",i:"edit"},["/posts/program/golang/常用框架工具/grpc/1.html","/posts/program/golang/常用框架工具/grpc/1.md",":md"]],["v-e438b1da","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/grpc/2.html",{d:16799616e5,l:"2023年3月28日",c:["tutorial"],g:["golang","grpc"],o:!0,e:`<h1> GRPC教程 2- gRPC下载以及入门gRPC</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>本篇文章我们开始学习gRPC，我们之前学到了RPC(远程过程调用)，那么gRPC是什么呢？gRPC是Google开源的现代高性能RPC框架，能够运行在任何环境中，使用HTTP2作为传输协议。</p>
<p>gRPC与RPC一样，可以像调用本地方法一样去调用另一个进程上的服务，这可以帮助你很轻松的创建微服务程序。gRPC只是定义类型和远程服务带有的参数和返回类型，我们需要在gRPC服务端程序中定义服务的逻辑，在客户端调用和服务器端相同的方法。</p>
</div>`,r:{minutes:3,words:900},y:"a",t:"GRPC教程 2- gRPC下载以及入门gRPC",i:"edit"},["/posts/program/golang/常用框架工具/grpc/2.html","/posts/program/golang/常用框架工具/grpc/2.md",":md"]],["v-e0cf009c","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/grpc/3.html",{d:1680048e6,l:"2023年3月29日",c:["tutorial"],g:["golang","grpc"],o:!0,e:`<h1> GRPC教程 3- 流式GRPC与错误处理</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<ul>
<li>解决vscode中，一个目录下多个mod文件的问题，怎么解决呢？<br>
如何 在一个目录下正常的有多个.mod 文件</li>
</ul>
<p>使用 go work init 命令</p>
</div>
<p>本篇文章开始，我们将要开始学习流式GRPC与GRPC的错误处理</p>
<h2> 流式GRPC</h2>
<p>什么是流式GRPC呢？</p>
<p>和之前我们写的普通的RPC服务写入直接返回不同，流式GRPC允许我们在一个RPC请求中建立一个Stream(流)，客户端和服务器端都可以向这个流中写入数据，当客户端写入数据时，服务器端只需要不断监听这个流就可以不断获取客户端发送的消息，直到关闭。</p>`,r:{minutes:7.04,words:2112},y:"a",t:"GRPC教程 3- 流式GRPC与错误处理",i:"edit"},["/posts/program/golang/常用框架工具/grpc/3.html","/posts/program/golang/常用框架工具/grpc/3.md",":md"]],["v-dd654f5e","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/grpc/4.html",{d:16801344e5,l:"2023年3月30日",c:["tutorial"],g:["golang","grpc"],o:!0,e:`<h1> GRPC教程 4 - GRPC-Gateway教程与Transcoding</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>GRPC-Gateway是protoc的一个插件，类似protoc-gen-go和protoc-gen-go-grpc插件，前者是生成.pb.go后者是生成.grpc.pb.go文件。</p>
</div>
<p>那么这两个插件是帮助proto文件生成go语言的插件，那么GRPC-Gateway呢，它是一个可以根据proto文件的定义生成一个反向代理器的，服务器可以将 RESTful JSON API 转换为 GRPC。</p>`,r:{minutes:4.32,words:1295},y:"a",t:"GRPC教程 4 - GRPC-Gateway教程与Transcoding",i:"edit"},["/posts/program/golang/常用框架工具/grpc/4.html","/posts/program/golang/常用框架工具/grpc/4.md",":md"]],["v-5da90d53","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-bufio.html",{d:1685232e6,l:"2023年5月28日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go Bufio 包详解</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><code>bufio</code> 包是 Go 标准库中的一个包，提供了带缓冲的 I/O 操作，用于提高 I/O 的效率。它封装了 <code>io.Reader</code> 和 <code>io.Writer</code>，并提供了缓冲功能，可以减少系统调用次数，提高读写性能。</p>
</div>
<p>下面是对 <code>bufio</code> 包的详细介绍以及一些示例：</p>
`,r:{minutes:1.78,words:534},y:"a",t:"Go Bufio 包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-bufio.html","/posts/program/golang/标准库学习/官方标准库学习/std-bufio.md",":md"]],["v-6f8bc77d","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-context.html",{d:16854912e5,l:"2023年5月31日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go Context包详解</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>context 包定义了 Context 类型，它在 API 边界和进程之间传递截止时间、取消信号和其他与请求相关的值。</p>
</div>
<p>这样说可能你还是一脸懵。</p>
<div class="hint-container info">
<p class="hint-container-title">举例</p>
<p>可以将 context 想象成传递信号的工具，类似于你向一个进程发送信号，告诉它该做什么或者取消它正在做的事情。</p>
<p>假设你是一名团队的领导，你负责协调团队中的各个成员完成任务。你希望每个成员都能在规定的时间内完成自己的任务，如果有需要的话，你还想提前告知他们任务的截止时间或者取消任务。在这种情况下，你可以使用 context 包来实现这些功能。</p>
</div>`,r:{minutes:1.87,words:561},y:"a",t:"Go Context包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-context.html","/posts/program/golang/标准库学习/官方标准库学习/std-context.md",":md"]],["v-00e31ada","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-flag.html",{d:16849728e5,l:"2023年5月25日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go flag 包详解</h1>
<h2> 介绍</h2>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><code>flag</code> 包是 Go 语言标准库中的一个包，用于解析命令行参数。它提供了一种方便的方式来定义和解析命令行参数，使得开发命令行工具和应用程序更加简单和灵活。</p>
</div>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><code>flag</code> 包的主要功能包括：</p>
<ul>
<li>定义命令行参数的类型和默认值</li>
<li>解析命令行参数，并将其赋值给对应的变量</li>
<li>提供帮助信息和用法说明</li>
</ul>
</div>`,r:{minutes:9.08,words:2724},y:"a",t:"Go flag 包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-flag.html","/posts/program/golang/标准库学习/官方标准库学习/std-flag.md",":md"]],["v-18827cdf","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-fmt.html",{d:16841952e5,l:"2023年5月16日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go fmt 包详解</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>相信很多人入坑Go语言都是从官网的<code>fmt.Println("Hello World")</code>入门的</p>
<p>这篇文章带你好好了解一下<code>fmt</code>包还可以做哪些事情。</p>
</div>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>在Go语言中，我们经常使用 fmt 包进行格式化输入输出操作。虽然大多数时候我们只会使用 Print...、Sprint... 和 Errorf 等少数函数，也只会用到一些常见的占位符，但这并不代表我们不需要了解 fmt 包的其他特性, 本文就来详细介绍fmt包。</p>
</div>`,r:{minutes:5.84,words:1753},y:"a",t:"Go fmt 包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-fmt.html","/posts/program/golang/标准库学习/官方标准库学习/std-fmt.md",":md"]],["v-4931fef0","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-log.html",{d:16845408e5,l:"2023年5月20日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Log包详解</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>之前不知道在哪看到过一句话，一个程序员开始重视日志的时候才是这个程序员从程序员迈向工程师的时候。</p>
<p>在程序开发中，日志是一个非常重要的工具，它可以帮助我们记录和追踪程序的运行状态和错误信息。在Go语言中，log 包是一个基础的标准库，提供了许多日志相关的功能。本文将介绍 log 包的常用函数以及如何配置和使用日志。</p>
</div>
<h2> 常用函数</h2>
<p>log 包提供了一些常用的函数，可以方便地打印日志信息。这些函数包括 Print、Printf、Println、Fatal、Fatalf、Fatalln、Panic、Panicf 和 Panicln。它们的功能类似，区别在于添加换行符(ln)和是否触发程序的退出或崩溃。</p>`,r:{minutes:3.53,words:1058},y:"a",t:"Go log 包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-log.html","/posts/program/golang/标准库学习/官方标准库学习/std-log.md",":md"]],["v-76b39f2f","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-reflect.html",{d:16851456e5,l:"2023年5月27日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go reflect 反射包详解</h1>
<div class="language-card line-numbers-mode" data-ext="card"><pre class="language-card"><code>当我们接触一个新名词的时候，我们需要做的事情就是明确其定义，然后尽快适应，反射就是这样的名词之一。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先是定义：反射允许程序在运行时检查和操作其结构、变量、方法等信息。Go语言提供了反射包（reflect），使得我们能够在运行时动态地获取类型信息、操作对象的字段和方法。</p>`,r:{minutes:10.4,words:3121},y:"a",t:"Go reflect 反射包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-reflect.html","/posts/program/golang/标准库学习/官方标准库学习/std-reflect.md",":md"]],["v-6621bbf2","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-strconv.html",{d:16851456e5,l:"2023年5月27日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go strconv包详解</h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>Strconv包也是我们在Go语言中经常会使用到的包，通常用于在字符串与基本数据类型之间进行转换。它提供了一系列函数来处理字符串的解析（parsing）和格式化（formatting）操作。</p>
</div>
<h3> 简要介绍</h3>
<p>strconv 包是 Go 标准库中的一个包，用于进行字符串和基本数据类型之间的相互转换。它提供了一系列的函数，包括将基本类型转换为字符串的函数，以及将字符串转换为基本类型的函数。</p>`,r:{minutes:5.13,words:1540},y:"a",t:"Go strconv包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-strconv.html","/posts/program/golang/标准库学习/官方标准库学习/std-strconv.md",":md"]],["v-5c5ebc19","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/std-time.html",{d:16846272e5,l:"2023年5月21日",c:["tutorial"],g:["golang"],o:!0,e:`<h1> Go time 包详解</h1>
<div class="language-card line-numbers-mode" data-ext="card"><pre class="language-card"><code>time 包是 Go 语言中用于处理时间和日期的标准库。
它提供了许多函数和类型，用于表示和操作时间、计时器、持续时间和时区等。

本文的顺序按照Go time官方包的顺序编写
详细信息请看 https://pkg.go.dev/time@go1.20.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:8.21,words:2463},y:"a",t:"Go time 包详解",i:"snow"},["/posts/program/golang/标准库学习/官方标准库学习/std-time.html","/posts/program/golang/标准库学习/官方标准库学习/std-time.md",":md"]],["v-3706649a","/404.html",{y:"p",t:""},[]],["v-69a86107","/posts/econonics/",{y:"p",t:"Econonics"},[]],["v-e1e3da16","/posts/",{y:"p",t:"Posts"},[]],["v-41ad8c23","/posts/program/betxin/",{y:"p",t:"Betxin"},[]],["v-1aaf0020","/posts/program/",{y:"p",t:"Program"},[]],["v-88d61c22","/posts/program/docker/",{y:"p",t:"Docker"},[]],["v-85603d8c","/posts/program/c/get-start-with-c-tcp-program/",{y:"p",t:"Get Start with C Tcp Program"},[]],["v-2aef844c","/posts/program/c/",{y:"p",t:"C"},[]],["v-2897b160","/posts/program/leetcode/leetcode/",{y:"p",t:"Leetcode"},[]],["v-368344da","/posts/program/leetcode/",{y:"p",t:"Leetcode"},[]],["v-01742aa6","/posts/program/leetcode/offer/",{y:"p",t:"Offer"},[]],["v-fa3fa1b0","/posts/program/golang/%E5%BA%95%E5%B1%82/",{y:"p",t:"底层"},["/posts/program/golang/底层/"]],["v-7dc9dfbb","/posts/program/mysql/notes/",{y:"p",t:"Notes"},[]],["v-7915bbed","/posts/program/mysql/",{y:"p",t:"Mysql"},[]],["v-2d1aaa94","/posts/program/redis/cache-consistency/",{y:"p",t:"Cache Consistency"},[]],["v-ff059b98","/posts/program/redis/",{y:"p",t:"Redis"},[]],["v-561f115c","/posts/program/redis/datastruct/",{y:"p",t:"Datastruct"},[]],["v-121f466e","/posts/program/redis/note/",{y:"p",t:"Note"},[]],["v-a93e83a8","/posts/program/rust/basic/",{y:"p",t:"Basic"},[]],["v-af437cd2","/posts/thinking/2021/thinking/",{y:"p",t:"Thinking"},[]],["v-1410c3e8","/posts/thinking/2021/",{y:"p",t:"2021"},[]],["v-3d42f458","/posts/thinking/2022/thinking/",{y:"p",t:"Thinking"},[]],["v-1410c407","/posts/thinking/2022/",{y:"p",t:"2022"},[]],["v-5bb0b1ce","/posts/thinking/2023/thinking/",{y:"p",t:"Thinking"},[]],["v-1410c426","/posts/thinking/2023/",{y:"p",t:"2023"},[]],["v-558b1c03","/posts/program/golang/%E5%8D%81%E5%A4%A7%E6%8E%92%E5%BA%8F/top-10-sorting/",{y:"p",t:"Top 10 Sorting"},["/posts/program/golang/十大排序/top-10-sorting/"]],["v-1582d2de","/posts/program/golang/%E5%8D%81%E5%A4%A7%E6%8E%92%E5%BA%8F/",{y:"p",t:"十大排序"},["/posts/program/golang/十大排序/"]],["v-1f7c2346","/posts/program/golang/%E5%8D%95%E6%B5%8B/Mock%E6%A1%86%E6%9E%B6/",{y:"p",t:"Mock框架"},["/posts/program/golang/单测/Mock框架/"]],["v-0e00f24e","/posts/program/golang/%E5%8D%95%E6%B5%8B/",{y:"p",t:"单测"},["/posts/program/golang/单测/"]],["v-f57efbb0","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/gin/",{y:"p",t:"Gin"},["/posts/program/golang/常用框架工具/gin/"]],["v-6aedfa76","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/",{y:"p",t:"常用框架工具"},["/posts/program/golang/常用框架工具/"]],["v-22d3e82c","/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/grpc/",{y:"p",t:"Grpc"},["/posts/program/golang/常用框架工具/grpc/"]],["v-614d0189","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/%E5%AE%98%E6%96%B9%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/",{y:"p",t:"官方标准库学习"},["/posts/program/golang/标准库学习/官方标准库学习/"]],["v-522ca6fe","/posts/program/golang/%E6%A0%87%E5%87%86%E5%BA%93%E5%AD%A6%E4%B9%A0/",{y:"p",t:"标准库学习"},["/posts/program/golang/标准库学习/"]],["v-5bc93818","/category/",{y:"p",t:"分类",I:0},[]],["v-744d024e","/tag/",{y:"p",t:"标签",I:0},[]],["v-e52c881c","/article/",{y:"p",t:"文章",I:0},[]],["v-154dc4c4","/star/",{y:"p",t:"收藏",I:0},[]],["v-01560935","/timeline/",{y:"p",t:"时间轴",I:0},[]],["v-721aed2b","/category/betxin/",{y:"p",t:"betxin 分类",I:0},[]],["v-c06a95c0","/tag/econonics/",{y:"p",t:"标签: econonics",I:0},[]],["v-3318a379","/category/tutorial/",{y:"p",t:"tutorial 分类",I:0},[]],["v-17bd7e0b","/tag/betxin-rules/",{y:"p",t:"标签: betxin-rules",I:0},[]],["v-6a0b0faf","/category/golang%E7%AC%94%E8%AE%B0/",{y:"p",t:"Golang笔记 分类",I:0},["/category/golang笔记/"]],["v-6106c001","/tag/docker/",{y:"p",t:"标签: docker",I:0},[]],["v-e348c378","/category/c/",{y:"p",t:"c 分类",I:0},[]],["v-49627fe2","/tag/network/",{y:"p",t:"标签: network",I:0},[]],["v-9c48d85a","/category/linux/",{y:"p",t:"linux 分类",I:0},[]],["v-46b9d66c","/tag/leetcode/",{y:"p",t:"标签: leetcode",I:0},[]],["v-e9a125fe","/category/golang/",{y:"p",t:"golang 分类",I:0},[]],["v-25e1acb9","/tag/backtrack/",{y:"p",t:"标签: backtrack",I:0},[]],["v-80e9ca34","/category/record/",{y:"p",t:"record 分类",I:0},[]],["v-f6aa26dc","/tag/dynamic-programming/",{y:"p",t:"标签: dynamic-programming",I:0},[]],["v-58ab7bb3","/category/rust/",{y:"p",t:"rust 分类",I:0},[]],["v-173e7dbe","/tag/offer/",{y:"p",t:"标签: offer",I:0},[]],["v-70677d9e","/category/years/",{y:"p",t:"years 分类",I:0},[]],["v-0033da0b","/tag/golang/",{y:"p",t:"标签: golang",I:0},[]],["v-9cc57efa","/category/learn/",{y:"p",t:"learn 分类",I:0},[]],["v-7b39bf6c","/tag/concurrency/",{y:"p",t:"标签: concurrency",I:0},[]],["v-b6a4f932","/category/thinking/",{y:"p",t:"thinking 分类",I:0},[]],["v-1bee38ca","/tag/mysql/",{y:"p",t:"标签: mysql",I:0},[]],["v-7b0b3a14","/category/value/",{y:"p",t:"value 分类",I:0},[]],["v-0d1f4c3c","/tag/redis/",{y:"p",t:"标签: redis",I:0},[]],["v-1c5eedbf","/category/privacy/",{y:"p",t:"privacy 分类",I:0},[]],["v-606be265","/tag/consistency/",{y:"p",t:"标签: consistency",I:0},[]],["v-58c21dea","/category/time/",{y:"p",t:"time 分类",I:0},[]],["v-291ba33d","/tag/rust/",{y:"p",t:"标签: rust",I:0},[]],["v-b93724ec","/category/develop/",{y:"p",t:"develop 分类",I:0},[]],["v-574eed66","/tag/blockchain/",{y:"p",t:"标签: blockchain",I:0},[]],["v-65f5031c","/category/run/",{y:"p",t:"run 分类",I:0},[]],["v-d293f072","/tag/white-noise/",{y:"p",t:"标签: white-noise",I:0},[]],["v-1c5f3310","/tag/music/",{y:"p",t:"标签: music",I:0},[]],["v-59ca63e7","/tag/imagine/",{y:"p",t:"标签: imagine",I:0},[]],["v-219beb8e","/tag/learn/",{y:"p",t:"标签: learn",I:0},[]],["v-2bdb1026","/tag/thinging/",{y:"p",t:"标签: thinging",I:0},[]],["v-2b6a541e","/tag/thinking/",{y:"p",t:"标签: thinking",I:0},[]],["v-69787d8a","/tag/secure/",{y:"p",t:"标签: secure",I:0},[]],["v-000f2cac","/tag/value/",{y:"p",t:"标签: value",I:0},[]],["v-47e821f5","/tag/privacy/",{y:"p",t:"标签: privacy",I:0},[]],["v-29324574","/tag/time/",{y:"p",t:"标签: time",I:0},[]],["v-3d0b43bb","/tag/wechat/",{y:"p",t:"标签: wechat",I:0},[]],["v-6224bc80","/tag/develop/",{y:"p",t:"标签: develop",I:0},[]],["v-b3067b5c","/tag/run/",{y:"p",t:"标签: run",I:0},[]],["v-40b79b1b","/tag/long-termism/",{y:"p",t:"标签: long_termism",I:0},[]],["v-318ed680","/tag/internet/",{y:"p",t:"标签: internet",I:0},[]],["v-53f6d684","/tag/future/",{y:"p",t:"标签: future",I:0},[]],["v-02b233fe","/tag/write/",{y:"p",t:"标签: write",I:0},[]],["v-283760d8","/tag/book/",{y:"p",t:"标签: book",I:0},[]],["v-32017b2c","/tag/top10-sort/",{y:"p",t:"标签: top10-sort",I:0},[]],["v-28d23657","/tag/mock/",{y:"p",t:"标签: mock",I:0},[]],["v-0da0f862","/tag/ut/",{y:"p",t:"标签: UT",I:0},[]],["v-3d1ed623","/tag/mockey/",{y:"p",t:"标签: mockey",I:0},[]],["v-b310d59e","/tag/gin/",{y:"p",t:"标签: gin",I:0},[]],["v-287f3643","/tag/grpc/",{y:"p",t:"标签: grpc",I:0},[]]];var Al=B({name:"Vuepress",setup(){const e=Zd();return()=>i(e.value)}}),W5=()=>Y5.reduce((e,[t,n,r,a])=>(e.push({name:t,path:n,component:Al,meta:r},{path:n.endsWith("/")?n+"index.html":n.substring(0,n.length-5),redirect:n},...a.map(o=>({path:o===":md"?n.substring(0,n.length-5)+".md":o,redirect:n}))),e),[{name:"404",path:"/:catchAll(.*)",component:Al}]),q5=Ep,Z5=()=>{const e=n3({history:q5(ss("/")),routes:W5(),scrollBehavior:(t,n,r)=>r||(t.hash?{el:t.hash}:{top:0})});return e.beforeResolve(async(t,n)=>{var r;(t.path!==n.path||n===Ot)&&([t.meta._data]=await Promise.all([Pt.resolvePageData(t.name),(r=Oc[t.name])==null?void 0:r.__asyncLoader()]))}),e},X5=e=>{e.component("ClientOnly",Sa),e.component("Content",cs)},J5=(e,t,n)=>{const r=qi(()=>t.currentRoute.value.path),a=qi(()=>Pt.resolveRouteLocale(Ln.value.locales,r.value)),o=$3(r,()=>t.currentRoute.value.meta._data),s=k(()=>Pt.resolveLayouts(n)),l=k(()=>Pt.resolveSiteLocaleData(Ln.value,a.value)),u=k(()=>Pt.resolvePageFrontmatter(o.value)),c=k(()=>Pt.resolvePageHeadTitle(o.value,l.value)),d=k(()=>Pt.resolvePageHead(c.value,u.value,l.value)),p=k(()=>Pt.resolvePageLang(o.value,l.value)),f=k(()=>Pt.resolvePageLayout(o.value,s.value));return e.provide(jd,s),e.provide(Cc,o),e.provide(Dc,u),e.provide(qd,c),e.provide(xc,d),e.provide(Bc,p),e.provide(Nc,f),e.provide(ls,a),e.provide(Mc,l),Object.defineProperties(e.config.globalProperties,{$frontmatter:{get:()=>u.value},$head:{get:()=>d.value},$headTitle:{get:()=>c.value},$lang:{get:()=>p.value},$page:{get:()=>o.value},$routeLocale:{get:()=>a.value},$site:{get:()=>Ln.value},$siteLocale:{get:()=>l.value},$withBase:{get:()=>Ie}}),{layouts:s,pageData:o,pageFrontmatter:u,pageHead:d,pageHeadTitle:c,pageLang:p,pageLayout:f,routeLocale:a,siteData:Ln,siteLocaleData:l}},Q5=()=>{const e=Wd(),t=is(),n=$([]),r=()=>{e.value.forEach(o=>{const s=e8(o);s&&n.value.push(s)})},a=()=>{document.documentElement.lang=t.value,n.value.forEach(o=>{o.parentNode===document.head&&document.head.removeChild(o)}),n.value.splice(0,n.value.length),e.value.forEach(o=>{const s=t8(o);s!==null&&(document.head.appendChild(s),n.value.push(s))})};tt(Jd,a),se(()=>{r(),a(),re(()=>e.value,a)})},e8=([e,t,n=""])=>{const r=Object.entries(t).map(([l,u])=>pe(u)?`[${l}=${JSON.stringify(u)}]`:u===!0?`[${l}]`:"").join(""),a=`head > ${e}${r}`;return Array.from(document.querySelectorAll(a)).find(l=>l.innerText===n)||null},t8=([e,t,n])=>{if(!pe(e))return null;const r=document.createElement(e);return Lr(t)&&Object.entries(t).forEach(([a,o])=>{pe(o)?r.setAttribute(a,o):o===!0&&r.setAttribute(a,"")}),pe(n)&&r.appendChild(document.createTextNode(n)),r},n8=Bd,r8=async()=>{var n;const e=n8({name:"VuepressApp",setup(){var r;Q5();for(const a of ea)(r=a.setup)==null||r.call(a);return()=>[i(qc),...ea.flatMap(({rootComponents:a=[]})=>a.map(o=>i(o)))]}}),t=Z5();X5(e),J5(e,t,ea);for(const r of ea)await((n=r.enhance)==null?void 0:n.call(r,{app:e,router:t,siteData:Ln}));return e.use(t),{app:e,router:t}};r8().then(({app:e,router:t})=>{t.isReady().then(()=>{e.mount("#app")})});export{Ho as $,W1 as A,I5 as B,en as C,R5 as D,w5 as E,Qt as F,pe as G,A8 as H,Lr as I,$s as J,_s as K,wr as L,rd as M,Xl as N,D5 as O,ie as P,l8 as Q,O5 as R,_8 as S,mc as T,ze as U,tt as V,a2 as W,u8 as X,m8 as Y,tn as Z,v as _,Pe as a,o8 as a0,Go as a1,qt as a2,c8 as a3,fn as a4,h8 as a5,g8 as a6,d8 as a7,s8 as a8,i8 as a9,_c as b,p8 as c,r8 as createVueApp,Ec as d,f8 as e,v8 as f,B as g,b8 as h,$ as i,k as j,se as k,i as l,He as m,Rt as n,vc as o,Fs as p,Ce as q,et as r,Le as s,Zn as t,y8 as u,ji as v,re as w,T5 as x,L5 as y,Me as z};
