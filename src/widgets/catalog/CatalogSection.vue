<script setup lang="ts">
import { products, contacts } from '~/src/shared/config'

// Категории для фильтрации товаров
// Халаты разделены на махровые и вафельные (все детские)
const categories = [
  { id: 'all', label: 'Все' },
  { id: 'towel', label: 'Полотенца' },
  { id: 'bathrobe-terry', label: 'Махровые халаты' },
  { id: 'bathrobe-waffle', label: 'Вафельные халаты' },
]

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products
  }
  return products.filter(p => p.category === activeCategory.value)
})

// Хранит id раскрытой карточки (null = все закрыты)
// При клике на карточку показываем/скрываем плашку с описанием
const expandedProductId = ref<string | null>(null)

// Переключает раскрытие карточки
const toggleProduct = (productId: string) => {
  if (expandedProductId.value === productId) {
    // Если карточка уже раскрыта — закрываем
    expandedProductId.value = null
  } else {
    // Иначе раскрываем эту карточку (и закрываем предыдущую)
    expandedProductId.value = productId
  }
}

// Закрывает плашку при клике вне карточки
// onClickOutside из VueUse — отслеживает клики за пределами элемента
const catalogRef = ref<HTMLElement | null>(null)
onClickOutside(catalogRef, () => {
  expandedProductId.value = null
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

      <!-- Products grid — сетка 3x3 на десктопе, max-w-4xl ограничивает ширину (уменьшает карточки на ~20%) -->
      <!-- ref нужен для onClickOutside — закрытие плашки при клике вне карточек -->
      <div ref="catalogRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="card group cursor-pointer"
          @click="toggleProduct(product.id)"
        >
          <!-- Image — относительный контейнер для плашки с описанием -->
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

            <!-- Плашка с описанием — выезжает снизу при клике -->
            <div
              class="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-4 transition-transform duration-300 ease-out"
              :class="expandedProductId === product.id ? 'translate-y-0' : 'translate-y-full'"
            >
              <p class="text-sm text-secondary-700 mb-3">
                {{ product.description }}
              </p>
              <!-- Кнопка заказа внутри плашки -->
              <a
                :href="`https://wa.me/${contacts.whatsapp?.replace(/[^0-9]/g, '')}?text=Здравствуйте! Интересует ${product.name}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary text-sm w-full text-center"
                @click.stop
              >
                Заказать
              </a>
            </div>

            <!-- Индикатор "нажми для подробностей" — показываем когда плашка скрыта -->
            <div
              v-if="expandedProductId !== product.id"
              class="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Нажмите для подробностей
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="heading-card mb-2 group-hover:text-primary-600 transition-colors">
              {{ product.name }}
            </h3>

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
