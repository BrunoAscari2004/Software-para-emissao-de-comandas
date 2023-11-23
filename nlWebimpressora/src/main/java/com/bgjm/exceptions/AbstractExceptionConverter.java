package com.bgjm.exceptions;

import java.sql.SQLException;
import java.text.DecimalFormat;

/**
 * Mapeia exceções de banco de dados Oracle em exceções do framework N&L
 *
 * @author Alexandre Krohn
 * @since 08/05/2008
 *
 */
public class AbstractExceptionConverter {

	private AbstractExceptionConverter (){
		// Hide implicit constructor
	}

	/**
	 * Converte uma mensagem SQL do banco Oracle (ORA-XXXXX) em uma mensagem do
	 * N&L Gestão, e a empacota em uma exceção do tipo
	 * <code>NLMensagensException</code>
	 *
	 * @param sqle A exceção disparada pelo banco de dados
	 * @return Um objeto <code>NLMensagensException</code> contendo a mensagem do
	 *         N&L Gestão empacotada como exceção
	 */
	public static NlMensagensException createNlMensagensException(SQLException sqle) {
		DecimalFormat df = new DecimalFormat("00000");

		int code = sqle.getErrorCode();
		String strMsg = sqle.getMessage();

		String tipMensagem = "ORA";
		String codMensagem = df.format(code);
		String desMensagem = null;

		String[] complemento = null;

		if (code > 20000) {
			String suf = "ORA-" + code + ":";
			strMsg = strMsg.substring(suf.length()).trim();
			tipMensagem = strMsg.substring(0, 2);

			int iniCompl = strMsg.indexOf("#");
			int fimCompl = strMsg.indexOf(10, iniCompl);

			if (iniCompl != -1) {
				if (fimCompl == -1) {
					fimCompl = strMsg.length();
				}
				String comp = strMsg.substring(iniCompl + 1, fimCompl + 1);
				complemento = comp.split("#", -1);
			}
			//Se inicia com "XX-20000: " - é o novo padrão de mensagens disparado pela NL_APPLICATION_ERROR_SP
			// Onde a mensagem já está pronta com os complementos entao: pega a mensagem até a quebra de linha
			if (strMsg.startsWith(tipMensagem + "-" + code + ": ")) {
				fimCompl = strMsg.indexOf("\n----", iniCompl);
				if (fimCompl == -1) {
					fimCompl = strMsg.indexOf("\nORA-", iniCompl);
				}
				if (fimCompl == -1) {
					fimCompl = strMsg.length();
				}
				desMensagem = strMsg.substring(10, fimCompl);
			}
		} else {
			complemento = new String[] { sqle.getMessage() };
		}

		NlMensagensException msgEx = new NlMensagensException(sqle, tipMensagem, codMensagem, complemento);
		msgEx.setDesMensagem(desMensagem);
		return msgEx;
	}
}
