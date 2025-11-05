export const validate = (schema, sorov) => {
  return async (req, res, next) => {
    if (!req[sorov]) {
      return res.status(400).json({ message: `Request ${sorov} topilmadi` });
    }

    // 2. Schema mavjudligini tekshirish
    if (!schema || typeof schema.safeParse !== 'function') {
      return res
        .status(500)
        .json({ message: 'Schema notogri yoki import qilinmagan' });
    }

    // 3. Validatsiyani bajarish
    const result = schema.safeParse(req[sorov]);

    if (!result.success) {
      const message =
        result.error?.issues?.[0]?.message || 'Validatsiya xatosi';
      return res.status(422).json({ message });
    }

    // 4. Validatsiyadan o‘tgan ma’lumotni yozish
    req[sorov] = result.data;
    next();
  };
};
