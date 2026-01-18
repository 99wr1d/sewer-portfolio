<script setup lang="ts">
import { deliveryZones } from '~/src/shared/config'

const zoneIcons = {
  'Алматы': 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  'Казахстан': 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'Россия': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
}
</script>

<template>
  <section id="delivery" class="section-padding bg-white">
    <div class="container-wide">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Map placeholder -->
        <div class="relative order-2 lg:order-1">
          <div class="aspect-[4/3] rounded-3xl bg-cream-50 overflow-hidden">
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-50 to-warm-100">
              <div class="text-center p-8">
                <svg class="w-24 h-24 mx-auto text-primary-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-primary-400 font-medium mb-2">Карта доставки</p>
                <p class="text-primary-300 text-sm">Казахстан и Россия</p>
              </div>
            </div>
          </div>

          <!-- Badges -->
          <div class="absolute top-4 left-4 bg-white rounded-xl px-4 py-2 shadow-soft">
            <p class="text-sm font-medium text-secondary-900">Доставка</p>
            <p class="text-xs text-primary-600">по всему Казахстану</p>
          </div>

          <div class="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-2 shadow-soft">
            <p class="text-sm font-medium text-secondary-900">Отправка</p>
            <p class="text-xs text-primary-600">в Россию</p>
          </div>
        </div>

        <!-- Content -->
        <div class="order-1 lg:order-2">
          <span class="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            Доставка
          </span>

          <h2 class="heading-section mb-6">
            Доставляем по всему Казахстану и России
          </h2>

          <p class="text-body mb-8">
            Мы отправляем заказы в любую точку Казахстана и России.
            Упаковываем изделия бережно, чтобы они дошли в идеальном состоянии.
          </p>

          <!-- Delivery zones -->
          <div class="space-y-4">
            <div
              v-for="zone in deliveryZones"
              :key="zone.name"
              class="flex gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200"
            >
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    :d="zoneIcons[zone.name as keyof typeof zoneIcons] || zoneIcons['Казахстан']"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="font-serif font-semibold text-secondary-900">
                    {{ zone.name }}
                  </h3>
                  <span class="text-sm font-medium text-primary-600">
                    {{ zone.duration }}
                  </span>
                </div>
                <p class="text-sm text-secondary-600">
                  {{ zone.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Note -->
          <p class="mt-6 text-sm text-secondary-500">
            * Сроки доставки могут варьироваться в зависимости от региона и загруженности служб доставки
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
