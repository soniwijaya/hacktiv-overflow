<template>
    <div class="addquestion">
        <Navbar />

        <b-container class="bv-example-row">
            <br>
            <h4>Your Question</h4>
            <b-form-group label="Title">
                <b-form-input v-model="title" type="text" placeholder="Enter title"></b-form-input>
            </b-form-group>
            <editor v-model="content" api-key="63vjifsaffdfz1yprll9c495cigwzg7perds1xpz9en3ltqk" :init="{plugins: 'wordcount'}"></editor>
            <br>
            <b-button v-show="signAdd" variant="success" @click="addButton">Add Question</b-button>
            <b-button v-show="signUpdate" variant="warning" @click="updateButton(idQuestion,update)">Update Question</b-button>
            <hr>
            <h4>List Question</h4>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Question</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in getlistQuestion" :key="list._id">
                        <td>{{ list.title }}</td>
                        <td v-html="list.content"></td>
                        <td>{{ formatDate(list.updatedAt) }}</td>
                        <td>
                            <b-button variant="warning" size="sm" @click="editButton(list._id,list.title,list.content,list.updatedAt)">Edit</b-button>
                            <b-button variant="danger" size="sm" @click="deleteButton(list._id)">Delete</b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

import Editor from '@tinymce/tinymce-vue'
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'addquestion',
    components: {
        Navbar,
        'editor': Editor
    },
    data () {
    return {
            idQuestion: null,
            title: null,
            content: null,
            update: null,
            signAdd: true,
            signUpdate: false
        }
    },
    created: function () {
        if(!localStorage.getItem('apptoken')){
            this.$router.push({ name: 'home' })
        }
        this.$store.dispatch('getlistQuestion')
    },
    computed: {        
        getlistQuestion () {
            return this.$store.state.listQuestion
        }
    },
    methods: {
        formatDate: function (date){
        let now = new Date(date)

        let options = {  
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }

        return now.toLocaleString('en-us', options) 
        },
        editButton: function (id,title, content, update){
            this.idQuestion = id
            this.title = title
            this.content = content
            this.updated = update
            this.signUpdate = true
            this.signAdd = false
        },
        addButton: function (){
            let apptoken = localStorage.getItem('apptoken')
            let id = localStorage.getItem('id')
            let self = this
            axios.post(`https://apioverflow.thismylife.net/questions/add`, 
                {
                    title: self.title,
                    content: self.content
                },
                {
                    headers: {
                        apptoken,
                        id,
                    }
                }
            )
            .then(function(response){
                swal('Success', response.data.message, 'success')
                self.$store.commit('addQuestion', response.data.result)
            })
            .catch(function(err){
                swal('Error', err.response.data , 'error')
            })
        },
        updateButton: function (idQues, updated) {
            let apptoken = localStorage.getItem('apptoken')
            let id = localStorage.getItem('id')
            let self = this

            axios.put(`https://apioverflow.thismylife.net/questions/${idQues}`, 
            {
                title: self.title,
                content: self.content
            }, 
            {
                headers: {
                    apptoken,
                    id
                }
            })
            .then(response => {
                swal("Success update!", response.data.message, "success")
                self.signUpdate = false
                self.signAdd = true
                let index = self.$store.state.listQuestion.findIndex(index => index._id == response.data.result._id)
                self.$store.commit('updateQuestion', {
                    index,
                    title: self.title,
                    content: self.content,
                    update: self.updated
                })
                self.idQuestion = null
                self.title = null
                self.content = null
            })
            .catch(err => {
                swal("Your error", err.response.data.message, "error")
            })
        },
        deleteButton: function (idDelete) {
            let apptoken = localStorage.getItem('apptoken')
            let id = localStorage.getItem('id')
            let self = this

            swal({
                title: "Are you sure?",
                text: "After delete, you can't get this question again!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                axios.delete(`https://apioverflow.thismylife.net/questions/${idDelete}`,
                    {
                        headers: {
                            apptoken,
                            id
                        }
                    }
                )
                .then(response => {
                    swal(response.data.message, {
                    icon: "success",
                    })
                    let index = self.$store.state.listQuestion.findIndex(index => index._id == response.data.result._id)
                    self.$store.commit('deleteQuestion', index)
                })
                .catch(err => {
                    swal("Your error", err.response.data.message, "error")
                })
                } else {
                    swal("Failed remove article")
                }
            })
        }
    }
}
</script>
