<script lang="ts">
	import { IconTrash, IconPencil, IconCheck, IconXMark } from '../../icons/icons';

	enum ButtonType {
		Save = 'Save',
		Edit = 'Edit',
		Delete = 'Delete',
		Cancel = 'Cancel',
	}
	const { Save, Edit, Delete, Cancel } = ButtonType;

	export let title: string;
	export let btnType: ButtonType;
	export let isIcon: boolean = false;
	export let size: string = 'sm';
	export let onClickF: () => void;

	const icon = () => {
		switch (btnType) {
			case Save:
				return 'bg-blue-600 hover:bg-blue-700';
			case Edit:
				return 'bg-blue-600 hover:bg-blue-700';
			case Delete:
				return 'bg-red-600 hover:bg-red-700';
			case Cancel:
				return 'bg-gray-600 hover:bg-gray-700';
			default:
				return '';
		}
	};

	const isIconStyle: string = isIcon
		? `text-gray-600 hover:text-gray-800`
		: `${icon()} border border-dark-900 text-white`;
</script>

<button
	on:click="{() => {
		if (onClickF) {
			onClickF();
		}
	}}"
	class="{`${size === 'sm' ? 'sm text-[10px]' : ''}${
		size === 'lg' ? 'lg text-[20px]' : ''
	} ${isIconStyle} rounded-lg px-2 py-2 transition-all`}"
>
	{#if isIcon}
		{#if btnType === Save}
			<IconCheck width="{18}" height="{18}" />
		{:else if btnType === Edit}
			<IconPencil width="{18}" height="{18}" />
		{:else if btnType === Delete}
			<IconTrash width="{18}" height="{18}" />
		{:else if btnType === Cancel}
			<IconXMark width="{18}" height="{18}" />
		{/if}
	{:else}
		{title}
		{#if !title}<slot />{/if}
	{/if}
</button>
