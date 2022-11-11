<script setup>
   import { ref } from 'vue'

    const password = ref('');
    const email = ref('');
</script>

<template>
    <div class="sign-in">
        <form @submit="onSubmit">
            <input class="input" v-model="email" name="email" type="email" placeholder="Введите email">
            <input class="input" v-model="password" name="password" type="password" placeholder="Введите пароль">
            <button type="submit">Войти</button>
        </form>
    </div>
</template>

<style>
</style>