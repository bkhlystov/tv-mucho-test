<template>
    <div class="main-wrapper-body">
        <!--<nav id="nav">-->
            <!--<router-link v-if="authenticated" to="/login" @click.native="logout()" replace>Logout</router-link>-->
        <!--</nav>-->
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>
<script>
//    import HeaderNavigation from './components/HeaderNavigation.vue';
//    import FooterBody from './components/FooterBody.vue';
    import {mapActions} from 'vuex';
    export default {
        name: 'App',
        components: {
//            HeaderNavigation,
//            FooterBody,
        },
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "root",
                    password: "root"
                }
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
//            ...mapActions('list', ['fetchDataList']),
//            ...mapActions('contentText', ['fetchContentText']),

            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }

        },
        async created () {
//            await this.fetchDataList();
//            await this.fetchContentText();
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
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
