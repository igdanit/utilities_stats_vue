<script setup>
    import { ref } from 'vue';
    import { updateJWT } from '../../helpers';
    import { attachJWTtoAxios } from '../../helpers/jwt';
    import SubmitButton from '../UI/SubmitButton.vue';
    import AddressesList from './AddressesList.vue';

    const addressID = ref();

    function isAddressID() {
        if (addressID.value) return true
        return false
    }

    async function onDelete(event) {
        if (!isAddressID()) return
        const axios = attachJWTtoAxios();
        await axios.delete(`api/address/${addressID.value}`);
    }

    onDelete = updateJWT(onDelete);

</script>

<template>
    <div class="delete-address" >
        <form class="delete-address--form" @submit.prevent="onDelete">
            <AddressesList v-model:addressID="addressID" class="input"/>
            <SubmitButton>Удалить адрес</SubmitButton>
        </form>
    </div>

</template>

<style>
    .delete-address--form {
        display: flex;
        white-space: nowrap;
    }

</style>