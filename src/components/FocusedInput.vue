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
      <input ref="inputRef" v-model="modelValue" :class="inputClass" class="bg-#ffffff55 outline-none border-none" :style="inputStyle" type="text" @focusout="() => showInput = false" />
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
}>(), {
  modelValue: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const { modelValue } = useVModels(props, emit);
const { inputStyle, inputClass, textStyle, textClass, inputElement: _inputElement } = toRefs(props);

const showInput = ref(false);
const inputRef = ref<HTMLInputElement>();
const inputElement = computed(() => _inputElement?.value || inputRef.value);
onClickOutside(inputElement, () => showInput.value = false);
</script>

<style lang="scss" scoped>
</style>
