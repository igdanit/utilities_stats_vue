<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'
    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';
    import { getHash, reactiveToPlain } from '../../helper';

    //Inject
    const userID = inject('userID');

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

        // Checking user credentials
        if (!isSame(password.value, repeatedPassword.value)) {
            alert('Not implemented. Password must be the same')
        }

        // Sending request to API
        axios.post('api/auth/sign-up', reactiveToPlain({
                email,
                passwordHash: getHash(password),
                username
            }))
            .then(function(response) {
                //Some action with response
            })
            .catch(function(error) {
                //Some action with error
                throw error
            })
    }

</script>

<template>
    <div class=sign-up>
        <form @submit.prevent="onSubmit">
            <FieldInput v-model="username" name="username" type="text" placeholder="Введите имя пользователя" />
            <FieldInput v-model="email" name="email" type="email" placeholder="Введите email" /> 
            <FieldInput v-model="password" name="password" type="password" placeholder="Введите пароль" />
            <FieldInput v-model="repeatedPassword" name="repeated-password" type="password" placeholder="Повторно введите пароль " />
            <SubmitButton type="submit">Зарегистрироваться</SubmitButton>
        </form>
    </div>
</template>

<style>
</style>