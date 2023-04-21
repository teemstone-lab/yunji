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
	<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path>
</IconFrame>
