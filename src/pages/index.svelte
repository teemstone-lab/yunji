<script lang="ts">
	let count = 0;

	const a = 1;

	const clickHandler = () => {
		count += 1;
	};
</script>

<p>{count}1</p>
<div>
	<button on:click="{clickHandler}" class="">button</button>
</div>
