const API_KEY = "d0f275c0a96c3c0542cd3149a66bee14";
const BASE_PATH = "https://api.themoviedb.org/3"

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: string;
    name?: string;
    first_air_date?: string;

}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getSimilarMovies(movieId: number) {
    return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getTopRatedMovies() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getPopularMovies() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}

export function getTV() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getSimilarTV(tvId: number) {
    return fetch(`${BASE_PATH}/tv/${tvId}/similar?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getTopRatedTV() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getAiringTV() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}
export function getLatestTV() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko&page=2`).then((response) => response.json());
}

export function getSearchMovies(keyword: string) {
    return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}&include_adult=true`).then((response) => response.json());
}
export function getSearchTv(keyword: string) {
    return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&query=${keyword}&include_adult=true`).then((response) => response.json());
}
