<script setup>
    import {inject} from 'vue';

    import AddressDelete from './AddressDelete.vue';
    import AddressForm from './addressForm.vue';

    const userID = inject('userID');

</script>

<template>

    <AddressForm v-if="userID"/>
    <AddressDelete v-if="userID"/>

</template>

<style></style>