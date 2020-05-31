<template>
    <section class="users-list">
        <ul class="nav nav-tabs">
            <router-link v-for="user in users_list" :key="user.id"
                         :to="`/users/${user.id}`"
                         tag="li"
                         role="presentation"
            >
                <a>
                    <figure>
                        <img :src="user.avatar_url" alt="Avatar" />
                        <figcaption class="under-img">{{user.url}}</figcaption>
                    </figure>
                </a>
            </router-link>
        </ul>
    </section>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import apiClient from '../api/';

    export default {
        name: 'UsersList',

        computed: {
            ...mapState('users', ['authenticated', 'users_list'])
        },
        async created() {
            await this.fetchUsersList();

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
            ...mapActions('users', ['fetchUsersList'])
        }
    }
</script>
<style lang="scss" scoped></style>