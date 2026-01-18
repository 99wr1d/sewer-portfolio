<script setup lang="ts">
import { experienceFeatures } from '~/src/shared/config'
</script>

<template>
  <section id="experience" class="section-padding bg-white">
    <div class="container-wide">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Image -->
        <div class="relative order-2 lg:order-1">
          <div class="aspect-square rounded-3xl bg-cream-50 overflow-hidden">
            <!-- Placeholder for workshop/master photo -->
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-50 to-warm-100">
              <div class="text-center p-8">
                <svg class="w-20 h-20 mx-auto text-primary-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-primary-400 font-medium">Фото мастерской или мастера</p>
                <p class="text-primary-300 text-sm mt-2">Рекомендуемый размер: 800x800px</p>
              </div>
            </div>
          </div>

          <!-- Decorative element -->
          <div class="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-100 rounded-3xl -z-10" />
        </div>

        <!-- Content -->
        <div class="order-1 lg:order-2">
          <span class="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            О мастерской
          </span>

          <h2 class="heading-section mb-6">
            Создаём подарки, которые согревают сердца
          </h2>

          <p class="text-body mb-8">
            Мы помогаем дарить тепло и заботу близким людям.
            Каждое изделие создаётся с душой — для мам и бабушек, для малышей и их первых достижений,
            для семейных праздников и особенных моментов.
          </p>

          <!-- Features grid -->
          <div class="grid sm:grid-cols-2 gap-6">
            <div
              v-for="(feature, index) in experienceFeatures"
              :key="index"
              class="flex gap-4"
            >
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="font-serif font-semibold text-secondary-900 mb-1">
                  {{ feature.title }}
                </h3>
                <p class="text-sm text-secondary-600">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
