<script setup>
    import { reactive, ref } from 'vue';
    import { attachJWTtoAxios, extractUserIDfromJWT } from '../../helper';
    import SelectOption from '../UI/SelectOption.vue';
    import { Address } from '../../types'

    const addressID = ref();
    const selectOptions = reactive([]);

    function createAddresses(addresses, reactiveArr) {

        return addresses.forEach(
            address => {reactiveArr.push(new Address(address.address,address.id))}
        )
    }

    async function fetchAddresses() {
        const axios = attachJWTtoAxios('access_token');
        const userID = extractUserIDfromJWT(); 
        const response = await axios.get(`api/address/${userID}`);
        return response.data;
    }

    async function onClick(event) {
        const addresses = await fetchAddresses();
        createAddresses(Object.values(addresses), selectOptions);
    }

</script>

<template>
    <div class="content addresses-list dropdown">
        <form>
            <button @click.prevent="onClick">
                Получить адресса
            </button>
        </form>
        <label for="addresses">Выберите адрес</label>
        <SelectOption v-model="addressID" id="addresses" :select-options="selectOptions" select-name="selectedAddress" select-hint="Выберите адрес"/>
    </div>
</template>

<style>
</style>