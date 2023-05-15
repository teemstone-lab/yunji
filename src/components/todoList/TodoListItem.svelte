<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import type { TodoListItemType } from './todoListStore';
	import { IconCheck, IconPencil, IconTrash, IconXMark } from '../../icons/icons';

	export let deleteTodo: (id: string, showAlert?: boolean) => void;
	export let todo: TodoListItemType;

	export let isEdit: string | undefined;
	export let isNewItem: boolean;

	let isEmpty: boolean = false;

	let isEditThisItem: boolean = false;
	let isNotEditThisItem: boolean = false;

	let editedTitle: string = todo.title;

	const cancelTodo = (id: string) => {
		if (todo.title.trim() === '' || !todo.title) {
			deleteTodo(id);
		} else {
			editedTitle = todo.title;
		}
		isEdit = undefined;
		isNewItem = false;
	};

	const saveTodo = () => {
		if (editedTitle.trim().length > 0) {
			todo.title = editedTitle;
			isEdit = undefined;
			isNewItem = false;
		} else {
			isEmpty = true;
		}
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

	const inputElementOnFocus = (el: HTMLInputElement) => {
		el.focus();
	};

	$: {
		isEditThisItem = isEdit === todo.id;
		isNotEditThisItem = isEdit && isEdit !== todo.id ? true : false;
	}
</script>

<li class="flex h-12 items-center justify-between gap-x-4 rounded-lg bg-white px-4 text-sm">
	<div class="flex h-full w-full max-w-[200px] items-center gap-x-2 hover:cursor-pointer">
		<input
			id="{todo.id}"
			type="checkbox"
			bind:checked="{todo.isDone}"
			class="h-4 w-4 shrink-0 rounded border-indigo-400 checked:bg-indigo-600 hover:cursor-pointer focus:ring-indigo-500 disabled:border-gray-300 disabled:bg-gray-100"
			disabled="{isEditThisItem || isNotEditThisItem}"
		/>
		{#if isEditThisItem}
			<input
				use:inputElementOnFocus
				bind:value="{editedTitle}"
				on:keydown="{(e) => keyPressFunc(String(e.key))}"
				on:mousedown="{() => (isEmpty = false)}"
				class="h-[60%] w-full border-b-2 border-indigo-600 placeholder:text-xs placeholder:text-red-600 focus:outline-0"
				placeholder="{isEmpty ? '내용을 입력해주세요!' : ''}"
				maxlength="{30}"
			/>
		{:else}
			<label
				for="{todo.id}"
				class="{todo.isDone
					? 'font-medium text-gray-400'
					: 'font-semibold text-gray-700'} flex h-full w-full select-none items-center hover:cursor-pointer"
				><p class="flex-1 truncate">{todo.title}</p></label
			>
		{/if}
	</div>

	<div class="flex w-fit shrink-0">
		{#if isEditThisItem}
			<ButtonGroup>
				<Button color="alternative" size="xs" on:click="{() => saveTodo()}"
					><IconCheck width="{18}" height="{18}" /></Button
				>
				<Button color="light" size="xs" on:click="{() => cancelTodo(todo.id)}"
					><IconXMark width="{18}" height="{18}" /></Button
				>
			</ButtonGroup>
		{:else}
			<ButtonGroup>
				<Button
					color="alternative"
					size="xs"
					disabled="{isNotEditThisItem}"
					on:click="{() => (isEdit = todo.id)}"
					><IconPencil width="{18}" height="{18}" solid /></Button
				>
				<Button
					color="red"
					size="xs"
					disabled="{isNotEditThisItem}"
					on:click="{() => {
						deleteTodo(todo.id, true);
					}}"><IconTrash width="{18}" height="{18}" /></Button
				>
			</ButtonGroup>
		{/if}
	</div>
</li>
