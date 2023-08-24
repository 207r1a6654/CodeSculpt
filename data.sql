-- Create the database if not exists
CREATE DATABASE IF NOT EXISTS codepen;

USE codepen;

-- Create the code_snippets table
CREATE TABLE IF NOT EXISTS code_snippets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  html TEXT,
  css TEXT,
  js TEXT,
  project_title VARCHAR(255),
  project_id VARCHAR(36)
);
