<script setup>
import Intro from './components/Intro.vue'
import AddressesTab from './components/address/AddressesTab.vue'
import SignInUpVue from './components/sign-in-up/SignInUp.vue';
import { updateJWT as updateDecorator, jwtHelper } from './helpers';
import { provide, ref, onBeforeMount } from 'vue';

const {extractUserIDfromJWT} = jwtHelper;

const userID = ref('');


// Provide props
provide('userID', userID);

const updateJWT = updateDecorator();

// NEED REFACTORING. MUST BE NOT ASYNCHRONOUS
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
onBeforeMount(()=>updateJWT()
    .then((response)=> userID.value = extractUserIDfromJWT())
    .catch((error)=> {if(error.response.status !== 401) throw error}));

</script>

<template>
    <Intro />
    <div class="content">
        <SignInUpVue v-if="!userID"/>
        <AddressesTab />
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

body {
    background: var(--clr-bg);
}

#app {
    width: 992px;
    margin: 2% auto;
    color: var(--clr-text);
    text-decoration: none;
    border: var(--clr-neon) 0.25em solid;
    font-size: 1.3rem;
    
    box-shadow: inset 0 0 1em 0 var(--clr-neon), 0 0 1em 0 var(--clr-neon);
}

#app * {
    font-family: 'Lobster';
}

@media (max-width: 992px) {
    #app {
        width: 100%;
    }
}

.input {
    background-color: transparent;
    border: var(--clr-input) 0.1em solid;
    box-shadow: 0 0 1em 0 var(--clr-neon);
}


.content {
    margin: 2% auto;
    border: var(--clr-border) 0.25em solid;
    width: 90%;
}
</style>
