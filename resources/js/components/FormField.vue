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
          class="flex items-center justify-center w-12 h-8 rounded-lg bg-40"
          type="button"
          @click="togglePicker"
          style="padding-right: 1px"
        >
          <span v-if="value === ''" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
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
import { EmojiButton } from '@joeattardi/emoji-button';
import { FormField, HandlesValidationErrors } from 'laravel-nova'

const picker = new EmojiButton();

export default {
  mixins: [FormField, HandlesValidationErrors],

  props: ['resourceName', 'resourceId', 'field'],

  picker: {},

  mounted() {
    picker.on('emoji', this.emojiSelected);
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

    togglePicker(event) {
      picker.togglePicker(event.srcElement);
    }
  },
}
</script>
