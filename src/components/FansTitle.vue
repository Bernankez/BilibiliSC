<template>
  <div class="flex items-center">
    <img class="z-1 h-9 w-9" :src="captainLogos[captainType]" :draggable="false" alt="captain-logo" />
    <div class="title-background text-14px -m-l-3 flex rounded-3px b-yellow-200 b-1 b-solid overflow-hidden">
      <div class="text-white flex items-center p-l-11px p-r-4px box-border">
        {{ titleName }}
      </div>
      <div class="bg-white flex items-center p-x-4px box-border">
        {{ level }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import captain from "@/assets/images/icons/captain.png";
import captainThousand from "@/assets/images/icons/captain_thousand.png";
import governor from "@/assets/images/icons/governor.png";
import governorThousand from "@/assets/images/icons/governor_thousand.png";
import viceroy from "@/assets/images/icons/viceroy.png";
import viceroyThousand from "@/assets/images/icons/viceroy_thousand.png";
import { CaptainTypes } from "@/types";

const { titleName = "", level = "", captainType = CaptainTypes.captain } = defineProps<{
  captainType?: CaptainTypes;
  titleName?: string;
  level?: string;
}>();
console.log(titleName);
const titleBackground = computed(() => useTitleBackground(level));

const captainLogos: Record<CaptainTypes, string> = {
  [CaptainTypes.captain]: captain,
  [CaptainTypes.captainThousand]: captainThousand,
  [CaptainTypes.governor]: governor,
  [CaptainTypes.governorThousand]: governorThousand,
  [CaptainTypes.viceroy]: viceroy,
  [CaptainTypes.viceroyThousand]: viceroyThousand,
};
</script>

<style scoped>
.title-background {
  background: linear-gradient(to right, v-bind("titleBackground[0]"), v-bind("titleBackground[1]"));
}
</style>
