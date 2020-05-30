<template>
    <div class="main-wrapper-body">
        <nav id="nav">
            <router-link v-if="authenticated" to="/login" @click.native="logout()" replace>Logout</router-link>
        </nav>
        <router-view />
    </div>
</template>
<script>
//    import HeaderNavigation from './components/HeaderNavigation.vue';
//    import FooterBody from './components/FooterBody.vue';
    import {mapState, mapMutations} from 'vuex';
    export default {
        name: 'App',
        components: {
//            HeaderNavigation,
//            FooterBody,
        },
        data() {
            return {
                mockAccount: {
                    username: "root",
                    password: "root"
                }
            }
        },
        computed: {
            ...mapState('users', ['authenticated']),
        },
        created () {
            this.checkAuthentication();
            this.redirectIfAuthenticated();
//            await this.fetchDataList();
//            await this.fetchContentText();
        },
        methods: {
            ...mapMutations('users', ['setAuthenticationState']),
            redirectIfAuthenticated() {
                if(this.authenticated) {
                    this.$router.replace({name: "users"});
                }
            },
            checkAuthentication() {
                const auth_state = (localStorage && localStorage.authenticated) ? Boolean(localStorage.authenticated) : false;
                this.setAuthenticationState(auth_state);
            },
            logout() {
                this.setAuthenticationState(false);
            }

        }
    }
</script>
<style lang="scss">
    /*@font-face {
        font-family: 'Roboto-Regular';
        src: url(./fonts/Roboto-Regular.ttf);
    }

    @font-face {
        font-family: 'Knewave';
        src: url(./fonts/knewave.ttf);
    }
    @import './styles/common.scss';

    .main-wrapper-body {
        background-image: url('./assets/main-background.png');

        header {
            position: absolute;
            z-index: 999;
            width: 100%;
            background-color: $custom-light-green;
        }
    }*/
</style>
