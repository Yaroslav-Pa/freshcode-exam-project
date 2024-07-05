WITH transact_on_time_table AS (
  SELECT SUM(th.sum) AS total_sum, u.id
  FROM users u
  JOIN transaction_histories th ON u.id = th.user_id
  WHERE u.role = 'customer'
    AND th.operation_type = 'CONSUMPTION'
    AND (
      (EXTRACT(MONTH FROM th.created_at) = 12 AND EXTRACT(DAY FROM th.created_at) >= 25) OR
      (EXTRACT(MONTH FROM th.created_at) = 1 AND EXTRACT(DAY FROM th.created_at) <= 14)
    )
  GROUP BY u.id
)
UPDATE users u
SET balance = u.balance + (tott.total_sum / 100 * 10)
FROM transact_on_time_table tott
WHERE u.id = tott.id;