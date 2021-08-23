<template>
  <div>
    <a-row :gutter="[8, 8]">
      <a-col :span="12"> 
        <pre v-highlightjs>
          <code class="c#" spellcheck="false">{{msg}}</code>
        </pre>

      </a-col>

      <a-col :span="12">
        <pre v-highlightjs><code class="javascript">const s = new Date().toString();
         const s = new Date().toString()
        </code></pre>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "public class int main() {  }"
    };
  },
  methods: {
    // onTabChange(key, type) {
    //   console.log(key, type);
    //   this[type] = key;
    // },
  }
};
</script>
