import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '@/firebase'
import firebase from 'firebase/app'
import router from "@/router";

Vue.use(Vuex)

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        fb.taskCollection.orderBy('createdOn', 'asc')
            .where("userId", "==", user.uid)
            .onSnapshot(querySnapshot => {
                let taskArray = []
                querySnapshot.forEach(doc => {
                    let task = doc.data()
                    task.id = doc.id

                    taskArray.push(task)
                })
                store.commit('setTasks', taskArray)
            })
    } else {
        // User not signedin
    }
});

const store = new Vuex.Store({
    state: {
        userProfile: {},
        tasks: null
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setPerformingRequest(state, val) {
            state.performingRequest = val
        },
        setTasks(state, val) {
            state.tasks = val
        }
    },
    actions: {
        async login({dispatch}, form) {
            return await fb.auth.signInWithEmailAndPassword(form.email, form.password)
                .then(response => {
                    dispatch('fetchUserProfile', response.user)
                })
                .catch(err => {
                    return 'ERROR'
                    //console.log(err.message)
                })
        },
        async signup({dispatch}, form) {
            const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                createdAt: new Date()
            })
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({commit}, user) {
            const userProfile = await fb.usersCollection.doc(user.uid).get()
            if (userProfile.data()) {
                commit('setUserProfile', userProfile.data())
                if (router.currentRoute.path === '/login') {
                    await router.push('/')
                }
            } else {
                await fb.auth.signOut()
                await router.push('/login')
            }
        },
        async logout({commit}) {
            await fb.auth.signOut()
            commit('setUserProfile', {})
            commit('setTasks', [])
            await router.push('/login')
        },
        async createTask({commit}, task) {
            await fb.taskCollection.add({
                title: task.title,
                done: false,
                createdOn: new Date(),
                taskDate: task.date,
                userId: fb.auth.currentUser.uid,
                updatedOn: new Date()
            })
        },
        async updateTask({dispatch}, content) {
            const task = content.task;
            const taskRef = await fb.taskCollection.doc(task.id).update({
                done: !task.done,
                updatedOn: new Date()
            })
        },
        async deleteTask({dispatch}, content) {
            const task = content.task;
            const taskRef = await fb.taskCollection.doc(task.id).delete();
        },
        async updateProfile({dispatch}, user) {
            const userId = fb.auth.currentUser.uid
            const userRef = await fb.usersCollection.doc(userId).update({
                name: user.name
            })
            dispatch('fetchUserProfile', {uid: userId})
        }
    }
})

export default store
