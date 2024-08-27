<script lang="ts">
	import * as Menubar from "$lib/components/ui/menubar";
</script>

<Menubar.Root class="rounded-none border-b border-none px-2 lg:px-4">
	<Menubar.Menu>
		<Menubar.Trigger class="font-bold">Application</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>About Householdingindex</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Preferences... <Menubar.Shortcut>⌘,</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Hide Tabs... <Menubar.Shortcut>⌘H</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Hide Others... <Menubar.Shortcut>⇧⌘H</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Shortcut />
			<Menubar.Item>
				Quit <Menubar.Shortcut>⌘Q</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger class="relative">File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Sub>
				<Menubar.SubTrigger>New</Menubar.SubTrigger>
				<Menubar.SubContent class="w-[230px]">
					<Menubar.Item>
						Item <Menubar.Shortcut>⌘N</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item disabled>
						Item from Selection <Menubar.Shortcut>⇧⌘N</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>Item Folder</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Item>
				Close Window <Menubar.Shortcut>⌘W</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Library</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.Item>Update Cloud Library</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item>Organize Library...</Menubar.Item>
					<Menubar.Item>Export Library...</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item>Import Item...</Menubar.Item>
					<Menubar.Item disabled>Export Item...</Menubar.Item>
					<Menubar.Item>Show Duplicate Items</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Item>
				Import... <Menubar.Shortcut>⌘O</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Export... <Menubar.Shortcut>⌘E</Menubar.Shortcut>
			</Menubar.Item>
				<Menubar.Separator />
			<Menubar.Item>
				Show in Finder <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>Convert</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Page Setup...</Menubar.Item>
			<Menubar.Item disabled>
				Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item disabled>
				Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item disabled>
				Cut <Menubar.Shortcut>⌘X</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Copy <Menubar.Shortcut>⌘C</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Paste <Menubar.Shortcut>⌘V</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Select All <Menubar.Shortcut>⌘A</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Deselect All <Menubar.Shortcut>⇧⌘A</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				Smart Dictation...
				<Menubar.Shortcut>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="h-4 w-4"
						viewBox="0 0 24 24"
					>
						<path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
						<circle cx="17" cy="7" r="5" />
					</svg>
				</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Emoji & Symbols
				<Menubar.Shortcut>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="h-4 w-4"
						viewBox="0 0 24 24"
					>
						<circle cx="12" cy="12" r="10" />
						<path
							d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
						/>
					</svg>
				</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem checked>Show Dashboard</Menubar.CheckboxItem>
			<Menubar.CheckboxItem checked>Show Items</Menubar.CheckboxItem>
			<Menubar.CheckboxItem checked>Show Recipies</Menubar.CheckboxItem>
			<Menubar.CheckboxItem checked>Show Miscallaneous</Menubar.CheckboxItem>
			<Menubar.Separator />
			<Menubar.Item inset>Hide Sidebar</Menubar.Item>
			<Menubar.Item disabled inset>Enter Full Screen</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger class="hidden md:block">Account</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.Label inset>Switch Account</Menubar.Label>
				<Menubar.Separator />
				<Menubar.RadioGroup value="benoit">
					<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
					<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
					<Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
				</Menubar.RadioGroup>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Item inset>Manage Family...</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item inset>Add Account...</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item inset>Manage settings...</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
