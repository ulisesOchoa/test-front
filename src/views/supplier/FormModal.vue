<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue', 'onLoadTable'])

const props = defineProps({
  modelValue: { type: [Object], default: null }
})

const isEdit = computed(() => {
  return !!props.modelValue?.id
})

const showModal = ref(false)

const onClose = () => {
  emit('update:modelValue', null)
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      showModal.value = true
    }
  }
)
</script>

<template>
  <el-dialog
    v-model="showModal"
    :title="isEdit ? 'Editar proveedor' : 'Crear proveedor'"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="onClose"
    width="40%"
    center
  >

  </el-dialog>
</template>