<script lang="ts">
    import {
        createTable,
        Render,
        Subscribe,
        createRender
    } from "svelte-headless-table";
    import {
        addPagination,
        addSortBy,
        addTableFilter,
        addHiddenColumns,
        addSelectedRows,
    } from "svelte-headless-table/plugins";
    import { readable } from "svelte/store";
    import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
    import ChevronDown from "lucide-svelte/icons/chevron-down";
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./data-table-actions.svelte";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import DataTableCheckbox from "./data-table-checkbox.svelte";
    import * as Dialog from "$lib/components/ui/dialog";

    import Check from "svelte-radix/Check.svelte";
    import CaretSort from "svelte-radix/CaretSort.svelte";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import { cn } from "$lib/utils.js";

    const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit"
    },
    {
      value: "next.js",
      label: "Next.js"
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js"
    },
    {
      value: "remix",
      label: "Remix"
    },
    {
      value: "astro",
      label: "Astro"
    }
  ];

    let open = false;
    let value = "";

    $: selectedValue =
    frameworks.find((f) => f.value === value)?.label ?? "Select a framework...";

    function closeAndFocusTrigger(triggerId: string) {
      open = false;
      tick().then(() => {
        document.getElementById(triggerId)?.focus();
      });
    }

    type Tag = {
        id: bigint;
        created_at: number;
        itemtype: bigint;
        name: string;
        version: number;
    };
    type Metadata = {
        current_page: number;
        page_size: number;
        first_page: number;
        last_page: number;
        total_records: number;
    };

    export let tags : Tag[];
    export let tags_metadata: Metadata;

    const table = createTable(readable(tags), {
        page: addPagination(),
        sort: addSortBy(),
        filter: addTableFilter({
            fn: ({ filterValue, value }) =>
                value.toLowerCase().includes(filterValue.toLowerCase()),
        }),
        hide: addHiddenColumns(),
        select: addSelectedRows(),
    });

    const columns = table.createColumns([
        table.column({
            accessor: "id",
            header: (_, { pluginStates }) => {
                const { allPageRowsSelected } = pluginStates.select;
                return createRender(DataTableCheckbox, {
                    checked: allPageRowsSelected,
                });
            },
            cell: ({ row }, { pluginStates }) => {
                const { getRowState } = pluginStates.select;
                const { isSelected } = getRowState(row);
        
                return createRender(DataTableCheckbox, {
                    checked: isSelected,
                });
            },
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: false,
                },
            },
        }),
        table.column({
            accessor: "created_at",
            header: "Created at",
            plugins: {
                sort: {
                    disable: false,
                },
                filter: {
                    exclude: false,
                },
            },
        }),
        table.column({
            accessor: "itemtype",
            header: "Item type",
            plugins: {
                sort: {
                    disable: false,
                },
                filter: {
                    exclude: false,
                },
            },
        }),
        table.column({
            accessor: "name",
            header: "Name",
            plugins: {
                sort: {
                    disable: false,
                },
                filter: {
                    exclude: false,
                },
            },
        }),
        table.column({
            accessor: "version",
            header: "Version",
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: ({ id }) => id,
            header: "",
            cell: ({ value }) => {
                return createRender(DataTableActions, { id: value });
            },
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: true,
                },
            },
        }),
    ]);

    const { 
        headerRows,
        pageRows,
        tableAttrs,
        tableBodyAttrs,
        pluginStates,
        flatColumns,
        rows,
    } = table.createViewModel(columns);
    
    const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
    const { filterValue } = pluginStates.filter;
    const { hiddenColumnIds } = pluginStates.hide;
    const { selectedDataIds } = pluginStates.select;

    const ids = flatColumns.map((col) => col.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => !hide)
        .map(([id]) => id);

    const hidableCols = ["created_at", "itemtype", "name", "version"];
</script>

<div class="w-full">
    <div class="flex items-center py-4">
        <Input
          class="max-w-sm"
          placeholder="Filter names..."
          type="text"
          bind:value={$filterValue}
        />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button variant="outline" class="ml-auto" builders={[builder]}>
            Columns <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {#each flatColumns as col}
            {#if hidableCols.includes(col.id)}
              <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
                {col.header}
              </DropdownMenu.CheckboxItem>
            {/if}
          {/each}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
<div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe
                    attrs={cell.attrs()}
                    let:attrs
                    props={cell.props()}
                    let:props
                >
                    <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    {#if cell.id === "version"}
                        <div class="text-right">
                            <Render of={cell.render()} />
                        </div>
                    {:else if cell.id === "created_at" || cell.id === "itemtype"
                    || cell.id === "name"}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                          <Render of={cell.render()} />
                          <ArrowUpDown class={"ml-2 h-4 w-4"} />
                      </Button>
                    {:else}
                        <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row
                {...rowAttrs}
                data-state={$selectedDataIds[row.id] && "selected"}
            >
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    {#if cell.id === "version"}
                        <div class="text-right font-medium">
                            <Render of={cell.render()} />
                        </div>
                    {:else if cell.id === "created_at" || cell.id === "itemtype"
                    || cell.id === "name"}
                        <div class="capitalize">
                            <Render of={cell.render()} />
                        </div>
                    {:else}
                        <Render of={cell.render()} />
                    {/if}
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <div class="text-muted-foreground flex-1 text-sm">
        {Object.keys($selectedDataIds).length} of{" "}
        {$rows.length} row(s) selected.
    </div>
    <div class="text-muted-foreground flex-1 text-sm">
      Current page {tags_metadata.current_page}/{tags_metadata.last_page}.
    </div>
    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "additive" })}
        >Add</Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Add tag</Dialog.Title>
          <Dialog.Description>
            Input values for new tag.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="itemtype" class="text-right">Item type</Label>
            <Input id="itemtype" value="" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="tagname" class="text-right">Name</Label>
            <Input id="tagname" value="" class="col-span-3" />
          </div>
        </div>
        <Dialog.Footer>
          <Button variant="additive" type="submit">Add tag</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "update" })}
        >Update</Dialog.Trigger
      >
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Update tag</Dialog.Title>
          <Dialog.Description>
            Input new values for selected tag.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="itemtypeupdate" class="text-right">Item type</Label>
            <Input id="itemtypeupdate" value="" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="tagnameupdate" class="text-right">Name</Label>
            <Input id="tagnameupdate" value="" class="col-span-3" />
          </div>
        </div>
        <Dialog.Footer>
          <Button variant="update" type="submit">Update tag</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "destructive" })}
        >Delete</Dialog.Trigger
      >
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Delete tags</Dialog.Title>
          <Dialog.Description>
            Delete selected tags.
          </Dialog.Description>
        </Dialog.Header>
        
        <Dialog.Footer>
          <Button variant="destructive" type="submit">Delete tags</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>