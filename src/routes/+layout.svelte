<script>import "../app.css";</script>

<nav>
	<a href="/">Home</a>
	<a href="/recipies" data-sveltekit-prefetch>Recipies</a>
	<a href="/recipeingredients" data-sveltekit-prefetch>Recipe ingredients</a>
	<a href="/ingredients" data-sveltekit-prefetch>Ingredients</a>
	<a href="/availableitems" data-sveltekit-prefetch>Availableitems</a>
	<a href="/knownitems" data-sveltekit-prefetch>Knownitems</a>
	<a href="/tags" data-sveltekit-prefetch>Tags</a>
	<a href="/itemtypes" data-sveltekit-prefetch>Itemtypes</a>
	<a href="/measurements" data-sveltekit-prefetch>Measurements</a>
</nav>

<slot></slot>