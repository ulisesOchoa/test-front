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
            <el-row justify="start">
              <el-text size="large" tag="b">
                Listado de asignaciones
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
      <el-table-column prop="client_name" label="Nombre del cliente" />
      <el-table-column prop="gas_quality_anme" label="Calidad" />
      <el-table-column prop="purchase_price" label="Precio de compra" />
      <el-table-column prop="sale_price" label="Precio de venta" />
      <el-table-column prop="profit" label="Beneficio" />
    </el-table-column>
  </el-table>
</template>