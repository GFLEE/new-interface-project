<template>
  <div>
    <a-tabs default-active-key="tab1" @change="callback">
      <a-tab-pane key="tab1" tab="日志列表">
        <LogList></LogList>
      </a-tab-pane>
      <a-tab-pane key="tab2" tab="日志图表" force-render>
        <LogChart></LogChart>
      </a-tab-pane>
      <a-tab-pane key="tab3" tab="Tab 3">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import LogList from "./LogList/LogList";
import LogChart from "./LogList/LogChart";

export default {
  name: "LogTab",
  components: { LogList, LogChart },
  data() {
    return {};
  },

  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>
