<style>
	.carousel-options {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 40px 0;
		padding: 20px 0;
		text-align: center;
		position: relative;
		z-index: 2;
		background: hsla(0, 0%, 100%, 0.8);
	}
	.nextPrevBtn {
		/* position: absolute; */
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 4px;
		padding-bottom: 20px;
	}
	.next,
	.prev {
		color: #000;
		padding: 1em 2em;
		cursor: pointer;
		background: #fbfbfb;
		border-radius: 5px;
		opacity: 0.4;
		border: 1px solid #7f7f7f;
		transition: opacity 0.1s, top 0.1s;
	}
	.next:hover,
	.prev:hover {
		opacity: 0.8;
	}
	.next:active,
	.prev:active {
		top: 104px;
		box-shadow: 0 1px 0 #999;
	}
	.next {
		right: 5em;
	}
	.prev {
		left: 5em;
	}

	.actionBtn {
		padding: 8px;
		font-weight: 600;
		border: 1px solid #ccc;
		border-radius: 5px;
		opacity: 0.7;
		transition: 0.3s;
	}
	.actionBtn.stop {
		color: #fff;
		background: rgb(227, 14, 14);
		opacity: 0.5;
	}
	.actionBtn.play {
		color: #fff;
		background: rgb(14, 96, 227);
		opacity: 0.5;
	}
	.actionBtn:hover {
		opacity: 1;
	}
</style>

<script lang="ts">
	import { Carousel, Horizontal, Vertical } from './carousel';
	export let carousel: Carousel;
	export let count: number;
	export let props: {
		rotateCarousel: () => void;
		changeCarousel: () => void;
		onOrientationChange: (radioValue: CellViewType) => void;
		carouselAnimation: () => void;
		animationStart: () => void;
		newCreateCount: () => void;
	};
	const {
		rotateCarousel,
		changeCarousel,
		onOrientationChange,
		carouselAnimation,
		animationStart,
		newCreateCount,
	} = props;

	let isActive: boolean = true;

	type Direction = 'prev' | 'next';
	const directions: Direction[] = ['prev', 'next'];

	enum Action {
		newRandom = 'NEW',
		stop = 'STOP',
		play = 'PLAY',
	}
	const { newRandom, stop, play } = Action;

	// #region Prev-Next button
	const prevNextBtn = (button: Direction) => {
		if (button === 'next') {
			carousel.selectedIndex++;
		}
		if (button === 'prev') {
			carousel.selectedIndex--;
		}
		rotateCarousel();
		carouselAnimation();
	};
	// #endregion Prev-Next button

	// #region cell Range
	const cellRangeHandle = (e: any) => {
		const value: number = ((e as Event).target as HTMLInputElement).value;
		count = value;

		changeCarousel();
	};
	// #endregion cell Range

	// #region Stop / Play button
	const actionFunc = (action: Action) => {
		if (action === 'STOP') {
			carousel.stopCarouselAnimation();
			isActive = false;
		}
		if (action === 'PLAY') {
			animationStart();
			isActive = true;
		}
	};
	// #endregion Stop / Play button
</script>

<div class="carousel-options">
	<ul class="nextPrevBtn">
		{#each directions as button}
			<li>
				<button
					type="button"
					class="{button}"
					on:click="{() => {
						prevNextBtn(button);
					}}">{button}</button
				>
			</li>
		{/each}
	</ul>
	<p>
		<label>
			Cells
			<input
				class="cells-range"
				type="range"
				min="5"
				max="20"
				title="{String(count)}"
				value="{count}"
				on:change="{cellRangeHandle}"
			/>
		</label>
	</p>
	<p>
		<button type="button" class="actionBtn" on:click="{newCreateCount}">{newRandom}</button>

		{#if isActive}
			<button
				type="button"
				class="actionBtn stop"
				on:click="{() => {
					actionFunc(stop);
				}}">{stop}</button
			>
		{:else}
			<button
				type="button"
				class="actionBtn play"
				on:click="{() => {
					actionFunc(play);
				}}">{play}</button
			>
		{/if}
	</p>
	<p>
		Orientation:
		{#each [Horizontal, Vertical] as orientation}
			<label>
				<input
					type="radio"
					name="orientation"
					value="{orientation}"
					checked="{carousel.viewMode === orientation}"
					on:click="{() => onOrientationChange(orientation)}"
				/>
				{orientation}
			</label>
		{/each}
	</p>
</div>
