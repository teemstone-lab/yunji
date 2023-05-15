<script lang="ts">
	import { Delete, Save as SaveData } from '../../store';
	import { windows, HostDataType, mockHosts } from './liquidGaugesViewStroe';
	import Button from '../common/Button.svelte';
	import Modal from '../common/Modal.svelte';
	import { Alert } from 'flowbite-svelte';
	import { IconInfomation } from '../../icons/icons';

	export let selected: number;
	export let updateShowHosts: () => void;

	let showWindowNum = [2, 4, 6];
	let isSaveData: boolean = localStorage.getItem('hosts') !== null;

	enum AlertType {
		Save = 'Save',
		Load = 'Load',
		Reset = 'Reset',
	}

	let isOpen: boolean = false;
	let showAlert: boolean = false;
	let alertType: AlertType | null;

	const alertState = (type: AlertType) => {
		alertType = type;
		showAlert = true;

		setTimeout(() => {
			alertType = null;
			showAlert = false;
			isOpen = false;
		}, 2600);
	};

	const save = () => {
		localStorage.clear();
		localStorage.setItem('hosts', JSON.stringify($windows));

		isSaveData = true;
		alertState(AlertType.Save);
	};

	const load = () => {
		const data = localStorage.getItem('hosts');

		if (data) {
			$windows = JSON.parse(data) as HostDataType[];

			$windows.forEach((window) => {
				const item = $mockHosts.find((mockHost) => mockHost.id === window.id);

				if (item) item.viewOptions = window.viewOptions;
			});

			selected = $windows.length;
			alertState(AlertType.Load);
		}
	};

	const reset = () => {
		localStorage.clear();
		isSaveData = false;

		alertState(AlertType.Reset);
	};
</script>

<div class="flex items-center gap-x-6">
	<div class="flex items-center gap-x-2">
		<p><strong>Show Window</strong></p>
		{#each showWindowNum as num (num)}
			<label
				><input
					type="radio"
					disabled="{selected === num}"
					value="{num}"
					class="mx-2"
					bind:group="{selected}"
					on:change="{() => updateShowHosts()}"
				/>{num}</label
			>
		{/each}
	</div>
	<Button title="Save" btnType="{SaveData}" size="md" onClickF="{() => save()}" />
	<Button title="Load" disabled="{!isSaveData}" size="md" onClickF="{load}" />
	<Button
		title="Reset"
		btnType="{Delete}"
		disabled="{!isSaveData}"
		size="md"
		onClickF="{() => (isOpen = true)}"
	/>
</div>

<Modal bind:isOpen="{isOpen}" message="Are you sure you want to reset saved view data?">
	<Button title="Reset" btnType="{Delete}" onClickF="{() => reset()}" />
	<Button title="Cancel" onClickF="{() => (isOpen = false)}" />
</Modal>

<Alert
	border
	color="green"
	class="absolute inset-x-0 m-4 shadow-lg {showAlert
		? 'top-0 z-10 opacity-100'
		: '-top-20 -z-10 opacity-0'} transition-all"
	on:click="{() => (showAlert = false)}"
>
	<span slot="icon"><IconInfomation solid /></span>
	<span class="font-semibold">{alertType} Success!</span>
</Alert>
