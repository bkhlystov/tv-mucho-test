<template>
    <div class="main-wrapper-body">
        <nav id="nav" v-if="authenticated">
            <router-link to="/login" @click.native="logout()" replace>Logout</router-link>
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
                if(this.authenticated) {
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
