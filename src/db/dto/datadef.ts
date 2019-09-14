export interface IUserInfo {
    id? : string;
    user_name? : string;
    photo? : string;
    email : string;
    password? : string;
    level?: number;
    company_name?: string;
    company_code?: string;
    agreement?: boolean;
};

export interface IUserProfile {
    id: string;
    email: string;
    profile: string;
    photo: string;
    user_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    about: string;
    level?: number;
    company_name?: string;
    company_code?: string;
    agreement?: boolean;
}

export interface ICategory {
    id: number;
    name: string;
    desc: string;
    children?: Array<ICategory> | null
}

export interface IQuestions {
    id: number;
    type: string;
    data: any;
    order: number
}

export interface ICQuestions {
    id: number;
    data: any;
    revision: number
}

export interface IAnswers {
    uid: number;
    user_id: string;
    category_id: number;
    answers: any
}

export interface ICompany {
    id: number;
    code: string;
    name: string;
    desc: string;
}
