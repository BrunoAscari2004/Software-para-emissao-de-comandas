package com.nl.exceptions;

import java.util.Arrays;

/**
 * Exceção do Framework N&L. É mapeada para uma mensagem gravada em
 * <b>NlMensagens</b>
 *
 * @author Henrique Fiorio
 * @since 30/04/2008
 *
 */
public class NlMensagensException extends RuntimeException {

	private static final long serialVersionUID = 7128653630948907685L;
	private String tipMensagem;
	private String codMensagem;
	private String[] complemento;

	private Throwable compEx;

	private Throwable originalCause;

	/**
	 * Indica se da RAISE(para) true/false ou null=conforme cadastro msg
	 */
	private Boolean indRaise = null;

	private Integer indBotaoClicado = null;

	/**
	 * Quando uma exceção é disparada do banco pela NL_APPLICATION_MSG_SP ou
	 * NL_APPLICATION_ERROR_SP a descrição da mensagem já vem pronta com os
	 * complementos substituidos. Nesse caso esse campo é atribuido na
	 * {@link AbstractExceptionConverter#createNlMensagensException(java.sql.SQLException)}
	 */
	private String desMensagem;

	private Boolean partialSubmit;
	private String focusAfterMsg;

	/**
	 * Construtor NlMensagensException
	 *
	 * @param tipMensagem equivalente a coluna NL_MENSAGENS.TIP_MENSAGEM
	 * @param codMensagem equivalente a coluna NL_MENSAGENS.COD_MENSAGEM
	 * @param complemento array de complementos da mensagem
	 */
	public NlMensagensException(String tipMensagem, String codMensagem, String... complemento) {
		this.setTipMensagem(tipMensagem);
		this.setCodMensagem(codMensagem);
		this.setComplemento(complemento);
	}

	public NlMensagensException(Throwable cause, String tipMensagem, String codMensagem, String... complemento) {
		super(cause);
		this.setOriginalCause(cause);
		this.setTipMensagem(tipMensagem);
		this.setCodMensagem(codMensagem);
		this.setComplemento(complemento);
	}

	/**
	 * Construtor NlMensagensException
	 *
	 * @param tipMensagem equivalente a coluna NL_MENSAGENS.TIP_MENSAGEM
	 * @param codMensagem equivalente a coluna NL_MENSAGENS.COD_MENSAGEM
	 * @param complemento array de complementos da mensagem
	 */
	public NlMensagensException(String tipMensagem, String codMensagem, Throwable complemento) {
		this.setTipMensagem(tipMensagem);
		this.setCodMensagem(codMensagem);
		this.compEx = complemento;
	}

	/**
	 * Construtor NlMensagensException
	 *
	 * @param tipMensagem equivalente a coluna NL_MENSAGENS.TIP_MENSAGEM
	 * @param codMensagem equivalente a coluna NL_MENSAGENS.COD_MENSAGEM
	 * @param compEx
	 * @param complemento array de complementos da mensagem
	 */
	public NlMensagensException(String tipMensagem, String codMensagem, Throwable compEx, String... complemento) {
		this.setTipMensagem(tipMensagem);
		this.setCodMensagem(codMensagem);
		this.setComplemento(complemento);
		this.compEx = compEx;
	}

	/**
	 * Retorna o tipo da mensagem
	 *
	 * @return Um <code>String</code> contendo o tipo da mensagem
	 */
	public String getTipMensagem() {
		return this.tipMensagem;
	}

	/**
	 * Altera o tipo da mensagem
	 *
	 * @param tipMensagem Um <code>String</code> contendo o tipo da mensagem
	 */
	private void setTipMensagem(String tipMensagem) {
		this.tipMensagem = tipMensagem;
	}

	/**
	 * Retorna o código da mensagem
	 *
	 * @return Um <code>String</code> contendo o código numérico da mensagem
	 */
	public String getCodMensagem() {
		return this.codMensagem;
	}

	/**
	 * Altera o código da mensagem
	 *
	 * @param codMensagem Um <code>String</code> contendo o código númerico da
	 *           mensagem
	 */
	private void setCodMensagem(String codMensagem) {
		this.codMensagem = codMensagem;
	}

	/**
	 * Retorna os complementos da mensagem
	 *
	 * @return Um vetor de <code>String</code> contendo os complementos da
	 *         mensagem
	 */
	public String[] getComplemento() {
		return this.complemento;
	}

	/**
	 * Altera os complementos da mensagem
	 *
	 * @param complemento Um vetor de <code>String</code> contendo os
	 *           complementos da mensagem
	 */
	public void setComplemento(String[] complemento) {
		this.complemento = complemento;
	}

	public Throwable getCompEx() {
		return this.compEx;
	}

	public Boolean getIndRaise() {
		return this.indRaise;
	}

	public void setIndRaise(Boolean indRaise) {
		this.indRaise = indRaise;
	}

	public Integer getIndBotaoClicado() {
		return this.indBotaoClicado;
	}

	public void setIndBotaoClicado(Integer indBotaoClicado) {
		this.indBotaoClicado = indBotaoClicado;
	}

	public Throwable getOriginalCause() {
		return this.originalCause;
	}

	public void setOriginalCause(Throwable originalCause) {
		this.originalCause = originalCause;
	}

	public String getDesMensagem() {
		return this.desMensagem;
	}

	public void setDesMensagem(String desMensagem) {
		this.desMensagem = desMensagem;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((this.codMensagem == null) ? 0 : this.codMensagem.hashCode());
		result = prime * result + Arrays.hashCode(this.complemento);
		result = prime * result + ((this.originalCause == null) ? 0 : this.originalCause.hashCode());
		result = prime * result + ((this.tipMensagem == null) ? 0 : this.tipMensagem.hashCode());

		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (this.getClass() != obj.getClass()) {
			return false;
		}
		NlMensagensException other = (NlMensagensException) obj;
		if (this.codMensagem == null) {
			if (other.codMensagem != null) {
				return false;
			}
		} else if (!this.codMensagem.equals(other.codMensagem)) {
			return false;
		}
		if (!Arrays.equals(this.complemento, other.complemento)) {
			return false;
		}
		if (this.originalCause == null) {
			if (other.originalCause != null) {
				return false;
			}
		} else if (!this.originalCause.equals(other.originalCause)) {
			return false;
		}
		if (this.tipMensagem == null) {
			return other.tipMensagem == null;
		} else
			return this.tipMensagem.equals(other.tipMensagem);
	}

	/**
	 * Testa se esta exceção é de uma mensagem especifica.
	 *
	 * @param tipMensagem
	 * @param codMensagem
	 * @return
	 */
	public boolean is(String tipMensagem, String codMensagem) {
		return this.getTipMensagem() != null && this.getCodMensagem() != null && this.getTipMensagem()
			.equalsIgnoreCase(tipMensagem)
			&& this.getCodMensagem().equalsIgnoreCase(codMensagem);
	}

	public Boolean getPartialSubmit() {
		return this.partialSubmit;
	}

	public void setPartialSubmit(Boolean partialSubmit) {
		this.partialSubmit = partialSubmit;
	}

	public String getFocusAfterMsg() {
		return this.focusAfterMsg;
	}

	public void setFocusAfterMsg(String focusAfterMsg) {
		this.focusAfterMsg = focusAfterMsg;
	}

	@Override
	public String toString() {
		StringBuilder b = new StringBuilder();
		b.append(String.format("%s-%s", this.tipMensagem, this.codMensagem));

		if (this.getCause() != null) {
			b.append(" - ");
			b.append(this.getCause().toString());
		}

		if (this.getComplemento() != null) {
			b.append(" : ");
			b.append(Arrays.toString(this.complemento));
		}

		return b.toString();
	}
}
