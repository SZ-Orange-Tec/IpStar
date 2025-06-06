<template>
  <div class="pc-help_content">
    <!-- Android 接入 -->
    <AndroidAccess v-if="name === 'Access_Android'" />
    <IOSAccess v-else-if="name === 'Access_IOS'" />
    <WindowsAccess v-else-if="name === 'Access_Windows'" />
    <div class="Code_API_Access" v-else-if="name === 'Code_API_Access'">
      <h3>{{ $t("PCHelpContent.h3") }}</h3>
      <h4>{{ $t("PCHelpContent.h4") }}</h4>
      <div class="p_box">
        <p>
          <a href="https://ipflare.com/download/example.rar">{{ $t("PCHelpContent.a") }}</a>
          <a href="https://ipflare.com/download/golang.rar">Go</a>
          <a href="https://ipflare.com/download/java.rar">JAVA</a>
          <a href="https://ipflare.com/download/php.rar">PHP</a>
          <a href="https://ipflare.com/download/python.rar">Python</a>
        </p>
      </div>
      <GOCode v-if="sonName === 'Go'" />
      <JAVACode v-else-if="sonName === 'Java'" />
      <PHPCode v-else-if="sonName === 'PHP'" />
      <Python v-else-if="sonName === 'Python'" />
    </div>
    <div class="fingerprint_browser" v-else-if="name === 'Fingerprint_Browser'">
      <ADSPowerAccess v-if="sonName === 'ADSPower'" />
      <BitbrowseAccess v-else-if="sonName === 'Bitbrowse'" />
      <HobStudioAccess v-else-if="sonName === 'HubStudio'" />
      <VMLoginAccess v-else-if="sonName === 'VMLogin'" />
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineAsyncComponent } from "vue"
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  sonName: {
    type: String,
    default: "",
  },
})
const { name, sonName } = toRefs(props)

const AndroidAccess = defineAsyncComponent(() => import("./textComponent/android_access/android_access.vue"))
const IOSAccess = defineAsyncComponent(() => import("./textComponent/IOS_access/IOS_access.vue"))
const WindowsAccess = defineAsyncComponent(() => import("./textComponent/windows_access/windows_access.vue"))
const ADSPowerAccess = defineAsyncComponent(() => import("./textComponent/ADSPower_access/ADSPower_access.vue"))
const BitbrowseAccess = defineAsyncComponent(() => import("./textComponent/Bitbrowse_access/Bitbrowse_access.vue"))
const HobStudioAccess = defineAsyncComponent(() => import("./textComponent/HubStudio_access/HubStudio_access.vue"))
const VMLoginAccess = defineAsyncComponent(() => import("./textComponent/VMLogin_access/VMLogin_access.vue"))
const GOCode = defineAsyncComponent(() => import("./textComponent/Go_code/Go_code.vue"))
const JAVACode = defineAsyncComponent(() => import("./textComponent/JAVA_code/JAVA_code.vue"))
const PHPCode = defineAsyncComponent(() => import("./textComponent/PHP_code/PHP_code.vue"))
const Python = defineAsyncComponent(() => import("./textComponent/Python_code/Python_code.vue"))
</script>

<style lang="less" scoped>
@import url("./help_content.less");
</style>
