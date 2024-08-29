<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  import { ModeWatcher, resetMode, setMode, toggleMode } from "mode-watcher";
  import Sun from "svelte-radix/Sun.svelte";
  import Moon from "svelte-radix/Moon.svelte";

  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };

  import "../../../app.css"

  let isLoading = false;
</script>

<ModeWatcher />

<div
	class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(Designer.jpeg);"
		/>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;This is an application named householding index
          for indexing your household&rdquo;
				</p>
				<footer class="text-sm">Quote maker</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
        <Button on:click={toggleMode} variant="outline" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
				<h1 class="text-2xl font-semibold tracking-tight">Sign in</h1>
				<p class="text-muted-foreground text-sm">
					Enter your credentials below to sign in
				</p>
			</div>
			<div class={cn("grid gap-6", className)} {...$$restProps}>
        <form method="POST" action="/login/postdata">
          <div class="grid gap-2">
            <div class="grid gap-1">
              <Label class="sr-only" for="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                name="email"
                type="email"
                autocapitalize="none"
                autocomplete="email"
                autocorrect="off"
                disabled={isLoading}
              />
            </div>
            <div class="grid gap-1">
              <Label class="sr-only" for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
                autocapitalize="none"
                autocomplete="password"
                autocorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {#if isLoading}
                <p>loading...</p>
              {/if}
              Sign In
            </Button>
          </div>
        </form>
      </div>
		</div>
	</div>
</div>