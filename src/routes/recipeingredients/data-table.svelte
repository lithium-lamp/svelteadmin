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
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import DataTableCheckbox from "./data-table-checkbox.svelte";

    type Recipeingredient = {
        recipe_id: bigint;
        ingredient_id: bigint;
        created_at: number;
        amount: number;
        measurement: bigint;
        version: number;
    };
    type Metadata = {
        current_page: number;
        page_size: number;
        first_page: number;
        last_page: number;
        total_records: number;
    };

    export let recipeingredients : Recipeingredient[];
    export let recipeingredients_metadata: Metadata;

    console.log(recipeingredients_metadata.current_page + ", " + recipeingredients_metadata.page_size + ", " +
    recipeingredients_metadata.first_page + ", " + recipeingredients_metadata.last_page + ", " +
    recipeingredients_metadata.total_records);

    const table = createTable(readable(recipeingredients), {
        page: addPagination(),
        sort: addSortBy(),
        filter: addTableFilter({
            fn: ({ filterValue, value }) =>
                value.toLowerCase().includes(filterValue.toLowerCase()),
        }),
        hide: addHiddenColumns(),
        select: addSelectedRows(),
    });

    let id: any;

    const columns = table.createColumns([
        table.column({
            accessor: ({ recipe_id, ingredient_id }) => id,
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
            accessor: "amount",
            header: "Amount",
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
            accessor: "measurement",
            header: "Measurement",
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
            accessor: ({ recipe_id, ingredient_id }) => [recipe_id, ingredient_id],
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

    const hidableCols = ["created_at", "amount", "measurement", "version"];
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
                    {:else if cell.id === "created_at" || cell.id === "amount"
                    || cell.id === "measurement"}
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
                    {:else if cell.id === "created_at" || cell.id === "amount"
                    || cell.id === "measurement"}
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