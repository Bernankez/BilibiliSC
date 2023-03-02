<template>
  <template v-if="!showInput">
    <div :style="textStyle" :class="textClass" class="inline-block cursor-pointer hover:bg-background-light bg-opacity-20! transition rounded-1 whitespace-pre" @click="() => showInput = true">
      <slot :value="modelValue">
        {{ modelValue }}
      </slot>
    </div>
  </template>
  <template v-else>
    <slot name="input">
      <input ref="inputRef" v-model="modelValue" :class="inputClass" class="bg-#ffffff55 outline-none border-none text-white" :style="inputStyle" type="text" @focusout="() => showInput = false" />
    </slot>
  </template>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";

const { modelValue: _modelValue = "", inputStyle, inputClass, textStyle, textClass, inputElement: _inputElement } = defineProps<{
  modelValue?: string | number;
  inputStyle?: StyleValue;
  inputClass?: any;
  textStyle?: StyleValue;
  textClass?: any;
  inputElement?: HTMLElement;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const modelValue = computed({
  get() {
    return _modelValue;
  },
  set(v: string | number) {
    emit("update:modelValue", v);
  },
});

const showInput = ref(false);
const inputRef = ref<HTMLInputElement>();
const inputElement = computed(() => _inputElement || inputRef.value);
onClickOutside(inputElement, () => showInput.value = false);
</script>

<style lang="scss" scoped>
</style>
