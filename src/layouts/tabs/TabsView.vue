<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1"  >
      <span slot="tab">
        <a-icon type="apple" />
        Tab 1
      </span>
   <router-view /> 
     </a-tab-pane> 
  </a-tabs>
</template>

<script>

export default {
  name: 'TabsView',
   computed: {
   }
}
</script>
 
<style scoped>

</style>