/*
 Arquivo para funções que podem ser utilizadas nos HTMLs.
 Separado do main.js pois esse é carregado de forma assíncrona para ter acesso a DOM e
 executar as manipulações que são necessárias. Esse arquivo será carregado junto com o documento
 de forma síncrona, garantindo que todas as suas funções existem no HTML desde o primeiro momento.
*/

/**
 * @typedef HelpNavigationInfo
 * @prop {string} requestedHelp - A página do help requisitada originalmente no React
 */

/** @type {HelpNavigationInfo | null} */
let helpNavigationInfo;
window.addEventListener('message', event => {
    if (event.origin !== location.origin) return;
    if (event.data.id === 'NL_INFO') {
        helpNavigationInfo = event.data.payload;
    }
});

const NAVIGATION_TIMEOUT_SECS = 5;
const getCurrentHelpDetails = async () =>
    new Promise((resolve, reject) => {
        if (helpNavigationInfo) return resolve(helpNavigationInfo);

        const interval = setInterval(() => {
            if (helpNavigationInfo) {
                resolve(helpNavigationInfo);
                clearInterval(interval);
            }
        }, 50);

        setTimeout(() => {
            console.error(
                `Não foi possível buscar as informações da navegação pois elas não foram enviadas a tempo! (${NAVIGATION_TIMEOUT_SECS} segundos)`,
            );
            reject(null);
        }, NAVIGATION_TIMEOUT_SECS * 1000);
    });
