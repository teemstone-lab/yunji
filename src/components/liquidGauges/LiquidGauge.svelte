<script lang="ts">
	export let viewOption: string;
	export let selectedData: number;

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
</script>

<div
	class="relative flex h-40 w-40 flex-col items-center justify-center overflow-hidden rounded-full border-8 text-center before:absolute before:inset-0 before:z-[1] before:block before:rounded-full before:border-4 before:border-white"
	style="border-color: {color(selectedData)};"
>
	<ul class="relative z-[1]">
		<li>{viewOption}</li>
		<li
			class="indent-2 text-3xl font-semibold brightness-75"
			style="color: {color(selectedData)};"
		>
			{selectedData}<small class="text-sm">%</small>
		</li>
	</ul>

	<div
		class="absolute bottom-0 w-full bg-blue-500 transition-all"
		style="height: {selectedData}%; background-color: {color(selectedData, 0.3)};"></div>
</div>
