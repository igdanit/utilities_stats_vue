<script setup lang="ts">
    import { ref, inject, onUpdated } from 'vue';

    import SubmitButton from '../UI/SubmitButton.vue';
    import AddressesList from './AddressesList.vue';

    import type { IAddress } from '../../types/Address';
    import { attachUpdateAccessToken, type ITokenService } from '../../utils/tokens';
    import TOKENS from '../../constants';
    import { createBearerToken, retryFetch } from '../../http';
    import type { IAppError } from '../../types';

    const addrID = ref<string>('');


    const appError = inject('appError') as IAppError; // Provided from App.vue
    const tokenService = inject('tokenService') as ITokenService; // Provided from main.js
    const addrsList = inject('addressesList') as IAddress[]; // Provided from AddressesTab.vue


    // Verify wether addressID ref has initial value.
    function isAddrID() {
        if (addrID.value) return true
        return false
    }

    async function deleteAddress(addressID: string) {
        return await retryFetch(
            3,
            `api/v1/address/${addressID}`, // If you're have an error by IDE, don't edit it!
            {
                method: "DELETE",
                headers: {
                    Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
                }
            }
            )
    }

    async function onDelete(event: Event) {
        if (!isAddrID()) return;

        const res = await attachUpdateAccessToken(tokenService, TOKENS.ACCESS_TOKEN)(deleteAddress)(addrID.value);
        if (!res.ok) {
            appError.msg = 'Не удалось удалить адрес. Попробуйте снова';
            appError.visibility = true;
            return
        }

        const resBody: IAddress[] = await res.json();
        addrsList.length = 0; // Wipe all addresses
        for (let addr of resBody) {
            addrsList.push(addr)
        }

        addrID.value = '';
    }

</script>

<template>
    <div class="delete-address" >
        <form id="delete-address--form" @submit.prevent="onDelete">
            <AddressesList :addressesList="addrsList" v-model:addressID="addrID" class="input margin-10"/>
            <SubmitButton>Удалить адрес</SubmitButton>
        </form>
    </div>

</template>

<style>
    #delete-address--form {
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        margin: 15px;
    }

</style>