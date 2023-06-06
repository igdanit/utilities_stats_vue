<script setup lang="ts">
    import { inject, ref, type Ref } from 'vue';

    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';

    import { getHash } from '../../helper';
    import { retryFetch } from '../../http';
    import TOKENS from '../../constants';
    import { JWT } from './../../utils/tokens';

    import type { IAppError } from '../../types';
    import type { IAuthResponse } from '../../types/Response';
    import { updateStorage, type ITokenService } from '../../utils/tokens/service.token';

    // Sign-up form data
    const password = ref('');
    const repeatedPassword = ref('');
    const email = ref('');
    const username = ref('');

    const appError = inject('appError') as IAppError; // Application level error
    const userID = inject('userID') as Ref<string>;
    const tokenService = inject('tokenService') as ITokenService;

    // Validation of password and repeatedPassword
    function isSame(pass: string, repeatedPass: string) {
        return pass === repeatedPass
    }

    // Submit button handler. It should make request to API
    function onSubmit(event: Event) {

        // Checking user credentials
        if (!isSame(password.value, repeatedPassword.value)) {
            alert('Not implemented. Password must be the same')
        }

        // Sending request to API
        retryFetch(3, 'api/v1/auth/sign-up', {
                method: 'POST',
                body: JSON.stringify({
                    email: email.value,
                    password: getHash(password.value),
                    username: username.value
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(async function(response) {
                if (response.ok) {
                    const body = await response.json() as IAuthResponse; // Convert ReadableStream to any
                    const token = new JWT(body.accessToken);
                    tokenService.setToken(TOKENS.ACCESS_TOKEN, token); // Make accessToken available via tokenService
                    updateStorage(TOKENS.ACCESS_TOKEN, body.accessToken); // Save token to localStorage for further manipulation after reloading page

                    userID.value = token.payload.sub.toString();
                } else {
                    switch (response.status) {
                        case 409:
                            appError.msg = 'Пользователь с таким email уже существует';
                            break
                        default:
                            appError.msg = 'Неверные данные, попробуйте снова';
                    }
                    appError.visibility = true;
                }
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
            <FieldInput v-model="username" class="margin-10 w-95" name="username" type="text" placeholder="Введите имя пользователя" />
            <FieldInput v-model="email" class="margin-10 w-95" name="email" type="email" placeholder="Введите email" /> 
            <FieldInput v-model="password" class="margin-10 w-95" name="password" type="password" placeholder="Введите пароль" />
            <FieldInput v-model="repeatedPassword" class="margin-10 w-95" name="repeated-password" type="password" placeholder="Повторно введите пароль " />
            <SubmitButton type="submit" class="margin-10">Зарегистрироваться</SubmitButton>
        </form>
    </div>
</template>

<style>
</style>