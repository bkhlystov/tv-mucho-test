<template>
    <div class="main-wrapper-body">
        <nav class="nav" v-if="authenticated">
            <router-link to="/login" @click.native="logout()" replace>
                <el-button>Logout</el-button>
            </router-link>
        </nav>
        <router-view />
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    export default {
        name: 'App',
        computed: {
            ...mapState('users', ['authenticated']),
        },
        created () {
            this.checkAuthentication();
            this.redirectIfAuthenticated();
        },
        methods: {
            ...mapMutations('users', ['setAuthenticationState']),
            redirectIfAuthenticated() {
                if(this.authenticated && this.$route.path === '/login') {
                    this.$router.replace({name: "users"});
                }
            },
            checkAuthentication() {
                const auth_state = !!(localStorage && localStorage.authenticated && localStorage.authenticated === 'true');
                this.setAuthenticationState(auth_state);
            },
            logout() {
                this.setAuthenticationState(false);
            }

        }
    }
</script>
<style lang="scss">
    .nav {
        display: flex;
        justify-content: flex-end;
    }
</style>
