const createTestServer = (registerOptions, done) => {
  let options;
  if (typeof (registerOptions) === 'string') {
    options = {
      register: registerOptions
    };
  } else if (typeof (registerOptions) === 'object') {
    options = registerOptions;
  }

  const server = new Hapi.Server({ debug: false });
  server.connection({ port: 3100 });

  server.register(options, done);

  Logger.init(server);
  return server;
};

module.exports = {
  createTestServer
};
