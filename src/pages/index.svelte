<script lang="ts">
	let count = 0;
	const clickHandler = () => {
		count += 1;
	};
</script>

<p>{count}</p>
<div>
	<button on:click="{clickHandler}" class="">button</button>
</div>
