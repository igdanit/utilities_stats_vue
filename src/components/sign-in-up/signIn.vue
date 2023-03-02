<script setup lang="ts">
    import { ref, inject, type Ref } from 'vue'

    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';

    import TOKENS from '../../constants';
    import { getHash } from '../../helper';
    import { JWT, type IJWTHeaders, type IJWTPayload } from '../../utils/tokens';

    import type { IAppError, IAuthResponse } from '../../types';
    import { updateStorage, type ITokenService } from '../../utils/tokens/service.token';

   // Sign-in form data
    const password = {
        minLength: 8,
        maxLength: 50,
        data: ref(''),
    }
    const email = ref('');


    // Inject props
    const appError = inject('appError') as IAppError; // provided from App.vue
    const userID = inject('userID') as Ref<string>; // provided from App.vue
    const tokenSerive = inject("tokenService") as ITokenService; // provided from main.js


    // Submit button handler
    function onSubmit(event: Event) {
        // Sending request to API
        fetch(
            'api/v1/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value, 
                    password: getHash(password.data.value)
                })
            }
        )
        .then(async response => {
            if (response.ok) {
                const body = await response.json() as IAuthResponse; // Convert ReadableStream  to any type
                const token = new JWT(body.accessToken);
                tokenSerive.setToken(TOKENS.ACCESS_TOKEN, token); // Make token available everywhere in app through TokenService
                updateStorage(TOKENS.ACCESS_TOKEN, body.accessToken); // Save on window.localStorage

                userID.value = token.payload.sub.toString();
            } else {
                switch (response.status) {
                    default:
                        appError.msg = "Неверно указаны email и/или пароль"
                }
                appError.visibility = true;
            }   
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
            <FieldInput v-model="password.data.value" name="password" type="password" placeholder="Введите пароль" />
            <SubmitButton type="submit">Войти</SubmitButton>
        </form>
    </div>
</template>

<style>
    .sign-in--user-input-error {
        width: 95%;
        margin: 0px 0px 10px 0px;
    }
</style>