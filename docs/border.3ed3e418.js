parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mIWh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=7;exports.tileSize=e;var t=16;exports.editorRatio=t;
},{}],"UnXq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./state");function e(){return new Array(r.tileSize).fill(0).map(function(e,t){return new Array(r.tileSize).fill(0)})}function t(){return new Array(3).fill(0).map(function(r,t){return new Array(3).fill(0).map(function(r,t){return e()})})}function n(r,e){var t=r,n=e;return 1==arguments.length&&(t=0,n=r),t=Math.ceil(t),n=Math.floor(n),Math.floor(Math.random()*(n-t))+t}function i(){return[n(3),n(3),n(r.tileSize),n(r.tileSize)]}function o(e){var t=e[0],n=e[1];return[3*r.tileSize-n,t]}function u(e,t){var n=e[0],i=e[1];void 0===t&&(t=1);var o=3*r.tileSize-1;return[[n,i],[o-i,n],[o-n,o-i],[i,o-n]]}function a(r,e){var t=e.reduce(function(r,e){return r[e]},r);return"number"!=typeof t?0:t}function c(r,e,t){void 0===t&&(t=1);var n=e.slice(0,-1),i=e[e.length-1];n.reduce(function(r,e){return r[e]},r)[i]=t}exports.newGrid=t,exports.randomInt=n,exports.randomLoc=i,exports.rotatePair=o,exports.rotationSet=u,exports.getLoc=a,exports.setLoc=c;
},{"./state":"mIWh"}],"vPWx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./state"),t=require("./utils"),i=document.getElementById("editor"),o=document.getElementById("guide"),r=document.getElementById("render"),l=i.getContext("2d"),n=o.getContext("2d"),d=r.getContext("2d");function a(){l.clearRect(0,0,i.width,i.height)}function c(i,o){d.fill();for(var r=0;r<3;r++)for(var n=0;n<3;n++)for(var a=0;a<e.tileSize;a++)for(var c=0;c<e.tileSize;c++){var s=t.getLoc(i,[r,n,a,c]);l.fillStyle=1==s?"#000":"#fff0",d.fillStyle=1==s?"#000":"#fff0";var f=(r*e.tileSize+a)*o,g=(n*e.tileSize+c)*o;1==r&&1==n||(d.clearRect(f,g,o,o),d.fillRect(f,g,o,o),f*=e.editorRatio/o,g*=e.editorRatio/o,l.fillRect(f+1,g+1,e.editorRatio-1,e.editorRatio-1))}}function s(){for(var t=1;t<3;t++){n.strokeStyle="#33f",n.lineWidth=.5;var o=t*i.width/3;n.beginPath(),n.moveTo(o,0),n.lineTo(o,i.height),n.stroke(),n.beginPath(),n.moveTo(0,o),n.lineTo(i.height,o),n.stroke()}for(t=0;t<3*e.tileSize;t++){n.strokeStyle="#ccc";o=t*i.width/(3*e.tileSize);n.beginPath(),n.moveTo(o,0),n.lineTo(o,i.height),n.stroke(),n.beginPath(),n.moveTo(0,o),n.lineTo(i.height,o),n.stroke()}var r=i.width/3;n.clearRect(r+1,r+1,r-2,r-2),n.beginPath(),n.moveTo(1*r,2*r),n.lineTo(2*r,1*r),n.stroke(),n.beginPath(),n.moveTo(1*r,1*r),n.lineTo(2*r,2*r),n.stroke()}function f(t){var i=r.toDataURL(),o=document.getElementById("target"),l=document.getElementById("border-style");l&&l.remove(),(l=document.createElement("style")).id="border-style",document.head.appendChild(l);var n='.broider {\n    border-image:  url("'+i+'") '+e.tileSize*t+" /  "+e.tileSize*t+"px / 0 round;\n    border-width:  "+e.tileSize*t+"px;\n    border-style:  solid;\n}";l.sheet.insertRule(n),o.textContent=n}function g(i,o){var r=o[0]*e.tileSize+o[2],n=o[1]*e.tileSize+o[3];l.fillStyle=(t.getLoc(i,o),"#dde"),1==o[0]&&1==o[1]||l.fillRect(r*e.editorRatio+0,n*e.editorRatio+0,e.editorRatio-0,e.editorRatio-0)}d.imageSmoothingEnabled=!1,exports.cleanMap=a,exports.renderMap=c,exports.drawGuide=s,exports.setBorder=f,exports.renderHover=g;
},{"./state":"mIWh","./utils":"UnXq"}],"Skeg":[function(require,module,exports) {
module.exports="/broider/1.215f8ecf.png";
},{}],"yB7T":[function(require,module,exports) {
module.exports="/broider/2.07e2c5fb.png";
},{}],"Cd2M":[function(require,module,exports) {
module.exports="/broider/4.ed708439.png";
},{}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./render"),n=e(require("./1.png")),i=e(require("./2.png")),d=e(require("./4.png")),r=require("./state"),o=require("./utils"),a=document.getElementById("pen"),c=document.getElementById("eraser"),l=document.getElementById("symmetry"),s=document.getElementById("scale"),u=document.getElementById("undo"),f=document.getElementById("editor-frame"),h=document.getElementById("editor"),v=document.getElementById("guide"),g=document.getElementById("render");h.width=r.tileSize*r.editorRatio*3,h.height=r.tileSize*r.editorRatio*3,v.width=r.tileSize*r.editorRatio*3,v.height=r.tileSize*r.editorRatio*3;var m=2,p=[1,2,4],E=[n.default,i.default,d.default],L=p[m];function w(){f.style.height=h.getBoundingClientRect().width+"px"}g.width=r.tileSize*L*3,g.height=r.tileSize*L*3,s.addEventListener("click",function(){m=(m+1)%p.length,s.src=E[m],L=p[m],g.width=r.tileSize*L*3,g.height=r.tileSize*L*3,t.renderMap(M,L),t.setBorder(L),w()}),document.addEventListener("DOMContentLoaded",w),window.addEventListener("resize",w);var S=!1,y=!1,B=!0;l.addEventListener("click",function(e){B=!B,l.classList.toggle("selected")}),c.addEventListener("click",function(e){y=!0,c.classList.add("selected"),a.classList.remove("selected")}),a.addEventListener("click",function(e){y=!1,a.classList.add("selected"),c.classList.remove("selected")});var M=o.newGrid(),z=[JSON.stringify(M)];function I(){var e=JSON.stringify(M);e!=z[z.length-1]&&(z.push(e),z.length>20&&z.shift(),u.classList.add("selected"))}function R(){z.pop();var e=z[z.length-1];e&&(M=JSON.parse(e),t.cleanMap(),t.renderMap(M,L),t.setBorder(L))}function k(e,t){S&&o.setLoc(M,e,1-t)}u.addEventListener("click",function(e){R(),z.length<2&&u.classList.remove("selected"),e.preventDefault()}),t.drawGuide(),t.renderMap(M,L),t.setBorder(L);var q=function(e,n,i){void 0===n&&(n=!1),void 0===i&&(i=!1);var d=h.getBoundingClientRect(),a=d.left,c=d.top,l=d.width,s=d.height,u=e.clientX-a,f=e.clientY-c,v=u/l*h.width,g=f/s*h.height,m=Math.floor(v/r.editorRatio),p=Math.floor(g/r.editorRatio),E=B?o.rotationSet([m,p]):[[m,p]];t.cleanMap(),E.forEach(function(e){var d=e[0],a=e[1],c=Math.floor(d/r.tileSize),l=Math.floor(a/r.tileSize),s=[c,l,d%r.tileSize,a%r.tileSize];if(!(c<0||c>2||l<0||l>2)){i&&t.renderHover(M,s);var u=o.getLoc(M,s);n||(u=0),y&&(u=1),k(s,u)}}),t.renderMap(M,L),window.setTimeout(function(){return t.setBorder(L)},0)};h.addEventListener("mousedown",function(e){S=!0,q(e,!0)}),h.addEventListener("mousemove",function(e){q(e,!1,!0)}),h.addEventListener("mouseout",function(e){t.cleanMap(),t.renderMap(M,L)}),window.addEventListener("mousedown",function(){S=!0}),window.addEventListener("mouseup",function(){S=!1,I()}),h.addEventListener("touchend",function(e){S=!1,I()}),h.addEventListener("touchstart",function(e){S=!0,e.preventDefault();for(var t=e.targetTouches,n=0;n<t.length;n++)e.clientX=t[n].clientX,e.clientY=t[n].clientY,q(e)}),h.addEventListener("touchmove",function(e){e.preventDefault(),S=!0;for(var t=e.targetTouches,n=0;n<t.length;n++)e.clientX=t[n].clientX,e.clientY=t[n].clientY,q(e)});var D=0;window.addEventListener("touchend",function(e){e.timeStamp-D<=500&&(e.preventDefault(),e.target.click()),S=!1,D=e.timeStamp});
},{"./render":"vPWx","./1.png":"Skeg","./2.png":"yB7T","./4.png":"Cd2M","./state":"mIWh","./utils":"UnXq"}]},{},["QCba"], null)
//# sourceMappingURL=/broider/border.3ed3e418.js.map