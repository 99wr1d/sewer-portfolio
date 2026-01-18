<script setup lang="ts">
import { products, contacts } from '~/src/shared/config'

// Категории для фильтрации товаров
// Халаты только детские, поэтому уточняем в названии
const categories = [
  { id: 'all', label: 'Все' },
  { id: 'towel', label: 'Полотенца' },
  { id: 'bathrobe', label: 'Детские халаты' },
]

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products
  }
  return products.filter(p => p.category === activeCategory.value)
})
</script>

<template>
  <section id="catalog" class="section-padding gradient-warm">
    <div class="container-wide">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          Каталог
        </span>
        <h2 class="heading-section mb-4">
          Наши изделия
        </h2>
        <p class="text-body">
          Мягкие полотенца и уютные детские халаты — идеальные подарки для всей семьи
        </p>
      </div>

      <!-- Category filters -->
      <div class="flex justify-center gap-2 mb-10">
        <button
          v-for="category in categories"
          :key="category.id"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
          :class="[
            activeCategory === category.id
              ? 'bg-primary-600 text-white shadow-soft'
              : 'bg-white text-secondary-600 hover:bg-cream-100',
          ]"
          @click="activeCategory = category.id"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Products grid — используем flex с wrap для центрирования при фильтрации -->
      <div class="flex flex-wrap justify-center gap-6">
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="card group w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
        >
          <!-- Image -->
          <div class="aspect-[4/5] bg-cream-50 relative overflow-hidden">
            <!-- Placeholder -->
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-50 to-warm-100">
              <div class="text-center p-4">
                <svg class="w-12 h-12 mx-auto text-primary-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-primary-300 text-xs">Фото товара</p>
              </div>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-secondary-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <a
                :href="`https://wa.me/${contacts.whatsapp?.replace(/[^0-9]/g, '')}?text=Здравствуйте! Интересует ${product.name}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary text-sm"
              >
                Заказать
              </a>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="heading-card mb-2 group-hover:text-primary-600 transition-colors">
              {{ product.name }}
            </h3>
            <p class="text-sm text-secondary-600 mb-3 line-clamp-2">
              {{ product.description }}
            </p>

            <!-- Features -->
            <div v-if="product.features" class="flex flex-wrap gap-1.5">
              <span
                v-for="feature in product.features"
                :key="feature"
                class="inline-block px-2.5 py-1 bg-cream-100 text-secondary-600 rounded-full text-xs"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- CTA — призыв обсудить особенный подарок -->
      <div class="text-center mt-14 p-8 bg-white/60 rounded-2xl border border-primary-100">
        <p class="text-lg md:text-xl text-secondary-700 font-medium mb-2">
          Хотите что-то особенное?
        </p>
        <p class="text-secondary-600 mb-6 max-w-lg mx-auto">
          Мы создадим уникальный подарок специально для вашего близкого человека — обсудим идею вместе
        </p>
        <a
          href="#contacts"
          class="btn-primary"
        >
          Обсудить идею подарка
        </a>
      </div>
    </div>
  </section>
</template>
