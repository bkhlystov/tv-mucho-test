<template>
    <div class="login">
        <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="120px"
                class="form-login"
                maxlength="30"
                status-icon
                @submit.prevent="validate">
            <el-form-item label="Email" prop="email">
                <el-input
                        id="email"
                        type="email"
                        v-model="form.email"
                        @change="hideErrorEmailMessage"
                ></el-input>
                <el-tag v-show="state.error_email" type="danger">The 'Email' field is not valid.</el-tag>
            </el-form-item>

            <el-form-item label="Password" prop="password">
                <el-input
                        id="password"
                        type="password"
                        v-model="form.password"
                        maxlength="30"
                        autocomplete="off"
                ></el-input>
            </el-form-item>

            <el-form-item class="buttons">
                <el-button
                        type="submit"
                        @click="validate"
                >Login</el-button>
                <el-button
                        @click="resetForm('form')"
                >Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import apiClient from '../api/';

    const mockAccount = {
        email: "test@i.ua",
        password: "test"
    };

    export default {
        name: 'Login',
        data: () => ({
            form: {
                email: "",
                password: ""
            },
            state: {
                error_email: false
            },
            rules: {
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { min: 4, max: 12, message: 'Length should be 4 to 12', trigger: 'blur' }
                ],
                email: [{ required: true, message: 'Please input email', trigger: 'blur' }]
            }
        }),
        computed: {
            ...mapState('users', ['authenticated']),
        },
        created() {
            if(this.authenticated) {
                this.$router.replace({name: "users"});
                this.$message({
                    showClose: true,
                    message: 'User authenticated, redirect to users list.',
                    type: 'success',
                    duration: 5000
                });
            }
        },
        methods: {
            ...mapMutations('users', ['setAuthenticationState']),
            validEmail(email) {
                var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
                return re.test(email);
            },
            showErrorEmailMessage() {
                this.state.error_email = true;
            },
            hideErrorEmailMessage() {
                this.state.error_email = false;
            },
            validate() {
                this.$refs.form.validateField('email');
                this.$refs.form.validateField('password');

                if (this.form.email && this.validEmail(this.form.email)) {
                    if(this.form.email == mockAccount.email && this.form.password == mockAccount.password) {
                        this.hideErrorEmailMessage();
                        this.login();
                    } else {
                        this.$message({
                            showClose: true,
                            message: 'Oops, looks like wrong email or password. Try login again ;)',
                            type: 'error',
                            duration: 5000
                        });
                    }
                } else {
                    this.showErrorEmailMessage();
                }
            },
            redirectIfAuthenticated() {
                if(this.authenticated) {
                    this.$router.replace({name: "users"});
                }
            },
            login() {
                this.setAuthenticationState(true);
                this.redirectIfAuthenticated();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .form-login {
            width: 30%;
        }
    }
</style>