<script setup lang="ts">
import { inject, onMounted, onUpdated, provide, reactive, ref } from 'vue';

import AddressesList from '../address/AddressesList.vue';
import DropDownBlock from '../UI/DropDownBlock.vue';
import IndicationTypeDelete from './IndicationTypeDelete.vue';
import IndicationTypeList from './IndicationTypeList.vue';
import IndicationTypeForm from './IndicationTypeForm.vue';
import { createBearerToken, retryFetch } from '../../http';
import TOKENS from '../../constants';
import type { ITokenService } from '../../utils/tokens';
import type { IndicationType, IAddress, AddressID } from '../../types';
import ChartBlock from '../UI/ChartBlock.vue';

    const addrID = ref('');
    const addrsList = reactive(new Array<IAddress>());
    const indicationTypeID = ref('');
    const indicationTypes = reactive(new Map<AddressID, IndicationType[]>());

    provide('indicationTypes', indicationTypes);
    provide('addressesList', addrsList);    

    const tokenService = inject('tokenService') as ITokenService;

    async function getIndicationType(addressID: string): Promise<Response> {
        return await retryFetch(3, `api/v1/indication/type?addrID=${addressID}`, {
            method: "GET",
            headers: {
                Authorization: createBearerToken(tokenService.getToken(TOKENS.ACCESS_TOKEN)?.value || "")
            }
        });
    }

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
                        // notify user
                    }
                }
            } catch (e) {
                throw(e)
            }
        }
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
            <AddressesList :addressesList="addrsList" v-model:addressID="addrID" @on-mounted="(val)=>fetchIndicationTypes(addrsList)"/>
        </div>
        <DropDownBlock class="w-95" title="Добавить тип показаний" :up-down-paddings="15">
            <IndicationTypeForm class="side-margin-10" :addressID="addrID" />
        </DropDownBlock>
        <DropDownBlock class="w-95" title="Удалить тип показаний" :up-down-paddings="15">
            <IndicationTypeDelete class="side-margin-10" :addressID="addrID"/>
        </DropDownBlock>
        <ChartBlock id="indication-chart" :dot-per-pixel="2" :data="data" :mold-function="(arg)=>{return {x:arg[0], y:arg[1], xLabel: arg[2], yLabel: String(arg[1])}}"/>
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