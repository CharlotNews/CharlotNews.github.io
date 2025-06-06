const posts = [
  {
    title: "First Post on Charlot News",
    url: "posts/2025-06-05-first-post.html",
    date: "2025-06-05",
    summary: "Welcome to Charlot News! This is the very first post introducing the site and its mission."
  },
  {
    title: "New Tech Trends in 2025",
    url: "posts/2025-06-01-tech-trends-2025.html",
    date: "2025-06-01",
    summary: "A deep dive into the most exciting technology trends expected to shape the year 2025."
  },
  {
    title: "Open Source Projects You Should Follow",
    url: "posts/2025-05-28-open-source-projects.html",
    date: "2025-05-28",
    summary: "A curated list of open source projects making waves in the tech community."
  }
];

const postsContainer = document.getElementById('posts');
const searchInput = document.getElementById('search-input');

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
}

function renderPosts(filter = '') {
  postsContainer.innerHTML = '';

  const filteredPosts = posts.filter(post => {
    const combined = (post.title + ' ' + post.summary).toLowerCase();
    return combined.includes(filter.toLowerCase());
  });

  if (filteredPosts.length === 0) {
    postsContainer.innerHTML = '<p>No posts found.</p>';
    return;
  }

  filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  filteredPosts.forEach(post => {
    const article = document.createElement('article');
    article.classList.add('post');

    article.innerHTML = `
      <h2><a href="${post.url}">${post.title}</a></h2>
      <time datetime="${post.date}">${formatDate(post.date)}</time>
      <p class="summary">${post.summary}</p>
    `;

    postsContainer.appendChild(article);
  });
}

renderPosts();

searchInput.addEventListener('input', () => {
  renderPosts(searchInput.value);
});

const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    darkToggle.textContent = '☀️ Light Mode';
  } else {
    localStorage.setItem('theme', 'light');
    darkToggle.textContent = '🌙 Dark Mode';
  }
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  darkToggle.textContent = '☀️ Light Mode';
}
