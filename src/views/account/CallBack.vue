<template>  </template>

<script>
import Oidc from "oidc-client";
// 测试用
new Oidc.UserManager()
  .signinRedirectCallback()
  .then(function() {
    window.location = "/#/Home";
  })
  .catch(function(e) {

  });
  export default{}
</script>