<script setup>
    import { ref } from 'vue'

    const password = ref('');
    const repeatedPassword = ref('');
    const email = ref('');
    const username = ref('');

    // data correctness check
    function onSubmit(event) {
        if (password !== repeatedPassword) {
            event.preventDefault()
            alert('Not implemented')
        }
    }

</script>

<template>
    <div class=sign-up>
        <form @submit="onSubmit">
            <input v-model="username" name="username" type="text" placeholder="Введите имя пользователя">
            <input v-model="email" name="email" type="email" placeholder="Введите email">
            <input v-model="password" name="password" type="password" placeholder="Введите пароль">
            <input v-model="repeatedPassword" name="repeated-password" type="password" placeholder="Повторно введите пароль ">
            <button type="submit">Зарегестрироваться</button>
        </form>
    </div>
</template>

<style>

</style>