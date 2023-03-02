<script setup lang="ts">

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>

<template>
    <input class="input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<style>
    .input {
        margin: 10px;
        box-sizing: border-box;
        width: 95%;
        color: white;
        text-indent: 0.4rem;
        height: 2rem;
    }

</style>