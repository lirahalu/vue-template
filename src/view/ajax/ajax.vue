<template>
  <div>{{userNum}}</div>
</template>
<script>
export default {
  name: 'ajax',
  components: {

  },
  data () {
    return {
      userNum: 1
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      let params = {}
      this.$http.fetchGet(this.$path.getViewNum, params).then((data) => {
        if (data) {
          this.userNum = data.data.userNum
        }
      })
    }
  }
}
</script>
