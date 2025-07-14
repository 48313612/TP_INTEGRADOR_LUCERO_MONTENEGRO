import db from '../configs/db-config';

export default getAllEventsFromDB = async (limit, offset) => {
  const result = await db.query(`
    SELECT 
      e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, 
      e.enabled_for_enrollment, e.max_assistance,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'email', u.email
      ) as user,
      json_build_object(
        'id', l.id,
        'address', l.address,
        'city', l.city,
        'province', l.province
      ) as location
    FROM event e
    JOIN users u ON e.id_creator_user = u.id
    JOIN location l ON e.id_event_location = l.id
    ORDER BY e.start_date ASC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);
  return result.rows;
};