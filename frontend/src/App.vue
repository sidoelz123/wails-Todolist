<script lang="ts" setup>
import {
  PatternBackground
} from '@/components/ui'
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_MASK,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from "@/components/ui/PatternBackground";
</script>

<template>
  <PatternBackground :animate="true" :direction="PATTERN_BACKGROUND_DIRECTION.Bottom"
    :variant="PATTERN_BACKGROUND_VARIANT.Grid" class="flex w-full items-center justify-center"
    :speed="PATTERN_BACKGROUND_SPEED.Slow" :mask="PATTERN_BACKGROUND_MASK.EllipseTop">
    <router-view />
  </PatternBackground>
</template>
