package com.nl.web.rest.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class LoginVO implements Serializable {

    private static final long serialVersionUID = 2780735878755033914L;
    @NotNull
    @Size(min = 1, max = 50)
    private String username;

    @NotNull
    @Size(min = 1, max = 100)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginVO{" +
            "username='" + username +
            '}';
    }
}
