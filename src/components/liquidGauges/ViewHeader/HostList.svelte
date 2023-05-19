<script lang="ts">
	import { Button, Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { HostDataType, mockHosts, views } from '../liquidGaugesViewStroe';

	export let host: HostDataType;
	export let index: number;

	let openHosts: boolean = false;

	const changeHost = (selectedHost: any) => {
		$views[index] = selectedHost as HostDataType;

		openHosts = false;
	};

	$: filteredMockHosts = $mockHosts.filter(
		(mockHost) => !$views.map((view) => view.id).includes(mockHost.id),
	);
</script>

<Button
	btnClass="w-[calc(100%-40px)] flex flex-col px-3 text-lg font-bold hover:text-blue-600 transition-all text-left"
	data-placement="right-end"
	on:click="{() => (openHosts = true)}"
>
	<p class="flex h-full w-full items-center rounded-sm">
		<span
			class="mr-2 inline-block h-2 w-2 shrink-0 rounded-full {host.isOn
				? 'bg-blue-600'
				: 'bg-gray-400'}"></span>
		<span class="text-rtl h-full w-auto max-w-full truncate rounded-sm px-1">{host.name}</span>
		<span class="shrink-0"> <Chevron /></span>
	</p>
	<small class="w-auto max-w-full shrink-0 truncate pl-5 text-xs font-normal text-gray-500"
		>{host.id}</small
	>
</Button>

<!-- Host List -->
<Dropdown
	triggeredBy="{openHosts}"
	open="{openHosts}"
	frameClass="customScrollbar w-full max-h-40 overflow-y-auto rounded-lg border bg-white bg-opacity-90 shadow-lg"
	class="w-full"
>
	{#each filteredMockHosts as mockHost (mockHost.id)}
		<DropdownItem
			class="flex w-full flex-col {$views.map((view) => view.id).includes(String(mockHost.id))
				? 'cursor-default text-gray-300 hover:bg-transparent'
				: 'hover:bg-blue-100'}"
			on:click="{() => changeHost(mockHost)}"
			><span>{mockHost.name}</span>
			<small class="shrink-0 font-normal text-gray-500">{mockHost.id}</small></DropdownItem
		>
	{/each}
</Dropdown>
