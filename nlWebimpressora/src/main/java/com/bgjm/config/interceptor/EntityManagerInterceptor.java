package com.bgjm.config.interceptor;

import java.io.Serializable;

import javax.persistence.EntityManager;

import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class EntityManagerInterceptor extends EmptyInterceptor {

	private static final long serialVersionUID = -3546909005622832593L;

	private static final Logger logger = LoggerFactory.getLogger(EntityManagerInterceptor.class);

	private final ApplicationContext context;



	public EntityManagerInterceptor(final ApplicationContext context) {
		super();
		this.context = context;
	}

	@Override
	public void onDelete(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
		logger.debug("Setando ge_sessoes para delete.");// Sessão: {}.", geSessions.getCurrentSession());
		super.onDelete(entity, id, state, propertyNames, types);
	}

	@Override
	public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState,
			String[] propertyNames, Type[] types) {
		logger.debug("Setando ge_sessoes para update.");// Sessão: {}.", geSessions.getCurrentSession());
		return super.onFlushDirty(entity, id, currentState, previousState, propertyNames, types);
	}

	@Override
	public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
		logger.debug("Setando ge_sessoes para save.");// Sessão: {}.", geSessions.getCurrentSession());
		return super.onSave(entity, id, state, propertyNames, types);
	}

}
