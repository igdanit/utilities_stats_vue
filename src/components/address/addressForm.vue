<script setup>
    import { ref } from 'vue'
    import axios from 'axios';

    const address = ref('');

    const props = defineProps(['userId'])

    const userId = props.userId;
    const access_token = window.localStorage.getItem('access_token');

    // Send request to API 
    async function onSubmit(event) {
        await axios.post(`api/user/${id}/address`, {
            newAddress: address,
            access_token,
        })
    }

</script>

<template>
    <div class="add-address">
        <form @submit.prevent="onSubmit">
            <input class="address" v-model="address" name="address" type="text" placeholder="Введите Адрес">
        </form>
    </div>
</template>

<style>
</style>