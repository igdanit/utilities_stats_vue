<script setup>
   import { ref } from 'vue'
   import axios from 'axios'

   // Sign-in form data
    const password = ref('');
    const email = ref('');

    // Submit button handler
    function onSubmit(event) {

        // Prevent default behavior of submit event
        event.preventDefault()

        //Sending request to API
        axios.post('api/auth/sing-in', {
            email,
            password
        })
        .then(function(response){
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
        <form @submit="onSubmit">
            <input class="input" v-model="email" name="email" type="email" placeholder="Введите email">
            <input class="input" v-model="password" name="password" type="password" placeholder="Введите пароль">
            <button @submit="onSubmit" type="submit">Войти</button>
        </form>
    </div>
</template>

<style>
</style>