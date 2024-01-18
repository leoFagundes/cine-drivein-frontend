export type UserLogin = {
    username: string
    password: string
}

export type User = {
    _id?: number
    username: string
    password: string
    email: string
    isAdmin: boolean
    profileImage?: string
}

export type Schedule = {
    _id?: number
    isOpen: boolean
    closingTime: string
    openingTime: string
}

export type AdditionalItem = {
    _id?: number
    name: string
    description: string
    photo: string
}

export type Item = {
    _id?: number
    cod_item: string
    name: string
    type: string
    description: string
    value: number
    observation: string
    quantity: number
    photo: string
    isVisible: boolean
    additionals?: AdditionalItem[]
    additionals_sauces?: AdditionalItem[]
    additionals_drinks?: AdditionalItem[]
    additionals_sweets?: AdditionalItem[]
}

export type Order = {
    _id?: number
    username: string
    phone: string
    spot: number
    credit_payment: number
    debit_payment: number
    service_fee: number
    total_value: number
    items: Item[]
}