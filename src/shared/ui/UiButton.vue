<script setup lang="ts">
/**
 * UiButton — универсальный компонент кнопки/ссылки
 *
 * Используется для всех интерактивных элементов на сайте.
 * Может быть кнопкой (<button>) или ссылкой (<a>) в зависимости от наличия href.
 *
 * Примеры использования:
 * <UiButton>Нажми меня</UiButton>
 * <UiButton variant="secondary" size="lg">Большая кнопка</UiButton>
 * <UiButton href="/about">Ссылка как кнопка</UiButton>
 * <UiButton href="https://google.com" external>Внешняя ссылка</UiButton>
 */

// =============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// =============================================================================

/**
 * Props — параметры компонента, которые передаются снаружи
 *
 * Знак ? означает необязательный параметр
 * | означает "или" — параметр может быть одним из нескольких значений
 */
interface Props {
  // Визуальный стиль кнопки
  variant?: 'primary' | 'secondary' | 'outline'
  // Размер кнопки
  size?: 'sm' | 'md' | 'lg'
  // Если указан href — компонент станет ссылкой <a>
  href?: string
  // Открывать ссылку в новой вкладке?
  external?: boolean
  // Заблокировать кнопку?
  disabled?: boolean
}

// =============================================================================
// ЛОГИКА КОМПОНЕНТА
// =============================================================================

/**
 * withDefaults + defineProps — стандартный способ объявления props в Vue 3
 *
 * defineProps<Props>() — говорит Vue какие параметры принимает компонент
 * withDefaults(...) — задаёт значения по умолчанию
 */
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  external: false,
  disabled: false,
})

/**
 * Объект с Tailwind-классами для каждого варианта стиля
 *
 * Ключ — название варианта (primary, secondary, outline)
 * Значение — строка с CSS-классами Tailwind
 */
const variantClasses = {
  // Основная кнопка — яркий коричневый фон, белый текст
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-soft-lg',
  // Вторичная кнопка — светлый кремовый фон
  secondary: 'bg-cream-100 text-primary-800 hover:bg-cream-200 border border-cream-300',
  // Контурная кнопка — прозрачный фон с рамкой
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
}

/**
 * Классы для разных размеров кнопки
 *
 * px — горизонтальный padding (отступ внутри)
 * py — вертикальный padding
 * text-* — размер текста
 */
const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/**
 * Базовые классы — применяются ко всем кнопкам независимо от варианта
 *
 * inline-flex — делает элемент flex-контейнером в одну строку
 * items-center justify-center — центрирует содержимое
 * rounded-full — полностью скруглённые углы (пилюля)
 * transition-all — плавная анимация всех изменений
 * disabled:* — стили для заблокированной кнопки
 */
const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed'

/**
 * computed — вычисляемое свойство Vue
 *
 * Автоматически пересчитывается когда изменяются зависимости (props)
 * Возвращает массив классов, который Vue объединит в строку
 */
const classes = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>

<template>
  <!--
    Динамический компонент <component :is="...">

    Позволяет менять тег элемента в зависимости от условия:
    - Если есть href → рендерим <a> (ссылку)
    - Если нет href → рендерим <button> (кнопку)

    :href, :target, :rel — атрибуты для ссылки
    :disabled — атрибут для кнопки
    :class — применяем вычисленные классы
  -->
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :disabled="disabled"
    :class="classes"
  >
    <!-- slot — место куда попадёт содержимое между тегами <UiButton>...</UiButton> -->
    <slot />
  </component>
</template>
