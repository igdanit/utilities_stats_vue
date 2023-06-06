<script setup lang="ts">
    import SelectOption from '../UI/SelectOption.vue';
    import type { IAddress, IndicationType, AddressID } from '../../types';
    import { inject, onMounted } from 'vue';

    defineEmits(['update:indicationTypeID'])
    
    const props = defineProps<{
        indicationTypeID: string,
        addressID: string,
    }>();

    const indicationTypes = inject('indicationTypes') as Map<AddressID, IndicationType[]>; // Provided from IndicationsTab.vue

    function moldIndication(data: IndicationType) {
        return data.type
    }


</script>

<template>
    <SelectOption
    select-name="indication-type"
    select-hint="Выберите тип показаний"
    :select-options="indicationTypes.get(addressID)"
    :mold-func="moldIndication"
    class="select-list"
    id="indication-types"
    @update:modelValue="(indicationType: IndicationType) => $emit('update:indicationTypeID', indicationType?.id?.toString() || '')"
    />
</template>

<style>
</style>
