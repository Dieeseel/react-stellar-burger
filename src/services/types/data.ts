export interface CustomBody<T extends any> extends Body {
    json(): Promise<T>;
}

export interface CustomResponse<T> extends CustomBody<T> {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}

export type TIngredient = {
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: string;
    readonly _v: number;
    readonly _id: string
    readonly uuid: string
}

export type TUserData = {
    readonly email: string;
    readonly name: string
}

export type TSignUpData = TUserData & {
    readonly password: string;
}

export type TSignInData = {
    readonly email: string,
    readonly password: string;
}


export type TLoginData = Omit<TUserData, 'name'>

export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string
}

export type TOrdersData = {
    total: number;
    totalToday: number;
    orders: ReadonlyArray<TOrder>
}

export type TChangePasswordData = {
    password: string,
    token: string
}

export type TResponseBody = {
    success: boolean;
    message?: string;
    headers?: Headers;
} 

export type TResponseWithIngredients = TResponseBody & {
    data: ReadonlyArray<TIngredient>
}

export interface IIngredientsType {
    type: TIngredient[],
    name: string
}

export interface IIngredients {
    data: TIngredient
}

export interface IConstructorItem {
    ingredient: TIngredient,
    index: number
}

export interface IProtectedRoute {
    onlyUnAuth?: boolean
    element: JSX.Element;
}

export interface IOnlyAuthElement {
    element: JSX.Element;
}

export interface IStatusDetails {
    ordersData: TOrdersData;
}

export interface IFeedOrders {
    ordersData: ReadonlyArray<TOrder>
}

export interface IProfileDetails {
    ordersData: ReadonlyArray<TOrder>
}

export interface IOrderElement {
    orderData: TOrder,
    ingredientsData: ReadonlyArray<TIngredient>
}

export interface IOrderModal {
    orderNumber: number | null,
    closeModal: () => void
}

export interface ICloseModalProps {
    closeModal: () => void
}