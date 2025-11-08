export const go = `package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"time"
)

func simpleTest() {
  proxyAddr := "socks5://usertest-id3433-0-US-N:ur87d@vp6.endpoint.pw:9135/"
  targetURL := "http://ipinfo.in/ip.json"
  
  proxy, err := url.Parse(proxyAddr)
  if err != nil {
  	log.Fatal(err)
  }
  netTransport := &http.Transport{
		Proxy:http.ProxyURL(proxy),
		MaxIdleConnsPerHost:   10,
		ResponseHeaderTimeout: time.Second * time.Duration(10),
  }
  httpClient := &http.Client{
		Timeout:   time.Second * 30,
		Transport: netTransport,
  }
  
  res, err := httpClient.Get(targetURL)
  if err != nil {
		log.Println(err)
		return
  }
  defer res.Body.Close()
  if res.StatusCode != http.StatusOK {
  	log.Println(err)
  	return
  }
  c, _ := ioutil.ReadAll(res.Body)
  fmt.Println(string(c))
}
  
func proxyGet(targeturl string, proxy_server string,proxy_port int, proxy_user string, proxy_pass string, ptype string) string {
	proxyAddr := ""
	if proxy_user != "" {
		proxyAddr = fmt.Sprintf("%s://%s:%s@%s:%d/", ptype, proxy_user, proxy_pass, proxy_server, proxy_port)
	} else {
		proxyAddr = fmt.Sprintf("%s://%s:%d/", ptype, proxy_server, proxy_port)
	}

	proxy, err := url.Parse(proxyAddr)
	if err != nil {
		fmt.Println("err channel:", proxy_server, proxy_user, proxy_pass)
		fmt.Println(err)
		return ""
	}
	netTransport := &http.Transport{
		Proxy:http.ProxyURL(proxy),
		MaxIdleConnsPerHost: -1,
		
		ResponseHeaderTimeout: time.Second * time.Duration(10),
	}
	httpClient := &http.Client{
		Timeout:time.Second * 20,
		Transport: netTransport,
	}

	var res *http.Response

	res, err = httpClient.Get(targeturl)

	if err != nil {
		fmt.Println("err proxy:", proxy_server, proxy_user, proxy_pass)
		fmt.Println(err)
		return ""
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		fmt.Println("err proxy:", proxy_server, proxy_user, proxy_pass)
		fmt.Println(err)
		return ""
	}

	c, _ := ioutil.ReadAll(res.Body)
	fmt.Println("proxy:", proxy_server, proxy_user, proxy_pass)
	fmt.Println(string(c))
	return string(c)
}

`

export const java = `package main;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.PasswordAuthentication;
import java.net.Proxy;
import java.net.Proxy.Type;
import okhttp3.Credentials;
import okhttp3.OkHttpClient;
import okhttp3.Request;

public class ProxyRequest {

  public static String socks5ProxyWithOkHttp(String url, String param, String proxyServer,int port, String user, String password) throws IOException {
    Proxy proxy = new Proxy(Type.SOCKS, new InetSocketAddress(proxyServer,port));
    java.net.Authenticator.setDefault(new java.net.Authenticator() {
    private PasswordAuthentication authentication =
      new PasswordAuthentication(user, password.toCharArray());
      @Override
      protected PasswordAuthentication getPasswordAuthentication() {
        return authentication;
      }
    });

    OkHttpClient client = new OkHttpClient().newBuilder().proxy(proxy).build();
    Request request = new Request.Builder().url(url).build();
    okhttp3.Response response = client.newCall(request).execute();
    String responseStr = response.body().string();

    return responseStr;
  }

  public static String httpProxyWithOkHttp(String url, String param, String proxyServer,int port, String user, String password) throws IOException {
    Proxy proxy = new Proxy(Type.HTTP, new InetSocketAddress(proxyServer,port));
    OkHttpClient client = new OkHttpClient().newBuilder().proxy(proxy).build();
    
    String credential = Credentials.basic(user, password);
    Request request = new Request.Builder().url(url).header("Proxy-Authorization", credential). build();
    okhttp3.Response resp = client.newCall(request).execute();

    return resp.body().string();
  }

  public static void example(String[] args) {
    
  }
}
`
export const php = `<?php
   function testSocks5($server, $port, $user, $pass) {
       $url = "http://ipinfo.in/ip.json";
       $curl = curl_init(); // init
       curl_setopt($curl, CURLOPT_URL, $url);
       curl_setopt($curl, CURLOPT_HEADER, 0);
       curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($curl, CURLOPT_TIMEOUT, 30);
       
       curl_setopt($curl, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
       curl_setopt($curl, CURLOPT_PROXY, "socks5h://{$user}:{$pass}@{$server}:{$port}");  // curl >= 7.21.7

       $response = curl_exec($curl);
       if (curl_errno($curl)) {
           echo 'Errno '.curl_error($curl) . " socks5h://{$user}:{$pass}@{$server}:{$port}" . PHP_EOL;
       }
       curl_close($curl);

       return $response;
   }
   
   function testHttp($server, $port, $user, $pass) {
       $url = "http://ipinfo.in/ip.json";
       $ch = curl_init(); // init
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

export const python = `import requests
  import json
  import time
  import threading

  def execute_socks5(proxy):
     targetUrl = 'http://ipinfo.in/ip.json'

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
     targetUrl = 'http://ipinfo.in/ip.json'

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
