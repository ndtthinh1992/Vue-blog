<template>
    <section>
        <section class="d-flex mb-1">
            <b-form-input v-model="dataSource.search" class="mb-1 mr-2" style="width: 300px" placeholder="Search" type="text" debounce="500"></b-form-input>
            <b-form-select class=" mr-2" style="width: 150px"
                :options="optionsSortBy"
                v-model="dataSource.sortBy"
            ></b-form-select>
            <b-form-select class=" mr-2" style="width: 150px"
                :options="order"
                v-model="dataSource.order"
            ></b-form-select>
            <b-button class="px-2 align-items-end" size="sm" @click="onAdd()">
                Add Article
            </b-button>
        </section>
        <b-card class="overflow-auto" style="height: 80vh">
            <template v-for="item in items">
                <b-media class="d-flex mb-2" :key="item.id" >
                    <template #aside>
                        <b-img blank blank-color="#ccc" :src="item.image" width="64" :alt="item.title">
                        </b-img>
                    </template>
                    <h5 class="text-left mb-1">{{item.title}}</h5>
                    <p class="text-left mb-0">
                        {{formatTime(item.createdAt, 'MM/DD/YYYY hh:mm A')}}
                    </p>
                    <p class="text-left mb-0">
                        {{item.content}}
                    </p>
                    <section class="d-flex">
                        <b-button class="px-2 mr-1" size="sm" @click="onEdit(item)">
                            Edit
                        </b-button>
                        <b-button class="px-2" size="sm" @click="onView(item)">
                            View
                        </b-button>
                    </section>
                </b-media>
            </template>
        </b-card>
        <b-col sm="6" class="m-1 d-flex">
            <b-pagination
            v-model="dataSource.page"
            :total-rows="total"
            :per-page="dataSource.limit"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
            ></b-pagination>
            <b-form-select class="mb-1 ml-2" style="width: 150px"
                :options="limits"
                v-model="dataSource.limit"
            ></b-form-select>
        </b-col>
        
        <b-modal id="modal-view" title="Detail Article">
            <b-media class="d-flex mb-2" >
                    <template #aside>
                        <b-img blank blank-color="#ccc" :src="detail.image" width="64" :alt="detail.title"></b-img>
                    </template>
                    <h5 class="text-left mb-1">{{detail.title}}</h5>
                    <p class="text-left mb-0">
                        {{formatTime(detail.createdAt, 'MM/DD/YYYY hh:mm A')}}
                    </p>
                    <p class="text-left mb-0">
                        {{detail.content}}
                    </p>
                </b-media>
        </b-modal>
        <b-modal id="modal-edit" title="Edit Article" @ok="handleSubmit">
            <label for="Title"> Title</label>
            <b-form-input 
                v-model="form.title"
                id="Title"
                class="mb-1" 
                style="width: 300px" 
                placeholder="Title" 
                type="text">
            </b-form-input>
            <label for="Content"> Content</label>
            <b-form-textarea
                v-model="form.content"
                id="Content"
                placeholder="Content"
                rows="3"
            ></b-form-textarea>
        </b-modal>
        <b-modal id="modal-add" title="Edit Article" @ok="handleSubmit">
            <label for="Title"> Title</label>
            <b-form-input 
                v-model="form.title"
                id="Title"
                class="mb-1" 
                style="width: 300px" 
                placeholder="Title" 
                type="text">
            </b-form-input>
            <label for="Content"> Content</label>
            <b-form-textarea
                v-model="form.content"
                id="Content"
                placeholder="Content"
                rows="3"
            ></b-form-textarea>
        </b-modal>
    </section>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import Table from "@/service/Table";
import Blog from "@/service/Blog"
import { ParamsRequest } from "@/model/common";
import { ResponseArticle, RequestArticle } from "@/model/Article";
import dayjs from "dayjs";

const serviceTable = new Table();
const serviceBlog = new Blog();

export default Vue.extend({
    props: {
        url: {
            type: String,
        },
        total: {
            type: Number,
            default: 50,
        }
    },
    data() {
        return {
            dataSource: {
                page: 1,
                limit: 10,
                order: "asc",
                sortBy: "",
                search: "",
            } as ParamsRequest,
            items: [] as any[],
            detail: {} as ResponseArticle,
            form: {} as RequestArticle,
            optionsSortBy: [ 
                { text: 'sort by...', value: "" }, 
            ],
            order: [
                { text: 'asc', value: "asc" },
                { text: 'desc', value: "desc" }
            ],
            limits: [
                {text: "10", value: 10 },
                {text: "20", value: 20 },
                {text: "50", value: 50 },
                {text: "100", value: 100 },
            ],
            id: ""
        }
    },
    async created () {
        await this.fetchData();
        this.optionsSortBy = [
            ...this.optionsSortBy,
            ...Object.keys(this.items[0]).map(c=> {
                let obj = {text: c, value:c};
                return obj;
            })
        ];
    },
    methods: {
        async fetchData() {
            return await serviceTable.getDataByUrl(this.url, this.dataSource).then(res => {
                if(res.status == 200) {
                    this.items = res.data;
                }
            }).catch(error => {
                console.log(error)
            })
        },
        formatTime(time: string, format: string): string {
            return dayjs(time).format(format);
        },
        onView(data: ResponseArticle ): void {
            this.detail = Object.assign({}, data);
            this.$bvModal.show('modal-view')
        },
        onEdit(data: ResponseArticle ): void {
            this.id = data.id
            this.form = Object.assign({}, data);
            this.$bvModal.show('modal-edit')
        },
        handleSubmit() {
            if (this.form.title && this.form.content){
                if (this.id) {
                    serviceBlog.editArticle(this.id, this.form).then(res => {
                        if(res.status == 200) this.fetchData();
                        this.id = "";
                    }).catch(err => {
                        console.error(err);
                    })
                }else {
                    serviceBlog.addArticle(this.form).then(res => {
                        if(res.status == 201) this.fetchData();
                    }).catch(err => {
                        console.error(err);
                    })
                }
            }
        },
        onAdd() {
            this.$bvModal.show('modal-add');
        }
    },
    watch: {
    "dataSource.page"() {
      this.fetchData();
    },
    "dataSource.limit"() {
      this.fetchData();
    },
    "dataSource.search"(value) {
        this.$emit("search", value);
        this.fetchData();
    },
    "dataSource.sortBy"(value) {
        this.fetchData();
    },
    "dataSource.order"() {
        this.fetchData();
    }
  },
})
</script>