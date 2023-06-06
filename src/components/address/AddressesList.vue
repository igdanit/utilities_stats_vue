<script setup lang="ts">
    import { onMounted, inject } from 'vue';

    import SelectOption from '../UI/SelectOption.vue';

    import TOKENS from '../../constants';
    import type { IAddress } from '../../types';
    import { createBearerToken, retryFetch } from '../../http';
    import { attachUpdateAccessToken, type ITokenService } from '../../utils/tokens';

    const emit = defineEmits(['update:addressID', 'onMounted']);
    const { addressesList } = defineProps<{
        addressID: string,
        addressesList: IAddress[],
    }>();
    
    const tokenService = inject('tokenService') as ITokenService; // provided from main.js

    // Retrieve and update the state
    async function updateAddresses(event: Event) {
    }

    // Function that take an obj and convert it to string representation
    function moldAddr(addr: IAddress) {
        return addr.address
    }

    // Retrieve addresses from API
    function fetchAddresses() {
        return retryFetch(3, `/api/v1/address`, {
            method: "GET",
            headers: {
                Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
            }
        })
    }

    onMounted(async () => {
        if (addressesList.length !== 0) return;
        // fetch addresses and fill addrsList
        const res = await attachUpdateAccessToken(tokenService, TOKENS.ACCESS_TOKEN)(fetchAddresses)();
        const resBody = await res.json() as IAddress[];
        for (let addr of resBody) {
            addressesList.push(addr);
        }
        emit("onMounted");
    })
</script>

<template>
    <div class="addresses-list">
        <SelectOption :moldFunc="moldAddr"
        @update:modelValue="(addr: IAddress) => $emit('update:addressID', addr?.id.toString() || '')"
        id="addresses" :select-options="addressesList" select-name="selectedAddress"
        select-hint="Выберите адрес"/>
    </div>
</template>

<style>
    #addresses {
        width: 100%;
        height: 100%;
        background: transparent;
        color: var(--clr-text);
        overflow: hidden;
        border: 0px;
        box-sizing: border-box;
        display: block;
        text-indent: 0.2rem;
    }

    .addresses-list {
        height: 100%;
    }

</style>