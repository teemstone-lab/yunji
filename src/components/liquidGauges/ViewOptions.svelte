<script lang="ts">
	import Button from '../common/Button.svelte';

	export let selected: number;
	export let dark: boolean;
	export let updateShowHosts: () => void;

	let showWindowNum = [2, 4, 6];
</script>

<div class="flex items-center gap-x-6">
	<Button title="Dark" onClickF="{() => (dark = !dark)}" />

	<div class="flex items-center gap-x-2">
		<p><strong>Show Window</strong></p>
		{#each showWindowNum as num (num)}
			<label
				><input
					type="radio"
					disabled="{selected === num}"
					value="{num}"
					class="mx-2"
					bind:group="{selected}"
					on:change="{() => updateShowHosts()}"
				/>{num}</label
			>
		{/each}
	</div>
</div>
