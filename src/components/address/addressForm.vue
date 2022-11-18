<script setup>
    import { ref } from 'vue'
    import axios from 'axios';
    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';

    const address = ref('');

    const props = defineProps(['userId'])

    const userId = props.userId;
    const access_token = window.localStorage.getItem('access_token');

    // Send request to API 
    async function onSubmit(event) {
        await axios.post(`api/address/${userId}`, {
            newAddress: address,
            access_token,
        })
    }

</script>

<template>
    <div class="add-address">
        <form class="address-form" @submit.prevent="onSubmit">
            <FieldInput v-model="address" name="address" type="text" placeholder="Введите Адрес" />
            <SubmitButton>Добавить адрес</SubmitButton>
        </form>
    </div>
</template>

<style>
</style>