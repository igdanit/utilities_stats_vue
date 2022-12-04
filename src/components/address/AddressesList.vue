<script setup>
    import { reactive, ref, onMounted } from 'vue';
    import { jwtHelper } from '../../helpers';
    import SelectOption from '../UI/SelectOption.vue';
    import { Address } from '../../types'

    const {attachJWTtoAxios, extractUserIDfromJWT} = jwtHelper;

    defineProps(['addressID']);
    defineEmits(['update:addressID']);

    const selectOptions = reactive([]);

    // Push addresses into reactive array
    function createAddresses(addresses, reactiveArr) {

        return addresses.forEach(
            address => {reactiveArr.push(new Address(address.address,address.id))}
        )
    }

    // Retrieve addresses from API
    async function fetchAddresses() {
        const axios = attachJWTtoAxios('access_token');
        const userID = extractUserIDfromJWT(); 
        const response = await axios.get(`api/address/${userID}`);
        return response.data;
    }

    // Retrieve and update the state
    async function updateAddresses(event) {
        const addresses = await fetchAddresses();
        createAddresses(Object.values(addresses), selectOptions);
    }

    onMounted(()=>{
        updateAddresses()
    })

</script>

<template>
    <div class="addresses-list">
        <SelectOption :modelValue="addressID"
        @update:modelValue="(addressID) => $emit('update:addressID', addressID)"
        id="addresses" :select-options="selectOptions" select-name="selectedAddress"
        select-hint="Выберите адрес"/>
    </div>
</template>

<style>
    #addresses {
        margin: auto;
        width: 100%;
        background: transparent;
        color: var(--clr-text)
    }
</style>