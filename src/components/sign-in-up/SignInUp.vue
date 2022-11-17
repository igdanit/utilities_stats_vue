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
            <div class="sign-up-option"><p>Зарегестрироваться</p></div>
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

    .sign-in-up {
        margin: auto;
        border: solid;
        padding: 15px;
        width: 90%;
    }

    .sign-in-up--header *{
        display: inline-block;
        width: 50%;
        margin: auto;
        text-align: center;
    }

</style>