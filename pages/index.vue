<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div
      id="container"
      class="absolute text-white text-center w-full max-w-2xl px-6"
      style="
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
        width: 100;
        color: #fff;
      "
    >
      <h1
        id="georgekwan"
        class="font-Audiowide text-sm uppercase tracking-wide opacity-0"
        style="transform: translateY(30px)"
      >
        George Kwan
      </h1>
      <p
        id="aboutMe"
        class="font-Play text-4xl opacity-0"
        style="transform: translateY(30px)"
      >
        EMBRACE OPPORTUNITIES, AND FOLLOW CURIOSITY.
      </p>
      <a
        id="viewWorkBtn"
        href="https://github.com/georgekwan"
        class="border px-4 py-2 rounded-lg text-sm font-Audiowide uppercase mt-8 hover:bg-white hover:text-gray-800 inline-block opacity-0"
        style="transform: translateY(30px)"
      >
        View Work
      </a>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';
import gsap from 'gsap';

export default {
  mounted() {
    // const gui = new dat.GUI();
    const world = {
      plane: {
        width: 400,
        height: 400,
        widthSegments: 81,
        heightSegments: 81,
      },
    };
    // gui.add(world.plane, 'width', 1, 500).onChange(generatePlane);
    // gui.add(world.plane, 'height', 1, 500).onChange(generatePlane);
    // gui.add(world.plane, 'widthSegments', 1, 100).onChange(generatePlane);
    // gui.add(world.plane, 'heightSegments', 1, 100).onChange(generatePlane);

    function generatePlane() {
      planeMesh.geometry.dispose();
      planeMesh.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments
      );

      // vertice position randomization
      const { array } = planeMesh.geometry.attributes.position;
      const randomValues = [];
      for (let i = 0; i < array.length; i++) {
        if (i % 3 === 0) {
          const x = array[i];
          const y = array[i + 1];
          const z = array[i + 2];

          array[i] = x + (Math.random() - 0.5) * 3;
          array[i + 1] = y + (Math.random() - 0.5) * 3;
          array[i + 2] = z + (Math.random() - 0.5) * 3;
        }

        randomValues.push(Math.random() * Math.PI * 2);
      }

      planeMesh.geometry.attributes.position.randomValues = randomValues;
      planeMesh.geometry.attributes.position.originalPosition =
        planeMesh.geometry.attributes.position.array;

      const colors = [];
      for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
        colors.push(0.16, 0.18, 0.45);
      }

      planeMesh.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      );
    }

    const raycaster = new THREE.Raycaster();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.canvas,
    });

    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    // document.body.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);
    camera.position.z = 50;

    const planeGeometry = new THREE.PlaneGeometry(
      world.plane.width,
      world.plane.height,
      world.plane.widthSegments,
      world.plane.heightSegments
    );
    const planeMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: true,
      vertexColors: true,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);
    generatePlane();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, -1, 1);
    scene.add(light);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 0, -1);
    scene.add(backLight);

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    console.log(randomColor);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: '#' + randomColor });
    // const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVerticies = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVerticies.push(x, y, z);
    }
    console.log(starVerticies);

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVerticies, 3)
    );

    console.log(starGeometry);
    console.log(starMaterial);

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const mouse = {
      x: undefined,
      y: undefined,
    };

    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      raycaster.setFromCamera(mouse, camera);
      frame += 0.01;

      const { array, originalPosition, randomValues } =
        planeMesh.geometry.attributes.position;
      for (let i = 0; i < array.length; i += 3) {
        // x
        array[i] =
          originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01;

        // y
        array[i + 1] =
          originalPosition[i + 1] +
          Math.sin(frame + randomValues[i + 1]) * 0.001;
      }

      planeMesh.geometry.attributes.position.needsUpdate = true;

      const intersects = raycaster.intersectObject(planeMesh);
      if (intersects.length > 0) {
        const { color } = intersects[0].object.geometry.attributes;

        // vertice 1
        color.setX(intersects[0].face.a, 0.1);
        color.setY(intersects[0].face.a, 0.5);
        color.setZ(intersects[0].face.a, 1);

        // vertice 2
        color.setX(intersects[0].face.b, 0.1);
        color.setY(intersects[0].face.b, 0.5);
        color.setZ(intersects[0].face.b, 1);

        // vertice 3
        color.setX(intersects[0].face.c, 0.1);
        color.setY(intersects[0].face.c, 0.5);
        color.setZ(intersects[0].face.c, 1);

        intersects[0].object.geometry.attributes.color.needsUpdate = true;

        const initialColor = {
          r: 0.16,
          g: 0.18,
          b: 0.45,
        };

        const hoverColor = {
          r: 0.87,
          g: 0.19,
          b: 0.52,
        };

        gsap.to(hoverColor, {
          r: initialColor.r,
          g: initialColor.g,
          b: initialColor.b,
          duration: 1,
          onUpdate: () => {
            // vertice 1
            color.setX(intersects[0].face.a, hoverColor.r);
            color.setY(intersects[0].face.a, hoverColor.g);
            color.setZ(intersects[0].face.a, hoverColor.b);

            // vertice 2
            color.setX(intersects[0].face.b, hoverColor.r);
            color.setY(intersects[0].face.b, hoverColor.g);
            color.setZ(intersects[0].face.b, hoverColor.b);

            // vertice 3
            color.setX(intersects[0].face.c, hoverColor.r);
            color.setY(intersects[0].face.c, hoverColor.g);
            color.setZ(intersects[0].face.c, hoverColor.b);
            color.needsUpdate = true;
          },
        });
      }
      stars.rotation.x += 0.0006;
    }

    animate();

    addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    });

    gsap.to('#georgekwan', {
      opacity: 1,
      duration: 1.5,
      y: 0,
      ease: 'expo',
    });
    gsap.to('#aboutMe', {
      opacity: 1,
      duration: 1.5,
      delay: 0.3,
      y: 0,
      ease: 'expo',
    });
    gsap.to('#viewWorkBtn', {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
      y: 0,
      ease: 'expo',
    });

    document.querySelector('#viewWorkBtn').addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to('#container', {
        opacity: 0,
      });

      gsap.to(camera.position, {
        z: 25,
        ease: 'power3.inOut',
        duration: 2,
      });
      gsap.to(camera.rotation, {
        x: 1.57,
        ease: 'power3.inOut',
        duration: 2,
      });
      gsap.to(camera.position, {
        y: 1000,
        ease: 'expo.in',
        duration: 1.5,
        delay: 2,
        onComplete: () => {
          this.$router.push('/work');
          // window.location = 'https://github.com/georgekwan';
        },
      });
    });

    addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  },
};
</script>

<style></style>
