<script lang="ts">
	import { Search, Button } from 'flowbite-svelte';
	import { IconXMark } from '../../icons/icons';

	export let updateTodoList: () => void;
	export let searchKeyword: string;
	export let isSearch: boolean;
	export let isEdit: string | undefined;
	export let isLoading: boolean;

	const debounce = (func: () => void, timeout = 500) => {
		let timerId: NodeJS.Timeout;
		return () => {
			clearTimeout(timerId);
			isLoading = true;
			timerId = setTimeout(() => {
				isLoading = false;
				func();
			}, timeout);
		};
	};

	const saveInput = () => {
		isSearch = true;
		isEdit = undefined;

		updateTodoList();
	};

	const searchTodo = debounce(() => saveInput());

	const cancelSearch = () => {
		searchKeyword = '';
		isSearch = false;
		updateTodoList();
	};
</script>

<div class="relative">
	<Search
		size="md"
		on:keyup="{searchTodo}"
		bind:value="{searchKeyword}"
		disabled="{isEdit}"
		maxLength="{30}"
		class="pr-10"
	>
		{#if searchKeyword && searchKeyword.length > 0}
			<Button
				class="border-0 !bg-transparent !px-1 text-gray-600 transition-all hover:text-gray-800 focus:outline-0 focus:ring-transparent"
				size="xs"
				on:click="{cancelSearch}"><IconXMark width="{18}" height="{18}" /></Button
			>
		{/if}
	</Search>
</div>
