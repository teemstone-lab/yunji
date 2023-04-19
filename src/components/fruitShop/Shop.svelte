<script lang="ts">
	import { Shop, fruits } from './fruitShopStore';
	import Fruit from './Fruit.svelte';

	export let index: number;
	export let shop: Shop;

	const shopBg = (isHover: boolean | 'duplicate') => {
		switch (isHover) {
			case 'duplicate':
				return 'bg-red-400';
			case true:
				return 'bg-yellow-200';
			default:
				return 'bg-gray-100';
		}
	};
</script>

<div
	class="w-full rounded-xl p-4 {shopBg(shop.isHovering)}"
	on:dragenter
	on:dragleave
	on:drop
	on:dragover|preventDefault="{() => false}"
>
	<h3 class="text-lg font-bold">{shop.name}</h3>
	<ul class="grid grid-cols-5 gap-2">
		{#each shop.fruits as fruit, fruitIndex (fruit.id)}
			<Fruit
				name="{fruit.name}"
				icon="{fruit.icon}"
				on:dragstart="{(event) =>
					fruits.dragStart(event, fruitIndex, String(fruit.id), index)}"
			/>
		{/each}
	</ul>
</div>
