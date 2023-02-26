<template>
  <div class="bg-black h-screen px-6 py-12">
    <h2 class="text-white font-audiowide text-5xl opacity-0" ref="title">
      MY WORK
    </h2>
    <div class="flex space-x-4">
      <div ref="projects" v-for="project in projects" class="w-full opacity-0">
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
import gsap from 'gsap';
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
  mounted() {
    gsap.to(this.$refs.title, {
      opacity: 1,
      duration: 1.5,
      y: 0,
      ease: 'expo',
    });

    gsap.to(this.$refs.projects, {
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      x: 0,
      ease: 'expo',
      delay: 0.2,
    });
  },
};
</script>
