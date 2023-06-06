<script setup lang="ts">
</script>

<template>
    <button class="btn btn-neon">
        <slot></slot>
    </button>
</template>

<style>
    :root {
        --clr-btn: hsl(54 56% 56%);
    }
    
    .btn {
        padding: 0.5em;
        color: var(--clr-btn);
        background-color: transparent;
        border-radius: 10%;
        border: var(--clr-btn) 0.15em solid;
        box-shadow: 0 0 1em 0 var(--clr-btn);
        cursor: pointer;
    }

    .btn-neon {
        transition: text-shadow 0.2s;
    }

    .btn-neon:hover {
        text-shadow:
        0 0 28px var(--clr-btn),
        0 0 42px#d4ac0d,
        0 0 82px#d4ac0d;
    }
</style>