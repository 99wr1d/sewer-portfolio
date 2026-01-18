# Руководство для Claude Code — Проект Leysan Atelier

## О проекте

Это landing page для ателье вышивки на текстиле (полотенца, халаты). Сайт на русском языке, клиенты из Казахстана и России.

**Стек:** Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS + VueUse

## Критически важные правила

### 1. НИКОГДА не пиши код без исследования

Перед ЛЮБЫМ изменением:
1. Прочитай существующие файлы в затрагиваемой области
2. Изучи похожие компоненты/функции в проекте
3. Пойми используемые паттерны
4. Если что-то неясно — **СПРОСИ**, не угадывай

### 2. НИКОГДА не угадывай

- Не знаешь где находится файл — спроси или найди
- Не понимаешь бизнес-логику — спроси
- Не уверен в дизайне — спроси
- Сомневаешься в подходе — спроси

**Лучше задать 5 вопросов, чем сделать неправильно.**

### 3. Если не можешь — скажи прямо

Если задача невыполнима в рамках проекта или твоих возможностей — скажи: "Я не могу это сделать потому что [причина]". Не пытайся обойти ограничения хаками.

---

## Структура проекта

```
src/
├── app/                    # Конфигурация приложения
│   ├── layouts/           # Layouts (если нужны)
│   └── styles/            # Глобальные стили приложения
│
├── shared/                 # Переиспользуемый код
│   ├── ui/                # UI-компоненты (UiButton, UiCard, etc.)
│   ├── config/            # КОНТЕНТ САЙТА — site.ts
│   ├── types/             # TypeScript интерфейсы
│   ├── lib/               # Утилиты
│   └── assets/            # Иконки и изображения
│
├── entities/              # Бизнес-сущности (Product, etc.)
│   └── product/
│       ├── model/         # Типы и логика сущности
│       └── ui/            # Компоненты сущности
│
├── features/              # Фичи (пока пусто)
│
├── widgets/               # Секции страницы
│   ├── header/            # TheHeader.vue
│   ├── hero/              # HeroSection.vue
│   ├── experience/        # ExperienceSection.vue
│   ├── catalog/           # CatalogSection.vue
│   ├── personalization/   # PersonalizationSection.vue
│   ├── care-tips/         # CareTipsSection.vue
│   ├── delivery/          # DeliverySection.vue
│   ├── contacts/          # ContactsSection.vue
│   └── footer/            # TheFooter.vue
│
└── pages/                  # Страницы (роуты)
    └── home/
```

---

## Где менять контент сайта

**Весь контент в одном файле:** `src/shared/config/site.ts`

| Что изменить | Где искать |
|--------------|------------|
| Название, описание сайта | `siteConfig` |
| Навигация | `navigation[]` |
| Контакты (WhatsApp, Telegram, телефон) | `contacts` |
| Товары в каталоге | `products[]` |
| Преимущества/опыт | `experienceFeatures[]` |
| Шаги персонализации | `personalizationSteps[]` |
| Советы по уходу | `careTips[]` |
| Зоны доставки | `deliveryZones[]` |

**Типы данных:** `src/shared/types/index.ts`

---

## Соглашения по коду

### Именование файлов

| Тип | Паттерн | Пример |
|-----|---------|--------|
| UI-компоненты | `Ui*.vue` | `UiButton.vue`, `UiCard.vue` |
| Секции страницы | `*Section.vue` | `HeroSection.vue` |
| Layout-компоненты | `The*.vue` | `TheHeader.vue`, `TheFooter.vue` |
| Папки | kebab-case | `care-tips/`, `hero/` |
| Конфиги/утилиты | camelCase.ts | `site.ts`, `index.ts` |

### Структура компонента

```vue
<script setup lang="ts">
// 1. Импорты
import { ref, computed } from 'vue'
import { UiButton, UiCard } from '~/src/shared/ui'
import { products } from '~/src/shared/config'

// 2. Типы (интерфейсы)
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

// 3. Props с дефолтами
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

// 4. Реактивные данные
const isOpen = ref(false)

// 5. Computed
const classes = computed(() => ({
  'btn-primary': props.variant === 'primary',
}))

// 6. Методы
const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <!-- Tailwind классы, без scoped CSS -->
</template>
```

### Стилизация

**Только Tailwind CSS utility-классы.** Без `<style scoped>`, без CSS-модулей.

Глобальные компонентные классы определены в `assets/css/main.css`:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.card`, `.card-warm`, `.card-bordered`
- `.section`, `.section-warm`, `.section-gradient`
- `.container-narrow`, `.container-wide`
- `.heading-display`, `.heading-section`, `.heading-card`

**Кастомные цвета из tailwind.config.ts:**
- `primary-*` — основной цвет (коричневый)
- `secondary-*` — акцентный
- `cream-*` — кремовый фон
- `warm-*` — теплые оттенки

### Иконки

Иконки встроены в `UiIcon.vue` как SVG paths.

Доступные иконки: `whatsapp`, `telegram`, `phone`, `location`, `washing`, `drying`, `ironing`, `storage`, `check`, `arrow`, `star`, `heart`, `gift`, `truck`, `menu`, `close`

Добавить новую иконку:
1. Открой `src/shared/ui/UiIcon.vue`
2. Добавь SVG path в объект `icons`
3. Добавь название в тип `name`

---

## Как добавлять новые элементы

### Новый товар в каталог

1. Добавь изображение в `public/images/products/`
2. Добавь объект в массив `products` в `src/shared/config/site.ts`:

```typescript
{
  id: 5,
  name: 'Название',
  description: 'Описание',
  category: 'towel', // или 'bathrobe'
  image: '/images/products/new-product.jpg',
  features: ['Особенность 1', 'Особенность 2'],
}
```

### Новая секция на странице

1. Создай папку `src/widgets/new-section/`
2. Создай `NewSection.vue` по образцу существующих секций
3. Создай `index.ts` с экспортом:
   ```typescript
   export { default as NewSection } from './NewSection.vue'
   ```
4. Импортируй и добавь в `app.vue`

### Новый UI-компонент

1. Создай `src/shared/ui/UiNewComponent.vue`
2. Следуй паттерну: Props с типами, computed для классов, Tailwind стили
3. Экспортируй в `src/shared/ui/index.ts`

---

## Чеклист перед написанием кода

- [ ] Прочитал существующие компоненты в этой области?
- [ ] Понял используемые паттерны?
- [ ] Проверил типы в `src/shared/types/`?
- [ ] Проверил существующие UI-компоненты — может, уже есть нужный?
- [ ] Проверил Tailwind конфиг на кастомные классы?
- [ ] Если добавляю данные — знаю структуру в `site.ts`?
- [ ] Если что-то неясно — **задал вопрос пользователю**?

---

## Комментарии для обучения

Владелец проекта — новичок в программировании. При написании кода **всегда добавляй обучающие комментарии**:

1. **В начале файла** — объясни назначение файла (1-3 строки)
2. **Перед сложными блоками** — объясни что делает код и зачем
3. **При использовании паттернов** — объясни паттерн (computed, ref, props и т.д.)
4. **При Tailwind классах** — кратко объясни что делают группы классов (не каждый)

### Пример комментариев в компоненте:

```vue
<script setup lang="ts">
/**
 * UiButton — универсальная кнопка/ссылка
 * Используется по всему сайту для интерактивных элементов
 */

// Импортируем функции Vue для реактивности
import { computed } from 'vue'

// Интерфейс Props — описывает какие параметры принимает компонент
interface Props {
  variant?: 'primary' | 'secondary'  // Стиль кнопки
  size?: 'sm' | 'md' | 'lg'          // Размер кнопки
}

// withDefaults — устанавливает значения по умолчанию для props
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

// computed — вычисляемое свойство, пересчитывается при изменении props
const classes = computed(() => [
  'базовые-классы',
  props.variant === 'primary' && 'классы-для-primary',
])
</script>
```

### Стиль комментариев:

- Пиши на **русском языке**
- Объясняй **зачем**, а не только **что**
- Не перегружай — комментируй смысловые блоки, не каждую строку
- Используй `/** */` для блочных описаний, `//` для однострочных

---

## Чего НЕ делать

- Не создавать `<style scoped>` — только Tailwind
- Не хардкодить контент в компонентах — выноси в `site.ts`
- Не добавлять state-менеджмент без явной необходимости
- Не угадывать дизайн — спрашивай
- Не писать код без понимания контекста
- Не игнорировать TypeScript — всегда типизируй props
- Не добавлять новые зависимости без согласования
- Не забывать добавлять обучающие комментарии

---

## FAQ

**Q: Где менять телефон/WhatsApp?**
A: `src/shared/config/site.ts` → объект `contacts`

**Q: Как добавить новую страницу?**
A: Создай папку в `src/pages/`, Nuxt автоматически создаст роут

**Q: Где хранятся изображения?**
A: `public/images/` — доступны по пути `/images/...`

**Q: Как добавить новый цвет?**
A: `tailwind.config.ts` → `theme.extend.colors`

**Q: Как добавить новую иконку?**
A: `src/shared/ui/UiIcon.vue` → объект `icons`
