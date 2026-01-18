<script setup lang="ts">
import { careTips } from '~/src/shared/config'

const icons: Record<string, string> = {
  washing: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z',
  drying: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  ironing: 'M7 2v11m0 0V2a2 2 0 012-2h10a2 2 0 012 2v11M7 13h12a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h2z',
  storage: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
}
</script>

<template>
  <section id="care" class="section-padding bg-cream-50">
    <div class="container-narrow">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="inline-block px-4 py-2 bg-white text-primary-600 rounded-full text-sm font-medium mb-4">
          Советы по уходу
        </span>
        <h2 class="heading-section mb-4">
          Как ухаживать за изделиями
        </h2>
        <p class="text-body">
          Следуйте этим простым рекомендациям, чтобы ваши полотенца и халаты с вышивкой
          сохраняли свой первоначальный вид долгие годы
        </p>
      </div>

      <!-- Tips grid -->
      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="tip in careTips"
          :key="tip.title"
          class="card-warm p-6"
        >
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
              <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  v-if="tip.icon === 'washing'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
                <path
                  v-else-if="tip.icon === 'drying'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  v-else-if="tip.icon === 'ironing'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-serif text-lg font-semibold text-secondary-900 mb-2">
                {{ tip.title }}
              </h3>
              <p class="text-secondary-600 text-sm leading-relaxed">
                {{ tip.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional note -->
      <div class="mt-10 p-6 bg-white rounded-2xl border border-cream-200 text-center">
        <p class="text-secondary-700">
          <strong class="text-secondary-900 font-medium">Важно:</strong>
          К каждому изделию прилагается карточка с подробными рекомендациями по уходу
        </p>
      </div>
    </div>
  </section>
</template>
