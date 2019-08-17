export interface IUserInfo {
    id? : string;
    user_name? : string,
    photo? : string,
    email : string;
    password? : string;
    level?: number;
    company_name?: string;
};

export interface IUserProfile {
    id: string;
    email: string,
    profile: string,
    photo: string,
    user_name: string,
    first_name: string,
    last_name: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    postal_code: string,
    about: string,
    level?: number;
    company_name?: string;
    company_code?: string;
}

export interface ICategory {
    id: number;
    name: string,
    desc: string
}

export interface IQuestions {
    id: number;
    type: string,
    data: any,
    order: number
}
