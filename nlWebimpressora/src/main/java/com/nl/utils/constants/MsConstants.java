package com.nl.utils.constants;

public class MsConstants {
	public interface PsPessoasConstants {
		enum TIP_PESSOA {
			TODAS(0),
			REPRESENTANTE(1),
			CLIENTE_FORNECEDOR(2),
			CONTATO_HOLDING(3);
			private final Integer value;

			TIP_PESSOA(final Integer value) {
				this.value = value;
			}

			public Integer getValue() {
				return value;
			}
		}
	}

	public interface MsPaginasConfig {
		Integer NUM_CONTEXTO_DEFAULT = 1;

		enum TIP_ACESSO {
			LIVRE(1), RESTRITO(2);
			private final Integer tipAcesso;

			TIP_ACESSO(final int tipAcesso) {
				this.tipAcesso = tipAcesso;
			}

			public Integer getTipAcesso() {
				return tipAcesso;
			}
		}
	}

}
