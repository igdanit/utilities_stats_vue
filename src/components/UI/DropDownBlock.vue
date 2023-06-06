<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps<{
        title: string,
        upDownPaddings?: number
    }>()

    const isActive = ref(false);

    function onClick(event: Event) {
        isActive.value = !isActive.value;
        const header = (event.target as HTMLElement).closest('div');
        const content = header?.nextSibling as HTMLElement;
        const upDownPaddings = props.upDownPaddings ? props.upDownPaddings : 0

        if (isActive.value) {
            content.style.display = 'block';
        } else {
            setTimeout(() => {
                content.style.display = 'none'; // hide content from user
            },
            500 // .drop-down--content css transition duration 0.5s = 500ms
            ) 
        }

        content.style.height = isActive.value ? content.scrollHeight + 2*upDownPaddings + 'px' : '0px'
        content.style.borderWidth = isActive.value ? '0.15em' : '0'; ///////// FUTURE TEST
   }


</script>

<template>
    <div class="drop-down">
        <div class="drop-down--header btn-neon" @click="onClick">
            <p class="drop-down--title">{{ title }}</p>
        </div>
        <div class="drop-down--content" :class="{'active': isActive}">
            <slot></slot>
        </div>
    </div>
</template>

<style>
    .drop-down--header {
        position: relative;
        color: var(--clr-btn);
        padding: 5px 15px;
        cursor: pointer;
        border: var(--clr-btn) 0.15em solid;
        box-shadow: 0 0 1em 0 var(--clr-btn);
    }
    
    .drop-down--title:before {
        content: '+';
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.3em;
        font-family: serif;
        font-weight: 700;
    }
    
    .drop-down--content {
        position: relative;
        height: 0;
        transition: 0.5s ease;
        box-shadow: 0 0 1em 0 var(--clr-btn);
        border: var(--clr-btn) 0.15em solid;
        border-top: 0;
        opacity: 0;
    }

    
    .drop-down--content.active {
        padding: 15px 0;
        opacity: 1;
    }

</style>