<script lang="ts">
	import Layout from '../common/Layout.svelte';

	let text = 'WOW';
</script>

<Layout title="Input"
	><div class="mx-auto grid w-96 grid-cols-2 items-center gap-x-4">
		<input
			type="text"
			name=""
			id=""
			class="rounded-md border border-gray-200 p-2 focus:outline-blue-600"
			bind:value="{text}"
		/>
		<p class="truncate">
			<span>→</span>
			{text}</p
		>
	</div></Layout
>
