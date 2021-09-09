import { Observable } from "rxjs";

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
    image: string;
    favorito?: boolean;
};

export interface IInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface IEpisodio {

    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
    observbales?: Observable<any>[];
}