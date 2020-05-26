import * as axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '50f1f503-9c26-452c-b6b0-8a3049400c9f'}
});
export const UserAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(usersId) {
        return instance.post(`follow/${usersId}`)

    },
    unfollow(usersId) {
        return instance.delete(`follow/${usersId}`)

    },
    getProfile(userId) {
        return ProfileAPI.getProfile(userId)

    }
}
export const ProfileAPI = {

    getProfile(userId) {
        return instance.get(`profile/` + userId)

    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)

    },
    photo( file){

        const formData = new FormData();

        formData.append('image', file);

        return instance.put('/profile/photo', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
    },
    getStatus(userId) {

        return instance.get(`profile/status/` + userId)

    },
    setStatus(status) {

        return instance.put(`profile/status/`, {status: status})

    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },

    login(email, password, rememberMe = false,   captcha = null) {

        return instance.post(`auth/login`, {email, password, rememberMe,   captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }


}
