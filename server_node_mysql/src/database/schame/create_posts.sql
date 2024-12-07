-- Create database for electronic newspaper
CREATE DATABASE IF NOT EXISTS news_portal;
USE news_portal;

-- Create posts table
CREATE TABLE posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    summary TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    view_count BIGINT UNSIGNED DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
    
    -- Add indexes for better performance
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    INDEX idx_category (category_id),
    INDEX idx_author (author_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 