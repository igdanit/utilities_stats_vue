<script setup lang="ts">
    import 'v-calendar/dist/style.css';

    import { provide, reactive, ref, inject } from 'vue';

    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';
    import { DatePicker } from 'v-calendar';
    import IndicationTypeList from './IndicationTypeList.vue';
  
    import { createBearerToken, retryFetch } from '../../http';
    import type { TokenService } from '../../utils/tokens';
    import TOKENS from '../../constants';

    const props = defineProps<{
        addressID: string
    }>()

    const tokenService = inject('tokenService') as TokenService;
    
    const createdAt = ref(new Date());
    const indication = ref('');
    const indicationTypeID = ref('');

    const indicationMaxLength = 30;

    function validateIndication(indication: string) {
        if (indication === '') throw new Error('You must provide indications')

        if (indication.length > indicationMaxLength) throw new Error(`Indicaition length must be less than ${indicationMaxLength} char. NOT IMPLEMENTED`)
    }

    async function onSubmit(event: Event) {
        validateIndication(indication.value)

        const res = await retryFetch(3, `api/v1/indication/${indicationTypeID.value}`, {
            method: "POST",
            body: JSON.stringify({
                indication: indication.value,
                createdAt: {
                    year: createdAt.value.getFullYear(),
                    month: createdAt.value.getMonth() + 1, // January is 0 indexed
                    day: createdAt.value.getDate()
                }
            }),
            headers: {
                "Content-type": "application/json",
                Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
            }
        })
    }

</script>

<template>
    <div class="add-indications">
        <div class="indication-select-block border-green h-100">
            <IndicationTypeList :addressID="props.addressID" v-model:indicationTypeID="indicationTypeID"/>
        </div>
        <div class="indication-input-field">
            <FieldInput class="w-100" v-model="indication" placeholder="Введите показания"/>
        </div>
        <DatePicker class="h-100" v-model="createdAt" is-dark>
            <template v-slot="{ inputValue, inputEvents }">
                <input
                class="date bg-transparent border px-2 py-1 rounded"
                :value="inputValue"
                v-on="inputEvents"
                />
            </template>
        </DatePicker>
        <SubmitButton @click="onSubmit">Добавить показания</SubmitButton>
    </div>
</template>

<style>

.add-indications {
    height: 2rem;
    margin: 0 15px;
    display: flex;
    align-items: center;
}

.indication-input-field {
    flex-grow: 1;
}

.bg-transparent {
    background-color: transparent;
}

.date {
    text-align: center;
    color: var(--clr-text);
    height: 100%;
}

.add-indications--addrs {
    width: 9rem;
    height: 2rem;
}


</style>