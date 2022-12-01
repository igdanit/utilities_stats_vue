<script setup>
import AddressForm from './components/address/addressForm.vue';
import AddressesList from './components/address/AddressesList.vue';
import Intro from './components/Intro.vue'
import SignInUpVue from './components/sign-in-up/SignInUp.vue';
import { updateJWT } from './helper';

const userID = ref('');

try {
    updateJWT()
} catch(error) {
    console.log(error)
}


</script>

<template>
    <Intro />
    <SignInUpVue />
    <AddressForm v-if="userID"/>
    <AddressesList v-if="userID"/>
</template>

<style>
</style>
