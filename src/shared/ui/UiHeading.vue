<script setup lang="ts">
/**
 * UiHeading — компонент заголовка
 *
 * Рендерит семантически правильные заголовки (h1-h6) с единым стилем.
 * Важно для SEO: на странице должен быть один h1, затем h2, h3 и т.д.
 *
 * Примеры использования:
 * <UiHeading :level="1" size="display">Главный заголовок</UiHeading>
 * <UiHeading :level="2" align="center">Заголовок секции</UiHeading>
 * <UiHeading :level="3" size="card">Заголовок карточки</UiHeading>
 */

interface Props {
  // Уровень заголовка: 1 = h1, 2 = h2 и т.д.
  // Важно для SEO и доступности
  level?: 1 | 2 | 3 | 4 | 5 | 6
  // Визуальный размер (может отличаться от уровня)
  size?: 'display' | 'section' | 'subsection' | 'card'
  // Выравнивание текста
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  size: 'section',
  align: 'left',
})

/**
 * Классы для разных размеров заголовков
 *
 * text-*xl — размер шрифта в Tailwind
 * sm: lg: — адаптивные размеры для разных экранов
 * font-serif — шрифт с засечками (Cormorant Garamond)
 */
const sizeClasses = {
  // Огромный заголовок для Hero секции
  display: 'text-4xl sm:text-5xl lg:text-6xl font-serif',
  // Заголовок секции
  section: 'text-3xl sm:text-4xl lg:text-5xl font-serif',
  // Подзаголовок
  subsection: 'text-xl sm:text-2xl font-serif',
  // Заголовок карточки
  card: 'text-lg sm:text-xl font-serif',
}

/**
 * Классы выравнивания текста
 */
const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const classes = computed(() => [
  // Цвет текста — тёмно-коричневый
  'text-secondary-900',
  sizeClasses[props.size],
  alignClasses[props.align],
])

/**
 * Динамически определяем тег (h1, h2, h3 и т.д.)
 *
 * Это позволяет использовать правильную семантику HTML
 * независимо от визуального размера заголовка
 */
const tag = computed(() => `h${props.level}`)
</script>

<template>
  <!--
    <component :is="tag"> — динамически выбираем HTML тег
    Если level=2, то будет <h2>, если level=3, то <h3> и т.д.
  -->
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
