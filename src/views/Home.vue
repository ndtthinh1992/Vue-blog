<template>
   <b-container>
    <ListArticle
     url="/blogs"
     :total="total"
     @search="searchArticle"
    > 
    </ListArticle>
   </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ResponseArticle, RequestArticle } from "@/model/Article";
import ListArticle from "@/components/ListArticle.vue";
import dayjs from "dayjs";

export default Vue.extend({
  components: {
    ListArticle,
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
    },
    total(): number {
      return this.listArticle.length;
    }
  },
  created() {
    this.$store.dispatch("blog/getListArticles");
  },
  methods: {
    formatTime(time: string, format: string): string {
      return dayjs(time).format(format);
    },
    searchArticle(event: any){
     this.$store.dispatch("blog/searchArticles",event);
    }
  }
});
</script>
