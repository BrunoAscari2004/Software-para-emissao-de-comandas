export default interface IGeCaixas {
    codCaixa: number;
    desCaixa: string;
    codUnidade: number;
    tipCaixa: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    tipCaixaNLPDV: 0 | 1 | 2;
    vlrMaxSaldo: number;
    indCpartida: number;
    indOnLine: 0 | 1;
    indSldFechamento: 0 | 1;
    indEmTransito: 0 | 1;
    indPositivo: 0 | 1;
    vlrLastro: number;
    codUnidadeFk: {
        desNome: string;
    };
    codCalendarioFk: {
        desCalendario: string;
    };
    codGruposCaixasFk: {
        desGrupo: string;
    };
    codDocLastroFk: {
        desDocumento: string;
    };
    numEcf: number;
    numEcfSat: string;
    dtaInatividadeEcf: Date;
    desInatividadeEcf: string;
}
