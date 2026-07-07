<template>
  <div class="nuxt-link-layout">
    <header>
      <nav>
        <NuxtLink to="/">홈</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.nuxt-link-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  padding: 2rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

nav a {
  margin-right: 2rem;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

nav a:hover {
  color: #42b883;
}

main {
  flex: 1;
  padding: 2rem;
}
</style>
