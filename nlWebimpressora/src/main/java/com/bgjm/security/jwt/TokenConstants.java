package com.bgjm.security.jwt;

public class TokenConstants {

	private TokenConstants() {
		// Hiding public constructor
	}

	public enum JWTKeys {
		AUTHORITIES_KEY("auth", String.class, null),
		SESSION_KEY("session_id", Long.class, "cod_sessao"),
		EMPRESA_KEY("empresa_id", Integer.class, "cod_emp"),
		PESSOA_KEY("pessoa_id", Long.class, "cod_pessoa"),
		PERFIL_KEY("perfil_id", Integer.class, "cod_perfil"),
		MAQUINA_KEY("maquina_id", Integer.class, "cod_maquina"),
		MASCARA_PS("mascara_ps_id", Integer.class, "cod_mascara_ps"),
		MASCARA_PR("mascara_pr_id", Integer.class, "cod_mascara_pr"),
		MASCARA_CB("mascara_cb_id", Integer.class, "cod_mascara_cb"),
		MASCARA_AP("mascara_ap_id", Integer.class, "cod_mascara_ap"),
		LAYOUT_KEY("layout_id", Integer.class, "cod_layout"),
		COD_GUPR("cod_gupr_id", Integer.class, "cod_gupr"),
		COD_GUPS("cod_gups_id", Integer.class, "cod_gups"),
		COD_GU1("cod_gu1_id", Integer.class, "cod_gu1"),
		COD_GU2("cod_gu2_id", Integer.class, "cod_gu2"),
		COD_GU3("cod_gu3_id", Integer.class, "cod_gu3"),
		COD_GU4("cod_gu4_id", Integer.class, "cod_gu4"),
		COD_GU5("cod_gu5_id", Integer.class, "cod_gu5"),
		COD_GU6("cod_gu6_id", Integer.class, "cod_gu6"),
		COD_GU7("cod_gu7_id", Integer.class, "cod_gu7"),
		COD_GU8("cod_gu8_id", Integer.class, "cod_gu8"),
		COD_GU9("cod_gu9_id", Integer.class, "cod_gu9"),
		GR_CAIXA_KEY("gr_caixa_id", Integer.class, "cod_gr_caixa"),
		CAIXA_KEY("caixa_id", Long.class, "cod_caixa"),
		COD_MOEDA("cod_moeda_id", Integer.class, "cod_moeda");

		private final String key;
		private final Class<?> clazz;
		private final String convencionalNlName;

		JWTKeys(final String key, final Class<?> clazz, final String convencionalNlName) {
			this.key = key;
			this.clazz = clazz;
			this.convencionalNlName = convencionalNlName;
		}

		public String getKey() {
			return key;
		}

		public Class<?> getClazz() {
			return clazz;
		}

		public String getConvencionalNlName() {
			return convencionalNlName;
		}
	}
}
