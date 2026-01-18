<script setup lang="ts">
/**
 * APP.VUE — Главный компонент приложения
 *
 * Это корневой компонент Nuxt приложения. Здесь собирается вся страница.
 *
 * Структура страницы:
 * 1. TheHeader — шапка сайта (навигация)
 * 2. <main> — основной контент (секции)
 * 3. TheFooter — подвал сайта
 *
 * Каждая секция — отдельный компонент из папки src/widgets/
 * Порядок секций определяется здесь.
 *
 * Чтобы добавить новую секцию:
 * 1. Создай компонент в src/widgets/new-section/
 * 2. Импортируй его здесь
 * 3. Добавь в нужное место внутри <main>
 */

// =============================================================================
// ИМПОРТ КОМПОНЕНТОВ
// =============================================================================

// Layout компоненты (шапка и подвал)
import { TheHeader } from '~/src/widgets/header'
import { TheFooter } from '~/src/widgets/footer'

// Секции страницы (в порядке отображения)
import { HeroSection } from '~/src/widgets/hero'
import { ExperienceSection } from '~/src/widgets/experience'
import { CatalogSection } from '~/src/widgets/catalog'
import { PersonalizationSection } from '~/src/widgets/personalization'
import { CareTipsSection } from '~/src/widgets/care-tips'
import { DeliverySection } from '~/src/widgets/delivery'
import { ContactsSection } from '~/src/widgets/contacts'
</script>

<template>
  <!--
    Корневой контейнер страницы
    min-h-screen — минимальная высота = высота экрана
    (чтобы футер всегда был внизу даже если контента мало)
  -->
  <div class="min-h-screen">
    <!-- Шапка сайта с навигацией (фиксированная) -->
    <TheHeader />

    <!--
      Основной контент страницы
      <main> — семантический тег HTML5 для основного контента
    -->
    <main>
      <!-- Главный экран с заголовком и CTA -->
      <HeroSection />

      <!-- О нас / Опыт работы -->
      <ExperienceSection />

      <!-- Каталог товаров -->
      <CatalogSection />

      <!-- Как заказать персонализацию -->
      <PersonalizationSection />

      <!-- Советы по уходу -->
      <CareTipsSection />

      <!-- Информация о доставке -->
      <DeliverySection />

      <!-- Контактная информация -->
      <ContactsSection />
    </main>

    <!-- Подвал сайта -->
    <TheFooter />
  </div>
</template>
