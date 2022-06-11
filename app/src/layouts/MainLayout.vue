<template>
  <q-layout class="bg-grey-1" view="lHh Lpr lFf">
    <NavBar v-if="$route.name !== 'Index'" />
    <div>
      <router-view />
    </div>
    <dFooter />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from 'components/NavBar.vue'
import dFooter from 'components/dFooter.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { NavBar, dFooter }
})

</script>
