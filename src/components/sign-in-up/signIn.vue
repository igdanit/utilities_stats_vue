<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'
    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';
    import { getHash, reactiveToPlain } from '../../helper';
    import { jwtHelper } from '../../helpers';

    const { extractUserIDfromJWT } = jwtHelper;

   // Sign-in form data
    const password = ref('');
    const email = ref('');

    // Inject props
    const userID = inject('userID');

    // Submit button handler
    function onSubmit(event) {

        // Sending request to API
        axios.post(
            'api/auth/sign-in',
            reactiveToPlain({
                email, 
                passwordHash: getHash(password)})
        )
        .then(function(response){
            window.localStorage.setItem('access_token',response.data.access_token);
            userID.value = extractUserIDfromJWT();

        })
        .catch(function(error) {
            // Some action with error
        })
    }

</script>

<template>
    <div class="sign-in">
        <form @submit.prevent="onSubmit">
            <FieldInput v-model="email" name="email" type="email" placeholder="Введите email" />
            <FieldInput v-model="password" name="password" type="password" placeholder="Введите пароль" />
            <SubmitButton @submit="onSubmit" type="submit">Войти</SubmitButton>
        </form>
    </div>
</template>

<style>
</style>