-- Extensions
CREATE EXTENSION IF NOT EXISTS citext;

-- Drop tables if they exist
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS fixed_expenses CASCADE;
DROP TABLE IF EXISTS months CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create enum type for expense categories
CREATE TYPE expense_category AS ENUM ('needs', 'wants', 'savings');

-- Users table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username CITEXT UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Months table
CREATE TABLE months (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  income DECIMAL(10,2) NOT NULL,
  needs_percentage INT NOT NULL CHECK (needs_percentage >= 0 AND needs_percentage <= 100),
  wants_percentage INT NOT NULL CHECK (wants_percentage >= 0 AND wants_percentage <= 100),
  savings_percentage INT NOT NULL CHECK (savings_percentage >= 0 AND savings_percentage <= 100),
  current BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);

-- Fixed expenses table
CREATE TABLE fixed_expenses (
  id BIGSERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  category expense_category NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE transactions (
  id BIGSERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  category expense_category NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  month_id BIGINT REFERENCES months(id) ON DELETE CASCADE
);

-- Indexes for faster queries
CREATE INDEX idx_months_user_id ON months(user_id);
CREATE INDEX idx_fixed_expenses_user_id ON fixed_expenses(user_id);
CREATE INDEX idx_transactions_month_id ON transactions(month_id);