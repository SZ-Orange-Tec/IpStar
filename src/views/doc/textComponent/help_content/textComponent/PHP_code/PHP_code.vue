<template>
  <div class="space-y-5">
    <p class="title2">PHP</p>

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
<?php
   /**
    * $server 代理服务地址
    * $port 端口号
    * $user 用户
    * $pass 验证密码
    */
   function testSocks5($server, $port, $user, $pass) {
       $url = "http://ip234.in/ip.json";
       $curl = curl_init(); // init
       curl_setopt($curl, CURLOPT_URL, $url);
       curl_setopt($curl, CURLOPT_HEADER, 0);
       curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($curl, CURLOPT_TIMEOUT, 30);
       // set proxy
       curl_setopt($curl, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
       curl_setopt($curl, CURLOPT_PROXY, "socks5h://{$user}:{$pass}@{$server}:{$port}");  // curl >= 7.21.7

       $response = curl_exec($curl);
       if (curl_errno($curl)) {
           echo 'Errno '.curl_error($curl) . " socks5h://{$user}:{$pass}@{$server}:{$port}" . PHP_EOL;
       }
       curl_close($curl);

       return $response;
   }

   /**
    * $server 代理服务地址
    * $port 端口号
    * $user 用户
    * $pass 验证密码
    */
   function testHttp($server, $port, $user, $pass) {
       $url = "http://ip234.in/ip.json";
       $ch = curl_init(); // init
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_HEADER, 0);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($ch, CURLOPT_TIMEOUT, 30);
       curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
       // set proxy
       curl_setopt($ch, CURLOPT_PROXY, " http://{$user}:{$pass}@{$server}:{$port}");

       $response = curl_exec($ch);
       if (curl_errno($ch)) {
           echo 'Errno '.curl_error($ch) . "http://{$user}:{$pass}@{$server}:{$port}". PHP_EOL;
       }
       curl_close($ch);

       return $response;
   }

   function curl_get($url){
       $ch = curl_init(); // init
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_HEADER, 0);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
       $response = curl_exec($ch);
       curl_close($ch);

       return $response;
   }


   function curl_post($url, $data){
       $ch = curl_init(); // 启动一个CURL会话
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
       curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
       curl_setopt($ch, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
       curl_setopt($ch, CURLOPT_POST, 1); // 发送一个常规的Post请求
       curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
       curl_setopt($ch, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
       curl_setopt($ch, CURLOPT_HEADER, 0);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       $response = curl_exec($ch);
       if (curl_errno($ch)) {
           echo 'Errno'.curl_error($ch);
       }
       curl_close($ch);
       return $response;
   }
 `
const codeTwo = `
<?php

$req = [
    //apikey: 您可以在管理控制台用户设置界面找到这个参数。You can find it in the user settings menu of the management console
    'apikey'    => "70ba35273b46273ffbc42bac73aefd46",
    //提取的IP个数，Extract IP count
    'count'     => 5,
    //0:默认，n:保持n分钟。0: default, n: keep n minutes
    'keeptime'  => 0,
    //代理协议, proxy protocol, 0: socks5, 1:http
    'protocol'  => 0,
    //region: 地区代码，您可以在后台文档里找到地区参考表。Region code, you can find the region reference in the document on our website.
    'region'    => 'BR',
    'session'   => '',
    // 0:返回json格式, 1:返回短格式。0: return response as json format, 1: return response as short format
    'resptype'  => 0,
    //Sign = md5(apikey+protocol+count+region), 暂时不验证, Currently, we don't verify it.
    'sign'      => '',
];

$json = curl_post("http://service.ipstar.io/v1/obtain_proxy_endpoints", json_encode($req));
$res = json_decode($json, true);
$proxylist = $res["data"] ?? [];
if (empty($proxylist)) {
    echo "get proxy failed";
    exit;
}
foreach ($proxylist as $key => $val) {
    $json = testSocks5($val["server"], $val["port"], $val["user"], $val["pass"]);
    // $json = testHttp($val["server"], $val["port"], $val["user"], $val["pass"]);
    $res = json_decode($json, true);
    if ($res) {
        echo "==============================================" . PHP_EOL;
        echo "IP: {$res['ip']}, Country:{$res['country']}, City: {$res['city']}". PHP_EOL;
        echo $json . PHP_EOL;
        echo "==============================================" . PHP_EOL;
    }
}
      `
</script>

<style lang="less" scoped></style>
