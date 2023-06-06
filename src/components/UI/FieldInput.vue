<script setup>

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>

<template>
    <input class="input" :value="modelValue" @input="$event => $emit('update:modelValue', $event.target.value)">
</template>

<style>
    .input {
        box-sizing: border-box;
        color: var(--clr-text);
        text-indent: 0.5rem;
        height: 2rem;
    }

</style>