<script setup>
    import { ref } from 'vue';
    import AddressesTab from './address/AddressesTab.vue';

    const indications = ref(true);
    const addresses = ref(false);
    const boundedAccount = ref(false);

    function isHidden(event) {
        let node = event.target;
        let counter = -9;
        while (node.tagName !== 'DIV' && counter !== 0) {
            node = node.parentNode;
            counter++;
        }

        if (node.tagName !== 'DIV') throw new Error("Can't reach DIV")


        let className = node.className;
        
        switch(className) {
            case 'indications':
                indications.value = true;
                addresses.value = false;
                boundedAccount.value = false;
                break

            case 'addresses':
                addresses.value = true;
                indications.value = false;
                boundedAccount.value = false;
                break
                    
            case 'bounded-accounts':
                boundedAccount.value = true;
                indications.value = false;
                addresses.value = false;
                break
        }
    }

</script>

<template>
    <div class="main">
        <div @click="isHidden" class="main--tabs">
            <div class="indications"><p>Показания</p></div>
            <div class="addresses"><p>Адреса</p></div>
            <div class="bounded-accounts"><p>Связанные аккаунты</p></div>
        </div>
        <div class="main--content">
            <AddressesTab v-if="addresses" />
        </div>
    </div>
</template>

<style>

    .main form {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .main--tabs {
        display: flex;
    }


    .main--tabs > div{
        flex: 1;
        margin: auto;
        text-align: center;
        border: var(--clr-border) solid;
        border-width: 0 0.125em 0.25em 0.125em;
    }

    .main--tabs > div:first-child {
        border-width: 0 0.125em 0.25em 0;
    }
    
    .main--tabs > div:last-child {
        border-width: 0 0 0.25em 0.125em;
    }

</style>