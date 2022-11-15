<script setup>
    import { ref } from 'vue'
    import axios from 'axios'

    // Sign-up form data
    const password = ref('');
    const repeatedPassword = ref('');
    const email = ref('');
    const username = ref('');

    // Fields password and repeatedPassword validation
    function isSame(pass, repeatedPass) {
        return pass === repeatedPass
    }

    // Submit button handler. It should make request to API
    function onSubmit(event) {

        // Blocking default action when press the button
        event.preventDefault()

        // Checking user credentials
        if (!isSame(password, repeatedPassword)) {
            alert('Not implemented')
        }

        // Sending request to API
        axios.post('api/auth/sign-up', {
                email,
                password,
                username
            })
            .then(function(response) {
                //Some action with response
                console.log(response);
            })
            .catch(function(error) {
                //Some action with error
                throw error
            })
    }

</script>

<template>
    <div class=sign-up>
        <form @submit="onSubmit">
            <input class="input" v-model="username" name="username" type="text" placeholder="Введите имя пользователя">
            <input class="input" v-model="email" name="email" type="email" placeholder="Введите email">
            <input class="input" v-model="password" name="password" type="password" placeholder="Введите пароль">
            <input class="input" v-model="repeatedPassword" name="repeated-password" type="password" placeholder="Повторно введите пароль ">
            <button type="submit">Зарегестрироваться</button>
        </form>
    </div>
</template>

<style>
    .input {
        margin: 10px;
    }
</style>