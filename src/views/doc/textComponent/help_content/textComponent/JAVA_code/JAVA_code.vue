<template>
  <div class="pc-JAVA_code">
    <h4>JAVA</h4>
    <h5>{{ $t("PCHelpContent.h5[0]") }}</h5>
    <CodeText :code="codeOne" class="codeOne" />
    <h5>{{ $t("PCHelpContent.h5[1]") }}</h5>
    <CodeText :code="codeTwo" class="codeOne" />
  </div>
</template>

<script setup>
import { toRefs, defineAsyncComponent } from "vue"
const CodeText = defineAsyncComponent(() => import("../../../../components/code_block/code_block.vue"))

const codeOne = `
      package main;

        import java.io.IOException;
        import java.net.InetSocketAddress;
        import java.net.PasswordAuthentication;
        import java.net.Proxy;
        import java.net.Proxy.Type;
        import okhttp3.Credentials;
        import okhttp3.OkHttpClient;
        import okhttp3.Request;

        public class ProxyRequest {

          /**
           *  url:目标url param:请求报文, proxyServer:代理服务地址 port:端口号 user: 用户 password:验证密码
           *  Url: target url param: request message, proxyServer: proxy service address port: port number
           *  user: user password: verification password
           * @throws IOException
           * **/

          public static String socks5ProxyWithOkHttp(String url, String param, String proxyServer,
                  int port, String user, String password) throws IOException {

                  Proxy proxy = new Proxy(Type.SOCKS, new InetSocketAddress(proxyServer,
                              port));

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


          /**
           *  url:目标url param：请求报文 proxyServer：代理服务地址 port:端口号 user: 用户 password:验证密码
           *  Url: target url param: request message, proxyServer: proxy service address port: port number
           *  user: user password: verification password
           * @throws IOException
           * **/
          public static String httpProxyWithOkHttp(String url, String param, String proxyServer,
                  int port, String user, String password) throws IOException {

            Proxy proxy = new Proxy(Type.HTTP, new InetSocketAddress(proxyServer,
                        port));

            OkHttpClient client = new OkHttpClient().newBuilder().proxy(proxy).build();
           //代理认证用户和密码
           //Proxy authenticates users and passwords
            String credential = Credentials.basic(user, password);
            Request request = new Request.Builder().url(url).header("Proxy-Authorization", credential). build();
            okhttp3.Response resp = client.newCall(request).execute();

              return resp.body().string();
          }

          public static void example(String[] args) {
              //socks5 示例 Socks5 Call Example
             // socks5ProxyWithOkHttp( "请求地址", "请求参数", "代理地址", 9315, "用户", "密码");

              //http 调用示例 Http Call Example
             // httpProxyWithOkHttp("请求地址", "请求参数", "代理地址", 9319, "用户", "密码");
          }
        }
      `
const codeTwo = `
      package main;

        import java.io.IOException;
        import com.google.gson.JsonArray;
        import com.google.gson.JsonObject;
        import com.google.gson.JsonParser;


        public class MainClass {

        public static  void main(String args[]) throws IOException {
        testProxy();
        }

        public static  void testProxy() throws IOException {
        String rst;

        JsonObject jobject = new JsonObject();
        //apikey: 你可以在管理控制台用户设置界面找到这个参数。You can find it in the user settings menu of the management console
        jobject.addProperty("apikey", "70ba35273b46273ffbc42bac73aefd46");
        //region: 地区代码，你可以在后台文档里找到地区参考表。Region code, you can find the region reference in the document on our website.
        jobject.addProperty("region", "BR");
        jobject.addProperty("session", "");
        jobject.addProperty("protocol", 0); //代理协议, proxy protocol, 0: socks5, 1:http
        jobject.addProperty("count", 10); //提取的IP个数，Extract IP count
        jobject.addProperty("Keeptime", 0); //0:默认，n:保持n分钟。0: default, n: keep n minutes
        jobject.addProperty("resptype", 0); //0:返回json格式, 1:返回短格式。0: return response as json format, 1: return response as short format
        jobject.addProperty("Sign", ""); //Sign = md5(apikey+protocol+count+region), 暂时不验证, Currently, we don't verify it.

        rst = utils.httpPost("http://service.ipflare.com/v1/obtain_proxy_endpoints", jobject.toString());
        System.out.println(rst);
        JsonParser parse = new JsonParser();
        JsonObject joResult = (JsonObject) parse.parse(rst);
        if (joResult.get("code").getAsInt() != 0) {
        System.out.println("Error, code:" + joResult.get("code").getAsInt() + joResult.get("msg").getAsString());
        return;
        }
        JsonArray jaData = joResult.get("data").getAsJsonArray();

        for (int i = 0; i < jaData.size(); i++) {
        JsonObject item = jaData.get(i).getAsJsonObject();
        String server = item.get("server").getAsString();
        int port = item.get("port").getAsInt();
        String subuser = item.get("user").getAsString();
        String pass = item.get("pass").getAsString();

        try {
        String response = ProxyRequest.socks5ProxyWithOkHttp("http://ip234.in/ip.json", "", server, port,
         subuser, pass);

            System.out.println(response);

        }catch (Exception e) {
        e.printStackTrace();
        }

        }
        }
      }
      `
</script>

<style lang="less" scoped>
@import url("./JAVA_code.less");
</style>
