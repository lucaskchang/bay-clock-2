import{al as rt,am as ze,r as R,e as i,o as se,a3 as Te,an as Je,q as lt,R as ot,h as k,D as Se,G as it,Z as ut,B as qe,f as st,g as ce,S as ct,ao as dt,c as Me,ap as vt,I as et,n as We,aq as Ke,ar as Fe,as as He,w as ue,at as ft,L as bt,M as mt,i as ht,au as gt,$ as yt,av as ie,aw as pt,ax as we,ay as De,W as Xe,Y as Ne,p as xe,az as Oe,b as Ct,aA as kt,aB as je,u as wt,k as Tt,t as St,m as qt,l as xt}from"./index.20be3fc8.js";let Mt=0;const $t=["click","keydown"],Lt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Mt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function _t(t,n,u,l){const e=rt(Je,ze);if(e===ze)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ze;const{proxy:o}=ce(),v=R(null),m=R(null),b=R(null),d=i(()=>t.disable===!0||t.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},t.ripple===!0?{}:t.ripple)),w=i(()=>e.currentModel.value===t.name),L=i(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(w.value===!0?" q-tab--active"+(e.tabProps.value.activeClass?" "+e.tabProps.value.activeClass:"")+(e.tabProps.value.activeColor?` text-${e.tabProps.value.activeColor}`:"")+(e.tabProps.value.activeBgColor?` bg-${e.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(t.icon&&t.label&&e.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(t.noCaps===!0||e.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(t.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(l!==void 0?l.linkClass.value:"")),T=i(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(e.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(t.contentClass!==void 0?` ${t.contentClass}`:"")),y=i(()=>t.disable===!0||e.hasFocus.value===!0||w.value===!1&&e.hasActiveTab.value===!0?-1:t.tabindex||0);function p(c,x){if(x!==!0&&v.value!==null&&v.value.focus(),t.disable===!0){l!==void 0&&l.hasRouterLink.value===!0&&Se(c);return}if(l===void 0){e.updateModel({name:t.name}),u("click",c);return}if(l.hasRouterLink.value===!0){const _=(B={})=>{let A;const N=B.to===void 0||ct(B.to,t.to)===!0?e.avoidRouteWatcher=dt():null;return l.navigateToRouterLink(c,{...B,returnRouterError:!0}).catch(O=>{A=O}).then(O=>{if(N===e.avoidRouteWatcher&&(e.avoidRouteWatcher=!1,A===void 0&&(O===void 0||O.message.startsWith("Avoided redundant navigation")===!0)&&e.updateModel({name:t.name})),B.returnRouterError===!0)return A!==void 0?Promise.reject(A):O})};u("click",c,_),c.defaultPrevented!==!0&&_();return}u("click",c)}function E(c){it(c,[13,32])?p(c,!0):ut(c)!==!0&&c.keyCode>=35&&c.keyCode<=40&&c.altKey!==!0&&c.metaKey!==!0&&e.onKbdNavigate(c.keyCode,o.$el)===!0&&Se(c),u("keydown",c)}function F(){const c=e.tabProps.value.narrowIndicator,x=[],_=k("div",{ref:b,class:["q-tab__indicator",e.tabProps.value.indicatorClass]});t.icon!==void 0&&x.push(k(qe,{class:"q-tab__icon",name:t.icon})),t.label!==void 0&&x.push(k("div",{class:"q-tab__label"},t.label)),t.alert!==!1&&x.push(t.alertIcon!==void 0?k(qe,{class:"q-tab__alert-icon",color:t.alert!==!0?t.alert:void 0,name:t.alertIcon}):k("div",{class:"q-tab__alert"+(t.alert!==!0?` text-${t.alert}`:"")})),c===!0&&x.push(_);const B=[k("div",{class:"q-focus-helper",tabindex:-1,ref:v}),k("div",{class:T.value},st(n.default,x))];return c===!1&&B.push(_),B}const z={name:i(()=>t.name),rootRef:m,tabIndicatorRef:b,routeData:l};se(()=>{e.unregisterTab(z)}),Te(()=>{e.registerTab(z)});function D(c,x){const _={ref:m,class:L.value,tabindex:y.value,role:"tab","aria-selected":w.value===!0?"true":"false","aria-disabled":t.disable===!0?"true":void 0,onClick:p,onKeydown:E,...x};return lt(k(c,_,F()),[[ot,d.value]])}return{renderTab:D,$tabs:e}}var Kt=Me({name:"QTab",props:Lt,emits:$t,setup(t,{slots:n,emit:u}){const{renderTab:l}=_t(t,n,u);return()=>l("div")}});function Rt(){const t=R(!vt.value);return t.value===!1&&Te(()=>{t.value=!0}),t}const tt=typeof ResizeObserver!="undefined",Ue=tt===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var Bt=Me({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(t,{emit:n}){let u=null,l,e={width:-1,height:-1};function o(b){b===!0||t.debounce===0||t.debounce==="0"?v():u===null&&(u=setTimeout(v,t.debounce))}function v(){if(u!==null&&(clearTimeout(u),u=null),l){const{offsetWidth:b,offsetHeight:d}=l;(b!==e.width||d!==e.height)&&(e={width:b,height:d},n("resize",e))}}const{proxy:m}=ce();if(tt===!0){let b;const d=w=>{l=m.$el.parentNode,l?(b=new ResizeObserver(o),b.observe(l),v()):w!==!0&&We(()=>{d(!0)})};return Te(()=>{d()}),se(()=>{u!==null&&clearTimeout(u),b!==void 0&&(b.disconnect!==void 0?b.disconnect():l&&b.unobserve(l))}),et}else{let w=function(){u!==null&&(clearTimeout(u),u=null),d!==void 0&&(d.removeEventListener!==void 0&&d.removeEventListener("resize",o,Ke.passive),d=void 0)},L=function(){w(),l&&l.contentDocument&&(d=l.contentDocument.defaultView,d.addEventListener("resize",o,Ke.passive),v())};const b=Rt();let d;return Te(()=>{We(()=>{l=m.$el,l&&L()})}),se(w),m.trigger=o,()=>{if(b.value===!0)return k("object",{style:Ue.style,tabindex:-1,type:"text/html",data:Ue.url,"aria-hidden":"true",onLoad:L})}}}});let at=!1;{const t=document.createElement("div");t.setAttribute("dir","rtl"),Object.assign(t.style,{width:"1px",height:"1px",overflow:"auto"});const n=document.createElement("div");Object.assign(n.style,{width:"1000px",height:"1px"}),document.body.appendChild(t),t.appendChild(n),t.scrollLeft=-1e3,at=t.scrollLeft>=0,t.remove()}function Pt(t,n,u){const l=u===!0?["left","right"]:["top","bottom"];return`absolute-${n===!0?l[0]:l[1]}${t?` text-${t}`:""}`}const At=["left","center","right","justify"];var Ht=Me({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:t=>At.includes(t)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(t,{slots:n,emit:u}){const{proxy:l}=ce(),{$q:e}=l,{registerTick:o}=Fe(),{registerTick:v}=Fe(),{registerTick:m}=Fe(),{registerTimeout:b,removeTimeout:d}=He(),{registerTimeout:w,removeTimeout:L}=He(),T=R(null),y=R(null),p=R(t.modelValue),E=R(!1),F=R(!0),z=R(!1),D=R(!1),c=[],x=R(0),_=R(!1);let B=null,A=null,N;const O=i(()=>({activeClass:t.activeClass,activeColor:t.activeColor,activeBgColor:t.activeBgColor,indicatorClass:Pt(t.indicatorColor,t.switchIndicator,t.vertical),narrowIndicator:t.narrowIndicator,inlineLabel:t.inlineLabel,noCaps:t.noCaps})),ee=i(()=>{const r=x.value,s=p.value;for(let h=0;h<r;h++)if(c[h].name.value===s)return!0;return!1}),G=i(()=>`q-tabs__content--align-${E.value===!0?"left":D.value===!0?"justify":t.align}`),de=i(()=>`q-tabs row no-wrap items-center q-tabs--${E.value===!0?"":"not-"}scrollable q-tabs--${t.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${t.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${t.mobileArrows===!0?"":"out"}-arrows`+(t.dense===!0?" q-tabs--dense":"")+(t.shrink===!0?" col-shrink":"")+(t.stretch===!0?" self-stretch":"")),$e=i(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+G.value+(t.contentClass!==void 0?` ${t.contentClass}`:"")),X=i(()=>t.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),Z=i(()=>t.vertical!==!0&&e.lang.rtl===!0),te=i(()=>at===!1&&Z.value===!0);ue(Z,K),ue(()=>t.modelValue,r=>{Q({name:r,setCurrent:!0,skipEmit:!0})}),ue(()=>t.outsideArrows,U);function Q({name:r,setCurrent:s,skipEmit:h}){p.value!==r&&(h!==!0&&t["onUpdate:modelValue"]!==void 0&&u("update:modelValue",r),(s===!0||t["onUpdate:modelValue"]===void 0)&&(Le(p.value,r),p.value=r))}function U(){o(()=>{ve({width:T.value.offsetWidth,height:T.value.offsetHeight})})}function ve(r){if(X.value===void 0||y.value===null)return;const s=r[X.value.container],h=Math.min(y.value[X.value.scroll],Array.prototype.reduce.call(y.value.children,(q,C)=>q+(C[X.value.content]||0),0)),M=s>0&&h>s;E.value=M,M===!0&&v(K),D.value=s<parseInt(t.breakpoint,10)}function Le(r,s){const h=r!=null&&r!==""?c.find(q=>q.name.value===r):null,M=s!=null&&s!==""?c.find(q=>q.name.value===s):null;if(h&&M){const q=h.tabIndicatorRef.value,C=M.tabIndicatorRef.value;B!==null&&(clearTimeout(B),B=null),q.style.transition="none",q.style.transform="none",C.style.transition="none",C.style.transform="none";const g=q.getBoundingClientRect(),P=C.getBoundingClientRect();C.style.transform=t.vertical===!0?`translate3d(0,${g.top-P.top}px,0) scale3d(1,${P.height?g.height/P.height:1},1)`:`translate3d(${g.left-P.left}px,0,0) scale3d(${P.width?g.width/P.width:1},1,1)`,m(()=>{B=setTimeout(()=>{B=null,C.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",C.style.transform="none"},70)})}M&&E.value===!0&&W(M.rootRef.value)}function W(r){const{left:s,width:h,top:M,height:q}=y.value.getBoundingClientRect(),C=r.getBoundingClientRect();let g=t.vertical===!0?C.top-M:C.left-s;if(g<0){y.value[t.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(g),K();return}g+=t.vertical===!0?C.height-q:C.width-h,g>0&&(y.value[t.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(g),K())}function K(){const r=y.value;if(r===null)return;const s=r.getBoundingClientRect(),h=t.vertical===!0?r.scrollTop:Math.abs(r.scrollLeft);Z.value===!0?(F.value=Math.ceil(h+s.width)<r.scrollWidth-1,z.value=h>0):(F.value=h>0,z.value=t.vertical===!0?Math.ceil(h+s.height)<r.scrollHeight:Math.ceil(h+s.width)<r.scrollWidth)}function fe(r){A!==null&&clearInterval(A),A=setInterval(()=>{he(r)===!0&&V()},5)}function be(){fe(te.value===!0?Number.MAX_SAFE_INTEGER:0)}function me(){fe(te.value===!0?0:Number.MAX_SAFE_INTEGER)}function V(){A!==null&&(clearInterval(A),A=null)}function _e(r,s){const h=Array.prototype.filter.call(y.value.children,P=>P===s||P.matches&&P.matches(".q-tab.q-focusable")===!0),M=h.length;if(M===0)return;if(r===36)return W(h[0]),h[0].focus(),!0;if(r===35)return W(h[M-1]),h[M-1].focus(),!0;const q=r===(t.vertical===!0?38:37),C=r===(t.vertical===!0?40:39),g=q===!0?-1:C===!0?1:void 0;if(g!==void 0){const P=Z.value===!0?-1:1,j=h.indexOf(s)+g*P;return j>=0&&j<M&&(W(h[j]),h[j].focus({preventScroll:!0})),!0}}const Re=i(()=>te.value===!0?{get:r=>Math.abs(r.scrollLeft),set:(r,s)=>{r.scrollLeft=-s}}:t.vertical===!0?{get:r=>r.scrollTop,set:(r,s)=>{r.scrollTop=s}}:{get:r=>r.scrollLeft,set:(r,s)=>{r.scrollLeft=s}});function he(r){const s=y.value,{get:h,set:M}=Re.value;let q=!1,C=h(s);const g=r<C?-1:1;return C+=g*5,C<0?(q=!0,C=0):(g===-1&&C<=r||g===1&&C>=r)&&(q=!0,C=r),M(s,C),K(),q}function ge(r,s){for(const h in r)if(r[h]!==s[h])return!1;return!0}function ae(){let r=null,s={matchedLen:0,queryDiff:9999,hrefLen:0};const h=c.filter(g=>g.routeData!==void 0&&g.routeData.hasRouterLink.value===!0),{hash:M,query:q}=l.$route,C=Object.keys(q).length;for(const g of h){const P=g.routeData.exact.value===!0;if(g.routeData[P===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:j,query:oe,matched:Pe,href:Ae}=g.routeData.resolvedLink.value,a=Object.keys(oe).length;if(P===!0){if(j!==M||a!==C||ge(q,oe)===!1)continue;r=g.name.value;break}if(j!==""&&j!==M||a!==0&&ge(oe,q)===!1)continue;const f={matchedLen:Pe.length,queryDiff:C-a,hrefLen:Ae.length-j.length};if(f.matchedLen>s.matchedLen){r=g.name.value,s=f;continue}else if(f.matchedLen!==s.matchedLen)continue;if(f.queryDiff<s.queryDiff)r=g.name.value,s=f;else if(f.queryDiff!==s.queryDiff)continue;f.hrefLen>s.hrefLen&&(r=g.name.value,s=f)}r===null&&c.some(g=>g.routeData===void 0&&g.name.value===p.value)===!0||Q({name:r,setCurrent:!0})}function Be(r){if(d(),_.value!==!0&&T.value!==null&&r.target&&typeof r.target.closest=="function"){const s=r.target.closest(".q-tab");s&&T.value.contains(s)===!0&&(_.value=!0,E.value===!0&&W(s))}}function ye(){b(()=>{_.value=!1},30)}function Y(){Ce.avoidRouteWatcher===!1?w(ae):L()}function ne(){if(N===void 0){const r=ue(()=>l.$route.fullPath,Y);N=()=>{r(),N=void 0}}}function re(r){c.push(r),x.value++,U(),r.routeData===void 0||l.$route===void 0?w(()=>{if(E.value===!0){const s=p.value,h=s!=null&&s!==""?c.find(M=>M.name.value===s):null;h&&W(h.rootRef.value)}}):(ne(),r.routeData.hasRouterLink.value===!0&&Y())}function pe(r){c.splice(c.indexOf(r),1),x.value--,U(),N!==void 0&&r.routeData!==void 0&&(c.every(s=>s.routeData===void 0)===!0&&N(),Y())}const Ce={currentModel:p,tabProps:O,hasFocus:_,hasActiveTab:ee,registerTab:re,unregisterTab:pe,verifyRouteModel:Y,updateModel:Q,onKbdNavigate:_e,avoidRouteWatcher:!1};ft(Je,Ce);function ke(){B!==null&&clearTimeout(B),V(),N!==void 0&&N()}let le;return se(ke),bt(()=>{le=N!==void 0,ke()}),mt(()=>{le===!0&&ne(),U()}),()=>k("div",{ref:T,class:de.value,role:"tablist",onFocusin:Be,onFocusout:ye},[k(Bt,{onResize:ve}),k("div",{ref:y,class:$e.value,onScroll:K},ht(n.default)),k(qe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(F.value===!0?"":" q-tabs__arrow--faded"),name:t.leftIcon||e.iconSet.tabs[t.vertical===!0?"up":"left"],onMousedownPassive:be,onTouchstartPassive:be,onMouseupPassive:V,onMouseleavePassive:V,onTouchendPassive:V}),k(qe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(z.value===!0?"":" q-tabs__arrow--faded"),name:t.rightIcon||e.iconSet.tabs[t.vertical===!0?"down":"right"],onMousedownPassive:me,onTouchstartPassive:me,onMouseupPassive:V,onMouseleavePassive:V,onTouchendPassive:V})])}});const Qe={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},It=Object.keys(Qe);Qe.all=!0;function Ye(t){const n={};for(const u of It)t[u]===!0&&(n[u]=!0);return Object.keys(n).length===0?Qe:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}function Ge(t,n){return n.event===void 0&&t.target!==void 0&&t.target.draggable!==!0&&typeof n.handler=="function"&&t.target.nodeName.toUpperCase()!=="INPUT"&&(t.qClonedBy===void 0||t.qClonedBy.indexOf(n.uid)===-1)}function Et(){if(window.getSelection!==void 0){const t=window.getSelection();t.empty!==void 0?t.empty():t.removeAllRanges!==void 0&&(t.removeAllRanges(),gt.is.mobile!==!0&&t.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Ve(t,n,u){const l=xe(t);let e,o=l.left-n.event.x,v=l.top-n.event.y,m=Math.abs(o),b=Math.abs(v);const d=n.direction;d.horizontal===!0&&d.vertical!==!0?e=o<0?"left":"right":d.horizontal!==!0&&d.vertical===!0?e=v<0?"up":"down":d.up===!0&&v<0?(e="up",m>b&&(d.left===!0&&o<0?e="left":d.right===!0&&o>0&&(e="right"))):d.down===!0&&v>0?(e="down",m>b&&(d.left===!0&&o<0?e="left":d.right===!0&&o>0&&(e="right"))):d.left===!0&&o<0?(e="left",m<b&&(d.up===!0&&v<0?e="up":d.down===!0&&v>0&&(e="down"))):d.right===!0&&o>0&&(e="right",m<b&&(d.up===!0&&v<0?e="up":d.down===!0&&v>0&&(e="down")));let w=!1;if(e===void 0&&u===!1){if(n.event.isFirst===!0||n.event.lastDir===void 0)return{};e=n.event.lastDir,w=!0,e==="left"||e==="right"?(l.left-=o,m=0,o=0):(l.top-=v,b=0,v=0)}return{synthetic:w,payload:{evt:t,touch:n.event.mouse!==!0,mouse:n.event.mouse===!0,position:l,direction:e,isFirst:n.event.isFirst,isFinal:u===!0,duration:Date.now()-n.event.time,distance:{x:m,y:b},offset:{x:o,y:v},delta:{x:l.left-n.event.lastX,y:l.top-n.event.lastY}}}}let zt=0;var Ft=yt({name:"touch-pan",beforeMount(t,{value:n,modifiers:u}){if(u.mouse!==!0&&ie.has.touch!==!0)return;function l(o,v){u.mouse===!0&&v===!0?Se(o):(u.stop===!0&&Ne(o),u.prevent===!0&&Xe(o))}const e={uid:"qvtp_"+zt++,handler:n,modifiers:u,direction:Ye(u),noop:et,mouseStart(o){Ge(o,e)&&pt(o)&&(we(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(o,!0))},touchStart(o){if(Ge(o,e)){const v=o.target;we(e,"temp",[[v,"touchmove","move","notPassiveCapture"],[v,"touchcancel","end","passiveCapture"],[v,"touchend","end","passiveCapture"]]),e.start(o)}},start(o,v){if(ie.is.firefox===!0&&De(t,!0),e.lastEvt=o,v===!0||u.stop===!0){if(e.direction.all!==!0&&(v!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const d=o.type.indexOf("mouse")>-1?new MouseEvent(o.type,o):new TouchEvent(o.type,o);o.defaultPrevented===!0&&Xe(d),o.cancelBubble===!0&&Ne(d),Object.assign(d,{qKeyEvent:o.qKeyEvent,qClickOutside:o.qClickOutside,qAnchorHandled:o.qAnchorHandled,qClonedBy:o.qClonedBy===void 0?[e.uid]:o.qClonedBy.concat(e.uid)}),e.initialEvent={target:o.target,event:d}}Ne(o)}const{left:m,top:b}=xe(o);e.event={x:m,y:b,time:Date.now(),mouse:v===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:m,lastY:b}},move(o){if(e.event===void 0)return;const v=xe(o),m=v.left-e.event.x,b=v.top-e.event.y;if(m===0&&b===0)return;e.lastEvt=o;const d=e.event.mouse===!0,w=()=>{l(o,d);let y;u.preserveCursor!==!0&&u.preservecursor!==!0&&(y=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),d===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Et(),e.styleCleanup=p=>{if(e.styleCleanup=void 0,y!==void 0&&(document.documentElement.style.cursor=y),document.body.classList.remove("non-selectable"),d===!0){const E=()=>{document.body.classList.remove("no-pointer-events--children")};p!==void 0?setTimeout(()=>{E(),p()},50):E()}else p!==void 0&&p()}};if(e.event.detected===!0){e.event.isFirst!==!0&&l(o,e.event.mouse);const{payload:y,synthetic:p}=Ve(o,e,!1);y!==void 0&&(e.handler(y)===!1?e.end(o):(e.styleCleanup===void 0&&e.event.isFirst===!0&&w(),e.event.lastX=y.position.left,e.event.lastY=y.position.top,e.event.lastDir=p===!0?void 0:y.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||d===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){w(),e.event.detected=!0,e.move(o);return}const L=Math.abs(m),T=Math.abs(b);L!==T&&(e.direction.horizontal===!0&&L>T||e.direction.vertical===!0&&L<T||e.direction.up===!0&&L<T&&b<0||e.direction.down===!0&&L<T&&b>0||e.direction.left===!0&&L>T&&m<0||e.direction.right===!0&&L>T&&m>0?(e.event.detected=!0,e.move(o)):e.end(o,!0))},end(o,v){if(e.event!==void 0){if(Oe(e,"temp"),ie.is.firefox===!0&&De(t,!1),v===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(Ve(o===void 0?e.lastEvt:o,e).payload);const{payload:m}=Ve(o===void 0?e.lastEvt:o,e,!0),b=()=>{e.handler(m)};e.styleCleanup!==void 0?e.styleCleanup(b):b()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(t.__qtouchpan=e,u.mouse===!0){const o=u.mouseCapture===!0||u.mousecapture===!0?"Capture":"";we(e,"main",[[t,"mousedown","mouseStart",`passive${o}`]])}ie.has.touch===!0&&we(e,"main",[[t,"touchstart","touchStart",`passive${u.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,n){const u=t.__qtouchpan;u!==void 0&&(n.oldValue!==n.value&&(typeof value!="function"&&u.end(),u.handler=n.value),u.direction=Ye(n.modifiers))},beforeUnmount(t){const n=t.__qtouchpan;n!==void 0&&(n.event!==void 0&&n.end(),Oe(n,"main"),Oe(n,"temp"),ie.is.firefox===!0&&De(t,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete t.__qtouchpan)}});function J(t,n,u){return u<=n?n:Math.min(u,Math.max(n,t))}function Xt(t,n,u){if(u<=n)return n;const l=u-n+1;let e=n+(t-n)%l;return e<n&&(e=l+e),e===0?0:e}function Ut(t,n=2,u="0"){if(t==null)return t;const l=""+t;return l.length>=n?l:new Array(n-l.length+1).join(u)+l}const Ze="q-slider__marker-labels",Dt=t=>({value:t}),Nt=({marker:t})=>k("div",{key:t.value,style:t.style,class:t.classes},t.label),nt=[34,37,40,33,39,38],Ot={...wt,...Tt,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:t=>t>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,hideSelection:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},jt=["pan","update:modelValue","change"];function Vt({updateValue:t,updatePosition:n,getDragging:u,formAttrs:l}){const{props:e,emit:o,slots:v,proxy:{$q:m}}=ce(),b=Ct(e,m),d=qt(l),w=R(!1),L=R(!1),T=R(!1),y=R(!1),p=i(()=>e.vertical===!0?"--v":"--h"),E=i(()=>"-"+(e.switchLabelSide===!0?"switched":"standard")),F=i(()=>e.vertical===!0?e.reverse===!0:e.reverse!==(m.lang.rtl===!0)),z=i(()=>isNaN(e.innerMin)===!0||e.innerMin<e.min?e.min:e.innerMin),D=i(()=>isNaN(e.innerMax)===!0||e.innerMax>e.max?e.max:e.innerMax),c=i(()=>e.disable!==!0&&e.readonly!==!0&&z.value<D.value),x=i(()=>(String(e.step).trim().split(".")[1]||"").length),_=i(()=>e.step===0?1:e.step),B=i(()=>c.value===!0?e.tabindex||0:-1),A=i(()=>e.max-e.min),N=i(()=>D.value-z.value),O=i(()=>ae(z.value)),ee=i(()=>ae(D.value)),G=i(()=>e.vertical===!0?F.value===!0?"bottom":"top":F.value===!0?"right":"left"),de=i(()=>e.vertical===!0?"height":"width"),$e=i(()=>e.vertical===!0?"width":"height"),X=i(()=>e.vertical===!0?"vertical":"horizontal"),Z=i(()=>{const a={role:"slider","aria-valuemin":z.value,"aria-valuemax":D.value,"aria-orientation":X.value,"data-step":e.step};return e.disable===!0?a["aria-disabled"]="true":e.readonly===!0&&(a["aria-readonly"]="true"),a}),te=i(()=>`q-slider q-slider${p.value} q-slider--${w.value===!0?"":"in"}active inline no-wrap `+(e.vertical===!0?"row":"column")+(e.disable===!0?" disabled":" q-slider--enabled"+(c.value===!0?" q-slider--editable":""))+(T.value==="both"?" q-slider--focus":"")+(e.label||e.labelAlways===!0?" q-slider--label":"")+(e.labelAlways===!0?" q-slider--label-always":"")+(b.value===!0?" q-slider--dark":"")+(e.dense===!0?" q-slider--dense q-slider--dense"+p.value:""));function Q(a){const f="q-slider__"+a;return`${f} ${f}${p.value} ${f}${p.value}${E.value}`}function U(a){const f="q-slider__"+a;return`${f} ${f}${p.value}`}const ve=i(()=>{const a=e.selectionColor||e.color;return"q-slider__selection absolute"+(a!==void 0?` text-${a}`:"")}),Le=i(()=>U("markers")+" absolute overflow-hidden"),W=i(()=>U("track-container")),K=i(()=>Q("pin")),fe=i(()=>Q("label")),be=i(()=>Q("text-container")),me=i(()=>Q("marker-labels-container")+(e.markerLabelsClass!==void 0?` ${e.markerLabelsClass}`:"")),V=i(()=>"q-slider__track relative-position no-outline"+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),_e=i(()=>{const a={[$e.value]:e.trackSize};return e.trackImg!==void 0&&(a.backgroundImage=`url(${e.trackImg}) !important`),a}),Re=i(()=>"q-slider__inner absolute"+(e.innerTrackColor!==void 0?` bg-${e.innerTrackColor}`:"")),he=i(()=>{const a={[G.value]:`${100*O.value}%`,[de.value]:`${100*(ee.value-O.value)}%`};return e.innerTrackImg!==void 0&&(a.backgroundImage=`url(${e.innerTrackImg}) !important`),a});function ge(a){const{min:f,max:S,step:$}=e;let I=f+a*(S-f);if($>0){const H=(I-f)%$;I+=(Math.abs(H)>=$/2?(H<0?-1:1)*$:0)-H}return x.value>0&&(I=parseFloat(I.toFixed(x.value))),J(I,z.value,D.value)}function ae(a){return A.value===0?0:(a-e.min)/A.value}function Be(a,f){const S=xe(a),$=e.vertical===!0?J((S.top-f.top)/f.height,0,1):J((S.left-f.left)/f.width,0,1);return J(F.value===!0?1-$:$,O.value,ee.value)}const ye=i(()=>kt(e.markers)===!0?e.markers:_.value),Y=i(()=>{const a=[],f=ye.value,S=e.max;let $=e.min;do a.push($),$+=f;while($<S);return a.push(S),a}),ne=i(()=>{const a=` ${Ze}${p.value}-`;return Ze+`${a}${e.switchMarkerLabelsSide===!0?"switched":"standard"}${a}${F.value===!0?"rtl":"ltr"}`}),re=i(()=>e.markerLabels===!1?null:ke(e.markerLabels).map((a,f)=>({index:f,value:a.value,label:a.label||a.value,classes:ne.value+(a.classes!==void 0?" "+a.classes:""),style:{...le(a.value),...a.style||{}}}))),pe=i(()=>({markerList:re.value,markerMap:r.value,classes:ne.value,getStyle:le})),Ce=i(()=>{if(N.value!==0){const a=100*ye.value/N.value;return{...he.value,backgroundSize:e.vertical===!0?`2px ${a}%`:`${a}% 2px`}}return null});function ke(a){if(a===!1)return null;if(a===!0)return Y.value.map(Dt);if(typeof a=="function")return Y.value.map(S=>{const $=a(S);return je($)===!0?{...$,value:S}:{value:S,label:$}});const f=({value:S})=>S>=e.min&&S<=e.max;return Array.isArray(a)===!0?a.map(S=>je(S)===!0?S:{value:S}).filter(f):Object.keys(a).map(S=>{const $=a[S],I=Number(S);return je($)===!0?{...$,value:I}:{value:I,label:$}}).filter(f)}function le(a){return{[G.value]:`${100*(a-e.min)/A.value}%`}}const r=i(()=>{if(e.markerLabels===!1)return null;const a={};return re.value.forEach(f=>{a[f.value]=f}),a});function s(){if(v["marker-label-group"]!==void 0)return v["marker-label-group"](pe.value);const a=v["marker-label"]||Nt;return re.value.map(f=>a({marker:f,...pe.value}))}const h=i(()=>[[Ft,M,void 0,{[X.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function M(a){a.isFinal===!0?(y.value!==void 0&&(n(a.evt),a.touch===!0&&t(!0),y.value=void 0,o("pan","end")),w.value=!1,T.value=!1):a.isFirst===!0?(y.value=u(a.evt),n(a.evt),t(),w.value=!0,o("pan","start")):(n(a.evt),t())}function q(){T.value=!1}function C(a){n(a,u(a)),t(),L.value=!0,w.value=!0,document.addEventListener("mouseup",g,!0)}function g(){L.value=!1,w.value=!1,t(!0),q(),document.removeEventListener("mouseup",g,!0)}function P(a){n(a,u(a)),t(!0)}function j(a){nt.includes(a.keyCode)&&t(!0)}function oe(a){if(e.vertical===!0)return null;const f=m.lang.rtl!==e.reverse?1-a:a;return{transform:`translateX(calc(${2*f-1} * ${e.thumbSize} / 2 + ${50-100*f}%))`}}function Pe(a){const f=i(()=>L.value===!1&&(T.value===a.focusValue||T.value==="both")?" q-slider--focus":""),S=i(()=>`q-slider__thumb q-slider__thumb${p.value} q-slider__thumb${p.value}-${F.value===!0?"rtl":"ltr"} absolute non-selectable`+f.value+(a.thumbColor.value!==void 0?` text-${a.thumbColor.value}`:"")),$=i(()=>({width:e.thumbSize,height:e.thumbSize,[G.value]:`${100*a.ratio.value}%`,zIndex:T.value===a.focusValue?2:void 0})),I=i(()=>a.labelColor.value!==void 0?` text-${a.labelColor.value}`:""),H=i(()=>oe(a.ratio.value)),Ie=i(()=>"q-slider__text"+(a.labelTextColor.value!==void 0?` text-${a.labelTextColor.value}`:""));return()=>{const Ee=[k("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[k("path",{d:e.thumbPath})]),k("div",{class:"q-slider__focus-ring fit"})];return(e.label===!0||e.labelAlways===!0)&&(Ee.push(k("div",{class:K.value+" absolute fit no-pointer-events"+I.value},[k("div",{class:fe.value,style:{minWidth:e.thumbSize}},[k("div",{class:be.value,style:H.value},[k("span",{class:Ie.value},a.label.value)])])])),e.name!==void 0&&e.disable!==!0&&d(Ee,"push")),k("div",{class:S.value,style:$.value,...a.getNodeData()},Ee)}}function Ae(a,f,S,$){const I=[];e.innerTrackColor!=="transparent"&&I.push(k("div",{key:"inner",class:Re.value,style:he.value})),e.selectionColor!=="transparent"&&I.push(k("div",{key:"selection",class:ve.value,style:a.value})),e.markers!==!1&&I.push(k("div",{key:"marker",class:Le.value,style:Ce.value})),$(I);const H=[St("div",{key:"trackC",class:W.value,tabindex:f.value,...S.value},[k("div",{class:V.value,style:_e.value},I)],"slide",c.value,()=>h.value)];if(e.markerLabels!==!1){const Ie=e.switchMarkerLabelsSide===!0?"unshift":"push";H[Ie](k("div",{key:"markerL",class:me.value},s()))}return H}return se(()=>{document.removeEventListener("mouseup",g,!0)}),{state:{active:w,focus:T,preventFocus:L,dragging:y,editable:c,classes:te,tabindex:B,attributes:Z,step:_,decimals:x,trackLen:A,innerMin:z,innerMinRatio:O,innerMax:D,innerMaxRatio:ee,positionProp:G,sizeProp:de,isReversed:F},methods:{onActivate:C,onMobileClick:P,onBlur:q,onKeyup:j,getContent:Ae,getThumbRenderFn:Pe,convertRatioToModel:ge,convertModelToRatio:ae,getDraggingRatio:Be}}}const Qt=()=>({});var Yt=Me({name:"QSlider",props:{...Ot,modelValue:{required:!0,default:null,validator:t=>typeof t=="number"||t===null},labelValue:[String,Number]},emits:jt,setup(t,{emit:n}){const{proxy:{$q:u}}=ce(),{state:l,methods:e}=Vt({updateValue:p,updatePosition:F,getDragging:E,formAttrs:xt(t)}),o=R(null),v=R(0),m=R(0);function b(){m.value=t.modelValue===null?l.innerMin.value:J(t.modelValue,l.innerMin.value,l.innerMax.value)}ue(()=>`${t.modelValue}|${l.innerMin.value}|${l.innerMax.value}`,b),b();const d=i(()=>e.convertModelToRatio(m.value)),w=i(()=>l.active.value===!0?v.value:d.value),L=i(()=>{const c={[l.positionProp.value]:`${100*l.innerMinRatio.value}%`,[l.sizeProp.value]:`${100*(w.value-l.innerMinRatio.value)}%`};return t.selectionImg!==void 0&&(c.backgroundImage=`url(${t.selectionImg}) !important`),c}),T=e.getThumbRenderFn({focusValue:!0,getNodeData:Qt,ratio:w,label:i(()=>t.labelValue!==void 0?t.labelValue:m.value),thumbColor:i(()=>t.thumbColor||t.color),labelColor:i(()=>t.labelColor),labelTextColor:i(()=>t.labelTextColor)}),y=i(()=>l.editable.value!==!0?{}:u.platform.is.mobile===!0?{onClick:e.onMobileClick}:{onMousedown:e.onActivate,onFocus:z,onBlur:e.onBlur,onKeydown:D,onKeyup:e.onKeyup});function p(c){m.value!==t.modelValue&&n("update:modelValue",m.value),c===!0&&n("change",m.value)}function E(){return o.value.getBoundingClientRect()}function F(c,x=l.dragging.value){const _=e.getDraggingRatio(c,x);m.value=e.convertRatioToModel(_),v.value=t.snap!==!0||t.step===0?_:e.convertModelToRatio(m.value)}function z(){l.focus.value=!0}function D(c){if(!nt.includes(c.keyCode))return;Se(c);const x=([34,33].includes(c.keyCode)?10:1)*l.step.value,_=([34,37,40].includes(c.keyCode)?-1:1)*(l.isReversed.value===!0?-1:1)*(t.vertical===!0?-1:1)*x;m.value=J(parseFloat((m.value+_).toFixed(l.decimals.value)),l.innerMin.value,l.innerMax.value),p()}return()=>{const c=e.getContent(L,l.tabindex,y,x=>{x.push(T())});return k("div",{ref:o,class:l.classes.value+(t.modelValue===null?" q-slider--no-value":""),...l.attributes.value,"aria-valuenow":t.modelValue},c)}}});export{Ht as Q,Ft as T,Kt as a,Yt as b,Et as c,Ye as g,Xt as n,Ut as p,at as r,Ge as s};
