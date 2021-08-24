<template>
  <a-config-provider :getPopupContainer="popupContainer">
    <router-view />
  </a-config-provider>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { enquireScreen } from "@/utils/util";
import {getI18nKey} from '@/utils/routerUtil'

export default {
  name: "App",
  data() {
    return {
      locale: {}
    };
  },
  created() {
    enquireScreen(isMobile => this.setDevice(isMobile));
  },
  mounted() {},

  computed: {
    //computed是不能传参数
    ...mapState("setting", ["layout", "theme", "weekMode", "lang"])
  },
  watch: {
    weekMode(val) {
      this.setWeekModeTheme(val);
    },
    lang(val) {
      this.setLanguage(val);
      this.setHtmlTitle();
    },
    $route() {
      this.setHtmlTitle();
    }
  },
  methods: {
    ...mapMutations("setting", ["setDevice"]),
    setHtmlTitle() {
      const route = this.$route;
      const key =
        route.path === "/"
          ? "home.name"
          : getI18nKey(route.matched[route.matched.length - 1].path);
      document.title = process.env.VUE_APP_NAME + " | " + this.$t(key);
    },
    popupContainer() { 
      return document.getElementById("popContainer");
    }, 
    setLanguage(lang) {
      this.$i18n.locale = lang;
      switch (lang) {
        case "CN":
          this.locale = require("ant-design-vue/es/locale-provider/zh_CN").default;
          break;
        case "HK":
          this.locale = require("ant-design-vue/es/locale-provider/zh_TW").default;
          break;
        case "US":
        default:
          this.locale = require("ant-design-vue/es/locale-provider/en_US").default;
          break;
      }
    },
    setWeekModeTheme(weekMode) {
      if (weekMode) {
        document.body.classList.add("week-mode");
      } else {
        document.body.classList.remove("week-mode");
      }
    }
  }
};
</script>

<style lang="less" scoped>
#id {
}
</style>
