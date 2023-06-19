import{g as X}from"./main-0b6ef55d.js";function Z(P,S){for(var v=0;v<S.length;v++){const m=S[v];if(typeof m!="string"&&!Array.isArray(m)){for(const y in m)if(y!=="default"&&!(y in P)){const w=Object.getOwnPropertyDescriptor(m,y);w&&Object.defineProperty(P,y,w.get?w:{enumerable:!0,get:()=>m[y]})}}}return Object.freeze(Object.defineProperty(P,Symbol.toStringTag,{value:"Module"}))}var U={};(function(P){var S=Object.create,v=Object.defineProperty,m=Object.getOwnPropertyDescriptor,y=Object.getOwnPropertyNames,w=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty,W=(e,r,t)=>r in e?v(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,q=e=>v(e,"__esModule",{value:!0}),T=(e,r)=>function(){return r||(0,e[Object.keys(e)[0]])((r={exports:{}}).exports,r),r.exports},D=(e,r)=>{q(e);for(var t in r)v(e,t,{get:r[t],enumerable:!0})},F=(e,r,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of y(r))!N.call(e,o)&&o!=="default"&&v(e,o,{get:()=>r[o],enumerable:!(t=m(r,o))||t.enumerable});return e},Y=e=>F(q(v(e!=null?S(w(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),_=(e,r,t)=>(W(e,typeof r!="symbol"?r+"":r,t),t),Q=T({"node_modules/@arr/every/index.js"(e,r){r.exports=function(t,o){for(var f=0,p=t.length;f<p;f++)if(!o(t[f],f,t))return!1;return!0}}}),z=T({"node_modules/@poppinss/matchit/lib/matchit.js"(e){var r=Q(),t="/",o=0,f=1,p=2,g=3,b=47,O=58,I=42,J=63;function $(n){if(n===t)return n;n.charCodeAt(0)===b&&(n=n.substring(1));var a=n.length-1;return n.charCodeAt(a)===b?n.substring(0,a):n}function M(n){return(n=$(n))===t?[t]:n.split(t)}function L(n,a,s){return s=n[s],a.val===s&&a.type===o?!0:s===t?a.type>f:a.type===o?!1:s===""?a.end===""&&(a.matcher?a.matcher.test(s):!0):s?s.endsWith(a.end)&&(a.matcher?a.matcher.test(s):!0):a.end===""}function K(n,a){let s=M(n),h=s.length,u,d=0,l;for(var c=L.bind(L,s);d<a.length;d++)if(l=a[d],((u=l.length)===h||u<h&&l[u-1].type===p||u>h&&l[u-1].type===g)&&r(l,c))return l;return[]}function G(n,a){if(n===t)return[{old:n,type:o,val:n,end:""}];typeof a!="object"&&(a={});let s,h,u,d,l,c=$(n),i=-1,A=0,R=c.length,x=[];for(;++i<R;)if(s=c.charCodeAt(i),s===O){for(A=i+1,u=f,h=0,d="";i<R&&c.charCodeAt(i)!==b;)s=c.charCodeAt(i),s===J?(h=i,u=g):s===46&&d.length===0&&(d=c.substring(h=i)),i++;l=c.substring(A,h||i);const E=a[l];x.push({old:n,type:u,val:l,end:d,matcher:E&&E.match,cast:E&&E.cast}),c=c.substring(i),R-=i,i=0;continue}else if(s===I){x.push({old:n,type:p,val:c.substring(i),end:""});continue}else{for(A=i;i<R&&c.charCodeAt(i)!==b;)++i;l=c.substring(A,i),x.push({old:n,type:o,val:l,end:""}),c=c.substring(i),R-=i,i=A=0}return x}function V(n,a){let s=0,h,u,d=M(n),l={};for(;s<a.length;s++)if(h=d[s],u=a[s],h!==t){if(u.val==="*"){l[u.val]=d.slice(s);break}if(h!==void 0&&u.type|g===2){const c=h.replace(u.end,"");l[u.val]=u.cast?u.cast(c):c}}return l}e.exec=V,e.match=K,e.parse=G}});D(P,{initRoutes:()=>H,stardust:()=>C});var j=Y(z()),k=class{constructor(e){this.routes=e,_(this,"routeParams"),_(this,"queryString",{}),_(this,"baseUrl")}processPattern(e){let r=[];const t=Array.isArray(this.routeParams),o=e.split("/");let f=0;for(const p of o){if(p==="*"){const g=t?this.routeParams.slice(f):this.routeParams["*"];if(!Array.isArray(g))throw new Error("Wildcard param must pass an array of values");if(!g.length)throw new Error(`Wildcard param is required to make URL for "${e}" route`);r=r.concat(g);break}if(!p.startsWith(":"))r.push(p);else{const g=p.endsWith("?"),b=p.replace(/^:/,"").replace(/\?$/,""),O=t?this.routeParams[f]:this.routeParams[b];if(f++,!O&&!g)throw new Error(`"${O}" param is required to make URL for "${e}" route`);r.push(O)}}return r.join("/")}findRouteOrFail(e){const r=this.routes[e];if(!r)throw new Error(`Cannot find route for "${e}"`);return r}suffixQueryString(e){if(this.queryString){const r=new URLSearchParams;for(const[o,f]of Object.entries(this.queryString))Array.isArray(f)?f.forEach(p=>r.append(o,p)):r.set(o,f);const t=r.toString();e=t?`${e}?${t}`:e}return e}prefixUrl(e){return e&&(this.baseUrl=e),this}qs(e){return e&&(this.queryString=e),this}params(e){return e&&(this.routeParams=e),this}make(e){const r=this.findRouteOrFail(e),t=this.processPattern(r);return this.suffixQueryString(this.baseUrl?`${this.baseUrl}${t}`:t)}},B=class{constructor(e){if(_(this,"routes",{}),_(this,"reverseRoutes",{}),_(this,"parsedRoutePatterns"),!e){console.error("Routes could not be found. Please make sure you use the `@routes()` tag in your view!");return}const r=Object.entries(e).map(([,t])=>(0,j.parse)(t));this.routes=e,this.reverseRoutes=Object.fromEntries(Object.entries(e).map(([t,o])=>[o,t])),this.parsedRoutePatterns=r}getRoutes(){return this.routes}builder(){return new k(this.routes)}route(e,r,t){return new k(this.routes).params(r).qs(t==null?void 0:t.qs).prefixUrl(t==null?void 0:t.prefixUrl).make(e)}get current(){const[e]=(0,j.match)(this.pathname,this.parsedRoutePatterns);if(!e)return null;const{old:r}=e;return this.reverseRoutes[r]}get pathname(){if(globalThis.stardust.pathname)return globalThis.stardust.pathname;const{pathname:e}=new URL((window??globalThis).location.href);return e}isCurrent(e){return e===this.current}},C;function H(){const{namedRoutes:e}=(globalThis??window).stardust;C=new B(e)}})(U);const ee=X(U),te=Z({__proto__:null,default:ee},[U]);export{te as i};
