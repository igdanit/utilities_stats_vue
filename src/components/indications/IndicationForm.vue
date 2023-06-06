<script setup lang="ts">
    import 'v-calendar/dist/style.css';

    import { provide, reactive, ref } from 'vue';

    import FieldInput from '../UI/FieldInput.vue';
    import SubmitButton from '../UI/SubmitButton.vue';
    import { DatePicker } from 'v-calendar';


    const createdAt = ref(new Date());
    const indication = ref('');
    const addrID = ref('');

    function validateIndication(indication: string) {
        if (indication === '') throw new Error('You must provide indications')

        if (indication.length > 30) throw new Error('Indicaition length must be less than 30 char. NOT IMPLEMENTED')
    }

    function onSubmit(event: Event) {
        validateIndication(indication.value)
    }

</script>

<template>
    <div class="add-indications">
        <div class="indication-input-field"><FieldInput v-model="indication" placeholder="Введите показания"/></div>
        <DatePicker v-model="createdAt" is-dark>
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
    height: 2rem;
}

.add-indications--addrs {
    width: 9rem;
    height: 2rem;
}


</style>