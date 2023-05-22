<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { HostDataType, viewOptions, views } from '../liquidGaugesViewStroe';
	import { IconCog8Tooth } from '../../../icons/icons';

	export let host: HostDataType;
	export let index: number;

	let openOptions: boolean = false;

	const selectViewType = (prop: any) => {
		const key = prop as Array<keyof HostDataType['data']>;
		$views[index].viewOptions = key;
		// host.viewOptions = key;

		openOptions = false;
	};
</script>

<Button
	btnClass="flex h-full w-12 items-center justify-center transition-all text-gray-500 hover:text-blue-600 shrink-0"
	data-placement="left-start"
	on:click="{() => (openOptions = true)}"><IconCog8Tooth solid /></Button
>

<!-- Options -->
<Dropdown triggeredBy="{openOptions}" open="{openOptions}" frameClass="bg-opacity-90">
	{#each viewOptions as option (option.key)}
		<DropdownItem
			class="w-full {String(option.key) == String(host.viewOptions)
				? 'cursor-default text-gray-300 hover:bg-transparent'
				: 'hover:bg-blue-100'}"
			on:click="{() => selectViewType(option.key)}">{option.name}</DropdownItem
		>
	{/each}
</Dropdown>
