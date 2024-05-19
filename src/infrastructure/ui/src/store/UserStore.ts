import { makeAutoObservable } from 'mobx';

export default class UserStore {
    _isAuth: boolean = false;
    _user: any = {};

    constructor() {
        makeAutoObservable(this, {
            _isAuth: true,
            _user: true,
        });
    }

    get isAuth() {
        return this._isAuth;
    }

    setIsAuth(value: boolean) {
        this._isAuth = value;
    }

    get user() {
        return this._user;
    }

    setUser(value: any) {
        this._user = value;
    }
}
