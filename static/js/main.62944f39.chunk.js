(window["webpackJsonpan-app-for-that"]=window["webpackJsonpan-app-for-that"]||[]).push([[0],{46:function(e,t,a){e.exports=a(77)},51:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(13),o=a.n(c),l=a(14),i=a(15),u=a(18),m=a(16),s=a(19),d=(a(51),a(17)),h=a(11),p=a(78),E=a(79),f=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"An App for that"),r.a.createElement(p.a,null,r.a.createElement(E.a,null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(d.b,{to:"/qrcode"},"QRCode Scanner/Reader"))))))}}]),t}(r.a.PureComponent),b=a(42),w=a.n(b),y=a(43),C=a.n(y),v=a(25),S=a(27),O=a(80),j=a(81),k=a(82),q=a(87),R=a(83),g=a(86),Q=a(84),x=a(85),N=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={showQRScanner:!1,qrCode:""},a.handleScan=function(e){e&&a.setState({qrCode:e,showQRScanner:!1})},a.handleError=function(e){console.error(e)},a}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"QRCode Scanner/Reader"),r.a.createElement(d.b,{to:"/"},"Home"),r.a.createElement(p.a,{className:"mt-5"},r.a.createElement(E.a,{md:"4 m-auto"},r.a.createElement(O.a,null,r.a.createElement(j.a,null,r.a.createElement(k.a,null,r.a.createElement(q.a,{addonType:"prepend"},r.a.createElement(R.a,{color:"primary",title:"Scan",onClick:function(){return e.setState({showQRScanner:!0})}},r.a.createElement(v.a,{icon:S.a}))),r.a.createElement("input",{ref:"qr-input",type:"text",className:"form-control",value:this.state.qrCode,onChange:function(t){return e.setState({qrCode:t.target.value})}}),this.state.qrCode&&r.a.createElement(q.a,{addonType:"append"},r.a.createElement(R.a,{title:"Copy Code",color:"primary",onClick:function(){return e.refs["qr-input"].select(),document.execCommand("copy"),!1}},r.a.createElement(v.a,{icon:S.b}))))),r.a.createElement(w.a,{value:this.state.qrCode,size:256})))),r.a.createElement(g.a,{isOpen:this.state.showQRScanner,toggle:function(){return e.setState({showQRScanner:!1})}},r.a.createElement(Q.a,null,r.a.createElement(C.a,{delay:300,onError:this.handleError,onScan:this.handleScan,style:{width:"100%"}})),r.a.createElement(x.a,null,r.a.createElement(R.a,{color:"primary",onClick:function(){return e.setState({showQRScanner:!1})}},"Cancel"))))}}]),t}(r.a.PureComponent),A=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement("div",null,r.a.createElement(h.a,{path:"/",exact:!0,component:f}),r.a.createElement(h.a,{path:"/qrcode",component:N})))}}]),t}(r.a.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(75);o.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[46,1,2]]]);
//# sourceMappingURL=main.62944f39.chunk.js.map