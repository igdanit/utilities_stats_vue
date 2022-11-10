<script setup>
    import { ref } from 'vue'

    const password = ref('');
    const email = ref('');

    function onSubmit(event) {
        console.dir(event.target)
        console.log(password.value)
        console.log(email.value)
    }
</script>

<template>
    <div class=sign-up>
        <div><p>Создать учëтную запись</p></div>
    </div>
    <form @submit.prevent="onSubmit">
        <input v-model="email" type="email" placeholder="Введите email">
        <input v-model="password" type="password" placeholder="Введите пароль">
        <button type="submit">Зарегестрироваться</button>
    </form>
</template>

<style>

</style>