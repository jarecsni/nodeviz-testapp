<ul>
	<li><a href="/pages" target="page_holder">Pages</a></li>
	<li><a href="/todo" target="page_holder">Todo App</a></li>
</ul>

<iframe class="pageContent" title="preview" name="page_holder" />

<style>
	.pageContent {
		border: none;
		width: 400px;
		height: 100%;
		margin: 20px;
	}
	ul {
		padding-inline-start: 0;
	}
	ul li {
		display: inline;
		padding: 5px;
	}
</style>

<script>
	// Import F7 Bundle
	import Framework7 from 'framework7/lite';
	// Import F7-Svelte Plugin
	import Framework7Svelte from 'framework7-svelte';
	Framework7.use(Framework7Svelte);
</script>