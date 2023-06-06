<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import type {DataType, MoldFunction as MF} from '../../types';

    type MoldFunction = MF<any, {x: number, y: number, xLabel: string, yLabel: string}>;

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
        let xRange = props.data.length > 12 ? 12 : props.data.length; // amount steps on the X axis  
        let yRange = 5; // amount steps on the Y axis
        
        // Constants
        const WIDTH = container.scrollWidth;
        const HEIGHT = container.scrollHeight;
        const DPP = props.dotPerPixel; // Dot Per Pixel. Dot density. Clarity of image
        const rem = document.querySelector('html') !== null ? window.getComputedStyle(document.querySelector('html') as HTMLElement).fontSize : '16px'; // CSS unit size - rem
        const PADDING = 1.2 * parseInt(rem);
        const PADDING_RIGHT = 1.0 * PADDING;
        const DRAW_HEIGHT = HEIGHT - 2*PADDING; // Two paddings up and down
        const DRAW_WIDTH = WIDTH - PADDING - PADDING_RIGHT; // One left padding
        const {xMax, xMin, yMax, yMin} = findAsymptote(props.data, props.moldFunction); // xMax, xMin, yMax, yMin in input data
        const xResolution = xMax - xMin; 
        const yResolution = yMax - yMin;
        const xDensity = DRAW_WIDTH / xResolution; // Pixel to graphical length ratio
        const yDensity  = DRAW_HEIGHT / yResolution; // Pixel to graphical length ratio

        // Styling
        canvas.style.height = (HEIGHT?.toString() + "px") || '800px'; 
        canvas.style.width = (WIDTH?.toString() + "px") || '150px';
        canvas.width = WIDTH*DPP; // canvas width resolution
        canvas.height = HEIGHT*DPP; // canvas height resolution
        ctx.scale(DPP, DPP);
        ctx.save();
        
        // Markup
        //    Vertical markup (Y-axis)
        const markupYStep = DRAW_HEIGHT / yRange; // Y increment
        ctx.strokeStyle = "rgba(58, 187, 200, 0.3)" // Markup lines color
        for (let i = 0; i <= yRange; ++i) {
            const y = i*markupYStep+PADDING; // Y position
            ctx.beginPath();
            ctx.moveTo(PADDING, y);
            ctx.font = '0.8rem sans-serif'; // Y axis text
            ctx.fillStyle = "rgb(207, 194, 84)"; // Y axis text color
            ctx.fillText((yMax-i*yResolution/yRange).toFixed(0), 0, y-2); // Y axis text (p.s. in "y-2" 2 is pixels padding above the line)
            ctx.lineTo(WIDTH-PADDING_RIGHT, y); // Markup lines
            ctx.stroke();
        }
        //    Horiztontal markup (X-axis)
        const markupXStep = DRAW_WIDTH / (xRange - 1); // X increment
        for (let i = 0; i < xRange; ++i) {
            ctx.font = '0.8rem sans-serif'; // X axis text style
            const point = props.moldFunction(props.data[i]); // current point on plain(graph)
            const x = (point.x - xMin) * xDensity + PADDING; // X position
            const labelMeasures = ctx.measureText(point.xLabel);
            ctx.fillText(
                point.xLabel,
                x - (labelMeasures.width/2),
                DRAW_HEIGHT + PADDING + parseInt(rem)
            );
        }

        // Drawing
        ctx.strokeStyle = "rgb(255, 0, 0)"; // Chart color
        ctx.lineWidth = 3; // Chart line width
        ctx.translate(0, HEIGHT); // Move origin
        ctx.scale(1, -1); // Mirroring y-axis. Make Cartesian coordinate system (origin in bottom left corner).
        ctx.translate(PADDING_RIGHT, PADDING); // add paddings for markup
        ctx.beginPath();
        for (let i = 0; i < props.data.length; ++i) {
            const {x, y} = props.moldFunction(props.data[i]); // tranlate data to distinct type
            ctx.lineTo(
                (x - xMin) * xDensity, 
                (y - yMin) * yDensity
            )
        }
        ctx.stroke();
        ctx.closePath();

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

