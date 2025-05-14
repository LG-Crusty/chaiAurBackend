import { z } from "zod";

const check = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*/d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{5,20}$"
);

const userValidation = z.object({
  username: z.string().min(3).max(5),
  email: z.email(),
  passwordCheck: z
    .object({
      password: z.string().regex(check),
      rePassword: z.string(),
    })
    .refine((val) => val.password === val.rePassword, {
      message: "pasword doesn't match",
      path: ["rePassword"],
    }),
});

// fetching data from body and parsing it

const validationMiddleware = (req, res, next) => {
  const data = req.body;
  const validation = userValidation.safeParse(req.body);

  validation.success
    ? next()
    : res.sendStatus(400).json(
        validation
      );
};

export default validationMiddleware;
