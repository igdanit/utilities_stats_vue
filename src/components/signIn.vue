<script>
   import { ref } from 'vue'

    const password = ref('');
    const email = ref('');
</script>

<template>
    <div class=sign-in>
        <div><p>Войти</p></div>
    </div>
    <form @submit.prevent="onSubmit">
        <input v-model="email" type="email" placeholder="Введите email">
        <input v-model="password" type="password" placeholder="Введите пароль">
        <button type="submit">Войти</button>
    </form>
</template>

<style>

</style>