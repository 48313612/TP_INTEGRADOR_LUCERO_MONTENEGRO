class Event{
    constructor({ id, name, description, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, creator_user, event_location }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.start_date = start_date;
        this.duration_in_minutes = duration_in_minutes;
        this.price = price;
        this.enabled_for_enrollment = enabled_for_enrollment;
        this.max_assistance = max_assistance;
        this.creator_user = creator_user;
        this.event_location = event_location;
    }
}

export default Event;