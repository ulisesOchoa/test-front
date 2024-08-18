<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import apiClient from '@/plugins/axios/axios'


const customer = ref([]);

const loadData = async () => {
  const response = await apiClient.get('/customers')
  console.log(response);


};

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

onMounted(() => {
  loadData()
});
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
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
      <el-table-column prop="first_name" label="Nombre" />
      <el-table-column prop="last_name" label="Apellido" />
      <el-table-column prop="identification" label="SNI" />
      <el-table-column prop="date" label="Fecha de alta" />
      <el-table-column prop="identification" label="Precio de compra" />
      <el-table-column prop="identification" label="Precio de venta" />
      <el-table-column prop="identification" label="beneficio" />
      <el-table-column prop="identification" label="proveedor" />
      <el-table-column prop="identification" label="Calidad" />
    </el-table-column>
  </el-table>
</template>