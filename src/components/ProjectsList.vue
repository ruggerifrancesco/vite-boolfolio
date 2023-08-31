<template>
    <!-- Pagination Buttons -->
    <div class="pagination-buttons">
        <button @click="changePage('prev')" :disabled="!prevPageUrl">Previous</button>
        <button @click="changePage('next')" :disabled="!nextPageUrl">Next</button>
    </div>

    <main>
        <div class="card" v-for="project in projects">
            <img :src="project.image" class="card-img-top" :alt="project.title">
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">
                {{ project.description }}
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </main>
</template>
<script>

import axios from 'axios';

export default {
    name: 'AppMain',
    data() {
        return {
            projects : [],
            apiUrl : 'http://127.0.0.1:8000/api/projects',
            nextPageUrl: null,
            prevPageUrl: null
        }
    },
    methods: {
        getProjects(url = null){
            const apiUrl = url || this.apiUrl;

            // recuper i miei post e popolo la variabile posts
            axios.get(apiUrl, {
                params: {}
            })
            .then((response) => {
                console.log(response.data.results.data)
                this.projects = response.data.results.data;
                this.nextPageUrl = response.data.results.next_page_url;
                this.prevPageUrl = response.data.results.prev_page_url;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        changePage(direction) {
            let url = null;

            if (direction === 'next') {
                url = this.nextPageUrl;
            } else if (direction === 'prev') {
                url = this.prevPageUrl;
            }

            if (url) {
                this.getProjects(url);
            }
        }
    },
    created(){
        this.getProjects();
    }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
    .card {
        background-color: white;
        color: black;
        width: calc((100% / 3) - 1rem);
        border-radius: 2rem;
        margin-bottom: 1rem;
        margin-left: 1rem;

        img {
            object-fit: contain;
            width: 100%;
        }

        .card-text {
            height: 10rem;
            overflow-y: scroll;
        }
    }
</style>