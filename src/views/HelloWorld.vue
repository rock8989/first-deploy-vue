<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <span @click="onFacebook" class="icon-sns icon-fb" title="페이스북">페이스북</span>
    <span @click="onTwiter" class="icon-sns icon-twit" title="트위터">트위터</span>
    <span @click="onNaver" class="icon-sns icon-blog" title="네이버 블로그">네이버</span>
    <a href="javascript:;" id="kakao-link-btn" class="icon-sns icon-kakao" title="카카오톡">카카오톡</a>
    <span @click="onTelegram" class="icon-sns icon-telegram" title="텔레그램">텔레그램</span> -->
    <!-- <span class="icon-sns icon-copy" v-clipboard:copy="onMainUrl" title="복사하기"></span> -->
  </div>
</template>

<script>
export default {
  // watch : {
  //   'SellList'
  // },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  methods: {
  //   onTwiter() {
  //     let title = encodeURI('KOVEX 사전가입')
  //     let url = `https://twitter.com/intent/tweet?text=KOVEX 사전가입&url=http://promotion.kovex.co.kr/#/?referral_id=655qdr`
      
  //     // let url = `http://twitter.com/intent/tweet?text=KOVEX 사전가입&url=${this.rcmd_link}`
	// 	  window.location.href = url
  //     // http://twitter.com/intent/tweet?text={페이지 제목}&url={페이지링크}" 
  //   },
  //   // 페이스북
  //   onFacebook() {
  //     let url = encodeURI(encodeURIComponent('http://promotion.kovex.co.kr/#/?referral_id=655qdr'))
  //     let sendUrl = `http://www.facebook.com/sharer/sharer.php?u=http://promotion.kovex.co.kr/#/?referral_id=655qdr`
  //     // let url = `http://www.facebook.com/sharer/sharer.php?u=${this.rcmd_link}`
  //     window.location.href = sendUrl
  //   },
  //   // 텔레그램
  //   onTelegram() {
  //     let url = `https://telegram.me/share/url?url=http://promotion.kovex.co.kr/#/?referral_id=655qdr`
      
  //     // let url = `https://telegram.me/share/url?url=${this.rcmd_link}`
  //     window.location.href = url
  //   },
  //   onNaver() {
  //     let url = encodeURI(encodeURIComponent('http://promotion.kovex.co.kr/#/?referral_id=655qdr'))
  //     let title = encodeURI('KOVEX 사전가입')
  //     // var title = encodeURI(myform.title.value);
  //     let sendUrl = `http://share.naver.com/web/shareView.nhn?url=${url}&title=${title}`
  //     // http://share.naver.com/web/shareView.nhn?url=http://promotion.kovex.co.kr/#/?referral_id=655qdr&title=KOVEX 사전가입
  //     console.log(sendUrl);
  //     // var url = `https://share.naver.com/web/shareView.nhn?url=${this.rcmd_link}&title=KOVEX 사전가입`
  //     document.location = sendUrl
  //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
