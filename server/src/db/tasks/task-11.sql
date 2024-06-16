WITH rating_table AS (
  SELECT id,
    rating
  FROM users u
  WHERE u.role = 'creator'
  ORDER BY rating DESC
  LIMIT 3
)
UPDATE users u
SET balance = balance + 10
FROM rating_table rt
WHERE u.id = rt.id;