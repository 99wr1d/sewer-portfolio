/**
 * ТИПЫ ДАННЫХ ПРОЕКТА
 *
 * Этот файл содержит TypeScript интерфейсы — "контракты" данных.
 * Интерфейс описывает какие поля должен иметь объект и какого они типа.
 *
 * Зачем это нужно:
 * 1. Автодополнение в редакторе — показывает какие поля доступны
 * 2. Проверка ошибок — TypeScript предупредит если забыл поле или указал неверный тип
 * 3. Документация — сразу видно структуру данных
 */

/**
 * Product — товар в каталоге (полотенце или халат)
 *
 * Используется в: src/shared/config/site.ts (массив products)
 * Отображается в: CatalogSection
 */
export interface Product {
  id: string                          // Уникальный идентификатор товара
  name: string                        // Название товара
  description: string                 // Описание товара
  category: 'towel' | 'bathrobe'      // Категория: towel=полотенце, bathrobe=халат
  image: string                       // Путь к изображению (например: /images/products/towel-1.jpg)
  features?: string[]                 // Особенности товара (необязательное поле, знак ?)
}

/**
 * NavItem — пункт навигации (ссылка в меню)
 *
 * Используется в: src/shared/config/site.ts (массив navigation)
 * Отображается в: TheHeader, TheFooter
 */
export interface NavItem {
  label: string   // Текст ссылки (что видит пользователь)
  href: string    // URL ссылки (куда ведёт, например: #catalog)
}

/**
 * ContactInfo — контактная информация
 *
 * Используется в: src/shared/config/site.ts (объект contacts)
 * Отображается в: HeroSection, ContactsSection, TheFooter
 *
 * Знак ? после имени поля означает что поле необязательное
 */
export interface ContactInfo {
  whatsapp?: string   // Номер WhatsApp (формат: +77001234567)
  telegram?: string   // Username в Telegram (формат: @username)
  phone?: string      // Номер телефона для звонков
  email?: string      // Email адрес
  address?: string    // Полный адрес
  city?: string       // Город
}

/**
 * DeliveryZone — зона доставки
 *
 * Используется в: src/shared/config/site.ts (массив deliveryZones)
 * Отображается в: DeliverySection
 */
export interface DeliveryZone {
  name: string         // Название зоны (например: "Алматы", "Казахстан")
  description: string  // Описание условий доставки
  duration: string     // Сроки доставки (например: "1-2 дня")
}

/**
 * CareTip — совет по уходу за изделием
 *
 * Используется в: src/shared/config/site.ts (массив careTips)
 * Отображается в: CareTipsSection
 */
export interface CareTip {
  title: string       // Заголовок (например: "Стирка")
  description: string // Подробное описание
  icon: string        // Название иконки из UiIcon (например: "washing")
}

/**
 * Feature — универсальный блок "заголовок + описание"
 *
 * Используется для разных секций: experienceFeatures, personalizationSteps
 * Отображается в: ExperienceSection, PersonalizationSection
 */
export interface Feature {
  title: string        // Заголовок блока
  description: string  // Описание
  icon?: string        // Иконка (необязательно)
}
