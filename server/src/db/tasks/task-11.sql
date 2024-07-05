WITH top_creatives AS (
  SELECT id,
    rating
  FROM users u
  WHERE u.role = 'creator'
  ORDER BY rating DESC
  LIMIT 3
)
UPDATE users u
SET balance = balance + 10
FROM top_creatives tc
WHERE u.id = tc.id;