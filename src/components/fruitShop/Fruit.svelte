<script lang="ts">
	import type { Fruit } from './fruitShopStore';

	export let fruit: Fruit;
	let isShowDeleteBtn: boolean = false;
</script>

<li
	title="{fruit.name}"
	class="relative flex h-16 w-16 items-center justify-center text-4xl transition-all duration-500 hover:cursor-move {isShowDeleteBtn
		? 'bg-gray-200'
		: 'bg-transparent'}"
	draggable="{true}"
	on:dragstart
	on:mouseover="{() => (isShowDeleteBtn = true)}"
	on:mouseleave="{() => {
		isShowDeleteBtn = false;
		fruit.isHovering = false;
	}}"
	><span>{fruit.icon}</span>
	<button
		class="{isShowDeleteBtn
			? 'translate-y-5 opacity-100'
			: 'translate-y-0  opacity-0'} absolute bottom-0 z-10 w-full bg-red-600 px-1 text-sm text-white transition-all delay-300 duration-700 hover:bg-red-800"
		on:click>DELETE</button
	>
</li>
