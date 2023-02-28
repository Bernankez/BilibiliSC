<template>
  <div class="super-chat min-w-370px flex flex-col rounded-2 p-1px box-border shadow-lg">
    <div class="super-chat-info rounded-lt-2 rounded-rt-2 p-1 box-border flex items-center justify-between bg-#ffffffdd">
      <div class="flex items-center">
        <FansTitle :captain-type="captainType" :level="level" :title-name="titleName" />
        <span class="name m-l-2">{{ name }}</span>
      </div>
      <div class="text-default">
        {{ battery }}电池
      </div>
    </div>
    <div class="text-white p-2 box-border">
      {{ superChat }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { CaptainTypes } from "@/types";

const { captainType = CaptainTypes.captain, level = "21", name = "用户名", titleName = "粉丝牌", battery = "300", superChat = "你的留言", editable = false } = defineProps<{
  captainType?: CaptainTypes;
  level?: string;
  titleName?: string;
  name?: string;
  battery?: string;
  superChat?: string;
  editable?: boolean;
}>();

const nameColor = useNameColor(computed(() => captainType));
const scBackground = useSCBackground(computed(() => battery));
</script>

<style scoped>
.super-chat {
  background-color: v-bind("scBackground[0]");
}

.super-chat-info {
  background-color: v-bind("scBackground[1]");
}

.name {
  color: v-bind(nameColor)
}
</style>