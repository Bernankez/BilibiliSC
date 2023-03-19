<template>
  <Background :show="true">
    <div class="flex flex-col p-y-10 box-border items-center flex-gap-5">
      <Transition name="preview">
        <div v-if="preview" class="bg-white bg-opacity-50 backdrop-blur backdrop-saturate-50 rounded-3 p-3 p-t-0 box-border">
          <div class="flex justify-evenly text-center font-italic text-15 font-bold text-gradient-from-white-to-black leading-[1]">
            <span class="gradient-text">预&nbsp;</span>
            <span class="gradient-text">览&nbsp;</span>
          </div>
          <SuperChat ref="superChatRef" v-model:captain-type="captain" v-model:title-name="titleName" v-model:level="level" v-model:name="name" v-model:battery="battery" v-model:super-chat="superChat" class="-m-t-5" :editable="false" />
        </div>
      </Transition>
      <SuperChat v-model:captain-type="captain" v-model:title-name="titleName" v-model:level="level" v-model:name="name" v-model:battery="battery" v-model:super-chat="superChat" :editable="true" />
      <div class="flex justify-evenly w-full">
        <Action icon="i-uil:browser" :title="`${preview ? '关闭' : '打开'}预览`" @click="onPreview" />
        <Action icon="i-uil:copy" title="复制" @click="onCopy" />
        <Action icon="i-uil:arrow-to-bottom" title="下载" @click="onDownload" />
      </div>
    </div>
  </Background>
</template>

<script setup lang="ts">
import { CaptainTypes } from "@/types";
import SuperChat from "@/components/SuperChat.vue";

const captain = ref(CaptainTypes.captain);
const titleName = ref("粉丝牌");
const level = ref("21");
const name = ref("用户名");
const battery = ref(2000);
const superChat = ref("哪里要改点哪里");

const message = useMessage();
const preview = ref(true);

const superChatRef = ref<InstanceType<typeof SuperChat>>();
async function onDownload() {
  const blob = await snapshot(superChatRef.value?.$el, { scale: 2, dpi: 300 });
  download(blob, { filename: "superchat" });
}

const { text } = useTextSelection();
const { Ctrl_C, Command_C } = useMagicKeys();
function isMac() {
  if (navigator) {
    return navigator.userAgent.toUpperCase().includes("MAC");
  }
  return false;
}
watchEffect(() => {
  if (!text.value) {
    // no text selected
    if ((Ctrl_C.value && !isMac()) || Command_C.value) {
      // Ctrl_C on windows or Command_C on mac
      onCopy();
    }
  }
});
async function onCopy() {
  if (navigator.clipboard && ClipboardItem) {
    const blob = await snapshot(superChatRef.value?.$el, { scale: 2, dpi: 300 });
    const data = [new ClipboardItem({ [blob.type]: blob })];
    await navigator.clipboard.write(data);
    message.success("复制成功");
  } else {
    message.warning("你的浏览器不支持复制图片，手动下载一下吧");
  }
}

function onPreview() {
  preview.value = !preview.value;
}
</script>

<style scoped>
.preview-enter-active,
.preview-leave-active {
  transition: all .3s ease-out;
}

.preview-enter-from,
.preview-leave-to {
  transform: translateY(60px);
  opacity: 0;
}

.gradient-text {
  color: #0000;
  background-image: linear-gradient(to bottom, white 0%, white 45%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
}
</style>
