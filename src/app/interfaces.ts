export interface IRequest {
    info: IInfo;
    results: IPersonaje[]
};

export interface IPersonaje {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    image: string
};

export interface IInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}