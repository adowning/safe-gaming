<script setup>
const date4 = ref()
const showContactForm = ref(true)
const mindate = new Date()
const maxdate = new Date()
maxdate.setDate(mindate.getDate() + 7)
function move2addons() {
  showContactForm.value = false
}
</script>

<template>
  <div
    v-show="showContactForm" class=" flex flex-col items-start justify-between w-full px-10 pt-2 pb-20 lg:pt-5
    lg:flex-row"
  >
    <div class=" relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12">
      <div class="relative z-10 flex flex-col items-start justify-start p-10 bg-white  rounded-lg">
        <form class="relative w-full mt-6 space-y-8">
          <div class="relative">
            <label class="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">First Name</label>
            <input
              type="text"
              class="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="John"
            >
          </div>
          <div class="relative">
            <label class="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Last Name</label>
            <input
              type="text"
              class="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Doe"
            >
          </div>
          <div class="relative">
            <label class="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Email Address</label>
            <input
              type="text"
              class="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="janedoe@email.com"
            >
          </div>

          <div class="relative">
            <Calendar
              id="date" v-model="date4" class="h-18  rounded-md w-full " :min-date="mindate" :max-date="maxdate"
              :manual-input="false" :show-icon="true"  placeholder="Move in date"
            />
          </div>
          <div class="relative">
            <label class="absolute  font-medium text-gray-600 bg-white">Phone</label>
            <input
              type="text"
              class="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="903 530-9999"
            >
          </div>
          <div class="relative ">
            <button
              class="inline-block w-full px-5 py-4 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 ease"
              @click="move2addons"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

