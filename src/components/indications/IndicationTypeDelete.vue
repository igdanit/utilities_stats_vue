<script setup lang="ts">
    import { inject, ref } from 'vue';
    import SubmitButton from '../UI/SubmitButton.vue';
    import IndicationTypeList from './IndicationTypeList.vue';

    defineProps<{
        addressID: string
    }>()

    // const addrID = inject('addressID');
    const indicationTypeID = ref('');

    function deleteIndicaitionType() {
        throw new Error('Delete indication type is not implemented')
    }

</script>

<template>
    <div class="indication-delete">
        <div class="indication-delete--list border-green">
            <IndicationTypeList :addressID="addressID" v-model:indicationTypeID="indicationTypeID" />
        </div>
        <SubmitButton class="indication-delete--btn" @click="deleteIndicaitionType">Удалить тип</SubmitButton>
    </div>
</template>

<style>
    .indication-delete {
        display: flex;
        align-items: center;
    }

    .indication-delete--list {
        height: 2rem;
        margin-right: 15px;
        flex-grow: 1;
    }

</style>