<template>
    <span class="skeleton-box" :style="{width: width + '%'}"></span>
</template>

<script>
    export default {
        name: "CoreSkeleton",
        props: {
            width: {
                type: Number,
                default: 100
            }
        }
    }
</script>

<style scoped lang="scss">
    .skeleton-box {
        display: inline-block;
        height: 22px;
        position: relative;
        overflow: hidden;
        background-color: #DDDBDD;
        border-radius: 4px;

    &::after {
         position: absolute;
         top: 0;
         right: 0;
         bottom: 0;
         left: 0;
         transform: translateX(-100%);
         background-image: linear-gradient(
                 90deg,
                 rgba(#fff, 0) 0,
                 rgba(#fff, 0.2) 20%,
                 rgba(#fff, 0.5) 60%,
                 rgba(#fff, 0)
         );
         animation: shimmer 2s infinite;
         content: '';
     }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
    }
</style>