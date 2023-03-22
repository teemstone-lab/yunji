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

	.connectOn,
	.connectOff,
	.bottomRealtime {
		display: flex;
		padding-right: 5px;
		border-left: 3px solid #434444;
		padding: 0 5px;
	}
	/* padding-left: 2px; */

	.connectOn span,
	.connectOff span,
	.bottomRealtime span {
		display: flex;
		padding-right: 20px;
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
</style>

<script lang="ts">
	import type { MockHostType, ShowViewerListType } from 'src/store';

	export let isGMT: boolean;
	export let nowDateTime: string;

	export let showListType: ShowViewerListType;
	export let filteredList: {
		on: MockHostType[];
		off: MockHostType[];
	};
</script>

<div class="footer">
	<!-- height : 19px -->

	<div class="hostCount">
		<p>0 host(s) Selected</p>
	</div>
	<button type="button" class="connectOn" on:click="{() => (showListType = 'on')}">
		<p><span class="bottomIcon1"></span>{filteredList.on.length}</p>
	</button>
	<button type="button" class="connectOff" on:click="{() => (showListType = 'off')}">
		<p><span class="bottomIcon2"></span>{filteredList.off ? filteredList.off.length : '-'}</p>
	</button>
	<div class="bottomRealtime">
		<button
			type="button"
			on:click="{() => {
				isGMT = !isGMT;
			}}"><span class="bottomIcon3"></span>{nowDateTime}</button
		>
	</div>
</div>
