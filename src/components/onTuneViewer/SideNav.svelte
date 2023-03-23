<style>
	.sideTab {
		display: flex;
		flex-direction: column;
		width: 500px;
	}

	.hostTab {
		display: flex;
		height: 19px;
		background-color: #4e4e4e;
	}

	.hostTab ul {
		display: flex;
		align-items: center;
	}

	.hostTab ul li {
		display: flex;
		border: 1px solid #3a3a3a;
		padding: 0 4px;
		color: #c0bea4;
		font-size: 8px;
	}

	.hostTab ul li + li {
		display: flex;
	}

	.treeIcon {
		display: flex;
		height: 27px;
		background-color: #424242;
	}

	.treeIcon ul {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.btnBundle2 {
		padding: 0 5px;
		color: #fffefa;
	}
	.btnBundle2 + .btnBundle2 {
		border-left: 3px solid #3e3e3e;
	}

	.treeCon {
		border: 1px solid black;
		width: 25px;
		height: 25px;
	}

	.tree0 {
		width: 25px;
		height: 25px;
		font-size: 14px;
		font-weight: 600;
	}
	.tree1 {
		background: url(/tree1.png);
		width: 25px;
		height: 25px;
		background-size: contain;
	}
	.tree2 {
		background: url(/tree2.png);
		width: 25px;
		height: 25px;
		background-size: contain;
	}

	.tree3 {
		background: url(/tree3.png);
		width: 25px;
		height: 25px;
		background-size: contain;
	}

	.tree4 {
		background: url(/tree4.png);
		width: 25px;
		height: 25px;
		background-size: contain;
	}

	.tree5 {
		background: url(/tree5.png);
		width: 25px;
		height: 25px;
		background-size: contain;
	}
	.hostTree {
		display: flex;
		overflow-y: scroll;
		height: calc(100vh - 146px);
		background-color: #4d4d4d;
		color: #fffefa;
		padding-left: 10px;
	}

	.hostTree::-webkit-scrollbar {
		width: 12px;
	}
	.hostTree::-webkit-scrollbar-track {
		background: #5e5e5e;
		border-radius: 5px;
	}
	.hostTree::-webkit-scrollbar-thumb {
		background-color: #8b8b8b;
		border-radius: 14px;
		border: 2px solid #5e5e5e;
	}
</style>

<script lang="ts">
	import type { MockHostType, ShowViewerListType } from 'src/store';

	export let showListType: ShowViewerListType;
	export let list: MockHostType[];
	export let filteredList: {
		on: MockHostType[];
		off: MockHostType[];
	};

	const btnBundleItems = [
		[0, 1, 2],
		[3, 4, 5],
	];

	const showList = (item: number) => {
		switch (item) {
			case 0:
				showListType = 'all';
				break;
			case 1:
				showListType = 'on';
				break;
			case 2:
				showListType = 'off';
				break;
			default:
				break;
		}
	};

	const buttonTitle = (item: number) => {
		switch (item) {
			case 0:
				return 'View All Hosts';
			case 1:
				return 'View Active Hosts';
			case 2:
				return 'View Disabled Hosts';
			default:
				break;
		}
	};
</script>

<div class="sideTab">
	<div class="hostTab">
		<ul>
			<li>Host</li>
			<li>Groups</li>
			<li>VMWares</li>
			<li>VMWare Groups</li>
			<li>Xens</li>
		</ul>
	</div>
	<div class="treeIcon">
		<ul>
			{#each btnBundleItems as btnBundleItem}
				<li class="btnBundle2">
					<ul>
						{#each btnBundleItem as item}
							<li class="treeCon">
								<button
									title="{buttonTitle(item)}"
									class="tree{item}"
									on:click="{() => showList(item)}"
									>{item === 0 ? 'ALL' : ''}</button
								>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
	<div class="hostTree">
		<ul class="w-full py-2">
			{#each showListType === 'on' ? filteredList.on : showListType === 'off' ? filteredList.off : list as item}
				<li
					><button
						type="button"
						class="flex w-full items-center px-1 transition-all duration-500 hover:bg-gray-700 {item.isOn
							? 'font-semibold opacity-100'
							: 'font-medium opacity-50'}"
					>
						<span
							class="{`mr-2 h-3 w-3 bg-contain bg-no-repeat transition-all duration-500 ${
								item.isOn ? "bg-[url('/bottom1.png')]" : "bg-[url('/bottom2.png')]"
							}`}"></span>{item.name}</button
					></li
				>
			{/each}
		</ul>
	</div>
</div>
