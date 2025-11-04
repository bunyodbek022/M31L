export const searchAndPaginate = async (
  searchQuery,
  model,
  limit,
  offset,
  populate = [],
) => {
  if (!model) throw new Error('Model topilmadi');

  const schemaPaths = Object.keys(model.schema.paths).filter(
    (f) => !['_id', '__v'].includes(f),
  );

  // Qidiruv shartlari
  let searchCondition = {};
  if (searchQuery) {
    searchCondition = {
      $or: schemaPaths.map((field) => ({
        [field]: { $regex: searchQuery, $options: 'i' },
      })),
    };
  }

  // Populate  qoshish
  let query = model.find(searchCondition).skip(offset).limit(limit);
  if (Array.isArray(populate) && populate.length) {
    populate.forEach((p) => {
      query = query.populate(p);
    });
  }

  const results = await query;
  const total = await model.countDocuments(searchCondition);

  return { results, total };
};
