-- CREATE TABLE nvp_user (
--   user_id SERIAL PRIMARY KEY,
--   first_name VARCHAR(250),
--   last_name VARCHAR(250),
--   email VARCHAR(250) NOT NULL,
--   hash VARCHAR(250) NOT NULL,
--   is_admin BOOLEAN
-- )

-- INSERT INTO nvp_user (first_name,last_name,email,hash,is_admin)
-- VALUES(
--   'chris',
--   'deMontigny',
--   'my email',
--   'my pass',
--   true
-- )

-- INSERT INTO nvp_user (first_name,last_name,email,hash,is_admin)
-- VALUES(
--   'jon',
--   'smith',
--   'e@email.com',
--   'password',
--   false
-- )

-- ---- cancer database/calculator ---- --
-- database and calculator are generated in jupyter notebook

-- pending calculation database --
-- CREATE TABLE cancer_stats_pending (
--   data_id SERIAL PRIMARY KEY,
--   id INTEGER,
--   clump_thickness INTEGER,
--   uniformity_of_cell_size INTEGER,
--   uniformity_of_cell_shape INTEGER,
--   marginal_adhesion INTEGER,
--   single_epithelial_cell_size INTEGER,
--   bare_nuclei INTEGER,
--   bland_chromatin INTEGER,
--   normal_nuceoli INTEGER,
--   mitoses INTEGER
-- )

-- INSERT INTO cancer_stats_pending (id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithelial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses)
-- VALUES (
--   '1000025','5','1','1','1','2','1','3','1','1'
-- )

-- select * from cancer_stats_pending where id = '1000025'