<template>
    <section class="users-list">
        <h2>Users List</h2>

        <el-row class="count-users-container">
            <el-col :span="6">
                <div class="sub-title">Choose cont of displayed users</div>
                <el-input
                        v-model="count_users"
                        placeholder="Find user"
                        type="number"
                        class="inline-input count-users"
                        maxlength="3"
                ></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" v-for="user in filtered_user_list" :key="user.id">
                <el-card :body-style="{ padding: '0px' }">
                    <router-link
                                 :to="`/users/${user.id}`"
                                 tag="li"
                                 role="presentation"
                                 class="user"
                    >
                        <img :src="user.avatar_url" alt="Avatar" class="image" />
                    </router-link>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import apiClient from '../api/';

    export default {
        name: 'UsersList',
        data: () => ({
            count_users: 20
        }),
        computed: {
            ...mapState('users', ['authenticated', 'users_list']),
            filtered_user_list() {
                return this.count_users ? this.users_list.slice(0, this.count_users) : this.users_list;
            }
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
<style lang="scss" scoped>
    .users-list {
        .count-users-container {
            margin-bottom: 20px;
        }

        .user {
            cursor: pointer;
            list-style: none;
        }

        .image {
            width: 100%;
            display: block;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }

        .clearfix:after {
            clear: both
        }
    }
</style>