<script setup lang="ts">
    import { inject } from 'vue';
    import type { IAppError } from '../../types';

    const appError = inject<IAppError>('appError')

    function closeNotification(event: Event) {
        if (appError != undefined) appError.visibility=false;
    } 

</script>

<template>
    <div class="error">
        <div class="error--message">
            {{ "Ошибка: " + (appError !== undefined ? appError.msg : 'appError is undefined !!!') }}
        </div>
        <div class="error--close" @click="closeNotification"></div>
    </div>
</template>

<style>
    .error {
        padding: 10px;
        display: relative;
        background-color: DarkRed;
        text-indent: 10%;
        display: flex;
        font-family: Arial, sans-serif;
    }
    
    .error--message {
        flex-basis: 97%;
    }

    .error--close {
        flex-grow: 1;
        text-align: center;
    }

    .error--close:before {
        content: "\00d7";
        color: white;
        font-weight: 500;
    }

</style>