<template>
  <b-container>
    <b-table
      :items="items"
      :fields="fields"
      :current-page="dataSource.page"
      :per-page="dataSource.limit"
      stacked="md"
      show-empty
      small
      
    >
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: field.width }"
        >
      </template>
      <template v-slot:[cell(field.key)]="data" v-for="field in fields" >
        <span :key="field.key">
          <slot :name="field.key" :item="data.item">{{data.value}}</slot>
        </span>
      </template>
    </b-table>
    <!-- <b-col sm="6" class="my-1">
      <b-pagination
        v-model="dataSource.page"
        :total-rows="totalRows"
        :per-page="dataSource.limit"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col> -->
  </b-container>
  
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ParamsRequest } from "@/model/common";
import Table from "@/service/Table";

const serviceTable = new Table();

export default Vue.extend({
  props: {
    url: {
      type: String,
    },
    columns: {
      type: [] as PropType<[]>,
    },
    dataConfig: {
      type: Object as PropType<ParamsRequest>,
      default: () => ({
        page: 1,
        limit: 10,
      })
    },
    total: {
      type: Number,
      default: 1,
    }
  },

  data() {
    return {
      dataSource: {
        page: 1,
        limit: 10,
        search: "",
        order: "asc",
        sortBy: "",
        title: "",
        filter: "",
      } as ParamsRequest,
      items: [] as any[],
      fields: [ {key:"", label:""} ] as any[],
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: '',
      filter: null,
      filterOn: [],
    }
  },
  
  created() {
    this.fetchData();
    this.fields = [...this.columns];
    this.dataSource = Object.assign({},this.dataSource, this.dataConfig);
  },
  mounted() {
    this.totalRows = this.items.length;
    
  },
  methods: {
    fetchData() {
      serviceTable.getDataByUrl(this.url, this.dataSource).then(res => {
        if(res.status == 200) {
          this.items = res.data;
        }
      }).catch(error => {
        console.log(error)
      })
    },
    cell(key: string) {
      return `cell(${key})`;
    }
  }
})
</script>
<style lang="scss">
.sr-only{display:none !important}
</style>