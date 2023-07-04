<script setup lang="ts">
import { inject, onMounted, onUpdated, provide, reactive, ref, shallowReactive } from 'vue';

import AddressesList from '../address/AddressesList.vue';
import DropDownBlock from '../UI/DropDownBlock.vue';
import IndicationTypeDelete from './IndicationTypeDelete.vue';
import IndicationTypeList from './IndicationTypeList.vue';
import IndicationTypeForm from './IndicationTypeForm.vue';
import IndicationForm from './IndicationForm.vue';
import { createBearerToken, retryFetch } from '../../http';
import TOKENS from '../../constants';
import type { ITokenService } from '../../utils/tokens';
import type { IndicationType, IAddress, AddressID, Indication } from '../../types';
import ChartBlock from '../UI/ChartBlock.vue';
import type IndicationFormVue from './IndicationForm.vue';
import IndicationChart from './IndicationChart.vue';

    const addrID = ref('');
    const addrsList = reactive(new Array<IAddress>());
    const indicationTypeID = ref('');
    const indicationTypes = reactive(new Map<AddressID, IndicationType[]>());
    const indications = shallowReactive(new Map<IndicationType["id"], Indication[]>);

    provide('indicationTypes', indicationTypes);
    provide('addressesList', addrsList);
    provide('indications', indications);    

    const tokenService = inject('tokenService') as ITokenService;

    async function getIndicationType(addressID: string): Promise<Response> {
        return await retryFetch(3, `api/v1/indication/type?addrID=${addressID}`, {
            method: "GET",
            headers: {
                Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
            }
        });
    };

    async function fetchIndicationTypes(addresses: IAddress[]): Promise<void> {
        indicationTypes.clear();
        let res, body;
        for (let addr of addresses) {
            try{
                res = await getIndicationType(addr.id.toString()) as Response;
                if (res.ok) {
                    body = await res.json() as IndicationType[];
                    indicationTypes.set(addr.id.toString(), body);
                } else {
                    switch (res.status) {
                        // notify the user
                    }
                }
            } catch (e) {
                throw(e)
            }
        }
    };

    async function getIndications(indicationTypeID: string): Promise<Response> {
        return await retryFetch(3, `api/v1/indication/${indicationTypeID}`,{
            method: "GET",
            headers: {
                Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
            }
        });
    };

    async function fetchAllIndications(indicationTypes: IndicationType[]): Promise<void> { // Fetching in parallel
        indications.clear(); // remove all elements from Map
        const preserveIDFunc = async function(indicationType: IndicationType): Promise<[Response, IndicationType['id']]> { // Pack indicationTypeID and getIndications response to one Promise
            return [
                await getIndications(indicationType.id),
                indicationType.id
            ]
        }
        const indicationRequests = indicationTypes.map((indicationType)=>preserveIDFunc(indicationType)); // array of requests
        let indicationResponses = await Promise.allSettled(indicationRequests); // wait untill all promises settled
        for (let promiseResult of indicationResponses) {
            if (promiseResult.status === "fulfilled") {
                const [res, indicationTypeID] = promiseResult.value;
                if (res.ok) {
                    let body = await res.json() as {indications: Indication[]};
                    indications.set(indicationTypeID, shallowReactive(body.indications));
                } else {
                    switch (res.status) {
                        // Notify user. Not Implemented.
                    }
                }
            }
        }
    };

    async function getIndicationTypeAndIndications(addresses: IAddress[]) {
        await fetchIndicationTypes(addresses); // fill the indicationTypes
        await fetchAllIndications(Array.from(indicationTypes.values()).flat()); // fill the indications
    }

    const data = [
        [1,30, 'Январь'],
        [2,30, 'Ферваль'],
        [9,90, 'Сентябрь'],
        [12,10, 'Декабрь'],
        // [0, 0],
    ]

</script>

<template>
    <div class="indication">
        <div class="indication--addresses border-green w-95">
            <AddressesList :addressesList="addrsList" v-model:addressID="addrID" @on-mounted="(val)=>getIndicationTypeAndIndications(addrsList)"/>
        </div>
        <DropDownBlock class="w-95" title="Добавить тип показаний" :up-down-paddings="15">
            <IndicationTypeForm class="side-margin-10" :addressID="addrID" />
        </DropDownBlock>
        <DropDownBlock class="w-95" title="Удалить тип показаний" :up-down-paddings="15">
            <IndicationTypeDelete class="side-margin-10" :addressID="addrID"/>
        </DropDownBlock>
        <DropDownBlock class="w-95" title="Передать показания" :up-down-paddings="15">
            <IndicationForm :addressID="addrID"/>
        </DropDownBlock>
        <IndicationChart :addressID="addrID"/>
    </div>
</template>

<style>

    .indication {
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .indication--addresses {
        height: 2rem;
        margin: 10px;
    }

</style>