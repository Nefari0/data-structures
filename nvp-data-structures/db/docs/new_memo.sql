INSERT INTO data_memos (body,title,category)
VALUES (
    $1,
    $2,
    $3
)
RETURNING *;