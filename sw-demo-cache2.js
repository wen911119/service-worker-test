var VERSION = 'v10'

// 缓存
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll(['./wechat2.html'])
    })
  )
})

// 缓存更新
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// 捕获请求并返回缓存数据
const html =
  '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Banggo商城</title><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black"><meta name="apple-touch-fullscreen" content="yes"><meta name="format-detection" content="telephone=no, email=no"><script>if(location.hash.indexOf("ismp")>-1){var wxscript=document.createElement("script");wxscript.src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js",document.head.appendChild(wxscript)}</script><style>html,body{-ms-overflow-style:scrollbar;-webkit-tap-highlight-color:transparent;padding:0;margin:0;width:100%;height:100%;overflow:hidden}.weex-root{height:100%!important}.flex{display:flex!important}.flex-1{flex:1!important}.flex-h-center{justify-content:center!important}.flex-v-center{align-items:center!important}.flex-x-center{justify-content:center!important;align-items:center!important}.flex-row{flex-direction:row!important}.flex-column{flex-direction:column!important}.iconfont{font-family:iconfont!important}.text{color:#333!important}.text24{font-size:.32rem!important}.text26{font-size:.3467rem!important}.text28{font-size:.373333rem!important}.text30{font-size:.4rem!important}.text32{font-size:.4267rem!important}.text34{font-size:.453333rem!important}.text36{font-size:.48rem!important}.text38{font-size:.5067rem!important}</style></head><body><div id="root"><style>.loader,.loader:before,.loader:after{border-radius:50%}.loader{color:#fff;font-size:11px;text-indent:-99999em;margin:55px auto;position:relative;width:10em;height:10em;box-shadow:inset 0 0 0 1em;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0)}.loader:before,.loader:after{position:absolute;content:""}.loader:before{width:5.2em;height:10.2em;background:#0dc5c1;border-radius:10.2em 0 0 10.2em;top:-.1em;left:-.1em;-webkit-transform-origin:5.2em 5.1em;transform-origin:5.2em 5.1em;-webkit-animation:load2 2s infinite ease 1.5s;animation:load2 2s infinite ease 1.5s}.loader:after{width:5.2em;height:10.2em;background:#0dc5c1;border-radius:0 10.2em 10.2em 0;top:-.1em;left:5.1em;-webkit-transform-origin:0 5.1em;transform-origin:0 5.1em;-webkit-animation:load2 2s infinite ease;animation:load2 2s infinite ease}@-webkit-keyframes load2{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes load2{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style><div class="loader">Loading...</div></div><script type="text/javascript" src="https://banggo.ruiyun2015.com/vendor.73ea4ffd85a761c0623f.bundle.js" defer></script><script type="text/javascript" src="https://banggo.ruiyun2015.com/index.60fb1167e60acd0b95fb.bundle.js" defer></script></body></html>'
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        caches.open(VERSION).then(function(cache) {
          cache.put(event.request, response)
        })
        return response.clone()
      } else if (/test\.html/.test(event.request.url)) {
        return new Response(html, {
          headers: {
            'content-type': 'text/html; charset=utf-8'
          }
        })
      } else {
        return fetch(event.request)
      }
    })
  )
})
