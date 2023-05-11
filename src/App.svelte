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
	import liquidGaugesView from './pages/liquidGaugesView.svelte';

	const routes = {
		'/': Index,

		'/liquidGaugesView': liquidGaugesView,
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
</main>
