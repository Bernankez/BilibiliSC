<template>
  <div class="background h-full w-full flex items-center justify-center">
    <SuperChat battery="20000" level="33" :captain-type="2" :editable="true" />
  </div>
</template>

<script setup lang="ts">
const { hslList } = useBackground();
</script>

<style scoped>
.background {
  background-image:
    radial-gradient(at 40% 20%, hsla(v-bind("hslList[0]"), 100%, 74%, 0.4) 20px, transparent 70%),
    radial-gradient(at 80% 0%, hsla(v-bind("hslList[1]"), 100%, 56%, 0.4) 20px, transparent 70%),
    radial-gradient(at 0% 50%, hsla(v-bind("hslList[2]"), 100%, 93%, 0.4) 20px, transparent 70%),
    radial-gradient(at 80% 50%, hsla(v-bind("hslList[3]"), 100%, 76%, 0.4) 20px, transparent 70%),
    radial-gradient(at 0% 100%, hsla(v-bind("hslList[4]"), 100%, 77%, 0.4) 20px, transparent 70%),
    radial-gradient(at 80% 100%, hsla(v-bind("hslList[5]"), 100%, 70%, 0.4) 20px, transparent 70%),
    radial-gradient(at 0% 0%, hsla(v-bind("hslList[6]"), 100%, 76%, 0.4) 20px, transparent 70%);
}
</style>
