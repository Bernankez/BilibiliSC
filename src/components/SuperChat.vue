<template>
  <div class="super-chat min-w-370px flex flex-col rounded-2 p-1px box-border shadow-lg">
    <div class="super-chat-info rounded-lt-2 rounded-rt-2 p-1 box-border flex items-center justify-between bg-#ffffffdd">
      <FansTitle v-model:captain-type="captainType" v-model:title-name="titleName" v-model:level="level" v-model:name="name" :editable="editable" />
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

const props = withDefaults(defineProps<{
  captainType?: CaptainTypes;
  level?: string;
  titleName?: string;
  name?: string;
  battery?: string;
  superChat?: string;
  editable?: boolean;
}>(), {
  captainType: CaptainTypes.captain,
  level: "21",
  name: "用户名",
  titleName: "粉丝牌",
  battery: "300",
  superChat: "你的留言",
  editable: false,
});

const emit = defineEmits<{
  (event: "update:captainType", captain: CaptainTypes): void;
  (event: "update:titleName", titleName: string): void;
  (event: "update:level", level: string): void;
  (event: "update:name", name: string): void;
}>();

const { captainType, titleName, level, name, battery, superChat } = useVModels(props, emit);
const { editable } = toRefs(props);

const scBackground = useSCBackground(computed(() => battery.value));
</script>

<style scoped>
.super-chat {
  background-color: v-bind("scBackground[0]");
}

.super-chat-info {
  background-color: v-bind("scBackground[1]");
}
</style>
