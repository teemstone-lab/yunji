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
	btnClass="w-[calc(100%-40px)] flex items-center px-2 text-lg font-bold hover:text-blue-600 transition-all"
	data-placement="right-end"
	on:click="{() => (openHosts = true)}"
	><span
		class="mr-2 inline-block h-2 w-2 rounded-full {host.isOn ? 'bg-blue-600' : 'bg-gray-400'}"
	></span>
	<span class="text-rtl inline-block h-full w-auto max-w-full truncate rounded-sm text-left"
		>{host.name}</span
	>
	<span class="shrink-0"> <Chevron /></span>
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
			class="w-full {$views.map((view) => view.id).includes(String(mockHost.id))
				? 'cursor-default text-gray-300 hover:bg-transparent'
				: 'hover:bg-blue-100'}"
			on:click="{() => changeHost(mockHost)}">{mockHost.name}</DropdownItem
		>
	{/each}
</Dropdown>
