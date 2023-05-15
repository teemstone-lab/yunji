<style>
	.circle {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		transform: translate3d(0, 0, 0);
	}

	.wave {
		position: absolute;
		border-radius: 45%;
	}

	.circle,
	.circle .wave {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 1500ms;
	}
	.one {
		width: 90%;
		height: 90%;
		left: 16%;
		background: rgba(3, 169, 244, 0.8);
		opacity: 0.3;
		filter: blur(2px);
		mix-blend-mode: plus-lighter;
		animation: move 3s infinite linear;
	}

	.two {
		width: 300%;
		height: 300%;
		left: -76%;
		filter: blur(1px);
		mix-blend-mode: screen;
		animation: move 5s infinite linear;
	}

	.three {
		width: 260%;
		height: 300%;
		left: 0%;
		bottom: -60%;
		border-radius: 46%;
		mix-blend-mode: screen;
		opacity: 0.3;
		filter: blur(8px);
		animation: move 9s infinite linear;
	}

	.four {
		width: 360%;
		height: 360%;
		left: -130%;
		background: white;
		animation: move 7s infinite linear;
	}

	@keyframes move {
		100% {
			transform: rotate(360deg);
		}
	}
</style>

<script lang="ts">
	export let dataName: string;
	export let dataNum: number;
	export let size: number = 160;

	const color = (number: number, opacity: number = 1) => {
		if (number >= 90) {
			return `rgb(240 82 82 / ${opacity})`;
		} else if (number >= 80) {
			return `rgb(255 138 76 / ${opacity})`;
		} else if (number >= 70) {
			return `rgb(250 202 21 / ${opacity})`;
		} else if (number >= 60) {
			return `rgb(49 196 141 / ${opacity})`;
		} else {
			return `rgb(63 131 248 / ${opacity})`;
		}
	};

	$: liquidStyle = (item: number) => {
		switch (item) {
			case 0:
				return `bottom: ${dataNum - 16}%;`;
			case 1:
				return `bottom: ${dataNum}%; background: ${color(dataNum)};`;
			case 2:
				return `background: linear-gradient(${color(dataNum, 0.6)}, ${color(
					dataNum,
					0.1,
				)});`;

			default:
				return `bottom: ${dataNum}%;`;
		}
	};
</script>

<!--
@component
@param dataName - string
@param dataNum - number
@param size - number (width & height)
-->

<div
	class="relative flex flex-col items-center justify-center overflow-hidden rounded-full bg-white text-center transition-all duration-1000 before:absolute before:inset-0 before:z-[1] before:block before:rounded-full before:border-4 before:border-white"
	style="width: {size}px; height: {size}px; border-color: {color(dataNum)}; border-width: {size *
		0.05}px;"
>
	<div
		class="circle before:absolute before:inset-0 before:block before:bg-gradient-to-t before:from-white before:to-transparent before:opacity-50"
		style="background: {color(dataNum)};"
	>
		{#each ['one', 'two', 'three', 'four'] as wave, index (wave)}
			<div class="wave {wave}" style="{liquidStyle(index)}"></div>
		{/each}
	</div>

	<ul class="mix-blend-multiply">
		<li style="font-size: {size * 0.1}px;">{dataName}</li>
		<li
			class="no-bg indent-2 font-semibold brightness-75 transition-all duration-1000"
			style="color: {color(dataNum)}; font-size: {size * 0.2}px;"
		>
			{dataNum}<small style="font-size: {size * 0.085}px;">%</small>
		</li>
	</ul>
</div>
