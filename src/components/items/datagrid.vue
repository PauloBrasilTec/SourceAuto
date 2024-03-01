<template>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="this.headers"
      :items-length="totalItems"
      :items="serverItems"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
    ></v-data-table-server>
  </template>

<script>
  const FakeAPI = {
    async fetch ({ page, itemsPerPage, sortBy, items_prop }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const end = start + itemsPerPage
          const items = items_prop.slice()
          if (sortBy.length) {
            const sortKey = sortBy[0].key
            const sortOrder = sortBy[0].order
            items.sort((a, b) => {
              const aValue = a[sortKey]
              const bValue = b[sortKey]
              return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
            })
          }
          const paginated = items.slice(start, end)
          resolve({ items: paginated, total: items.length })
        }, 500)
      })
    },
  }

  export default {
    props: {
        items : Array,
        headers : Array,
    },
    data: () => ({
      items_prop : [],
      itemsPerPage: 10,
      serverItems: [],
      loading: true,
      totalItems: 0,
    }),
    methods: {
      loadItems ({ page, itemsPerPage, sortBy, items_prop  }) {
        this.loading = true
        items_prop = this.items
        FakeAPI.fetch({ page, itemsPerPage, sortBy,items_prop}).then(({ items, total }) => {
          this.serverItems = items
          this.totalItems = total
          this.loading = false
        })
      },
    },
  }
</script>
<!-- 
    exemplo de header personalizado
        headers: [
        {title: 'Dessert (100g serving)',align: 'start',sortable: false,key: 'name',},
        { title: 'Calories', key: 'calories', align: 'end' },
        { title: 'Fat (g)', key: 'fat', align: 'end' },
        { title: 'Carbs (g)', key: 'carbs', align: 'end' },
        { title: 'Protein (g)', key: 'protein', align: 'end' },
        { title: 'Iron (%)', key: 'iron', align: 'end' },
      ],
-->