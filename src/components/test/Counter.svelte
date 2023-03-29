<script lang="ts">
	import Layout from '../common/Layout.svelte';

	let count = 0;
	const clickHandler = (add?: boolean) => {
		if (add) {
			count += 1;
		} else {
			if (count > 0) count -= 1;
		}
	};
	const resetHandler = () => {
		count = 0;
	};
</script>

<Layout title="Count button"
	><div class="flex flex-col items-center justify-center space-y-2">
		<ul
			class="flex w-48 items-center justify-between space-x-4 rounded-full bg-gray-100 py-2 px-4 text-2xl font-semibold "
		>
			<li> <button on:click="{() => clickHandler(true)}" class="">➕</button> </li>
			<li> {count} </li>
			<li>
				<button
					on:click="{() => clickHandler(false)}"
					class="{count === 0 ? 'opacity-50 hover:cursor-default' : ''}">➖</button
				>
			</li>
		</ul>
		<button
			type="button"
			class="text-sm text-red-600 opacity-50 transition-all hover:opacity-100"
			on:click="{resetHandler}">RESET</button
		>
	</div></Layout
>
