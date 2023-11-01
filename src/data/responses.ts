export interface ResponseAllCountries {
    code: string;
    name: string;
    continent: Continent
}

export interface Country {
    name: string;
    code: string;
    continent: Continent;
    capital: string;
    languages: Language[];
    states: State[];
    currencies: []
    countryImg: string;
}

export interface Continent {
    name: string;
    code: string;
}

interface Language {
    name: string
}

interface State {
    name: string
}

export interface DiccionarioIconos {
    [key: string]: string;
}