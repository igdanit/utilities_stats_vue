<script setup lang="ts">
    import { provide, reactive } from 'vue';

    import AddressDelete from './AddressDelete.vue';
    import AddressForm from './addressForm.vue';

    const addrsList = reactive(new Array<string>());

    provide('addressesList' ,addrsList);
</script>

<template>
    <AddressForm />
    <AddressDelete />
</template>

<style></style>