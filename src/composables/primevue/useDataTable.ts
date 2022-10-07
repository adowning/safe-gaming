import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'

export default () => {
  // @ts-expect-error Need Error Masking
  const tableData: Ref<any[]> = ref([])
  const filters = ref({
    // global: { value: null, matchMode: FilterMatchMode.IN },
    // features: { value: null, matchMode: FilterMatchMode.EQUALS },
    features: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  })

  const dataTableRef = ref<HTMLElement | null>(null)

  function exportCSV() {
    // @ts-expect-error Need Error Masking
    dataTableRef.value.exportCSV()
  }

  return {
    tableData, filters, dataTableRef, exportCSV,
  }
}
