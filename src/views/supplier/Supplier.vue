<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus, Edit as IconEdit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import apiClient from '@/plugins/axios/axios'
import FormModal from '@/views/supplier/FormModal.vue'

const suppliers = ref([])
const isLoading = ref(true)
const dataModal = ref({})

const loadData = async () => {
  try {
    const response = await apiClient.get('/suppliers')
    const { data } = response.data
    suppliers.value = data
  } catch (e) {
    ElMessage.error(e)
  } finally {
    isLoading.value = false
  }
}

const createSupplier = () => {
  dataModal.value = { 'id': null }
}

const editSupplier = async (id: number) => {
  dataModal.value = { 'id': id }
}

const deleteSupplier = async (id: number, index: number) => {
  try {
    isLoading.value = true
    await apiClient.delete(`/suppliers/${id}`)
    ElMessage.success('Registro eliminado correctamente')
    suppliers.value.splice(index, 1)
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
    :data="suppliers"
    style="width: 100%"
  >
    <el-table-column fixed="right" align="center">
      <template #header>
        <el-row justify="space-evenly" align="middle">
          <el-col :span="12">
            <el-row justify="start">
              <el-text size="large" tag="b">
                Listado de proveedores
              </el-text>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="row-bg" justify="end">
              <el-link type="primary" @click="createSupplier">
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
      <el-table-column prop="company_name" label="Nombre empresa" />
      <el-table-column prop="country" label="País" />
      <el-table-column prop="cif" label="CIF" />
      <el-table-column prop="registration_date" label="Fecha de alta" />
      <el-table-column align="right" width="200">
        <template #default="scope">
          <el-button
            size="small"
            @click="editSupplier(scope.row.id)"
            :icon="IconEdit"
          >
            Editar
          </el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="deleteSupplier(scope.row.id, scope.$index)"
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