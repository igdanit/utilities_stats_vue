<script setup>
    import { reactive, ref } from 'vue';
    import SignUp from './SignUp.vue'
    import SignIn from './signIn.vue'

    let hiddenStatus = ref(true);


    function isHidden(event) {
        let node = event.target;
        let counter = -9;
        while (node.tagName !== 'DIV' && counter === 0) {
            node = node.parentNode;
            counter++;
        }

        if (node.tagName !== 'DIV') throw new Error("Can't reach parent node")

        let className = node.className.split('-')
        if (className[1] === 'in') {
            hiddenStatus.value = true;
        } else if (className[1] === 'up') {hiddenStatus.value = false;}
    }

</script>

<template>
    <div class="sign-in-up">
        <div @click="isHidden" class="sign-in-up--header">
            <div class="sign-in-option"><p>Войти</p></div>
            <div class="sign-up-option"><p>Зарегистрироваться</p></div>
        </div>
        <div class="sign-in-up--content">
            <SignIn v-if="hiddenStatus"/>
            <SignUp v-else/>
        </div>
    </div>
</template>

<style>

    .hidden {
        display: none;
    } 

    .sign-in-up form {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .sign-in-up--header {
        display: flex;
    }


    .sign-in-up--header > div{
        flex: 1;
        margin: auto;
        text-align: center;
        border: var(--clr-border) solid;
        border-width: 0 0.125em 0.25em 0.125em;
    }

    .sign-in-up--header > div:first-child {
        border-width: 0 0.125em 0.25em 0;
    }
    
    .sign-in-up--header > div:last-child {
        border-width: 0 0 0.25em 0.125em;
    }

</style>