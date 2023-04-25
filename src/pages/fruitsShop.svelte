<script lang="ts">
	import Shop from '../components/fruitShop/Shop.svelte';
	import Fruit from '../components/fruitShop/Fruit.svelte';
	import Layout from '../components/common/Layout.svelte';
	import { shops, fruits } from '../components/fruitShop/fruitShopStore';
	import AddNewFruit from '../components/fruitShop/AddNewFruit.svelte';
</script>

<Layout title="Fruit Shop" selectNone="{true}">
	<div class="grid w-full gap-5 md:grid-cols-3">
		{#each $shops as shop, index (shop.id)}
			<Shop
				bind:shop="{shop}"
				index="{index}"
				on:dragenter="{() => shops.setHoveringShop(String(shop.id))}"
				on:dragleave="{() => shops.setHoveringShop(null)}"
				on:drop="{(event) => shops.drop(event, index)}"
			/>
		{/each}
	</div>

	<AddNewFruit />

	<ul class="grid grid-cols-6 gap-2 py-5">
		{#each $fruits as fruit, index (fruit.id)}
			<Fruit
				fruit="{fruit}"
				on:dragstart="{(event) => fruits.dragStart(event, index, String(fruit.id), null)}"
				on:click="{() => fruits.deleteItem(index, null)}"
			/>
		{/each}
	</ul>
</Layout>
