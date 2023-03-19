<template>
  <div class="super-chat flex flex-col box-border shadow-lg">
    <div class="super-chat-info box-border flex items-center justify-between bg-#ffffffdd">
      <FansTitle v-model:captain-type="captainType" v-model:title-name="titleName" v-model:level="level" v-model:name="name" class="truncate" :editable="editable" />
      <div class="super-chat-battery text-default flex items-center min-w-fit">
        <FocusedInput v-model="battery" :editable="editable" input-class="super-chat-battery__input" />
        <div class="shrink-0">
          电池
        </div>
      </div>
    </div>
    <div class="super-chat-superchat text-white box-border">
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
import { baseFontSizeSymbol } from "@/types/injections";

const props = withDefaults(defineProps<{
  captainType?: CaptainTypes;
  level?: string;
  titleName?: string;
  name?: string;
  battery?: string | number;
  superChat?: string;
  editable?: boolean;
  baseFontSize?: number;
}>(), {
  captainType: CaptainTypes.captain,
  level: "21",
  name: "用户名",
  titleName: "粉丝牌",
  battery: "300",
  superChat: "你的留言",
  editable: false,
  baseFontSize: 16,
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
const { editable, baseFontSize: _baseFontSize } = toRefs(props);

provide(baseFontSizeSymbol, _baseFontSize);
const baseFontSize = computed(() => `${_baseFontSize.value}px`);

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
  padding: calc(v-bind(baseFontSize) * 1 / 16);
  width: calc(v-bind(baseFontSize) * 370 / 16);
  border-radius: calc(0.5 * v-bind(baseFontSize));
  background-color: v-bind("scBackground[0]");
}

.super-chat-info {
  padding: calc(0.25 * v-bind(baseFontSize));
  border-top-left-radius: calc(0.5 * v-bind(baseFontSize));
  border-top-right-radius: calc(0.5 * v-bind(baseFontSize));
  background-color: v-bind("scBackground[1]");
}

.super-chat-battery {
  font-size: calc(1 * v-bind(baseFontSize));
  grid-gap: calc(0.25 * v-bind(baseFontSize));
  gap: calc(0.25 * v-bind(baseFontSize));
}

:global(.super-chat-battery__input) {
  width: calc(3 * v-bind(baseFontSize));
}

.super-chat-superchat {
  font-size: calc(1 * v-bind(baseFontSize));
  padding: calc(0.5 * v-bind(baseFontSize));
}
</style>
