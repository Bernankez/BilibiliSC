<template>
  <header class="absolute h-18 inset-0 flex justify-between items-center p-x-6 box-border">
    <div></div>
    <div class="flex flex-gap-6 items-center">
      <div class="i-uil:comment-info text-6 text-default-light hover:text-default cursor-pointer transition" @click="() => showInfo = true"></div>
      <div :class="icon" class="text-5.5 text-default-light hover:text-default cursor-pointer transition" :title="isFullscreen ? '退出全屏' : '全屏'" @click="toggle"></div>
      <a href="https://github.com/Bernankez/BilibiliSC" target="_blank" title="GitHub">
        <div class="i-uil:github-alt text-6 text-default-light hover:text-default cursor-pointer transition"></div>
      </a>
    </div>
    <InfoDialog v-model="showInfo" />
  </header>
</template>

<script setup lang="ts">
import InfoDialog from "@/components/InfoDialog.vue";

const showInfo = ref(false);

const { isFullscreen, toggle } = useFullscreen();
const icon = computed(() => isFullscreen.value ? "i-uil:compress" : "i-uil:expand-arrows-alt");
</script>

<style scoped>
a {
  all: unset;
}
</style>
