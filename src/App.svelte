<script lang="ts">
	let currentPage = 'index';
	import Index from './pages/index.svelte';
	import WebWorker from './pages/webWorker.svelte';
	import OnTuneViewer from './pages/onTuneViewer.svelte';
	import Nav from './components/nav/Nav.svelte';
	import Calculator from './components/calculator/Calculator.svelte';
	import CarouselCallWorker from './pages/carouselCallWorker.svelte';
	import TodoList from './pages/todoList.svelte';
	import FruitShop from './pages/FruitShop.svelte';

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
	{/if}
	<!-- 일반 else 의 경우도  -->
</main>
