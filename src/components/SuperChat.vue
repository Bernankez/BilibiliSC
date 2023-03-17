<template>
  <div class="super-chat w-370px flex flex-col rounded-2 p-1px box-border shadow-lg">
    <div class="super-chat-info rounded-lt-2 rounded-rt-2 p-1 box-border flex items-center justify-between bg-#ffffffdd">
      <FansTitle v-model:captain-type="captainType" v-model:title-name="titleName" v-model:level="level" v-model:name="name" class="truncate" :editable="editable" />
      <div class="text-default shrink-0">
        <FocusedInput v-model="battery" :editable="editable" input-class="w-12" />
        电池
      </div>
    </div>
    <div class="text-white p-2 box-border">
      <FocusedInput v-model="superChat" :input-element="textareaRef" :editable="editable" input-class="w-full text-white" text-class="w-full">
        <template #input>
          <textarea ref="textareaRef" v-model="superChat" rows="2" class="w-full bg-#ffffff55 outline-none border-none rounded-1 text-white text-4"></textarea>
        </template>
      </FocusedInput>
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
  battery?: string | number;
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
  (event: "update:battery", battery: string): void;
  (event: "update:superChat", superChat: string): void;
}>();

const { captainType, titleName, level, name, battery, superChat } = useVModels(props, emit);
const { editable } = toRefs(props);

const scBackground = useSCBackground(computed(() => battery.value.toString()));

const textareaRef = ref<HTMLTextAreaElement>();
</script>

<style scoped>
.super-chat {
  background-color: v-bind("scBackground[0]");
}

.super-chat-info {
  background-color: v-bind("scBackground[1]");
}
</style>
