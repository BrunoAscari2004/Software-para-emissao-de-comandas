package com.bgjm.config.session.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class GeSession implements Serializable {

	private static final long serialVersionUID = -7062914522999097390L;

	private final Integer session;
	private final String ipCliente;
	private final String codUsuario;
	private final Integer codEmp;
	private final Integer codCaixa;
	private final String desPagina;
	private final LocalDateTime dthInicioConexao;
	private final String piTxtDados;

	public GeSession(final Integer session, final String ipCliente, final String codUsuario, final Integer codEmp,
			final Integer codCaixa, final String desPagina, final LocalDateTime dthInicioConexao,
			final String piTxtDados) {
		super();
		this.session = session;
		this.ipCliente = ipCliente;
		this.codUsuario = codUsuario;
		this.codEmp = codEmp;
		this.codCaixa = codCaixa;
		this.desPagina = desPagina;
		this.dthInicioConexao = dthInicioConexao;
		this.piTxtDados = piTxtDados;
	}

	public Integer getSession() {
		return session;
	}

	public String getIpCliente() {
		return ipCliente;
	}

	public String getCodUsuario() {
		return codUsuario;
	}

	public Integer getCodEmp() {
		return codEmp;
	}

	public Integer getCodCaixa() {
		return codCaixa;
	}

	public String getDesPagina() {
		return desPagina;
	}

	public LocalDateTime getDthInicioConexao() {
		return dthInicioConexao;
	}

	public String getPiTxtDados() {
		return piTxtDados;
	}

	@Override
	public int hashCode() {
		return Objects.hash(session);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GeSession other = (GeSession) obj;
		return Objects.equals(session, other.session);
	}

	@Override
	public String toString() {
		return "GeSession [session=" + session + ", ipCliente=" + ipCliente + ", codUsuario=" + codUsuario + ", codEmp="
				+ codEmp + ", codCaixa=" + codCaixa + ", desPagina=" + desPagina + ", dthInicioConexao="
				+ dthInicioConexao + ", piTxtDados=" + piTxtDados + "]";
	}

}
