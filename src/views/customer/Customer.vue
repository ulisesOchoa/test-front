<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Delete, Plus, Edit as IconEdit } from '@element-plus/icons-vue'
import apiClient from '@/plugins/axios/axios'
import FormModal from './FormModal.vue'
import { ElMessage } from 'element-plus'

const customers = ref([])
const isLoading = ref(true)
const dataModal = ref({})

const loadData = async () => {
  try {
    const response = await apiClient.get('/customers')
    const { data } = response.data
    customers.value = data
  } catch (e) {
    ElMessage.error(e)
  } finally {
    isLoading.value = false
  }
}

const createCustomer = () => {
  dataModal.value = { 'id': null }
}

const editCustomer = async (id: number) => {
  dataModal.value = { 'id': id }
}

const deleteCustomer = async (id: number, index: number) => {
  try {
    isLoading.value = true
    await apiClient.delete(`/customers/${id}`)
    ElMessage.success('Registro eliminado correctamente')
    customers.value.splice(index, 1)
  } catch (e) {
    ElMessage.error(e)
  } finally {
    isLoading.value = false
  }
}

const onLoadTable = async () => {
  isLoading.value = true
  await loadData().then(() => {
    isLoading.value = false
  })
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <el-table
    v-loading="isLoading"
    :data="customers"
    style="width: 100%"
  >
    <el-table-column fixed="right" align="center">
      <template #header>
        <el-row justify="space-evenly" align="middle">
          <el-col :span="12">
            <el-row class="row-bg" justify="start">
              <el-text class="mx-1" size="default" tag="b">
                Listado de clientes
              </el-text>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="row-bg" justify="end">
              <el-link type="primary" @click="createCustomer">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  placement="left"
                  content="Nuevo registro"
                >
                  <el-icon :size="20">
                    <Plus />
                  </el-icon>
                </el-tooltip>
              </el-link>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <el-table-column prop="first_name" label="Nombre" />
      <el-table-column prop="last_name" label="Apellido" />
      <el-table-column prop="identity_number" label="SNI" />
      <el-table-column prop="date_of_joining" label="Fecha de alta" />
      <el-table-column prop="purchase_price" label="Precio de compra" />
      <el-table-column prop="sale_price" label="Precio de venta" />
      <el-table-column prop="profit" label="beneficio" />
      <el-table-column prop="quality" label="Calidad" />
      <el-table-column prop="supplier" label="proveedor" />
      <el-table-column align="right" width="200">
        <template #default="scope">
          <el-button
            size="small"
            @click="editCustomer(scope.row.id)"
            :icon="IconEdit"
          >
            Editar
          </el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="deleteCustomer(scope.row.id, scope.$index)"
          >
            Eliminar
          </el-button>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>

  <form-modal
    v-model="dataModal"
    @onLoadTable="onLoadTable"
  />
</template>