package com.bgjm.security;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.User;

public class NLWebAutheticationToken extends AbstractAuthenticationToken {

	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

	private final User principal;
	private final String credentials;
	private final Map<String, Object> details;

	public NLWebAutheticationToken(final User principal, final Collection<? extends GrantedAuthority> authorities,
			final String credentials, final Map<String, Object> details) {
		super(authorities);
		this.principal = principal;
		this.credentials = credentials;
		this.details = details;
		setAuthenticated(true);
	}

	@Override
	public Object getCredentials() {
		return this.credentials;
	}

	@Override
	public Map<String, Object> getDetails() {
		return this.details;
	}

	@Override
	public User getPrincipal() {
		return this.principal;
	}

	@Override
	public int hashCode() {
		return super.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		NLWebAutheticationToken other = (NLWebAutheticationToken) obj;
		return Objects.equals(credentials, other.credentials);
	}

}
