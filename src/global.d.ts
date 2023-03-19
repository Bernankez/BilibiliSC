declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ClientOnly: typeof import("vue").Component
  }
}

export {}