<script setup lang="ts">
import { inject, ref } from 'vue';
import TOKENS from '../../constants';
import { createBearerToken, retryFetch } from '../../http';
import type { ITokenService } from '../../utils/tokens';
    
    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButtonVue from '../UI/SubmitButton.vue';

    const props = defineProps<{
        addressID: string,
    }>();

    const indicationType = ref('');

    const tokenService = inject('tokenService') as ITokenService;

    async function addIndicationType(event: Event) {
        const response = await retryFetch(3, 'api/v1/indication/type', {
            method: 'POST',
            body: JSON.stringify({
                addressID: props.addressID,
                type: indicationType.value
            }),
            headers: {
                'Content-type': 'application/json',
                Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
            }
        });
        console.log(response)
    }


</script>

<template>
    <div class="add-indication-type">
        <FieldInput class="add-indication-type--input" v-model="indicationType" placeholder="Введите тип показаний"/>
        <SubmitButtonVue @click="addIndicationType">
            Добавить тип
        </SubmitButtonVue>
    </div>
</template>

<style>
    .add-indication-type {
        display: flex;
        align-items: center;
    }

    .add-indication-type--input {
        flex-grow: 1;
        margin-right: 15px;
    }
</style>