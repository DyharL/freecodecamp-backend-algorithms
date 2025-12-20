def add_time(start, duration, starting_day=None):
    time_part, period = start.split()
    start_hour, start_min = map(int, time_part.split(':'))
    dur_hour, dur_min = map(int, duration.split(':'))

    if period == 'PM' and start_hour != 12:
        start_hour += 12
    elif period == 'AM' and start_hour == 12:
        start_hour = 0

    total_min = start_min + dur_min
    extra_hours = total_min // 60
    final_min = total_min % 60

    total_hours = start_hour + dur_hour + extra_hours
    days_later = total_hours // 24
    final_24_hour = total_hours % 24

    if final_24_hour == 0:
        final_period = 'AM'
        final_12_hour = 12
    elif final_24_hour < 12:
        final_period = 'AM'
        final_12_hour = final_24_hour
    elif final_24_hour == 12:
        final_period = 'PM'
        final_12_hour = 12
    else:
        final_period = 'PM'
        final_12_hour = final_24_hour - 12

    formatted_time = f"{final_12_hour}:{str(final_min).zfill(2)} {final_period}"

    weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    if starting_day:
        start_idx = weekdays.index(starting_day.lower())
        final_day = weekdays[(start_idx + days_later) % 7].capitalize()
        formatted_time += f", {final_day}"

    if days_later == 1:
        formatted_time += " (next day)"
    elif days_later > 1:
        formatted_time += f" ({days_later} days later)"

    return formatted_time
