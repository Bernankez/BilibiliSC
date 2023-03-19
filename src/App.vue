<template>
  <NMessageProvider>
    <Header />
    <Main>
      <RouterView />
    </Main>
  </NMessageProvider>
</template>

<script setup lang="ts">
import { colorBackground, colorDarkBackground, colorDisabled, colorPrimaryRed as colorPrimary } from "@bernankez/theme";
import { NMessageProvider } from "naive-ui";
</script>

<style lang="scss">
::-webkit-scrollbar {
  height: 13px;
  width: 13px;
  box-shadow: inset 0 0 5px v-bind("colorDisabled.light");
  background-color: v-bind("colorBackground.lighter");

  .dark & {
    background-color: v-bind("colorDarkBackground.darker");
    box-shadow: unset;
  }
}

::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border-style: dashed;
  border-color: transparent;
  border-width: 2px;
  background-color: v-bind("colorDisabled.light");
  background-clip: padding-box;

  .dark & {
    background-color: v-bind("colorDarkBackground.light");
  }
}

::-webkit-scrollbar-thumb:hover {
  background: v-bind("colorDisabled.DEFAULT");
  cursor: pointer;

  .dark & {
    background-color: v-bind("colorDarkBackground.lighter");
  }
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
