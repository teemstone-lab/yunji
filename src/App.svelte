<script lang="ts">
	import Router from 'svelte-spa-router';
	import Index from './pages/index.svelte';
	import WebWorker from './pages/webWorker.svelte';
	import OnTuneViewer from './pages/onTuneViewer.svelte';
	import Nav from './components/nav/Nav.svelte';
	import Calculator from './components/calculator/Calculator.svelte';
	import CarouselCallWorker from './pages/carouselCallWorker.svelte';
	import TodoList from './pages/todoList.svelte';
	import FruitShop from './pages/fruitsShop.svelte';

	const routes = {
		'/': Index,

		'/fruitShop': FruitShop,
		'/todoList': TodoList,
		'/carouselCallWorker': CarouselCallWorker,
		'/onTuneViewer': OnTuneViewer,
		'/webWorker': WebWorker,
		'/calculator': Calculator,
	};
</script>

<Nav />

<main>
	<Router routes="{routes}" />
	<!-- {#if currentPage === 'index'}
		<div class="px-4">
			<Index />
		</div>
	{:else if currentPage === 'fruitShop'}
		<FruitShop />
	{:else if currentPage === 'todoList'}
		<TodoList />
	{:else if currentPage === 'carouselCallWorker'}
		<CarouselCallWorker />
	{:else if currentPage === 'onTuneViewer'}
		<OnTuneViewer />
	{:else if currentPage === 'webWorker'}
		<WebWorker />
	{:else if currentPage === 'calculator'}
		<Calculator />
	{/if} -->
</main>
