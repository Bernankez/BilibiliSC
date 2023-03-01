<template>
  <Background :show="true">
    <div class="flex flex-col flex-gap-2">
      <SuperChat v-model:captain-type="captain" battery="20000" level="33" :editable="true" />
      <SuperChat v-model:captain-type="captain" battery="20000" level="33" :editable="false" />
    </div>
  </Background>
</template>

<script setup lang="ts">
import { CaptainTypes } from "@/types";

const captain = ref(CaptainTypes.captain);
</script>

<style scoped>
</style>
