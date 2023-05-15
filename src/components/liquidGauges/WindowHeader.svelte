<script lang="ts">
	import { HostDataType, mockHosts, windows } from './liquidGaugesViewStroe';
	import { IconCog8Tooth } from '../../icons/icons';
	import { Button, Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';

	export let host: HostDataType;
	export let viewOptions: Array<keyof HostDataType['data']>;
	export let index: number;

	let openHosts: boolean = false;
	let openOptions: boolean = false;

	const options = [
		{ key: ['cpu'], name: 'CPU' },
		{ key: ['mem'], name: 'Memory' },
		{ key: ['cpu', 'mem'], name: 'CPU + Memory' },
	];

	const selectData = (prop: any) => {
		const key = prop as Array<keyof HostDataType['data']>;
		host.viewOptions = key;
		viewOptions = key;

		$windows[index].viewOptions = viewOptions;

		openOptions = false;
	};

	const changeHost = (selectedHost: any) => {
		$windows[index] = selectedHost as HostDataType;

		openHosts = false;
	};

	$: filteredMockHosts = $mockHosts.filter(
		(mockHost) => !$windows.map((window) => window.id).includes(mockHost.id),
	);
</script>

<div
	class="relative flex h-10 w-full items-center justify-between border-b bg-white bg-opacity-80 shadow-lg shadow-gray-50"
>
	<!-- Host List -->
	<Button
		btnClass="w-[calc(100%-40px)] flex items-center px-2 text-lg font-bold hover:text-blue-600 transition-all"
		data-placement="right-end"
		on:click="{() => (openHosts = !openHosts)}"
		><span
			class="mr-2 inline-block h-2 w-2 rounded-full {host.isOn
				? 'bg-blue-600'
				: 'bg-gray-400'}"></span>
		<span class="text-rtl inline-block h-full w-auto max-w-full truncate rounded-sm text-left"
			>{host.name}</span
		>
		<span class="shrink-0"> <Chevron /></span>
	</Button>
	<Dropdown
		triggeredBy="{openHosts}"
		open="{openHosts}"
		frameClass="customScrollbar w-full max-h-40 overflow-y-auto rounded-lg border bg-white bg-opacity-90 shadow-lg"
		class="w-full"
	>
		{#each filteredMockHosts as mockHost (mockHost.id)}
			<DropdownItem
				class="w-full {$windows.map((window) => window.id).includes(String(mockHost.id))
					? 'cursor-default text-gray-300 hover:bg-transparent'
					: 'hover:bg-blue-100'}"
				on:click="{() => changeHost(mockHost)}">{mockHost.name}</DropdownItem
			>
		{/each}
	</Dropdown>

	<!-- Options -->
	<Button
		btnClass="flex h-full w-10 items-center justify-center transition-all text-gray-500 hover:text-blue-600 shrink-0"
		data-placement="left-start"
		on:click="{() => (openOptions = !openOptions)}"><IconCog8Tooth solid /></Button
	>
	<Dropdown triggeredBy="{openOptions}" open="{openOptions}" frameClass="bg-opacity-90">
		{#each options as option (option.key)}
			<DropdownItem
				class="w-full {option.key == viewOptions
					? 'cursor-default text-gray-300 hover:bg-transparent'
					: 'hover:bg-blue-100'}"
				on:click="{() => selectData(option.key)}">{option.name}</DropdownItem
			>
		{/each}
	</Dropdown>
</div>
