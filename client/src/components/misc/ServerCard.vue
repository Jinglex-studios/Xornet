<template>
  <div class="card">
    <a href="https://cdn.discordapp.com/attachments/807448839346716683/853054616870322256/spaz.gif" target="_blank">
      <img :src="require('@/assets/renders/server.png')" alt="" class="transform scale-140 -translate-y-8 mix-blend-screen" />
    </a>
    <div class="details">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? add() : null">
        <div class="text">
          <h1>Add server to datacenter</h1>
          <p>Type the servers uuid</p>
        </div>

        <div class="fields">
          <input v-model="form.uuid" class="inputField" type="text" placeholder="c478ea46f8f6467ea497e2ad5caaa976" />
        </div>

        <button type="submit" :class="{ disabled: isFormValid || isLoading }">
          Add<img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServerCard",
  data() {
    return {
      form: {
        uuid: ""
      },
      isLoading: false
    };
  },
  computed: {
    isFormValid() {
      const uuidRegex = /([0-9a-f]{16})|([0-9a-f]{32})/g;
      return Object.values(this.form).some(field => !uuidRegex.test(field.toLowerCase()));
    }
  },
  methods: {
    async add() {
      this.isLoading = true;
      try {
        const status = await this.api.datacenter.addMachine(this.$route.params.name, this.form.uuid);
        if (status == 200) {
          console.log("added");
        }
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    }
  }
};
</script>

<style scoped src="@/components/misc/card.css"></style>
