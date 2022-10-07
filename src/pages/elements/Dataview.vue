<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/store/data'
const dataStore = useDataStore()
const tableData = ref([])
function updateTableData() {
  tableData.value = dataStore.storageTypes
  console.log(typeof dataStore.storageTypes[0].features)
  // expandedRows.value = tableData.value.filter((p: { id: any }) => p.id)
}
onMounted(async () => {
  await dataStore.$load({ name: 'data' }).catch(error => console.error(error))

  updateTableData()
})
const products = ref()
const layout = ref('grid')
const sortKey = ref()
const sortOrder = ref()
const sortField = ref()
const sortOptions = ref([
  { label: 'Price High to Low', value: '!price' },
  { label: 'Price Low to High', value: 'price' },
])
const onSortChange = (event) => {
  const value = event.value.value
  const sortValue = event.value

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1
    sortField.value = value.substring(1, value.length)
    sortKey.value = sortValue
  }
  else {
    sortOrder.value = 1
    sortField.value = value
    sortKey.value = sortValue
  }
}
</script>

<template>
  <div class="card">
    <DataView
      :value="products" :layout="layout" :paginator="true" :rows="9" :sort-order="sortOrder"
      :sort-field="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey" :options="sortOptions" option-label="label" placeholder="Sort By Price"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.name">
            <div class="product-list-detail">
              <div class="product-name">
                {{ slotProps.data.name }}
              </div>
              <div class="product-description">
                {{ slotProps.data.description }}
              </div>
              <Rating :model-value="slotProps.data.rating" :readonly="true" :cancel="false" />
              <i class="pi pi-tag product-category-icon" /><span class="product-category">{{ slotProps.data.category
              }}</span>
            </div>
            <div class="product-list-action">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button
                icon="pi pi-shopping-cart" label="Add to Cart"
                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
              />
              <span :class="`product-badge status-${slotProps.data.inventoryStatus}`">{{
                slotProps.data
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </dataview>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: .5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 .5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: .5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: .5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: .5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
