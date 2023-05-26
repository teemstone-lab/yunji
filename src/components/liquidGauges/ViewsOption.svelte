<script lang="ts">
	import { Delete, Save as SaveData } from '../../store';
	import { displayedHosts, HostDataType, mockHosts, autoLoad } from './liquidGaugesViewStroe';
	import Button from '../common/Button.svelte';
	import Modal from '../common/Modal.svelte';
	import { Alert, Toggle, Tooltip } from 'flowbite-svelte';
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

	const autoLoadToggle = (e: any) => {
		$autoLoad = ((e as Event).target as HTMLInputElement).checked;
	};

	const alertState = (type: AlertType) => {
		alertType = type;
		showAlert = true;

		setTimeout(() => {
			alertType = null;
			showAlert = false;
		}, 2600);
	};

	const save = () => {
		localStorage.clear();
		localStorage.setItem('hosts', JSON.stringify($displayedHosts));
		localStorage.setItem('isAutoLoad', JSON.stringify($autoLoad));

		isSaveData = true;
		alertState(AlertType.Save);
	};

	const load = () => {
		const data = localStorage.getItem('hosts');

		if (data) {
			autoLoad.getIsAutoLoadState();
			$displayedHosts = JSON.parse(data) as HostDataType[];

			$displayedHosts.forEach((view) => {
				const item = $mockHosts.find((mockHost) => mockHost.id === view.id);

				if (item) item.viewOptions = view.viewOptions;
			});

			selected = $displayedHosts.length;
			alertState(AlertType.Load);
		}
	};

	const reset = () => {
		localStorage.clear();
		isSaveData = false;
		isOpen = false;

		alertState(AlertType.Reset);
	};
</script>

<div class="flex flex-col items-center justify-between gap-y-5 py-4 md:flex-row md:gap-y-0">
	<!-- Show Window -->
	<div class="flex items-center gap-x-1">
		<p><strong>Number of windows</strong></p>
		<IconInfomation width="{16}" height="{16}" style="text-gray-400" />
		<Tooltip class="font-normal text-gray-100">나타낼 화면의 갯수를 지정합니다.</Tooltip>
		{#each showWindowNum as num (num)}
			<label class="select-none"
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

	<!-- Buttons -->
	<div class="flex flex-col items-center gap-x-5 gap-y-5 md:flex-row md:gap-y-0">
		<div class="flex select-none items-center gap-x-1">
			<Toggle
				size="small"
				checked="{$autoLoad}"
				on:change="{(e) => autoLoadToggle(e)}"
				class="cursor-pointer">자동 불러오기</Toggle
			>

			<IconInfomation width="{16}" height="{16}" style="text-gray-400" />
			<Tooltip class="font-normal text-gray-100"
				>해당 기능을 활성화 하고 저장하면, 새로고침시 저장된 데이터를 자동으로 불러옵니다.</Tooltip
			>
		</div>
		<ul class="flex items-center gap-x-2">
			<li>
				<Button title="Save" btnType="{SaveData}" size="md" onClickF="{() => save()}" />
			</li>
			<li> <Button title="Load" disabled="{!isSaveData}" size="md" onClickF="{load}" /> </li>
			<li
				><Button
					title="Reset"
					btnType="{Delete}"
					disabled="{!isSaveData}"
					size="md"
					onClickF="{() => (isOpen = true)}"
				/></li
			>
		</ul>
	</div>
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
