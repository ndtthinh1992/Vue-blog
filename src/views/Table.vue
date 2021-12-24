<template>
  <div class="home">
   <Table
    :columns="columns"
    :dataConfig="dataConfig"
    :url="apiUrl"
   > 
    <template #actions="data">
      <b-button size="sm" @click="onEdit(data.item)">
        Edit
      </b-button>
    </template>
    <template #image="data">
      <b-img width="64" :src="data.item.image" :alt="data.item.title"></b-img>
    </template>
    <template #createdAt="data">
      {{formatTime(data.item.createdAt, 'MM/DD/YYYY hh:mm A')}}
    </template>
   </Table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ResponseArticle, RequestArticle } from "@/model/Article";
import Table from "@/components/Table.vue";
import dayjs from "dayjs";

export default Vue.extend({
  components: {
    Table,
  },
  data() {
    return {
      apiUrl: '/blogs',
      columns: [
        { label: "Id", key: "id",  sortable: true, width: "5%" },
        { label: "Title" , key: "title", sortable: true, width: "20%" },
        { label: "Image", key: "image", sortable: true, width: "20%" },
        { label: "Content", key: "content", sortable: true, width: "20%" },
        { label: "Create At" , key: "createdAt", sortable: true, width: "15%"} ,
        { label: "Action" , key: "actions" }
      ],
      dataConfig: {
        page: 1,
        limit: 10,
        search: "",
        order: "asc",
        sortBy: "",
        title: "",
        filter: "",
      },
    };
  },
  mounted() {
    this.$store.dispatch("blog/getDetailById", "130");
  },
  computed: {
    detailArticle(): ResponseArticle {
      return this.$store.getters["blog/getArticle"];
    },
    listArticle(): ResponseArticle[] {
      return this.$store.getters["blog/getListArticle"];
    }
  },
  methods: {
    onEdit(data: ResponseArticle ): void {
      console.log(data.id)
    },
    formatTime(time: string, format: string): string {
      console.log(time,format)
      return dayjs(time).format(format);
    },
  }
});
</script>
