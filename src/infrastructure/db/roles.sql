CREATE ROLE guest;
CREATE ROLE auth_user;
CREATE ROLE admin;

GRANT SELECT ON movies TO guest;
GRANT SELECT ON studios TO guest;
GRANT SELECT ON participants TO guest;
GRANT SELECT ON rewards TO guest;
GRANT SELECT ON genres TO guest;
GRANT SELECT ON comments TO guest;
GRANT INSERT ON users TO guest;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO auth_user;
GRANT INSERT, UPDATE ON movie_user TO auth_user;
GRANT INSERT ON comments TO auth_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;

CREATE user guest_auth_user WITH PASSWORD 'guest_password';
GRANT guest TO guest_auth_user;

CREATE user normal_auth_user WITH PASSWORD 'auth_user_password';
GRANT auth_user TO normal_auth_user;

CREATE user admin_auth_user WITH PASSWORD 'admin_password';
GRANT admin TO admin_auth_user;
