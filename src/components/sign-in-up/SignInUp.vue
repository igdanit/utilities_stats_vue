<script setup>
    import { reactive } from 'vue';
    import SignUp from './SignUp.vue'
    import SignIn from './signIn.vue'

    let hiddenStatuses = reactive({
        'signIn': false,
        'signUp': true,
    });

    function isHidden(event) {
        for (let element of event.path) {
            if (element.tagName === 'DIV') {
                if (element.className.split('-')[1] === 'in') {
                    hiddenStatuses.signIn = false;
                    hiddenStatuses.signUp = true;
                } else {
                    hiddenStatuses.signIn = true;
                    hiddenStatuses.signUp = false;
                }
                break
            }
        }
    }
</script>

<template>
    <div class="sign-in-up">
        <div @click="isHidden" class="sign-in-up--header">
            <div class="sign-in-option"><p>Войти</p></div>
            <div class="sign-up-option"><p>Зарегистрироваться</p></div>
        </div>
        <div class="sign-in-up--content">
            <SignIn :class="{hidden: hiddenStatuses.signIn}" />
            <SignUp :class="{hidden: hiddenStatuses.signUp}" />
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