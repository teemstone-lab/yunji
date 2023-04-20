<script lang="ts">
	import { Shop, fruits } from './fruitShopStore';
	import Fruit from './Fruit.svelte';
	import hexToRgb from '../../lib/hexToRgb';

	export let index: number;
	export let shop: Shop;

	const shopBg = (isHover: boolean | 'duplicate') => {
		switch (isHover) {
			case 'duplicate':
				return 'rgb(249 128 128)';
			case true:
				return hexToRgb(shop.color, 20);
			default:
				return 'transparent';
		}
	};
</script>

<div
	class="flex h-72 w-full flex-col overflow-hidden rounded-xl p-4"
	style="background-color: {shopBg(shop.isHovering)};"
	on:drop
	on:dragover|preventDefault="{() => false}"
>
	<h3
		class="rounded-lg py-2 text-center text-lg font-bold {shop.isHovering === 'duplicate'
			? 'text-red-600'
			: ''}"
		style="background-color: {shop.color};"
		>{shop.isHovering === 'duplicate' ? '이미 있는 과일입니다!' : shop.name}</h3
	>
	{#if shop.fruits.length > 0}
		<ul
			class="customScrollbar grid h-full grid-cols-4 gap-2 overflow-y-auto py-2 pb-6 md:grid-cols-5"
			on:dragenter
			on:dragleave
		>
			{#each shop.fruits as fruit, fruitIndex (fruit.id)}
				<Fruit
					fruit="{fruit}"
					on:dragstart="{(event) =>
						fruits.dragStart(event, fruitIndex, String(fruit.id), index)}"
					on:click="{() => fruits.deleteItem(fruitIndex, index)}"
				/>
			{/each}
		</ul>
	{:else}
		<p
			class="flex h-full select-none items-center justify-center text-2xl font-semibold opacity-30"
			>No Items</p
		>
	{/if}
	<div
		class="h-12 rounded-t-2xl border-[10px] border-b-0 border-red-500"
		style="border-color: {shop.color};"></div>
</div>
