import axios, {AxiosPromise} from "axios";
import {PhotosType, profileType} from "../redux/profile-reducer";
import {UserType} from "../redux/users-reducer";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '50f1f503-9c26-452c-b6b0-8a3049400c9f'}
});
type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
type MeResponseType = {

    id: number,
    email: string,
    login: string

}
type LoginResponseType = {}
export const UserAPI = {
    getUsers(currentPage: number, pageSize = 10) {

        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(usersId: number) {

        return instance.post<ResponseType>(`follow/${usersId}`).then(res => res.data)

    },
    unfollow(usersId: number) {
        return instance.delete(`follow/${usersId}`).then(res => res.data) as Promise<ResponseType>

    },
    getProfile(userId: number) {
        return ProfileAPI.getProfile(userId)

    }
}
type ProfileResponseType = {
    userId: number

}

type  SavePhotoType={
    photos: PhotosType
}
export const ProfileAPI = {

    getProfile(userId: number) {

        return instance.get<profileType>(`profile/` + userId).then(res => res.data)

    },
    saveProfile(profile: profileType) {
        return instance.put<ResponseType>(`profile`, profile).then(res => res.data)

    },
    photo(file: File) {

        const formData = new FormData();

        formData.append('image', file);

        return instance.put<ResponseType<SavePhotoType>>('/profile/photo', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    getStatus(userId: number) {

        return instance.get(`profile/status/` + userId).then(res => res.data)

    },
    setStatus(status: string) {

        return instance.put<ResponseType>(`profile/status/`, {status: status}).then(res => res.data)

    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,

}

export enum ResultCodeForCaptcha {

    captchaIsReq = 10
}


export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {

        return instance.post<ResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

type getCaptchaResponseType ={
    url:string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaResponseType>(`security/get-captcha-url`).then(res => res.data)
    }


}
