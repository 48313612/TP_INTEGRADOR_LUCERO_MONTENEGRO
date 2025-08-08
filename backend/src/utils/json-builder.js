/**
 * JSON Builder Utility for consistent JSON object construction
 */

export const buildEventJson = (eventData) => {
  return {
    id: eventData.id,
    name: eventData.name,
    description: eventData.description,
    start_date: eventData.start_date,
    duration_in_minutes: eventData.duration_in_minutes,
    price: eventData.price,
    enabled_for_enrollment: eventData.enabled_for_enrollment,
    max_assistance: eventData.max_assistance,
    creator_user: {
      id: eventData.creator_user?.id || null,
      first_name: eventData.creator_user?.first_name || '',
      last_name: eventData.creator_user?.last_name || '',
      username: eventData.creator_user?.username || ''
    },
    event_location: buildEventLocationJson(eventData.event_location),
    tags: eventData.tags ? eventData.tags.map(tag => buildTagJson(tag)) : []
  };
};

export const buildEventLocationJson = (locationData) => {
  if (!locationData) return null;
  
  return {
    id: locationData.id,
    id_location: locationData.id_location,
    location: {
      id: locationData.location?.id || null,
      name: locationData.location?.name || '',
      full_address: locationData.location?.full_address || '',
      latitude: locationData.location?.latitude || 0,
      longitude: locationData.location?.longitude || 0,
      province: locationData.location?.province ? {
        id: locationData.location.province.id,
        name: locationData.location.province.name,
        full_name: locationData.location.province.full_name
      } : null
    }
  };
};

export const buildTagJson = (tagData) => {
  if (!tagData) return null;
  
  return {
    id: tagData.id,
    name: tagData.name
  };
};

export const buildApiResponseJson = (success, data, message = null, errors = null) => {
  return {
    success,
    data,
    message,
    errors,
    timestamp: new Date().toISOString()
  };
};

export const buildPaginatedResponseJson = (data, page, limit, total) => {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};
