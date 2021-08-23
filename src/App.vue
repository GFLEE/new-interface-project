<template>
  <a-config-provider :getPopupContainer="popupContainer">
    <router-view />
  </a-config-provider>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      locale: {}
    };
  },

  created() {},
  computed() {
     mapState("setting", ["layout", "theme", "weekMode", "lang"]) 
  },
  mounted() {},
  watch: {}, 
  methods: {
    popupContainer() {
      return document.getElementById("popContainer");
    }
  }
};
</script>
