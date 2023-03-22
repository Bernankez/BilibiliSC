<template>
  <NModal v-model:show="modelValue" class="w-80% max-w-600px">
    <div class="bg-#ffffff bg-opacity-30% backdrop-blur-12 backdrop-saturate-50 rounded-3 p-3 box-border shadow-lg">
      <div>
        <div class="i-uil:times m-l-auto text-7 font-bold cursor-pointer" @click="() => modelValue = false"></div>
      </div>
      <div class="text-4 text-default">
        上面是预览区，下面是操作区，要改哪里点哪里就行。
      </div>
      <ClientOnly>
        <NPopover placement="bottom" raw :show-arrow="false" :delay="500">
          <template #trigger>
            <div>目前还是只支持Edge或Chrome浏览器😩如果有大佬想要增加适配欢迎pr🥺</div>
          </template>
          <div class="flex flex-col rounded-2 p-y-1 p-x-2 box-border bg-#ffffff">
            Safari和火狐目前的问题在于生成图片时，为了生成更清晰的图片，我搞了一个尺寸两倍的display: none的组件丢给dom-to-image，此时需要给dom-to-image传一个Element的宽高，但是在Safari和火狐上获取不到这个宽高。<br />
            另外火狐默认不支持ClipboardItem，没办法复制。
          </div>
        </NPopover>
      </ClientOnly>
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
