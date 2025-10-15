export default function generateDoc (lang, user, pass, apikey) {
  const zh = `账密接入方式

1. 获取代理用户信息
当前子账号的代理用户名和密码信息如下
代理用户名：${user}
代理用户密码：${pass}

2. 代理用户格式说明
代理用户格式通常为："user-ipstr-keeptime-country-N"
user\t\t\t代理用户名
ipstr\t\t随机字符串，更改此部分可切换IP地址
keeptime\t有效时间(分钟)，0表示不限制时长
country\t\t国家代码(如US, BR等)
N\t\t\t固定后缀

实际示例："${user}-123RsAYBc-0-US-N"
重要提示：切换国家时，必须同时修改"ipstr"，否则修改将无效。

3. IP池服务地址
以下为可用的IP池服务地址（每个入口都是独立的IP池，建议同时在多个地址之间随机获取）：
综合 IP池服务地址 1：pv4.connpnt134.com
综合 IP池服务地址 2：pv5.connpnt134.com
美国 IP池服务地址 1：pv3.connpnt134.com
美国 IP池服务地址 2：pv2.connpnt134.com

4. 实际代理参数示例
user：${user}-123RsAYBc-0-BR-N
pass: ${pass}
sock5 端口：9135
http 端口：9139

SOCKS5 代理示例：curl --socks5 ${user}-123RsAYBc-0-BR-N:${pass}@pv5.connpnt134.com:9135 https://ipinfo.io
HTTP 代理示例：curl -x ${user}-123RsAYBc-0-BR-N:${pass}@pv5.connpnt134.com:9139 https://ipinfo.io


API 接入方式

当前子账号的 apikey 为 ${apikey}

以get请求方式请求下面url
url：https://service.ipflare.com/v1/obtain_proxy_endpoints

接收参数如下：
apikey\t\t\t账号的key
count\t\t\t生成数量
protocol\t\t协议类型，可以的值有 0：socks5  1:http/https
region\t\t\t国家代码(如US, BR等)
resptype\t\t返回参数格式，可以的值有 0：json 1：精简json 2：txt
sign\t\t\t\tmd5加密，md5(apikey + protocol + count + region)
keeptime\t\t有效时间(分钟)，0表示不限制时长
rd\t\t\t\t随机字符串

返回结果会根据resptype的值有所不同，具体如下：

resptype为0，也就是json格式时，返回格式示例如下：
{"code":0,"msg":"","data":[{"server":"***.com","port":9000,"user":"username","pass":"password","ptype":"http"}]} 

resptype为1，也就是精简json格式时，返回格式示例如下：
{"code":0,"msg":"","data":["serve : port : username : password"]} 

resptype为2，也就是txt格式时，返回格式示例如下：
{"code":0,"msg":"","data":["serve : port : username : password"]} 

其中的字段说明如下：
server\t\t\t服务地址
port\t\t\t端口号
user\t\t\t\t代理用户名
pass\t\t\t代理密码
ptype\t\t\t协议类型

一个完整的api连接示例：
https://service.ipflare.com/v1/obtain_proxy_endpoints?apikey=${apikey}&count=50&protocol=1&region=&resptype=0&sign=52c928f1b885aa0c1e4f81736041c97b&keeptime=0&rd=1757314937583
`
  const en = `Account Access Method

1. Get Proxy User Information
The proxy username and password information for the current sub-account are as follows
Proxy Username：${user}
Proxy User Password：${pass}

2. Proxy User Format Description
Proxy user format is usually："user-ipstr-keeptime-country-N"
user\t\t\tProxy username
ipstr\t\t\tRandom string, changing this part will switch IP address
keeptime\t\tValid time (minutes), 0 means no limit
country\t\tCountry code (e.g. US, BR)
N\t\t\t\t\tFixed suffix

Actual example："${user}-123RsAYBc-0-US-N"
Important note：When switching countries, you must change "ipstr" at the same time, otherwise the modification will be invalid.

3. IP Pool Service Address
Below are the available IP pool service addresses (each entry is an independent IP pool, it is recommended to randomly get between multiple addresses)：
General IP Pool Service Address 1：pv4.connpnt134.com
General IP Pool Service Address 2：pv5.connpnt134.com
American IP Pool Service Address 1：pv3.connpnt134.com
American IP Pool Service Address 2：pv2.connpnt134.com

4. Actual Proxy Parameter Example
user：${user}-123RsAYBc-0-BR-N
pass: ${pass}
sock5 port：9135
http port：9139

SOCKS5 proxy example：curl --socks5 ${user}-123RsAYBc-0-BR-N:${pass}@pv5.connpnt134.com:9135 https://ipinfo.io
HTTP proxy example：curl -x ${user}-123RsAYBc-0-BR-N:${pass}@pv5.connpnt134.com:9139 https://ipinfo.io

API Access Method

Current sub-account apikey is ${apikey}

To access the API, you need to send a get request to the following URL:
url：https://service.ipflare.com/v1/obtain_proxy_endpoints

Receive parameters are as follows：
apikey\t\t\tAccount key
count\t\t\t\tNumber of generated proxies
protocol\t\tProtocol type, can be 0: socks5  1: http/https
region\t\t\tCountry code (e.g. US, BR)
resptype\t\tReturn parameter format, can be 0: json 1: compact json 2: txt
sign\t\t\t\tmd5 encryption, md5(apikey + protocol + count + region)
keeptime\t\tValid time (minutes), 0 means no limit
rd\t\t\t\t\tRandom string

Return results will vary depending on the value of resptype, as follows:

resptype is 0, which is the json format, the return format example is as follows：
{"code":0,"msg":"","data":[{"server":"***.com","port":9000,"user":"username","pass":"password","ptype":"http"}]} 

resptype is 1, which is the compact json format, the return format example is as follows：
{"code":0,"msg":"","data":["serve : port : username : password"]} 

resptype is 2, which is the txt format, the return format example is as follows：
{"code":0,"msg":"","data":["serve : port : username : password"]} 

Where the fields are explained as follows：
server\t\t\tService address
port\t\t\t\tPort number
user\t\t\t\tProxy username
pass\t\t\t\tProxy password
ptype\t\t\t\tProtocol type, can be 0: socks5  1: http/Https

https://service.ipflare.com/v1/obtain_proxy_endpoints?apikey=${apikey}&count=50&protocol=1&region=&resptype=0&sign=52c928f1b885aa0c1e4f81736041c97b&keeptime=0&rd=1757314937583
`
  return lang === 'zh' ? zh : en
}
