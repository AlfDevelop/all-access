if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const t=e=>r(e,o),c={module:{uri:o},exports:l,require:t};s[o]=Promise.all(i.map((e=>c[e]||t(e)))).then((e=>(n(...e),l)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"all-access"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.ddbde395.css",revision:null},{url:"/index.html",revision:"9b62c545edb769da54026997c76b1db1"},{url:"/js/about.58762df1.js",revision:null},{url:"/js/app.7dd67180.js",revision:null},{url:"/js/chunk-vendors.d251f613.js",revision:null},{url:"/manifest.json",revision:"c96bc5bf2608e7af00eabb1383226dc6"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
