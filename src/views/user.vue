<template>
    <section class="user-page">
        <nav>
            <router-link to="/users" replace>
                <el-button>Back to users list</el-button>
            </router-link>
        </nav>

        <div v-if="show_user_info">
            <p v-if="user.name">Name {{user.name}}</p>
            <figure>
                <img :src="user.avatar_url" :alt="user.name" />
                <figcaption v-if="user.name" class="under-img">Name: {{user.name}}</figcaption>
            </figure>
            <p><a :href="user.url" target="_blank">{{user.url}}</a></p>
            <p v-if="user.email">Email: {{user.email}}</p>
            <p v-if="user.blog">Blog: {{user.blog}}</p>
            <p v-if="user.company">Company: {{user.company}}</p>
            <p v-if="user.location">Location: {{user.location}}</p>
            <p v-if="user.bio">Bio: {{user.bio}}</p>
            <p v-if="user.twitter_username">Twitter username: {{user.twitter_username}}</p>
            <p v-if="user.type">Type of user: {{user.type}}</p>
            <p>Public repos: {{user.public_repos}}</p>
            <p>Public gists: {{user.public_gists}}</p>
            <p>Followers: {{user.followers}}</p>
            <p>Following: {{user.following}}</p>
        </div>
    </section>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import apiClient from '../api/index.js'
    export default {
        name: 'User',
        props: {
            user_id: {
                type: String,
                default: ''
            }
        },
        data: () => ({
            user: null
        }),
        computed: {
            ...mapState('users', ['authenticated']),
            show_user_info() {
                return this.user && Object.keys(this.user).length;
            }
        },
        async mounted() {
            await this.fetchUser(this.user_id);

            if(!this.authenticated) {
                this.$router.replace({name: "login"});
                this.$message({
                    showClose: true,
                    message: 'User is not authenticated, redirect to login page.',
                    type: 'error',
                    duration: 5000
                });
            }
        },
        methods: {
            async fetchUser(user_id) {
                this.user = await apiClient.getUser(user_id);
            }
        }
    }
</script>
<style lang="scss" scoped></style>