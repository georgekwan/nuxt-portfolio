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
        <p class="text-white font-space-mono text-sm">{{ project.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import projectOne from '~/assets/mock-1.jpg';
import projectTwo from '~/assets/mock-2.jpg';
import projectThree from '~/assets/mock-3.jpg';
import projectFour from '~/assets/mock-4.jpg';
import projectFive from '~/assets/mock-5.jpg';
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
        {
          image: {
            url: projectTwo,
          },
          title: 'Project Two',
        },
        {
          image: {
            url: projectThree,
          },
          title: 'Project Three',
        },
        {
          image: {
            url: projectFour,
          },
          title: 'Project Four',
        },
        {
          image: {
            url: projectFive,
          },
          title: 'Project Five',
        },
      ],
    };
  },
};
</script>
