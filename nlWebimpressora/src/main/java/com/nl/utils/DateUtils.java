package com.nl.utils;

import java.io.Serializable;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;

public class DateUtils implements Serializable {

	public static final String STD_PATTERN_DATE = "dd/MM/yyyy";
	private static final long serialVersionUID = -1344031533038363076L;

	private DateUtils() {
	}

	public static Date addDays(Date date, long daysToAdd) {
		if (date == null) {
			return null;
		}
		return localDateTimeToDate(dateToLocalDateTime(date).plusDays(daysToAdd));
	}

	public static String getDiaSemana(Date date) {
		if (date == null) {
			return "";
		}
		return getDiaSemana(dateToLocalDateTime(date).getDayOfWeek());
	}

	public static String getDiaSemana(DayOfWeek dw) {
		return dw.getDisplayName(TextStyle.FULL, Locale.getDefault());
	}

	public static LocalDateTime dateToLocalDateTime(Date date) {
		if (date instanceof java.sql.Date) {
			return ((java.sql.Date) date).toLocalDate().atStartOfDay();
		}
		if (date == null) {
			return null;
		}
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	}

	public static LocalDate dateToLocalDate(Date date) {
		if (date instanceof java.sql.Date) {
			return ((java.sql.Date) date).toLocalDate();
		}
		if (date == null) {
			return null;
		}
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	}

	public static Date localDateTimeToDate(LocalDateTime ldt) {
		if (ldt == null) {
			return null;
		}
		return Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
	}

	public static boolean isWeekend(Date date) {
		return isWeekend(dateToLocalDateTime(date));
	}

	public static boolean isWeekend(LocalDateTime date) {
		return isSabado(date) || isDomingo(date);
	}

	public static boolean isSegunda(Date date) {
		return isSegunda(dateToLocalDateTime(date));
	}

	public static boolean isTerca(Date date) {
		return isTerca(dateToLocalDateTime(date));
	}

	public static boolean isQuarta(Date date) {
		return isQuarta(dateToLocalDateTime(date));
	}

	public static boolean isQuinta(Date date) {
		return isQuinta(dateToLocalDateTime(date));
	}

	public static boolean isSexta(Date date) {
		return isSexta(dateToLocalDateTime(date));
	}

	public static boolean isSabado(Date date) {
		return isSabado(dateToLocalDateTime(date));
	}

	public static boolean isDomingo(Date date) {
		return isDomingo(dateToLocalDateTime(date));
	}

	public static boolean isSegunda(LocalDateTime date) {
		return date != null && date.getDayOfWeek() == DayOfWeek.MONDAY;
	}

	public static boolean isTerca(LocalDateTime date) {
		return date != null && date.getDayOfWeek() == DayOfWeek.TUESDAY;
	}

	public static boolean isQuarta(LocalDateTime date) {
		return date != null && date.getDayOfWeek() == DayOfWeek.WEDNESDAY;
	}

	public static boolean isQuinta(LocalDateTime date) {
		return date != null && date.getDayOfWeek() == DayOfWeek.THURSDAY;
	}

	public static boolean isSexta(LocalDateTime date) {
		return date != null && date.getDayOfWeek() == DayOfWeek.FRIDAY;
	}

	public static boolean isSabado(LocalDateTime date) {
		return date != null && date.getDayOfWeek() == DayOfWeek.SATURDAY;
	}

	public static boolean isDomingo(LocalDateTime date) {
		return date != null && date.getDayOfWeek() == DayOfWeek.SUNDAY;
	}

	public static boolean isDateBetween(Date target, Date start, Date end) {
		if (target == null || start == null || end == null) {
			return false;
		}

		return target.compareTo(start) >= 0 && target.compareTo(end) <= 0;
	}

	public static boolean isGreaterEqual(Date test, Date target) {
		if (test == null || target == null) {
			return true;
		}
		return isGreaterEqual(dateToLocalDateTime(test).toLocalDate(), dateToLocalDateTime(target).toLocalDate());
	}

	public static boolean isGreaterEqual(LocalDate test, LocalDate target) {
		if (test == null || target == null) {
			return true;
		}
		return test.isEqual(target) || test.isAfter(target);
	}

	public static String formartarDate(Date d, String pattern) {
		if (d == null) {
			return "";
		}
		String ptn = pattern == null ? STD_PATTERN_DATE : pattern;
		return dateToLocalDateTime(d).format(DateTimeFormatter.ofPattern(ptn));
	}

	public static String formatarDatePatternDefault(LocalDate d) {
		return formartarDate(DateUtils.localDateToDate(d), STD_PATTERN_DATE);
	}

	public static String formatarDatePatternDefault(Date d) {
		return formartarDate(d, STD_PATTERN_DATE);
	}

	public static boolean gt(Date date, Date then) {
		return date != null && then != null && date.compareTo(then) > 0;
	}

	public static boolean ge(Date date, Date then) {
		return date != null && then != null && date.compareTo(then) >= 0;
	}

	public static boolean lt(Date date, Date then) {
		return date != null && then != null && date.compareTo(then) < 0;
	}

	public static boolean le(Date date, Date then) {
		return date != null && then != null && date.compareTo(then) <= 0;
	}

	public static long getDaysBetween(Date startAt, Date until) {
		if (Objects.isNull(startAt) || Objects.isNull(until)) {
			return -1L;
		}
		return dateToLocalDateTime(startAt).until(dateToLocalDateTime(until), ChronoUnit.DAYS);
	}

	public static Date localDateToDate(final LocalDate date) {
		if (Objects.isNull(date)) {
			return null;
		}
		return localDateTimeToDate(date.atTime(0, 0));
	}

	public static Date dateNow() {
		return DateUtils.localDateTimeToDate(LocalDateTime.now());
	}

	public static Date dateNowAtStartOfDay() {
		return DateUtils.localDateTimeToDate(LocalDate.now().atStartOfDay());
	}
}
