package com.bgjm.config.session;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.bgjm.config.session.dto.GeSession;
import com.bgjm.exceptions.NlMsgRuntimeErrorException;
import org.springframework.stereotype.Component;

@Component
public class GlobalGeSessions implements Serializable {

	private static final long serialVersionUID = -1580704163616192669L;

	public GlobalGeSessions() {
		super();
	}

	public void putSession(final Integer session) {

	}

	public GeSession getCurrentSession() throws NlMsgRuntimeErrorException {
		return null;
	}

	private boolean isSessionExpired(final GeSession session) {
		final LocalDateTime ldt = session.getDthInicioConexao().plusSeconds(20000000);
		return ldt.isBefore(LocalDateTime.now());
	}


}
