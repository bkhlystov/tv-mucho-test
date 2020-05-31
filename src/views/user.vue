<template>
    <section class="user-page">
        <nav class="prev-page">
            <router-link to="/users" replace>
                <el-button icon="el-icon-arrow-left">Previous Page</el-button>
            </router-link>
        </nav>

        <el-row v-if="show_user_info">
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }" class="card">
                    <p v-if="user.name" class="name">
                        <span class="bold">{{user.name}}</span>
                    </p>
                    <img :src="user.avatar_url" :alt="user.name" class="image">
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <p v-if="user.email">
                                <span class="bold">Email:</span>
                                {{user.email}}
                            </p>
                            <p v-if="user.blog">
                                <span class="bold">Blog:</span>
                                {{user.blog}}
                            </p>
                            <p v-if="user.company">
                                <span class="bold">Company:</span>
                                {{user.company}}
                            </p>
                            <p v-if="user.location">
                                <span class="bold">Location:</span>
                                {{user.location}}
                            </p>
                            <p v-if="user.bio">
                                <span class="bold">Bio:</span>
                                {{user.bio}}
                            </p>
                            <p v-if="user.twitter_username">
                                <span class="bold">Twitter username:</span>
                                {{user.twitter_username}}
                            </p>
                            <p v-if="user.type">
                                <span class="bold">Type of user:</span>
                                {{user.type}}
                            </p>
                            <p>
                                <span class="bold">Public repos:</span>
                                {{user.public_repos}}
                            </p>
                            <p>
                                <span class="bold">Public gists:</span>
                                {{user.public_gists}}
                            </p>
                            <p>
                                <span class="bold">Followers:</span>
                                {{user.followers}}
                            </p>
                            <p>
                                <span class="bold">Following:</span>
                                {{user.following}}
                            </p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
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
<style lang="scss" scoped>
    .user-page {
        .prev-page {
            margin-bottom: 30px;
        }

        .card {
            .name {
                text-align: center;
                font-size: 32px;
            }
            p {
                font-size: 18px;
            }

            .bold {
                font-weight: bold;
            }

            .bottom {
                margin-top: 13px;
                line-height: 12px;
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
    }
</style>