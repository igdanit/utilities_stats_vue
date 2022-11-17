<script setup>

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
    }
</style>