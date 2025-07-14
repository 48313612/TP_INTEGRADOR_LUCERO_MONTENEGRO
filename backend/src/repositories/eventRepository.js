import db from '../configs/db-config.js';

export const getAllEventsFromDB = async (limit, offset) => {
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

export const searchEventsInDB = async (filters) => {
  const { name, startdate, tag } = filters;

  let query = `
    SELECT 
      e.id, e.name, e.description, e.start_date, e.duration_in_minutes, 
      e.price, e.enabled_for_enrollment, e.max_assistance,
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
  `;

  const conditions = [];
  const values = [];
  let index = 1;

  if (tag) {
    query += ` JOIN tag t ON t.id = e.id_event_category `;
    conditions.push(`t.name ILIKE $${index++}`);
    values.push(`%${tag}%`);
  }

  if (name) {
    conditions.push(`e.name ILIKE $${index++}`);
    values.push(`%${name}%`);
  }

  if (startdate) {
    conditions.push(`DATE(e.start_date) = $${index++}`);
    values.push(startdate);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  query += ` ORDER BY e.start_date ASC`;

  const result = await db.query(query, values);
  return result.rows;
};