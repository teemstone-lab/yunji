<style>
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 37px;
		background-color: #424242;
	}

	.topButton {
		display: flex;
	}

	.topButton ul {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.icon {
		border: 1px solid black;
		width: 36px;
		height: 36px;
		/* border: 0.5px solid white; */
	}

	.btnBundle .icon8-2 {
		/* border: 1px solid black; */
		width: 13px;
		height: 36px;
		margin-left: 1px;
	}

	.btnBundle {
		padding: 0 5px;
	}

	.btnBundle + .btnBundle {
		border-left: 3px solid #3b3b3b;
	}

	.btnBundle li + li {
		margin-left: 5px;
	}

	.icon1 {
		background: url(/top1.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon2 {
		background: url(/top2.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon3 {
		background: url(/top3.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon4 {
		background: url(/top4.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon5 {
		background: url(/top5.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon6 {
		background: url(/top6.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon7 {
		background: url(/top7.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon8 {
		background: url(/top8.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon8-2 {
		background: url(/top8-2.png);
		width: 13px;
		height: 36px;
		background-size: contain;
	}

	.icon9 {
		background: url(/top9.png);
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon10 {
		background: url(/top10.png);
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon11 {
		background: url(/top11.png);
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	.icon12 {
		background: url(/top12.png);
		width: 36px;
		height: 36px;
		background-size: contain;
	}
	.topTimetable {
		display: flex;
		gap: 10px;
		color: white;
		font-size: 11px;
		font-weight: bold;
	}

	.topRealtime {
		display: flex;
		align-items: center;
	}
	.topClock {
		display: flex;
		border: 1px solid black;
		width: 36px;
		height: 36px;
	}

	.top-right0 {
		background: url(/top-right0.png) no-repeat;
		width: 36px;
		height: 36px;
		background-size: contain;
	}

	@media (max-width: 1024px) {
		.head {
			height: 29px;
		}
		.btnBundle .icon8-2 {
			/* border: 1px solid black; */
			width: 11px;
			height: 28px;
		}
		.icon {
			width: 28px;
			height: 28px;
		}
		.icon1,
		.icon2,
		.icon3,
		.icon4,
		.icon5,
		.icon6,
		.icon7,
		.icon8,
		.icon9,
		.icon10,
		.icon11,
		.icon12 {
			width: 28px;
			height: 28px;
		}
		.icon8-2 {
			width: 13px;
			height: 28px;
		}
		.topClock {
			width: 28px;
			height: 28px;
		}

		.top-right0 {
			width: 28px;
			height: 28px;
		}
	}

	@media (max-width: 768px) {
		.head {
			flex-wrap: wrap;
			height: 59px;
			overflow: hidden;
		}
		.topButton {
			width: 80%;
		}
		.topButton ul {
			flex-wrap: wrap;
			justify-content: flex-start;
		}
		.btnBundle {
			padding: 0;
		}
		.topTimetable {
			width: 20%;
			padding-right: 16px;
			justify-content: space-between;
		}
		.topRealtime > p {
			display: none;
		}

		.topClock {
			width: 36px;
			height: 36px;
		}

		.top-right0 {
			width: 36px;
			height: 36px;
		}
	}
</style>

<script lang="ts">
	export let isGMT: boolean;
	export let nowDateTime: string;

	const btnBundleItems = [[1, 2], [3, 4], [5, 6, 7], [8, '8-2', 9, 10, 11], [12]];
</script>

<div class="head">
	<!--  -->
	<div class="topButton">
		<ul>
			{#each btnBundleItems as btnBundleItem}<li class="btnBundle">
					<ul>
						{#each btnBundleItem as item}
							<li class="icon{typeof item === 'string' ? item : ''}">
								<button class="icon{item}"></button>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
	<!--  -->
	<div class="topTimetable group relative">
		<small
			class="absolute top-8 hidden rounded bg-slate-200 bg-opacity-70 px-1 text-xs font-normal text-black group-hover:md:block"
			>{isGMT ? '❗클릭 시 로컬 타임으로 전환' : '❗클릭 시 UTC로 전환'}</small
		>
		<button
			class="topRealtime"
			on:click="{() => {
				isGMT = !isGMT;
			}}"
		>
			<p>· Realtime: {nowDateTime}</p>
		</button>
		<div class="topClock">
			<button class="top-right0"></button>
		</div>
	</div>
</div>
