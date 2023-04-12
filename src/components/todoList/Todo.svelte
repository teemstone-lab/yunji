<script lang="ts">
	import { Delete, Edit } from '../../store';
	import Button from '../common/Button.svelte';

	// import Button from '../button/Button.svelte';
	import type { TodoList } from './todoListStore';

	export let todos: TodoList[];
	export let todo: TodoList;

	export let isEdit: boolean;

	let editedTitle: string = todo.title;

	const saveTodo = () => {
		todo.title = editedTitle;
		isEdit = !isEdit;
	};

	const deleteTodo = (id: string) => {
		todos = todos.filter((t) => t.id !== id);
	};

	const cancelTodo = (id: string) => {
		if (todo.title.trim() === '') {
			deleteTodo(id);
		} else {
			editedTitle = todo.title;
		}
		isEdit = !isEdit;
	};

	const keyPressFunc = (key: string) => {
		switch (key) {
			case 'Enter':
				saveTodo();
				break;
			case 'Escape':
				cancelTodo(todo.id);
				break;
		}
	};
</script>

<li class="flex h-12 items-center justify-between gap-x-4 rounded-lg bg-white px-4">
	<div class="flex h-full w-full items-center gap-x-2 hover:cursor-pointer">
		<input
			id="{todo.id}"
			type="checkbox"
			bind:value="{todo.title}"
			class="h-4 w-4 flex-shrink-0 hover:cursor-pointer"
			disabled="{isEdit}"
		/>
		{#if isEdit}
			<input
				bind:value="{editedTitle}"
				on:keydown="{(e) => keyPressFunc(String(e.key))}"
				autofocus="{isEdit}"
				class="h-[60%] w-full border-b-2 border-indigo-600 focus:outline-0"
			/>
		{:else}
			<label
				for="{todo.id}"
				class="inline-flex h-full w-full select-none items-center hover:cursor-pointer"
				>{todo.title}</label
			>
		{/if}
	</div>
	<div class="flex flex-shrink-0">
		{#if isEdit}
			<button on:click="{saveTodo}">Save</button>
			<button on:click="{() => cancelTodo(todo.id)}">Cancel</button>
		{:else}
			<!-- <button on:click="{() => (isEdit = !isEdit)}">Edit</button> -->
			<!-- <button on:click="{() => deleteTodo(todo.id)}">Delete</button> -->
			<!-- <Button text="Edit" color="#00f" onClickF="{() => (isEdit = !isEdit)}" />
			<Button text="Delete" color="#f00" onClickF="{() => deleteTodo(todo.id)}" /> -->
			<Button title="Edit" btnType="{Edit}" isIcon onClickF="{() => (isEdit = !isEdit)}" />
			<Button
				title="Delete"
				btnType="{Delete}"
				isIcon
				onClickF="{() => deleteTodo(todo.id)}"
			/>
		{/if}
	</div>
</li>
