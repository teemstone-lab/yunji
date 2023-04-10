<script lang="ts">
	let currentPage = 'index';
	import Index from './pages/index.svelte';
	import WebWorker from './pages/webWorker.svelte';
	import OnTuneViewer from './pages/onTuneViewer.svelte';
	import Nav from './components/nav/Nav.svelte';
	import Calculator from './components/calculator/Calculator.svelte';
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
	{:else if currentPage === 'carouselAnimation'}
		<CarouselAnimation />
	{:else if currentPage === 'onTuneViewer'}
		<OnTuneViewer />
	{:else if currentPage === 'webWorker'}
		<WebWorker />
	{:else if currentPage === 'calculator'}
		<Calculator />
	{/if}
</main>
