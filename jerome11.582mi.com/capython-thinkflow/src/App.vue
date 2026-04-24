<script setup>
let project = {
  name: 'Think Flow',
  teamTitle: "Our Creative Team",  
  members: [
    {
      name: 'Jerome',
      role: 'Web Designer',
      description: 'Website for Thinkflow.'
    },
    {
      name: 'Jenny',
      role: 'Developer/Designer',
      description: 'Website Protype and Designer.'
    },
    {
      name: 'Karol',
      role: 'Designer',
      description: 'Template Designs'
    },
    {
      name: 'Wendy',
      role: 'Video Motion Graphics',
      description: 'Video Motion Graphics Design'
    },
    {
      name: 'Kelly',
      role: 'Designer/Vsual Designer',
      description: 'Video Designer and Poster Designer'
    },
    {
      name: 'Gabbeh',
      role: 'Designer',
      description: 'Calling Card Design'
    },
  ],

  figma: {
    name: 'ThinkFlow Figma Design',
    description: 'This is our figma for our project Thinkflow. ',
    embed: `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/Oc7xCeNhazeSHQjNPRyNTz/ThinkFlow-Moodboard?node-id=0%3A1" allowfullscreen></iframe>`
  },

  description: `ThinkFlow is a dynamic company dedicated to fostering engaging and inclusive student learning experiences. With a strong commitment to educational excellence, ThinkFlow provides comprehensive tutoring services tailored to diverse learning styles, ensuring that every student receives personalized support.
  Our mission is to bridge learning gaps and empower students by creating interactive, student-centered environments that promote curiosity, critical thinking, and academic success. Whether through one-on-one tutoring, group workshops, or digital learning tools, ThinkFlow enhances accessibility and effectiveness in education, making learning an enjoyable and enriching journey for all.`,
  tags: ['Capython', 'Goal', 'Process', 'Screenshots', 'Video', 'Outcome'],
  images: {
    logo: '../public/logo.png',
    design: "Design Process",
    process: [
      '../think_flow1.png',
      '../design2.png'
    ],
    screenshots: [
      '/images/screenshot-1.jpg',
      '/images/screenshot-2.jpg',
      '/images/screenshot-3.jpg'
    ]
  },
  video: {
    name: 'Think Flow Video',
    url: 'https://www.youtube.com/watch?v=0Lxb_GwPzQs',
    title: 'Capython Think Flow Video',
    description: 'This is a video about the Project we did about.',
    embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/0Lxb_GwPzQs" frameborder="0" allowfullscreen></iframe>`
  },
  prototype: {
    name: 'Website Prototype',
    description: 'This the website prototype Jenny created for the project. It is a simple website that allows users to see the design we did. Also, The website is designed to be user-friendly and easy to navigate.',
    embed: `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/TVrVNhuR3L7G502E7nrAcV/Website?node-id=559-18737&embed-host=share" allowfullscreen></iframe>`
  },

  website: {
    name: 'Think Flow Website',
    title: 'Capython Think Flow Website',
    url: 'https://jerome11.582mi.com/think_flow/index.html',
    description: 'This is a website that I created, so what I did is I replicated some of the design and put it into the site itself and make sure its responsive.',
  }
}
</script>

<template>
  <div id="app">
    <header>
      <img :src="project.images.logo" alt="Project Logo" width="250" />
      <p>{{ project.description }}</p>

      <h1>{{ project.teamTitle }}</h1>
      <div class="team-members">
        <div v-for="member in project.members" :key="member.name" class="members">
          <h2>{{ member.name }}</h2>
          <p class="role">{{ member.role }}</p>
          <p class="description">{{ member.description }}</p>
        </div>

      </div>
      <h1>{{ project.figma.name }}</h1>
      <p>{{ project.figma.description }}</p>
      <div class="figma-embed" v-html="project.figma.embed"></div>

      <h1> {{ project.images.design }}</h1>
      <div class="image-gallery">
        <img v-for="(img) in project.images.process" :src="img" alt="Process Image" width="500" />
      </div>

      <h1> {{ project.video.name }}</h1>
      <div v-html="project.video.embed"></div>
      <a> {{ project.video.description }}</a>

      <h1>{{ project.prototype.name }}</h1>
      <p>{{ project.prototype.description }}</p>
      <div v-html="project.prototype.embed"></div>

      <h1>{{ project.website.name }}</h1>
      <p>{{ project.website.description }}</p>
      <a :href="project.website.url" target="_blank">Visit Website</a>
    </header>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@400;700;900&display=swap');

html, body {
  display: grid;
  justify-content: center;  
  align-items: center;
  font-family: "Zen Kaku Gothic Antique", sans-serif;
}

.figma-embed {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.figma-embed iframe {
  border: none;
  min-height: 450px;
}


#app {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  justify-items: center;
  text-align: center;
  padding: 20px;
}

header {
  width: 100%;
}

p {
  font-size: 1rem;
  font-weight: 200;
}

h1 {
  font-size: 2rem;
  padding: 30px;
  font-weight: 600;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  font-weight: 600;
  margin: 0.5rem 0;
}

.image-gallery {
  display: grid;
  justify-items: center;
  gap: 1rem;
}

.image-gallery img {
  border-radius: 8px;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0 3rem;
}

.member-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.member-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.member-card .role {
  font-size: 1.1rem;
  font-weight: 600;
  color: #3498db;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.member-card .description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-top: 1rem;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

iframe {
  border-radius: 8px;
}
</style>