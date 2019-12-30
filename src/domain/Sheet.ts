export class Sheet {
    private _id!: bigint;
    private _img!: string;
    private _title!: string;
    private _playNumber!: number;
    private _creator!: string;
    private _creatorId!: bigint;

    constructor() {
    }


    get id(): bigint {
        return this._id;
    }

    set id(value: bigint) {
        this._id = value;
    }

    get img(): string {
        return this._img;
    }

    set img(value: string) {
        this._img = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get playNumber(): number {
        return this._playNumber;
    }

    set playNumber(value: number) {
        this._playNumber = value;
    }

    get creator(): string {
        return this._creator;
    }

    set creator(value: string) {
        this._creator = value;
    }

    get creatorId(): bigint {
        return this._creatorId;
    }

    set creatorId(value: bigint) {
        this._creatorId = value;
    }
}
