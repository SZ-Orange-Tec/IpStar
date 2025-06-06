<template>
  <div class="pc-Go_code">
    <h4>Golang</h4>
    <h5>{{ $t("PCHelpContent.h5[0]") }}</h5>
    <CodeText :code="GoOne" class="codeOne" />
    <h5>{{ $t("PCHelpContent.h5[1]") }}</h5>
    <CodeText :code="GoTwo" />
  </div>
</template>

<script setup>
import { toRefs, defineAsyncComponent } from "vue"
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
  //没有账号密码的情况
  //proxyAddr := "http://代理服务器ip:代理服务器http端口/"
  //带账号密码验证
  //proxyAddr := "http://用户名:密码@代理服务器ip:代理服务器http端口/"
  //proxyAddr := "socks5://代理服务器ip:代理服务器http端口/"
  //proxyAddr := "socks5://用户名:密码@代理服务器ip:代理服务器http端口/"

  //代理服务器
  proxyAddr := "socks5://usertest-id3433-0-US-N:ur87d@vp6.endpoint.pw:9135/"
  //访问的目标网站
  targetURL := "http://ip234.in/ip.json"
  //获取代理对象
  proxy, err := url.Parse(proxyAddr)
  if err != nil {
  log.Fatal(err)
  }
  netTransport := &http.Transport{
  Proxy:                 http.ProxyURL(proxy),
  MaxIdleConnsPerHost:   10,
  ResponseHeaderTimeout: time.Second * time.Duration(10),
  }
  httpClient := &http.Client{
  Timeout:   time.Second * 30,
  Transport: netTransport,
  }
  //请求目标网站
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

  //testProxy 这是一个通用函数，可以直接调用。
  // 参数依次为：目标网站,代理服务器地址，代理端口，代理用户，代理验证密码，协议(socks5|http)

  // targeturl:目标url
  // proxy_server 代理服务地址
  // proxy_port:端口号
  // proxy_user: 用户
  // proxy_pass:验证密码
  // ptype: http | socks5
  func proxyGet(targeturl string, proxy_server string,
  proxy_port int, proxy_user string, proxy_pass string, ptype string) string {
  //proxyAddr := "http://代理服务器ip:代理服务器http端口/"
  //账号密码验证
  //proxyAddr := "http://用户名:密码@代理服务器ip:代理服务器http端口/"

  //proxyAddr := "socks5://代理服务器ip:代理服务器http端口/"
  //proxyAddr := "socks5://用户名:密码@代理服务器ip:代理服务器http端口/"

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
  Proxy:               http.ProxyURL(proxy),
  MaxIdleConnsPerHost: -1,
  //DisableKeepAlives:     true,
  ResponseHeaderTimeout: time.Second * time.Duration(10),
  }
  httpClient := &http.Client{
  Timeout:   time.Second * 20,
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
  //apikey: 你可以在管理控制台用户设置界面找到这个参数。You can find it in the user settings menu of the management console
  ApiKey: "70ba35273b46273ffbc42bac73aefd46",
  //提取的IP个数，Extract IP count
  Count: 10,
  //0:默认，n:保持n分钟。0: default, n: keep n minutes
  Keeptime: 0,
  //代理协议, proxy protocol, 0: socks5, 1:http
  Protocol: 0,
  //region: 地区代码，你可以在后台文档里找到地区参考表。Region code, you can find the region reference in the document on our website.
  Region:  "BR",
  Session: "",
  //0:返回json格式, 1:返回短格式。0: return response as json format, 1: return response as short format
  RespType: 0,
  //Sign = md5(apikey+protocol+count+region), 暂时不验证, Currently, we don't verify it.
  Sign: "",
  }
  rstJson := RespClientAPI{}
  rst := Post("http://service.ipflare.com/v1/obtain_proxy_endpoints", req, "application/json")
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
  //testHttp(channel.Server, channel.Port, channel.User, channel.Pass)
  wg.Done()
  }(channel)
  }
  wg.Wait()

  fmt.Println("success")
  }

  func testSocks5(proxyServer string, proxyPort int, user string, pass string) {

  targetURL := "http://ip234.in/ip.json"

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

  targetURL := "http://ip234.in/ip.json"

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

  // 超时时间：5秒
  client := &http.Client{Timeout: 5 * time.Second}
  resp, err := client.Get(url)
  if err != nil {
  //panic(err)
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
  //panic(err)
  return "", err
  }
  }

  return result.String(), nil
  }

  func Post(url string, data interface{}, contentType string) string {

  // 超时时间：5秒
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

<style lang="less" scoped>
@import url("./Go_code.less");
</style>
