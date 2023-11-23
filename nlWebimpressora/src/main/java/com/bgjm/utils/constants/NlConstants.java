package com.bgjm.utils.constants;

public class NlConstants {
    public enum NL_LOV_SUBS_COND_TIP_OPER_REL {
        IS_NULL(1),
        IS_NOT_NULL(2),
        EQUALS(3),
        DIFFRENT(4),
        GREATER_THAN(5),
        GREATER_OR_EQUAL_THAN(6),
        LESS_THAN(7),
        LESS_OR_EQUAL_THAN(8),
        IN(9),
        NOT_IN(10),
        BETWEEN(11),
        LIKE(12),
        NOT_LIKE(13);
        private final Integer tipOperRel;

        NL_LOV_SUBS_COND_TIP_OPER_REL(final Integer tipOperRel) {
            this.tipOperRel = tipOperRel;
        }

        public Integer getTipOperRel() {
            return tipOperRel;
        }
    }
}
