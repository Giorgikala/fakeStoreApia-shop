export interface SignIn {
    username: string;
    password: string,
    rememberUser: boolean

}



export interface  AuthSecces extends UserData{
    token:string;
}

export interface UserData {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string
}