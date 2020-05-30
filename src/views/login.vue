<template>
    <div>
        <h1>Login</h1>
        <input type="text"
               name="username"
               v-model="input.username"
               placeholder="Username"
        />
        <input type="password"
               name="password"
               v-model="input.password"
               placeholder="Password"
        />
        <button type="button"
                @click="login()"
        >Login</button>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        mounted() {
            if(this.authenticated) {
                this.$router.replace({name: "users"})
            }
        },
        computed: {
            ...mapState('users', ['authenticated'])
        },
        methods: {
            ...mapMutations('users', ['setAuthenticationState']),
            redirectIfAuthenticated() {
                if(this.authenticated) {
                    this.$router.replace({name: "users"});
                }
            },
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.setAuthenticationState(true);
                        this.redirectIfAuthenticated();
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*#login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }*/
</style>