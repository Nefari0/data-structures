INSERT INTO data_memos (body,title,category,num_mark)
VALUES (
    $1,
    $2,
    $3,
    $4
)
RETURNING *;