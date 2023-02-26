<template>
  <div class="bg-black h-screen px-6 py-12">
    <h2 class="text-white font-audiowide text-5xl">MY WORK</h2>
    <div class="flex">
      <div v-for="n in 6">
        <img
          src="~/assets/mock-1.jpg"
          alt="project one"
          style="height: 70vh"
          class="object-cover"
        />
      </div>
    </div>
  </div>
</template>
