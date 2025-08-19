<template>
  <div
    :class="cn(alertVariants({ variant }), $attrs.class)"
    role="alert"
  >
    <component
      :is="iconComponent"
      v-if="iconComponent"
      class="h-4 w-4"
    />
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-green-500/50 text-green-700 bg-green-50 dark:border-green-500 dark:text-green-400 dark:bg-green-950/30 [&>svg]:text-green-600 dark:[&>svg]:text-green-400',
        warning: 'border-yellow-500/50 text-yellow-700 bg-yellow-50 dark:border-yellow-500 dark:text-yellow-400 dark:bg-yellow-950/30 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400',
        info: 'border-blue-500/50 text-blue-700 bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:bg-blue-950/30 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const iconComponent = computed(() => {
  switch (props.variant) {
    case 'destructive':
      return AlertCircle
    case 'success':
      return CheckCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return null
  }
})
</script>
