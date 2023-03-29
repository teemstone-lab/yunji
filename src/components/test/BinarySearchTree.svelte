<script lang="ts">
	import Layout from '../common/Layout.svelte';

	const binarySearchTree = ['전위순회', '중위순회', '후위순회'];
	let selectedButton: string;
	let result: number[] = [];

	function solution(v: number, btnIndex: number) {
		let answer: number[] = [];

		function DFS(vv: number) {
			if (vv > 8) return;
			else {
				if (btnIndex < 1) {
					answer.push(vv);
					DFS(vv * 2); // 왼쪽
					DFS(vv * 2 + 1); // 오른쪽
				} else if (btnIndex > 1) {
					DFS(vv * 2); // 왼쪽
					DFS(vv * 2 + 1); // 오른쪽
					answer.push(vv);
				} else {
					DFS(vv * 2); // 왼쪽
					answer.push(vv);
					DFS(vv * 2 + 1); // 오른쪽
				}
			}
		}
		DFS(v);
		selectedButton = binarySearchTree[btnIndex];
		result = answer;

		return;
	}
</script>

<Layout title="Binary Search Tree"
	><div class="flex flex-col items-center justify-center space-y-10">
		<img src="https://t1.daumcdn.net/cfile/tistory/205D8C4E5100C94522" alt="Binary tree" />
		<small>* 순서 확인용 넘버링</small>
		<p class="h-12 space-x-2 text-xl font-semibold">
			{#if result.length > 0}{#each result as item, index}
					<span class="{item === 1 ? 'text-red-600' : ''}">{item}</span>
				{/each}
			{:else}
				👇 Click Button 👇
			{/if}</p
		>
		<ul class="flex w-80 justify-around">
			{#each binarySearchTree as item, index}
				<li>
					<button
						type="button"
						class="{selectedButton === item
							? 'bg-gray-200 font-semibold hover:bg-gray-300'
							: 'hover:bg-gray-200'} rounded-md border p-4 text-sm transition-all"
						on:click="{() => solution(1, index)}">{item}</button
					>
				</li>
			{/each}
		</ul>
	</div>
</Layout>
