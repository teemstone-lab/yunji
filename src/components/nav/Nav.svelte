<script>
	export let clickHandler;

	const liStyle = 'w-full bg-gray-100 hover:bg-gray-200 transition-all';
	const buttonStyle = 'p-[10px] font-semibold transition-all';
</script>

<div class="mb-[20px] flex items-center justify-between">
	<button
		class="w-20 bg-gray-500 text-white hover:bg-gray-700 {buttonStyle}"
		on:click="{clickHandler}">index</button
	>
	<ul class="flex w-full justify-around gap-[2px]">
		{#each [1, 2, 3] as item (item)}
			<li class="{liStyle}">
				<button class="w-full {buttonStyle}" on:click="{clickHandler}"
					>markup/markup{item}</button
				>
			</li>
		{/each}
	</ul>
</div>
