<template>
  <Background :show="true">
    <div class="flex flex-col flex-gap-2">
      <SuperChat v-model:captain-type="captain" v-model:title-name="titleName" v-model:level="level" v-model:name="name" v-model:battery="battery" v-model:super-chat="superChat" :editable="true" />
      <SuperChat v-model:captain-type="captain" v-model:title-name="titleName" v-model:level="level" v-model:name="name" v-model:battery="battery" v-model:super-chat="superChat" :editable="false" />
    </div>
  </Background>
</template>

<script setup lang="ts">
import { CaptainTypes } from "@/types";

const captain = ref(CaptainTypes.captain);
const titleName = ref("粉丝牌");
const level = ref("21");
const name = ref("用户名");
const battery = ref(2000);
const superChat = ref("说点什么吧");
</script>

<style scoped>
</style>
