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
	<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
</IconFrame>
