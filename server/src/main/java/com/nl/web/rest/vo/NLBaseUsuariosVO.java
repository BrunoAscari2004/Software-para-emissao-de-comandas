package com.nl.web.rest.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class NLBaseUsuariosVO implements Serializable {

    private static final long serialVersionUID = -567517249238367924L;

    @NotNull
    private Long idUsuario;

    @NotNull
    @Size(min = 1, max = 100)
    private String desUsuario;

    @NotNull
    @Size(min = 1, max = 100)
    private String desEmail;

    @NotNull
    @Size(min = 1, max = 100)
    private String desSenha;

    private LocalDate dtaCriacao;

    private LocalDateTime dtaAlteracao;

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDesUsuario() {
        return desUsuario;
    }

    public void setDesUsuario(String desUsuario) {
        this.desUsuario = desUsuario;
    }

    public String getDesEmail() {
        return desEmail;
    }

    public void setDesEmail(String desEmail) {
        this.desEmail = desEmail;
    }

    public String getDesSenha() {
        return desSenha;
    }

    public void setDesSenha(String desSenha) {
        this.desSenha = desSenha;
    }

    public LocalDate getDtaCriacao() {
        return dtaCriacao;
    }

    public void setDtaCriacao(LocalDate dtaCriacao) {
        this.dtaCriacao = dtaCriacao;
    }

    public LocalDateTime getDtaAlteracao() {
        return dtaAlteracao;
    }

    public void setDtaAlteracao(LocalDateTime dtaAlteracao) {
        this.dtaAlteracao = dtaAlteracao;
    }

    @Override
    public String toString() {
        return "NLBaseUsuariosVO [idUsuario=" + idUsuario + ", desUsuario=" + desUsuario + ", desEmail=" + desEmail
            + ", desSenha=" + desSenha + ", dtaCriacao=" + dtaCriacao + ", dtaAlteracao=" + dtaAlteracao + "]";
    }


}
