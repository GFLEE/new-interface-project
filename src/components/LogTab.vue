<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="tab1" tab="日志列表">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="tab2" tab="Tab 2" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="tab3" tab="Tab 3">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
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
