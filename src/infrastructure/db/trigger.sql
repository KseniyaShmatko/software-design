CREATE OR REPLACE FUNCTION delete_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE movies SET deleted = TRUE WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_trigger
INSTEAD OF DELETE ON movies
FOR EACH ROW
EXECUTE FUNCTION delete_trigger_function();


CREATE OR REPLACE FUNCTION delete_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE participants SET deleted = TRUE WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_trigger
INSTEAD OF DELETE ON participants
FOR EACH ROW
EXECUTE FUNCTION delete_trigger_function();


CREATE OR REPLACE FUNCTION delete_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE studios SET deleted = TRUE WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_trigger
INSTEAD OF DELETE ON studios
FOR EACH ROW
EXECUTE FUNCTION delete_trigger_function();


CREATE OR REPLACE FUNCTION delete_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE genres SET deleted = TRUE WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_trigger
INSTEAD OF DELETE ON genres
FOR EACH ROW
EXECUTE FUNCTION delete_trigger_function();


CREATE OR REPLACE FUNCTION delete_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE rewards SET deleted = TRUE WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_trigger
INSTEAD OF DELETE ON rewards
FOR EACH ROW
EXECUTE FUNCTION delete_trigger_function();


CREATE OR REPLACE FUNCTION delete_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users SET deleted = TRUE WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_trigger
INSTEAD OF DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION delete_trigger_function();


CREATE OR REPLACE FUNCTION delete_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE comments SET deleted = TRUE WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_trigger
INSTEAD OF DELETE ON comments
FOR EACH ROW
EXECUTE FUNCTION delete_trigger_function();
