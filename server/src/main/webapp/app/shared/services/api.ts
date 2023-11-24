import axios, { AxiosError } from 'axios';
import EventEmitter from 'events';

const apiEventEmitter = new EventEmitter();

const stackExceptionMessagesRoutes: string[] = [];

const token = localStorage.getItem('@nlweb/jwtToken');

const headers = token ? { Authorization: `Bearer ${token}` } : {};

const apis = Array<ReturnType<typeof axios.create>>(2).fill(
    axios.create({
        baseURL: location.protocol + '//' + location.host + '/NLWebII',
        headers,
        validateStatus: status => status < 400 && status !== 270 && status !== 271,
    }),
);

/**
 * @deprecated
 *
 * `dApi` é a api antiga que não possuía o casting automático de campos de Data vindos da resposta.
 * Isso implica que no request, a interface que dava o tipo do retorno
 * do request axios informava os campos como "Date" sendo que na verdade vinha uma string de dentro do JSON.
 *
 * Exemplo:
 * ```ts
 * const response await = dApi.get<IPsPessoas>("/api/v1/psPessoas/1");
 * // Typescript diz que está OK na linha abaixo pois é um campo de data, mas na execução acontecia um erro pois o valor real era uma string vinda do JSON
 * return response.data.dtaAfastamento.toLocaleDateString("pt-BR");
 * ```
 *
 * Não foi excluída na intenção de não quebrar telas que já tratavam o problema.
 *
 * Usar a `api` no lugar que possui o casting automático de campos de data dentro dos interceptors do axios.
 */
const dApi = apis[0];
const api = apis[1];

[
    { api: dApi, dateTransform: false },
    { api, dateTransform: true },
].forEach(({ api: currentApi, dateTransform }) => {
    currentApi.interceptors.response.use(
        response => {
            if (stackExceptionMessagesRoutes.includes(response.request.responseURL)) {
                apiEventEmitter.emit('modal_exception_toggle', false);
            }

            if (dateTransform) {
                response.data = castDatesInObj(response.data);
            }

            return response;
        },
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                // Ocorreu um 401 - Token expirou ou outro motivo
                apiEventEmitter.emit('invalid_token');
            } else if (error.response?.status === 271 || error.response?.status === 270) {
                // Adiciona em uma pilha a requisição que deu erro
                stackExceptionMessagesRoutes.push(error.request.responseURL);
                apiEventEmitter.emit('api_sql_error', [error.response.data.exception, error.response.data.stackTrace]);
            }

            return Promise.reject(error);
        },
    );
});

const isObject = (value: any) => typeof value === 'object' && value !== null && !Array.isArray(value);
const datePrefixes = ['dta', 'dth'];
const castDatesInObj = (obj: unknown): unknown => {
    if (obj === null) {
        return obj;
    }
    if (obj instanceof Array) {
        return obj.map(v => (isObject(v) ? castDatesInObj(v) : v));
    }

    if (isObject(obj)) {
        return Object.fromEntries(
            Object.entries(obj as Record<string, unknown>).map(([key, value]) => {
                if (value === null) {
                    return [key, value];
                }
                if (datePrefixes.some(p => key.startsWith(p))) {
                    if (value instanceof Array) {
                        return [key, value.map(castDate)];
                    }
                    if (isObject(value)) {
                        return [key, value];
                    }
                    return [key, castDate(value as string)];
                }
                return [key, castDatesInObj(value)];
            }),
        );
    }

    return obj;
};

const castDate = (dateStr: string) => {
    const [match, date, time] =
        /(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z?([+|-]\d{2}:?\d{2})?)?/.exec(dateStr) ?? [];
    if (!match || match !== dateStr) throw new Error('Erro na conversão de Data.');
    return new Date(`${date}${time ?? 'T00:00:00'}`);
};

export { apiEventEmitter, dApi, api };
