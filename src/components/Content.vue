<script setup lang="ts">
    import { ref, reactive, provide } from 'vue';
    import AddressesTab from './address/AddressesTab.vue';
    import IndicationTab from './indications/IndicationTab.vue';

    const indications = ref(true);
    const addresses = ref(false);

    function isHidden(event: Event) {
        let node = (event.target as HTMLElement).closest('div');
        if (node == null) return;
        let className = node.classList[0]; // get first class from classes
        
        switch(className) {
            case 'indications':
                indications.value = true;
                addresses.value = false;
                break

            case 'addresses':
                addresses.value = true;
                indications.value = false;
                break
        }
    }

</script>

<template>
    <div class="main">
        <div @click="isHidden" class="main--tabs">
            <div class="indications neon-text-hover" :class="{'neon-text':indications}"><p>Показания</p></div>
            <div class="addresses neon-text-hover" :class="{'neon-text':addresses}"><p>Адреса</p></div>
        </div>
        <div class="main--content">
            <AddressesTab v-if="addresses" />
            <IndicationTab v-else-if="indications" /> 
        </div>
    </div>
</template>

<style>

    .main--content {
        padding: 0.6rem 0;
    }

    .main form {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .main--tabs {
        display: flex;
    }

    .main--tabs p {
        margin: 10px;
    }

    .main--tabs > div{
        flex: 1;
        margin: auto;
        text-align: center;
        border: var(--clr-border) solid;
        border-width: 0 0.125em 0.25em 0.125em;
        box-shadow: inset 0 0 0.7em 0 var(--clr-border), 0 0 0.7em 0 var(--clr-border);
    }

    .main--tabs > div:first-child {
        border-width: 0 0.125em 0.25em 0;
    }
    
    .main--tabs > div:last-child {
        border-width: 0 0 0.25em 0.125em;
    }
    
</style>