module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET','DJeS44s/AsCBA4zwQVg2jw=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT','QduBxLPZoxteW0IZ1rEC3A=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT','w+WIUZ+1mwRgbYVz1K663Q=='),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
