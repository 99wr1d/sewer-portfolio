/**
 * ЭКСПОРТ UI КОМПОНЕНТОВ
 *
 * Этот файл — "бочка" (barrel file) для экспорта всех UI компонентов.
 *
 * Зачем это нужно:
 * Вместо множества импортов:
 *   import UiButton from '~/src/shared/ui/UiButton.vue'
 *   import UiCard from '~/src/shared/ui/UiCard.vue'
 *
 * Можно писать один импорт:
 *   import { UiButton, UiCard } from '~/src/shared/ui'
 *
 * При добавлении нового UI компонента — добавь его экспорт сюда!
 */

export { default as UiButton } from './UiButton.vue'
export { default as UiCard } from './UiCard.vue'
export { default as UiContainer } from './UiContainer.vue'
export { default as UiHeading } from './UiHeading.vue'
export { default as UiIcon } from './UiIcon.vue'
export { default as UiSection } from './UiSection.vue'
