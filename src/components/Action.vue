<template>
  <div role="button" :class="sizeClass.button" class="group flex justify-center items-center rounded-99 bg-background hover:bg-background-lighter transition bg-opacity-50! backdrop-blur backdrop-saturate-50 cursor-pointer shadow hover:shadow-md active:shadow active:shadow-inset">
    <slot :class="defaultClass">
      <div :class="[defaultClass, icon, sizeClass.icon] "></div>
    </slot>
  </div>
</template>

<script setup lang="ts">
const { size = "medium", icon = "" } = defineProps<{
  size?: "small" | "medium" | "large";
  icon?: string;
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
</script>
