<script setup>
    import {provide, reactive} from 'vue';
    import AddressDelete from './AddressDelete.vue';
    import AddressForm from './addressForm.vue';

    const addressesList = reactive(new Map());

    provide('addressesList', addressesList);

</script>

<template>

    <AddressForm />
    <AddressDelete />

</template>

<style></style>