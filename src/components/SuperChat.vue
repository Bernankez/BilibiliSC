<template>
  <div class="super-chat w-370px flex flex-col rounded-2 p-1px box-border shadow-lg">
    <div class="super-chat-info rounded-lt-2 rounded-rt-2 p-1 box-border flex items-center justify-between bg-#ffffffdd">
      <FansTitle v-model:captain-type="captainType" v-model:title-name="titleName" v-model:level="level" v-model:name="name" class="truncate" :editable="editable" />
      <div class="text-default flex items-center flex-gap-1 min-w-fit">
        <FocusedInput v-model="battery" :editable="editable" input-class="w-12" />
        <div class="shrink-0">
          电池
        </div>
      </div>
    </div>
    <div class="text-white p-2 box-border">
      <FocusedInput v-model="superChat" :input-element="textareaRef?.$el" :editable="editable" input-class="w-full text-white" text-class="w-full whitespace-pre-wrap break-words">
        <template #input>
          <NInput ref="textareaRef" v-model:value="superChat" :style="textareaReset" autosize type="textarea" clearable round placeholder="">
            <template #clear-icon>
              <div class="i-uil:times-circle text-darkdefault"></div>
            </template>
          </NInput>
        </template>
      </FocusedInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import type { InputInst } from "naive-ui";
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

const textareaRef = ref<InputInst & ComponentPublicInstance>();
const textareaShow = useElementVisibility(computed(() => textareaRef.value?.$el));
watchEffect(() => {
  if (textareaShow.value) { textareaRef.value?.focus(); }
});

const textareaReset = ref({
  "--n-border-hover": "none",
  "--n-border-focus": "none",
  "--n-box-shadow-focus": "none",
  "--n-border": "none",
  "background": "#ffffff33",
});
</script>

<style scoped>
:deep(.n-input__textarea-el){
  color: white;
}

.super-chat {
  background-color: v-bind("scBackground[0]");
}

.super-chat-info {
  background-color: v-bind("scBackground[1]");
}
</style>
