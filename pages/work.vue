<template>
  <div class="bg-black h-screen px-6 py-12">
    <h2 class="text-white font-audiowide text-5xl">MY WORK</h2>
    <div class="flex space-x-2">
      <div v-for="project in projects" class="">
        <img
          :src="project.image.url"
          alt="project one"
          style="height: 70vh"
          class="object-cover"
        />
        <p class="text-white font-space-mono text-sm">Project One</p>
      </div>
    </div>
  </div>
</template>

<script>
import projectOne from '~/assets/mock-1.jpg';
export default {
  data() {
    return {
      projects: [
        {
          image: {
            url: projectOne,
          },
          title: 'Project One',
        },
      ],
    };
  },
};
</script>
