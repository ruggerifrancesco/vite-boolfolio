<template>
    <section class="projects-index">
        <!-- Pagination Buttons -->
        <div class="pagination-buttons mb-3 d-flex gap-2">
            <button @click="changePage('prev')" :disabled="!prevPageUrl" class="btn btn-primary">Previous</button>
            <button @click="changePage('next')" :disabled="!nextPageUrl" class="btn btn-success">Next</button>
        </div>

        <section class="projects-wrapper">
            <div class="card" v-for="project in projects">
                <img v-if="project.image.startsWith('http')" :src="project.image" :alt="project.title">
                <img v-else :src="'http://127.0.0.1:8000/storage/' + project.image" :alt="project.title">
                <div class="card-body">
                  <h5 class="card-title">{{ project.title }}</h5>
                  <p class="card-text">
                    {{ project.description }}
                  </p>
                  <a href="#" class="btn btn-primary">Show More</a>
                </div>
            </div>
        </section>
    </section>
</template>
<script>

import axios from 'axios';

export default {
    name: 'ProjectsIndex',
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

.projects-index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1900px;
}

.projects-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
    .card {
        background-color: white;
        color: black;
        width: calc((100% / 5) - 0.6rem);
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        margin-left: 0.6rem;
        overflow: hidden;

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