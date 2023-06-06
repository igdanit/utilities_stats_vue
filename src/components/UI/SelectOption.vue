<script setup>

defineProps({
    selectOptions: Array,
    selectName: String,
    selectHint : String,
    /** Function that take 1 args the element of selectOptions and produces the representation of that element, e.g. a string.
     */
    moldFunc: Function
});

defineEmits(['update:modelValue'])

</script>

<template>
    <select
        @change="$event => $emit('update:modelValue', selectOptions[$event.target.value])"
        :name="selectName"
        :id="$attrs['id']">
        <option selected value="">{{selectHint}}</option>
        <option v-for="(option, idx) in selectOptions" :value="idx">
            {{moldFunc(option)}}
        </option>
    </select>
</template>

<style>
    select option {
        background-color: var(--clr-bg);
    }
</style>