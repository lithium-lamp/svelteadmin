<script>
	import "../../app.css"

	import { Menu, Sidebar } from "./layoutcomponents";

	import Sun from "svelte-radix/Sun.svelte";
	import Moon from "svelte-radix/Moon.svelte";
	import { ModeWatcher, resetMode, setMode, toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";

	let isLoggedIn = false;
</script>

{#if !isLoggedIn}
	<p>You are not logged in</p>
{/if}
{#if isLoggedIn}
<ModeWatcher />
<div class="hidden md:block">
	<Menu />
	<div class="border-t">
		<div class="bg-background">
			<div class="grid lg:grid-cols-5">
				<Sidebar class="hidden lg:block"/>
				<div class="col-span-3 lg:col-span-4 lg:border-l">
					<div class="h-full px-4 py-6 lg:px-8">
						<Button on:click={toggleMode} variant="outline" size="icon">
							<Sun
								class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							/>
							<Moon
								class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
							<span class="sr-only">Toggle theme</span>
						</Button>
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{/if}