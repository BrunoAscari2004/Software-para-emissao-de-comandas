package com.bgjm.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.sql.Clob;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.Tuple;
import javax.persistence.TupleElement;

import com.bgjm.exceptions.NlMsgErroException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NativeUtils implements Serializable {

    private static final long serialVersionUID = -9218980287654489960L;
    private static final Logger logger = LoggerFactory.getLogger("NativeUtils - Converter");

    public static <T> List<T> convertResultList(List<Tuple> results, Class<T> t) throws NlMsgErroException {
        List<T> newResultList = new ArrayList<>(results.size());

        for (final Tuple tuple : results) {
            Constructor<T> constructor = (Constructor<T>) Arrays.stream(t.getDeclaredConstructors()).filter(
                o -> o.getGenericParameterTypes().length == 0).findFirst().orElseThrow(
                () -> new NlMsgErroException("Não existe construtor vazio para classe."));
            T obj;
            try {
                obj = constructor.newInstance();
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
                throw new NlMsgErroException(
                    "Não foi possível instanciar a classe solicitada, verifique se ela tem " + "um construtor vazio");
            }
            Class<?> current = t;
            while (current.getSuperclass() != null) { // Não deve executar sobre a classe Object
                Field[] fields = current.getDeclaredFields();
                for (final Field field : fields) {
                    if (Modifier.isStatic(field.getModifiers())) {
                        continue;
                    }
                    setValueInFieldObject(current, tuple, obj, field);
                }
                current = current.getSuperclass();
            }

            newResultList.add(obj);
        }
        return newResultList;
    }

    public static List<Map<String, Object>> convertGenericResult(List<Tuple> results) {
        return results.stream().map(NativeUtils::convertGenericResult).collect(Collectors.toList());
    }

    public static <T> Map<String, T> convertGenericResult(Tuple tuple) {
        HashMap<String, T> sqlResult = new HashMap<>();
        for (TupleElement<?> tupleElement : tuple.getElements()) {
            sqlResult.put(
                NlUtils.snakeCaseToCamelCase(tupleElement.getAlias()),
				(T) tuple.get(tupleElement.getAlias())
			);
        }
        return sqlResult;
    }

    private static <T> void setValueInFieldObject(final Class<?> t, final Tuple tuple, final T obj,
                                                  final Field field) {
        String fieldName = field.getName();
        String fieldNameSnakeCase = NlUtils.camelCaseToSnakeCase(fieldName);
        Object o;
        try {
            o = tuple.get(fieldName);
        } catch (IllegalArgumentException e) {
            try {
                o = tuple.get(fieldNameSnakeCase);
            } catch (IllegalArgumentException e1) {
                o = null;
            }
        }
        String methodName = "set" + upperCaseFirst(fieldName);
        try {
            t.getDeclaredMethod(methodName, field.getType()).invoke(obj, cast(o, field.getType()));
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            logger.warn(String.format("Não existe o método %s na classe %s.", methodName, t.getSimpleName()));
        }  catch (SQLException e) {
            logger.error("Não foi possível ler o objeto {} para a classe {}, método {}.", fieldName, t.getSimpleName(),
                    methodName);
        }
    }

    private static <T> Object cast(final Object o, final Class<T> type) throws SQLException {
        if (o != null && o.getClass().getSuperclass() == Number.class) {
            if (type == Long.class || type == long.class) {
                return ((Number) o).longValue();
            }
            if (type == Integer.class || type == int.class) {
                return ((Number) o).intValue();
            }
            if (type == Float.class || type == float.class) {
                return ((Number) o).floatValue();
            }
            if (type == Double.class || type == double.class) {
                return ((Number) o).doubleValue();
            }
        }
        if (o != null && o.getClass() == Timestamp.class) {
            if (type == ZonedDateTime.class) {
				return ZonedDateTime.of(((Timestamp) o).toLocalDateTime(), ZoneId.systemDefault());
			}
			if (type == LocalDate.class) {
                return ((Timestamp) o).toLocalDateTime().toLocalDate();
            }
            if (type == LocalDateTime.class) {
                return ((Timestamp) o).toLocalDateTime();
            }
            if (type == Date.class) {
                return Date.from(((Timestamp) o).toInstant());
            }
        }
        if (o instanceof Clob) {
            Clob c = (Clob) o;
            final StringBuilder sb = new StringBuilder();
            final Reader reader = c.getCharacterStream();
            try (final BufferedReader br = new BufferedReader(reader)) {
                int b;
                while (-1 != (b = br.read())) {
                    sb.append((char) b);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return sb.toString();
        }
        return o;
    }

    private static String upperCaseFirst(final String name) {
        if (Objects.isNull(name)) {
            return "";
        }
        return name.substring(0, 1).toUpperCase() + name.substring(1);
    }
}
