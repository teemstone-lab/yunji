<script lang="ts">
	import { IconCheck, IconPencil } from '../../icons/icons';
	import type { Shop } from './fruitShopStore';

	export let shop: Shop;

	let isEditMode: boolean = false;

	const titleEditBtnStyle =
		'absolute inset-y-0 right-0 flex h-full w-10 items-center justify-center opacity-30 transition-all hover:opacity-100';
</script>

<h3
	class="relative rounded-lg py-2 text-center text-lg font-bold {shop.isHovering === 'duplicate'
		? 'text-red-600'
		: ''}"
	style="background-color: {shop.color};"
>
	{#if isEditMode}
		<input
			on:keydown="{(e) => (e.key === 'Enter' ? (isEditMode = false) : true)}"
			bind:value="{shop.name}"
			maxlength="15"
			class="bg-white bg-opacity-50"
		/>
		<button
			on:click="{() => (isEditMode = false)}"
			disabled="{shop.name.length === 0}"
			class="{titleEditBtnStyle} text-blue-600 disabled:cursor-not-allowed disabled:text-red-600"
			><IconCheck width="{18}" height="{18}" strokeWidth="{3}" /></button
		>
	{:else}
		<p>{shop.isHovering === 'duplicate' ? '이미 있는 과일입니다!' : shop.name} </p>
		<button on:click="{() => (isEditMode = true)}" class="{titleEditBtnStyle}"
			><IconPencil width="{15}" height="{15}" solid="{true}" /></button
		>
	{/if}
</h3>
