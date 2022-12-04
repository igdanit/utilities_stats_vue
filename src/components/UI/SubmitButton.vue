<script setup>
</script>

<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<style>
    :root {
        --clr-btn: hsl(54 56% 56%);
    }
    
    .btn {
        margin: 0.7em;
        padding: 0.5em;
        color: var(--clr-btn);
        background-color: transparent;
        border-radius: 10%;
        border: var(--clr-btn) 0.15em solid;
        box-shadow: 0 0 1em 0 var(--clr-btn);
    }
</style>