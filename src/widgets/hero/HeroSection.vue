<script setup lang="ts">
/**
 * HeroSection — главная секция страницы (первый экран)
 *
 * Это первое что видит пользователь при открытии сайта.
 * Содержит: заголовок, описание, кнопки действия и изображение.
 *
 * Данные берутся из: src/shared/config/site.ts
 */

// Импортируем данные из конфигурации
// siteConfig — информация о сайте (название, местоположение)
// contacts — контакты для кнопки WhatsApp
import { siteConfig, contacts } from '~/src/shared/config'
</script>

<template>
  <!--
    Главная секция занимает весь экран (min-h-screen)

    Классы:
    - relative — для позиционирования декоративных элементов внутри
    - min-h-screen — минимальная высота = высота экрана
    - flex items-center — контент по центру по вертикали
    - gradient-warm — градиентный фон (определён в assets/css/main.css)
    - overflow-hidden — скрывает элементы выходящие за границы
  -->
  <section
    id="hero"
    class="relative min-h-screen flex items-center gradient-warm overflow-hidden"
  >
    <!--
      ДЕКОРАТИВНЫЕ ЭЛЕМЕНТЫ ФОНА
      Размытые круги для создания мягкого визуального эффекта

      absolute — позиционирование относительно родителя (section)
      -top-24 -right-24 — сдвиг за пределы видимой области
      rounded-full — круг
      opacity-50 — прозрачность 50%
      blur-3xl — сильное размытие
    -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full opacity-50 blur-3xl" />
      <div class="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-cream-200 rounded-full opacity-40 blur-3xl" />
    </div>

    <!--
      ОСНОВНОЙ КОНТЕНТ
      container-wide — ограничение ширины (из assets/css/main.css)
      z-10 — выше декоративных элементов
      pt/pb — отступы сверху/снизу (padding top/bottom)
    -->
    <div class="container-wide relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
      <!--
        СЕТКА: две колонки на десктопе
        grid — включает grid layout
        lg:grid-cols-2 — 2 колонки на экранах от 1024px
        gap-12 — расстояние между колонками
        items-center — вертикальное выравнивание по центру
      -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!--
          ЛЕВАЯ КОЛОНКА: текст и кнопки
          text-center lg:text-left — по центру на мобильных, слева на десктопе
        -->
        <div class="text-center lg:text-left">
          <!--
            Бейдж с локацией
            inline-block — строчно-блочный элемент (ширина по контенту)
            rounded-full — скруглённые углы (пилюля)
          -->
          <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            Швейная мастерская в {{ siteConfig.location }}
          </span>

          <!--
            Главный заголовок (h1)
            heading-display — стили заголовка из main.css
            text-balance — равномерное распределение текста по строкам
          -->
          <h1 class="heading-display mb-6 text-balance">
            <span class="block">Уникальные</span>
            <span class="text-primary-600">полотенца и халаты</span>
            <span class="block">с вышивкой</span>
          </h1>

          <!--
            Описание
            text-body — стили текста из main.css
            max-w-lg — максимальная ширина текста
            mx-auto lg:mx-0 — центрирование на мобильных
          -->
          <!--
            Описание — акцент на подарках близким и детям
            text-body — стили текста из main.css
            max-w-lg — максимальная ширина текста
            mx-auto lg:mx-0 — центрирование на мобильных
          -->
          <p class="text-body max-w-lg mx-auto lg:mx-0 mb-8">
            Создаём персонализированные текстильные изделия с любовью.
            Идеальный подарок для близких, детей и особенных моментов.
          </p>

          <!--
            КНОПКИ ДЕЙСТВИЯ
            flex — flexbox для расположения кнопок
            flex-col sm:flex-row — вертикально на мобильных, горизонтально на планшетах
            gap-4 — расстояние между кнопками
          -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <!--
              Кнопка WhatsApp
              :href — динамическая ссылка с номером телефона
              replace(/[^0-9]/g, '') — удаляет всё кроме цифр из номера
              target="_blank" — открывает в новой вкладке
              rel="noopener noreferrer" — безопасность для внешних ссылок
            -->
            <a
              :href="`https://wa.me/${contacts.whatsapp?.replace(/[^0-9]/g, '')}`"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary gap-2"
            >
              <!-- Инлайн SVG иконка WhatsApp -->
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Написать в WhatsApp
            </a>

            <!-- Вторичная кнопка — ссылка на каталог (якорь) -->
            <a href="#catalog" class="btn-secondary">
              Смотреть каталог
            </a>
          </div>
        </div>

        <!--
          ПРАВАЯ КОЛОНКА: коллаж изображений
          Показываем разнообразие работ: полотенца, детские халаты, вышивка
        -->
        <div class="relative">
          <!--
            КОЛЛАЖ ИЗ 4 ФОТО
            grid — сетка для расположения фото
            grid-cols-2 — 2 колонки
            gap-3 — небольшой отступ между фото
          -->
          <div class="grid grid-cols-2 gap-3 lg:gap-4">
            <!--
              Фото 1 — большое, занимает левую колонку
              row-span-2 — занимает 2 строки
              aspect-[3/4] — вертикальное соотношение
            -->
            <div class="row-span-2 aspect-[3/4] rounded-2xl lg:rounded-3xl bg-cream-100 overflow-hidden shadow-soft">
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-100 to-primary-100">
                <div class="text-center p-4">
                  <svg class="w-12 h-12 mx-auto text-primary-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-primary-400 text-sm font-medium">Полотенце</p>
                </div>
              </div>
              <!-- TODO: Заменить на <NuxtImg src="/images/hero/collage-1.jpg" alt="Полотенце с вышивкой" /> -->
            </div>

            <!--
              Фото 2 — правый верхний квадрат
              aspect-square — квадратное соотношение
            -->
            <div class="aspect-square rounded-2xl lg:rounded-3xl bg-cream-100 overflow-hidden shadow-soft">
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-cream-100">
                <div class="text-center p-4">
                  <svg class="w-10 h-10 mx-auto text-primary-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-primary-400 text-xs font-medium">Детский халат</p>
                </div>
              </div>
              <!-- TODO: Заменить на <NuxtImg src="/images/hero/collage-2.jpg" alt="Детский халат с вышивкой" /> -->
            </div>

            <!--
              Фото 3 — правый нижний квадрат
            -->
            <div class="aspect-square rounded-2xl lg:rounded-3xl bg-cream-100 overflow-hidden shadow-soft">
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-100 to-primary-100">
                <div class="text-center p-4">
                  <svg class="w-10 h-10 mx-auto text-primary-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-primary-400 text-xs font-medium">Вышивка</p>
                </div>
              </div>
              <!-- TODO: Заменить на <NuxtImg src="/images/hero/collage-3.jpg" alt="Примеры вышивки" /> -->
            </div>
          </div>

          <!--
            Плавающий бейдж "10+ лет опыта"
            absolute — позиционирование поверх коллажа
            -bottom-4 -left-4 — сдвиг за пределы контейнера
          -->
          <div class="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl p-4 shadow-soft-lg">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-serif font-semibold text-secondary-900">10+ лет</p>
                <p class="text-sm text-secondary-500">опыта работы</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
      ИНДИКАТОР СКРОЛЛА
      Анимированная стрелка внизу страницы, показывает что можно скроллить

      absolute bottom-8 — внизу секции
      left-1/2 -translate-x-1/2 — центрирование по горизонтали
      animate-bounce — анимация прыгания (из Tailwind)
    -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <a href="#experience" class="text-secondary-400 hover:text-primary-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </section>
</template>
