<template>
  <template v-if="!editable">
    <slot :value="modelValue">
      {{ modelValue }}
    </slot>
  </template>
  <template v-else-if="!showInput">
    <div :style="textStyle" class="inline-block cursor-pointer hover:bg-background-light bg-opacity-20! transition rounded-1" :class="[textClass, (holder && !modelValue) ? ' whitespace-pre' : '']" @click="onShowInput">
      <slot :value="modelValue">
        {{ holder ? modelValue || '    ' : modelValue }}
      </slot>
    </div>
  </template>
  <template v-else>
    <slot name="input">
      <input ref="inputRef" v-model="modelValue" :class="inputClass" class="bg-#ffffff55 outline-none border-none" :style="inputStyle" type="text" />
    </slot>
  </template>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";

const props = withDefaults(defineProps<{
  modelValue?: string | number;
  inputStyle?: StyleValue;
  inputClass?: any;
  textStyle?: StyleValue;
  textClass?: any;
  inputElement?: HTMLElement;
  editable?: boolean;
  holder?: boolean;
}>(), {
  modelValue: "",
  editable: true,
  holder: true,
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const { modelValue } = useVModels(props, emit);
const { inputStyle, inputClass, textStyle, textClass, inputElement: _inputElement, editable, holder } = toRefs(props);

const showInput = ref(false);
const inputRef = ref<HTMLInputElement>();
const inputElement = computed(() => _inputElement?.value || inputRef.value);
onClickOutside(inputElement, () => showInput.value = false);
useEventListener(inputElement, "focusout", () => showInput.value = false);

function onShowInput() {
  showInput.value = true;
  nextTick(() => {
    inputElement.value?.focus();
  });
}
</script>

<style lang="scss" scoped>
</style>
