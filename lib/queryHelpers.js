// queryHelpers.js

const buildFilter = (req) => {
  const filterByTag = req.query.tags;
  const filterByType = req.query.tipo;
  const precio = req.query.precio;
  const namePattern = req.query.nombre;

  const filter = {};

  if (filterByTag) {
    filter.tags = filterByTag;
  }

  if (filterByType === "venta") {
    filter.tipo = true;
  } else if (filterByType === "busqueda") {
    filter.tipo = false;
  }

  if (precio) {
    const precioRange = precio.split("-");

    if (precioRange.length === 2) {
      const [min, max] = precioRange;
      if (min) filter.precio = { ...filter.precio, $gte: parseFloat(min) };
      if (max) filter.precio = { ...filter.precio, $lte: parseFloat(max) };
    } else if (precioRange.length === 1) {
      filter.precio = parseFloat(precio);
    }
  }

  if (namePattern) {
    filter.nombre = new RegExp("^" + namePattern, "i");
  }

  return filter;
};

const buildOptions = (req) => {
  const skip = parseInt(req.query.skip, 10) || 0; // Default to 0 if undefined
  const limit = parseInt(req.query.limit, 10) || 0; // Provide a default limit if undefined

  const sort = {};
  if (req.query.sort) {
    const sortFields = req.query.sort.split(" ");

    sortFields.forEach((sortField) => {
      const sortOrder = sortField.startsWith("-") ? -1 : 1;
      const field = sortField.replace(/^-/, "");
      sort[field] = sortOrder;
    });
  }

  return { skip, limit, sort };
};

module.exports = { buildFilter, buildOptions };
