import Vue from "vue";
import VueI18n from "vue-i18n";
import routesI18n from "@/router/i18n";

function initI18n(locale, fallback) {
  Vue.use(VueI18n);
  let i18nOptions = {
    locale,
    fallbackLocale: fallback,
    silentFallbackWarn: true
  };
  return new VueI18n(i18nOptions);
}

export { initI18n };
