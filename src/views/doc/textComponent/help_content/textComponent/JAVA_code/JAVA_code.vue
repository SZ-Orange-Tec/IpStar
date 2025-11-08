<template>
  <div class="space-y-5">
    <p class="title2">JAVA</p>

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
import { toRefs, defineAsyncComponent } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

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
  
  jobject.addProperty("apikey", "70ba35273b46273ffbc42bac73aefd46");
  
  jobject.addProperty("region", "BR");
  jobject.addProperty("session", "");
  jobject.addProperty("protocol", 0); 
  jobject.addProperty("count", 10); 
  jobject.addProperty("Keeptime", 0); 
  jobject.addProperty("resptype", 0); 
  jobject.addProperty("Sign", ""); 

  rst = utils.httpPost("http:
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
      String response = ProxyRequest.socks5ProxyWithOkHttp("http://ipinfo.in/ip.json", "", server, port,subuser, pass);
      System.out.println(response);

    }catch (Exception e) {
      e.printStackTrace();
    }

    }
  }
}
`
</script>

<style lang="less" scoped></style>
