<script setup lang="ts">
import { navigation, siteConfig } from '~/src/shared/config'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5',
    ]"
  >
    <div class="container-wide flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#hero"
        class="font-serif text-2xl font-semibold text-secondary-900 hover:text-primary-600 transition-colors"
      >
        {{ siteConfig.name }}
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-8">
        <a
          v-for="item in navigation"
          :key="item.href"
          :href="item.href"
          class="text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="lg:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors"
        aria-label="Открыть меню"
        @click="toggleMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 bg-white shadow-soft-lg border-t border-cream-100"
      >
        <nav class="container-wide py-6 flex flex-col gap-4">
          <a
            v-for="item in navigation"
            :key="item.href"
            :href="item.href"
            class="text-lg font-medium text-secondary-700 hover:text-primary-600 transition-colors py-2"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>
