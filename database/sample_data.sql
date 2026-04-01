INSERT INTO users (username, hashed_password)
VALUES
  ('alice', 'hashed_pw_1'),
  ('bob', 'hashed_pw_2'),
  ('carol', 'hashed_pw_3');

INSERT INTO months (date, income, needs_percentage, wants_percentage, savings_percentage, user_id)
VALUES
  ('2026-01-01', 5000.00, 50, 30, 20, 1),
  ('2026-02-01', 5200.00, 50, 30, 20, 1),
  ('2026-01-01', 4000.00, 60, 25, 15, 2),
  ('2026-02-01', 4200.00, 60, 25, 15, 2);

INSERT INTO fixed_expenses (amount, category, description, user_id)
VALUES
  (1200.00, 'needs', 'Rent', 1),
  (300.00, 'needs', 'Groceries', 1),
  (50.00, 'wants', 'Netflix', 1),
  (500.00, 'savings', 'Emergency fund', 1),
  (1000.00, 'needs', 'Rent', 2),
  (250.00, 'needs', 'Groceries', 2),
  (40.00, 'wants', 'Spotify', 2),
  (300.00, 'savings', 'Retirement fund', 2);

INSERT INTO transactions (amount, category, description, month_id)
VALUES
  (15.50, 'wants', 'Coffee', 2),
  (100.00, 'needs', 'Utilities', 2),
  (200.00, 'savings', 'Stocks', 2),
  (25.00, 'wants', 'Lunch', 2),
  (10.00, 'wants', 'Coffee', 4),
  (120.00, 'needs', 'Electricity', 4),
  (150.00, 'savings', 'ETF', 4),
  (30.00, 'wants', 'Movie', 4);