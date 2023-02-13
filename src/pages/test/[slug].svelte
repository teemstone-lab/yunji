<script lang="ts">
	import { params } from '@roxi/routify';

	let slug: string;
	$: {
		if (typeof $params.slug === 'string') slug = $params.slug;
	}
</script>
