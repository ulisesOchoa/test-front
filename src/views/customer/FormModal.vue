<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import apiClient from '@/plugins/axios/axios'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['update:modelValue', 'onLoadTable'])

const props = defineProps({
  modelValue: { type: [Object], default: {} }
})

const isEdit = computed(() => {
  return !!props.modelValue?.id
})

const isLoading = ref(false)
const showModal = ref(false)
const qualities = ref([])
const suppliers = ref([])

const schema = yup.object({
  name: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
  dni: yup.string().required('CIF is required'),
  registrationDate: yup.date().required('Registration Date is required'),
  purchasePrice: yup.number().required('Purchase Price is required'),
  salePrice: yup.number().required('Sale Price is required'),
  profit: yup.number().required('Profit is required'),
  qualityId: yup.string().required('Gas Quality is required')
})

const { defineField, handleSubmit, isSubmitting, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    id: null,
    name: '',
    lastName: '',
    dni: '',
    registrationDate: null,
    purchasePrice: null,
    salePrice: null,
    profit: null,
    qualityId: ''
  }
})

const elPlusConfig = (state) => ({
  props: {
    validateEvent: false,
    error: state.errors[0],
    required: state.required
  }
})

const [name, nameProps] = defineField('name', elPlusConfig)
const [country, countryProps] = defineField('lastName', elPlusConfig)
const [cif, cifProps] = defineField('dni', elPlusConfig)
const [registrationDate, registrationDateProps] = defineField('registrationDate', elPlusConfig)
const [purchasePrice, purchasePriceProps] = defineField('purchasePrice', elPlusConfig)
const [salePrice, salePriceProps] = defineField('salePrice', elPlusConfig)
const [profit, profitProps] = defineField('profit', elPlusConfig)
const [qualityId, qualityIdProps] = defineField('qualityId', elPlusConfig)

const onClose = () => {
  resetForm()
  emit('update:modelValue', null)
}

const onSubmit = handleSubmit(async (values) => {
  const pathRoute = isEdit.value
    ? `/customers/${props.modelValue?.id}`
    : '/customers'
  const method = isEdit.value ? 'PUT' : 'POST'

  try {
    isLoading.value = true

    await apiClient({
      method: method,
      url: pathRoute,
      data: {
        id: values?.id ?? null ,
        first_name: values.name,
        last_name: values.lastName,
        identity_number: values.dni,
        date_of_joining: values.registrationDate,
        purchase_price: values.purchasePrice,
        sale_price: values.salePrice,
        profit: values.profit,
        quality_id: values.qualityId
      }
    })

    ElMessage.success(`Registro ${isEdit.value ? 'Actualizado' : 'Creado'} correctamente`)
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

const getCustomer = async (id: number) => {
  try {
    isLoading.value = true
    const response = await apiClient.get(`/customers/${id}`)
    const { data } = response.data
    setFieldValue('id', data.id)
    setFieldValue('name', data.first_name)
    setFieldValue('lastName', data.last_name)
    setFieldValue('dni', data.identity_number)
    setFieldValue('registrationDate', data.date_of_joining)
    setFieldValue('purchasePrice', data.purchase_price)
    setFieldValue('salePrice', data.sale_price)
    setFieldValue('profit', data.profit)
    setFieldValue('qualityId', data.quality_id)
  } catch (e) {
    ElMessage.error(e)
  } finally {
    isLoading.value = false
  }
}

const loadInitData = async () => {
  try {
    isLoading.value = true
    const response = await apiClient.get('/customers/initform')
    const { qualities: qualitiesData, suppliers: suppliersData } = response.data

    qualities.value = qualitiesData
    suppliers.value = suppliersData

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
      getCustomer(value.id)
    }
    showModal.value = true
    loadInitData()
  }
)
</script>

<template>
  <el-dialog
    v-model="showModal"
    :title="isEdit ? 'Editar cliente' : 'Crear cliente'"
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
      <el-form-item label="Nombre" v-bind="nameProps">
        <el-input v-model="name"></el-input>
      </el-form-item>

      <el-form-item label="Apellido" v-bind="countryProps">
        <el-input v-model="country"></el-input>
      </el-form-item>

      <el-form-item label="DNI" v-bind="cifProps">
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

      <el-form-item label="Precio de Compra" v-bind="purchasePriceProps">
        <el-input-number v-model="purchasePrice" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="Precio de Venta" v-bind="salePriceProps">
        <el-input-number v-model="salePrice" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="Beneficio" v-bind="profitProps">
        <el-input-number v-model="profit" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="Calidad de Gas" v-bind="qualityIdProps">
        <el-select v-model="qualityId" placeholder="Seleccione la calidad de gas">
          <el-option
            v-for="item in qualities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
