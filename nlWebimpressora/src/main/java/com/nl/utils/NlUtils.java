package com.nl.utils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.persistence.Column;

public class NlUtils implements Serializable {
    private static final long serialVersionUID = -4168696455724087024L;

    public static String snakeCaseToCamelCase (String name) {
        name = name.toLowerCase(Locale.ROOT);
        while (name.contains("_")) {
            name = name.replaceFirst("_[A-Za-z_]",
                String.valueOf(Character.toUpperCase(name.charAt(name.indexOf("_") + 1))));
        }
        return name;
    }

    public static String camelCaseToSnakeCase(final String name) {
        if (Objects.isNull(name)) {
            return "";
        }

        List<Character> chars = new ArrayList<>(name.length() * 2);

        for (int i = 0; i < name.length(); i++) {
            char c = name.charAt(i);
            if (Character.isUpperCase(c)) {
                chars.add('_');
            }
            chars.add(c);
        }
        return chars.stream().map(String::valueOf).collect(Collectors.joining("")).toLowerCase();
    }

	public static List<String> getColumnsFromEntity(Class<?> klass) {
		return Arrays.stream(klass.getDeclaredFields())
			.filter(field -> field.isAnnotationPresent(Column.class))
			.map(field -> field.getAnnotation(Column.class))
			.map(Column::name)
			.collect(Collectors.toList());
	}
}
