<template>
    <div class="col-10">
		<input type="text" class="form-control" placeholder="Enter key word  ..."  :value="value" @input="onInput"   >
    </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    onInput: function (event) {
      this.$emit('input', event.target.value)
    }
  }
};
</script>



