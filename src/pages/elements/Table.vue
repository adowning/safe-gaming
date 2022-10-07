<!-- eslint-disable vue/no-unused-vars -->
<script setup>
import consola from 'consola'
// import type { UnitClass } from 'types/UnitClass'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import ContactForm from './components/ContactForm.vue'
import Addons from './components/AddOns.vue'
import { useDataStore } from '@/store/data'
import useDataTable from '@/composables/primevue/useDataTable'
const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required },
  date: { required },
  accept: { required },
}
const sortKey = ref()
const sortOrder = ref()
const sortField = ref()
const sortOptions = ref([
  { label: 'Size High to Low', value: '!dimensions.squareFoot' },
  { label: 'Size Low to High', value: 'dimensions.squareFoot' },
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

const date4 = ref()
const mindate = new Date()
const maxdate = new Date()
maxdate.setDate(mindate.getDate() + 7)
console.log(mindate)
console.log(maxdate)
const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  date: '',
  phone: '',
  accept: '',
})
const submitted = ref(false)
const showMessage = ref(false)
const date = ref()

const v$ = useVuelidate(rules, state)
const resetForm = () => {
  state.firstName = ''
  state.lastName = ''
  state.email = ''
  state.date = null
  state.phone = ''
  submitted.value = false
}
const toggleDialog = () => {
  showMessage.value = !showMessage.value

  if (!showMessage.value)
    resetForm()
}

const handleSubmit = (isFormValid) => {
  submitted.value = true

  if (!isFormValid)
    return

  toggleDialog()
}
function submit(data) {
  console.log(data)
  console.log(state)
}
const dataStore = useDataStore()
const { tableData, filters, dataTableRef } = useDataTable()
const expandedRows = ref([])
const unitFeatures = ref([
  { name: 'Climate Controlled', value: 'Climate Controlled' },
  { name: 'Drive-up Access', value: 'Drive-up Access' },
])
const getCallToAction = (data) => {
  // const j = JSON.parse(data)
  // if (j[0] !== undefined)
  //   return j[0].discount.description
}

function getImage(squareFoot) {
  if (Number.isInteger((parseInt(squareFoot) / 25))) { return `/images/${squareFoot}.png` }

  else {
    const num = Math.ceil(parseInt(squareFoot) / 25) * 25
    return `/images/${num}.png`
  }
}

function updateTableData() {
  tableData.value = dataStore.storageTypes
  console.log(typeof dataStore.storageTypes[0].features)
  // expandedRows.value = tableData.value.filter((p: { id: any }) => p.id)
}
const purchaseUnit = (event) => {
  console.log(event.id)
  const isOpen = expandedRows.value.filter(p => p.id === event.id).length > 0
  if (!isOpen) { expandedRows.value = tableData.value.filter(p => p.id === event.id) }

  else {
    expandedRows.value = expandedRows.value.filter((obj) => {
      return obj.id !== event.id
    })
  }
}
// const rowClass = (data) => {
//   return 'row-accessories'
// }
onMounted(async () => {
  await dataStore.$load({ name: 'data' }).catch(error => consola.error(error))

  updateTableData()
})
</script>

<template>
  <DataTable
    ref="dataTableRef" v-model:filters="filters" v-model:expandedRows="expandedRows" data-key="id"
    :sort-order="sortOrder" :sort-field="sortField" :value="tableData" ata-key="name" :row-class="rowClass"
    :global-filter-fields="['features']" paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink
      RowsPerPageDropdown" :rows-per-page-options="[10, 20, 50]"
    current-page-report-template="Showing {first} to {last} of {totalRecords}"
  >
    <!-- <template #header>
      <div class="flex justify-end table-header m-0 p-0">
        <MultiSelect
          v-model="filters" :options="unitFeatures" option-value="value" option-label="name"
          placeholder="Features Filters" display="chip"
        />
      </div>
    </template> -->
    <template #header>
      <div class="grid grid-nogutter">
        <div class="col-6" style="text-align: left">
          <Dropdown
            v-model="sortKey" :options="sortOptions" option-label="label" placeholder="Sort By Size"
            @change="onSortChange($event)"
          />
        </div>
        <!-- <div class="col-6" style="text-align: right">
          <DataViewLayoutOptions v-model="layout" />
        </div> -->
      </div>
    </template>
    <Column header="">
      <template #body="slotProps">
        <img
          :src="getImage(slotProps.data.dimensions.squareFoot)" width="130" :alt="slotProps.data.dimensions"
          class="product-image"
        >
      </template>
      <!-- :src="`/images/${slotProps.dimensions.squareFoot}.png` ?
      `/images/${slotProps.data.dimensions.squareFoot}.png` :
      `/images/50.png`" -->
    </Column>
    <Column>
      <template #body="slotProps">
        <div class="product-list-item">
          <div class="product-list-detail" text-2xl>
            <div class="product-name">
              {{ slotProps.data.dimensions.size }}
            </div>
            <div class="product-description">
              {{ slotProps.data.dimensions.display }}
            </div>
            <span class="product-category">{{ slotProps.data.label }}</span>
          </div>
        </div>
      </template>
    </Column>

    <Column>
      <template #body="slotProps">
        <ul class="list-none p-0 m-0 ">
          <li v-for=" (item, i) of slotProps.data.features" :key="i" class="flex align-items-center ">
            <i class="pi pi-check-circle text-green-500 mr-2 " />
            <span class="text-blue-500">{{ item.display }}</span>
          </li>
        </ul>
      </template>
    </Column>

    <Column>
      <template #body="slotProps">
        <div class=" product-grid-item-content" text-black text-3xl style="font-weight: 800; ">
          ${{ slotProps.data.rates.web }} <span
            text-gray-4 text-
            style="text-decoration: line-through; font-weight: 800;"
          >
            ${{ slotProps.data.rates.street }}
          </span>
          <div text-sm style="font-weight: 400;">
            Online only price
          </div>
        </div>
      </template>
    </Column>

    <Column field="storeprice" header="">
      <template #body="slotProps">
        {{ getCallToAction(slotProps.data.promotions) }}
      </template>
    </Column>

    <Column>
      <template #body="slotProps">
        <div class=" product-grid-item-content" text-black text-3xl style="font-weight: 800; font-size: ">
          <Button
            text="Hold Now" class="bg-green-400 h-10 text-white w-36  font-bold font-sans text-lg border-0"
            @click="purchaseUnit(slotProps.data)"
          />
        </div>
        <div text-sm style="font-weight: 400;">
          No obligation
        </div>
      </template>
    </Column>
    <!-- <t emplate #footer>
      In total there are {{ tableData ? tableData.length : 0 }} products.
    </t> -->
    <template #expansion="slotProps" />
    <div
      class="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap"
    >
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>

        <span class="mx-4 text-gray-700 dark:text-gray-300">Optimize hashtags</span>
      </div>

      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
            clip-rule="evenodd"
          />
        </svg>

        <span class="mx-4 text-gray-700 dark:text-gray-300">Mobile app</span>
      </div>

      <div class="align-items-center hidden lg:flex">
        <span class="line-height-3">Libero voluptatum atque exercitationem {{ slotProps }} provident odit.</span>
      </div>
      <a class="flex align-items-center ml-2 mr-8">
        <a class="text-white" href="#"><span class="underline font-bold">Learn More</span></a>
      </a>
      <a
        v-ripple
        class="flex align-items-center no-underline justify-content-center border-circle text-gray-50 hover:bg-bluegray-700 cursor-pointer transition-colors transition-duration-150 p-ripple"
        style="width:2rem; height: 2rem"
      >
        <i class="pi pi-times" />
      </a>
    </div>
    <section class="bg-white dark:bg-gray-900">
      <div class="container flex flex-col items-center px-4 py-1 mx-auto xl:flex-row">
        <div class="flex justify-center xl:w-1/2">
          <ContactForm />
        </div>
        <div class="flex items-center">
          <!-- <div class="collection-sort">
            <svg
              xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="collection-sort">
            <label>Filter by:</label>
            <label>Filter by:</label>
          </div> -->
          <!-- <span class="mx-2 text-gray-700 dark:text-gray-300">Mobile app</span> -->
        </div>
        <div class="flex-1 xl:mx-8">
          <div class="mt-8 space-y-8 md:-mx-2 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
            <div class="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700">
              <div class="p-6">
                <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">
                  {{ slotProps.data.dimensions.size }}
                </h1>

                <p class="mt-4 text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
                </p>

                <h2 class="mt-3 text-2xl font-medium text-gray-700 sm:text-4xl dark:text-gray-300">
                  $3.00 <span class="text-base font-medium">/Month</span>
                </h2>

                <p class="mt-1 text-gray-500 dark:text-gray-300">
                  Yearly payment
                </p>
              </div>

              <hr class="border-gray-200 dark:border-gray-700">

              <div class="p-3">
                <h1 class="text-lg font-medium text-gray-700 capitalize px-4 lg:text-xl dark:text-white">
                  What’s included:
                </h1>

                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="mx-4 text-gray-700 dark:text-gray-300">All limited links</span>
                  </div>

                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="mx-4 text-gray-700 dark:text-gray-300">Own analytics platform</span>
                  </div>

                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="mx-4 text-gray-700 dark:text-gray-300">Chat support</span>
                  </div>

                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="mx-4 text-gray-700 dark:text-gray-300">Optimize hashtags</span>
                  </div>

                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="mx-4 text-gray-700 dark:text-gray-300">Mobile app</span>
                  </div>

                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="mx-4 text-gray-700 dark:text-gray-300">Unlimited users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </datatable>
  <!-- </div> -->
</template>

<style scoped lang="scss">
.product-grid-item-content {
  text-align: center;
}
.collection-sort {
  display: flex;
  flex-direction: column;
}
::v-deep(.p-datatable .p-datatable-tbody>tr>td){
  text-align: left;
height: 170px;
  min-height: 170px;
  max-height: 170px;
  padding: 0rem 0rem;
}
.p-datatable .p-datatable-tbody>tr>td {
  text-align: left;
  height: 170px;
  min-height: 170px;
  max-height: 170px;
  padding: 0rem 0rem;
}
::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}
</style>
