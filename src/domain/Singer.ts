class Singer {
    private _id!: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _nickName!: string;

    get nickName(): string {
        return this._nickName;
    }

    set nickName(value: string) {
        this._nickName = value;
    }

    private _email!: string;

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    private _password!: string;

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    private _image!: string;

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    private _gender!: number;

    get gender(): number {
        return this._gender;
    }

    set gender(value: number) {
        this._gender = value;
    }

    private _tel!: string;

    get tel(): string {
        return this._tel;
    }

    set tel(value: string) {
        this._tel = value;
    }

    private _address!: string;

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    private _description!: string;

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    private _registerTime!: Date;

    get registerTime(): Date {
        return this._registerTime;
    }

    set registerTime(value: Date) {
        this._registerTime = value;
    }

    private _authentication!: boolean;

    get authentication(): boolean {
        return this._authentication;
    }

    set authentication(value: boolean) {
        this._authentication = value;
    }

    private _userId!: number;

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    private _tag!: string;

    get tag(): string {
        return this._tag;
    }

    set tag(value: string) {
        this._tag = value;
    }
}
