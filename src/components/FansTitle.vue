<template>
  <div v-if="editable" class="flex items-center">
    <ClientOnly>
      <NPopover ref="popoverRef" raw placement="bottom" trigger="click" :show-arrow="false">
        <template #trigger>
          <img v-if="showCaptain" class="z-1 h-9 w-9 cursor-pointer" :src="captainLogos[captainType]" :draggable="false" alt="captain-logo" />
          <div v-else class="z-1 hover:bg-background-lighter bg-opacity-50! rounded-1 transition cursor-pointer w-4 h-9">
          </div>
        </template>
        <div class="flex flex-col rounded-6px bg-#ffffff77 backdrop-blur backdrop-saturate-50">
          <div class="text-center text-4 text-default m-1 p-1 box-border cursor-pointer select-none rounded-6px bg-opacity-50! hover:bg-background transition" @click="() => onCaptain(CaptainTypes.none)">
            没有在舰
          </div>
          <div class="flex m-1 m-t-0">
            <div class="captain-list">
              <div>没千舰</div>
              <img :src="captain" alt="captain" @click="() => onCaptain(CaptainTypes.captain)" />
              <img :src="viceroy" alt="viceroy" @click="() => onCaptain(CaptainTypes.viceroy)" />
              <img :src="governor" alt="governor" @click="() => onCaptain(CaptainTypes.governor)" />
            </div>
            <div class="captain-list">
              <div>千舰</div>
              <img :src="captainThousand" alt="captainThousand" @click="() => onCaptain(CaptainTypes.captainThousand)" />
              <img :src="viceroyThousand" alt="viceroyThousand" @click="() => onCaptain(CaptainTypes.viceroyThousand)" />
              <img :src="governorThousand" alt="governorThousand" @click="() => onCaptain(CaptainTypes.governorThousand)" />
            </div>
          </div>
        </div>
      </NPopover>
    </ClientOnly>
    <div class="title-background text-14px -m-l-3 flex rounded-3px b-yellow-200 b-1 b-solid overflow-hidden">
      <div class="text-white flex items-center p-l-11px p-r-4px box-border">
        <FocusedInput v-model="titleName" input-class="w-13 text-white" />
      </div>
      <div class="bg-white flex items-center p-x-4px box-border">
        <FocusedInput v-model="level" input-class="w-5" />
      </div>
    </div>
    <div class="name m-l-2 grow-0">
      <FocusedInput v-model="name" input-class="w-35 name" text-class="w-35" />
    </div>
  </div>
  <div v-else class="flex items-center">
    <img v-if="showCaptain" class="z-1 h-9 w-9" :src="captainLogos[captainType]" :draggable="false" alt="captain-logo" />
    <div v-else class="z-1 m-0 h-9 w-1"></div>
    <div v-if="showTitle" class="shrink-0 title-background text-14px flex rounded-3px b-yellow-200 b-1 b-solid overflow-hidden" :class="!showCaptain ? '' : '-m-l-3'">
      <div class="text-white flex items-center p-r-4px box-border" :class="!showCaptain ? 'p-l-4px' : 'p-l-11px'">
        {{ titleName }}
      </div>
      <div class="bg-white flex items-center p-x-4px box-border">
        {{ level }}
      </div>
    </div>
    <div class="name truncate" :class="showTitle ? 'm-l-2' : 'm-l-1'">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PopoverInst } from "naive-ui";
import captain from "@/assets/images/icons/captain.png";
import captainThousand from "@/assets/images/icons/captain_thousand.png";
import governor from "@/assets/images/icons/governor.png";
import governorThousand from "@/assets/images/icons/governor_thousand.png";
import viceroy from "@/assets/images/icons/viceroy.png";
import viceroyThousand from "@/assets/images/icons/viceroy_thousand.png";
import { CaptainTypes } from "@/types";

const props = withDefaults(defineProps<{
  captainType?: CaptainTypes;
  titleName?: string;
  level?: string;
  name?: string;
  editable?: boolean;
}>(), {
  captainType: CaptainTypes.captain,
  titleName: "",
  level: "",
  name: "",
  editable: false,
});

const emit = defineEmits<{
  (event: "update:captainType", captainType: CaptainTypes): void;
  (event: "update:titleName", titleName: string): void;
  (event: "update:level", level: string): void;
  (event: "update:name", name: string): void;
}>();

const { titleName, level, name, editable } = useVModels(props, emit);
const { captainType } = toRefs(props);

const titleBackground = useTitleBackground(computed(() => level.value));

const captainLogos: Record<CaptainTypes, string> = {
  [CaptainTypes.captain]: captain,
  [CaptainTypes.captainThousand]: captainThousand,
  [CaptainTypes.governor]: governor,
  [CaptainTypes.governorThousand]: governorThousand,
  [CaptainTypes.viceroy]: viceroy,
  [CaptainTypes.viceroyThousand]: viceroyThousand,
  [CaptainTypes.none]: "",
};

const showCaptain = computed(() => captainType.value !== CaptainTypes.none);
const showTitle = computed(() => !!titleName.value);

const popoverRef = ref<PopoverInst>();
const onCaptain = (captain: CaptainTypes) => {
  emit("update:captainType", captain);
  popoverRef.value?.setShow(false);
};

const titleInput = ref(false);
const titleNameRef = ref<HTMLInputElement>();
onClickOutside(titleNameRef, () => titleInput.value = false);

const nameColor = useNameColor(computed(() => captainType.value));
</script>

<style lang="scss" scoped>
.title-background {
  background: linear-gradient(to right, v-bind("titleBackground[0]"), v-bind("titleBackground[1]"));
}

:global(.name) {
  color: v-bind(nameColor)
}

.captain-list {
  @apply flex flex-col items-center flex-1;

  & div {
    @apply p-x-2 box-border text-default-light select-none;
  }

  & img {
    --un-bg-opacity: 0.5 !important;
    @apply p-1 box-border w-15 h-10 object-scale-down rounded-6px cursor-pointer hover-bg-background-lighter transition;
  }
}
</style>
