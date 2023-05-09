<script lang="ts">
	import { push } from 'svelte-spa-router';
	import { NavItems } from '../../store';

	const liStyle = 'w-full bg-gray-100 hover:bg-gray-200 transition-all';
	const buttonStyle = 'p-[10px] font-semibold transition-all';
</script>

<ul class="flex w-full items-center justify-between gap-[2px] overflow-x-auto text-sm md:text-base">
	<li class="{liStyle} !w-20">
		<button
			class="bg-gray-500 text-white hover:bg-gray-700 {buttonStyle}"
			on:click="{() => push('/')}">index</button
		>
	</li>
	{#each NavItems as item}
		<li class="{liStyle}">
			<button class="w-full {buttonStyle}" on:click="{() => push(`/${item}`)}">{item}</button>
		</li>
	{/each}
</ul>
