<script setup lang="ts">

    import { inject, onUpdated, ref } from 'vue';
    
    import ChartBlock from '../UI/ChartBlock.vue';
    import IndicationTypeList from './IndicationTypeList.vue';
    
    import type { Indication, IndicationType } from '../../types';
    import type { MoldFunction } from '../UI/ChartBlock.vue';

    defineProps<{
        addressID: string
    }>();

    const indicationTypeID = ref('');
    let xCount = 0; // xPos for indication. Indication already sorted

    const indications = inject('indications') as Map<IndicationType['id'], Indication[]>; // Provided from IndicationTab.vue

    onUpdated(() => {xCount = 0;}); // reset the yCount, cause components will be rerendered after switching to another
    
    // Convert indication to necessary data for ChartBlock
    function moldIndications(indication: Indication): ReturnType<MoldFunction> {
        const ru_Month = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ]
        return {
            x: xCount++,
            y: indication.indication,
            xLabel: indication.createdAt ? ru_Month[indication.createdAt?.month - 1]: "", // indicaition.created.month is 1 - indexed (i.e. starting from 1)
            yLabel: String(indication.indication),
        }
    }


</script>

<template>
    <div class="indications-chart w-95">
        <div class="indications-chart--indication-type">
            <IndicationTypeList :addressID="addressID" v-model:indicationTypeID="indicationTypeID"/>
        </div>
        <div class="indications-chart--chart">
            <ChartBlock id="indication-chart" :dot-per-pixel="2" :mold-function="moldIndications" :data="indications.get(indicationTypeID) || []"/>
        </div>
    </div>
</template>

<style>
</style>