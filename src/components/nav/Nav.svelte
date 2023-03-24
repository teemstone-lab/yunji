<script lang="ts">
	type ClickEvent = MouseEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	};
	export let clickHandler: (e: ClickEvent) => void;

	const liStyle = 'w-full bg-gray-100 hover:bg-gray-200 transition-all';
	const buttonStyle = 'p-[10px] font-semibold transition-all';
</script>

<ul class="flex w-full items-center justify-between gap-[2px] overflow-x-auto text-sm md:text-base">
	<li class="{liStyle} !w-20">
		<button
			class="bg-gray-500 text-white hover:bg-gray-700 {buttonStyle}"
			on:click="{clickHandler}">index</button
		></li
	>
	<li class="{liStyle}">
		<button class="w-full {buttonStyle}" on:click="{clickHandler}">onTuneViewer</button>
	</li>
	<li class="{liStyle}">
		<button class="w-full {buttonStyle}" on:click="{clickHandler}">webWorker</button>
	</li>
	{#each [1, 2, 3] as item (item)}
		<li class="{liStyle}">
			<button class="w-full {buttonStyle}" on:click="{clickHandler}"
				>markup/markup{item}</button
			>
		</li>
	{/each}
</ul>
