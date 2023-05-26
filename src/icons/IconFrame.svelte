<script lang="ts">
	export let props: SvelteAllProps;

	let width: number = Number(props.width) || 20;
	let height: number = Number(props.height) || 20;
	let style: string = props.style ? String(props.style) : '';
	let strokeWidth: number = Number(props.strokeWidth) || 1.5;
	let solid: boolean = Boolean(props.solid) || false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="{solid ? 'currentColor' : 'none'}"
	viewBox="0 0 24 24"
	stroke-width="{solid ? '0' : strokeWidth}"
	stroke="{solid ? 'none' : 'currentColor'}"
	width="{width}"
	height="{height}"
	class="{style}"
>
	<slot />
</svg>
