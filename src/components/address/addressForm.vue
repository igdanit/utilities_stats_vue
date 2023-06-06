<script setup lang="ts">
    import { inject, ref, type Ref } from 'vue'
    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';
    import TOKENS from '../../constants'
    import { attachUpdateAccessToken, type ITokenService } from '../../utils/tokens';
    import { createBearerToken, retryFetch } from '../../http';
    import type { IAddress } from '../../types/Address';
    import type { IAppError } from '../../types';

    const address = ref('');

    const appError = inject('appError') as IAppError; // Application level error. Provided from App.vue
    const userID = inject('userID') as string; // Provided from App.vue
    const tokenService = inject('tokenService') as ITokenService; // Provided from main.js
    const addrsList = inject('addressesList') as IAddress[]; // Provided from AddressesTab.vue

    // Audit address ref
    function isValidAddress(address: Ref<string>) {
        address.value = address.value.trim();
        return address.value
    }

    async function saveAddresses() {
        return await retryFetch(3,
        `api/v1/address/`,
        {
            method: "POST",
            body: JSON.stringify({
                address: address.value
            }),
            headers: {
                "Content-type": "application/json",
                Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
            }
        });
    }

    // Send request to API 
    async function onSubmit(event: Event) {
        if (!isValidAddress(address)) return;
        let res: undefined | Response;
        try {
            res = await attachUpdateAccessToken(tokenService, TOKENS.ACCESS_TOKEN)(saveAddresses)(userID);
        } finally {
            if (res === undefined || !res.ok) {
                appError.msg = 'Не удалось добавить адрес. Попробуйте снова'
                appError.visibility = true;
                return 
            }
        }
        const resBody = await res.json();
        console.log(resBody)
        const addresses: IAddress[] = Array.isArray(resBody) ? resBody: [];
        addrsList.length = 0; // Delete all elemnts from array
        for (let addr of addresses) {
            addrsList.push(addr);
        }
        address.value = ''; // Wipe a value from UI
    }

</script>

<template>
    <div class="add-address">
        <form id="address-form" @submit.prevent="onSubmit">
                <FieldInput class="add-address--input margin-10" v-model="address" name="address" type="text" placeholder="Введите адрес, чтобы добавить его" />
                <SubmitButton class="add-address--btn">Добавить адрес</SubmitButton>
        </form>
    </div>
</template>

<style>

    .add-address {
        margin: 15px;
    }

    #address-form {
        display: flex;
        flex-direction: row;
    }
    
    .add-address--input {
        flex: 1;
    }

</style>