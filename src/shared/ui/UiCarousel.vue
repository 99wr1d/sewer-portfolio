<script setup lang="ts">
/**
 * UiCarousel — компонент карусели изображений
 *
 * Показывает набор изображений с возможностью листать их.
 * Автоматически переключает слайды каждые несколько секунд.
 *
 * Примеры использования:
 * <UiCarousel :images="['/img1.jpg', '/img2.jpg']" />
 * <UiCarousel :images="images" :autoplay="false" />
 */

// =============================================================================
// ИМПОРТЫ
// =============================================================================

// ref — реактивная переменная, меняется и Vue обновляет интерфейс
// onMounted/onUnmounted — хуки жизненного цикла (когда компонент появился/исчез)
// computed — вычисляемое свойство, пересчитывается автоматически
import { ref, onMounted, onUnmounted, computed } from 'vue'

// =============================================================================
// ТИПЫ
// =============================================================================

interface Props {
  // Массив путей к изображениям
  images: string[]
  // Автоматическое переключение слайдов?
  autoplay?: boolean
  // Интервал автопереключения в миллисекундах (5000 = 5 секунд)
  interval?: number
  // Соотношение сторон контейнера
  aspectRatio?: 'square' | '4/3' | '16/9'
}

// =============================================================================
// ЛОГИКА
// =============================================================================

// withDefaults — устанавливает значения по умолчанию для props
const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  interval: 5000,
  aspectRatio: 'square',
})

// Текущий индекс слайда (начинаем с 0 — первый слайд)
const currentIndex = ref(0)

// Переменная для хранения ID таймера (нужна для остановки автопереключения)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

/**
 * Переключиться на следующий слайд
 * Если достигли конца — возвращаемся к первому слайду
 */
const nextSlide = () => {
  // % (остаток от деления) — делает цикличность:
  // если currentIndex = 4 и images.length = 5, то (4 + 1) % 5 = 0
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

/**
 * Переключиться на предыдущий слайд
 * Если на первом — переходим к последнему
 */
const prevSlide = () => {
  // Если 0 - 1 = -1, то -1 + 5 = 4 (последний слайд при 5 изображениях)
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

/**
 * Перейти к конкретному слайду по индексу (используется для точек-индикаторов)
 */
const goToSlide = (index: number) => {
  currentIndex.value = index
}

/**
 * Запуск автопереключения слайдов
 */
const startAutoplay = () => {
  if (props.autoplay && props.images.length > 1) {
    // setInterval — запускает функцию каждые N миллисекунд
    autoplayTimer = setInterval(nextSlide, props.interval)
  }
}

/**
 * Остановка автопереключения
 */
const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

/**
 * Классы для соотношения сторон контейнера
 * aspect-square = 1:1 (квадрат)
 * aspect-[4/3] = 4:3
 * aspect-video = 16:9
 */
const aspectClasses = computed(() => {
  const classes: Record<string, string> = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
  }
  return classes[props.aspectRatio]
})

// onMounted — выполняется когда компонент появился на странице
onMounted(() => {
  startAutoplay()
})

// onUnmounted — выполняется когда компонент удаляется со страницы
// Важно остановить таймер, чтобы не было утечки памяти
onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <!--
    relative — позиционирование для абсолютно позиционированных детей
    overflow-hidden — скрывает контент выходящий за границы
    rounded-3xl — сильно скруглённые углы
    group — позволяет стилизовать детей при hover на родителе
  -->
  <div
    class="relative overflow-hidden rounded-3xl bg-cream-100 group"
    :class="aspectClasses"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Контейнер слайдов -->
    <div class="relative w-full h-full">
      <!--
        v-for — цикл по всем изображениям
        transition — анимация появления/исчезновения
        absolute inset-0 — растягивает на весь родительский контейнер
      -->
      <transition name="fade" mode="out-in">
        <div
          v-if="images.length > 0"
          :key="currentIndex"
          class="absolute inset-0"
        >
          <!-- Если изображение указано — показываем его -->
          <img
            v-if="images[currentIndex]"
            :src="images[currentIndex]"
            :alt="`Работа ${currentIndex + 1}`"
            class="w-full h-full object-cover"
          />
          <!-- Если изображения нет — показываем placeholder -->
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-cream-100"
          >
            <div class="text-center p-8">
              <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-white/50 flex items-center justify-center">
                <svg class="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-primary-600 font-serif text-lg">Фото {{ currentIndex + 1 }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Кнопки навигации (показываются при наведении если > 1 слайда) -->
    <template v-if="images.length > 1">
      <!--
        Кнопка "Назад"
        opacity-0 group-hover:opacity-100 — скрыта, появляется при hover на карусель
        transition-opacity — плавное появление
      -->
      <button
        type="button"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        @click="prevSlide"
        aria-label="Предыдущее фото"
      >
        <svg class="w-5 h-5 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Кнопка "Вперёд" -->
      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        @click="nextSlide"
        aria-label="Следующее фото"
      >
        <svg class="w-5 h-5 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!--
        Точки-индикаторы (показывают текущий слайд)
        bottom-4 — отступ снизу
        left-1/2 -translate-x-1/2 — центрирование по горизонтали
      -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          v-for="(_, index) in images"
          :key="index"
          type="button"
          class="w-2.5 h-2.5 rounded-full transition-all"
          :class="index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'"
          @click="goToSlide(index)"
          :aria-label="`Перейти к фото ${index + 1}`"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
/**
 * Анимация fade для смены слайдов
 * Vue автоматически добавляет классы fade-enter-* и fade-leave-*
 * при появлении/исчезновении элементов в <transition>
 */

/* Начальное состояние при появлении */
.fade-enter-from {
  opacity: 0;
}

/* Конечное состояние при исчезновении */
.fade-leave-to {
  opacity: 0;
}

/* Анимация перехода */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
