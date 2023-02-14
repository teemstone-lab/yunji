<script lang="ts">
	import Nav from '../components/nav/Nav.svelte';
	let count = 0;
	const clickHandler = () => {
		count += 1;
	};
</script>

<Nav />
<p>{count}1</p>
<div>
	<button on:click="{clickHandler}" class="">button</button>
</div>
