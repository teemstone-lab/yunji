<style>
	.footer {
		display: flex;
		align-items: center;
		height: 19px;
		padding: 0 5px;
		gap: 5px;
		background-color: #353636;
	}
	.footer p,
	.footer button {
		display: flex;
		align-items: center;
		margin-right: 20px;
		color: #ffffea;
		font-size: 10px;
	}

	.allItems,
	.connectOn,
	.connectOff,
	.bottomRealtime {
		display: flex;
		padding-right: 5px;
		border-left: 3px solid #434444;
		padding: 0 5px;
	}
	/* padding-left: 2px; */

	.allItems span,
	.connectOn span,
	.connectOff span,
	.bottomRealtime span {
		display: flex;
		padding-right: 20px;
	}

	.bottomAll {
		width: 14px;
		height: 14px;
		font-weight: 600;
	}

	.bottomIcon1 {
		background: url(/bottom1.png) no-repeat;
		width: 14px;
		height: 14px;
		background-size: contain;
	}

	.bottomIcon2 {
		background: url(/bottom2.png) no-repeat;
		width: 14px;
		height: 14px;
		background-size: contain;
	}

	.bottomIcon3 {
		background: url(/bottom3.png) no-repeat;
		width: 14px;
		height: 14px;
		background-size: contain;
	}

	@media (max-width: 768px) {
		.bottomRealtime {
			display: none;
		}
	}
</style>

<script lang="ts">
	import type { MockHostType, ShowViewerListType } from 'src/store';

	export let isGMT: boolean;
	export let nowDateTime: string;

	export let showListType: ShowViewerListType;
	export let list: MockHostType[];
	export let filteredList: {
		on: MockHostType[];
		off: MockHostType[];
	};

	export let viewFilterHandler: () => void;
</script>

<div class="footer">
	<!-- height : 19px -->

	<div class="hostCount">
		<p>0 host(s) Selected</p>
	</div>
	<button
		title="View All Hosts"
		type="button"
		class="allItems"
		on:click="{() => (showListType = 'all')}"
		on:click="{viewFilterHandler}"
	>
		<p><span class="bottomAll">ALL</span>{list.length}</p>
	</button>
	<button
		title="View Active Hosts"
		type="button"
		class="connectOn"
		on:click="{() => (showListType = 'on')}"
		on:click="{viewFilterHandler}"
	>
		<p><span class="bottomIcon1"></span>{filteredList.on.length}</p>
	</button>
	<button
		title="View Disabled Hosts"
		type="button"
		class="connectOff"
		on:click="{() => (showListType = 'off')}"
		on:click="{viewFilterHandler}"
	>
		<p><span class="bottomIcon2"></span>{filteredList.off ? filteredList.off.length : '-'}</p>
	</button>
	<div class="bottomRealtime group relative">
		<small
			class="absolute bottom-5 hidden rounded bg-slate-200 bg-opacity-70 px-1 text-xs group-hover:block"
			>{isGMT ? '❗클릭 시 로컬 타임으로 전환' : '❗클릭 시 UTC로 전환'}</small
		>
		<button
			type="button"
			on:click="{() => {
				isGMT = !isGMT;
			}}"><span class="bottomIcon3"></span>{nowDateTime}</button
		>
	</div>
</div>
