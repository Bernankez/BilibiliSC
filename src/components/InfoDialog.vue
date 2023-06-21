<template>
  <NModal v-model:show="modelValue" class="w-80% max-w-600px">
    <div class="bg-#ffffff bg-opacity-30% backdrop-blur-12 backdrop-saturate-50 rounded-3 p-3 box-border shadow-lg">
      <div>
        <div class="i-uil:times m-l-auto text-7 font-bold cursor-pointer" @click="() => modelValue = false"></div>
      </div>
      <div class="text-4 text-default">
        上面是预览区，下面是操作区，要改哪里点哪里就行。
      </div>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { NModal } from "naive-ui";

const props = withDefaults(defineProps<{
  modelValue?: boolean;
}>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (event: "update:modelValue", show: boolean): void;
}>();

const { modelValue } = useVModels(props, emit);
</script>

<style scoped>
:global(.n-modal-mask) {
  background-color: unset;
}
</style>
