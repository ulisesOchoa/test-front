<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div>
      <HelloWorld msg="Prueba Técnica Full Stack" />

          En esta prueba técnica, desarrollé una aplicación web completa que incluye tanto el backend como el frontend
          utilizando tecnologías modernas y buenas prácticas de desarrollo.

          Para el backend, utilicé Laravel siguiendo una arquitectura basada en el patrón de repositorio, lo que permite
          una mayor flexibilidad y facilidad de mantenimiento en el código. Implementé migraciones para gestionar la
          base de datos de manera eficiente y garantizar la coherencia en los cambios. Además, personalicé las
          respuestas de la API para que fueran claras y consistentes, asegurando que el código fuese limpio y fácil de
          seguir.

          En el frontend, empleé Vue 3 junto con el gestor de estado Pinia, lo que permitió manejar el estado de la
          aplicación de manera efectiva y mantener una experiencia de usuario fluida e interactiva. La aplicación
          resultante es robusta, modular y está bien documentada, lo que facilita su comprensión y ampliación.
      <nav>
        <RouterLink to="/">Clientes</RouterLink>
        <RouterLink to="/supplier"> Proveedores </RouterLink>
        <RouterLink to="/quality"> Calidades de Gas </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
