<script lang="ts">
	import IconFrame from './IconFrame.svelte';

	export let width: number = 20;
	export let height: number = 20;
	export let strokeWidth: number = 1.5;
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
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="{strokeWidth}"
		stroke="currentColor"
		width="{width}"
		height="{height}"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
	</svg>
</IconFrame>
