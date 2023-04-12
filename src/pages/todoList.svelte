<script lang="ts">
	import type { TodoList } from 'src/components/todoList/todoListStore';
	import Layout from '../components/common/Layout.svelte';
	import Todo from '../components/todoList/Todo.svelte';

	let title: string = '';
	let todos: Array<TodoList> = [];
	let isEdit: boolean = false;

	const createTodo = () => {
		todos.push({
			id: String(self.crypto.randomUUID()),
			title,
		});
		isEdit = true;
		todos = todos;
		title = '';
	};
</script>

<Layout title="TODO List">
	<div
		class="relative flex h-[540px] w-full flex-col space-y-4 rounded-xl bg-gray-100 p-4 shadow-xl shadow-gray-200 md:w-1/3"
	>
		<div
			><input
				type="search"
				class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
				placeholder="Search"
			/></div
		>
		<ul class="customScrollbar h-full w-full space-y-4 overflow-y-scroll pb-20">
			{#each todos as todo (todo.id)}
				<Todo bind:todos="{todos}" todo="{todo}" isEdit="{isEdit}" />
			{/each}
		</ul>
		<div class="absolute inset-x-0 -bottom-0 z-10 py-4 text-center">
			<button
				title="Add button"
				on:click="{createTodo}"
				class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 p-4 text-white shadow-lg shadow-gray-300 transition-all duration-100 hover:bg-indigo-700"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"
					></path>
				</svg>
			</button>
		</div>
	</div></Layout
>
