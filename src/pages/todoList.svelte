<script lang="ts">
	import Layout from '../components/common/Layout.svelte';
	import { Alert } from 'flowbite-svelte';
	import Todo from '../components/todoList/Todo.svelte';
	import { IconInfomation } from '../icons/icons';

	let showAlert: boolean = false;
</script>

<Layout title="TODO List">
	<Todo bind:showAlert="{showAlert}" />
</Layout>

<Alert
	border
	color="green"
	class="absolute inset-x-0 m-4 shadow-lg {showAlert
		? 'top-0 z-10 opacity-100'
		: '-top-20 -z-10 opacity-0'} transition-all"
	on:click="{() => (showAlert = false)}"
>
	<span slot="icon"><IconInfomation /></span>
	<span class="font-semibold">Delete Success!</span>
</Alert>
