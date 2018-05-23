<template>
    <div class="detail">
    <Navbar />

    <b-container class="bv-example-row">
    <br>
    <h3>Detail Question</h3>
    <br>
    <h4 style="color:red">{{ listDetail.title }}</h4>
    <hr>
    <b-row>
      <b-col sm="1" class="text-center">
        <b-button @click="upVoteQuestion" variant="success">Up</b-button>
        <p style="margin-bottom:0px">{{listDetail.upVote.length-listDetail.downVote.length }} <br> Votes</p>
        <b-button @click="downVoteQuestion" variant="success">Down</b-button>
      </b-col>
      <b-col sm="11">
        <p v-html="listDetail.content"></p>
      </b-col>
    </b-row>
    <hr>
    <h4>Answer</h4>
    <hr>
    <b-row v-for="answerlist in listDetail.answers" :key="answerlist._id" style="margin-bottom:20px">
      <b-col sm="1" class="text-center">
        <b-button @click="upVoteAnswer(answerlist._id)" variant="success">Up</b-button>
        <p style="margin-bottom:0px">{{answerlist.likes.length-answerlist.dislikes.length }} <br> Votes</p>
        <b-button @click="downVoteAnswer(answerlist._id)" variant="success">Down</b-button>
      </b-col>
      <b-col sm="11">
        <p v-html="answerlist.answer"></p>
        <p>Answer by: {{ showNameAnswer(answerlist._id) }}{{ authorAnswer }}</p>
      </b-col>
    </b-row>
    <hr>
    <h4>Your Answer</h4>
    <editor v-model="answer.answerQuestion" api-key="63vjifsaffdfz1yprll9c495cigwzg7perds1xpz9en3ltqk" :init="{plugins: 'wordcount'}"></editor>
    <hr>
    <b-button @click="postAnswer" variant="success">Add Question</b-button>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

import Editor from '@tinymce/tinymce-vue'
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'detail',
    components: {
        Navbar,
         'editor': Editor
    },
    data: function () {
      return {
        idQuestion: this.$route.params.id,
        listDetail: {
          title: null,
          upVote: {
            length: null
          },
          downVote: {
            length: null
          }
        },
        answer: {
          answerQuestion: null,
        },
        authorAnswer: null
      }
    },
    methods: {
      showQuestion: function () {
        axios.get(`https://apioverflow.thismylife.net/questions/${this.idQuestion}`)
        .then(response => {
            this.listDetail = response.data.result
        })
        .catch(function (err) { 
          swal('Your error', err.response.data.message, 'error')
        })
      },
      upVoteQuestion: function () {
        if(localStorage.getItem('apptoken')){
          let apptoken = localStorage.getItem('apptoken')
          let id = localStorage.getItem('id')
          let self = this
          axios.put(`https://apioverflow.thismylife.net/questions/${self.idQuestion}/up-vote`,{},
          {
            headers: {
              apptoken,
              id
            }
          })
          .then(response => {
            swal('Success',response.data.message, 'success')
            this.$router.push({ name: 'home'})
          })
          .catch(function(err){
            swal('Your error', err.response.data.message, 'error')
          })
        }else{
          swal('You must login', 'Warning', 'error')
        }
      },
      downVoteQuestion: function () {
        if(localStorage.getItem('apptoken')){
          let apptoken = localStorage.getItem('apptoken')
          let id = localStorage.getItem('id')
          axios.put(`https://apioverflow.thismylife.net/questions/${this.idQuestion}/down-vote`,{},
          {
            headers: {
              apptoken,
              id
            }
          })
          .then(response => {
            swal('Success', response.data.message, 'success')
            this.$router.push({ name: 'home'})
          })
          .catch(function(err){
            console.log(err.response)
            swal('Your error', err.response.data.message, 'error')
          })
        }else{
          swal('You must login', 'Warning', 'error')
        }
      },
      postAnswer: function () {
        if(localStorage.getItem('apptoken')){
          let apptoken = localStorage.getItem('apptoken')
          let id = localStorage.getItem('id')
          let self = this
          axios.post(`https://apioverflow.thismylife.net/answers/${this.idQuestion}/add`,
            {
              user: id,
              answer: self.answer.answerQuestion
            },
            {
              headers: {
                apptoken,
                id
              }
            }
          )
          .then(response => {
            swal('Success', response.data.message, 'success')
            this.$router.push({ name: 'home'})
          })
          .catch(function(err){
            swal('Your error', err.response.data.message, 'error')
          })
        }else{
          swal('You must login', 'Warning', 'error')
        }
      },
      showNameAnswer: function (id) {
        axios.get(`https://apioverflow.thismylife.net/answers/${id}`)
        .then(response => {
          this.authorAnswer = response.data.result.user.fullname
        })
        .catch(function(err){
          swal('Your error', err.response.data.message, 'error')
        })
      },
      upVoteAnswer: function (idAnswer) {
        if(localStorage.getItem('apptoken')){
          let apptoken = localStorage.getItem('apptoken')
          let id = localStorage.getItem('id')
          let self = this
          axios.put(`https://apioverflow.thismylife.net/answers/${idAnswer}/up-vote`,{},
          {
            headers: {
              apptoken,
              id
            }
          })
          .then(response => {
            swal('Success',response.data.message, 'success')
            this.$router.push({ name: 'home'})
          })
          .catch(function(err){
            swal('Your error', err.response.data.message, 'error')
          })
        }else{
          swal('You must login', 'Warning', 'error')
        }
      },
      downVoteAnswer: function (idAnswer) {
        if(localStorage.getItem('apptoken')){
          let apptoken = localStorage.getItem('apptoken')
          let id = localStorage.getItem('id')
          let self = this
          axios.put(`https://apioverflow.thismylife.net/answers/${idAnswer}/down-vote`,{},
          {
            headers: {
              apptoken,
              id
            }
          })
          .then(response => {
            swal('Success',response.data.message, 'success')
            this.$router.push({ name: 'home'})
          })
          .catch(function(err){
            swal('Your error', err.response.data.message, 'error')
          })
        }else{
          swal('You must login', 'Warning', 'error')
        }
      },
    },
    mounted: function () {
      this.showQuestion()
    }
    
}
</script>
