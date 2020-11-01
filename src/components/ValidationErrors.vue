<template>
  <div v-if="errors.length" class="alert alert-warning">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error.line">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['errors']
}
</script>
