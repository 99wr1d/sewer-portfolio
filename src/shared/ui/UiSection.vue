<script setup lang="ts">
/**
 * UiSection — обёртка для секции страницы
 *
 * Задаёт единообразные отступы и фон для всех секций сайта.
 * Каждая секция страницы (Hero, Catalog, Contacts и т.д.) оборачивается в этот компонент.
 *
 * Примеры использования:
 * <UiSection id="catalog">...</UiSection>
 * <UiSection background="warm" padding="lg">...</UiSection>
 */

interface Props {
  // id секции — используется для якорных ссылок (например: href="#catalog")
  id?: string
  // Цвет фона секции
  background?: 'default' | 'warm' | 'white' | 'gradient'
  // Вертикальные отступы (padding сверху и снизу)
  padding?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  background: 'default',
  padding: 'md',
})

/**
 * Классы для разных фонов
 *
 * bg-* — цвет фона из Tailwind
 * gradient-warm — кастомный градиент из assets/css/main.css
 */
const backgroundClasses = {
  default: 'bg-warm-50',
  warm: 'bg-cream-50',
  white: 'bg-white',
  gradient: 'gradient-warm',
}

/**
 * Классы для вертикальных отступов
 *
 * py-* — padding по вертикали (сверху и снизу)
 * sm: lg: — адаптивные классы для разных размеров экрана
 * sm: — от 640px, lg: — от 1024px
 */
const paddingClasses = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
}

const classes = computed(() => [
  backgroundClasses[props.background],
  paddingClasses[props.padding],
])
</script>

<template>
  <!--
    <section> — семантический HTML5 тег для секции контента
    :id — привязываем id для якорных ссылок
  -->
  <section :id="id" :class="classes">
    <slot />
  </section>
</template>
