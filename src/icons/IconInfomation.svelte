<script lang="ts">
	import IconFrame from './IconFrame.svelte';
</script>

<!--
@component
@param width - number
@param height - number
@param solid - boolean (solid icon)
@param style - string (using tailwindCSS)
@param strokeWidth - number
-->

<IconFrame props="{$$props}">
	{#if $$props.solid}
		<path
			fill-rule="evenodd"
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
			clip-rule="evenodd"></path>
	{:else}
		<path
			fill-rule="evenodd"
			d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
			clip-rule="evenodd"></path>
	{/if}
</IconFrame>
