<!--
    로딩바
-->
<template>
	<div class="loading-container" v-show="loading">
		<div class="spinner-container">
			<div>
			</div>
			<div>
			</div>
			<div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name : "TheSpinner",
    props: {
        // 로딩 상태 값
        loading: {
            type    : Boolean,
            required: true,
        },
    },
}
</script>

<style scoped>
.loading-container {
    position: absolute;
	top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.spinner-container {
    width: 64px;
    height: 64px;
}

.absolute-wrap .spinner-container {
    position: relative;
    width: 100px;
    height: 100px;
    top: 18px;
    left: 18%;
}

.spinner-container div {
    display: inline-block;
    position: absolute;
    left: 6px;
    width: 13px;
    background: #42b883;
    animation: spinner-container 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.spinner-container div:nth-child(1) {
    left: 6px;
    animation-delay: -0.24s;
}

.spinner-container div:nth-child(2) {
    left: 26px;
    animation-delay: -0.12s;
}

.spinner-container div:nth-child(3) {
    left: 45px;
    animation-delay: 0;
}

@keyframes spinner-container {
    0% {
        top: 6px;
        height: 51px;
    }
    50%, 100% {
        top: 19px;
        height: 26px;
    }
}
</style>