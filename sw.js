if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const c=e=>t(e,r),l={module:{uri:r},exports:o,require:c};s[r]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(i(...e),o)))}}define(["./workbox-ab116399"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.2e7000a3.css",revision:null},{url:"assets/index.34cb890b.js",revision:null},{url:"index.html",revision:"0ce6af5167795010a90e6438605da861"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"f58439be579c0b3ee59aad4ae2240d39"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.2\.1\/dist\/css\/bootstrap\.min\.css/,new e.CacheFirst({cacheName:"bootstrap-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
