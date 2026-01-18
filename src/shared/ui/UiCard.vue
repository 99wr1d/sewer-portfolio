<script setup lang="ts">
/**
 * UiCard — компонент карточки
 *
 * Контейнер с тенью и скруглёнными углами для группировки контента.
 * Используется для товаров, блоков информации, советов и т.д.
 *
 * Примеры использования:
 * <UiCard>Содержимое карточки</UiCard>
 * <UiCard variant="warm" :hover="false">Без hover эффекта</UiCard>
 * <UiCard padding="lg">С большими отступами</UiCard>
 */

// =============================================================================
// ТИПЫ
// =============================================================================

interface Props {
  // Визуальный стиль карточки
  variant?: 'default' | 'warm' | 'bordered'
  // Включить эффект при наведении? (карточка приподнимается)
  hover?: boolean
  // Внутренние отступы
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

// =============================================================================
// ЛОГИКА
// =============================================================================

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hover: true,
  padding: 'md',
})

/**
 * Классы для разных стилей карточки
 */
const variantClasses = {
  // Стандартная белая карточка с тенью
  default: 'bg-white shadow-soft',
  // Тёплая карточка — кремовый фон с рамкой
  warm: 'bg-cream-50 border border-cream-200',
  // Карточка с рамкой на белом фоне
  bordered: 'bg-white border border-secondary-200',
}

/**
 * Классы для внутренних отступов (padding)
 *
 * p-4 = padding: 1rem (16px) со всех сторон
 * p-6 = padding: 1.5rem (24px)
 * p-8 = padding: 2rem (32px)
 */
const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/**
 * Собираем все классы вместе
 *
 * rounded-2xl — скруглённые углы
 * overflow-hidden — скрывает контент выходящий за границы
 * transition-all duration-300 — плавная анимация (300ms)
 * hover:shadow-soft-lg — увеличенная тень при наведении
 * hover:-translate-y-1 — приподнимается на 4px при наведении
 */
const classes = computed(() => [
  'rounded-2xl overflow-hidden transition-all duration-300',
  variantClasses[props.variant],
  paddingClasses[props.padding],
  // Добавляем hover-эффекты только если hover=true
  props.hover && 'hover:shadow-soft-lg hover:-translate-y-1',
])
</script>

<template>
  <!-- Простой div с динамическими классами -->
  <div :class="classes">
    <!-- slot — сюда попадает всё что написано между <UiCard>...</UiCard> -->
    <slot />
  </div>
</template>
