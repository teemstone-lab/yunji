<script lang="ts">
	let currentPage = 'index';
	import Index from './pages/index.svelte';
	import WebWorker from './pages/webWorker.svelte';
	import OnTuneViewer from './pages/onTuneViewer.svelte';
	import Nav from './components/nav/Nav.svelte';
	import Calculator from './components/calculator/Calculator.svelte';
	// import WorkerAnimation from './pages/workerAnimation.svelte';
	import CarouselAnimation from './pages/carouselAnimation.svelte';

	type ClickEvent = MouseEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	};
	const clickHandler = (e: ClickEvent) => {
		const target = e.target as HTMLButtonElement;
		currentPage = target.innerText;
	};
</script>

<Nav clickHandler="{clickHandler}" />

<main>
	{#if currentPage === 'index'}
		<div class="px-4">
			<Index />
		</div>
	{/if}
	<!-- {#if currentPage === 'workerAnimation'}
		<WorkerAnimation />
	{/if} -->
	{#if currentPage === 'carouselAnimation'}
		<CarouselAnimation />
	{/if}
	{#if currentPage === 'onTuneViewer'}
		<OnTuneViewer />
	{/if}
	{#if currentPage === 'webWorker'}
		<WebWorker />
	{/if}
	{#if currentPage === 'calculator'}
		<Calculator />
	{/if}
</main>
