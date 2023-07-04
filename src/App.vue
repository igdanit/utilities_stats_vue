<script setup lang="ts">
    import { provide, ref, reactive, onBeforeMount, inject } from 'vue';

    import Intro from './components/Intro.vue'
    import Content from './components/Content.vue';
    import SignInUpVue from './components/sign-in-up/SignInUp.vue';
    import Loading from './components/loading/Loading.vue';
    import ErrorBlock from './components/UI/ErrorBlock.vue';
    
    import TOKENS from './constants';
    import type { IAppError } from './types';
    import { extractAccessToken } from './utils/tokens/jwt-localStorage';
    import { updateStorage, updateAccessToken, JWT, type ITokenService } from './utils/tokens';

    const userID = ref('');
    const isLoading = ref(true);
    // App level error. Appears in header.
    const appError: IAppError = reactive({
        msg: '',
        visibility: false
    })

    const tokenService = inject('tokenService') as ITokenService;

    // Provide props
    provide('userID', userID);
    provide('appError', appError);

    // Trying to renew existing accessToken and stopping loading stub.
    onBeforeMount(
        async () => {
            if (extractAccessToken() === null) { // If token don't saved in localStorage
                isLoading.value=false; 
                return; 
            }
            try {
                const response = await updateAccessToken({value: extractAccessToken() as string}); // Token will renew if not expired.
                let token: string;
                if (response.ok) {
                    token = (await response.json()).accessToken;
                    if (token === undefined) throw new Error("Property 'accessToken' doesn't exist on response body!")
                    updateStorage(TOKENS.ACCESS_TOKEN, token); // Backup in window.localStorage
                    const jwt = new JWT(token);
                    tokenService.setToken(TOKENS.ACCESS_TOKEN, jwt);
                    jwt.payload.sub
                    const sub = jwt.payload.sub;
                    if (typeof sub !== "number") {
                        throw new Error(`Incorrect value for property 'sub' in accessToken. Type of sub should be "number", not ${typeof sub}`)
                    }
                    userID.value = sub.toString();
                }
            } catch(e) {
                console.error(e)
            }
            isLoading.value = false;
        }
    )
</script>

<template>
    <ErrorBlock v-if="appError.visibility"/>
    <Loading v-if="isLoading"/>
    <div class="content" v-else>
        <Intro/>
        <div class="block">
            <SignInUpVue v-if="!userID"/>
            <Content v-else/>
        </div>
    </div>
</template>

<style>

:root {
    --clr-text: hsl(180, 100%, 50%);
    --clr-neon: hsl(220, 100%, 54%);
    --clr-bg: hsl(230, 21%, 16%);
    --clr-border: hsl(317 100% 54%);
    --clr-input: hsl(110 100% 50%)
}

*,
*::before,
*::after { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
}

body {
    background: var(--clr-bg);
}

.content {
    width: 992px;
    margin: 2% auto;
    border: var(--clr-neon) 0.25em solid;
    box-shadow: inset 0 0 1em 0 var(--clr-neon), 0 0 1em 0 var(--clr-neon);
}

.block {
    margin: 2%;
    border: var(--clr-border) 0.25em solid;
    box-shadow: inset 0 0 0.7em 0 var(--clr-border), 0 0 0.7em 0 var(--clr-border);
}

#app {
    font-family: 'Lobster';
    color: var(--clr-text);
    text-decoration: none;
    font-size: 1.3rem;
}

@media (max-width: 992px) {
    #app {
        width: 100%;
    }
}

.input {
    background-color: transparent;
    border: var(--clr-input) 0.1rem solid;
    box-shadow: 0 0 1rem 0 var(--clr-neon);
}

.input:focus {
    outline: none;
}

.neon-text {
    text-shadow:
    0 0 7px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa;
}

.neon-text-hover {
    transition: text-shadow 0.3s;
}

.neon-text-hover:hover {
    text-shadow:
    0 0 7px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa;
}

.border-green {
    border: var(--clr-input) 0.1rem solid;
    box-shadow: 0 0 1rem 0 var(--clr-neon);
}

.margin-10 {
    margin: 10px;
}

.w-95 {
    width: 95%;
}

.w-100 {
    width: 100%;
}

.h-100 {
    height: 100%;
}

.side-margin-10 {
    margin-left: 10px;
    margin-right: 10px;
}

.select-list {
    width: 100%;
    height: 100%;
    background: transparent;
    color: var(--clr-text);
    overflow: hidden;
    border: 0px;
    text-indent: 0.2rem;
}

</style>