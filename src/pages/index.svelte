<script lang="ts">
	import Input from '../components/test/Input.svelte';
	import Counter from '../components/test/Counter.svelte';
	import BinarySearchTree from '../components/test/BinarySearchTree.svelte';
	import Calculator from '../components/calculator/Calculator.svelte';

	let isShow = false;
	function showHandler() {
		isShow = !isShow;
	}
</script>

<h1 class="sr-only">TEST Area</h1>
<button type="button" on:click="{showHandler}">{isShow ? 'Calculator' : 'Show others'}</button>
{#if isShow}
	<div class="space-y-12 py-8">
		<Counter />
		<Input />
		<BinarySearchTree />
	</div>
{:else}
	<Calculator />
{/if}
