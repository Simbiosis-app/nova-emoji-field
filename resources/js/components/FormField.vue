<template>
  <DefaultField
      :field="field"
      :errors="errors"
      :show-help-text="showHelpText"
      :full-width-content="fullWidthContent"
  >
    <template #field>
      <div class="flex items-end">
        <button
          class="flex items-center justify-center w-12 h-8 rounded-lg bg-40 border-2 border-dashed mr-2"
          type="button"
          ref="button"
          @click="togglePicker"
          style="padding-right: 1px"
        >
          <span v-if="value === ''" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-80">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </span>

          <span v-else>
            {{ value }}
          </span>
        </button>

        <button class="pl-3 text-xs hover:text-danger focus:outline-none" type="button" @click="value = ''">Remove</button>
      </div>
    </template>
  </DefaultField>
</template>

<script>
import { createPopup } from '@picmo/popup-picker'
import { FormField, HandlesValidationErrors } from 'laravel-nova'
import { autoTheme } from 'picmo';

export default {
  mixins: [FormField, HandlesValidationErrors],

  props: ['resourceName', 'resourceId', 'field'],

  popupPicker: {},

  mounted() {
    this.popupPicker = createPopup({
      autofocus: 'auto',
      theme: autoTheme,
    }, {
      referenceElement: this.$refs.button,
      triggerElement: this.$refs.button,
    });

    this.popupPicker.picker.addEventListener('emoji:select', this.emojiSelected)
  },

  methods: {
    /*
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
      this.value = this.field.value || ''
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      formData.append(this.field.attribute, this.value || '')
    },

    emojiSelected(event) {
      this.value = event.emoji;
    },

    togglePicker() {
      this.popupPicker.toggle()
    },
  },
}
</script>
