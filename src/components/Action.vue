<template>
  <div v-if="!title && !$slots.title" role="button" aria-label="Action Button" :class="sizeClass.button" class="group flex justify-center items-center rounded-99 bg-background hover:bg-background-lighter transition bg-opacity-50! backdrop-blur backdrop-saturate-50 cursor-pointer shadow hover:shadow-md active:shadow active:shadow-inset" @click="onClick">
    <slot :class="defaultClass">
      <div :class="[defaultClass, icon, sizeClass.icon]"></div>
    </slot>
  </div>
  <ClientOnly v-else>
    <NPopover placement="bottom" raw :show-arrow="false" :delay="500">
      <template #trigger>
        <div role="button" aria-label="Action Button" :class="sizeClass.button" class="group flex justify-center items-center rounded-99 bg-background hover:bg-background-lighter transition bg-opacity-50! backdrop-blur backdrop-saturate-50 cursor-pointer shadow hover:shadow-md active:shadow active:shadow-inset" @click="onClick">
          <slot :class="defaultClass">
            <div :class="[defaultClass, icon, sizeClass.icon]"></div>
          </slot>
        </div>
      </template>
      <div class="flex flex-col rounded-2 p-y-1 p-x-2 box-border bg-#ffffff77 backdrop-blur backdrop-saturate-50">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </NPopover>
  </ClientOnly>
</template>

<script setup lang="ts">
const { size = "medium", icon = "", title = "" } = defineProps<{
  size?: "small" | "medium" | "large";
  icon?: string;
  title?: string;
}>();

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const defaultClass = "text-default-light group-hover:text-default transition";

const sizeClass = computed(() => {
  if (size === "small") {
    return {
      button: "h-7 w-7",
      icon: "text-4",
    };
  } else if (size === "medium") {
    return {
      button: "h-8 w-8",
      icon: "text-5",
    };
  } else {
    return {
      button: "h-9 w-9",
      icon: "text-6",
    };
  }
});

const onClick = (e: MouseEvent) => {
  emit("click", e);
};
</script>
