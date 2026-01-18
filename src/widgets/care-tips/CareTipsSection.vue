<script setup lang="ts">
/**
 * CareTipsSection — секция "Советы по уходу"
 *
 * Показывает рекомендации по уходу за двумя типами изделий:
 * - Детские халаты
 * - Полотенца с вышивкой
 *
 * Каждый тип имеет свои категории: стирка, моющие средства, сушка, глажка.
 * В конце — блок "Важно знать" с общими заметками.
 */

import { ref } from 'vue'
import { bathrobeCareGuide, towelCareGuide, careImportantNotes } from '~/src/shared/config'
import { UiIcon } from '~/src/shared/ui'

// =============================================================================
// ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ТАБОВ
// =============================================================================

/**
 * Текущий активный таб: 'bathrobe' или 'towel'
 * ref — реактивная переменная, при изменении Vue обновит интерфейс
 */
const activeTab = ref<'bathrobe' | 'towel'>('bathrobe')

/**
 * Оба руководства по уходу в одном объекте для удобного доступа
 */
const careGuides = {
  bathrobe: bathrobeCareGuide,
  towel: towelCareGuide,
}
</script>

<template>
  <section id="care" class="section-padding bg-cream-50">
    <div class="container-narrow">
      <!-- Заголовок секции -->
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="inline-block px-4 py-2 bg-white text-primary-600 rounded-full text-sm font-medium mb-4">
          Советы по уходу
        </span>
        <h2 class="heading-section mb-4">
          Как ухаживать за изделиями
        </h2>
        <p class="text-body">
          Следуйте этим простым рекомендациям, чтобы ваши изделия
          сохраняли свой первоначальный вид долгие годы
        </p>
      </div>

      <!--
        Табы для переключения между халатами и полотенцами
        flex — располагает кнопки в ряд
        justify-center — центрирует по горизонтали
        gap-2 — отступ между кнопками
      -->
      <div class="flex justify-center gap-2 mb-8">
        <button
          type="button"
          class="px-6 py-3 rounded-full font-medium transition-all"
          :class="activeTab === 'bathrobe'
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-white text-secondary-600 hover:bg-cream-100'"
          @click="activeTab = 'bathrobe'"
        >
          🧼 Халаты
        </button>
        <button
          type="button"
          class="px-6 py-3 rounded-full font-medium transition-all"
          :class="activeTab === 'towel'
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-white text-secondary-600 hover:bg-cream-100'"
          @click="activeTab = 'towel'"
        >
          🧺 Полотенца
        </button>
      </div>

      <!--
        Контент активного таба
        transition — анимация при переключении
      -->
      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-soft">
        <!-- Заголовок и описание выбранного типа изделия -->
        <div class="mb-8">
          <h3 class="font-serif text-xl md:text-2xl font-semibold text-secondary-900 mb-3">
            {{ careGuides[activeTab].title }}
          </h3>
          <p class="text-secondary-600">
            {{ careGuides[activeTab].subtitle }}
          </p>
        </div>

        <!--
          Сетка категорий ухода (стирка, сушка и т.д.)
          grid — CSS Grid для расположения
          sm:grid-cols-2 — на экранах sm и больше — 2 колонки
          gap-6 — отступы между карточками
        -->
        <div class="grid sm:grid-cols-2 gap-6">
          <div
            v-for="category in careGuides[activeTab].categories"
            :key="category.title"
            class="bg-cream-50 rounded-2xl p-5"
          >
            <!-- Заголовок категории с иконкой -->
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <UiIcon :name="category.icon" size="sm" class="text-primary-600" />
              </div>
              <h4 class="heading-card">
                {{ category.title }}
              </h4>
            </div>

            <!--
              Список рекомендаций
              space-y-2 — вертикальный отступ между пунктами
            -->
            <ul class="space-y-2">
              <li
                v-for="(item, index) in category.items"
                :key="index"
                class="flex items-start gap-2 text-sm"
                :class="item.forbidden ? 'text-red-600' : 'text-secondary-600'"
              >
                <!--
                  Иконка перед текстом:
                  - ❌ для запретов (forbidden: true)
                  - ✓ для обычных рекомендаций
                -->
                <span class="flex-shrink-0 mt-0.5">
                  {{ item.forbidden ? '❌' : '✓' }}
                </span>
                <span>{{ item.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--
        Блок "Важно знать"
        mt-8 — отступ сверху
      -->
      <div class="mt-8 bg-primary-50 rounded-2xl p-6 md:p-8">
        <h3 class="font-serif text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
          <span>🌿</span>
          Важно знать
        </h3>
        <ul class="space-y-3">
          <li
            v-for="(note, index) in careImportantNotes"
            :key="index"
            class="flex items-start gap-3 text-primary-800"
          >
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary-200 flex items-center justify-center text-xs font-medium text-primary-700">
              ✓
            </span>
            <span>{{ note.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
