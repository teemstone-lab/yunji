<script lang="ts">
	import Button from '../common/Button.svelte';

	export let selected: number;
	export let dark: boolean;
	export let updating: boolean;
	export let timerId: NodeJS.Timeout;
	export let updateData: () => void;

	let showWindowNum = [2, 4, 6];
</script>

<div class="flex items-center gap-x-6">
	<Button title="Dark" onClickF="{() => (dark = !dark)}" />
	<ul class="flex items-center gap-1"
		><li> <Button title="Start" disabled="{updating}" onClickF="{() => updateData()}" /> </li>
		<li
			><Button
				title="Stop"
				disabled="{!updating}"
				onClickF="{() => {
					clearInterval(timerId);
					updating = false;
				}}"
			/></li
		>
	</ul>

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
				/>{num}</label
			>
		{/each}
	</div>
</div>
