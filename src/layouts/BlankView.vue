<template>
<div>    
 <router-view />
 </div>
 </template>

<script>
//import PageToggleTransition from '../components/transition/PageToggleTransition';
import {mapState} from 'vuex'

export default {
  name: 'BlankView',
  //components: {PageToggleTransition},
  computed: {
    ...mapState('setting', ['multiPage', 'animate'])
  }
}
</script>

<style scoped>

</style>
