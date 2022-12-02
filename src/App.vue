<script setup>
import AddressForm from './components/address/addressForm.vue';
import AddressesList from './components/address/AddressesList.vue';
import Intro from './components/Intro.vue'
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
    <SignInUpVue v-if="!userID"/>
    <AddressForm v-if="userID"/>
    <AddressesList v-if="userID"/>
</template>

<style>
</style>
