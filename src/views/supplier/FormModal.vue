<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import apiClient from '@/plugins/axios/axios'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['update:modelValue', 'onLoadTable'])

const props = defineProps({
  modelValue: { type: [Object, null], default: null }
})

const isEdit = computed(() => {
  return !!props.modelValue?.id
})

const isLoading = ref(false)
const showModal = ref(false)

const schema = yup.object({
  companyName: yup.string().required('Company Name is required'),
  country: yup.string().required('Country is required'),
  cif: yup.string().required('CIF is required'),
  registrationDate: yup.date().required('Registration Date is required')
})

const { defineField, handleSubmit, isSubmitting, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    companyName: '',
    country: '',
    cif: '',
    registrationDate: null
  }
})

const elPlusConfig = (state) => ({
  props: {
    validateEvent: false,
    error: state.errors[0],
    required: state.required
  }
})

const [companyName, companyNameProps] = defineField('companyName', elPlusConfig)
const [country, countryProps] = defineField('country', elPlusConfig)
const [cif, cifProps] = defineField('cif', elPlusConfig)
const [registrationDate, registrationDateProps] = defineField('registrationDate', elPlusConfig)

const onClose = () => {
  resetForm()
  emit('update:modelValue', null)
}

const onSubmit = handleSubmit(async (values) => {
  const pathRoute = isEdit.value
    ? `/suppliers/${props.modelValue?.id}`
    : '/suppliers'
  const method = isEdit.value ? 'PUT' : 'POST'

  try {
    isLoading.value = true

    await apiClient({
      method: method,
      url: pathRoute,
      data: {
        company_name: values.companyName,
        country: values.country,
        cif: values.cif,
        registration_date: values.registrationDate
      }
    })

    ElMessage.success(`Resgistro ${isEdit.value ? 'Actualizado' : 'Creado'} correctamente`)
    showModal.value = false
    resetForm()
    emit('onLoadTable')
  } catch (e) {
    const { data } = e?.response
    console.log(e)
    ElMessage.error(data.message)
  } finally {
    isLoading.value = false
  }
})

const getSupplier = async (id: number) => {
  try {
    isLoading.value = true
    const response = await apiClient.get(`/suppliers/${id}`)
    const { data } = response.data
    setFieldValue('companyName', data.company_name)
    setFieldValue('country', data.country)
    setFieldValue('cif', data.cif)
    setFieldValue('registrationDate', data.registration_date)
  } catch (e) {
    ElMessage.error(e)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (!value) return

    if (value?.id) {
      getSupplier(value.id)
    }
    showModal.value = true
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
    <el-form
      v-loading="isLoading"
      label-width="auto"
      label-position="top"
      @submit.prevent="onSubmit"
    >
      <el-form-item label="Nombre empresa" v-bind="companyNameProps">
        <el-input v-model="companyName"></el-input>
      </el-form-item>

      <el-form-item label="País" v-bind="countryProps">
        <el-input v-model="country"></el-input>
      </el-form-item>

      <el-form-item label="CIF" v-bind="cifProps">
        <el-input v-model="cif"></el-input>
      </el-form-item>

      <el-form-item label="Fecha de alta" v-bind="registrationDateProps">
        <el-date-picker
          v-model="registrationDate"
          type="date"
          placeholder="Select date"
          format="YYYY/MM/DD"
          value-format="YYYY/MM/DD"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="isSubmitting"
          type="primary"
          native-type="submit"
        >
          Crear
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>