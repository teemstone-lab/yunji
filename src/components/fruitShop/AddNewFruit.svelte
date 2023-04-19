<script lang="ts">
	import { Fruit, additionalFruitsData, fruits } from './fruitShopStore';

	let selected: Fruit;

	$: alreadyAdded = (id: string) => ($fruits.find((fruit) => fruit.id === id) ? true : false);
</script>

<label class="py-5"
	>Add New fruit
	<select
		class="mt-2"
		bind:value="{selected}"
		on:change="{() => {
			fruits.setItem(selected);
		}}"
	>
		<option selected disabled value="default">Choose option</option>

		{#each additionalFruitsData as addFruit (addFruit.id)}
			<option
				value="{addFruit}"
				disabled="{alreadyAdded(String(addFruit.id))}"
				class="disabled:text-gray-300">{addFruit.icon}{addFruit.name}</option
			>
		{/each}
	</select>
</label>
