<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import apiClient from '@/plugins/axios/axios'
import { ElMessage } from 'element-plus'

const isLoading = ref(true)
const qualities = ref([])

const loadData = async () => {
  try {
    const response = await apiClient.get('/qualities')
    const { data } = response.data
    qualities.value = data
  } catch (e) {
    ElMessage.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <el-table
    v-loading="isLoading"
    :data="qualities"
    style="width: 100%"
  >
    <el-table-column fixed="right" align="center">
      <template #header>
        <el-row justify="space-evenly" align="middle">
          <el-col :span="12">
            <el-row class="row-bg" justify="start">
              <el-text class="mx-1" size="default" tag="b">
                Listado de calidades de Gas
              </el-text>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="row-bg" justify="end">
              <el-link type="primary">
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
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="price" label="Precio" />
      <el-table-column prop="company_name" label="Proveedor" />
    </el-table-column>
  </el-table>
</template>