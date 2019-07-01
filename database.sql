CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  fname text NOT NULL, 
  lname text NOT NULL
);

INSERT INTO students (fname, lname) VALUES 
  ('Sylvia', 'Plath'), 
  ('Anne', 'Sexton');

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  student_id integer NOT NULL references students, 
  title text NOT NULL, 
  grade integer NOT NULL
);

INSERT INTO assignments (student_id, title, grade) VALUES 
  (1, 'Essay #1', 85),
  (1, 'Poem #1', 90),
  (2, 'Short Story', 80), 
  (2, 'Long Poem', 87);