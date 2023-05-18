<script lang="ts">
	import { Shop, fruits, shops } from './fruitShopStore';
	import Fruit from './Fruit.svelte';
	import ShopTitle from './ShopTitle.svelte';
	import AddNewFruit from './AddNewFruit.svelte';

	export let index: number;
	export let shop: Shop;
</script>

<div
	class="flex h-72 w-full flex-col overflow-hidden rounded-xl p-4"
	style="background-color: {shops.setShopBg(shop)};"
	on:drop
	on:dragover|preventDefault="{() => false}"
>
	<ShopTitle shop="{shop}" />

	{#if shop.fruits.length > 0}
		<ul
			class="customScrollbar grid h-full grid-cols-4 gap-2 overflow-y-auto py-2 pb-6 xl:grid-cols-5"
			on:dragenter
			on:dragleave
		>
			{#each shop.fruits as fruit, fruitIndex (fruit.id)}
				<Fruit
					fruit="{fruit}"
					shop="{shop}"
					on:dragstart="{(event) => {
						fruits.dragStart(event, fruitIndex, String(fruit.id), index);
					}}"
					on:click="{() => fruits.deleteItem(fruitIndex, index)}"
				/>
			{/each}
		</ul>
	{:else}
		<p
			class="flex h-full select-none items-center justify-center text-2xl font-semibold opacity-30"
			on:dragenter
			on:dragleave>No Items</p
		>
	{/if}
	<div
		class="flex h-10 shrink-0 items-center justify-end rounded-t-2xl border-[10px] border-b-0 border-red-500"
		style="border-color: {shop.color};"
	>
		<AddNewFruit shop="{shop}" />
	</div>
</div>
