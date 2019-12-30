export class Music {
    private _id!: number;
    private _title!: string;
    private _singer!: string;
    private _album!: string;
    private _duration!: string;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get singer(): string {
        return this._singer;
    }

    set singer(value: string) {
        this._singer = value;
    }

    get album(): string {
        return this._album;
    }

    set album(value: string) {
        this._album = value;
    }

    get duration(): string {
        return this._duration;
    }

    set duration(value: string) {
        this._duration = value;
    }
}
