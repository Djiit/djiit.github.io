<template>
  <Layout>
    <div
      class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between py-16"
    >
      <div class="text-3xl font-bold w-full sm:w-3/5 text-center sm:text-left">
        <div class="text-blue-700 leading-tight">
          {{ $static.metaData.siteDescription }}
        </div>
      </div>
    </div>

    <div class="container-inner mx-auto">
      <p class="text-lg sm:text-xl"></p>

      <div class="flex justify-center items-center py-6">
        <a href="https://www.twitter.com/djiit"
          ><font-awesome :icon="['fab', 'twitter']" size="4x" class="m-4"
        /></a>
        <a href="https://www.github.com/djiit"
          ><font-awesome :icon="['fab', 'github']" size="4x" class="m-4"
        /></a>
        <a href="https://www.linkedin.com/in/julientanay"
          ><font-awesome :icon="['fab', 'linkedin']" size="4x" class="m-4"
        /></a>
      </div>
    </div>

    <div class="overflow-x-hidden">
      <div
        class="about-me container-inner mx-auto text-xl py-8 relative border-gray-200 border-b"
      >
        <h2 id="about" class="font-bold mb-6 text-center md:text-left">
          About me
        </h2>
        <div
          class="flex flex-col sm:flex-row justify-between items-center mb-16"
        >
          <div>
            <g-image
              src="../../static/author.jpg"
              alt="avatar"
              class="w-32 h-32 rounded-full mb-8 lg:mb-0"
            />
          </div>
          <div class="flex-1 text-lg sm:text-xl ml-6">
            Hi, i'm Julien. I'm a Dev+Ops guy currently working as a Lead DevOps
            Engineer at <g-link href="https://www.dior.com">Dior</g-link> in
            Paris. I'm a <i>casual speaker</i> (mostly about DevOps culture),
            I'm always looking for great
            <g-link to="/#projects">challenges</g-link>, sometimes for awesome
            <g-link to="/#clients">clients</g-link>. Check out my
            <g-link to="/blog">blog</g-link>!
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-x-hidden">
      <div
        class="projects container-inner mx-auto text-xl py-8 relative border-gray-200 border-b"
      >
        <h2 id="projects" class="font-bold mb-6 text-center md:text-left">
          Projects
        </h2>
        <div class="flex flex-row flex-wrap justify-center items-center mb-16">
          <div
            v-for="project in $page.projects.edges"
            :key="project.node.name"
            class="w-full md:w-1/3 p-2"
          >
            <a :href="project.node.link" target="_blank">
              <div
                class="max-w-sm mx-auto rounded overflow-hidden shadow-lg cursor-pointer"
              >
                <g-image
                  :src="project.node.image"
                  class="h-56 w-full object-cover bg-gray-800"
                ></g-image>

                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">
                    {{ project.node.name }}
                  </div>
                  <p class="text-gray-700 text-base">
                    {{ project.node.description }}
                  </p>
                </div>
                <div class="px-6 py-4">
                  <span
                    v-for="tag in project.node.tags"
                    :key="tag"
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >#{{ tag }}</span
                  >
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-hidden">
      <div class="clients container-inner mx-auto text-xl py-8 relative">
        <h2 id="clients" class="font-bold mb-6 text-center md:text-left">
          Clients
        </h2>
        <div class="flex flex-row flex-wrap justify-center items-center mb-16">
          <div
            v-for="logo in clientsLogo"
            :key="logo"
            class="w-1/2 sm:w-1/3 p-6"
          >
            <g-image :src="logo"></g-image>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-hidden">
      <div class="contact-me bg-background-secondary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">
          <h2 class="font-bold mb-6 text-center md:text-left" id="contact">
            Contact me
          </h2>
          <p class="mb-12">Want to work with me ? Drop me an email :</p>

          <div class="text-lg sm:text-lg mb-16">
            <form
              action="https://formspree.io/julien.tanay@gmail.com"
              method="POST"
              class="mb-12"
            >
              <div class="flex flex-wrap mb-6 -mx-4">
                <div class="w-full md:w-1/2 mb-6 md:mb-0 px-4">
                  <label class="block mb-2 text-copy-primary" for="name">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Jon Snow"
                    class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-blue-700 mb-2 p-4"
                    required
                  />
                </div>

                <div class="w-full px-4 md:w-1/2">
                  <label class="block text-copy-primary mb-2" for="email">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@example.com"
                    class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-blue-700 mb-2 p-4"
                    required
                  />
                </div>
              </div>

              <div class="w-full mb-12">
                <label class="block text-copy-primary mb-2" for="message">
                  Message
                </label>

                <textarea
                  id="message"
                  rows="5"
                  name="message"
                  class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none appearance-none focus:border-blue-700 mb-2 px-4 py-4"
                  placeholder="Enter your message here."
                  required
                ></textarea>
              </div>

              <div class="flex justify-end w-full">
                <input
                  type="submit"
                  value="Submit"
                  class="block bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="newsletter bg-background-tertiary">
      <div class="container-inner mx-auto py-16 pb-8 text-center textl-xl">
        <h2 class="text-2xl font-bold mb-8">Join my Newsletter</h2>
        <div class="w-4/5 mx-auto mb-8">
          <p class="mb-8 text-lg sm:text-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
            voluptatum. Quam, deleniti nulla.
          </p>
          <form action="#">
            <div class="flex flex-col sm:flex-row">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                class="flex-1 bg-background-form rounded sm:rounded-r-none px-4 py-4 leading-normal border border-border-color-primary sm:border-r-0 shadow outline-none focus:border-blue-700 z-10"
                required
              />
              <button
                data-element="submit"
                class="flex-2 w-40 uppercase bg-blue-700 text-white rounded sm:rounded-l-none text-lg py-3 px-8 tracking-wide shadow focus:outline-none hover:bg-blue-800 focus:bg-blue-800 z-10 w-full sm:w-auto mt-4 sm:mt-0"
              >
                <span>Subscribe</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> -->
  </Layout>
</template>

<static-query>
query {
  metaData {
    siteName
    siteDescription
  }
}
</static-query>

<page-query>
query Projects {
  projects: allProject {
    edges {
      node {
        name
        image
        link
        role
        tags
        description
      }
    }
  }
}
</page-query>

<script>
import { clientsLogo } from "../constants";

export default {
  metaInfo: {
    title: "Home"
  },
  data() {
    return {
      clientsLogo
    };
  }
};
</script>
