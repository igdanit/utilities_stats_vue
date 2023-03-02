<script setup>
    import 'v-calendar/dist/style.css';

    import { ref } from 'vue';
    import { DateOnly } from '../../types';

    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';
    import { DatePicker } from 'v-calendar';

    const props = defineProps(['indicationType'])

    const createdAt = ref(new Date());
    const indication = ref('');

    function validateIndication(indication) {
        if (indication === '') throw new Error('You must provide indications')

        if (indication.length > 30) throw new Error('Indicaition length must be less than 30 char. NOT IMPLEMENTED')
    }

    function onSubmit(event) {
        validateIndication(indication.value)
        let axios = jwtHelper.attachJWTtoAxios();
        axios.post(`api/indications/3`, {
            indication: indication.value,
            createdAt: new DateOnly(createdAt.value)
        })
    }

    // Add decorator to update JWT
    onSubmit = updateJWT(onSubmit);

</script>

<template>
    <div class="add-indications">
        <SubmitButton @click="onSubmit">Добавить показания</SubmitButton>
        <div class="indication-input-field"><FieldInput v-model="indication"/></div>
        <DatePicker v-model="createdAt" is-dark>
            <template v-slot="{ inputValue, inputEvents }">
                <input
                class="date bg-transparent border px-2 py-1 rounded"
                :value="inputValue"
                v-on="inputEvents"
                />
            </template>
        </DatePicker>
    </div>
</template>

<style>
.add-indications {
    display: flex;
    align-items: center;
}

.indication-input-field {
    flex: 1;
}

.bg-transparent {
    background-color: transparent;
}

.date {
    text-align: center;
    color:aquamarine;
}

</style>