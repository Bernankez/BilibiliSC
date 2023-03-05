<template>
  <Background :show="true">
    <div class="flex flex-col flex-gap-2">
      <SuperChat v-model:captain-type="captain" v-model:title-name="titleName" v-model:level="level" battery="20000" :editable="true" />
      <SuperChat v-model:captain-type="captain" v-model:title-name="titleName" v-model:level="level" battery="20000" :editable="false" />
    </div>
  </Background>
</template>

<script setup lang="ts">
import { CaptainTypes } from "@/types";

const captain = ref(CaptainTypes.captain);
const titleName = ref("粉丝牌");
const level = ref("21");
</script>

<style scoped>
</style>
