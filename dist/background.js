(()=>{"use strict";({136:function(){var t=this&&this.__awaiter||function(t,e,o,a){return new(o||(o=Promise))((function(n,i){function r(t){try{h(a.next(t))}catch(t){i(t)}}function s(t){try{h(a.throw(t))}catch(t){i(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(r,s)}h((a=a.apply(t,e||[])).next())}))};const e=t=>{const e=new Date(t),o=new Date,a=Math.abs(e.getTime()-o.getTime())/1e3;return Math.floor(a).toString()},o=()=>{const t=["Have you been outside today? 🤨 (actually outside, not just to take out the trash or shout at the elderly upstairs neighbour who keeps blasting badly dubbed soap operas). Go touch some grass.","Hello little racoon baby. Basking in the blue light as usual huh? What about getting some Vitamin D in the other light, the one that’s actually beneficial you know… 🌞","Wadup bb. I’d call you a silly goose but geese are actually hydrated: when was the last time you had a sip of water today? Sip sip sip 💦","Browser has been going bzz bzz for a long time 🔫 go have some water or I’ll show everyone your browser history next time you’re sharing your screen on a video call. I mean it. Don’t think that I can’t. Gooooo"];let e=t.slice(0);e.length<=1&&(e=t.slice(0));var o=Math.floor(Math.random()*e.length),a=e[o];return e.splice(o,1),a},a=()=>{Math.floor(5*Math.random()+1),chrome.alarms.create({delayInMinutes:0})};!function(){t(this,void 0,void 0,(function*(){chrome.runtime.onStartup.addListener((()=>{const t=(new Date).toString();chrome.storage.sync.set({startTime:t})})),a(),chrome.alarms.onAlarm.addListener((()=>{chrome.storage.sync.get(["startTime"],(function(t){"NaN"!==e(t.startTime)&&chrome.notifications.create("smth",{title:`Browser open since ${e(t.startTime)} hours`,message:o(),iconUrl:"bestie.png",type:"basic",priority:2})}))})),chrome.notifications.onClosed.addListener((()=>{a()}))}))}()}})[136]()})();