<script setup>

defineProps({
    selectOptions: Array,
    selectName: String,
    selectHint : String,
    modelValue: String,
});

defineEmits(['update:modelValue'])

</script>

<template>
    <div>
        <select
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            :name="selectName"
            :id="$attrs['id']"
        >
            <option disabled selected value="">{{selectHint}}</option>
            <option v-for="(option, index) in selectOptions" :value="option.id">
                {{option.data}}
            </option>
        </select>
    </div>
</template>

<style>
</style>