<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios';

    const props = defineProps(['userId'])

    const userId = props.userId

    let addresses;

    async function fetchAddresses(userId) {
        const response = await axios.get(`/api/addresses/${userId}`);
        addresses = response.data.addresses;
    }

</script>

<template>
    <div class="addresses-list dropdown">
        <label for="addresses">Выберите адрес</label>
        <select id="addresses">
            <options v-for="address in addresses" :value="address.id">
                {{address.address}}
            </options>
        </select>
    </div>
</template>

<style>
</style>