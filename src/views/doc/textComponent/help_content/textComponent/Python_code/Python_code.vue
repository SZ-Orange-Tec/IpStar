<template>
  <div class="space-y-5">
    <p class="title2">Python</p>

    <div class="space-y-2">
      <p class="title2">{{ t("code_spec._2_2_title") }}</p>
      <CodeText :code="codeOne" class="codeOne" />
    </div>

    <div class="space-y-2">
      <p class="title2">{{ t("code_spec._2_3_title") }}</p>
      <CodeText :code="codeTwo" />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const CodeText = defineAsyncComponent(() => import("../../../../components/code_block/code_block.vue"))

const codeOne = `
import requests
  import json
  import time
  import threading

  def execute_socks5(proxy):
     targetUrl = 'http://ip234.in/ip.json'

     proxyurl = 'socks5h://{user}:{password}@{server}:{port}'.format(user=proxy['user'], password=proxy['pass'], server=proxy['server'], port=proxy['port'])
     proxies = {
        'http': proxyurl, 'https': proxyurl
     }
     res = ""

     while True:
        try:
           res = requests.get(targetUrl, proxies=proxies, timeout=30)
           print("=============================================")
           print(res.text)
           print("=============================================")
           break
        except Exception as e:
           print(e)
           break
     return

     while True:
        try:
           proxylist = get_proxy_list(0)
           threads = []
           for proxy in proxylist:
              threads.append(ThreadFactory(proxy, "socks5"))
           for t in threads:
              t.start()
              time.sleep(0.01)
           for t in threads:
              t.join()
           break
        except Exception as e:
           print(e)
     return

  def execute_http(proxy):
     targetUrl = 'http://ip234.in/ip.json'

     proxyurl = 'http://{user}:{password}@{server}:{port}'.format(user=proxy['user'], password=proxy['pass'], server=proxy['server'], port=proxy['port'])
     proxies = {
        'http': proxyurl, 'https': proxyurl
     }
     res = ""

     while True:
        try:
           res = requests.get(targetUrl, proxies=proxies, timeout=30)
           print("=============================================")
           print(res.text)
           print("=============================================")
           break
        except Exception as e:
           print(e)
           break
     return


`
const codeTwo = `
  import requests
  import json
  import time
  import threading

  def get_proxy_list(protocol):
     payload = json.dumps({
        ## apikey: 您可以在管理控制台用户设置界面找到这个参数。You can find it in the user settings menu of the management console
        'apikey':'70ba35273b46273ffbc42bac73aefd46',
        ## 提取的IP个数，Extract IP count
        'count': 5,
        ## 0:默认，n:保持n分钟。0: default, n: keep n minutes
        'keeptime': 0,
        ## 代理协议, proxy protocol, 0: socks5, 1:http
        'protocol': protocol,
        ## region: 地区代码，您可以在后台文档里找到地区参考表。Region code, you can find the region reference in the document on our website.
        'region': 'BR',
        'session': '',
        ## 0:返回json格式, 1:返回短格式。0: return response as json format, 1: return response as short format
        'resptype': 0,
        ## Sign = md5(apikey+protocol+count+region), 暂时不验证, Currently, we don't verify it.
        'sign': '',
     })
     headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Content-Type': 'application/json'
     }
     res = requests.post("http://service.ipstar.io/v1/obtain_proxy_endpoints", data=payload, headers=headers)
     code = json.loads(res.text).get("code")
     if code != 0 :
        print("get proxylist failed")
        exit

     return json.loads(res.text).get("data")


  class ThreadFactory(threading.Thread):
      def __init__(self, proxy, proxy_type):
          threading.Thread.__init__(self)
          self.proxy = proxy
          self.proxy_type = proxy_type
      def run(self):
          if self.proxy_type == "socks5":
              execute_socks5(self.proxy)
          else:
              execute_http(self.proxy)


  def execute_socks5(proxy):
     targetUrl = 'http://ip234.in/ip.json'

     proxyurl = 'socks5h://{user}:{password}@{server}:{port}'.format(user=proxy['user'], password=proxy['pass'], server=proxy['server'], port=proxy['port'])
     proxies = {
        'http': proxyurl, 'https': proxyurl
     }
     res = ""

     while True:
        try:
           res = requests.get(targetUrl, proxies=proxies, timeout=30)
           print("=============================================")
           print(res.text)
           print("=============================================")
           break
        except Exception as e:
           print(e)
           break
     return

  def test_socks5():
     while True:
        try:
           proxylist = get_proxy_list(0)
           threads = []
           for proxy in proxylist:
              threads.append(ThreadFactory(proxy, "socks5"))
           for t in threads:
              t.start()
              time.sleep(0.01)
           for t in threads:
              t.join()
           break
        except Exception as e:
           print(e)
     return

  def execute_http(proxy):
     targetUrl = 'http://ip234.in/ip.json'

     proxyurl = 'http://{user}:{password}@{server}:{port}'.format(user=proxy['user'], password=proxy['pass'], server=proxy['server'], port=proxy['port'])
     proxies = {
        'http': proxyurl, 'https': proxyurl
     }
     res = ""

     while True:
        try:
           res = requests.get(targetUrl, proxies=proxies, timeout=30)
           print("=============================================")
           print(res.text)
           print("=============================================")
           break
        except Exception as e:
           print(e)
           break
     return


  def test_http():
     while True:
        try:
           proxylist = get_proxy_list(1)
           threads = []
           for proxy in proxylist:
              threads.append(ThreadFactory(proxy, "http"))
           for t in threads:
              t.start()
              time.sleep(0.01)
           for t in threads:
              t.join()
           break
        except Exception as e:
           print(e)
     return

  if __name__ == "__main__":
     test_socks5()
     # test_http()
`
</script>

<style lang="less" scoped></style>
