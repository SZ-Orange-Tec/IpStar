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
   
   function testSocks5($server, $port, $user, $pass) {
       $url = "http://ipinfo.in/ip.json";
       $curl = curl_init(); 
       curl_setopt($curl, CURLOPT_URL, $url);
       curl_setopt($curl, CURLOPT_HEADER, 0);
       curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($curl, CURLOPT_TIMEOUT, 30);
       
       curl_setopt($curl, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
       curl_setopt($curl, CURLOPT_PROXY, "socks5h://{$user}:{$pass}@{$server}:{$port}");  

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
       $url = "http://ipinfo.in/ip.json";
       $ch = curl_init(); 
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_HEADER, 0);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($ch, CURLOPT_TIMEOUT, 30);
       curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
       
       curl_setopt($ch, CURLOPT_PROXY, " http://{$user}:{$pass}@{$server}:{$port}");

       $response = curl_exec($ch);
       if (curl_errno($ch)) {
           echo 'Errno '.curl_error($ch) . "http://{$user}:{$pass}@{$server}:{$port}". PHP_EOL;
       }
       curl_close($ch);

       return $response;
   }

   function curl_get($url){
       $ch = curl_init(); 
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_HEADER, 0);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
       $response = curl_exec($ch);
       curl_close($ch);

       return $response;
   }


   function curl_post($url, $data){
       $ch = curl_init(); 
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
       curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
       curl_setopt($ch, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
       curl_setopt($ch, CURLOPT_POST, 1); 
       curl_setopt($ch, CURLOPT_POSTFIELDS, $data); 
       curl_setopt($ch, CURLOPT_TIMEOUT, 30); 
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
    'apikey'    => "70ba35273b46273ffbc42bac73aefd46",
    'count'     => 5,
    'keeptime'  => 0,
    'protocol'  => 0,
    'region'    => 'BR',
    'session'   => '',
    
    'resptype'  => 0,
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
