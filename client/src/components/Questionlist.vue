<template>
    <div class="questionlist">
    <b-row v-for="list in getlistQuestion" :key="list._id">
        <b-col sm="1" class="text-center">
            <p style="margin-bottom:0px">{{ list.upVote.length }}</p>
            <p style="margin-bottom:0px">Votes</p>
            <p style="margin-bottom:0px">{{ list.user.answers.length }}</p>
            <p style="margin-bottom:0px">Answer</p>
        </b-col>
        <b-col sm="11">
            <router-link :to="{ name: 'detailquestion', params: { id: list._id }}"> <h4>{{ list.title }}</h4></router-link>
            <hr>
            <p v-html="list.content"></p>
            <label>question by <b>{{ list.user.fullname }}</b></label>
            <hr>
        </b-col>
    </b-row>
    </div>
</template>

<script>

export default {
    name:'questionlist',
    created: function () {
        this.$store.dispatch('getlistQuestion')
    },
    computed: {        
        getlistQuestion () {
            return this.$store.state.listQuestion
        }
    }
}
</script>

<style>

</style>
