<script setup>
   import { ref } from 'vue'
   import axios from 'axios'

   // Sign-in form data
    const password = ref('');
    const email = ref('');

    // Submit button handler
    function onSubmit(event) {

        //Sending request to API
        axios.post('api/auth/sing-in', {
            email,
            password
        })
        .then(function(response){
            window.localStorage.setItem('access_token',response.data.access_token)
            // Some action with response
            console.log(response)
        })
        .catch(function(error) {
            // Some action with error
        })
    }

</script>

<template>
    <div class="sign-in">
        <form @submit.prevent="onSubmit">
            <input class="input" v-model="email" name="email" type="email" placeholder="Введите email">
            <input class="input" v-model="password" name="password" type="password" placeholder="Введите пароль">
            <button @submit="onSubmit" type="submit">Войти</button>
        </form>
    </div>
</template>

<style>
</style>