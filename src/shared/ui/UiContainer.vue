<script setup lang="ts">
/**
 * UiContainer — контейнер для контента
 *
 * Ограничивает ширину контента и центрирует его на странице.
 * Добавляет отступы по бокам на мобильных устройствах.
 *
 * Примеры использования:
 * <UiContainer>Контент ограниченной ширины</UiContainer>
 * <UiContainer size="narrow">Узкий контейнер для текста</UiContainer>
 */

interface Props {
  // Максимальная ширина контейнера
  size?: 'narrow' | 'wide' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'wide',
})

/**
 * Классы максимальной ширины
 *
 * max-w-5xl = 64rem (1024px) — для узкого контента (текст)
 * max-w-7xl = 80rem (1280px) — для широкого контента (карточки)
 * max-w-full = 100% — без ограничения
 */
const sizeClasses = {
  narrow: 'max-w-5xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
}

/**
 * mx-auto — центрирует элемент по горизонтали (margin: auto)
 * px-4 sm:px-6 lg:px-8 — отступы по бокам:
 *   - мобильный: 16px
 *   - планшет (sm): 24px
 *   - десктоп (lg): 32px
 */
const classes = computed(() => [
  'mx-auto px-4 sm:px-6 lg:px-8',
  sizeClasses[props.size],
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
