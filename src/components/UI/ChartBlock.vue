<script setup lang="ts">
    import { parse } from '@vue/compiler-dom';
import { computed, onMounted, onUpdated, ref } from 'vue';

    import type {DataType, MoldFunction as MF} from '../../types';

    export type MoldFunction = MF<any, {x: number, y: number, xLabel: string, yLabel: string}>;

    let chartCanvas: HTMLCanvasElement;
    let chartCanvasCtx: CanvasRenderingContext2D; // Global variable of canvas context

    const props = defineProps<{
        id: string,
        dotPerPixel: number,
        data: Array<DataType>,
        moldFunction: MoldFunction
    }>();

    // Find Ymax and Ymin for current data
    function findAsymptote(data: Iterable<DataType>, moldFunc: MoldFunction): {xMax: number, xMin:number, yMax: number, yMin: number} {
        const extremums = {
            xMax: -Infinity,
            xMin: Infinity,
            yMax: -Infinity,
            yMin: Infinity,
        };
        for (const shard of data) {
            const point = moldFunc(shard);
            extremums.xMax = Math.max(extremums.xMax, Number(point.x));
            extremums.xMin = Math.min(extremums.xMin, Number(point.x));
            extremums.yMax = Math.max(extremums.yMax, Number(point.y));
            extremums.yMin = Math.min(extremums.yMin, Number(point.y));
        };
        return extremums
    }

    
    onMounted(()=>{
        // Initializing
        const canvas = document.getElementById(props.id) as HTMLCanvasElement;
        const container = canvas.parentElement as HTMLElement;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        chartCanvasCtx = ctx; // save the context in a global varialbe
        chartCanvas = canvas; // save the canvas in a global variable
        let xRange = computed<number>(() => props.data.length > 12 ? 12 : props.data.length); // amount steps on the X axis  
        let yRange = 5; // amount steps on the Y axis
        
        // Constants
        const WIDTH = container.scrollWidth;
        const HEIGHT = container.scrollHeight;
        const DPP = props.dotPerPixel; // Dot Per Pixel. Dot density. Clarity of image
        const rem = document.querySelector('html') !== null ? window.getComputedStyle(document.querySelector('html') as HTMLElement).fontSize : '16px'; // CSS unit size - rem
        const PADDING = 1.2 * parseInt(rem);
        const PADDING_RIGHT = 1.0 * PADDING;
        const PADDING_LEFT = 1.5 * PADDING;
        const DRAW_HEIGHT = HEIGHT - 2*PADDING; // Two paddings up and down
        const DRAW_WIDTH = WIDTH - PADDING_LEFT - PADDING_RIGHT; // One left padding
        const extremums = computed<ReturnType<typeof findAsymptote>>(() => findAsymptote(props.data, props.moldFunction)); // xMax, xMin, yMax, yMin in input data
        const xMax = computed<number>(() => extremums.value.xMax);
        const xMin = computed<number>(() => extremums.value.xMin);
        const yMax = computed<number>(() => extremums.value.yMax);
        const yMin = computed<number>(() => extremums.value.yMin);
        const xResolution = computed<number>(() => xMax.value - xMin.value); 
        const yResolution = computed<number>(() => yMax.value - yMin.value);
        const xDensity = computed<number>(() => DRAW_WIDTH / xResolution.value); // Pixel to graphical length ratio
        const yDensity  = computed<number>(() => DRAW_HEIGHT / yResolution.value); // Pixel to graphical length ratio

        // Styling
        canvas.style.height = (HEIGHT?.toString() + "px") || '800px'; 
        canvas.style.width = (WIDTH?.toString() + "px") || '150px';
        canvas.width = WIDTH*DPP; // canvas width resolution
        canvas.height = HEIGHT*DPP; // canvas height resolution
        ctx.scale(DPP, DPP);
        ctx.save();
        const TEXT_COLOR = "rgb(207, 194, 84)";
        const TEXT_STYLE_NOTIFICATION = "2rem sans-serif";
        
        // Markup
        //    Horizontal markup (Y-axis)
        function drawHorizontalMarkup() {
            if (ctx === null) return;
            const markupYStep = DRAW_HEIGHT / yRange; // Y increment
            ctx.strokeStyle = "rgba(58, 187, 200, 0.3)" // Markup lines color
            for (let i = 0; i <= yRange; ++i) {
                const y = i*markupYStep+PADDING; // Y position
                ctx.beginPath();
                ctx.moveTo(PADDING_LEFT, y);
                ctx.font = '0.8rem sans-serif'; // Y axis text
                ctx.fillStyle = TEXT_COLOR; // Y axis text color
                ctx.fillText((yMax.value-i*yResolution.value/yRange).toFixed(0), 0, y-2); // Y axis text (p.s. in "y-2" 2 is pixels padding above the line)
                ctx.lineTo(WIDTH-PADDING_RIGHT, y); // Markup lines
                ctx.stroke();
            }
        }

        //    Vertical markup (X-axis)
        function drawVerticalMarkup() {
            if (ctx === null) return;
            const markupXStep = DRAW_WIDTH / (xRange.value - 1); // X increment
            for (let i = 0; i < xRange.value; ++i) {
                ctx.font = '0.8rem sans-serif'; // X axis text style
                const point = props.moldFunction(props.data[i]); // current point on plain(graph)
                const x = (i - xMin.value) * xDensity.value + PADDING_LEFT; // X position
                const labelMeasures = ctx.measureText(point.xLabel);
                ctx.fillText(
                    point.xLabel,
                    x - (labelMeasures.width/2),
                    DRAW_HEIGHT + PADDING + parseInt(rem)
                );
            }
        }

        // Drawing
        function drawChart() {
            if (ctx === null) return;
            ctx.strokeStyle = "rgb(255, 0, 0)"; // Chart color
            ctx.lineWidth = 3; // Chart line width
            ctx.translate(0, HEIGHT); // Move origin
            ctx.scale(1, -1); // Mirroring y-axis. Make Cartesian coordinate system (origin in bottom left corner).
            ctx.translate(PADDING_LEFT, PADDING); // add paddings for markup
            ctx.beginPath();
            for (let i = 0; i < props.data.length; ++i) {
                const {y} = props.moldFunction(props.data[i]); // tranlate data to distinct type
                ctx.lineTo(
                    (i - xMin.value) * xDensity.value, 
                    (y - yMin.value) * yDensity.value
                )
            }
            ctx.stroke();
            ctx.closePath();
        }
        
        addTextCanvas("Выберите адрес и тип показаний", TEXT_STYLE_NOTIFICATION, TEXT_COLOR)
        
        onUpdated(()=>{
            chartCanvas.width = chartCanvas.width;
            ctx.scale(DPP, DPP);
            if (props.data.length === 0) {
                addTextCanvas("Для данного типа показания не заданы", TEXT_STYLE_NOTIFICATION, TEXT_COLOR)
                return;
            }
            
            drawHorizontalMarkup();
            drawVerticalMarkup();
            drawChart();
        });
        
        // Additional

        // Add text to center of canvas element
        function addTextCanvas(text: string, textStyle: string, textColor: string) {
            if (ctx === null) return;
            ctx.font = textStyle;
            ctx.fillStyle = textColor;
            const textMeasures = ctx.measureText(text);
            ctx.fillText(
                text,
                (WIDTH-textMeasures.width)/2 ,
                (HEIGHT+textMeasures.actualBoundingBoxAscent+textMeasures.actualBoundingBoxDescent)/2,
            )
        } 
    })


</script>

<template>
    <div class="canvas--chart">
        <canvas :id="id">
            <slot></slot>
        </canvas>
    </div>
</template>

<style>

    .canvas--chart {
        width: 100%;
        /* background-color: aliceblue; */
        margin: 0;
        box-sizing: content-box;
    }
    
    canvas {
        padding: 0;
        border: solid 3px;
        border-color: black;
    }

</style>

