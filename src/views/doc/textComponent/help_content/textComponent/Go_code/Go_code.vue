<template>
  <div class="space-y-5">
    <p class="title2">Golang</p>

    <div class="space-y-2">
      <p class="title2">{{ t("code_spec._2_2_title") }}</p>
      <CodeText :code="GoOne" class="codeOne" />
    </div>

    <div class="space-y-2">
      <p class="title2">{{ t("code_spec._2_3_title") }}</p>
      <CodeText :code="GoTwo" />
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineAsyncComponent } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const CodeText = defineAsyncComponent(() => import("../../../../components/code_block/code_block.vue"))
const GoOne = `
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"time"
)

func simpleTest() {
  proxyAddr := "sock
  
  targetURL := "ht
  
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
		proxyAddr = fmt.Sprintf("
	} else {
		proxyAddr = fmt.Sprintf("
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
const GoTwo = `
package main
import (
  "bytes"
  "encoding/json"
  "fmt"
  "io"
  "io/ioutil"
  "log"
  "net/http"
  "sync"
  "time"
)

var ErrCount int

type EndPointRequestData struct {
  ApiKey     string json:"apikey"
  Count      int    json:"count"
  Keeptime   int    json:"keeptime"
  AutoSwitch int    json:"autoswitch"
  Protocol   int    json:"protocol"
  Region     string json:"region"
  Session    string json:"session"
  RespType   int    json:"resptype"
  Sign       string json:"sign"
}

type RespClientAPI struct {
  Code int            json:"code"
  Msg  string         json:"msg"
  Data []EndPointInfo json:"data"
}

type EndPointInfo struct {
  Server string json:"server"
  Port   int    json:"port"
  User   string json:"user"
  Pass   string json:"pass"
  PType  string json:"ptype"
}

type IPInfo struct {
  IP        string json:"ip"
  Country   string json:"country"
  CountryCN string json:"country_cn"
  City      string json:"city"
}

func main() {
  testProxy()
}

func testProxy() {

  req := EndPointRequestData{
		ApiKey: "70ba35273b46273ffbc42bac73aefd46",
		Count: 10,
		Keeptime: 0,
		Protocol: 0,
		Region:  "BR",
		Session: "",
		RespType: 0,
		Sign: "",
  }
  rstJson := RespClientAPI{}
  rst := Post("ht
  json.Unmarshal([]byte(rst), &rstJson)
  if rstJson.Code != 0 {
		fmt.Println("error:", rst)
		return
  }
  wg := sync.WaitGroup{}
  for _, channel := range rstJson.Data {
		go func(channel EndPointInfo) {
		wg.Add(1)
		testSocks5(channel.Server, channel.Port, channel.User, channel.Pass)
		wg.Done()
		}(channel)
  }
  wg.Wait()

  fmt.Println("success")
}

func testSocks5(proxyServer string, proxyPort int, user string, pass string) {

  targetURL := "ht

  tarInf := proxyGet(targetURL,
  proxyServer, proxyPort, user, pass, "socks5")
  if tarInf == "" {
		ErrCount++
		fmt.Println("proxyGet get data failed")
		return
  }
  ipInfo := IPInfo{}
  json.Unmarshal([]byte(tarInf), &ipInfo)
  tarIP := ipInfo.IP
  fmt.Println("IP:" + tarIP + ", Country:" + ipInfo.Country + ", City:" + ipInfo.City)

}

func testHttp(proxyServer string, proxyPort int, user string, pass string) {

  targetURL := "ht

  tarInf := proxyGet(targetURL,
  proxyServer, proxyPort, user, pass, "http")
  if tarInf == "" {
		ErrCount++
		return
  }
  ipInfo := IPInfo{}
  json.Unmarshal([]byte(tarInf), &ipInfo)
  tarIP := ipInfo.IP
  log.Println("IP:" + tarIP + ", Country:" + ipInfo.Country + ", City:" + ipInfo.City)

}

func Get(url string) (respData string, err error) {

  client := &http.Client{Timeout: 5 * time.Second}
  resp, err := client.Get(url)
  if err != nil {
		return "", err
  }
  defer resp.Body.Close()
  var buffer [512]byte
  result := bytes.NewBuffer(nil)
  for {
		n, err := resp.Body.Read(buffer[0:])
		result.Write(buffer[0:n])
		if err != nil && err == io.EOF {
			break
  	} else if err != nil {

			return "", err
		}
  }

  return result.String(), nil
}

func Post(url string, data interface{}, contentType string) string {

  client := &http.Client{Timeout: 5 * time.Second}
  jsonStr, _ := json.Marshal(data)
  resp, err := client.Post(url, contentType, bytes.NewBuffer(jsonStr))
  if err != nil {
		fmt.Println(err)
		return ""
  }
  defer resp.Body.Close()

  result, _ := ioutil.ReadAll(resp.Body)
  return string(result)
}

`
</script>

<style lang="less" scoped></style>
