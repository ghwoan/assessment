<template>
  <TheBanner></TheBanner>
  <router-view></router-view>
   <!--router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view-->

</template>

<script>
import TheBanner from './components/layout/TheBanner.vue'

export default {
  name: 'App',
  components: {
    TheBanner
  }
}
</script>

<style>

body {
  margin: 0;
}


#app {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
