<script lang="ts">
	let currentPage = 'index';
	import Index from './pages/index.svelte';
	import Markup1 from './pages/markup/html1.svelte';
	import Markup2 from './pages/markup/html2.svelte';
	import Markup3 from './pages/markup/html3.svelte';
	import Nav from './components/nav/Nav.svelte';

	type ClickEvent = MouseEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	};
	const clickHandler = (e: ClickEvent) => {
		const target = e.target as HTMLButtonElement;
		currentPage = target.innerText;
	};
</script>

<ul>
	<li><button on:click="{clickHandler}">markup/markup1</button></li>
	<li><button on:click="{clickHandler}">markup/markup2</button></li>
	<li><button on:click="{clickHandler}">markup/markup3</button></li>
</ul>
<Nav />

<main>
	{#if currentPage === 'index'}
		<Index />
	{/if}
	{#if currentPage === 'markup/markup1'}
		<Markup1 />
	{/if}
	{#if currentPage === 'markup/markup2'}
		<Markup2 />
	{/if}
	{#if currentPage === 'markup/markup3'}
		<Markup3 />
	{/if}
</main>
