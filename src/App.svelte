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
	import { worker } from './mocks/worker';

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

	if (process.env.NODE_ENV === 'development') {
		console.log(window.location.pathname);
		worker
			.start({
				serviceWorker: {
					url: '/mocks/worker.ts',
				},
			})
			.catch((error) => console.error(error));
	}
</script>

<Nav />

<main>
	<Router routes="{routes}" />
</main>
