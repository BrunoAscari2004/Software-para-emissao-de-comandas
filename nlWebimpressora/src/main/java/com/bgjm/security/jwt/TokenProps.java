package com.bgjm.security.jwt;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TokenProps implements Serializable {

	private static final long serialVersionUID = -8566355560312308067L;

	@Value("${nl.security.authentication.jwt.token-validity-in-seconds}")
    private Long timeTokenInSeconds;

    @Value("${nl.security.authentication.jwt.base64-secret}")
    private String secret;

    public Long getTimeTokenInSeconds() {
        return timeTokenInSeconds;
    }

    public void setTimeTokenInSeconds(final Long timeTokenInSeconds) {
        this.timeTokenInSeconds = timeTokenInSeconds;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }
}
