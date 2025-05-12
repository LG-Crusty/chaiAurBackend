const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catcH((error) =>
      next(error)
    );
  };
};

export { asyncHandler };
