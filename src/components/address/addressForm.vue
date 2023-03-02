<script setup>
    import { ref } from 'vue'
    import axios from 'axios';
    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';

    const address = ref('');

    const props = defineProps(['userId'])

    const axiosInstance = axios.create()

    // Audit address ref
    function isValidAddress(address) {
        address.value = address.value.trim();
        return address.value
    }

    // Send request to API 
    async function onSubmit(event) {
        if (!isValidAddress(address)) return;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage['access_token']}`
        await axiosInstance.post(`api/address`, reactiveToPlain({address}));

        address.value = '';
    }

</script>

<template>
    <div class="add-address">
        <form class="address-form" @submit.prevent="onSubmit">
            <FieldInput v-model="address" name="address" type="text" placeholder="Введите адрес, чтобы добавить его" />
            <SubmitButton>Добавить адрес</SubmitButton>
        </form>
    </div>
</template>

<style>
.address-form {
    display:flex;
    white-space: nowrap;
}
</style>